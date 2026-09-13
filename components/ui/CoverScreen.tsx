"use client";

import { useState } from "react";
import { MailOpen, Sparkles, Heart, Leaf } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface CoverScreenProps {
  groomNickname: string;
  brideNickname: string;
  eventDate?: string;
  guestName?: string;
  coverImage?: string;
  variant?: "elegant" | "rustic" | "minimalist" | "pastel" | "conservatory";
  onOpen?: () => void;
}

export function CoverScreen({
  groomNickname,
  brideNickname,
  eventDate,
  guestName = "Tamu Spesial",
  coverImage,
  variant = "elegant",
  onOpen,
}: CoverScreenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("temu-waktu:open-cover"));
    }
    if (onOpen) {
      onOpen();
    }
  };

  const isPastel = variant === "pastel";
  const isRustic = variant === "rustic";
  const isMinimalist = variant === "minimalist";
  const isConservatory = variant === "conservatory";
  const isElegant = variant === "elegant" || (!isPastel && !isRustic && !isMinimalist && !isConservatory);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col justify-between items-center text-center p-6 transition-all duration-1000 ease-in-out select-none",
        isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100",
        isPastel
          ? "bg-[#09070f] text-slate-100"
          : isRustic
          ? "bg-[#1B2820] text-[#F8F5EE]"
          : isMinimalist
          ? "bg-[#0A0A0A] text-[#FFFFFF]"
          : isConservatory
          ? "bg-[#0A1A12] text-[#F9F8F4]"
          : "bg-[#2A0910] text-[#FDFBF7]"
      )}
      style={{
        backgroundImage: coverImage
          ? isMinimalist
            ? `linear-gradient(to bottom, rgba(10, 10, 10, 0.45) 0%, rgba(10, 10, 10, 0.85) 65%, rgba(10, 10, 10, 0.98) 100%), url(${coverImage})`
            : isRustic
            ? `linear-gradient(to bottom, rgba(27, 40, 32, 0.5) 0%, rgba(27, 40, 32, 0.85) 60%, rgba(20, 30, 24, 0.98) 100%), url(${coverImage})`
            : isConservatory
            ? `linear-gradient(to bottom, rgba(10, 26, 18, 0.45) 0%, rgba(10, 26, 18, 0.85) 60%, rgba(6, 18, 12, 0.98) 100%), url(${coverImage})`
            : isElegant
            ? `linear-gradient(to bottom, rgba(42, 9, 16, 0.5) 0%, rgba(42, 9, 16, 0.85) 60%, rgba(25, 5, 10, 0.98) 100%), url(${coverImage})`
            : `linear-gradient(to bottom, rgba(15, 12, 25, 0.55) 0%, rgba(15, 12, 25, 0.85) 60%, rgba(10, 8, 18, 0.98) 100%), url(${coverImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ── Ambient Glow & Texture Layers ────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isElegant && (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#6B1728]/40 to-[#D4AF37]/20 blur-3xl" />
            <div className="absolute -bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#D4AF37]/15 blur-3xl animate-pulse" />
            {/* Delicate Arch Frame Overlay */}
            <div className="absolute inset-4 sm:inset-8 border border-[#D4AF37]/25 rounded-[2.5rem] pointer-events-none">
              <div className="absolute inset-1.5 border border-[#D4AF37]/15 rounded-[2.2rem]" />
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/60" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/60" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/60" />
            </div>
          </>
        )}

        {isRustic && (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#2E4A3D]/50 blur-3xl" />
            <div className="absolute -bottom-12 left-1/4 w-80 h-80 rounded-full bg-[#A65D46]/20 blur-3xl" />
            {/* Fine Botanical Border Frame */}
            <div className="absolute inset-4 sm:inset-8 border border-[#2E4A3D]/30 rounded-2xl pointer-events-none">
              <div className="absolute inset-1 border border-dashed border-[#A65D46]/25 rounded-xl" />
            </div>
          </>
        )}

        {isMinimalist && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
            {/* Hairline geometric frame */}
            <div className="absolute inset-4 sm:inset-8 border border-white/10 pointer-events-none" />
          </>
        )}

        {isPastel && (
          <>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-30 bg-purple-600" />
            <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 bg-pink-500" />
          </>
        )}
      </div>

      {/* ── Top Header ────────────────────────────────────────────── */}
      <div className="pt-8 relative z-10 animate-fade-in">
        {isElegant && (
          <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-[#3B0C15]/70 border border-[#D4AF37]/40 text-[#F3E5AB] text-[11px] font-medium tracking-[0.25em] uppercase shadow-lg backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>Walimatul &apos;Ursy</span>
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
          </div>
        )}

        {isRustic && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E4A3D]/80 border border-[#A65D46]/40 text-[#F8F5EE] text-[11px] font-serif tracking-[0.2em] uppercase shadow-md backdrop-blur-md">
            <Leaf className="w-3.5 h-3.5 text-[#A65D46]" />
            <span>The Wedding Celebration</span>
          </div>
        )}

        {isMinimalist && (
          <div className="inline-flex items-center gap-3 px-3 py-1 border border-white/20 bg-black/40 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-300">
            <span>INVITATION</span>
            <span className="text-zinc-600">/</span>
            <span>TEMU WAKTU</span>
          </div>
        )}

        {isPastel && (
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-lg backdrop-blur-md bg-white/90 text-purple-950">
            <Heart className="w-3.5 h-3.5 fill-current" />
            The Wedding of
          </span>
        )}

        {isConservatory && (
          <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-[#0E281C]/80 border border-emerald-500/40 text-emerald-200 text-[11px] font-serif tracking-[0.25em] uppercase shadow-lg backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Botanical Conservatory Wedding</span>
            <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
          </div>
        )}
      </div>

      {/* ── Center Names ──────────────────────────────────────────── */}
      <div className="my-auto py-8 relative z-10 animate-fade-in-up w-full max-w-xl">
        {isElegant && (
          <div className="flex flex-col items-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] mb-2 font-medium">
              The Royal Wedding of
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FDFBF7] tracking-normal leading-tight drop-shadow-sm">
              {groomNickname}
            </h1>
            <div className="flex items-center gap-3 my-1">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
              <span className="font-serif italic text-2xl text-[#D4AF37]">&amp;</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FDFBF7] tracking-normal leading-tight drop-shadow-sm">
              {brideNickname}
            </h1>
            {eventDate && (
              <p className="text-xs tracking-[0.25em] uppercase text-[#F3E5AB]/90 font-light mt-4">
                {formatDate(eventDate)}
              </p>
            )}
          </div>
        )}

        {isRustic && (
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#A65D46] mb-3 font-serif italic">
              Pernikahan Suci
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F8F5EE] leading-tight">
              {groomNickname}
            </h1>
            <div className="flex items-center gap-4 my-2">
              <span className="h-px w-12 bg-[#2E4A3D]/50" />
              <span className="text-[#A65D46] font-serif italic text-2xl font-light">&amp;</span>
              <span className="h-px w-12 bg-[#2E4A3D]/50" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F8F5EE] leading-tight">
              {brideNickname}
            </h1>
            {eventDate && (
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-stone-300 mt-4">
                {formatDate(eventDate)}
              </p>
            )}
          </div>
        )}

        {isMinimalist && (
          <div className="text-left w-full px-4 sm:px-6">
            <div className="border-b border-white/15 pb-4 mb-4 flex justify-between items-end">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400">
                01 // THE CEREMONY
              </span>
              {eventDate && (
                <span className="text-[10px] font-mono tracking-widest text-zinc-300">
                  DATE. {formatDate(eventDate).toUpperCase()}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] text-white">
                {groomNickname}
              </h1>
              <div className="flex items-center gap-4 py-2">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  [ AND ]
                </span>
                <div className="h-px flex-1 bg-white/20" />
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] text-white text-right">
                {brideNickname}
              </h1>
            </div>
          </div>
        )}

        {isPastel && (
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif tracking-tight mb-2">
              {groomNickname} &amp; {brideNickname}
            </h1>
            {eventDate && (
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase font-light mt-3 text-purple-200/80">
                {formatDate(eventDate)}
              </p>
            )}
          </div>
        )}

        {isConservatory && (
          <div className="flex flex-col items-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-emerald-400 mb-2 font-serif">
              The Botanical Union of
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#F9F8F4] tracking-normal leading-tight drop-shadow-md">
              {groomNickname}
            </h1>
            <div className="flex items-center gap-3 my-1">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-400/70" />
              <span className="font-serif italic text-2xl text-emerald-300">&amp;</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-emerald-400/70" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#F9F8F4] tracking-normal leading-tight drop-shadow-md">
              {brideNickname}
            </h1>
            {eventDate && (
              <p className="text-xs font-serif tracking-[0.25em] uppercase text-emerald-200/90 font-light mt-4">
                {formatDate(eventDate)}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom: Guest Box & Interactive Action Button ────────── */}
      <div className="w-full max-w-sm pb-8 flex flex-col items-center relative z-10 animate-fade-in-up delay-200">
        {/* Guest Plaque */}
        <div
          className={cn(
            "w-full rounded-2xl p-5 shadow-2xl backdrop-blur-md border mb-6 transition-all duration-300",
            isPastel
              ? "bg-white/95 text-slate-900 border-white/50"
              : isRustic
              ? "bg-[#F8F5EE]/95 text-stone-800 border-[#2E4A3D]/30 shadow-[0_10px_30px_rgba(46,74,61,0.2)]"
              : isMinimalist
              ? "bg-black/85 text-white border-white/20 rounded-none text-left p-4"
              : isConservatory
              ? "bg-[#0E281C]/90 text-[#F9F8F4] border-emerald-500/30 shadow-[0_12px_35px_rgba(6,24,16,0.5)]"
              : "bg-[#FDFBF7]/95 text-[#30080F] border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(107,23,40,0.35)]"
          )}
        >
          {isMinimalist ? (
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                RECIPIENT SPECIFIED:
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white uppercase truncate">
                {guestName}
              </h2>
            </div>
          ) : (
            <>
              <p
                className={cn(
                  "text-[10px] uppercase tracking-widest font-semibold mb-1",
                  isRustic ? "text-[#A65D46]" : isConservatory ? "text-emerald-400" : isElegant ? "text-[#851C32]" : "text-slate-400"
                )}
              >
                Kepada Yth.
              </p>
              <p className="text-xs text-stone-500 mb-1.5">Bapak/Ibu/Saudara/i:</p>
              <h2
                className={cn(
                  "text-xl md:text-2xl font-bold truncate",
                  isRustic ? "font-serif text-[#2E4A3D]" : isConservatory ? "font-serif text-emerald-200" : isElegant ? "font-serif text-[#50101E]" : "font-serif text-slate-900"
                )}
              >
                {guestName}
              </h2>
            </>
          )}
        </div>

        {/* ── Interactive CTA Button ─────────────────────────────── */}
        {isElegant ? (
          /* Wax Seal Couture Button */
          <button
            onClick={handleOpen}
            type="button"
            className="group relative flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer bg-gradient-to-r from-[#6B1728] via-[#851C32] to-[#6B1728] text-[#F3E5AB] border border-[#D4AF37]/60 shadow-[0_8px_30px_rgba(107,23,40,0.6),inset_0_1px_2px_rgba(255,255,255,0.3)] hover:shadow-[0_10px_35px_rgba(212,175,55,0.4)]"
          >
            {/* Wax seal ornament ring */}
            <span className="w-8 h-8 rounded-full bg-[#50101E] border border-[#D4AF37] flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </span>
            <span>Buka Undangan</span>
            <MailOpen className="w-4 h-4 text-[#F3E5AB] opacity-80" />
          </button>
        ) : isRustic ? (
          /* Tuscan Olive Garden & Terracotta Button */
          <button
            onClick={handleOpen}
            type="button"
            className="group flex items-center justify-center gap-3 w-full py-4 rounded-full font-serif font-semibold text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer bg-gradient-to-r from-[#2E4A3D] to-[#3E6352] text-[#F8F5EE] border border-[#A65D46]/40 shadow-[0_10px_25px_rgba(46,74,61,0.35)] hover:from-[#243B30] hover:to-[#2E4A3D]"
          >
            <Leaf className="w-4 h-4 text-[#A65D46] group-hover:rotate-12 transition-transform duration-300" />
            <span>Buka Undangan</span>
            <MailOpen className="w-4 h-4 opacity-80" />
          </button>
        ) : isMinimalist ? (
          /* Architectural Stark Monolith Button */
          <button
            onClick={handleOpen}
            type="button"
            className="group flex items-center justify-between w-full py-4 px-5 rounded-none font-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 active:scale-[0.99] cursor-pointer bg-white text-black hover:bg-zinc-200"
          >
            <span>[ OPEN INVITATION ]</span>
            <MailOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        ) : isConservatory ? (
          /* Botanical Conservatory Glasshouse Button */
          <button
            onClick={handleOpen}
            type="button"
            className="group relative flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full font-serif font-bold text-sm tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer bg-gradient-to-r from-[#0E281C] via-[#163D2B] to-[#0E281C] text-emerald-100 border border-emerald-500/50 shadow-[0_8px_30px_rgba(6,24,16,0.6)] hover:shadow-[0_10px_35px_rgba(16,185,129,0.3)]"
          >
            <span className="w-8 h-8 rounded-full bg-[#0A1A12] border border-emerald-400/60 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </span>
            <span>Masuki Paviliun</span>
            <MailOpen className="w-4 h-4 text-emerald-200 opacity-80" />
          </button>
        ) : (
          /* Pastel */
          <button
            onClick={handleOpen}
            type="button"
            className="group flex items-center justify-center gap-3 w-full py-4 rounded-full font-semibold shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-600/40 hover:from-purple-500 hover:to-indigo-500"
          >
            <MailOpen className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Buka Undangan</span>
            <Sparkles className="w-4 h-4 opacity-70 animate-pulse" />
          </button>
        )}

        <p className="text-[11px] text-white/50 mt-4 tracking-wide font-light">
          *Sentuh untuk membuka undangan &amp; memutar lantunan musik
        </p>
      </div>
    </div>
  );
}
