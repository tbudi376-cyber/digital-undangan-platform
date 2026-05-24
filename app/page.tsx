import Link from "next/link";
import {
  Palette,
  HandHeart,
  FileSpreadsheet,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Heart,
} from "lucide-react";

// ============================================================================
// Landing Page — "Temu Waktu" Digital Wedding Invitation Platform
// ============================================================================
// A premium, modern landing page with:
//   - Glassmorphism navbar
//   - Hero section with gradient accents
//   - 3-column feature grid with hover animations
//   - Clean footer
// ============================================================================

const FEATURES = [
  {
    icon: Palette,
    title: "Pilihan Tema Estetik",
    description:
      "Pilih dari berbagai desain premium dan elegan yang paling sesuai dengan konsep hari bahagiamu.",
    accent: "from-rose-400 to-pink-500",
    bgGlow: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    icon: HandHeart,
    title: "100% Terima Beres",
    description:
      "Tidak perlu pusing mengatur sistem. Cukup kirimkan data diri dan foto, tim kami yang akan menyulapnya menjadi undangan siap sebar.",
    accent: "from-emerald-400 to-teal-500",
    bgGlow: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    icon: FileSpreadsheet,
    title: "Rekap Tamu Rapi",
    description:
      "Fokus persiapkan acara. Kami akan mengirimkan laporan daftar kehadiran dan ucapan tamu yang sudah tersusun rapi untukmu.",
    accent: "from-amber-400 to-orange-500",
    bgGlow: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* NAVBAR                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/20">
        <div className="backdrop-blur-xl bg-white/70">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2 group">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-bold tracking-tight text-slate-800">
                Temu <span className="text-rose-500">Waktu</span>
              </span>
            </Link>

            {/* CTA Button */}
            <Link
              href="#features"
              className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Buat Undangan
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 px-6">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Top-right glow */}
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-200/40 via-pink-100/30 to-transparent blur-3xl" />
          {/* Bottom-left glow */}
          <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-100/30 via-teal-50/20 to-transparent blur-3xl" />
          {/* Center dot pattern (subtle) */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 text-xs font-semibold tracking-wide uppercase mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Undangan Digital Instan — Terima Beres
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
            Rayakan Momen
            <br />
            Bahagiamu dengan{" "}
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Elegan
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up">
            Buat undangan pernikahan digital yang mengesankan dalam hitungan
            menit. Desain premium, RSVP otomatis, dan terintegrasi langsung
            ke Google Sheets Anda.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
            <Link
              href="#katalog"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-xl shadow-rose-500/25 hover:shadow-2xl hover:shadow-rose-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Lihat Katalog Tema
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <a
              href="https://wa.me/6282176775545?text=Halo%20Temu%20Waktu%2C%20saya%20ingin%20pesan%20undangan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-slate-300 text-slate-600 font-semibold hover:border-emerald-300 hover:text-emerald-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 group-hover:text-emerald-600 transition-colors duration-300" />
              Pesan via WhatsApp
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["🧑‍🤝‍🧑", "💑", "👫"].map((emoji, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-100 to-pink-50 border-2 border-white flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <span>
                Dipercaya <strong className="text-slate-600">500+</strong> pasangan
              </span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-slate-200" />
            <span>
              ⭐ Rating <strong className="text-slate-600">4.9/5</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FEATURES GRID                                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="features" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-rose-500 mb-3">
              Keunggulan
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800">
              Semua yang Anda Butuhkan, dalam{" "}
              <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
                Satu Platform
              </span>
            </h2>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl scale-110`}
                />

                {/* Icon container */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`mt-6 h-1 w-0 group-hover:w-16 rounded-full bg-gradient-to-r ${feature.accent} transition-all duration-500`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CTA BANNER                                                 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto relative rounded-[2rem] overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-amber-400" />

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />

          <div className="relative py-16 md:py-20 px-8 md:px-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Siap Membuat Undangan Impianmu?
            </h2>
            <p className="text-lg text-white/80 max-w-lg mx-auto mb-8">
              Mulai sekarang dan kejutkan tamu-tamu Anda dengan undangan
              digital yang elegan dan personal.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-rose-600 font-bold shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Mulai Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <footer id="contact" className="border-t border-slate-200/60 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-sm font-semibold text-slate-600">
              Temu Waktu
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Temu Waktu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
