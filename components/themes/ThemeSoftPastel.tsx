"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ClientData, RsvpEntry, RsvpPayload } from "@/types";
import { formatDate } from "@/lib/utils";
import { submitRsvp } from "@/lib/api";
import {
  Music,
  Gift,
  MessageSquareHeart,
  MapPin,
  Calendar,
  Clock,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Radio,
  Heart,
  Send,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface ThemeProps {
  data: ClientData;
  guestName?: string;
  guestbook?: RsvpEntry[];
}

const DEFAULT_COVER =
  "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/content/image-T_n0zxtfYajQAbgtK9FCB-1749993291480.png";
const DEFAULT_FEMALE =
  "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/content/image-T_n0zxtfYajQAbgtK9FCB-1749993370350.png";
const DEFAULT_MALE =
  "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/content/image-T_n0zxtfYajQAbgtK9FCB-1749993368592.png";
const DEFAULT_MUSIC =
  "https://res.cloudinary.com/cludinarypartnerinaja/video/upload/kekawinan/music/music-T_n0zxtfYajQAbgtK9FCB-1749993294782.mp3";

const DEFAULT_STORIES = [
  {
    waktu: "Maret 2022",
    lokasi: "Bandung",
    image:
      "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/v1779636732/kekawinan/love-story/keuck7qk9kdhdgxcgwbl.png",
    story:
      "Maret 2022 menjadi awal perjalanan kami. Kami pertama kali bertemu di sebuah café cozy di Bandung. Dari percakapan hangat tentang impian masa depan, kami merasa ada kecocokan yang begitu dalam.",
  },
  {
    waktu: "Juni 2022",
    lokasi: "Lembang",
    image:
      "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/v1779636747/kekawinan/love-story/k1gwldzlyiqkduqm9x68.png",
    story:
      "Tiga bulan setelah pertemuan itu, di tengah sejuknya alam Lembang, ia memberanikan diri mengungkapkan niat tulus untuk melangkah ke jenjang yang lebih serius.",
  },
  {
    waktu: "Januari 2023",
    lokasi: "Raja Ampat",
    image:
      "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/v1779636771/kekawinan/love-story/bpvhhdzjayigdxmqe1lz.png",
    story:
      "Setahun bersama, kami semakin yakin bahwa satu sama lain adalah rumah dan tempat berlabuh terbaik. Komitmen untuk saling mendampingi semakin kokoh.",
  },
  {
    waktu: "Desember 2024",
    lokasi: "Jakarta",
    image:
      "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/v1779636805/kekawinan/love-story/e446w6l59sezd0zlt5zm.png",
    story:
      "Dikelilingi restu dari kedua orang tua dan keluarga tercinta, kami resmi bertunangan. Ini adalah awal dari babak terindah dalam hidup kami.",
  },
];

export function ThemeSoftPastel({
  data,
  guestName = "Tamu Spesial",
  guestbook: initialGuestbook = [],
}: ThemeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // RSVP Form state
  const [rsvpName, setRsvpName] = useState(guestName !== "Tamu Spesial" ? guestName : "");
  const [rsvpAttend, setRsvpAttend] = useState<"Hadir" | "Tidak Hadir">("Hadir");
  const [rsvpMsg, setRsvpMsg] = useState("");
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [guestbookList, setGuestbookList] = useState<RsvpEntry[]>(initialGuestbook);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Parse gallery images
  const galleryList = data.gallery_images
    ? data.gallery_images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean)
    : [
        "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-5eM0h5iee7mz6qHGY_vUj-1749993442062.png",
        "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-4QvHbharHj8KfMXT6txr2-1749993459099.png",
        "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-Ep9GWXyi1YGyWWnBrOqRt-1749993450703.png",
        "https://res.cloudinary.com/cludinarypartnerinaja/image/upload/kekawinan/images/gallery/image-ALdU97qKjABV-cA1ywjrD-1749993466499.png",
      ];

  const coverPhoto = data.hero_image || DEFAULT_COVER;
  const femalePhoto = DEFAULT_FEMALE;
  const malePhoto = DEFAULT_MALE;
  const musicSrc = data.music_url || DEFAULT_MUSIC;

  // Countdown logic
  useEffect(() => {
    const targetDateStr = data.akad_date || "2026-07-31";
    const target = new Date(targetDateStr.includes("T") ? targetDateStr : `${targetDateStr}T08:00:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ hari: 0, jam: 0, menit: 0, detik: 0 });
      } else {
        setTimeLeft({
          hari: Math.floor(diff / (1000 * 60 * 60 * 24)),
          jam: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          menit: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          detik: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.akad_date]);

  // Audio setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(musicSrc);
      audio.loop = true;
      audioRef.current = audio;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicSrc]);

  // Handle open invitation & autoplay music
  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio autoplay blocked:", err));
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Play error:", err));
    }
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, fieldKey: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setToastMessage(`${label} berhasil disalin!`);
    setTimeout(() => {
      setCopiedField(null);
      setToastMessage(null);
    }, 3000);
  };

  // Handle RSVP submit
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMsg.trim()) return;

    setIsSubmittingRsvp(true);
    const newEntry: RsvpEntry = {
      slug: data.slug,
      nama_tamu: rsvpName.trim(),
      kehadiran: rsvpAttend,
      pesan: rsvpMsg.trim(),
      timestamp: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Optimistic UI update
    setGuestbookList((prev) => [newEntry, ...prev]);
    setRsvpMsg("");
    setToastMessage("Terima kasih atas doa & konfirmasi Anda!");

    try {
      const payload: RsvpPayload = {
        slug: data.slug,
        nama_tamu: newEntry.nama_tamu,
        kehadiran: newEntry.kehadiran,
        pesan: newEntry.pesan,
      };
      await submitRsvp(payload);
    } catch (err) {
      console.error("Submit RSVP error:", err);
    } finally {
      setIsSubmittingRsvp(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  // Google Calendar URL generator
  const createCalendarUrl = () => {
    const title = encodeURIComponent(
      `Pernikahan ${data.groom_nickname} & ${data.bride_nickname}`
    );
    const details = encodeURIComponent(
      `Akad & Resepsi Pernikahan ${data.groom_full_name} & ${data.bride_full_name}.\nLokasi: ${data.resepsi_location || data.akad_location}`
    );
    const location = encodeURIComponent(data.resepsi_location || data.akad_location || "");
    const dateStr = (data.akad_date || "20260731").replace(/-/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateStr}T080000Z/${dateStr}T140000Z`;
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-xs md:text-sm font-medium shadow-2xl flex items-center gap-2 animate-fade-in border border-purple-400/40">
          <Sparkles className="w-4 h-4 text-purple-200 animate-pulse" />
          {toastMessage}
        </div>
      )}

      {/* Main Container - Mobile First Frame */}
      <div className="w-full max-w-[440px] min-h-screen relative bg-[#09070f] shadow-2xl overflow-x-hidden border-x border-purple-950/30 flex flex-col">
        {/* Ambient Background Aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[40%] right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[20%] left-0 w-80 h-80 bg-fuchsia-700/10 rounded-full blur-3xl pointer-events-none" />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* COVER / SPLASH SCREEN OVERLAY                               */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          className={`fixed inset-0 max-w-[440px] mx-auto z-50 flex flex-col justify-between items-center text-center p-6 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            isOpen
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(9, 7, 15, 0.45) 0%, rgba(9, 7, 15, 0.85) 65%, rgba(9, 7, 15, 0.98) 100%), url(${coverPhoto})`,
          }}
        >
          {/* Top Badge */}
          <div className="pt-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-semibold tracking-wider shadow-lg uppercase">
              Undangan Pernikahan
            </span>
          </div>

          {/* Couple Names */}
          <div className="my-auto py-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide drop-shadow-md">
              {data.groom_nickname} &amp; {data.bride_nickname}
            </h1>
            <p className="text-purple-200/80 text-sm mt-3 tracking-widest uppercase font-light">
              {formatDate(data.akad_date)}
            </p>
          </div>

          {/* Guest Recipient Box & Button */}
          <div className="w-full pb-10 flex flex-col items-center">
            <div className="w-full bg-white/95 text-slate-800 rounded-2xl p-6 shadow-2xl border border-white/50 mb-6 backdrop-blur-sm">
              <p className="text-xs text-slate-500 font-medium">Kepada Yth.</p>
              <p className="text-xs text-slate-400 mb-1">Bapak/Ibu/Saudara/i</p>
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                {guestName}
              </h2>
            </div>

            <button
              onClick={handleOpenInvitation}
              className="w-full py-3.5 px-8 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-600 group-hover:rotate-12 transition-transform" />
              <span>Lihat Undangan</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 1: HERO / OPENING                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex flex-col justify-between items-center text-center px-6 pt-12 pb-16 overflow-hidden">
          {/* Background image fade */}
          <div
            className="absolute inset-0 bg-cover bg-top pointer-events-none opacity-50"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(9, 7, 15, 0.1) 0%, rgba(9, 7, 15, 0.7) 60%, rgba(9, 7, 15, 1) 100%), url(${coverPhoto})`,
            }}
          />

          <div className="relative z-10 w-full flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-semibold tracking-wider shadow-md uppercase mb-6">
              Undangan Pernikahan
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
              {data.groom_nickname} &amp; {data.bride_nickname}
            </h1>
            <p className="text-purple-200/90 text-sm mt-3 font-light">
              {formatDate(data.akad_date)}
            </p>
          </div>

          {/* Quote Section */}
          <div className="relative z-10 max-w-xs mx-auto my-auto py-8">
            <p className="text-xs md:text-sm text-purple-200/80 italic leading-relaxed font-serif">
              “{data.quote || "Lalu Dia menjadikan darinya sepasang laki-laki dan perempuan."}”
            </p>
            <p className="text-xs text-purple-400 mt-2 font-medium">
              — {data.quote_source || "Q.S Al-Qiyamah: 39"}
            </p>
          </div>

          {/* Scroll Down Indicator */}
          <div className="relative z-10 flex flex-col items-center gap-2 text-purple-300/60 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest">Gulir Ke Bawah</span>
            <div className="w-5 h-8 rounded-full border border-purple-400/40 flex items-start justify-center p-1">
              <div className="w-1.5 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 2: PROFIL MEMPELAI (BRIDE & GROOM)                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6 relative z-10 text-center">
          {/* Bismillah SVG */}
          <div className="flex justify-center mb-6">
            <span className="text-2xl md:text-3xl font-serif text-purple-200/90 font-light tracking-widest">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>

          <h2 className="text-sm font-semibold tracking-wide text-purple-200 mb-3">
            Assalamu’alaikum Warahmatullahi Wabarakatuh
          </h2>
          <p className="text-xs text-purple-200/70 max-w-xs mx-auto mb-12 leading-relaxed">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu dan teman-teman untuk menghadiri pernikahan kami:
          </p>

          {/* Bride Profile */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-purple-400/40 p-1 shadow-xl shadow-purple-950/50 mb-4 bg-purple-950/30">
              <img
                src={femalePhoto}
                alt={data.bride_full_name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-1">
              {data.bride_full_name}
            </h3>
            <p className="text-xs text-purple-300 font-medium mb-1">
              {data.bride_parents || "Putri dari Bpk. Wijaya Kusuma & Ibu Aini Raharja"}
            </p>
          </div>

          {/* Amperstand Separator */}
          <div className="my-4">
            <span className="text-3xl font-serif text-purple-400 font-light">&amp;</span>
          </div>

          {/* Groom Profile */}
          <div className="flex flex-col items-center mt-4">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-purple-400/40 p-1 shadow-xl shadow-purple-950/50 mb-4 bg-purple-950/30">
              <img
                src={malePhoto}
                alt={data.groom_full_name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-1">
              {data.groom_full_name}
            </h3>
            <p className="text-xs text-purple-300 font-medium mb-1">
              {data.groom_parents || "Putra dari Bpk. Anggara & Ibu Anggun"}
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 3: COUNTDOWN & ACARA (EVENT DETAILS)                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-12 px-6 relative z-10">
          {/* Happy Wedding Day Banner */}
          <div className="bg-gradient-to-b from-purple-950/40 to-purple-900/20 border border-purple-500/20 rounded-2xl p-6 text-center mb-8 backdrop-blur-sm">
            <div className="text-2xl mb-2">🎉 🎉 🎉</div>
            <h3 className="text-lg font-serif font-bold text-white mb-1">
              Happy Wedding Day!
            </h3>
            <p className="text-xs text-purple-200/70 mb-6">
              Selamat menempuh hidup baru, semoga bahagia selalu selamanya!
            </p>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {[
                { label: "Hari", val: timeLeft.hari },
                { label: "Jam", val: timeLeft.jam },
                { label: "Menit", val: timeLeft.menit },
                { label: "Detik", val: timeLeft.detik },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 rounded-xl p-2.5 border border-purple-400/20 flex flex-col items-center justify-center shadow-sm"
                >
                  <span className="text-xl font-bold font-serif text-white">
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-purple-300 uppercase tracking-wider mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Add to Calendar Button */}
            <a
              href={createCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-xs font-semibold text-purple-100 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-300" />
              <span>Simpan ke Google Calendar</span>
            </a>
          </div>

          {/* ── CARD AKAD NIKAH ── */}
          <div className="bg-white text-slate-800 rounded-3xl p-6 md:p-8 border-2 border-purple-400/40 shadow-2xl relative overflow-hidden mb-8">
            {/* Watercolor corner floral illustration */}
            <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-90 overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full text-purple-300 fill-current">
                <circle cx="80" cy="20" r="18" fill="#c084fc" opacity="0.35" />
                <circle cx="65" cy="35" r="14" fill="#a855f7" opacity="0.25" />
                <circle cx="85" cy="45" r="12" fill="#e879f9" opacity="0.3" />
                <path d="M70,10 Q85,25 95,15" stroke="#7e22ce" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M60,30 Q75,45 85,35" stroke="#7e22ce" strokeWidth="2" fill="none" opacity="0.4" />
              </svg>
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
              Akad Nikah
            </span>

            <h4 className="text-xl font-serif font-bold text-slate-900 mb-2">
              Akad Nikah
            </h4>

            <div className="flex items-center gap-2 text-xs text-purple-700 font-semibold mb-4">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>
                {formatDate(data.akad_date)} • {data.akad_time || "08.00 - 10.00 WIB"}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1 mb-6">
              <p className="font-bold text-slate-800">{data.akad_location}</p>
              <p className="leading-relaxed text-slate-500">
                Gedung &amp; Tempat Acara yang telah dipersiapkan dengan khidmat untuk kedua mempelai.
              </p>
            </div>

            {data.akad_map_url && (
              <a
                href={data.akad_map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-purple-500/25"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Lihat di Google Maps</span>
              </a>
            )}
          </div>

          {/* ── CARD RESEPSI ── */}
          <div className="bg-white text-slate-800 rounded-3xl p-6 md:p-8 border-2 border-purple-400/40 shadow-2xl relative overflow-hidden mb-8">
            {/* Watercolor corner floral illustration */}
            <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-90 overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full text-purple-300 fill-current">
                <circle cx="80" cy="20" r="18" fill="#c084fc" opacity="0.35" />
                <circle cx="65" cy="35" r="14" fill="#a855f7" opacity="0.25" />
                <circle cx="85" cy="45" r="12" fill="#e879f9" opacity="0.3" />
                <path d="M70,10 Q85,25 95,15" stroke="#7e22ce" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M60,30 Q75,45 85,35" stroke="#7e22ce" strokeWidth="2" fill="none" opacity="0.4" />
              </svg>
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
              Resepsi Pernikahan
            </span>

            <h4 className="text-xl font-serif font-bold text-slate-900 mb-2">
              Resepsi Pernikahan
            </h4>

            <div className="flex items-center gap-2 text-xs text-purple-700 font-semibold mb-4">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>
                {formatDate(data.resepsi_date)} • {data.resepsi_time || "11.00 - 14.00 WIB"}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1 mb-6">
              <p className="font-bold text-slate-800">{data.resepsi_location}</p>
              <p className="leading-relaxed text-slate-500">
                Sebuah kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
              </p>
            </div>

            {data.resepsi_map_url && (
              <a
                href={data.resepsi_map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-purple-500/25"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Lihat di Google Maps</span>
              </a>
            )}
          </div>

          {/* Virtual Streaming Session */}
          <div className="text-center py-4">
            <p className="text-xs text-purple-300/80 mb-2 font-medium">
              Virtual Akad &amp; Resepsi:
            </p>
            <a
              href={data.stream_link || "https://youtube.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-purple-800/40 hover:bg-purple-800/60 border border-purple-400/30 text-xs font-semibold text-white transition-all shadow-md"
            >
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Live Streaming</span>
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 4: LOVE STORY TIMELINE                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              Love Story
            </h2>
            <div className="w-12 h-0.5 bg-purple-500 mx-auto rounded-full" />
          </div>

          {/* Timeline Container */}
          <div className="relative pl-6 border-l-2 border-purple-500/40 space-y-10 ml-2">
            {DEFAULT_STORIES.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing Timeline Node */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-2 border-slate-900 shadow-md shadow-purple-500/50 group-hover:scale-125 transition-transform" />

                {/* Story Card */}
                <div className="bg-purple-950/40 border border-purple-500/20 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                  <div className="h-44 w-full overflow-hidden bg-purple-900/30">
                    <img
                      src={item.image}
                      alt={item.waktu}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[11px] text-purple-300 mb-2.5 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-400" />
                        {item.waktu}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        {item.lokasi}
                      </span>
                    </div>
                    <p className="text-xs text-purple-100/80 leading-relaxed font-light">
                      {item.story}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 5: GALERI FOTO                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 px-6 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              Galeri Kenangan
            </h2>
            <p className="text-xs text-purple-200/70">
              Momen bahagia perjalanan cinta kami
            </p>
            <div className="w-12 h-0.5 bg-purple-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {galleryList.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-purple-500/20 bg-purple-950/40 cursor-pointer group shadow-lg"
              >
                <img
                  src={img}
                  alt={`Galeri ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-purple-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-sm w-full aspect-[4/5]">
              <img
                src={galleryList[lightboxIndex]}
                alt="Enlarged gallery photo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            {galleryList.length > 1 && (
              <div className="absolute bottom-8 flex gap-4">
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : galleryList.length - 1
                    )
                  }
                  className="p-3 rounded-full bg-white/20 text-white cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev < galleryList.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="p-3 rounded-full bg-white/20 text-white cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 6: AMPLOP DIGITAL & HADIAH                         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="gift" className="py-16 px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-600/20 text-purple-400 mb-3 border border-purple-400/30">
              <Gift className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              Amplop Digital
            </h2>
            <p className="text-xs text-purple-200/70 max-w-xs mx-auto leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui:
            </p>
          </div>

          {/* ATM / DEBIT CARD DESIGN */}
          <div className="w-full bg-gradient-to-tr from-emerald-950 via-emerald-800 to-teal-700 text-white rounded-3xl p-6 shadow-2xl border border-emerald-400/30 relative overflow-hidden mb-6">
            {/* Chip & Holographic wave */}
            <div className="flex items-center justify-between mb-8">
              <div className="w-11 h-8 rounded-md bg-amber-200/80 border border-amber-300/90 shadow-inner flex items-center justify-center">
                <div className="w-7 h-5 border border-amber-500/50 rounded-sm" />
              </div>
              <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider">
                {data.bank_name || "BANK CENTRAL ASIA"}
              </div>
            </div>

            {/* Account Number */}
            <div className="mb-6">
              <p className="text-[10px] text-emerald-200/80 uppercase tracking-widest mb-1">
                Nomor Rekening
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-bold tracking-widest drop-shadow-sm">
                  {data.bank_account || "09749893892"}
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      data.bank_account || "09749893892",
                      "rekening",
                      "Nomor Rekening"
                    )
                  }
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  title="Salin Nomor Rekening"
                >
                  {copiedField === "rekening" ? (
                    <Check className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <p className="text-[10px] text-emerald-200/80 uppercase tracking-widest">
                Atas Nama
              </p>
              <p className="text-sm font-semibold tracking-wider font-serif">
                {data.account_owner || data.bride_nickname || "Desti Angraeny"}
              </p>
            </div>
          </div>

          {/* PHYSICAL GIFT DELIVERY CARD */}
          <div className="bg-purple-950/40 border border-purple-500/20 rounded-2xl p-5 text-left backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
              <Gift className="w-4 h-4 text-purple-400" />
              <span>Kirim Hadiah Fisik</span>
            </div>
            <p className="text-xs font-semibold text-white mb-1">
              Penerima: {data.physical_gift_recipient || `${data.groom_nickname} & ${data.bride_nickname}`}
            </p>
            <p className="text-xs text-purple-200/70 mb-2">
              Telepon: {data.physical_gift_phone || "0857-7772-1212"}
            </p>
            <p className="text-xs text-purple-200/80 leading-relaxed mb-4">
              {data.physical_gift_address || "Jl. Salemba Raya No. 12, Jakarta Pusat, DKI Jakarta 10455"}
            </p>
            <button
              onClick={() =>
                handleCopy(
                  data.physical_gift_address || "Jl. Salemba Raya No. 12, Jakarta Pusat, DKI Jakarta 10455",
                  "alamat",
                  "Alamat Pengiriman"
                )
              }
              className="w-full py-2.5 px-4 rounded-xl bg-purple-700/40 hover:bg-purple-700/60 border border-purple-400/30 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedField === "alamat" ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>Salin Alamat Lengkap</span>
            </button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* SECTION 7: UCAPAN & DOA (RSVP / BUKU TAMU)                  */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section id="rsvp" className="py-16 px-6 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              Doa Terbaik
            </h2>
            <p className="text-xs text-purple-200/70">
              untuk {data.groom_nickname} &amp; {data.bride_nickname}
            </p>
            <div className="w-12 h-0.5 bg-purple-500 mx-auto rounded-full mt-2" />
          </div>

          {/* RSVP FORM */}
          <form
            onSubmit={handleRsvpSubmit}
            className="bg-purple-950/40 border border-purple-500/20 rounded-3xl p-6 shadow-2xl backdrop-blur-sm mb-10 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Tulis nama Anda"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-purple-500/30 text-white text-xs placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRsvpAttend("Hadir")}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    rsvpAttend === "Hadir"
                      ? "bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30"
                      : "bg-slate-900/60 text-purple-300/70 border-purple-500/20 hover:bg-slate-900"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Hadir</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRsvpAttend("Tidak Hadir")}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    rsvpAttend === "Tidak Hadir"
                      ? "bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/30"
                      : "bg-slate-900/60 text-purple-300/70 border-purple-500/20 hover:bg-slate-900"
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Tidak Hadir</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1.5">
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                required
                rows={3}
                value={rsvpMsg}
                onChange={(e) => setRsvpMsg(e.target.value)}
                placeholder="Berikan ucapan manis & doa tulus..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-purple-500/30 text-white text-xs placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingRsvp}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-lg shadow-purple-600/40 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmittingRsvp ? "Mengirimkan..." : "Kirim Ucapan"}</span>
            </button>
          </form>

          {/* GUESTBOOK FEED */}
          <div className="space-y-3">
            {guestbookList.length === 0 ? (
              <div className="text-center py-8 text-xs text-purple-300/50">
                Belum ada ucapan. Jadilah yang pertama memberikan doa!
              </div>
            ) : (
              guestbookList.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 text-slate-800 rounded-2xl p-4 shadow-md border border-purple-100 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                    {item.nama_tamu.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.nama_tamu}
                      </h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          item.kehadiran === "Hadir"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {item.kehadiran}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed break-words">
                      {item.pesan}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* FOOTER                                                      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <footer className="py-12 px-6 text-center border-t border-purple-900/30 text-purple-300/60 text-xs relative z-10">
          <p className="font-serif text-lg text-white mb-2 font-bold">
            {data.groom_nickname} &amp; {data.bride_nickname}
          </p>
          <p className="mb-4">Terima kasih atas doa &amp; restu Anda.</p>
          <div className="inline-flex items-center gap-1 text-[11px] text-purple-400">
            <span>Dibuat dengan cinta oleh</span>
            <span className="font-semibold text-purple-300">Temu Waktu</span>
          </div>
        </footer>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* FLOATING ACTION BUTTONS (Audio, Gift, RSVP)                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleAudio}
            className={`w-11 h-11 rounded-full bg-slate-900/90 text-white border border-purple-500/40 shadow-xl flex items-center justify-center transition-all cursor-pointer ${
              isPlaying ? "animate-spin-slow text-purple-300" : "opacity-80"
            }`}
            title={isPlaying ? "Jeda Musik" : "Putar Musik"}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Quick Gift shortcut */}
          <a
            href="#gift"
            className="w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-600/40 flex items-center justify-center transition-transform hover:scale-110"
            title="Amplop Digital"
          >
            <Gift className="w-4 h-4" />
          </a>

          {/* Quick RSVP shortcut */}
          <a
            href="#rsvp"
            className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/40 flex items-center justify-center transition-transform hover:scale-110"
            title="Kirim Doa"
          >
            <MessageSquareHeart className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
