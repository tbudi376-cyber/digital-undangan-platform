# 0001: Google Sheets & Apps Script sebagai Backend V1 dengan Caching ISR

## Status
Accepted

## Context
Temu Waktu beroperasi dengan model bisnis boutique "100% Terima Beres", di mana calon pengantin (Klien) tidak membutuhkan akun atau dashboard manajemen sendiri. Seluruh data diisi dan dikelola oleh admin. Diperlukan basis data yang nol biaya server, mudah diedit oleh admin non-teknis secara visual, dan mampu menangani lonjakan traffic tamu saat tautan disebar ke media sosial dan grup pesan singkat.

## Decision
Kami memutuskan untuk menggunakan **Google Sheets** sebagai database relasional sederhana yang diakses melalui **Google Apps Script (GAS) Web App**, dipadukan dengan **Next.js Incremental Static Regeneration (ISR)** di Vercel:
1. `DataKlien` sheet di-cache selama 5 menit (`revalidate: 300`) untuk meredam pemanggilan kuota GAS dan mempercepat loading Tamu ke tingkat sub-detik melalui Edge CDN.
2. `RSVP` sheet ditulis langsung menggunakan HTTP POST (`text/plain` payload untuk memotong CORS preflight OPTIONS yang tidak didukung GAS) dan dibaca kembali dengan revalidasi 1 menit (`revalidate: 60`).
3. Semua tema distandarisasi memiliki layar Cover Pembuka interaktif ("Buka Undangan") untuk memastikan browser mengizinkan autoplay audio latar belakang.

## Consequences & Trade-offs
* **Kelebihan**: Biaya operasional $0 (zero infrastructure cost), admin dapat melihat dan mengoreksi data kapan saja langsung di spreadsheet tanpa tool tambahan.
* **Kekurangan**: Latensi mutasi data RSVP berkisar 1–3 detik (diatasi di sisi klien dengan *Optimistic UI*), batas kuota GAS 20.000 panggilan/hari.
* **Trigger Migrasi**: Jika volume Klien aktif melebihi 30 pernikahan bersamaan per minggu atau kuota GAS mendekati batas harian, sistem akan dimigrasikan ke Supabase (PostgreSQL) dengan sinkronisasi periodik ke Sheets untuk laporan Klien.
