import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string into Indonesian locale format.
 * Example: "2026-06-15" → "Minggu, 15 Juni 2026"
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Extract a Google Drive file ID from various URL formats.
 *
 * Supported formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID&export=view
 * - https://drive.usercontent.google.com/download?id=FILE_ID
 * - Just the raw FILE_ID string
 */
export function extractDriveFileId(url: string): string | null {
  if (!url) return null;

  // Pattern 1: /file/d/FILE_ID/
  const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const fileMatch = url.match(filePattern);
  if (fileMatch) return fileMatch[1];

  // Pattern 2: ?id=FILE_ID or &id=FILE_ID
  const idPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
  const idMatch = url.match(idPattern);
  if (idMatch) return idMatch[1];

  // Pattern 3: If the string itself looks like a file ID (no slashes or dots)
  const rawIdPattern = /^[a-zA-Z0-9_-]{20,}$/;
  if (rawIdPattern.test(url)) return url;

  return null;
}

/**
 * Convert a Google Drive file ID to a direct viewable image URL.
 * This format works with next/image optimization.
 */
export function getDriveImageUrl(fileIdOrUrl: string): string {
  const fileId = extractDriveFileId(fileIdOrUrl);
  if (!fileId) return fileIdOrUrl; // fallback to original URL

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
}

/**
 * Parse an Indonesian event date and time string into a valid UTC ISO 8601 string for Google Calendar.
 * Handles:
 * - Timezone offsets: WIB (UTC+7), WITA (UTC+8), WIT (UTC+9)
 * - Various time formats: "08:00 - 11:00 WIB", "08.00 s/d Selesai", "Pukul 09:00 WITA"
 * - Duration fallbacks: If no end time is found, defaults to 2 hours after start.
 */
export function formatCalendarUtc(
  dateStr?: string,
  timeStr?: string,
  isEnd = false,
  fallbackHour = 8,
  defaultDurationHours = 2
): string | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-").map(Number);
  if (parts.length < 3 || !parts[0] || !parts[1] || !parts[2]) return null;
  const [year, month, day] = parts;

  // Determine timezone offset: default WIB (UTC+7), WITA (UTC+8), WIT (UTC+9)
  let offsetHours = 7;
  if (timeStr) {
    const upper = timeStr.toUpperCase();
    if (upper.includes("WITA")) offsetHours = 8;
    else if (upper.includes("WIT")) offsetHours = 9;
  }

  let hour = fallbackHour;
  let minute = 0;

  if (timeStr) {
    // Matches patterns like "08:00", "08.30", "13:00"
    const matches = Array.from(timeStr.matchAll(/(\d{1,2})[:.](\d{2})/g));
    if (matches.length > 0) {
      if (!isEnd) {
        hour = parseInt(matches[0][1], 10);
        minute = parseInt(matches[0][2], 10);
      } else {
        if (matches.length > 1) {
          hour = parseInt(matches[matches.length - 1][1], 10);
          minute = parseInt(matches[matches.length - 1][2], 10);
        } else {
          // Single time provided (e.g. "08:00 WIB - Selesai"), add default duration
          const startHour = parseInt(matches[0][1], 10);
          const startMinute = parseInt(matches[0][2], 10);
          hour = startHour + defaultDurationHours;
          minute = startMinute;
        }
      }
    } else if (isEnd) {
      hour = fallbackHour + defaultDurationHours;
    }
  } else if (isEnd) {
    hour = fallbackHour + defaultDurationHours;
  }

  const localUtcMs = Date.UTC(year, month - 1, day, hour - offsetHours, minute, 0);
  const d = new Date(localUtcMs);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
    d.getUTCHours()
  )}${pad(d.getUTCMinutes())}00Z`;
}

/**
 * Generate a Google Calendar event URL.
 */
export function createGoogleCalendarUrl(options: {
  title: string;
  details?: string;
  location?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  fallbackStartHour?: number;
}): string {
  const {
    title,
    details = "",
    location = "",
    startDate,
    startTime,
    endDate,
    endTime,
    fallbackStartHour = 8,
  } = options;

  const startUtc =
    formatCalendarUtc(startDate, startTime, false, fallbackStartHour) || "20261231T010000Z";
  const endUtc =
    formatCalendarUtc(
      endDate || startDate,
      endTime || startTime,
      true,
      fallbackStartHour + 2
    ) || "20261231T030000Z";

  const encodedTitle = encodeURIComponent(title);
  const encodedDetails = encodeURIComponent(details);
  const encodedLocation = encodeURIComponent(location);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDetails}&location=${encodedLocation}&dates=${startUtc}/${endUtc}`;
}
