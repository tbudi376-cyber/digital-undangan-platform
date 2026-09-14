"use client";

import { useState } from "react";
import type { ClientData, RsvpEntry } from "@/types";
import { formatDate } from "@/lib/utils";
import { DriveImage } from "@/components/ui/DriveImage";
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
  Heart,
  Sparkles,
  CalendarPlus,
  BookOpen,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Theme: Soft Pastel (Theme 4) - "Love Story Timeline"
// Art Direction: Romantic Dark Violet & Pastel Celestial Timeline
// ---------------------------------------------------------------------------
export function ThemeSoftPastel({
  data,
  guestName,
  guestbook: initialGuestbook = [],
}: {
  data: ClientData;
  guestName?: string;
  guestbook?: RsvpEntry[];
}) {
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

  const formatCalendarUtc = (
    dateStr?: string,
    timeStr?: string,
    fallbackHour = 8,
    isStart = true
  ): string | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("-").map(Number);
    if (parts.length < 3 || !parts[0] || !parts[1] || !parts[2]) return null;
    const [year, month, day] = parts;

    let offsetHours = 7; // Default WIB (UTC+7)
    if (timeStr) {
      const upper = timeStr.toUpperCase();
      if (upper.includes("WITA")) offsetHours = 8;
      else if (upper.includes("WIT")) offsetHours = 9;
    }

    let hour = fallbackHour;
    let minute = 0;
    if (timeStr) {
      const matches = Array.from(timeStr.matchAll(/(\d{1,2})[:.](\d{2})/g));
      if (matches.length > 0) {
        const target =
          !isStart && matches.length > 1 ? matches[matches.length - 1] : matches[0];
        hour = parseInt(target[1], 10);
        minute = parseInt(target[2], 10);
      }
    }

    const localUtcMs = Date.UTC(year, month - 1, day, hour - offsetHours, minute, 0);
    const d = new Date(localUtcMs);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
      d.getUTCHours()
    )}${pad(d.getUTCMinutes())}00Z`;
  };

  const createCalendarUrl = () => {
    const title = encodeURIComponent(
      `Pernikahan ${data.groom_nickname} & ${data.bride_nickname}`
    );
    const details = encodeURIComponent(
      `Akad & Resepsi Pernikahan ${data.groom_full_name} & ${data.bride_full_name}.\nLokasi: ${
        data.resepsi_location || data.akad_location
      }`
    );
    const location = encodeURIComponent(data.resepsi_location || data.akad_location || "");

    const startUtc =
      formatCalendarUtc(data.akad_date, data.akad_time, 8, true) || "20261231T010000Z";
    const endUtc =
      formatCalendarUtc(
        data.resepsi_date || data.akad_date,
        data.resepsi_time || data.akad_time,
        14,
        false
      ) || "20261231T070000Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startUtc}/${endUtc}`;
  };

  return (
    <div className="min-h-screen bg-[#05030a] flex justify-center text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* ── 1. Interactive Cover Splash Screen ────────────────────── */}
      <CoverScreen
        groomNickname={data.groom_nickname}
        brideNickname={data.bride_nickname}
        eventDate={data.akad_date}
        guestName={guestName}
        coverImage={data.hero_image}
        variant="pastel"
      />

      {/* ── Mobile-First Frame Container ─────────────────────────── */}
      <div className="w-full max-w-[500px] min-h-screen relative bg-[#090614] shadow-2xl overflow-x-hidden border-x border-purple-950/40 flex flex-col">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-violet-950/20 rounded-full blur-3xl pointer-events-none" />

        {/* ── 2. Hero Section (Prologue) ───────────────────────────── */}
        <header className="relative pt-12 pb-8 px-6 text-center flex flex-col items-center">
          {data.hero_image && (
            <div className="relative w-60 h-76 rounded-3xl overflow-hidden border-2 border-purple-400/30 shadow-2xl shadow-purple-950/50 mb-6 animate-fade-in">
              <DriveImage
                url={data.hero_image}
                alt={`Foto ${data.groom_nickname} & ${data.bride_nickname}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-400/30 text-purple-200 text-[11px] font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 text-purple-300" />
            The Wedding of
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            {data.groom_nickname} &amp; {data.bride_nickname}
          </h1>

          {data.akad_date && (
            <p className="text-xs uppercase tracking-[0.25em] text-purple-200/80 font-light mt-2.5">
              {formatDate(data.akad_date)}
            </p>
          )}

          {data.quote && (
            <div className="mt-6 px-4 py-4 rounded-2xl bg-purple-950/30 border border-purple-800/30 max-w-xs mx-auto">
              <p className="text-xs italic text-slate-300 leading-relaxed">
                &ldquo;{data.quote}&rdquo;
              </p>
              {data.quote_source && (
                <p className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider mt-2">
                  — {data.quote_source}
                </p>
              )}
            </div>
          )}
        </header>

        {/* ── 3. Love Story Timeline Track ─────────────────────────── */}
        <main className="relative px-4 sm:px-6 py-8">
          {/* Continuous Glowing Beam */}
          <div
            className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-4 bottom-12 w-0.5 bg-gradient-to-b from-purple-500/20 via-purple-400/40 to-purple-500/20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {/* ── Milestone 1: Mempelai Pria (Left branch on desktop, left-spine on mobile) ── */}
            <div className="relative flex items-start sm:justify-start">
              {/* Timeline Node */}
              <div
                className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-5 w-5 h-5 rounded-full bg-[#140e26] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_12px_rgba(192,132,252,0.6)] z-10"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
              </div>

              {/* Connector Segment */}
              <div
                className="hidden sm:block absolute top-7 right-1/2 w-6 h-0.5 bg-purple-400/30"
                aria-hidden="true"
              />

              {/* Card */}
              <div className="w-[calc(100%-2.5rem)] ml-auto pl-2 sm:w-[46%] sm:ml-0 sm:mr-auto sm:pl-0 sm:pr-2">
                <article className="p-5 rounded-2xl bg-[#140e26]/90 border border-purple-800/40 border-l-4 border-l-purple-400 shadow-lg text-left backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-purple-300 mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Bab I · Mempelai Pria
                  </div>
                  <h2 className="text-xl font-serif font-bold text-white mb-1">
                    {data.groom_full_name}
                  </h2>
                  <p className="text-xs text-purple-300/90 font-medium mb-3">
                    Putra Tercinta
                  </p>
                  {data.groom_parents && (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Putra dari {data.groom_parents}
                    </p>
                  )}
                </article>
              </div>
            </div>

            {/* ── Milestone 2: Mempelai Wanita (Right branch on desktop, right-accent on mobile) ── */}
            <div className="relative flex items-start sm:justify-end">
              {/* Timeline Node */}
              <div
                className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-5 w-5 h-5 rounded-full bg-[#140e26] border-2 border-fuchsia-400 flex items-center justify-center shadow-[0_0_12px_rgba(232,121,249,0.6)] z-10"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-300 animate-pulse" />
              </div>

              {/* Connector Segment */}
              <div
                className="hidden sm:block absolute top-7 left-1/2 w-6 h-0.5 bg-fuchsia-400/30"
                aria-hidden="true"
              />

              {/* Card */}
              <div className="w-[calc(100%-2.5rem)] ml-auto pl-2 sm:w-[46%] sm:ml-auto sm:mr-0 sm:pl-2 sm:pr-0">
                <article className="p-5 rounded-2xl bg-[#140e26]/90 border border-purple-800/40 border-r-4 border-r-fuchsia-400 shadow-lg text-left backdrop-blur-md">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-fuchsia-300 mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Bab II · Mempelai Wanita
                  </div>
                  <h2 className="text-xl font-serif font-bold text-white mb-1">
                    {data.bride_full_name}
                  </h2>
                  <p className="text-xs text-fuchsia-300/90 font-medium mb-3">
                    Putri Tercinta
                  </p>
                  {data.bride_parents && (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Putri dari {data.bride_parents}
                    </p>
                  )}
                </article>
              </div>
            </div>

            {/* ── Milestone 3: Menghitung Hari (Center Anchor with Orb Cluster) ── */}
            <div className="relative">
              {/* Timeline Node */}
              <div
                className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-[#140e26] border-2 border-purple-300 flex items-center justify-center shadow-[0_0_14px_rgba(216,180,254,0.7)] z-10"
                aria-hidden="true"
              >
                <Sparkles className="w-3 h-3 text-purple-200" />
              </div>

              <div className="w-[calc(100%-2.5rem)] ml-auto pl-2 sm:w-full sm:ml-0 sm:pl-0 pt-8 text-center">
                <div className="p-6 rounded-3xl bg-[#120c22]/90 border border-purple-800/40 shadow-xl backdrop-blur-md">
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-950 border border-purple-700/50 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                    Bab III · Menghitung Hari
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    Waktu Menuju Bahagia
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Menghitung hari menuju ikatan suci pernikahan
                  </p>

                  {/* Floating Glassmorphism Orb Cluster */}
                  <Countdown targetDate={data.akad_date} variant="pastel" />

                  <div className="mt-4">
                    <a
                      href={createCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-950 hover:bg-purple-900 text-purple-200 text-xs font-semibold border border-purple-600/50 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <CalendarPlus className="w-4 h-4 text-purple-300" />
                      Simpan ke Google Calendar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Milestone 4: Akad Nikah (Left branch) ── */}
            <div className="relative flex items-start sm:justify-start">
              {/* Timeline Node */}
              <div
                className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-5 w-5 h-5 rounded-full bg-[#140e26] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_12px_rgba(192,132,252,0.6)] z-10"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
              </div>

              {/* Connector Segment */}
              <div
                className="hidden sm:block absolute top-7 right-1/2 w-6 h-0.5 bg-purple-400/30"
                aria-hidden="true"
              />

              {/* Card */}
              <div className="w-[calc(100%-2.5rem)] ml-auto pl-2 sm:w-[46%] sm:ml-0 sm:mr-auto sm:pl-0 sm:pr-2">
                <article className="p-5 rounded-2xl bg-[#140e26]/90 border border-purple-800/40 border-l-4 border-l-purple-400 shadow-lg text-left backdrop-blur-md">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-3 border border-purple-800/50">
                    Bab IV · Janji Suci
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3">
                    Akad Nikah
                  </h3>

                  <div className="flex items-center gap-2.5 text-white mb-2 text-xs">
                    <Calendar className="w-4 h-4 text-purple-300 shrink-0" />
                    <span className="font-semibold">{formatDate(data.akad_date)}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-purple-200 text-xs mb-3">
                    <Clock className="w-4 h-4 text-purple-300 shrink-0" />
                    <span>{data.akad_time}</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-300 text-xs mb-5">
                    <MapPin className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{data.akad_location}</p>
                  </div>

                  {data.akad_map_url && (
                    <a
                      href={data.akad_map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-900/80 hover:bg-purple-850 text-white text-xs font-semibold border border-purple-500/40 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-purple-300" />
                      Petunjuk Google Maps
                    </a>
                  )}
                </article>
              </div>
            </div>

            {/* ── Milestone 5: Resepsi Pernikahan (Right branch) ── */}
            <div className="relative flex items-start sm:justify-end">
              {/* Timeline Node */}
              <div
                className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-5 w-5 h-5 rounded-full bg-[#140e26] border-2 border-fuchsia-400 flex items-center justify-center shadow-[0_0_12px_rgba(232,121,249,0.6)] z-10"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-300 animate-pulse" />
              </div>

              {/* Connector Segment */}
              <div
                className="hidden sm:block absolute top-7 left-1/2 w-6 h-0.5 bg-fuchsia-400/30"
                aria-hidden="true"
              />

              {/* Card */}
              <div className="w-[calc(100%-2.5rem)] ml-auto pl-2 sm:w-[46%] sm:ml-auto sm:mr-0 sm:pl-2 sm:pr-0">
                <article className="p-5 rounded-2xl bg-[#140e26]/90 border border-purple-800/40 border-r-4 border-r-fuchsia-400 shadow-lg text-left backdrop-blur-md">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-fuchsia-950 text-fuchsia-300 text-[10px] font-bold uppercase tracking-wider mb-3 border border-fuchsia-800/50">
                    Bab V · Perayaan Kasih
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3">
                    Resepsi Pernikahan
                  </h3>

                  <div className="flex items-center gap-2.5 text-white mb-2 text-xs">
                    <Calendar className="w-4 h-4 text-fuchsia-300 shrink-0" />
                    <span className="font-semibold">{formatDate(data.resepsi_date)}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-purple-200 text-xs mb-3">
                    <Clock className="w-4 h-4 text-fuchsia-300 shrink-0" />
                    <span>{data.resepsi_time}</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-300 text-xs mb-5">
                    <MapPin className="w-4 h-4 text-fuchsia-300 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{data.resepsi_location}</p>
                  </div>

                  <div className="space-y-2.5">
                    {data.resepsi_map_url && (
                      <a
                        href={data.resepsi_map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-900/80 hover:bg-purple-850 text-white text-xs font-semibold border border-purple-500/40 transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-fuchsia-300" />
                        Petunjuk Google Maps
                      </a>
                    )}

                    {data.stream_link && (
                      <a
                        href={data.stream_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-violet-950 hover:bg-violet-900 text-purple-200 text-xs font-semibold border border-purple-500/30 transition-all"
                      >
                        <Video className="w-3.5 h-3.5 text-purple-300" />
                        Live Stream Resepsi
                      </a>
                    )}
                  </div>
                </article>
              </div>
            </div>

            {/* ── Milestone 6: Galeri Kenangan (Center Anchor) ── */}
            {data.gallery_images && (
              <div className="relative">
                {/* Timeline Node */}
                <div
                  className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-[#140e26] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_12px_rgba(192,132,252,0.6)] z-10"
                  aria-hidden="true"
                >
                  <Sparkles className="w-3 h-3 text-purple-300" />
                </div>

                <div className="w-[calc(100%-2.5rem)] ml-auto pl-2 sm:w-full sm:ml-0 sm:pl-0 pt-8 text-center">
                  <div className="p-6 rounded-3xl bg-[#120c22]/90 border border-purple-800/40 shadow-xl backdrop-blur-md">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-950 border border-purple-700/50 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Bab VI · Album Kenangan
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mb-1">
                      Momen Bahagia
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">
                      Potret kenangan perjalanan cinta kami berdua
                    </p>

                    <Gallery images={data.gallery_images} variant="pastel" />
                  </div>
                </div>
              </div>
            )}

            {/* ── Milestone 7: Amplop Digital / Fanned Card Stack (Center Anchor) ── */}
            <div className="relative">
              {/* Timeline Node */}
              <div
                className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-[#140e26] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_12px_rgba(192,132,252,0.6)] z-10"
                aria-hidden="true"
              >
                <Heart className="w-3 h-3 text-purple-300 fill-purple-300" />
              </div>

              <div className="w-[calc(100%-2.5rem)] ml-auto pl-2 sm:w-full sm:ml-0 sm:pl-0 pt-8">
                <GiftSection
                  bankName={data.bank_name}
                  bankAccount={data.bank_account}
                  accountOwner={data.account_owner}
                  qrisImage={data.qris_image}
                  physicalGiftAddress={data.physical_gift_address}
                  physicalGiftRecipient={data.physical_gift_recipient}
                  physicalGiftPhone={data.physical_gift_phone}
                  variant="pastel"
                />
              </div>
            </div>

            {/* ── Milestone 8: RSVP & Buku Tamu (Center Anchor) ── */}
            <div className="relative">
              {/* Timeline Node */}
              <div
                className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-[#140e26] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_12px_rgba(192,132,252,0.6)] z-10"
                aria-hidden="true"
              >
                <Sparkles className="w-3 h-3 text-purple-300" />
              </div>

              <div className="w-[calc(100%-2.5rem)] ml-auto pl-2 sm:w-full sm:ml-0 sm:pl-0 pt-8">
                <div className="p-6 rounded-3xl bg-[#120c22]/90 border border-purple-800/40 shadow-xl backdrop-blur-md">
                  <div className="text-center mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-950 border border-purple-700/50 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Bab VIII · Doa &amp; Restu
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mb-1">
                      Konfirmasi Kehadiran
                    </h3>
                    <p className="text-xs text-slate-400">
                      Mohon konfirmasi kehadiran serta kirimkan doa tulus Anda
                    </p>
                  </div>

                  <RsvpForm
                    slug={data.slug}
                    guestName={guestName}
                    variant="pastel"
                    onRsvpSuccess={handleRsvpSuccess}
                  />

                  <div className="mt-8 pt-6 border-t border-purple-900/40">
                    <Guestbook rsvps={guestbookList} variant="pastel" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ── 4. Epilogue / Footer ─────────────────────────────────── */}
        <footer className="py-12 px-6 text-center text-xs text-slate-400 border-t border-purple-950/40 relative z-10">
          <p className="font-serif text-sm text-purple-200 mb-1">
            Terima kasih atas doa &amp; restu Anda
          </p>
          <p className="font-serif text-lg font-bold text-white mb-3">
            {data.groom_nickname} &amp; {data.bride_nickname}
          </p>
          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[11px]">
            <span>Dibuat dengan</span>
            <Heart className="w-3 h-3 text-purple-400 fill-purple-400" />
            <span>oleh Temu Waktu</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
