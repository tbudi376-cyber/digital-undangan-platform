// ============================================================
// Temu Waktu — Type Definitions
// ============================================================

/**
 * Data Klien dari tab "DataKlien" Google Sheets.
 * Setiap baris merepresentasikan satu Klien pernikahan.
 */
export interface ClientData {
  // ── Data Dasar (A-D) ─────────────────────────────────────────
  /** URL unik undangan, huruf kecil tanpa spasi (contoh: "desti-anton") */
  slug: string;
  /** ID tema undangan: "elegant", "rustic", "minimalist", "theme9", "pastel", "conservatory" */
  theme: string;
  /** URL foto cover utama / hero (Google Drive / Cloudinary / direct link) */
  hero_image: string;
  /** URL file MP3 atau link YouTube untuk lagu latar */
  music_url: string;
  /** Judul lagu pengantin opsional */
  music_title?: string;

  // ── Profil Mempelai & Keluarga (E-J) ──────────────────────────
  /** Nama lengkap mempelai wanita (contoh: "Desti Angraeny, S.Ked") */
  bride_full_name: string;
  /** Nama panggilan mempelai wanita (contoh: "Desti") */
  bride_nickname: string;
  /** Nama lengkap mempelai pria (contoh: "Antonio Putra, S.T") */
  groom_full_name: string;
  /** Nama panggilan mempelai pria (contoh: "Anton") */
  groom_nickname: string;
  /** Keterangan orang tua mempelai wanita */
  bride_parents?: string;
  /** Keterangan orang tua mempelai pria */
  groom_parents?: string;

  // ── Akad Nikah (K-N) ──────────────────────────────────────────
  /** Tanggal akad, format YYYY-MM-DD (contoh: "2026-12-31") */
  akad_date: string;
  /** Waktu akad (contoh: "08:00 - 10:00 WIB") */
  akad_time: string;
  /** Nama lokasi akad (contoh: "Masjid Istiqlal, Jakarta") */
  akad_location: string;
  /** URL Google Maps lokasi akad */
  akad_map_url: string;

  // ── Resepsi (O-R) ─────────────────────────────────────────────
  /** Tanggal resepsi, format YYYY-MM-DD */
  resepsi_date: string;
  /** Waktu resepsi (contoh: "11:00 - 14:00 WIB") */
  resepsi_time: string;
  /** Nama lokasi resepsi */
  resepsi_location: string;
  /** URL Google Maps lokasi resepsi */
  resepsi_map_url: string;

  // ── Amplop Digital (S-V) ──────────────────────────────────────
  /** Nama bank untuk transfer hadiah (contoh: "BCA") */
  bank_name: string;
  /** Nomor rekening (contoh: "1234567890") */
  bank_account: string;
  /** Nama pemilik rekening */
  account_owner: string;
  /** URL gambar QRIS */
  qris_image: string;

  // ── Kado Fisik (W-Y) ──────────────────────────────────────────
  /** Alamat pengiriman kado fisik */
  physical_gift_address?: string;
  /** Nama penerima paket kado */
  physical_gift_recipient?: string;
  /** Nomor telepon penerima paket kado */
  physical_gift_phone?: string;

  // ── Galeri & Konten Tambahan (Z-AC) ───────────────────────────
  /** URL foto galeri dipisahkan koma */
  gallery_images: string;
  /** Kutipan ayat atau mutiara romantis */
  quote?: string;
  /** Sumber kutipan (contoh: "Q.S Ar-Rum: 21") */
  quote_source?: string;
  /** Link live streaming pernikahan (YouTube/Zoom/dll) */
  stream_link?: string;
}

/**
 * Data satu pesan/doa dari tab "RSVP" Google Sheets.
 */
export interface RsvpEntry {
  slug: string;
  nama_tamu: string;
  kehadiran: "Hadir" | "Tidak Hadir";
  pesan: string;
  timestamp: string;
}

/**
 * Payload pengiriman form RSVP dari Tamu ke Google Apps Script.
 */
export interface RsvpPayload {
  slug: string;
  nama_tamu: string;
  kehadiran: "Hadir" | "Tidak Hadir";
  pesan: string;
}

/**
 * Pembungkus respons generic dari Google Apps Script Web App.
 */
export interface GASResponse<T = unknown> {
  status: "success" | "error";
  data?: T;
  message?: string;
}
