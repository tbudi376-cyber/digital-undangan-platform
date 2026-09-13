// ============================================================
// Data Fetching Layer — Google Apps Script API Client
// ============================================================
// All server-side data fetching goes through this module.
// Uses ISR (Incremental Static Regeneration) with 5-minute revalidation
// to cache responses on Vercel's edge and prevent GAS rate-limiting.
// ============================================================

import type { ClientData, RsvpPayload, GASResponse, RsvpEntry } from "@/types";

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL!;

const DEMO_CLIENT_DATA: ClientData = {
  slug: "romeo-juliet",
  theme: "theme9",
  hero_image:
    "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/content/image-T_n0zxtfYajQAbgtK9FCB-1749993291480.png",
  music_url:
    "https://res.cloudinary.com/cludinarypartnerinaja/video/upload/kekawinan/music/music-T_n0zxtfYajQAbgtK9FCB-1749993294782.mp3",
  bride_full_name: "Desti Angraeny, S.Ked",
  bride_nickname: "Desti",
  groom_full_name: "Antonio Putra, S.T",
  groom_nickname: "Anton",
  bride_parents: "Putri dari Bpk. Wijaya Kusuma & Ibu Aini Raharja",
  groom_parents: "Putra dari Bpk. Anggara & Ibu Anggun",
  akad_date: "2026-07-31",
  akad_time: "08.00 - 10.00 WIB",
  akad_location: "Gedung Aneka Bhakti",
  akad_map_url: "https://maps.google.com/?q=Gedung+Aneka+Bhakti",
  resepsi_date: "2026-07-31",
  resepsi_time: "11.00 - 14.00 WIB",
  resepsi_location: "Gedung Aneka Bhakti, Jl. Salemba Raya No.28, Jakarta Pusat",
  resepsi_map_url: "https://maps.google.com/?q=Gedung+Aneka+Bhakti",
  bank_name: "Bank Central Asia (BCA)",
  bank_account: "09749893892",
  account_owner: "Desti Angraeny",
  qris_image: "",
  gallery_images:
    "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-5eM0h5iee7mz6qHGY_vUj-1749993442062.png, https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-4QvHbharHj8KfMXT6txr2-1749993459099.png, https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-Ep9GWXyi1YGyWWnBrOqRt-1749993450703.png, https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-ALdU97qKjABV-cA1ywjrD-1749993466499.png",
  quote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  quote_source: "Q.S Ar-Rum: 21",
  stream_link: "https://youtube.com/live/demo",
  physical_gift_address: "Jl. Salemba Raya No. 12, Jakarta Pusat, DKI Jakarta 10455",
  physical_gift_recipient: "Anton & Desti",
  physical_gift_phone: "0857-7772-1212",
};

/**
 * Fetch client wedding data by slug from Google Apps Script.
 *
 * Uses ISR with `next: { revalidate: 300 }` (5 minutes) so:
 * - First request fetches from GAS and caches the result
 * - Subsequent requests within 5 min serve from cache
 * - After 5 min, Next.js revalidates in the background
 *
 * @param slug - The unique URL slug for the wedding (e.g., "andi-nina")
 * @returns ClientData object or null if not found / error
 */
export async function getClientData(
  slug: string,
  isPreview: boolean = false
): Promise<ClientData | null> {
  if (!GAS_URL || slug === "romeo-juliet" || slug === "demo") {
    return DEMO_CLIENT_DATA;
  }

  try {
    const url = `${GAS_URL}?slug=${encodeURIComponent(slug)}`;

    const fetchOptions: RequestInit = isPreview
      ? { cache: "no-store" } // Bypass ISR cache for instant client preview
      : { next: { revalidate: 300 } }; // ISR: cache for 5 minutes

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      if (slug === "romeo-juliet" || slug === "demo") {
        return DEMO_CLIENT_DATA;
      }
      console.error(
        `[getClientData] HTTP error: ${res.status} for slug "${slug}"`
      );
      return null;
    }

    const json: GASResponse<ClientData> = await res.json();

    if (json.status === "success" && json.data) {
      return json.data;
    }

    if (slug === "romeo-juliet" || slug === "demo") {
      return DEMO_CLIENT_DATA;
    }

    console.warn(
      `[getClientData] GAS returned error for slug "${slug}":`,
      json.message
    );
    return null;
  } catch (error) {
    if (slug === "romeo-juliet" || slug === "demo") {
      return DEMO_CLIENT_DATA;
    }
    console.error(`[getClientData] Fetch failed for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch guestbook (RSVP) messages by slug from Google Apps Script.
 * Uses ISR with `next: { revalidate: 60 }` (1 minute), or `cache: 'no-store'` if isPreview.
 */
const DEMO_GUESTBOOK: RsvpEntry[] = [
  {
    slug: "romeo-juliet",
    nama_tamu: "Budi Santoso & Keluarga",
    kehadiran: "Hadir",
    pesan: "Selamat berbahagia Anton & Desti! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.",
    timestamp: "12 September 2026",
  },
  {
    slug: "romeo-juliet",
    nama_tamu: "Siti Rahma",
    kehadiran: "Hadir",
    pesan: "Barakallahu lakum wa baraka alaikum! Happy wedding bestie, lancar sampai hari H yaa! ✨",
    timestamp: "12 September 2026",
  },
  {
    slug: "romeo-juliet",
    nama_tamu: "Dimas Pratama",
    kehadiran: "Hadir",
    pesan: "Selamat menempuh hidup baru bro Anton! Doa terbaik untuk kalian berdua.",
    timestamp: "11 September 2026",
  },
];

export async function getGuestbook(
  slug: string,
  isPreview: boolean = false
): Promise<RsvpEntry[]> {
  if (!GAS_URL || slug === "romeo-juliet" || slug === "demo") {
    return DEMO_GUESTBOOK;
  }

  try {
    const url = `${GAS_URL}?slug=${encodeURIComponent(slug)}&action=guestbook`;
    const fetchOptions: RequestInit = isPreview
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } };

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      console.error(`[getGuestbook] HTTP error: ${res.status}`);
      return slug === "romeo-juliet" || slug === "demo" ? DEMO_GUESTBOOK : [];
    }

    const json: GASResponse<RsvpEntry[]> = await res.json();
    if (json.status === "success" && json.data) {
      return json.data;
    }
    return slug === "romeo-juliet" || slug === "demo" ? DEMO_GUESTBOOK : [];
  } catch (error) {
    if (slug === "romeo-juliet" || slug === "demo") return DEMO_GUESTBOOK;
    console.error(`[getGuestbook] Fetch failed for slug "${slug}":`, error);
    return [];
  }
}

/**
 * Submit an RSVP entry to Google Apps Script.
 *
 * Uses `Content-Type: text/plain` to send JSON body —
 * this bypasses the CORS preflight OPTIONS request that
 * Google Apps Script cannot handle.
 *
 * @param payload - The RSVP data to submit
 * @returns true on success, false on failure
 */
export async function submitRsvp(payload: RsvpPayload): Promise<boolean> {
  try {
    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`[submitRsvp] HTTP error: ${res.status}`);
      return false;
    }

    const json: GASResponse = await res.json();
    return json.status === "success";
  } catch (error) {
    console.error("[submitRsvp] Fetch failed:", error);
    return false;
  }
}
