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
import { MapPin, Calendar, Clock, Video, Heart, Leaf, BookOpen } from "lucide-react";

// ---------------------------------------------------------------------------
// Torn Paper Edge SVG Divider
// ---------------------------------------------------------------------------
function TornPaperDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none relative z-10 select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 28"
        preserveAspectRatio="none"
        className={`w-full h-4 sm:h-6 text-[#FAF7F0] fill-current drop-shadow-[0_2px_4px_rgba(46,74,61,0.06)] ${
          flip ? "rotate-180" : ""
        }`}
      >
        <path d="M0,0 L0,16 Q35,24 70,14 T140,22 T210,12 T280,24 T350,15 T420,23 T490,12 T560,25 T630,14 T700,23 T770,13 T840,24 T910,14 T980,23 T1050,13 T1120,24 L1200,16 L1200,0 Z" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Theme: Rustic Garden (Theme 2) - "Field Journal Collage"
// Art Direction: Tuscan Olive Garden & Handcrafted Botanical Scrapbook
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
      {/* Botanical Corner Foliage Vignettes */}
      <div
        className="fixed top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_right,rgba(46,74,61,0.12),transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(166,93,70,0.1),transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ── 2. Hero Section: Asymmetric Field Journal Spread ──────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 py-20 z-10">
        <div className="max-w-4xl w-full mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
            {/* Left: Off-center Rotated Polaroid Frame with Tape Accent */}
            {data.hero_image && (
              <div className="md:col-span-6 flex justify-center">
                <div className="relative rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 max-w-xs sm:max-w-sm w-full">
                  {/* Washi Tape Accent */}
                  <div
                    className="absolute -top-3 left-10 w-20 h-5 bg-[#E2DCC8]/85 -rotate-6 border border-stone-300/40 shadow-xs z-20 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Polaroid Frame */}
                  <div className="p-3.5 pb-10 bg-white border border-stone-300/80 shadow-[0_15px_35px_rgba(46,74,61,0.14)] rounded-xs">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 rounded-xs">
                      <DriveImage
                        url={data.hero_image}
                        alt={`Foto ${data.groom_nickname} & ${data.bride_nickname}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="font-serif italic text-xs text-stone-500">
                        {data.groom_nickname} &amp; {data.bride_nickname}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right: Name Lockup Beside the Photo (Field Journal Note) */}
            <div
              className={`text-center md:text-left ${
                data.hero_image ? "md:col-span-6" : "md:col-span-12 md:text-center"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E4A3D]/10 border border-[#2E4A3D]/25 text-[#2E4A3D] text-[10px] font-serif font-semibold tracking-widest uppercase mb-6">
                <Leaf className="w-3.5 h-3.5 text-[#A65D46]" />
                Field Journal · The Wedding
              </div>

              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#2E4A3D] leading-none">
                  {data.groom_nickname}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-3 my-1">
                  <div className="h-px w-8 bg-[#2E4A3D]/30" />
                  <span className="text-[#A65D46] font-serif italic text-2xl font-light">
                    &amp;
                  </span>
                  <div className="h-px w-8 bg-[#2E4A3D]/30" />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#2E4A3D] leading-none">
                  {data.bride_nickname}
                </h1>
              </div>

              {data.akad_date && (
                <p className="text-xs uppercase tracking-[0.25em] text-[#A65D46] font-serif font-semibold mt-4">
                  {formatDate(data.akad_date)}
                </p>
              )}

              {data.quote && (
                <div className="relative mt-8 p-5 rounded-2xl bg-white/80 border border-[#2E4A3D]/20 shadow-[0_8px_25px_rgba(46,74,61,0.06)] max-w-md mx-auto md:mx-0">
                  {/* Corner tape on quote */}
                  <div
                    className="absolute -top-2 right-6 w-12 h-4 bg-[#E2DCC8]/80 rotate-3 border border-stone-300/30 shadow-xs pointer-events-none"
                    aria-hidden="true"
                  />
                  <p className="text-xs sm:text-sm italic font-serif text-stone-600 leading-relaxed">
                    &ldquo;{data.quote}&rdquo;
                  </p>
                  {data.quote_source && (
                    <p className="text-[10px] font-serif font-semibold uppercase tracking-[0.25em] text-[#A65D46] mt-2.5">
                      — {data.quote_source}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Torn Paper Divider */}
      <TornPaperDivider />

      {/* ── 3. Couple Profile Section ────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#FAF7F0] relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-3.5 h-3.5 text-[#2E4A3D]" />
            <span className="text-[10px] font-serif font-semibold tracking-[0.25em] uppercase text-[#A65D46]">
              Catatan Pasangan
            </span>
            <Leaf className="w-3.5 h-3.5 text-[#2E4A3D]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E4A3D] mb-3">
            Kedua Mempelai
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-stone-600 max-w-md mx-auto mb-12 leading-relaxed">
            Maha Suci Allah yang telah mempertemukan kami dalam ikatan pernikahan yang suci:
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-stretch text-left">
            {/* Mempelai Pria - Staggered Scrapbook Entry */}
            <div className="relative rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300 p-6 sm:p-8 rounded-3xl bg-[#F8F5EE] border-2 border-[#2E4A3D]/25 border-dashed shadow-[0_10px_30px_rgba(46,74,61,0.06)] flex flex-col justify-between">
              {/* Washi Tape */}
              <div
                className="absolute -top-3 left-8 w-16 h-5 bg-[#D8D2C2]/80 -rotate-3 border border-stone-300/40 shadow-xs pointer-events-none"
                aria-hidden="true"
              />
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#2E4A3D]/10 border border-[#2E4A3D]/20 text-[#2E4A3D] text-[10px] font-serif font-semibold uppercase tracking-[0.2em] mb-4">
                  Mempelai Pria
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#2E4A3D] mb-2">
                  {data.groom_full_name}
                </h3>
                {data.groom_parents && (
                  <p className="text-xs text-stone-600 leading-relaxed font-light mt-3">
                    Putra tercinta dari: <br />
                    <strong className="font-semibold text-stone-800">
                      {data.groom_parents}
                    </strong>
                  </p>
                )}
              </div>
            </div>

            {/* Mempelai Wanita - Staggered Scrapbook Entry */}
            <div className="relative rotate-[1.5deg] hover:rotate-0 transition-transform duration-300 p-6 sm:p-8 rounded-3xl bg-[#F8F5EE] border-2 border-[#A65D46]/25 border-dashed shadow-[0_10px_30px_rgba(166,93,70,0.06)] flex flex-col justify-between mt-4 md:mt-0">
              {/* Terracotta Washi Tape */}
              <div
                className="absolute -top-3 right-8 w-16 h-5 bg-[#E8D5C8]/80 rotate-3 border border-stone-300/40 shadow-xs pointer-events-none"
                aria-hidden="true"
              />
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#A65D46]/10 border border-[#A65D46]/20 text-[#A65D46] text-[10px] font-serif font-semibold uppercase tracking-[0.2em] mb-4">
                  Mempelai Wanita
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#2E4A3D] mb-2">
                  {data.bride_full_name}
                </h3>
                {data.bride_parents && (
                  <p className="text-xs text-stone-600 leading-relaxed font-light mt-3">
                    Putri tercinta dari: <br />
                    <strong className="font-semibold text-stone-800">
                      {data.bride_parents}
                    </strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Torn Paper Divider */}
      <TornPaperDivider flip />

      {/* ── 4. Event Details & Staggered Journal Entries ─────────── */}
      <section className="py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#2E4A3D]" />
            <span className="text-[10px] font-serif font-semibold tracking-[0.25em] uppercase text-[#A65D46]">
              Jadwal Acara
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E4A3D] mb-2">
            Rangkaian Acara
          </h2>
          <p className="text-xs font-serif italic text-stone-500 mb-6">
            Waktu istimewa dimulainya lembaran baru
          </p>

          <Countdown targetDate={data.akad_date} variant="rustic" />

          {/* Two-Column Staggered Journal Entries */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 mt-14 text-left items-start">
            {/* Akad Nikah - Left Staggered Entry */}
            <div className="relative rotate-[-1.5deg] sm:-translate-y-4 hover:rotate-0 transition-all duration-300 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#2E4A3D]/30 border-dashed shadow-[0_12px_35px_rgba(46,74,61,0.08)] flex flex-col justify-between">
              {/* Tape sticker */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#D8D2C2]/80 -rotate-2 border border-stone-300/40 shadow-xs pointer-events-none"
                aria-hidden="true"
              />

              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#2E4A3D] text-[#F8F5EE] text-[10px] font-serif font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
                  Akad Nikah
                </span>

                <div className="flex items-center gap-2.5 text-stone-800 mb-2">
                  <Calendar className="w-4 h-4 text-[#2E4A3D] shrink-0" />
                  <p className="font-serif font-bold text-xl text-[#2E4A3D]">
                    {formatDate(data.akad_date)}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 text-stone-600 mb-3 text-xs">
                  <Clock className="w-4 h-4 text-[#2E4A3D] shrink-0" />
                  <p className="font-medium">{data.akad_time}</p>
                </div>

                <div className="flex items-start gap-2.5 text-stone-600 text-xs mb-6">
                  <MapPin className="w-4 h-4 text-[#2E4A3D] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-light">{data.akad_location}</p>
                </div>
              </div>

              {data.akad_map_url && (
                <a
                  href={data.akad_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2E4A3D] hover:bg-[#243B30] text-[#F8F5EE] text-xs font-serif font-semibold tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Petunjuk Google Maps
                </a>
              )}
            </div>

            {/* Resepsi Pernikahan - Right Staggered Entry (Shifted Downwards) */}
            <div className="relative rotate-[1.5deg] sm:translate-y-6 hover:rotate-0 transition-all duration-300 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#A65D46]/35 border-dashed shadow-[0_12px_35px_rgba(166,93,70,0.1)] flex flex-col justify-between mt-6 md:mt-0">
              {/* Terracotta Tape sticker */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#E8D5C8]/85 rotate-2 border border-stone-300/40 shadow-xs pointer-events-none"
                aria-hidden="true"
              />

              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#A65D46] text-white text-[10px] font-serif font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
                  Resepsi Pernikahan
                </span>

                <div className="flex items-center gap-2.5 text-stone-800 mb-2">
                  <Calendar className="w-4 h-4 text-[#A65D46] shrink-0" />
                  <p className="font-serif font-bold text-xl text-[#A65D46]">
                    {formatDate(data.resepsi_date)}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 text-stone-600 mb-3 text-xs">
                  <Clock className="w-4 h-4 text-[#A65D46] shrink-0" />
                  <p className="font-medium">{data.resepsi_time}</p>
                </div>

                <div className="flex items-start gap-2.5 text-stone-600 text-xs mb-6">
                  <MapPin className="w-4 h-4 text-[#A65D46] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-light">{data.resepsi_location}</p>
                </div>
              </div>

              <div className="space-y-2">
                {data.resepsi_map_url && (
                  <a
                    href={data.resepsi_map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#A65D46] hover:bg-[#8A4531] text-white text-xs font-serif font-semibold tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Petunjuk Google Maps
                  </a>
                )}

                {data.stream_link && (
                  <a
                    href={data.stream_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2E4A3D] text-[#F8F5EE] font-serif font-semibold text-xs tracking-wider uppercase shadow-sm hover:bg-[#243B30] transition-all"
                  >
                    <Video className="w-3.5 h-3.5 text-[#A65D46]" />
                    Live Streaming Resepsi
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Torn Paper Divider */}
      <TornPaperDivider />

      {/* ── 5. Gallery Section: Staggered Polaroid Collage ───────── */}
      {data.gallery_images && (
        <section className="py-20 px-4 sm:px-6 bg-[#FAF7F0] relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-[10px] font-serif font-semibold tracking-[0.25em] uppercase text-[#A65D46] mb-1">
              Field Album
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E4A3D] mb-2">
              Galeri Kenangan
            </h2>
            <p className="text-xs font-serif italic text-stone-500">
              Koleksi foto polaroid perjalanan cinta kami
            </p>
          </div>
          <Gallery images={data.gallery_images} variant="rustic" />
        </section>
      )}

      {/* Torn Paper Divider */}
      <TornPaperDivider flip />

      {/* ── 6. Digital Envelope / Gift Section ────────────────────── */}
      <section className="py-20 px-4 sm:px-6 relative z-10">
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

      {/* Torn Paper Divider */}
      <TornPaperDivider />

      {/* ── 7. RSVP & Guestbook Section ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-[#FAF7F0] relative z-10">
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

      {/* ── 8. Footer ────────────────────────────────────────────── */}
      <footer className="py-16 px-6 text-center text-xs text-stone-500 bg-[#F8F5EE] border-t border-[#2E4A3D]/20 relative z-10">
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
