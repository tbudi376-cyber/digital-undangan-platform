"use client";

import { useState } from "react";
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
      <section className="relative min-h-screen flex flex-col items-center justify-between px-6 pt-16 pb-12 overflow-hidden z-10">
        {/* Conservatory Glasshouse Arch Crest */}
        <div className="text-center animate-fade-in max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[10px] font-serif tracking-[0.25em] uppercase shadow-lg backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Paviliun Kaca Botani Interaktif</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#F9F8F4] tracking-wide leading-tight drop-shadow-md">
            {data.groom_nickname}
          </h1>
          <div className="flex items-center justify-center gap-3 my-1.5">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/60" />
            <span className="text-2xl font-serif italic text-amber-300">&amp;</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/60" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#F9F8F4] tracking-wide leading-tight drop-shadow-md">
            {data.bride_nickname}
          </h1>

          {data.akad_date && (
            <p className="text-xs font-serif uppercase tracking-[0.3em] text-emerald-300/80 mt-3 font-light">
              {formatDate(data.akad_date)}
            </p>
          )}
        </div>

        {/* ── The 4 Living Scene Interactive Hotspots Grid ───────────── */}
        <div className="w-full max-w-3xl my-8">
          <div className="text-center mb-4">
            <p className="text-[11px] font-serif uppercase tracking-[0.2em] text-amber-300 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              <span>Ketuk Hotspot Interaktif di Paviliun</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Hotspot 1: Easel Galeri */}
            <button
              type="button"
              onClick={() => setActiveModal("gallery")}
              className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#0E281C]/90 to-[#0A1A12]/90 border border-emerald-500/30 hover:border-amber-400/60 transition-all duration-300 text-left shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:scale-[1.02] cursor-pointer"
            >
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <div className="w-9 h-9 rounded-xl bg-emerald-900/60 border border-emerald-400/30 flex items-center justify-center text-amber-300 mb-2.5 group-hover:bg-amber-500/20 transition-colors">
                <Camera className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-serif uppercase tracking-widest text-emerald-400 mb-0.5">
                Easel Lukisan
              </p>
              <h3 className="text-xs sm:text-sm font-serif font-bold text-white leading-snug">
                Galeri Foto
              </h3>
            </button>

            {/* Hotspot 2: Papan Agenda */}
            <button
              type="button"
              onClick={() => setActiveModal("events")}
              className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#0E281C]/90 to-[#0A1A12]/90 border border-emerald-500/30 hover:border-amber-400/60 transition-all duration-300 text-left shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:scale-[1.02] cursor-pointer"
            >
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <div className="w-9 h-9 rounded-xl bg-emerald-900/60 border border-emerald-400/30 flex items-center justify-center text-amber-300 mb-2.5 group-hover:bg-amber-500/20 transition-colors">
                <Compass className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-serif uppercase tracking-widest text-emerald-400 mb-0.5">
                Papan Kayu
              </p>
              <h3 className="text-xs sm:text-sm font-serif font-bold text-white leading-snug">
                Agenda Acara
              </h3>
            </button>

            {/* Hotspot 3: Peti Kado */}
            <button
              type="button"
              onClick={() => setActiveModal("gift")}
              className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#0E281C]/90 to-[#0A1A12]/90 border border-emerald-500/30 hover:border-amber-400/60 transition-all duration-300 text-left shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:scale-[1.02] cursor-pointer"
            >
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <div className="w-9 h-9 rounded-xl bg-emerald-900/60 border border-emerald-400/30 flex items-center justify-center text-amber-300 mb-2.5 group-hover:bg-amber-500/20 transition-colors">
                <Gift className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-serif uppercase tracking-widest text-emerald-400 mb-0.5">
                Peti Harta
              </p>
              <h3 className="text-xs sm:text-sm font-serif font-bold text-white leading-snug">
                Tanda Kasih
              </h3>
            </button>

            {/* Hotspot 4: Kotak Surat RSVP */}
            <button
              type="button"
              onClick={() => setActiveModal("rsvp")}
              className="group relative p-4 rounded-2xl bg-gradient-to-b from-[#0E281C]/90 to-[#0A1A12]/90 border border-emerald-500/30 hover:border-amber-400/60 transition-all duration-300 text-left shadow-[0_10px_25px_rgba(0,0,0,0.4)] hover:scale-[1.02] cursor-pointer"
            >
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <div className="w-9 h-9 rounded-xl bg-emerald-900/60 border border-emerald-400/30 flex items-center justify-center text-amber-300 mb-2.5 group-hover:bg-amber-500/20 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <p className="text-[10px] font-serif uppercase tracking-widest text-emerald-400 mb-0.5">
                Kotak Surat
              </p>
              <h3 className="text-xs sm:text-sm font-serif font-bold text-white leading-snug">
                Buku Tamu RSVP
              </h3>
            </button>
          </div>
        </div>

        {/* Scroll Indicator Down */}
        <button
          type="button"
          onClick={() => scrollToSection("couple")}
          className="inline-flex flex-col items-center gap-1 text-[10px] font-serif tracking-widest uppercase text-emerald-300/70 hover:text-emerald-200 transition-colors pt-2"
        >
          <span>Gulir ke Lembaran Lengkap</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </section>

      {/* ── Hotspot Interactive Modal Lightbox ─────────────────────── */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-[#0A1A12] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1 rounded-full bg-emerald-950/60 border border-emerald-500/30"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content: Gallery */}
            {activeModal === "gallery" && (
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-300">
                  Easel Lukisan Romansa
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-3">Galeri Foto</h3>
                <p className="text-xs text-stone-300 font-serif italic mb-5 leading-relaxed">
                  Sentuh tombol di bawah untuk melihat koleksi potret dan rekaman momen istimewa kami.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection("gallery")}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-serif font-semibold text-xs tracking-wider uppercase shadow-lg hover:brightness-110"
                >
                  Buka Galeri Foto Lengkap
                </button>
              </div>
            )}

            {/* Modal Content: Events */}
            {activeModal === "events" && (
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-300">
                  Papan Petunjuk Arah
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Rangkaian Acara</h3>
                <div className="space-y-3 my-4 text-xs font-serif text-stone-200">
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <p className="font-bold text-amber-200">Akad Nikah:</p>
                    <p>{formatDate(data.akad_date)} • {data.akad_time}</p>
                    <p className="text-stone-400 mt-1">{data.akad_location}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
                    <p className="font-bold text-amber-200">Resepsi:</p>
                    <p>{formatDate(data.resepsi_date)} • {data.resepsi_time}</p>
                    <p className="text-stone-400 mt-1">{data.resepsi_location}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection("events")}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-serif font-semibold text-xs tracking-wider uppercase shadow-lg hover:brightness-110"
                >
                  Lihat Jadwal &amp; Peta Navigasi
                </button>
              </div>
            )}

            {/* Modal Content: Gift */}
            {activeModal === "gift" && (
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-300">
                  Peti Harta &amp; Kasih
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Amplop Digital &amp; Kado</h3>
                <p className="text-xs text-stone-300 font-serif italic mb-4 leading-relaxed">
                  Bagi kerabat yang ingin memberikan tanda kasih dan doa restu secara cashless.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection("gift")}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-serif font-semibold text-xs tracking-wider uppercase shadow-lg hover:brightness-110"
                >
                  Buka Nomor Rekening &amp; QRIS
                </button>
              </div>
            )}

            {/* Modal Content: RSVP */}
            {activeModal === "rsvp" && (
              <div>
                <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-amber-300">
                  Kotak Surat Paviliun
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-2">Konfirmasi Kehadiran</h3>
                <p className="text-xs text-stone-300 font-serif italic mb-4 leading-relaxed">
                  Kehadiran serta doa restu Anda adalah anugerah terindah bagi lembaran baru pernikahan kami.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection("rsvp")}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-serif font-semibold text-xs tracking-wider uppercase shadow-lg hover:brightness-110"
                >
                  Isi Form RSVP &amp; Tulis Doa
                </button>
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
