import { NextRequest, NextResponse } from "next/server";
import type { RsvpPayload, GASResponse } from "@/types";

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || process.env.GAS_URL;

// In-memory sliding window IP rate limiting (max 5 submissions per minute per IP)
interface IpLimitRecord {
  count: number;
  resetAt: number;
}
const ipLimits = new Map<string, IpLimitRecord>();
const MAX_RSVP_PER_WINDOW = 5;
const RSVP_WINDOW_MS = 60 * 1000; // 1 minute

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  // Periodic cleanup
  for (const [key, record] of ipLimits.entries()) {
    if (now > record.resetAt) {
      ipLimits.delete(key);
    }
  }

  const record = ipLimits.get(ip);
  if (!record || now > record.resetAt) {
    ipLimits.set(ip, { count: 1, resetAt: now + RSVP_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_RSVP_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

/**
 * Sanitize formula injection triggers (=, +, -, @)
 */
function sanitizeFormula(input: string): string {
  if (!input) return "";
  const trimmed = input.trim();
  if (trimmed.length > 0 && "=+-@".includes(trimmed.charAt(0))) {
    return "'" + trimmed;
  }
  return trimmed;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // 1. IP Rate Limiting (blocks burst bots before reaching GAS)
  if (!checkIpRateLimit(ip)) {
    return NextResponse.json(
      {
        status: "error",
        message: "Terlalu banyak pengiriman dari perangkat Anda. Silakan tunggu 1 menit.",
      },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { slug, nama_tamu, kehadiran, pesan, honeypot, formTime } = body;

    // 2. Honeypot check: If the hidden honeypot field is filled, reject
    if (honeypot) {
      return NextResponse.json(
        { status: "error", message: "Submission rejected." },
        { status: 400 }
      );
    }

    // 3. Minimum submission time check (reject automated scripts submitting in < 1500ms)
    if (typeof formTime === "number") {
      const elapsed = Date.now() - formTime;
      if (elapsed < 1500) {
        return NextResponse.json(
          { status: "error", message: "Pengiriman terlalu cepat. Silakan coba kembali." },
          { status: 400 }
        );
      }
    }

    // 4. Validation: presence & lengths
    if (!slug || typeof slug !== "string" || slug.length > 50) {
      return NextResponse.json(
        { status: "error", message: "Slug tidak valid." },
        { status: 400 }
      );
    }

    if (!nama_tamu || typeof nama_tamu !== "string" || nama_tamu.trim().length < 2 || nama_tamu.length > 100) {
      return NextResponse.json(
        { status: "error", message: "Nama tamu wajib diisi (2-100 karakter)." },
        { status: 400 }
      );
    }

    // 5. Enum validation
    const cleanKehadiran = (kehadiran || "").toString().trim();
    if (cleanKehadiran !== "Hadir" && cleanKehadiran !== "Tidak Hadir") {
      return NextResponse.json(
        { status: "error", message: "Nilai kehadiran harus 'Hadir' atau 'Tidak Hadir'." },
        { status: 400 }
      );
    }

    const cleanPesan = typeof pesan === "string" ? pesan.slice(0, 1000) : "";

    // 6. Formula injection protection
    const sanitizedPayload: RsvpPayload = {
      slug: slug.trim().toLowerCase(),
      nama_tamu: sanitizeFormula(nama_tamu),
      kehadiran: cleanKehadiran as "Hadir" | "Tidak Hadir",
      pesan: sanitizeFormula(cleanPesan),
    };

    // If demo slug or GAS_URL is not configured, simulate success
    if (!GAS_URL || slug === "romeo-juliet" || slug === "demo") {
      return NextResponse.json({
        status: "success",
        message: "RSVP berhasil disimpan (mode demo).",
      });
    }

    // 7. Forward to Google Apps Script backend
    const gasRes = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(sanitizedPayload),
    });

    if (!gasRes.ok) {
      return NextResponse.json(
        { status: "error", message: "Gagal menyimpan ke basis data." },
        { status: 502 }
      );
    }

    const gasJson: GASResponse = await gasRes.json().catch(() => ({
      status: "success",
    }));

    return NextResponse.json(gasJson);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 }
    );
  }
}
