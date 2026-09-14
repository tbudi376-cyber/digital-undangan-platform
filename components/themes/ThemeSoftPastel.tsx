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
} from "lucide-react";

function CosmicBeamDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6 relative z-10" aria-hidden="true">
      <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-400/50 to-purple-300" />
      <div className="p-1.5 rounded-full bg-purple-950/60 border border-purple-400/30 backdrop-blur-md shadow-[0_0_12px_rgba(192,132,252,0.4)]">
        <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
      </div>
      <div className="h-px w-20 bg-gradient-to-l from-transparent via-purple-400/50 to-purple-300" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Theme: Soft Pastel (Theme 9) - Romantic Dark Violet & Pastel
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
    <div className="min-h-screen bg-slate-950 flex justify-center text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
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
      <div className="w-full max-w-[480px] min-h-screen relative bg-[#0a0713] shadow-2xl overflow-x-hidden border-x border-purple-950/40 flex flex-col">
        {/* Ambient Pulsing Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute top-[40%] right-0 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-[20%] left-0 w-80 h-80 bg-fuchsia-700/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        {/* ── 3. Hero Section ──────────────────────────────────────── */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 text-center">
          {data.hero_image && (
            <div className="relative w-64 h-80 rounded-3xl overflow-hidden border-2 border-purple-400/30 shadow-2xl shadow-purple-900/30 mb-8 animate-fade-in">
              <DriveImage
                url={data.hero_image}
                alt={`Foto ${data.groom_nickname} & ${data.bride_nickname}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-purple-900/50 border border-purple-400/30 text-purple-200 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            The Wedding of
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            {data.groom_nickname} &amp; {data.bride_nickname}
          </h1>

          {data.akad_date && (
            <p className="text-xs uppercase tracking-[0.25em] text-purple-200/80 font-light mt-3">
              {formatDate(data.akad_date)}
            </p>
          )}

          {data.quote && (
            <div className="mt-8 px-4">
              <p className="text-xs italic text-slate-300 leading-relaxed max-w-xs mx-auto">
                &ldquo;{data.quote}&rdquo;
              </p>
              {data.quote_source && (
                <p className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider mt-2">
                  — {data.quote_source}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Cosmic Beam Divider */}
        <CosmicBeamDivider />

        {/* ── 4. Couple Section ────────────────────────────────────── */}
        <section className="py-16 px-6 text-center border-y border-purple-950/40 bg-[#0d091a]/80 backdrop-blur-md">
          <h2 className="text-2xl font-serif font-bold text-purple-100 mb-2">Kedua Mempelai</h2>
          <p className="text-xs text-slate-400 mb-10 max-w-xs mx-auto">
            Maha suci Allah yang telah mempertemukan kami dalam ikatan pernikahan yang suci.
          </p>

          <div className="space-y-6">
            {/* Groom */}
            <div className="p-6 rounded-2xl backdrop-blur-xl bg-purple-950/30 border border-purple-400/25 shadow-[0_8px_32px_rgba(40,10,60,0.3)]">
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                {data.groom_full_name}
              </h3>
              <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
                Mempelai Pria
              </p>
              {data.groom_parents && (
                <p className="text-xs text-slate-400 leading-relaxed">{data.groom_parents}</p>
              )}
            </div>

            {/* Bride */}
            <div className="p-6 rounded-2xl backdrop-blur-xl bg-purple-950/30 border border-purple-400/25 shadow-[0_8px_32px_rgba(40,10,60,0.3)]">
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                {data.bride_full_name}
              </h3>
              <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
                Mempelai Wanita
              </p>
              {data.bride_parents && (
                <p className="text-xs text-slate-400 leading-relaxed">{data.bride_parents}</p>
              )}
            </div>
          </div>
        </section>

        {/* Cosmic Beam Divider */}
        <CosmicBeamDivider />

        {/* ── 5. Event Details & Countdown ─────────────────────────── */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-2">Waktu &amp; Tempat</h2>
          <p className="text-xs text-slate-400">Menghitung hari menuju lembaran baru</p>

          <Countdown targetDate={data.akad_date} variant="pastel" />

          {/* Add to Calendar Button */}
          <div className="mb-10">
            <a
              href={createCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-900/50 hover:bg-purple-900 text-purple-200 text-xs font-medium border border-purple-700/50 transition-all shadow-sm"
            >
              <CalendarPlus className="w-4 h-4 text-purple-300" />
              Simpan ke Google Calendar
            </a>
          </div>

          <div className="space-y-6 text-left">
            {/* Akad */}
            <div className="p-6 rounded-2xl bg-[#140e26] border border-purple-800/40 shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-950 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-4 border border-purple-800/50">
                Akad Nikah
              </span>
              <div className="flex items-center gap-2.5 text-white mb-2">
                <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                <p className="font-serif font-semibold">{formatDate(data.akad_date)}</p>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 text-xs mb-3">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <p>{data.akad_time}</p>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400 text-xs mb-5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{data.akad_location}</p>
              </div>

              {data.akad_map_url && (
                <a
                  href={data.akad_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-md shadow-purple-900/30"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Petunjuk Google Maps
                </a>
              )}
            </div>

            {/* Resepsi */}
            <div className="p-6 rounded-2xl bg-[#140e26] border border-purple-800/40 shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full bg-fuchsia-950 text-fuchsia-300 text-[10px] font-bold uppercase tracking-wider mb-4 border border-fuchsia-800/50">
                Resepsi Pernikahan
              </span>
              <div className="flex items-center gap-2.5 text-white mb-2">
                <Calendar className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <p className="font-serif font-semibold">{formatDate(data.resepsi_date)}</p>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 text-xs mb-3">
                <Clock className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <p>{data.resepsi_time}</p>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400 text-xs mb-5">
                <MapPin className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{data.resepsi_location}</p>
              </div>

              {data.resepsi_map_url && (
                <a
                  href={data.resepsi_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-purple-900/30"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Petunjuk Google Maps
                </a>
              )}
            </div>
          </div>

          {data.stream_link && (
            <div className="mt-8">
              <a
                href={data.stream_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 hover:from-purple-500 hover:to-indigo-500 transition-all"
              >
                <Video className="w-4 h-4" />
                Saksikan Siaran Langsung (Live Stream)
              </a>
            </div>
          )}
        </section>

        {/* ── 6. Gallery Section ───────────────────────────────────── */}
        {data.gallery_images && (
          <section className="py-16 px-6 text-center bg-[#0d091a] border-y border-purple-950/40">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">Galeri Foto</h2>
            <p className="text-xs text-slate-400 mb-6">Momen bahagia kami berdua</p>
            <Gallery images={data.gallery_images} variant="pastel" />
          </section>
        )}

        {/* ── 7. Digital Envelope / Gift Section ────────────────────── */}
        <section className="py-16 px-6">
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
        </section>

        {/* ── 8. RSVP & Guestbook Section ──────────────────────────── */}
        <section className="py-16 px-6 bg-[#0d091a] border-t border-purple-950/40">
          <RsvpForm
            slug={data.slug}
            guestName={guestName}
            variant="pastel"
            onRsvpSuccess={handleRsvpSuccess}
          />
          <Guestbook rsvps={guestbookList} variant="pastel" />
        </section>

        {/* ── 9. Footer ────────────────────────────────────────────── */}
        <footer className="py-12 px-6 text-center text-xs text-slate-500 border-t border-purple-950/40">
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
