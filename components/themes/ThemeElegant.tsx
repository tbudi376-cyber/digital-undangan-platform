"use client";

import type { ClientData } from "@/types";
import { formatDate } from "@/lib/utils";
import { DriveImage } from "@/components/ui/DriveImage";
import { RsvpForm } from "@/components/ui/RsvpForm";
import { Countdown } from "@/components/ui/Countdown";
import { GiftSection } from "@/components/ui/GiftSection";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Gallery } from "@/components/ui/Gallery";
import { Guestbook } from "@/components/ui/Guestbook";
import type { RsvpEntry } from "@/types";

// ---------------------------------------------------------------------------
// Theme: Elegant
// ---------------------------------------------------------------------------
// A refined, minimal design with serif typography, soft rose & gold palette,
// and smooth entrance animations. Suitable for formal / classic weddings.
// ---------------------------------------------------------------------------

export function ThemeElegant({ data, guestName, guestbook = [] }: { data: ClientData; guestName?: string; guestbook?: RsvpEntry[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50 text-gray-800">
      {/* ── Audio Player ────────────────────────────────────────── */}
      {data.music_url && <AudioPlayer audioUrl={data.music_url} />}
      {/* ── Hero / Cover Section ──────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Background decorative circles */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse" />

        {/* Cover photo */}
        {data.hero_image && (
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-rose-200/50 mb-8 animate-fade-in">
            <DriveImage
              url={data.hero_image}
              alt={`Foto ${data.groom_nickname} & ${data.bride_nickname}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Names */}
        <div className="text-center animate-fade-in-up relative z-10">
          <p className="text-sm tracking-[0.3em] uppercase text-rose-400 mb-4 font-light">
            The Wedding of
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold bg-gradient-to-r from-rose-700 via-rose-500 to-amber-600 bg-clip-text text-transparent leading-tight">
            {data.groom_nickname}
          </h1>
          <p className="text-3xl md:text-4xl font-serif text-amber-500 my-2">&amp;</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-rose-700 bg-clip-text text-transparent leading-tight">
            {data.bride_nickname}
          </h1>
        </div>

        {/* Guest Name */}
        {guestName && (
          <div className="mt-10 text-center animate-fade-in-up delay-200">
            <p className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-2 font-light">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-2xl font-serif font-semibold text-gray-800 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-rose-100 shadow-sm inline-block">
              {guestName}
            </p>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-rose-300"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Event Details Section ─────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto text-center">
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
            <span className="text-rose-400 text-2xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-2">
            Menuju Hari Bahagia
          </h2>
          
          <Countdown targetDate={data.akad_date} variant="elegant" />

          {/* Akad Nikah */}
          <div className="mt-16 mb-12">
            <h3 className="text-sm tracking-[0.3em] uppercase text-rose-400 mb-2 font-light">
              Akad Nikah
            </h3>
            <p className="text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-2">
              {formatDate(data.akad_date)}
            </p>
            <p className="text-gray-600 mb-4">{data.akad_time}</p>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-rose-400"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-gray-600">{data.akad_location}</span>
            </div>

            {data.akad_map_url && (
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-rose-100/50">
                <iframe 
                  src={data.akad_map_url} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* Resepsi */}
          <div className="mb-12">
            <h3 className="text-sm tracking-[0.3em] uppercase text-rose-400 mb-2 font-light">
              Resepsi
            </h3>
            <p className="text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-2">
              {formatDate(data.resepsi_date)}
            </p>
            <p className="text-gray-600 mb-4">{data.resepsi_time}</p>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-rose-400"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-gray-600">{data.resepsi_location}</span>
            </div>

            {data.resepsi_map_url && (
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-rose-100/50">
                <iframe 
                  src={data.resepsi_map_url} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Amplop Digital Section ────────────────────────────────── */}
      <section className="py-20 px-6 bg-rose-50/30 border-y border-rose-100/50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-sm tracking-[0.3em] uppercase text-rose-400 mb-2 font-light">
            Kirim Hadiah
          </h2>
          <p className="text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-4">
            Amplop Digital
          </p>
          <p className="text-gray-500 mb-8">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
            Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>

          <GiftSection 
            bankName={data.bank_name}
            bankAccount={data.bank_account}
            accountOwner={data.account_owner}
            qrisImage={data.qris_image}
            variant="elegant"
          />
        </div>
      </section>

      {/* ── Galeri Foto Section ───────────────────────────────────── */}
      {data.gallery_images && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-sm tracking-[0.3em] uppercase text-rose-400 mb-2 font-light">
              Kenangan Terindah
            </h2>
            <p className="text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-10">
              Galeri Foto
            </p>
            
            <Gallery images={data.gallery_images} variant="elegant" />
          </div>
        </section>
      )}

      {/* ── RSVP Section ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-rose-50/50 to-transparent">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-sm tracking-[0.3em] uppercase text-rose-400 mb-2 font-light">
              Konfirmasi Kehadiran
            </h2>
            <p className="text-2xl md:text-3xl font-serif font-semibold text-gray-800">
              RSVP
            </p>
          </div>

          <RsvpForm slug={data.slug} />

          <Guestbook rsvps={guestbook} variant="elegant" />
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="py-10 text-center text-sm text-gray-400">
        <p>
          Made with 💕 for {data.groom_nickname} &amp; {data.bride_nickname}
        </p>
      </footer>
    </div>
  );
}
