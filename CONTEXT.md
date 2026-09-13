# Temu Waktu — Domain Model

Konteks bisnis dan terminologi domain untuk platform undangan pernikahan digital "Temu Waktu".

## Language

**Klien**:
Calon pengantin yang memesan pembuatan undangan digital kepada Temu Waktu dengan sistem "100% Terima Beres".
_Avoid_: User, customer, pembeli

**Tamu**:
Pihak yang menerima tautan undangan personal dari Klien.
_Avoid_: User, visitor, pengunjung

**Undangan (Invitation)**:
Halaman web dinamis yang diakses via tautan unik (`/{slug}`) yang memuat seluruh informasi pernikahan dan media Klien.
_Avoid_: Website, landing page klien

**Slug**:
Pengenal unik berbasis teks huruf kecil tanpa spasi di URL untuk setiap Klien (contoh: `desti-anton-2026`).
_Avoid_: ID, path, URL parameter

**Tema (Theme)**:
Preset desain visual yang menentukan tipografi, tata warna, ornamen grafis, dan animasi pada Undangan.
_Avoid_: Template, skin, styling

**Cover Undangan (Splash Screen)**:
Layar pembuka interaktif berisi nama mempelai dan nama Tamu dengan tombol "Buka Undangan" yang sekaligus memicu pemutaran musik latar.
_Avoid_: Pop-up, modal, hero static

**RSVP**:
Pernyataan konfirmasi kehadiran ("Hadir" atau "Tidak Hadir") yang dikirimkan Tamu melalui form pada Undangan.
_Avoid_: Registrasi, check-in

**Buku Tamu (Guestbook)**:
Kumpulan ucapan dan doa yang dikirimkan Tamu bersamaan dengan konfirmasi RSVP, ditampilkan secara publik di Undangan.
_Avoid_: Komentar, review, testimoni

**Amplop Digital**:
Bagian Undangan yang memuat informasi nomor rekening bank, dompet digital, atau QRIS untuk pengiriman hadiah non-tunai.
_Avoid_: Donasi, payment gateway, checkout

**QR Check-in Tamu (Future Feature)**:
Kode QR unik yang diterbitkan untuk Tamu terkonfirmasi hadir, dipindai oleh penerima tamu di venue fisik untuk mencatat kehadiran nyata dan penukaran suvenir.
_Avoid_: Tiket acara, barcode umum

