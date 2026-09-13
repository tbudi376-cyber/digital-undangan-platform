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
import { MapPin, Clock, Video } from "lucide-react";

// ---------------------------------------------------------------------------
// Theme: Modern Minimalist (Monochrome & Editorial Sans)
// ---------------------------------------------------------------------------
export function ThemeMinimalist({
  data,
  guestName,
  guestbook: initialGuestbook = [],
}: {
  data: ClientData;
  guestName?: string;
  guestbook?: RsvpEntry[];
}) {
  const [guestbookList, setGuestbookList] = useState<RsvpEntry[]>(initialGuestbook);

  const handleRsvpSuccess = (entry: { nama_tamu: string; kehadiran: "Hadir" | "Tidak Hadir"; pesan: string; timestamp: string }) => {
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

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white relative">
      {/* ── Full-Height Swiss Editorial Grid Lines & Coordinate Markings ── */}
      <div className="fixed inset-0 pointer-events-none max-w-5xl mx-auto border-x border-black/[0.05] z-0 hidden md:flex justify-between" aria-hidden="true">
        <div className="absolute top-16 -left-8 -rotate-90 text-[9px] font-mono text-zinc-400 tracking-[0.3em] uppercase select-none">
          48°51&apos;24&quot;N // 02°21&apos;07&quot;E
        </div>
        <div className="absolute bottom-16 -right-8 rotate-90 text-[9px] font-mono text-zinc-400 tracking-[0.3em] uppercase select-none">
          SWISS ARCHITECTURAL GRID // 01-MMXXVI
        </div>
      </div>

      {/* ── 1. Interactive Cover Splash Screen ────────────────────── */}
      <CoverScreen
        groomNickname={data.groom_nickname}
        brideNickname={data.bride_nickname}
        eventDate={data.akad_date}
        guestName={guestName}
        coverImage={data.hero_image}
        variant="minimalist"
      />

      {/* ── 3. Hero Section ──────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 pb-20 border-b border-black/10">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          {/* Exhibition Plaque Header */}
          <div className="w-full border-b border-black/10 pb-4 mb-8 flex justify-between items-center text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            <span>01 // THE UNION</span>
            <span>TEMU WAKTU MONOLITH</span>
          </div>

          {/* Hero Image - Architectural Aspect Ratio */}
          {data.hero_image && (
            <div className="w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden mb-12 border border-black/10 relative">
              <DriveImage
                url={data.hero_image}
                alt={`Foto ${data.groom_nickname} & ${data.bride_nickname}`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          )}

          {/* Massive Asymmetric Editorial Typography */}
          <div className="w-full text-left mb-10">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85] text-black">
              {data.groom_nickname}
            </h1>
            <div className="flex items-center gap-4 py-3">
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-400">
                [ AND ]
              </span>
              <div className="h-px flex-1 bg-black/10" />
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85] text-black text-right">
              {data.bride_nickname}
            </h1>
          </div>

          {/* Minimalist Exhibition Plaque Date Stamp */}
          <div className="w-full p-4 border border-black/10 bg-zinc-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-600 mb-8">
            <span className="font-bold text-black">
              DATE. {data.akad_date ? formatDate(data.akad_date).toUpperCase() : "2026"}
            </span>
            <span className="text-[10px] text-zinc-400 tracking-[0.2em]">
              CEREMONY &amp; RECEPTION
            </span>
          </div>

          {/* Quote */}
          {data.quote && (
            <div className="w-full p-6 border-l-2 border-black bg-zinc-50/50 text-left">
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                &ldquo;{data.quote}&rdquo;
              </p>
              {data.quote_source && (
                <p className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-2">
                  {"//"} {data.quote_source}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Couple Profile Section ────────────────────────────── */}
      <section className="py-24 px-6 bg-zinc-50/60 border-b border-black/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
            02 // THE RENDEZVOUS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black uppercase tracking-tight mb-14">
            Kedua Mempelai
          </h2>

          <div className="grid md:grid-cols-2 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 text-left bg-white">
            <div className="p-8 sm:p-10 hover:bg-zinc-50 transition-colors">
              <span className="inline-block text-[9px] font-mono tracking-[0.25em] uppercase text-zinc-500 mb-4 border border-black/10 px-2 py-0.5">
                MEMPELAI PRIA
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-tight mb-3">
                {data.groom_full_name}
              </h3>
              {data.groom_parents && (
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  Putra dari Bapak/Ibu: <br />
                  <span className="font-medium text-zinc-800">{data.groom_parents}</span>
                </p>
              )}
            </div>

            <div className="p-8 sm:p-10 hover:bg-zinc-50 transition-colors">
              <span className="inline-block text-[9px] font-mono tracking-[0.25em] uppercase text-zinc-500 mb-4 border border-black/10 px-2 py-0.5">
                MEMPELAI WANITA
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-tight mb-3">
                {data.bride_full_name}
              </h3>
              {data.bride_parents && (
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  Putri dari Bapak/Ibu: <br />
                  <span className="font-medium text-zinc-800">{data.bride_parents}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Event Details & Countdown ─────────────────────────── */}
      <section className="py-24 px-6 border-b border-black/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
            03 // THE ITINERARY &amp; SCHEDULE
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black uppercase tracking-tight mb-2">
            Rangkaian Acara
          </h2>

          <Countdown targetDate={data.akad_date} variant="minimalist" />

          {/* Cards Akad & Resepsi - Swiss Modular Hairline Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
            {/* Akad */}
            <div className="p-8 border border-black/15 bg-zinc-50/50 flex flex-col justify-between hover:border-black transition-colors">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black text-white px-3 py-1 mb-5 inline-block">
                  AKAD NIKAH
                </span>
                <p className="text-2xl font-bold text-black tracking-tight mb-3">
                  {formatDate(data.akad_date)}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 mb-3">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{data.akad_time}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-zinc-600 mb-8 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{data.akad_location}</span>
                </div>
              </div>

              {data.akad_map_url && (
                <a
                  href={data.akad_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-black hover:bg-zinc-800 text-white text-center text-xs font-mono uppercase tracking-[0.2em] transition-all rounded-none"
                >
                  [ GOOGLE MAPS ]
                </a>
              )}
            </div>

            {/* Resepsi */}
            <div className="p-8 border border-black/15 bg-zinc-50/50 flex flex-col justify-between hover:border-black transition-colors">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black text-white px-3 py-1 mb-5 inline-block">
                  RESEPSI
                </span>
                <p className="text-2xl font-bold text-black tracking-tight mb-3">
                  {formatDate(data.resepsi_date)}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 mb-3">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{data.resepsi_time}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-zinc-600 mb-8 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{data.resepsi_location}</span>
                </div>
              </div>

              {data.resepsi_map_url && (
                <a
                  href={data.resepsi_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-black hover:bg-zinc-800 text-white text-center text-xs font-mono uppercase tracking-[0.2em] transition-all rounded-none"
                >
                  [ GOOGLE MAPS ]
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
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-black hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-[0.2em] transition-all rounded-none"
              >
                <Video className="w-4 h-4" />
                <span>[ LIVE STREAMING ]</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. Gallery Section ───────────────────────────────────── */}
      {data.gallery_images && (
        <section className="py-24 px-6 bg-zinc-50/60 border-b border-black/10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
              04 // ARCHIVE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black uppercase tracking-tight">
              Dokumentasi
            </h2>
          </div>
          <Gallery images={data.gallery_images} variant="minimalist" />
        </section>
      )}

      {/* ── 7. Digital Envelope / Gift Section ────────────────────── */}
      <section className="py-24 px-6 border-b border-black/10">
        <GiftSection
          bankName={data.bank_name}
          bankAccount={data.bank_account}
          accountOwner={data.account_owner}
          qrisImage={data.qris_image}
          physicalGiftAddress={data.physical_gift_address}
          physicalGiftRecipient={data.physical_gift_recipient}
          physicalGiftPhone={data.physical_gift_phone}
          variant="minimalist"
        />
      </section>

      {/* ── 8. RSVP & Guestbook Section ──────────────────────────── */}
      <section className="py-24 px-6 bg-zinc-50/60 border-b border-black/10">
        <div className="max-w-xl mx-auto text-center">
          <RsvpForm
            slug={data.slug}
            guestName={guestName}
            variant="minimalist"
            onRsvpSuccess={handleRsvpSuccess}
          />
          <Guestbook rsvps={guestbookList} variant="minimalist" />
        </div>
      </section>

      {/* ── 9. Footer ────────────────────────────────────────────── */}
      <footer className="py-16 px-6 text-center text-xs text-zinc-400 bg-white">
        <p className="text-xl font-bold text-black uppercase tracking-tighter mb-2">
          {data.groom_nickname} &amp; {data.bride_nickname}
        </p>
        <p className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase">
          TEMU WAKTU &mdash; ARCHITECTURAL DIGITAL INVITATION
        </p>
      </footer>
    </div>
  );
}
