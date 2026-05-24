// ============================================================
// Digital Wedding Invitation Platform — Type Definitions
// ============================================================

/**
 * Client data from the "DataKlien" Google Sheets tab.
 * Each row represents one wedding invitation client.
 *
 * All fields are `string` because Google Sheets data
 * transmitted via JSON (Apps Script) is always serialized as strings.
 *
 * Column order must match the Google Sheets tab exactly:
 * A=slug, B=theme, C=hero_image, D=music_url, E=bride_full_name, ...
 */
export interface ClientData {
  // ── Data Dasar ──────────────────────────────────────────────
  /** URL unik undangan, huruf kecil tanpa spasi (contoh: "andi-nina") */
  slug: string;
  /** ID tema undangan: "elegant", "rustic", dll. */
  theme: string;
  /** URL foto cover utama dari Google Drive */
  hero_image: string;
  /** URL file MP3 backsound dari Google Drive */
  music_url: string;

  // ── Profil Mempelai ─────────────────────────────────────────
  /** Nama lengkap mempelai wanita (contoh: "Nina Sari Dewi") */
  bride_full_name: string;
  /** Nama panggilan mempelai wanita (contoh: "Nina") */
  bride_nickname: string;
  /** Nama lengkap mempelai pria (contoh: "Andi Pratama") */
  groom_full_name: string;
  /** Nama panggilan mempelai pria (contoh: "Andi") */
  groom_nickname: string;

  // ── Akad ────────────────────────────────────────────────────
  /** Tanggal akad, format YYYY-MM-DD (contoh: "2026-12-31") */
  akad_date: string;
  /** Waktu akad (contoh: "08:00 - 10:00 WIB") */
  akad_time: string;
  /** Nama lokasi akad (contoh: "Masjid Istiqlal, Jakarta") */
  akad_location: string;
  /** URL Google Maps lokasi akad */
  akad_map_url: string;

  // ── Resepsi ─────────────────────────────────────────────────
  /** Tanggal resepsi, format YYYY-MM-DD */
  resepsi_date: string;
  /** Waktu resepsi (contoh: "11:00 - 14:00 WIB") */
  resepsi_time: string;
  /** Nama lokasi resepsi */
  resepsi_location: string;
  /** URL Google Maps lokasi resepsi */
  resepsi_map_url: string;

  // ── Amplop Digital ──────────────────────────────────────────
  /** Nama bank untuk transfer hadiah (contoh: "BCA") */
  bank_name: string;
  /** Nomor rekening (contoh: "1234567890") */
  bank_account: string;
  /** Nama pemilik rekening */
  account_owner: string;
  /** URL gambar QRIS dari Google Drive */
  qris_image: string;

  // ── Galeri ──────────────────────────────────────────────────
  /** URL foto galeri dari Google Drive, dipisahkan koma (contoh: "url1, url2, url3") */
  gallery_images: string;
}

/**
 * A single RSVP entry from the "RSVP" Google Sheets tab.
 */
export interface RsvpEntry {
  slug: string;
  nama_tamu: string;
  kehadiran: "Hadir" | "Tidak Hadir";
  pesan: string;
  timestamp: string;
}

/**
 * Payload sent via POST to Google Apps Script
 * when a guest submits the RSVP form.
 */
export interface RsvpPayload {
  slug: string;
  nama_tamu: string;
  kehadiran: "Hadir" | "Tidak Hadir";
  pesan: string;
}

/**
 * Generic response wrapper from Google Apps Script Web App.
 * T is the data type returned on success.
 */
export interface GASResponse<T = unknown> {
  status: "success" | "error";
  data?: T;
  message?: string;
}
