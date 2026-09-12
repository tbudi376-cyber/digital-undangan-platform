"use client";

import type { ClientData, RsvpEntry } from "@/types";
import { formatDate } from "@/lib/utils";
import { DriveImage } from "@/components/ui/DriveImage";
import { RsvpForm } from "@/components/ui/RsvpForm";
import { Countdown } from "@/components/ui/Countdown";
import { GiftSection } from "@/components/ui/GiftSection";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Gallery } from "@/components/ui/Gallery";
import { Guestbook } from "@/components/ui/Guestbook";

// ---------------------------------------------------------------------------
// Theme: Minimalist
// ---------------------------------------------------------------------------
// A clean, modern, and sleek design. Monochromatic (black, white, grays),
// sans-serif typography, sharp edges, and subtle glassmorphism.
// ---------------------------------------------------------------------------

export function ThemeMinimalist({ data, guestName, guestbook = [] }: { data: ClientData; guestName?: string; guestbook?: RsvpEntry[] }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* ── Audio Player ────────────────────────────────────────── */}
      {data.music_url && <AudioPlayer audioUrl={data.music_url} />}

      {/* ── Hero / Cover Section ──────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

        <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
          {data.hero_image && (
            <div className="w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-sm mb-12 shadow-2xl shadow-slate-200/50 animate-fade-in relative group">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <DriveImage
                url={data.hero_image}
                alt={`Foto ${data.groom_nickname} & ${data.bride_nickname}`}
                fill
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          )}

          <div className="text-center animate-fade-in-up delay-100 w-full">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase text-slate-500 mb-6">
              The Wedding Of
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-2">
              {data.groom_nickname}
            </h1>
            <p className="text-2xl font-light text-slate-400 my-2">— &amp; —</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mt-2">
              {data.bride_nickname}
            </h1>
          </div>

          {guestName && (
            <div className="mt-16 text-center animate-fade-in-up delay-300 w-full border-t border-slate-200 pt-8">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-slate-400 mb-3">
                Kepada Yth:
              </p>
              <p className="text-xl font-medium text-slate-900 bg-slate-100 px-8 py-2.5 rounded-sm inline-block">
                {guestName}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Event Details Section ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-px h-16 bg-slate-300 mx-auto mb-10" />

          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
            Momen Bahagia
          </h2>
          <p className="text-slate-500 mb-12 max-w-md mx-auto">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.
          </p>
          
          <Countdown targetDate={data.akad_date} variant="elegant" />

          <div className="grid md:grid-cols-2 gap-8 mt-20 text-left">
            {/* Akad Nikah */}
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-4">
                Akad Nikah
              </h3>
              <p className="text-2xl font-semibold text-slate-900 mb-2">
                {formatDate(data.akad_date)}
              </p>
              <p className="text-slate-500 mb-8">{data.akad_time}</p>

              <div className="flex items-start gap-3 mb-8">
                <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-700 leading-relaxed">{data.akad_location}</span>
              </div>

              {data.akad_map_url && (
                <div className="w-full h-48 bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
                  <iframe 
                    src={data.akad_map_url} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                  />
                </div>
              )}
            </div>

            {/* Resepsi */}
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-4">
                Resepsi
              </h3>
              <p className="text-2xl font-semibold text-slate-900 mb-2">
                {formatDate(data.resepsi_date)}
              </p>
              <p className="text-slate-500 mb-8">{data.resepsi_time}</p>

              <div className="flex items-start gap-3 mb-8">
                <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-slate-700 leading-relaxed">{data.resepsi_location}</span>
              </div>

              {data.resepsi_map_url && (
                <div className="w-full h-48 bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
                  <iframe 
                    src={data.resepsi_map_url} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Galeri Foto ───────────────────────────────────────────── */}
      {data.gallery_images && (
        <section className="py-24 px-6 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-12">
              Galeri Visual
            </h2>
            <Gallery images={data.gallery_images} variant="elegant" />
          </div>
        </section>
      )}

      {/* ── Amplop Digital ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
            Tanda Kasih
          </h2>
          <p className="text-slate-500 mb-10">
            Doa dan restu Anda adalah hadiah terindah. Namun, jika Anda ingin memberikan tanda kasih secara langsung, Anda dapat menggunakan fasilitas berikut.
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

      {/* ── RSVP & Guestbook ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-900 text-slate-50">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
              Konfirmasi Kehadiran
            </h2>
            <p className="text-slate-400">
              Mohon konfirmasi kehadiran Anda melalui form di bawah ini.
            </p>
          </div>

          <div className="bg-white text-slate-900 rounded-sm p-2 shadow-2xl">
            <RsvpForm slug={data.slug} />
          </div>

          <div className="mt-16">
            <Guestbook rsvps={guestbook} variant="elegant" />
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="py-8 text-center text-xs tracking-widest uppercase text-slate-400 bg-slate-950">
        <p>
          &copy; 2026 {data.groom_nickname} &amp; {data.bride_nickname}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
