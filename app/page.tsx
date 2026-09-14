"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Heart,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Music,
  MailOpen,
  CreditCard,
  FileSpreadsheet,
  ChevronDown,
  Clock,
  ShieldCheck,
  Star,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// Temu Waktu — Luxury Bridal Concierge Atelier Landing Page
// ═══════════════════════════════════════════════════════════════════════════

const WHATSAPP_NUMBER = "6282176775545";

const THEMES = [
  {
    id: "conservatory",
    tag: "INTERACTIVE SCENE",
    title: "The Whispering Conservatory",
    description:
      "Paviliun kaca botani interaktif. Tamu dapat mengetuk easel foto, papan agenda, peti kado, dan kotak surat RSVP di dalam pemandangan hidup yang memukau.",
    image:
      "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=800&auto=format&fit=crop",
    palette: "from-emerald-950/25 via-emerald-900/15 to-transparent",
    tagColor: "bg-emerald-900/10 text-emerald-800 border-emerald-300",
    buttonGrad: "bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-emerald-100",
    features: ["Living Hotspot Scene", "Ambient Firefly FX", "Live Equalizer Audio"],
  },
  {
    id: "elegant",
    tag: "PARISIAN LUXURY",
    title: "Imperial Rose & Gold",
    description:
      "Sentuhan emas berembos, wax seal 3D, kartu kado foil EMV, dan tipografi arsip Prancis yang abadi nan mempesona.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    palette: "from-[#6B1728]/10 via-[#D4AF37]/10 to-transparent",
    tagColor: "bg-[#6B1728]/10 text-[#6B1728] border-[#D4AF37]/40",
    buttonGrad: "bg-gradient-to-r from-[#6B1728] via-[#851C32] to-[#6B1728] text-[#F3E5AB]",
    features: ["Classic Damask Filigree", "3D Wax Seal", "EMV Gold Chip Card"],
  },
  {
    id: "rustic",
    tag: "BOTANICAL EARTH",
    title: "Tuscan Sage & Linen",
    description:
      "Palet zaitun Mediterania, bayangan kertas deckled edge, motif dedaunan, dan kehangatan terracotta alami yang teduh.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    palette: "from-[#2E4A3D]/10 via-[#A65D46]/10 to-transparent",
    tagColor: "bg-[#2E4A3D]/10 text-[#2E4A3D] border-[#2E4A3D]/25",
    buttonGrad: "bg-gradient-to-r from-[#2E4A3D] to-[#3D6352] text-[#F8F5EE]",
    features: ["Handmade Paper Texture", "Olive Vine Dividers", "Deckled Edge Cards"],
  },
  {
    id: "pastel",
    tag: "AURA ROMANCE",
    title: "Soft Pastel Twilight",
    description:
      "Nuansa deep violet, ambient glow, dan kartu digital ATM interaktif untuk pernikahan modern kontemporer yang memikat.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
    palette: "from-purple-950/20 via-purple-900/10 to-transparent",
    tagColor: "bg-purple-900/10 text-purple-700 border-purple-200",
    buttonGrad: "bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-purple-100 border border-purple-400/30",
    features: ["Ambient Violet Glow", "Live Equalizer Audio", "ATM Card Replica"],
  },
  {
    id: "minimalist",
    tag: "SWISS EDITORIAL",
    title: "Architectural Monochrome",
    description:
      "Tipografi raksasa asimetris, hairline grid, plakat pameran seni, dan kontras monokrom tajam tanpa distraksi visual.",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    palette: "from-black/10 via-zinc-400/10 to-transparent",
    tagColor: "bg-black/5 text-black border-black/20",
    buttonGrad: "bg-black text-white hover:bg-zinc-800",
    features: ["Swiss Architectural Grid", "Asymmetrical Typography", "Museum Plakat"],
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Pilih Tema & Kirim Data Singkat",
    description:
      "Tentukan estetika favoritmu dari katalog. Cukup kirim nama mempelai, tanggal acara, lokasi, dan foto melalui formulir WhatsApp kami yang praktis.",
  },
  {
    step: "02",
    title: "Desainer Merangkai & Preview Instan",
    description:
      "Dalam waktu 1x24 jam, undangan digital couture selesai dirangkai. Anda mendapatkan tautan preview instan dan bebas revisi sampai benar-benar puas.",
  },
  {
    step: "03",
    title: "Sebar Tautan & Pantau Rekap Katering",
    description:
      "Gunakan generator nama tamu kami untuk membagikan tautan personal. Seluruh konfirmasi kehadiran tamu terdata otomatis untuk perkiraan porsi katering.",
  },
];

const SIGNATURE_CAPABILITIES = [
  {
    icon: MailOpen,
    title: "Layar Pembuka Sapaan Personal",
    description:
      "Setiap tamu disambut dengan plakat sapaan personal khusus (?to=Nama+Tamu) di layar sampul, memberi penghormatan eksklusif layaknya undangan fisik bangsawan.",
  },
  {
    icon: Music,
    title: "Pemutar Musik Latar Anti-Blokir",
    description:
      "Lantunan lagu kenangan favorit otomatis berputar anggun saat tamu menyentuh tombol buka undangan, tanpa dicegat oleh pembatasan autoplay browser ponsel.",
  },
  {
    icon: CreditCard,
    title: "Amplop Digital & Kado Fisik Terverifikasi",
    description:
      "Dilengkapi kartu bank berestetika mewah, tombol salin nomor rekening 1-klik, barcode QRIS terintegrasi, dan alamat pengiriman kado fisik terstruktur rapi.",
  },
  {
    icon: FileSpreadsheet,
    title: "Rekap RSVP & Katering Otomatis",
    description:
      "Konfirmasi kehadiran dan ucapan doa tamu tercatat rapi secara real-time ke Google Sheets, lengkap dengan kalkulasi buffer porsi katering yang siap diekspor.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Berapa lama proses pengerjaan undangan digital?",
    a: "Maksimal 1x24 jam setelah data diri, jadwal acara, dan foto Anda kami terima. Jika Anda membutuhkan undangan dalam hitungan jam untuk kebutuhan mendesak, tim desainer kami siap memprioritaskan pesanan Anda.",
  },
  {
    q: "Apakah kami bisa melakukan revisi jika ada perubahan jadwal atau lokasi?",
    a: "Tentu saja. Kami memberikan garansi revisi teks, tanggal, jam acara, hingga lokasi maps bebas tanpa biaya tambahan sampai hari-H pernikahan Anda.",
  },
  {
    q: "Apakah lagu latar bisa request lagu favorit kami?",
    a: "Sangat bisa. Anda dapat meminta lagu apapun, cukup berikan judul lagu atau tautan YouTube lagu kenangan Anda, dan tim kami akan mengintegrasikannya dengan halus.",
  },
  {
    q: "Bagaimana cara membagikan tautan dengan nama tamu yang berbeda-beda?",
    a: "Kami menyediakan halaman Portal Tamu (/generator) khusus untuk Anda. Cukup masukkan daftar nama keluarga atau sahabat, dan sistem akan membuatkan tautan personal siap sebar ke WhatsApp dalam 1 detik.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const getWaLink = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] font-sans selection:bg-[#D4AF37]/30 selection:text-[#50101E] relative overflow-x-hidden">
      {/* ── 1. Atelier Glass Navbar ──────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#D4AF37]/20 backdrop-blur-md bg-[#FDFBF7]/85">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#6B1728] border border-[#D4AF37] flex items-center justify-center text-[#F3E5AB] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg font-bold tracking-normal text-[#50101E]">
                Temu <span className="text-[#AA7C11]">Waktu</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-medium">
                Bridal Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-serif tracking-wider uppercase text-stone-600">
            <Link href="#katalog" className="hover:text-[#6B1728] transition-colors">
              Katalog Desain
            </Link>
            <Link href="#workflow" className="hover:text-[#6B1728] transition-colors">
              Cara Pesan
            </Link>
            <Link href="#fitur" className="hover:text-[#6B1728] transition-colors">
              Fitur Unggulan
            </Link>
            <Link href="#harga" className="hover:text-[#6B1728] transition-colors">
              Investasi
            </Link>
            <Link href="#faq" className="hover:text-[#6B1728] transition-colors">
              FAQ
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#katalog"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-serif text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-[#6B1728] text-[#F3E5AB] border border-[#D4AF37]/60 shadow-[0_4px_16px_rgba(107,23,40,0.25)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.35)] hover:brightness-105 active:scale-95 transition-all"
            >
              Pilih Tema
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Tutup Navigasi Menu" : "Buka Navigasi Menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:text-[#6B1728] hover:bg-stone-100/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1728]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#D4AF37]/20 bg-[#FDFBF7]/95 backdrop-blur-xl px-6 py-5 shadow-2xl animate-fade-in flex flex-col gap-3.5">
            <Link
              href="#katalog"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-sm font-semibold tracking-wider uppercase text-stone-700 hover:text-[#6B1728] py-1 transition-colors"
            >
              Katalog Desain
            </Link>
            <Link
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-sm font-semibold tracking-wider uppercase text-stone-700 hover:text-[#6B1728] py-1 transition-colors"
            >
              Cara Pesan
            </Link>
            <Link
              href="#fitur"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-sm font-semibold tracking-wider uppercase text-stone-700 hover:text-[#6B1728] py-1 transition-colors"
            >
              Fitur Unggulan
            </Link>
            <Link
              href="#harga"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-sm font-semibold tracking-wider uppercase text-stone-700 hover:text-[#6B1728] py-1 transition-colors"
            >
              Investasi &amp; Harga
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-sm font-semibold tracking-wider uppercase text-stone-700 hover:text-[#6B1728] py-1 transition-colors"
            >
              FAQ
            </Link>

            <div className="pt-3 border-t border-stone-200/60 flex flex-col gap-2.5">
              <a
                href={getWaLink("Halo Temu Waktu, saya ingin konsultasi pemesanan undangan digital pernikahan.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-serif text-xs font-semibold tracking-wider uppercase border border-[#2E4A3D]/40 text-[#2E4A3D] bg-white text-center shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#2E4A3D]" />
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── 2. Hero Section ──────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 px-6 overflow-hidden">
        {/* Soft Ambient Candlelight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55rem] h-[40rem] bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.15),transparent_70%)] pointer-events-none -z-10" />
        <div className="absolute top-96 right-10 w-[35rem] h-[35rem] bg-[radial-gradient(circle,_rgba(107,23,40,0.06),transparent_70%)] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 text-[#851C32] text-[11px] font-medium tracking-[0.25em] uppercase shadow-sm mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>JASA UNDANGAN DIGITAL PREMIUM &mdash; 100% TERIMA BERES</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#50101E] leading-[1.1] mb-6 animate-fade-in-up">
            Undangan Pernikahan Mewah,
            <br />
            <span className="italic text-[#AA7C11] font-normal">Tanpa Ribet.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl font-serif text-stone-600 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up">
            Pilih desain haute-couture favoritmu. Cukup kirim data diri &amp; foto, tim desainer
            Temu Waktu yang merangkai hingga siap sebar beserta rekap katering otomatis.
          </p>

          {/* Primary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
            <Link
              href="#katalog"
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-serif font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-[#6B1728] via-[#851C32] to-[#6B1728] text-[#F3E5AB] border border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(107,23,40,0.35)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.4)] hover:brightness-105 active:scale-95 transition-all w-full sm:w-auto"
            >
              <span>Lihat Katalog Tema</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={getWaLink("Halo Temu Waktu, saya ingin konsultasi pemesanan undangan digital pernikahan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-serif font-semibold text-sm tracking-wider uppercase border border-[#2E4A3D]/40 text-[#2E4A3D] bg-white/80 hover:bg-[#2E4A3D] hover:text-[#F8F5EE] shadow-sm hover:shadow-md active:scale-95 transition-all w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-[#2E4A3D] group-hover:text-[#F8F5EE] transition-colors" />
              <span>Konsultasi Desain (WhatsApp)</span>
            </a>
          </div>

          {/* Editorial Social Proof Strip */}
          <div className="mt-16 pt-8 border-t border-[#D4AF37]/25 flex flex-wrap items-center justify-center gap-8 text-xs font-serif text-stone-600 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-stone-800">500+ Pasangan</span>
              <span>Berbahagia</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-[#D4AF37]/30" />

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#AA7C11]" />
              <span className="font-semibold text-stone-800">Rating 4.9/5</span>
              <span>dari Pengantin &amp; Tamu</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-[#D4AF37]/30" />

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#851C32]" />
              <span className="font-semibold text-stone-800">Garansi 1x24 Jam</span>
              <span>Siap Sebar</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Interactive Theme Showcase & Catalog ───────────────── */}
      <section id="katalog" className="py-24 md:py-32 px-6 bg-[#FAF7F2] border-y border-[#D4AF37]/30 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#D4AF37]" />
              <p className="text-[11px] font-serif font-semibold tracking-[0.3em] uppercase text-[#AA7C11]">
                Haute-Couture Collection
              </p>
              <span className="h-px w-6 bg-[#D4AF37]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#50101E] mb-4">
              Pilihan Tema Eksklusif
            </h2>
            <p className="text-sm font-serif italic text-stone-600">
              Setiap tema dirancang dengan perhatian mikro pada tipografi, animasi layar buka, serta
              kemudahan interaksi tamu di ponsel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {THEMES.map((theme) => (
              <div
                key={theme.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)] transition-all duration-500"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={theme.image}
                    alt={theme.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Couture Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase backdrop-blur-md border shadow-sm ${theme.tagColor} bg-white/95`}
                    >
                      {theme.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 sm:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-serif font-bold text-[#50101E] mb-2">
                    {theme.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-serif text-stone-600 leading-relaxed mb-4 flex-1">
                    {theme.description}
                  </p>

                  {/* Interactive Feature Chips */}
                  {theme.features && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {theme.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200/80"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto pt-4 border-t border-stone-100">
                    <Link
                      href={`/romeo-juliet?theme=${theme.id}`}
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-serif text-xs font-semibold tracking-wider uppercase border border-stone-300 text-stone-800 hover:border-[#6B1728] hover:text-[#6B1728] transition-all text-center"
                    >
                      <span>Lihat Demo Instan</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={getWaLink(
                        `Halo Temu Waktu, saya ingin memesan undangan digital dengan tema: ${theme.title} (${theme.id})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-serif text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:brightness-110 active:scale-95 text-center ${theme.buttonGrad}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Pesan Tema Ini</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. "100% Terima Beres" — 3-Step Workflow ─────────────── */}
      <section id="workflow" className="py-24 md:py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-[11px] font-serif font-semibold tracking-[0.3em] uppercase text-[#AA7C11] mb-2">
              Kemudahan Layanan
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#50101E] mb-4">
              100% Terima Beres
            </h2>
            <p className="text-sm font-serif italic text-stone-600">
              Anda cukup bersantai menyiapkan gaun dan katering. Tim kami yang menangani seluruh
              keperluan teknis undangan Anda dari nol sampai siap sebar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {WORKFLOW_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#D4AF37]/30 shadow-sm relative flex flex-col justify-between transition-all hover:shadow-[0_10px_30px_rgba(212,175,55,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-[#AA7C11] opacity-70">
                      {item.step}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#6B1728]/10 text-[#6B1728] flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#50101E] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-serif text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 text-[11px] font-serif uppercase tracking-widest text-[#AA7C11]">
                  Langkah {index + 1} dari 3
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Signature Capabilities (Feature Pillars) ──────────── */}
      <section id="fitur" className="py-24 md:py-32 px-6 bg-[#FAF7F2] border-y border-[#D4AF37]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-[11px] font-serif font-semibold tracking-[0.3em] uppercase text-[#AA7C11] mb-2">
              Keunggulan Signature
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#50101E] mb-4">
              Fitur Lengkap Tanpa Batas
            </h2>
            <p className="text-sm font-serif italic text-stone-600">
              Dibangun dengan standar rekayasa web modern untuk kenyamanan tamu dan ketenangan hati
              mempelai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SIGNATURE_CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="p-8 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-sm flex items-start gap-5 transition-all hover:shadow-[0_12px_35px_rgba(107,23,40,0.06)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#6B1728]/10 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#6B1728] shadow-inner">
                  <cap.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#50101E] mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-serif text-stone-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Transparent Pricing / Value Proposition ────────────── */}
      <section id="harga" className="py-24 md:py-32 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-serif font-semibold tracking-[0.3em] uppercase text-[#AA7C11] mb-2">
            Investasi Terjangkau
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#50101E] mb-4">
            Paket All-In Terima Beres
          </h2>
          <p className="text-sm font-serif italic text-stone-600 mb-12">
            Semua fitur mewah dibuka penuh tanpa ada biaya tersembunyi.
          </p>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(107,23,40,0.08)] relative text-left">
            {/* Tag Popular */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-5 py-1.5 rounded-full bg-[#6B1728] text-[#F3E5AB] font-serif text-xs font-bold uppercase tracking-widest shadow-md">
                Paling Populer &amp; Lengkap
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-8 pt-2">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#50101E]">
                  Paket Undangan Digital Couture
                </h3>
                <p className="text-xs text-stone-500 font-serif">Pengerjaan kilat 1x24 jam beres</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs line-through text-stone-400 font-serif block">
                  Rp 199.000
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#6B1728]">
                  Rp 99.000
                </span>
                <span className="text-xs text-[#AA7C11] font-serif block font-medium">
                  Sekali bayar &bull; Aktif 1 Tahun
                </span>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10 text-xs sm:text-sm font-serif text-stone-700">
              {[
                "Masa aktif undangan 1 tahun penuh",
                "Revisi teks & foto sepuasnya sampai Hari-H",
                "Pilihan 5 tema haute-couture eksklusif",
                "Request lagu kenangan favorit (MP3 / YouTube)",
                "Amplop Digital, QRIS & Alamat Kado Fisik",
                "Galeri Foto & Momen Cinta",
                "Buku Tamu & RSVP Real-time Google Sheets",
                "Generator Link Nama Tamu Tak Terbatas",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Order CTA */}
            <a
              href={getWaLink(
                "Halo Admin Temu Waktu, saya ingin memesan Paket All-In Terima Beres Promo Rp 99.000."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-full font-serif font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-[#6B1728] via-[#851C32] to-[#6B1728] text-[#F3E5AB] border border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(107,23,40,0.3)] hover:brightness-105 active:scale-95 transition-all text-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pesan Undangan Sekarang (WhatsApp)</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ Accordion ─────────────────────────────────────── */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-[#FAF7F0] border-t border-[#D4AF37]/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] font-serif font-semibold tracking-[0.3em] uppercase text-[#AA7C11] mb-2">
              Tanya Jawab
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#50101E] mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-sm font-serif italic text-stone-600">
              Segala hal yang perlu Anda ketahui mengenai pemesanan di Temu Waktu.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#D4AF37]/30 bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    type="button"
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#50101E] cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#AA7C11] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm font-serif text-stone-600 leading-relaxed border-t border-stone-100">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. Final Luxury CTA Banner ───────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-[#3B0C15] text-[#FDFBF7] p-8 sm:p-16 text-center relative overflow-hidden border border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(59,12,21,0.4)]">
          {/* Ambient Gold Ornament inside banner */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[#D4AF37] text-2xl mb-4 block">✦</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight mb-4 text-[#FDFBF7]">
              Momen Bersejarah Layak Mendapatkan Pengumuman yang Sempurna.
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-[#F3E5AB]/90 mb-10 leading-relaxed">
              Percayakan pembuatan undangan pernikahan Anda pada Temu Waktu. Cepat, anggun, dan 100%
              terima beres.
            </p>

            <a
              href={getWaLink(
                "Halo Admin Temu Waktu, saya siap membuat undangan digital pernikahan impian kami."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-serif font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#450F1B] hover:brightness-105 active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Mulai Buat Undanganmu (WhatsApp)</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 9. Refined Atelier Footer ────────────────────────────── */}
      <footer className="border-t border-[#D4AF37]/30 py-16 px-6 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-[#851C32] fill-[#851C32]" />
              <span className="font-serif text-lg font-bold text-[#50101E]">Temu Waktu</span>
            </div>
            <p className="text-xs font-serif text-stone-500 max-w-xs">
              Platform Undangan Pernikahan Digital 100% Terima Beres dengan standar desain
              haute-couture.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-serif uppercase tracking-wider text-stone-600">
            <Link href="#katalog" className="hover:text-[#6B1728] transition-colors">
              Katalog Tema
            </Link>
            <Link href="/generator" className="hover:text-[#6B1728] transition-colors">
              Portal Klien &amp; Rekap Tamu
            </Link>
            <a
              href={getWaLink("Halo Admin Temu Waktu, saya ingin bertanya seputar layanan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6B1728] transition-colors"
            >
              Hubungi Admin WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs font-serif text-stone-400">
            &copy; {new Date().getFullYear()} Temu Waktu Atelier. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
