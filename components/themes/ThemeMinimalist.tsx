"use client";

import { useState, useEffect } from "react";
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
// Theme: Modern Minimalist (Theme 3) - "Architectural Split Screen"
// Art Direction: Kinfolk / Swiss Modernist Editorial Monolith
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
  const [activeSection, setActiveSection] = useState<string>("01");

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

  // Track active section for the fixed vertical rail
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["01", "02", "03", "04", "05", "06"];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (const id of sections) {
        const el = document.getElementById(`section-${id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "01", label: "UNION" },
    { id: "02", label: "COUPLE" },
    { id: "03", label: "AGENDA" },
    ...(data.gallery_images ? [{ id: "04", label: "ARCHIVE" }] : []),
    { id: "05", label: "GIFT" },
    { id: "06", label: "RSVP" },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white relative">
      {/* ── 1. Interactive Cover Splash Screen ────────────────────── */}
      <CoverScreen
        groomNickname={data.groom_nickname}
        brideNickname={data.bride_nickname}
        eventDate={data.akad_date}
        guestName={guestName}
        coverImage={data.hero_image}
        variant="minimalist"
      />

      {/* ── 2. Fixed Left-Edge Vertical Index Rail ────────────────── */}
      <nav
        aria-label="Navigasi Halaman Arsitektur"
        className="fixed left-0 top-0 bottom-0 w-12 sm:w-16 border-r border-black/10 bg-white/95 backdrop-blur-xs z-40 flex flex-col justify-between items-center py-6 select-none"
      >
        {/* Top Monogram */}
        <div className="text-[9px] font-mono tracking-[0.25em] text-zinc-400 uppercase -rotate-90 py-4">
          TW // 2026
        </div>

        {/* Section Index Rail */}
        <div className="flex flex-col gap-5 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-label={`Navigasi ke bagian ${item.id} ${item.label}`}
              className={`group flex flex-col items-center gap-1 transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-black ${
                activeSection === item.id ? "text-black" : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <span
                className={`font-mono text-[10px] sm:text-xs tracking-widest transition-all ${
                  activeSection === item.id
                    ? "font-bold text-black border-l-2 border-black pl-1"
                    : "font-normal"
                }`}
              >
                {item.id}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Coordinate Stamp */}
        <div className="text-[8px] font-mono tracking-[0.25em] text-zinc-400 uppercase rotate-90 py-4">
          INDEX
        </div>
      </nav>

      {/* ── Main Architectural Content Container (Offset by Rail) ── */}
      <div className="pl-12 sm:pl-16">
        {/* ── Section 01: Hero & Overlapping Asymmetric Typography ── */}
        <section
          id="section-01"
          className="min-h-screen border-b border-black/10 flex flex-col justify-between p-6 sm:p-10 md:p-14 relative"
        >
          {/* Header Plaque */}
          <div className="w-full flex justify-between items-center border-b border-black/10 pb-4 text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            <span>01 // THE ARCHITECTURAL UNION</span>
            <span>TEMU WAKTU MONOLITH</span>
          </div>

          {/* Overlapping Asymmetric Baseline Typography & Hero Image Split */}
          <div className="my-8 md:my-12 grid md:grid-cols-12 gap-8 items-center">
            {/* Top-Left Overlapping Groom Name & Middle Fold */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="relative">
                {/* Groom Name: Large Top-Left Baseline Shift */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-black -ml-1 sm:-ml-2 select-none">
                  {data.groom_nickname}
                </h1>

                {/* Overlapping Fold Bar */}
                <div className="flex items-center justify-between py-3 my-4 sm:my-6 border-y border-black/15">
                  <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-zinc-400">
                    AND
                  </span>
                  <div className="h-px flex-1 mx-4 bg-black/15" />
                  <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] font-bold text-black uppercase">
                    {data.akad_date ? formatDate(data.akad_date).toUpperCase() : "2026"}
                  </span>
                </div>

                {/* Bride Name: Large Bottom-Right Baseline Shift */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-black text-right -mr-1 sm:-mr-2 select-none">
                  {data.bride_nickname}
                </h1>
              </div>

              {/* Quote Card */}
              {data.quote && (
                <div className="mt-10 p-5 sm:p-6 border-l-2 border-black bg-zinc-50">
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans">
                    &ldquo;{data.quote}&rdquo;
                  </p>
                  {data.quote_source && (
                    <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-2">
                      {"//"} {data.quote_source}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Split Right: Hero Image */}
            {data.hero_image && (
              <div className="md:col-span-5 h-full">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full border border-black/15 bg-zinc-100 overflow-hidden">
                  <DriveImage
                    url={data.hero_image}
                    alt={`Foto ${data.groom_nickname} & ${data.bride_nickname}`}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                  <div className="absolute bottom-3 left-3 bg-black text-white px-2 py-1 font-mono text-[9px] tracking-widest uppercase">
                    PORTRAIT // 01
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Exhibition Plaque Footer */}
          <div className="w-full p-4 border border-black/10 bg-zinc-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-600">
            <span className="font-bold text-black">
              DATE. {data.akad_date ? formatDate(data.akad_date).toUpperCase() : "2026"}
            </span>
            <span className="text-[10px] text-zinc-400 tracking-[0.2em]">
              CEREMONY &amp; RECEPTION
            </span>
          </div>
        </section>

        {/* ── Section 02: Couple Profile (Flipped Split Screen) ───── */}
        <section
          id="section-02"
          className="border-b border-black/10 grid md:grid-cols-12 min-h-[80vh] items-stretch"
        >
          {/* Left Column: Editorial Statement & Metadata */}
          <div className="md:col-span-5 p-8 sm:p-12 md:p-14 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-between bg-zinc-50/40">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
                02 // THE RENDEZVOUS
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-6">
                Kedua Mempelai
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans max-w-sm">
                Maha Suci Tuhan yang telah menyatukan dua insan dalam ikatan pernikahan yang suci
                dan penuh berkah.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-black/10 font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
              BIOGRAPHICAL PROFILE // MMXXVI
            </div>
          </div>

          {/* Right Column: Groom & Bride Asymmetric Cards */}
          <div className="md:col-span-7 divide-y divide-black/10 flex flex-col justify-center bg-white">
            {/* Mempelai Pria */}
            <div className="p-8 sm:p-12 hover:bg-zinc-50/80 transition-colors">
              <span className="inline-block text-[9px] font-mono tracking-[0.25em] uppercase text-zinc-600 mb-3 border border-black/15 px-2.5 py-0.5">
                MEMPELAI PRIA
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-2">
                {data.groom_full_name}
              </h3>
              {data.groom_parents && (
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  Putra tercinta dari: <br />
                  <strong className="font-semibold text-zinc-800">{data.groom_parents}</strong>
                </p>
              )}
            </div>

            {/* Mempelai Wanita */}
            <div className="p-8 sm:p-12 hover:bg-zinc-50/80 transition-colors">
              <span className="inline-block text-[9px] font-mono tracking-[0.25em] uppercase text-zinc-600 mb-3 border border-black/15 px-2.5 py-0.5">
                MEMPELAI WANITA
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-2">
                {data.bride_full_name}
              </h3>
              {data.bride_parents && (
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  Putri tercinta dari: <br />
                  <strong className="font-semibold text-zinc-800">{data.bride_parents}</strong>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Section 03: Event Schedule & Countdown Split ─────────── */}
        <section
          id="section-03"
          className="border-b border-black/10 grid md:grid-cols-12 min-h-[85vh] items-stretch"
        >
          {/* Left Column: Countdown & Monospace Clock */}
          <div className="md:col-span-5 p-8 sm:p-12 md:p-14 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-between bg-white">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
                03 // ITINERARY
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-4">
                Waktu &amp; Tempat
              </h2>
              <p className="text-xs text-zinc-500 font-mono tracking-wider mb-8">
                COUNTDOWN TO CEREMONY
              </p>

              <Countdown targetDate={data.akad_date} variant="minimalist" />
            </div>

            <div className="mt-8 pt-6 border-t border-black/10">
              <p className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                COORDINATES // WEDDING PROTOCOL
              </p>
            </div>
          </div>

          {/* Right Column: Akad & Resepsi Cards */}
          <div className="md:col-span-7 divide-y divide-black/10 flex flex-col justify-center bg-zinc-50/30">
            {/* Akad Nikah */}
            <div className="p-8 sm:p-12 hover:bg-white transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black text-white px-3 py-1">
                  AKAD NIKAH
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{data.akad_time}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-black tracking-tight mb-2">
                {formatDate(data.akad_date)}
              </p>
              <div className="flex items-start gap-2 text-xs text-zinc-600 mb-6 font-sans">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{data.akad_location}</span>
              </div>

              {data.akad_map_url && (
                <a
                  href={data.akad_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-[0.2em] transition-all rounded-none cursor-pointer"
                >
                  [ GOOGLE MAPS ]
                </a>
              )}
            </div>

            {/* Resepsi */}
            <div className="p-8 sm:p-12 hover:bg-white transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black text-white px-3 py-1">
                  RESEPSI
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{data.resepsi_time}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-black tracking-tight mb-2">
                {formatDate(data.resepsi_date)}
              </p>
              <div className="flex items-start gap-2 text-xs text-zinc-600 mb-6 font-sans">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{data.resepsi_location}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {data.resepsi_map_url && (
                  <a
                    href={data.resepsi_map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-[0.2em] transition-all rounded-none cursor-pointer"
                  >
                    [ GOOGLE MAPS ]
                  </a>
                )}

                {data.stream_link && (
                  <a
                    href={data.stream_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-black hover:bg-black hover:text-white text-black text-xs font-mono uppercase tracking-[0.2em] transition-all rounded-none"
                  >
                    <Video className="w-3.5 h-3.5" />
                    [ LIVE STREAM ]
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 04: Gallery / Archive Split ─────────────────── */}
        {data.gallery_images && (
          <section
            id="section-04"
            className="border-b border-black/10 grid md:grid-cols-12 min-h-[70vh] items-stretch"
          >
            <div className="md:col-span-4 p-8 sm:p-12 md:p-14 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-between bg-zinc-50/50">
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
                  04 // ARCHIVE
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-4">
                  Dokumentasi
                </h2>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                  Kompilasi rekaman visual dan momen berharga perjalanan kami.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/10 font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                EXHIBITION PLATES // SERIES 04
              </div>
            </div>

            <div className="md:col-span-8 p-4 sm:p-8 bg-white flex items-center">
              <Gallery images={data.gallery_images} variant="minimalist" />
            </div>
          </section>
        )}

        {/* ── Section 05: Digital Envelope / Gift Split ────────────── */}
        <section
          id="section-05"
          className="border-b border-black/10 grid md:grid-cols-12 min-h-[70vh] items-stretch"
        >
          <div className="md:col-span-4 p-8 sm:p-12 md:p-14 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-between bg-white">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
                05 // CONTRIBUTION
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-4">
                Tanda Kasih
              </h2>
              <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang ingin menyampaikan
                tanda kasih, rincian tercantum di sebelah kanan.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
              DIGITAL WALLET // REPOSITORY
            </div>
          </div>

          <div className="md:col-span-8 p-6 sm:p-10 bg-zinc-50/40 flex items-center justify-center">
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
          </div>
        </section>

        {/* ── Section 06: RSVP & Guestbook Split ──────────────────── */}
        <section
          id="section-06"
          className="border-b border-black/10 grid md:grid-cols-12 min-h-[75vh] items-stretch"
        >
          <div className="md:col-span-4 p-8 sm:p-12 md:p-14 border-b md:border-b-0 md:border-r border-black/10 flex flex-col justify-between bg-zinc-50/50">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
                06 // REGISTRY
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tight mb-4">
                Konfirmasi
              </h2>
              <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                Mohon konfirmasi kehadiran serta kirimkan ucapan doa Anda melalui form berikut.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
              GUESTBOOK DISPATCH // LIVE
            </div>
          </div>

          <div className="md:col-span-8 p-6 sm:p-10 bg-white flex flex-col justify-center">
            <RsvpForm
              slug={data.slug}
              guestName={guestName}
              variant="minimalist"
              onRsvpSuccess={handleRsvpSuccess}
            />
            <div className="mt-8 pt-6 border-t border-black/10">
              <Guestbook rsvps={guestbookList} variant="minimalist" />
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="py-16 px-8 text-center text-xs text-zinc-400 bg-white">
          <p className="text-2xl font-black text-black uppercase tracking-tighter mb-2">
            {data.groom_nickname} &amp; {data.bride_nickname}
          </p>
          <p className="text-zinc-500 font-mono text-[10px] tracking-[0.25em] uppercase">
            TEMU WAKTU &mdash; ARCHITECTURAL DIGITAL INVITATION
          </p>
        </footer>
      </div>
    </div>
  );
}
