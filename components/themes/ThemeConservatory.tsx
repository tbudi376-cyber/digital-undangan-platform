"use client";

import { useState, useEffect } from "react";
import type { ClientData, RsvpEntry } from "@/types";
import { formatDate } from "@/lib/utils";
import { CoverScreen } from "@/components/ui/CoverScreen";
import { RsvpForm } from "@/components/ui/RsvpForm";
import { Countdown } from "@/components/ui/Countdown";
import { GiftSection } from "@/components/ui/GiftSection";
import { Gallery } from "@/components/ui/Gallery";
import { Guestbook } from "@/components/ui/Guestbook";
import {
  MapPin,
  Calendar,
  Clock,
  Video,
  Sparkles,
  Camera,
  Compass,
  Gift,
  Mail,
  X,
  ArrowDown,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Botanical Conservatory Flourish Divider
// ---------------------------------------------------------------------------
function ConservatoryDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6 my-2 relative z-10" aria-hidden="true">
      <div className="h-px w-14 sm:w-28 bg-gradient-to-r from-transparent via-emerald-600/50 to-emerald-500" />
      <div className="flex items-center gap-1.5 text-emerald-400">
        <span className="text-[10px] text-amber-300">✦</span>
        <svg className="w-5 h-5 fill-emerald-400" viewBox="0 0 24 24">
          <path d="M12 2C13 6 17 9 21 10C17 11 13 14 12 18C11 14 7 11 3 10C7 9 11 6 12 2Z" />
        </svg>
        <span className="text-[10px] text-amber-300">✦</span>
      </div>
      <div className="h-px w-14 sm:w-28 bg-gradient-to-l from-transparent via-emerald-600/50 to-emerald-500" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Theme: The Whispering Conservatory (Botanical Glasshouse Living Scene)
// ---------------------------------------------------------------------------
export function ThemeConservatory({
  data,
  guestName,
  guestbook: initialGuestbook = [],
}: {
  data: ClientData;
  guestName?: string;
  guestbook?: RsvpEntry[];
}) {
  const [activeModal, setActiveModal] = useState<"gallery" | "events" | "gift" | "rsvp" | null>(null);
  const [guestbookList, setGuestbookList] = useState<RsvpEntry[]>(initialGuestbook);

  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeModal]);

  const handleRsvpSuccess = (entry: {
    nama_tamu: string;
    kehadiran: "Hadir" | "Tidak Hadir";
    pesan: string;
    timestamp: string;
  }) => {
    setGuestbookList((prev) => [
      {
        slug: data.slug,
        nama_tamu: entry.nama_tamu,
        kehadiran: entry.kehadiran,
        pesan: entry.pesan,
        timestamp: entry.timestamp,
      },
      ...prev,
    ]);
  };

  const scrollToSection = (id: string) => {
    setActiveModal(null);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#07130D] text-[#F9F8F4] selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden font-sans">
      {/* ── 1. Interactive Cover Splash Screen ────────────────────── */}
      <CoverScreen
        groomNickname={data.groom_nickname}
        brideNickname={data.bride_nickname}
        eventDate={data.akad_date}
        guestName={guestName}
        coverImage={data.hero_image}
        variant="conservatory"
      />

      {/* ── Background Ambient Layers ─────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Soft Glasshouse Emerald Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45rem] h-[35rem] bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),transparent_70%)]" />
        <div className="absolute top-[40%] right-0 w-[30rem] h-[30rem] bg-[radial-gradient(circle,_rgba(212,175,55,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(6,78,59,0.15),transparent_70%)]" />

        {/* Botanical Trellis Lace Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%2334D399' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23FCD34D'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── 2. Living Scene Hero: The Botanical Conservatory Gazebo ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 pt-12 pb-16 overflow-hidden z-10 max-w-5xl mx-auto w-full">
        {/* Living Scene Architectural Canvas */}
        <div className="relative w-full rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-gradient-to-b from-[#0E281C] via-[#07170F] to-[#040D08] min-h-[580px] sm:min-h-[640px] flex flex-col justify-between items-center p-6 sm:p-10 select-none">
          {/* SVG Architectural Glasshouse Dome & Hanging Botanicals Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="w-full h-full opacity-35"
              viewBox="0 0 800 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Vaulted Glass Conservatory Outer Arch */}
              <path
                d="M 100 600 V 280 C 100 120, 700 120, 700 280 V 600"
                stroke="#34D399"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 160 600 V 280 C 160 160, 640 160, 640 280 V 600"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              {/* Central Cathedral Dome Ribs */}
              <path
                d="M 400 50 C 400 50, 400 300, 400 600"
                stroke="#FCD34D"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />
              <path
                d="M 400 50 C 320 120, 240 240, 240 600"
                stroke="#34D399"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              <path
                d="M 400 50 C 480 120, 560 240, 560 600"
                stroke="#34D399"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              {/* Horizontal Iron Transoms */}
              <ellipse cx="400" cy="220" rx="270" ry="60" stroke="#34D399" strokeWidth="1" strokeOpacity="0.3" />
              <ellipse cx="400" cy="300" rx="300" ry="70" stroke="#FCD34D" strokeWidth="1" strokeOpacity="0.25" />

              {/* Cascading Wisteria & Ivy Leaves Garland at Top */}
              <g fill="#34D399" fillOpacity="0.4">
                <circle cx="200" cy="90" r="18" />
                <circle cx="230" cy="110" r="14" />
                <circle cx="260" cy="95" r="20" />
                <circle cx="340" cy="70" r="16" />
                <circle cx="380" cy="85" r="22" />
                <circle cx="420" cy="75" r="18" />
                <circle cx="460" cy="90" r="24" />
                <circle cx="540" cy="100" r="16" />
                <circle cx="580" cy="85" r="20" />
                <circle cx="610" cy="110" r="15" />
              </g>

              {/* Warm Candlelight Lantern Chains */}
              <line x1="260" y1="95" x2="260" y2="190" stroke="#FCD34D" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="260" cy="195" r="8" fill="#FCD34D" fillOpacity="0.8" />
              <circle cx="260" cy="195" r="20" fill="#F59E0B" fillOpacity="0.2" />

              <line x1="540" y1="100" x2="540" y2="190" stroke="#FCD34D" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="540" cy="195" r="8" fill="#FCD34D" fillOpacity="0.8" />
              <circle cx="540" cy="195" r="20" fill="#F59E0B" fillOpacity="0.2" />

              {/* Marble Gazebo Floor Perspective Grid */}
              <path d="M 100 600 L 260 500 L 540 500 L 700 600 Z" fill="#0A2016" fillOpacity="0.6" />
              <line x1="260" y1="500" x2="100" y2="600" stroke="#34D399" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="350" y1="500" x2="300" y2="600" stroke="#34D399" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="450" y1="500" x2="500" y2="600" stroke="#34D399" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="540" y1="500" x2="700" y2="600" stroke="#34D399" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
          </div>

          {/* Ambient Lighting Cones */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-80 bg-[radial-gradient(circle,_rgba(252,211,77,0.12),transparent_70%)] pointer-events-none" />

          {/* Central Gazebo Typographic Lockup */}
          <div className="relative z-10 text-center pt-4 sm:pt-6 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-serif tracking-[0.25em] uppercase shadow-lg backdrop-blur-md mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Paviliun Kaca Botani Interaktif</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F9F8F4] tracking-wide leading-tight drop-shadow-md">
              {data.groom_nickname}
            </h1>
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-400/60" />
              <span className="text-xl sm:text-2xl font-serif italic text-amber-300">&amp;</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-emerald-400/60" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F9F8F4] tracking-wide leading-tight drop-shadow-md">
              {data.bride_nickname}
            </h1>

            {data.akad_date && (
              <p className="text-xs font-serif uppercase tracking-[0.3em] text-emerald-300/80 mt-3 font-light">
                {formatDate(data.akad_date)}
              </p>
            )}

            <div className="mt-4 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 inline-block">
              <p className="text-[10px] font-serif uppercase tracking-widest text-amber-300 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                <span>Ketuk Hotspot di Sekitar Paviliun</span>
              </p>
            </div>
          </div>

          {/* ── The 4 Spatial Interactive Hotspot Beacons ────────────── */}
          <div className="relative w-full h-[280px] sm:h-[320px] mt-6 z-20">
            {/* Hotspot 1: Carved Wooden Signpost (Top-Left) */}
            <button
              type="button"
              onClick={() => setActiveModal("events")}
              aria-label="Buka Agenda Acara & Navigasi Lokasi"
              className="absolute top-4 sm:top-6 left-2 sm:left-6 group flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#0B2116]/90 hover:bg-[#0E281C] border border-emerald-500/40 hover:border-amber-400/70 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            >
              <div className="relative w-10 h-10 rounded-xl bg-emerald-900/70 border border-emerald-400/40 flex items-center justify-center text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left pr-1 sm:pr-2">
                <p className="text-[9px] font-serif uppercase tracking-widest text-emerald-400 font-medium">
                  Papan Kayu
                </p>
                <h3 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">
                  Agenda Acara
                </h3>
              </div>
            </button>

            {/* Hotspot 2: Canvas Easel (Bottom-Left) */}
            <button
              type="button"
              onClick={() => setActiveModal("gallery")}
              aria-label="Buka Galeri Foto Romansa"
              className="absolute bottom-4 sm:bottom-6 left-2 sm:left-6 group flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#0B2116]/90 hover:bg-[#0E281C] border border-emerald-500/40 hover:border-amber-400/70 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            >
              <div className="relative w-10 h-10 rounded-xl bg-emerald-900/70 border border-emerald-400/40 flex items-center justify-center text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-left pr-1 sm:pr-2">
                <p className="text-[9px] font-serif uppercase tracking-widest text-emerald-400 font-medium">
                  Easel Lukisan
                </p>
                <h3 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">
                  Galeri Foto
                </h3>
              </div>
            </button>

            {/* Hotspot 3: Vintage Postbox & Lantern (Top-Right) */}
            <button
              type="button"
              onClick={() => setActiveModal("rsvp")}
              aria-label="Buka Kotak Surat RSVP & Doa"
              className="absolute top-4 sm:top-6 right-2 sm:right-6 group flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#0B2116]/90 hover:bg-[#0E281C] border border-emerald-500/40 hover:border-amber-400/70 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            >
              <div className="text-right pl-1 sm:pl-2">
                <p className="text-[9px] font-serif uppercase tracking-widest text-emerald-400 font-medium">
                  Kotak Surat
                </p>
                <h3 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">
                  RSVP &amp; Doa
                </h3>
              </div>
              <div className="relative w-10 h-10 rounded-xl bg-emerald-900/70 border border-emerald-400/40 flex items-center justify-center text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <Mail className="w-5 h-5" />
              </div>
            </button>

            {/* Hotspot 4: Royal Treasure Chest (Bottom-Right) */}
            <button
              type="button"
              onClick={() => setActiveModal("gift")}
              aria-label="Buka Peti Tanda Kasih & Amplop Digital"
              className="absolute bottom-4 sm:bottom-6 right-2 sm:right-6 group flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#0B2116]/90 hover:bg-[#0E281C] border border-emerald-500/40 hover:border-amber-400/70 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            >
              <div className="text-right pl-1 sm:pl-2">
                <p className="text-[9px] font-serif uppercase tracking-widest text-emerald-400 font-medium">
                  Peti Harta
                </p>
                <h3 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">
                  Tanda Kasih
                </h3>
              </div>
              <div className="relative w-10 h-10 rounded-xl bg-emerald-900/70 border border-emerald-400/40 flex items-center justify-center text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <Gift className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>

        {/* Dual-Mode Scroll Transition Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => scrollToSection("couple")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E281C]/90 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs font-serif tracking-widest uppercase shadow-md transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          >
            <span>Atau Gulir ke Lembaran Lengkap</span>
            <ArrowDown className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </button>
        </div>
      </section>

      {/* ── Hotspot Interactive Modal Lightbox ─────────────────────── */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0A1A12] border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Tutup Dialog (Esc)"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content: Gallery */}
            {activeModal === "gallery" && (
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-300">
                  Easel Lukisan Romansa
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Galeri Foto Pengantin</h3>
                <p className="text-xs text-stone-300 font-serif italic mb-4 leading-relaxed">
                  Sentuh foto untuk memperbesar dengan navigasi keyboard atau tombol panah.
                </p>
                {data.gallery_images && (
                  <div className="mb-4">
                    <Gallery images={data.gallery_images} variant="conservatory" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => scrollToSection("gallery")}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-serif font-semibold text-xs tracking-wider uppercase shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  Gulir ke Bagian Galeri di Halaman
                </button>
              </div>
            )}

            {/* Modal Content: Events */}
            {activeModal === "events" && (
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-300">
                  Papan Petunjuk Arah
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-3">Agenda Acara &amp; Lokasi</h3>
                <div className="space-y-3.5 my-4 text-xs font-serif text-stone-200">
                  {/* Akad */}
                  <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-900 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                        Akad Nikah
                      </span>
                    </div>
                    <p className="font-bold text-white text-sm mb-1">{formatDate(data.akad_date)}</p>
                    <p className="text-emerald-300 mb-2">{data.akad_time}</p>
                    <p className="text-stone-300 text-xs mb-3">{data.akad_location}</p>
                    {data.akad_map_url && (
                      <a
                        href={data.akad_map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 text-[11px] font-medium border border-emerald-600/40 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Buka Google Maps</span>
                      </a>
                    )}
                  </div>

                  {/* Resepsi */}
                  <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-900 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                        Resepsi Pernikahan
                      </span>
                    </div>
                    <p className="font-bold text-white text-sm mb-1">{formatDate(data.resepsi_date)}</p>
                    <p className="text-emerald-300 mb-2">{data.resepsi_time}</p>
                    <p className="text-stone-300 text-xs mb-3">{data.resepsi_location}</p>
                    {data.resepsi_map_url && (
                      <a
                        href={data.resepsi_map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-emerald-100 text-[11px] font-medium border border-emerald-600/40 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Buka Google Maps</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content: Gift */}
            {activeModal === "gift" && (
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-300">
                  Peti Harta &amp; Kasih
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Tanda Kasih &amp; Amplop Digital</h3>
                <p className="text-xs text-stone-300 font-serif italic mb-4 leading-relaxed">
                  Doa restu Anda adalah hadiah terindah. Bagi yang ingin memberikan tanda kasih secara cashless:
                </p>
                <div className="my-3">
                  <GiftSection
                    bankName={data.bank_name}
                    bankAccount={data.bank_account}
                    accountOwner={data.account_owner}
                    qrisImage={data.qris_image}
                    physicalGiftAddress={data.physical_gift_address}
                    physicalGiftRecipient={data.physical_gift_recipient}
                    physicalGiftPhone={data.physical_gift_phone}
                    variant="conservatory"
                  />
                </div>
              </div>
            )}

            {/* Modal Content: RSVP */}
            {activeModal === "rsvp" && (
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-300">
                  Kotak Surat Paviliun
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Konfirmasi Kehadiran &amp; Doa</h3>
                <p className="text-xs text-stone-300 font-serif italic mb-4 leading-relaxed">
                  Mohon konfirmasikan kehadiran Anda demi kenyamanan jamuan dan persiapan kami.
                </p>
                <div className="my-3">
                  <RsvpForm
                    slug={data.slug}
                    guestName={guestName}
                    onRsvpSuccess={handleRsvpSuccess}
                    variant="conservatory"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 3. Traditional Linear Flow (Below the Living Scene) ───── */}
      <div className="relative z-10">
        <ConservatoryDivider />

        {/* Couple Profile Section */}
        <section id="couple" className="py-20 px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-serif uppercase tracking-widest mb-3">
            <span>Kedua Mempelai</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            Mempelai Bahagia
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-stone-300 max-w-md mx-auto mb-12">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, kami mengundang kehadiran Bapak/Ibu/Saudara/i:
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Groom */}
            <div className="p-8 rounded-3xl bg-[#0A1A12]/80 border border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-center">
              <span className="inline-block self-start px-3.5 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-[10px] font-serif font-semibold uppercase tracking-wider mb-4">
                Mempelai Pria
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                {data.groom_full_name}
              </h3>
              {data.groom_parents && (
                <p className="text-xs text-stone-300 leading-relaxed font-serif">
                  Putra dari Bapak/Ibu: <br />
                  <span className="font-semibold text-emerald-200">{data.groom_parents}</span>
                </p>
              )}
            </div>

            {/* Bride */}
            <div className="p-8 rounded-3xl bg-[#0A1A12]/80 border border-emerald-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-center">
              <span className="inline-block self-start px-3.5 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-[10px] font-serif font-semibold uppercase tracking-wider mb-4">
                Mempelai Wanita
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                {data.bride_full_name}
              </h3>
              {data.bride_parents && (
                <p className="text-xs text-stone-300 leading-relaxed font-serif">
                  Putri dari Bapak/Ibu: <br />
                  <span className="font-semibold text-emerald-200">{data.bride_parents}</span>
                </p>
              )}
            </div>
          </div>
        </section>

        <ConservatoryDivider />

        {/* Events & Countdown Section */}
        <section id="events" className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
            Rangkaian Hari Bahagia
          </h2>
          <p className="text-xs font-serif italic text-stone-300 mb-8">
            Menghitung hari menuju ikrar suci
          </p>

          <div className="inline-block max-w-full p-2.5 sm:p-4 rounded-3xl border border-emerald-500/40 outline outline-1 outline-emerald-500/20 outline-offset-4 bg-[#0A1A12]/60 backdrop-blur-sm shadow-sm mb-12">
            <Countdown targetDate={data.akad_date} variant="conservatory" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {/* Akad */}
            <div className="p-8 rounded-3xl bg-[#0A1A12]/90 border border-emerald-500/40 shadow-xl flex flex-col justify-between">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-900 text-emerald-200 text-[10px] font-bold uppercase tracking-wider mb-5">
                  Akad Nikah
                </span>
                <div className="flex items-center gap-3 text-stone-100 mb-2.5">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="font-serif font-bold text-xl">{formatDate(data.akad_date)}</p>
                </div>
                <div className="flex items-center gap-3 text-stone-300 text-xs mb-4">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p>{data.akad_time}</p>
                </div>
                <div className="flex items-start gap-3 text-stone-300 text-xs mb-6">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{data.akad_location}</p>
                </div>
              </div>

              {data.akad_map_url && (
                <a
                  href={data.akad_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider transition-all shadow-md"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Buka Google Maps
                </a>
              )}
            </div>

            {/* Resepsi */}
            <div className="p-8 rounded-3xl bg-[#0A1A12]/90 border border-emerald-500/40 shadow-xl flex flex-col justify-between">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-900 text-emerald-200 text-[10px] font-bold uppercase tracking-wider mb-5">
                  Resepsi Pernikahan
                </span>
                <div className="flex items-center gap-3 text-stone-100 mb-2.5">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="font-serif font-bold text-xl">{formatDate(data.resepsi_date)}</p>
                </div>
                <div className="flex items-center gap-3 text-stone-300 text-xs mb-4">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p>{data.resepsi_time}</p>
                </div>
                <div className="flex items-start gap-3 text-stone-300 text-xs mb-6">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{data.resepsi_location}</p>
                </div>
              </div>

              {data.resepsi_map_url && (
                <a
                  href={data.resepsi_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider transition-all shadow-md"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Buka Google Maps
                </a>
              )}
            </div>
          </div>

          {data.stream_link && (
            <div className="mt-10">
              <a
                href={data.stream_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-semibold text-xs tracking-wider uppercase shadow-lg transition-all"
              >
                <Video className="w-4 h-4" />
                Saksikan Siaran Langsung (Live Streaming)
              </a>
            </div>
          )}
        </section>

        {/* Gallery Section */}
        {data.gallery_images && (
          <>
            <ConservatoryDivider />
            <section id="gallery" className="py-20 px-6 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                Galeri Momen Bahagia
              </h2>
              <p className="text-xs font-serif italic text-stone-300 mb-10">
                Langkah perjalanan kasih dalam paviliun kenangan
              </p>
              <Gallery images={data.gallery_images} variant="conservatory" />
            </section>
          </>
        )}

        {/* Gift Section */}
        <ConservatoryDivider />
        <section id="gift" className="py-20 px-6 max-w-3xl mx-auto text-center">
          <GiftSection
            bankName={data.bank_name}
            bankAccount={data.bank_account}
            accountOwner={data.account_owner}
            qrisImage={data.qris_image}
            physicalGiftAddress={data.physical_gift_address}
            physicalGiftRecipient={data.physical_gift_recipient}
            physicalGiftPhone={data.physical_gift_phone}
            variant="conservatory"
          />
        </section>

        {/* RSVP & Guestbook Section */}
        <ConservatoryDivider />
        <section id="rsvp" className="py-24 px-6 max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-xs font-serif italic text-stone-300 mb-8">
            Mohon konfirmasi kehadiran serta kirimkan doa restu terbaik Anda
          </p>

          <RsvpForm
            slug={data.slug}
            guestName={guestName}
            onRsvpSuccess={handleRsvpSuccess}
            variant="conservatory"
          />

          <div id="guestbook" className="mt-16 text-left">
            <Guestbook rsvps={guestbookList} variant="conservatory" />
          </div>
        </section>
      </div>
    </div>
  );
}
