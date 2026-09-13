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
import { MapPin, Calendar, Clock, Video, Heart, Leaf } from "lucide-react";

function OliveVineDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6 my-2 relative z-10" aria-hidden="true">
      <div className="h-px w-14 sm:w-24 bg-gradient-to-r from-transparent to-[#2E4A3D]/40" />
      <div className="flex items-center gap-1.5 text-[#2E4A3D]">
        <Leaf className="w-3.5 h-3.5 text-[#A65D46] -rotate-45" />
        <span className="text-xs text-[#2E4A3D] font-serif">❦</span>
        <Leaf className="w-3.5 h-3.5 text-[#2E4A3D] rotate-45" />
      </div>
      <div className="h-px w-14 sm:w-24 bg-gradient-to-l from-transparent to-[#2E4A3D]/40" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Theme: Rustic Garden (Sage Green & Earthy Warm Tones)
// ---------------------------------------------------------------------------
export function ThemeRustic({
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
    <div className="min-h-screen bg-[#F8F5EE] text-stone-800 selection:bg-[#2E4A3D]/20 selection:text-[#2E4A3D] relative overflow-hidden">
      {/* ── 1. Interactive Cover Splash Screen ────────────────────── */}
      <CoverScreen
        groomNickname={data.groom_nickname}
        brideNickname={data.bride_nickname}
        eventDate={data.akad_date}
        guestName={guestName}
        coverImage={data.hero_image}
        variant="rustic"
      />

      {/* ── Tactile Handmade Paper Texture Layer ──────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(#2E4A3D_1px,transparent_1px)] [background-size:24px_24px] opacity-10 z-0"
        aria-hidden="true"
      />
      {/* Botanical Corner Watercolor Foliage Vignettes */}
      <div className="fixed top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(46,74,61,0.12),transparent_70%)] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(166,93,70,0.1),transparent_70%)] pointer-events-none z-0" />

      {/* Ambient background glow */}
      <div className="absolute top-10 -left-10 w-96 h-96 bg-[#2E4A3D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 -right-10 w-96 h-96 bg-[#A65D46]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── 3. Hero Section ──────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E4A3D]/10 border border-[#2E4A3D]/25 text-[#2E4A3D] text-[11px] font-serif font-semibold tracking-widest uppercase mb-8 animate-fade-in">
          <Leaf className="w-3.5 h-3.5 text-[#A65D46]" />
          The Wedding Celebration
        </div>

        {/* Cover Photo with Artisan Deckled Edge Frame */}
        {data.hero_image && (
          <div className="relative w-64 h-84 sm:w-72 sm:h-96 rounded-3xl overflow-hidden p-1.5 border border-[#2E4A3D]/25 ring-1 ring-[#A65D46]/20 shadow-[0_15px_35px_rgba(46,74,61,0.15)] bg-white mb-10 animate-fade-in">
            <div className="relative w-full h-full rounded-[1.3rem] overflow-hidden">
              <DriveImage
                url={data.hero_image}
                alt={`Foto ${data.groom_nickname} & ${data.bride_nickname}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="text-center animate-fade-in-up relative z-10 max-w-lg mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-[#2E4A3D] leading-tight">
            {data.groom_nickname}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-px w-12 bg-[#2E4A3D]/30" />
            <span className="text-[#A65D46] font-serif italic text-2xl font-light">&amp;</span>
            <div className="h-px w-12 bg-[#2E4A3D]/30" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-[#2E4A3D] leading-tight">
            {data.bride_nickname}
          </h1>

          {data.quote && (
            <div className="mt-10 px-6 py-6 rounded-2xl bg-white/70 border border-[#2E4A3D]/20 shadow-sm max-w-md mx-auto text-center">
              <p className="text-xs sm:text-sm italic font-serif text-stone-600 leading-relaxed">
                &ldquo;{data.quote}&rdquo;
              </p>
              {data.quote_source && (
                <p className="text-[10px] font-serif font-semibold uppercase tracking-[0.25em] text-[#A65D46] mt-3">
                  — {data.quote_source}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Olive Vine Divider */}
      <OliveVineDivider />

      {/* ── 4. Couple Profile Section ────────────────────────────── */}
      <section className="py-20 px-6 bg-[#FAF7F0] border-y border-[#2E4A3D]/20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-3.5 h-3.5 text-[#2E4A3D]" />
            <span className="text-[10px] font-serif font-semibold tracking-[0.25em] uppercase text-[#A65D46]">
              Pasangan Pengantin
            </span>
            <Leaf className="w-3.5 h-3.5 text-[#2E4A3D]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E4A3D] mb-3">
            Pasangan Mempelai
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-stone-600 max-w-md mx-auto mb-14 leading-relaxed">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Izinkan kami
            mengabarkan kabar bahagia ini kepada Bapak/Ibu/Saudara/i:
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Mempelai Pria */}
            <div className="p-8 rounded-3xl bg-[#F8F5EE] border border-[#2E4A3D]/20 shadow-[0_10px_30px_rgba(46,74,61,0.06)] flex flex-col justify-center transition-all hover:shadow-[0_12px_35px_rgba(46,74,61,0.12)]">
              <span className="inline-block self-center px-4 py-1 rounded-full bg-[#2E4A3D]/10 border border-[#2E4A3D]/20 text-[#2E4A3D] text-[10px] font-serif font-semibold uppercase tracking-[0.25em] mb-4">
                Mempelai Pria
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E4A3D] mb-2">
                {data.groom_full_name}
              </h3>
              {data.groom_parents && (
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Putra tercinta dari: <br />
                  <span className="font-medium text-stone-800">{data.groom_parents}</span>
                </p>
              )}
            </div>

            {/* Mempelai Wanita */}
            <div className="p-8 rounded-3xl bg-[#F8F5EE] border border-[#2E4A3D]/20 shadow-[0_10px_30px_rgba(46,74,61,0.06)] flex flex-col justify-center transition-all hover:shadow-[0_12px_35px_rgba(46,74,61,0.12)]">
              <span className="inline-block self-center px-4 py-1 rounded-full bg-[#A65D46]/10 border border-[#A65D46]/25 text-[#A65D46] text-[10px] font-serif font-semibold uppercase tracking-[0.25em] mb-4">
                Mempelai Wanita
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E4A3D] mb-2">
                {data.bride_full_name}
              </h3>
              {data.bride_parents && (
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Putri tercinta dari: <br />
                  <span className="font-medium text-stone-800">{data.bride_parents}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Olive Vine Divider */}
      <OliveVineDivider />

      {/* ── 5. Event Details & Countdown ─────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2E4A3D]/40" />
            <Leaf className="w-4 h-4 text-[#2E4A3D]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#2E4A3D]/40" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E4A3D] mb-2">
            Rangkaian Acara
          </h2>
          <p className="text-xs font-serif italic text-stone-500 mb-6">Waktu istimewa dimulainya lembaran baru</p>

          <Countdown targetDate={data.akad_date} variant="rustic" />

          {/* Cards Akad & Resepsi with Botanical Deckled Dashed Borders */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
            {/* Akad */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#2E4A3D]/25 border-dashed shadow-[0_10px_30px_rgba(46,74,61,0.06)] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#2E4A3D] text-[#F8F5EE] text-[10px] font-serif font-bold uppercase tracking-[0.25em] mb-5 shadow-sm">
                  Akad Nikah
                </span>
                <div className="flex items-center gap-3 text-stone-800 mb-2.5">
                  <Calendar className="w-4 h-4 text-[#2E4A3D] shrink-0" />
                  <p className="font-serif font-bold text-xl text-[#2E4A3D]">
                    {formatDate(data.akad_date)}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-stone-600 mb-4 text-xs">
                  <Clock className="w-4 h-4 text-[#2E4A3D] shrink-0" />
                  <p className="font-medium">{data.akad_time}</p>
                </div>
                <div className="flex items-start gap-3 text-stone-600 text-xs mb-6">
                  <MapPin className="w-4 h-4 text-[#2E4A3D] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-light">{data.akad_location}</p>
                </div>
              </div>

              {data.akad_map_url && (
                <a
                  href={data.akad_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#2E4A3D] hover:bg-[#243B30] text-[#F8F5EE] text-xs font-serif font-semibold tracking-wider transition-all shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Buka Peta Lokasi
                </a>
              )}
            </div>

            {/* Resepsi */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#A65D46]/30 border-dashed shadow-[0_10px_30px_rgba(166,93,70,0.08)] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#A65D46] text-white text-[10px] font-serif font-bold uppercase tracking-[0.25em] mb-5 shadow-sm">
                  Resepsi Pernikahan
                </span>
                <div className="flex items-center gap-3 text-stone-800 mb-2.5">
                  <Calendar className="w-4 h-4 text-[#A65D46] shrink-0" />
                  <p className="font-serif font-bold text-xl text-[#A65D46]">
                    {formatDate(data.resepsi_date)}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-stone-600 mb-4 text-xs">
                  <Clock className="w-4 h-4 text-[#A65D46] shrink-0" />
                  <p className="font-medium">{data.resepsi_time}</p>
                </div>
                <div className="flex items-start gap-3 text-stone-600 text-xs mb-6">
                  <MapPin className="w-4 h-4 text-[#A65D46] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-light">{data.resepsi_location}</p>
                </div>
              </div>

              {data.resepsi_map_url && (
                <a
                  href={data.resepsi_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#A65D46] hover:bg-[#8A4531] text-white text-xs font-serif font-semibold tracking-wider transition-all shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Buka Peta Lokasi
                </a>
              )}
            </div>
          </div>

          {/* Live streaming */}
          {data.stream_link && (
            <div className="mt-10">
              <a
                href={data.stream_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2E4A3D] text-[#F8F5EE] font-serif font-semibold text-xs tracking-wider uppercase shadow-[0_10px_25px_rgba(46,74,61,0.25)] hover:bg-[#243B30] transition-all"
              >
                <Video className="w-4 h-4 text-[#A65D46]" />
                Live Streaming Pernikahan
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. Gallery Section ───────────────────────────────────── */}
      {data.gallery_images && (
        <section className="py-20 px-6 bg-[#FAF7F0] border-y border-[#2E4A3D]/20">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-[10px] font-serif font-semibold tracking-[0.25em] uppercase text-[#A65D46] mb-1">
              Dokumentasi Kasih
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E4A3D] mb-2">
              Galeri Kenangan
            </h2>
            <p className="text-xs font-serif italic text-stone-500">Momen indah yang kami abadikan bersama</p>
          </div>
          <Gallery images={data.gallery_images} variant="rustic" />
        </section>
      )}

      {/* ── 7. Digital Envelope / Gift Section ────────────────────── */}
      <section className="py-20 px-6">
        <GiftSection
          bankName={data.bank_name}
          bankAccount={data.bank_account}
          accountOwner={data.account_owner}
          qrisImage={data.qris_image}
          physicalGiftAddress={data.physical_gift_address}
          physicalGiftRecipient={data.physical_gift_recipient}
          physicalGiftPhone={data.physical_gift_phone}
          variant="rustic"
        />
      </section>

      {/* ── 8. RSVP & Guestbook Section ──────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAF7F0] border-t border-[#2E4A3D]/20">
        <div className="max-w-xl mx-auto text-center">
          <RsvpForm
            slug={data.slug}
            guestName={guestName}
            variant="rustic"
            onRsvpSuccess={handleRsvpSuccess}
          />
          <Guestbook rsvps={guestbookList} variant="rustic" />
        </div>
      </section>

      {/* ── 9. Footer ────────────────────────────────────────────── */}
      <footer className="py-16 px-6 text-center text-xs text-stone-400 border-t border-[#2E4A3D]/20 bg-[#F8F5EE]">
        <p className="font-serif italic text-sm text-stone-600 mb-2">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran Anda
        </p>
        <p className="font-serif text-2xl font-bold text-[#2E4A3D] mb-4">
          {data.groom_nickname} &amp; {data.bride_nickname}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-stone-400 text-[11px]">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-[#A65D46] fill-[#A65D46]" />
          <span>oleh Temu Waktu</span>
        </div>
      </footer>
    </div>
  );
}
