# 💍 Temu Waktu — Premium Digital Wedding Invitation Platform

<div align="center">
  <p><strong>Platform Undangan Pernikahan Digital Eksklusif, Interaktif, dan Elegan Berbasis Next.js & Google Sheets</strong></p>
  <p>
    <a href="https://digital-undangan-platform.vercel.app">
      <img src="https://img.shields.io/badge/Live_Demo-digital--undangan--platform.vercel.app-000000?style=for-the-badge&logo=vercel" alt="Live Demo" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-15.0+-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.0+-61DAFB?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  </p>
</div>

---

## ✨ Ikhtisar Proyek

**Temu Waktu** adalah platform undangan pernikahan digital modern yang menggabungkan kemewahan visual (*editorial couture*), interaksi dinamis (*Living Scene & Floating Widgets*), serta keandalan backend berbasis **Google Sheets + Google Apps Script (GAS)** tanpa biaya langganan database server.

Semua data RSVP, buku tamu, hingga generator tautan personalisasi nama tamu (`?to=Nama+Tamu`) terhubung secara *real-time* dan mudah dikelola oleh calon pengantin langsung dari Google Sheets.

---

## 🎨 5 Tema Desain Eksklusif (*Bespoke Themes*)

Setiap tema dirancang secara presisi dengan identitas tipografi, palet warna, dan ornamen khas:

| Tema | Nama Koleksi | Nuansa & Karakteristik Utama |
| :--- | :--- | :--- |
| **01** | **Classic Heritage (Theme Elegant)** | Gold filigree borders, bingkai *double-hairline* klasik, ornamen flourish vintage, serta tipografi serif editorial mewah. |
| **02** | **Botanical Forest (Theme Rustic)** | Tekstur linen organik, aksen *watercolor foliage*, pembatas sulur alam, dan sentuhan *warm earth tone*. |
| **03** | **Modern Minimalist** | Layout *Swiss-style* kontemporer, tipografi sans-serif tegas, aksen monokrom berani, dan estetika arsitektural. |
| **04** | **Soft Pastel** | Estetika romantis lembut, amplop *interactive cover opener*, timeline kisah cinta (*Love Story*), dan amplop kado digital bergaya kartu ATM. |
| **05** | **The Glasshouse Conservatory** | Fitur *Living Scene* imersif, kanopi botani kaca hijau zamrud, efek pencahayaan dinamis, dan bingkai kubah arsitektural. |

---

## 🌟 Fitur Unggulan

### 1. 💫 Living Scene & Floating Interactive Widgets
- **Atmosphere Particles**: Partikel ambient berkilau (efek *champagne shimmer* dan dedaunan melayang) yang dapat dihidupkan/dimatikan dengan switch kontrol.
- **Wave Audio Player**: Pemutar musik latar romantis dengan visualisasi gelombang audio bergerak (*live equalizer bars*) dan tombol kontrol mengambang.
- **Floating Wishes Ticker**: *Pill marquee* dinamis yang menampilkan ucapan & doa restu dari para tamu secara bergantian di bagian bawah layar.

### 2. 💌 Personalized Guest Experience
- **Link Generator Otomatis**: Buat link undangan personal untuk ratusan tamu sekaligus dengan parameter `?to=Nama+Tamu`.
- **Interactive Cover Screen**: Layar sampul pembuka dengan nama tamu khusus, animasi ketukan amplop, dan transisi mulus ke isi undangan.
- **Countdown Timer**: Hitung mundur hari, jam, menit, dan detik menuju momen sakral akad & resepsi.

### 3. 📝 Live RSVP & Buku Tamu Terintegrasi
- Formulir konfirmasi kehadiran (Hadir / Masih Ragu / Berhalangan) dan ucapan selamat langsung tercatat di Google Sheets pengantin.
- Efek perayaan konfeti interaktif (*canvas-confetti*) saat tamu berhasil mengirimkan konfirmasi.
- Dukungan *optimistic UI update* agar ucapan baru langsung muncul seketika di dinding doa.

### 4. 🎁 Amplop Digital & Hadiah
- Salin nomor rekening bank (BCA, Mandiri, BRI, dll.) atau e-wallet (GoPay, OVO, Dana) hanya dengan satu klik (*copy-to-clipboard*).
- Konfirmasi pengiriman kado fisik dengan alamat penerima lengkap.

---

## 📁 Struktur Direktori

```text
├── app/                        # Next.js App Router (Layout & Pages)
│   ├── page.tsx                # Landing Page & Katalog Tema Temu Waktu
│   ├── layout.tsx              # Root Layout & Metadata
│   ├── globals.css             # Desain Sistem & CSS Tokens
│   └── undangan/[slug]/        # Dynamic Route Undangan Pengantin
├── components/                 # Komponen Antarmuka Reusable
│   ├── themes/                 # Implementasi 5 Tema Undangan
│   │   ├── ThemeRenderer.tsx   # Switcher Tema Modular & Global Floating Widgets
│   │   ├── ThemeElegant.tsx    # Classic Heritage
│   │   ├── ThemeRustic.tsx     # Botanical Forest
│   │   ├── ThemeMinimalist.tsx # Modern Minimalist
│   │   ├── ThemePastel.tsx     # Soft Pastel
│   │   └── ThemeConservatory.tsx # Living Scene Glasshouse
│   └── ui/                     # Komponen UI Atomik & Floating
│       ├── AtmosphereParticles.tsx # Engine Partikel Ambient
│       ├── WaveAudioPlayer.tsx     # Animated Wave Equalizer Player
│       ├── FloatingWishesTicker.tsx# Live Marquee Ucapan Tamu
│       ├── AudioPlayer.tsx         # Background Music Player
│       └── LinkGeneratorModal.tsx  # Generator Tautan Tamu
├── gas/                        # Google Apps Script Source
│   ├── Code.gs                 # Web App API Handler untuk Google Sheets
│   └── appsscript.json         # Manifest GAS
├── docs/                       # Dokumentasi & Spesifikasi Desain
│   └── specs/                  # Design Briefs & Living Scene Specs
├── lib/                        # Data Dummy, API Fetcher, & Utility Functions
├── types/                      # TypeScript Definitions & Interfaces
└── public/                     # Aset Gambar, Ikon, & Musik
```

---

## 🚀 Panduan Memulai (*Quick Start*)

### Prasyarat
- **Node.js**: Versi 18.18.0 atau lebih baru
- **npm** / **yarn** / **pnpm**

### Instalasi Dependensi
```bash
git clone https://github.com/tbudi376-cyber/digital-undangan-platform.git
cd digital-undangan-platform
npm install
```

### Konfigurasi Environment Variables
Salin berkas `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi variabel Google Apps Script deployment URL Anda:
```env
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/AKfycb.../exec
```

### Menjalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di peramban Anda.

### Verifikasi & Build Produksi
```bash
npm run verify  # Menjalankan type-check, linting, dan build Next.js
```

---

## 📊 Integrasi Google Sheets (Google Apps Script)

1. Buat Google Spreadsheet baru dengan dua lembar (*sheet*):
   - `RSVP` (Kolom: `Timestamp`, `Nama`, `Kehadiran`, `Jumlah Tamu`, `Catatan`)
   - `Ucapan` (Kolom: `Timestamp`, `Nama`, `Pesan`, `Waktu`)
2. Buka **Extensions > Apps Script**, tempel kode dari [`gas/Code.gs`](gas/Code.gs).
3. Klik **Deploy > New deployment**, pilih type **Web app**.
   - **Execute as**: *Me*
   - **Who has access**: *Anyone*
4. Salin Web App URL ke `.env.local` pada `NEXT_PUBLIC_GAS_URL`.

---

## 🚢 Deployment ke Vercel

Proyek ini telah dikonfigurasi dan dioptimasi penuh untuk deployment di **Vercel**:

1. Impor repositori `digital-undangan-platform` di dashboard Vercel.
2. Pastikan **Root Directory** diset ke default `./` (kosong).
3. Masukkan Environment Variable:
   - Key: `NEXT_PUBLIC_GAS_URL`
   - Value: URL Web App Google Apps Script Anda.
4. Klik **Deploy**.

---

<div align="center">
  <sub>Dibangun dengan dedikasi tinggi untuk momen terbaik seumur hidup. Dipersembahkan oleh <strong>Temu Waktu</strong>.</sub>
</div>
