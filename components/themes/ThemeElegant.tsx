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
import { MapPin, Calendar, Clock, Video, Heart } from "lucide-react";

function RoyalFlourishDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-6 relative z-10" aria-hidden="true">
      <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-[#D4AF37]" />
      <div className="flex items-center gap-1.5 text-[#AA7C11]">
        <span className="text-[10px]">✦</span>
        <svg className="w-5 h-5 fill-current opacity-90" viewBox="0 0 24 24">
          <path d="M12 2C12.5 5 15 7.5 18 8C15 8.5 12.5 11 12 14C11.5 11 9 8.5 6 8C9 7.5 11.5 5 12 2Z" />
          <circle cx="12" cy="18" r="1.5" />
        </svg>
        <span className="text-[10px]">✦</span>
      </div>
      <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#D4AF37]/80 to-[#D4AF37]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Theme: Elegant (Rose & Gold)
// ---------------------------------------------------------------------------
export function ThemeElegant({
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#30080F] selection:bg-[#D4AF37]/30 selection:text-[#50101E] relative overflow-hidden">
      {/* ── 1. Interactive Cover Splash Screen ────────────────────── */}
      <CoverScreen
        groomNickname={data.groom_nickname}
        brideNickname={data.bride_nickname}
        eventDate={data.akad_date}
        guestName={guestName}
        coverImage={data.hero_image}
        variant="elegant"
      />

      {/* ── Archival Damask Filigree Watermark (3% opacity) ────────── */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] bg-repeat z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 C33 15 45 18 45 25 C45 32 36 36 30 45 C24 36 15 32 15 25 C15 18 27 15 30 5 Z M30 45 C33 52 40 55 40 58 C40 59 30 57 30 57 C30 57 20 59 20 58 C20 55 27 52 30 45 Z' fill='%236B1728' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Ambient background glow layers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[45rem] h-[35rem] bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute top-96 right-0 w-[30rem] h-[30rem] bg-[radial-gradient(circle,_rgba(107,23,40,0.06),transparent_70%)] pointer-events-none" />

      {/* ── 3. Hero Section ──────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-20">
        {/* Cover Photo - Parisian Arched Cameo with Dual Gold Hairline */}
        {data.hero_image && (
          <div className="relative w-64 h-84 sm:w-72 sm:h-96 rounded-t-full rounded-b-3xl overflow-hidden p-1.5 border border-[#D4AF37]/60 outline outline-1 outline-[#D4AF37]/30 outline-offset-4 shadow-[0_20px_50px_rgba(107,23,40,0.15)] bg-gradient-to-b from-[#F3E5AB]/40 via-white to-transparent mb-10 animate-fade-in">
            <div className="relative w-full h-full rounded-t-full rounded-b-[1.3rem] overflow-hidden">
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
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#D4AF37]/60" />
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#AA7C11] font-semibold">
              Walimatul &apos;Ursy
            </p>
            <span className="h-px w-6 bg-[#D4AF37]/60" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-[#6B1728] leading-[1.1] drop-shadow-sm">
            {data.groom_nickname}
          </h1>
          <div className="flex items-center justify-center gap-3 my-1.5">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-3xl font-serif italic text-[#D4AF37]">&amp;</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-[#6B1728] leading-[1.1] drop-shadow-sm">
            {data.bride_nickname}
          </h1>

          {/* Quote */}
          {data.quote && (
            <div className="mt-10 px-6 py-6 rounded-2xl bg-[#FAF7F2]/80 border border-[#D4AF37]/30 shadow-sm max-w-md mx-auto text-center">
              <p className="text-xs sm:text-sm italic font-serif text-stone-700 leading-relaxed">
                &ldquo;{data.quote}&rdquo;
              </p>
              {data.quote_source && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#851C32] mt-3">
                  — {data.quote_source}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Royal Flourish Divider */}
      <RoyalFlourishDivider />

      {/* ── 4. Couple Profile Section ────────────────────────────── */}
      <section className="py-20 px-6 bg-[#FAF7F2] border-y border-[#D4AF37]/30 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="text-xs text-[#D4AF37]">✦</span>
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AA7C11]">
              Groom &amp; Bride
            </span>
            <span className="text-xs text-[#D4AF37]">✦</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#50101E] mb-3">
            Mempelai Bahagia
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-stone-600 max-w-md mx-auto mb-14 leading-relaxed">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud mengundang
            Bapak/Ibu/Saudara/i pada hari pernikahan kami:
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Mempelai Pria */}
            <div className="p-8 rounded-t-[2.5rem] rounded-b-2xl bg-white/95 border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(107,23,40,0.05)] flex flex-col justify-center transition-all hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)]">
              <span className="inline-block self-center px-4 py-1 rounded-full bg-[#6B1728]/10 border border-[#D4AF37]/40 text-[#6B1728] text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">
                Mempelai Pria
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#50101E] mb-2">
                {data.groom_full_name}
              </h3>
              {data.groom_parents && (
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Putra dari: <br />
                  <span className="font-medium text-stone-800">{data.groom_parents}</span>
                </p>
              )}
            </div>

            {/* Mempelai Wanita */}
            <div className="p-8 rounded-t-[2.5rem] rounded-b-2xl bg-white/95 border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(107,23,40,0.05)] flex flex-col justify-center transition-all hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)]">
              <span className="inline-block self-center px-4 py-1 rounded-full bg-[#6B1728]/10 border border-[#D4AF37]/40 text-[#6B1728] text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">
                Mempelai Wanita
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#50101E] mb-2">
                {data.bride_full_name}
              </h3>
              {data.bride_parents && (
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Putri dari: <br />
                  <span className="font-medium text-stone-800">{data.bride_parents}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Royal Flourish Divider */}
      <RoyalFlourishDivider />

      {/* ── 5. Event Details & Countdown ─────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[#D4AF37] text-lg">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#50101E] mb-2">
            Rangkaian Hari Bahagia
          </h2>
          <p className="text-xs text-stone-500 font-serif italic mb-6">Menghitung hari menuju ikrar suci</p>

          {/* Dual-Hairline Gold Frame Countdown */}
          <div className="inline-block max-w-full p-2 sm:p-3 rounded-3xl border border-[#D4AF37]/40 outline outline-1 outline-[#D4AF37]/20 outline-offset-4 bg-white/40 backdrop-blur-sm shadow-sm mb-6">
            <Countdown targetDate={data.akad_date} variant="elegant" />
          </div>

          {/* Cards Akad & Resepsi */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
            {/* Akad Nikah */}
            <div className="p-8 rounded-t-[2.5rem] rounded-b-2xl bg-white border border-[#D4AF37]/40 shadow-[0_12px_35px_rgba(107,23,40,0.07)] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#6B1728] text-[#F3E5AB] text-[10px] font-bold uppercase tracking-[0.25em] mb-5 shadow-sm">
                  Akad Nikah
                </span>
                <div className="flex items-center gap-3 text-stone-800 mb-2.5">
                  <Calendar className="w-4 h-4 text-[#851C32] shrink-0" />
                  <p className="font-serif font-bold text-xl text-[#50101E]">
                    {formatDate(data.akad_date)}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-stone-600 mb-4 text-xs">
                  <Clock className="w-4 h-4 text-[#851C32] shrink-0" />
                  <p className="font-medium">{data.akad_time}</p>
                </div>
                <div className="flex items-start gap-3 text-stone-600 text-xs mb-6">
                  <MapPin className="w-4 h-4 text-[#851C32] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-light">{data.akad_location}</p>
                </div>
              </div>

              {data.akad_map_url && (
                <a
                  href={data.akad_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#450F1B] text-xs font-semibold tracking-wider transition-all hover:brightness-105 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Petunjuk Lokasi (Google Maps)
                </a>
              )}
            </div>

            {/* Resepsi */}
            <div className="p-8 rounded-t-[2.5rem] rounded-b-2xl bg-white border border-[#D4AF37]/40 shadow-[0_12px_35px_rgba(107,23,40,0.07)] flex flex-col justify-between">
              <div>
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#AA7C11] text-[#FDFBF7] text-[10px] font-bold uppercase tracking-[0.25em] mb-5 shadow-sm">
                  Resepsi Pernikahan
                </span>
                <div className="flex items-center gap-3 text-stone-800 mb-2.5">
                  <Calendar className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <p className="font-serif font-bold text-xl text-[#50101E]">
                    {formatDate(data.resepsi_date)}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-stone-600 mb-4 text-xs">
                  <Clock className="w-4 h-4 text-[#AA7C11] shrink-0" />
                  <p className="font-medium">{data.resepsi_time}</p>
                </div>
                <div className="flex items-start gap-3 text-stone-600 text-xs mb-6">
                  <MapPin className="w-4 h-4 text-[#AA7C11] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-light">{data.resepsi_location}</p>
                </div>
              </div>

              {data.resepsi_map_url && (
                <a
                  href={data.resepsi_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#450F1B] text-xs font-semibold tracking-wider transition-all hover:brightness-105 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Petunjuk Lokasi (Google Maps)
                </a>
              )}
            </div>
          </div>

          {/* Streaming Link */}
          {data.stream_link && (
            <div className="mt-10">
              <a
                href={data.stream_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6B1728] via-[#851C32] to-[#6B1728] text-[#F3E5AB] border border-[#D4AF37]/50 font-serif font-bold text-xs tracking-wider uppercase shadow-[0_10px_25px_rgba(107,23,40,0.3)] hover:brightness-110 transition-all"
              >
                <Video className="w-4 h-4 text-[#D4AF37]" />
                Saksikan Siaran Langsung (Live Streaming)
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. Gallery Section ───────────────────────────────────── */}
      {data.gallery_images && (
        <section className="py-20 px-6 bg-[#FAF7F2] border-y border-[#D4AF37]/30">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#AA7C11] mb-1">
              Visual Moments
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#50101E] mb-2">
              Galeri Momen Bahagia
            </h2>
            <p className="text-xs font-serif italic text-stone-500">Kenangan indah langkah perjalanan cinta kami</p>
          </div>
          <Gallery images={data.gallery_images} variant="elegant" />
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
          variant="elegant"
        />
      </section>

      {/* ── 8. RSVP & Guestbook Section ──────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAF7F2] border-t border-[#D4AF37]/30">
        <div className="max-w-xl mx-auto text-center">
          <RsvpForm
            slug={data.slug}
            guestName={guestName}
            variant="elegant"
            onRsvpSuccess={handleRsvpSuccess}
          />
          <Guestbook rsvps={guestbookList} variant="elegant" />
        </div>
      </section>

      {/* ── 9. Footer ────────────────────────────────────────────── */}
      <footer className="py-16 px-6 text-center text-xs text-stone-400 border-t border-[#D4AF37]/30 bg-[#FDFBF7]">
        <p className="font-serif italic text-sm text-stone-600 mb-2">
          Terima kasih atas doa &amp; restu yang tulus
        </p>
        <p className="font-serif text-2xl font-bold text-[#6B1728] mb-4">
          {data.groom_nickname} &amp; {data.bride_nickname}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-stone-400 text-[11px]">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-[#851C32] fill-[#851C32]" />
          <span>oleh Temu Waktu</span>
        </div>
      </footer>
    </div>
  );
}
