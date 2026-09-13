# Agent Brief: High-Converting Couture Redesign for Temu Waktu Landing Page

This document is an agent-facing implementation brief. It is designed to be consumed directly by an AI coding agent running the `/impeccable` skill to audit and visually elevate `app/page.tsx` into a high-converting, luxury wedding atelier storefront.

---

## 1. Objective & Leading Words

The current landing page (`app/page.tsx`) functions correctly, but suffers from generic SaaS templates: standard circular gradient glows, emoji avatars (`🧑‍🤝‍🧑`), generic Unsplash stock photos, and missing conversion sections (Workflow, FAQ, Feature Proof, Interactive Theme Showcase).

The redesigned landing page must feel like a **luxury bridal concierge atelier**—evoking romance, prestige, and effortless convenience ("100% Terima Beres").

### Leading Words
- **Editorial**: Typography and spacing reminiscent of Vogue Weddings or luxury hospitality brochures.
- **Conversion-Anchored**: Every section directly addresses a bride's anxiety (effort, speed, aesthetics, RSVP tracking).
- **Tactile-Preview**: Display realistic device previews of the actual elevated themes (`ThemeElegant`, `ThemeRustic`, `ThemeMinimalist`, `ThemeSoftPastel`).
- **Proof-Driven**: Elegant typographic social proof and transparent FAQs replace childish emoji badges.

---

## 2. Section-by-Section Architectural Blueprint

### Section 1: Hero Section & Floating Device Cameo
- **Atmosphere**: Soft ambient candlelight glow (`bg-[#FDFBF7]`, subtle radial gradients in champagne gold and rose wine).
- **Badge**: Minimalist pill: `✦ JASA UNDANGAN DIGITAL PREMIUM — 100% TERIMA BERES ✦`.
- **Headline**: High-fashion serif + modern sans blend:
  - *"Undangan Pernikahan Mewah, Tanpa Ribet.*"
  - Subtitle: *"Pilih desain haute-couture favoritmu. Cukup kirim data diri & foto, tim desainer Temu Waktu yang merangkai hingga siap sebar beserta rekap katering otomatis."*
- **Primary CTAs**:
  - `Lihat Katalog Tema (Scroll ke #katalog)` with luxury pill styling.
  - `Konsultasi via WhatsApp` with direct WhatsApp deep-link.
- **Social Proof Strip**: Clean editorial typography:
  - *500+ Pasangan Berbahagia* &bull; *Rating 4.9/5 dari Pengantin & Tamu* &bull; *Garansi 1x24 Jam Siap Sebar*.
  - (No raw emoji avatars; use elegant initial monograms or clean photography circles).

---

### Section 2: Interactive Theme Showcase & Catalog (`#katalog`)
Elevate the 4 theme cards to match the newly polished designs from `THEME_REDESIGN_BRIEF.md`:
1. **Theme 1: Soft Pastel / Dark Violet (`theme9`)**:
   - Tag: `AURA ROMANCE`
   - Title: `Soft Pastel Twilight`
   - Description: `Nuansa deep violet, ambient glow, dan kartu digital ATM interaktif untuk pernikahan modern kontemporer.`
   - Actions: `Lihat Demo Instan (/romeo-juliet?theme=theme9)` & `Pesan Tema Ini (WhatsApp)`.
2. **Theme 2: Parisian Luxury (`elegant`)**:
   - Tag: `PARISIAN LUXURY`
   - Title: `Imperial Rose & Gold`
   - Description: `Sentuhan emas berembos, wax seal 3D, kartu kado foil EMV, dan tipografi arsip Prancis yang abadi.`
   - Actions: `Lihat Demo Instan (/romeo-juliet?theme=elegant)` & `Pesan Tema Ini (WhatsApp)`.
3. **Theme 3: Tuscan Botanical (`rustic`)**:
   - Tag: `BOTANICAL EARTH`
   - Title: `Tuscan Sage & Linen`
   - Description: `Palet zaitun Mediterania, bayangan kertas deckled edge, motif dedaunan, dan kehangatan terracotta alami.`
   - Actions: `Lihat Demo Instan (/romeo-juliet?theme=rustic)` & `Pesan Tema Ini (WhatsApp)`.
4. **Theme 4: Kinfolk Monolith (`minimalist`)**:
   - Tag: `SWISS EDITORIAL`
   - Title: `Architectural Monochrome`
   - Description: `Tipografi raksasa asimetris, hairline grid, plakat pameran seni, dan kontras monokrom tajam tanpa distraksi.`
   - Actions: `Lihat Demo Instan (/romeo-juliet?theme=minimalist)` & `Pesan Tema Ini (WhatsApp)`.

---

### Section 3: "100% Terima Beres" — 3-Step Effortless Workflow
Replace generic feature blurbs with a clear 3-step sequence showing how effortless the service is:
- **Step 01: Pilih Tema & Isi Kuesioner Singkat**:
  *Calon pengantin memilih tema dan menyalin format kuesioner WhatsApp sederhana.*
- **Step 02: Desainer Kami Rangkai & Berikan Preview Instan**:
  *Dalam 1x24 jam, undangan digital eksklusif selesai dan dapat direvisi hingga puas tanpa batas.*
- **Step 03: Sebar Link Personal & Pantau Rekap Katering**:
  *Gunakan generator link nama tamu dan salin rekap kehadiran RSVP 1-klik untuk konfirmasi porsi katering.*

---

### Section 4: Signature Capabilities (Feature Pillars)
Highlight the killer technical features built in V1:
1. **Layar Pembuka Sapaan Personal**:
   *Nama tamu tertera otomatis di cover depan (`?to=Nama+Tamu`), memberikan penghormatan personal.*
2. **Pemutar Musik Latar Anti-Blokir**:
   *Musik lagu pilihan (YouTube / MP3) berputar mulus saat cover dibuka tanpa dicegat browser handphone.*
3. **Amplop Digital & Kado Fisik Terverifikasi**:
   *Nomor rekening dengan tombol salin 1-klik, barcode QRIS resmi, dan alamat pengiriman kado paket.*
4. **Dashboard Rekap RSVP & Katering 1-Klik**:
   *Hitung otomatis total tamu hadir dan cadangan buffer katering, siap disalin ke WhatsApp klien.*

---

### Section 5: Transparent Pricing / Value Proposition
Present clear, high-trust wedding package options:
- **Paket All-In Terima Beres**:
  - Harga promo peluncuran (misal: `Rp 99.000` dari normal `Rp 199.000`).
  - Fitur: Masa aktif 1 tahun, revisi sampai hari H, custom musik pilihan, amplop digital + QRIS, galeri foto, rekap buku tamu real-time, generator link tamu tak terbatas.
  - CTA Button: `Pesan Undangan Sekarang (WhatsApp)`.

---

### Section 6: FAQ (Frequently Asked Questions) Accordion
Address core buyer hesitations:
1. *Berapa lama proses pengerjaan undangan?* &rarr; Maksimal 1x24 jam setelah data diri dan foto kami terima.
2. *Apakah bisa revisi jika ada perubahan tanggal atau lokasi?* &rarr; Ya, revisi teks dan jadwal bebas tanpa biaya tambahan sampai hari-H.
3. *Apakah lagu latar bisa request lagu favorit kami?* &rarr; Sangat bisa. Cukup kirim judul lagu atau link YouTube lagu kenangan kalian.
4. *Bagaimana cara membagikan link dengan nama tamu berbeda-beda?* &rarr; Kami sediakan Portal Tamu khusus di mana kalian tinggal memasukkan daftar nama dan menyalin link personal dalam 1 detik.

---

### Section 7: Final Luxury CTA Banner & Refined Footer
- **CTA Banner**:
  - Deep wine burgundy background (`#3B0C15`) with subtle gold foil accents.
  - Heading: *"Momen Bersejarah Layak Mendapatkan Pengumuman yang Sempurna."*
  - Action: Button `Mulai Buat Undanganmu (WhatsApp)`.
- **Footer**:
  - Clean brand mark: Temu Waktu.
  - Links: `Katalog Tema`, `Portal Klien & Rekap Tamu (/generator)`, `Hubungi Admin WhatsApp`.
  - Copyright and domain statement: *Platform Undangan Pernikahan Digital 100% Terima Beres.*

---

## 3. Technical Constraints & Verification

1. **Keep Framework & Dependencies Clean**:
   - Single-file implementation in [app/page.tsx](file:///d:/web-tubagus/digital_undangan/app/page.tsx).
   - Use standard Tailwind CSS v4 utility classes.
   - Use `lucide-react` icons (do not install external icon packages).
2. **Preserve External Routing**:
   - All theme links must navigate to `/romeo-juliet?theme={theme_id}`.
   - All WhatsApp buttons must have encoded chat templates pointing to admin WhatsApp.
   - Footer link to `/generator` must remain intact.
3. **Execution Verification Gate**:
   Execute the project verification pipeline:
   ```powershell
   npm run verify
   ```
   Must pass with **0 TypeScript errors, 0 ESLint errors, and clean static page build**.
