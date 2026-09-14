"use client";

import type { RsvpEntry } from "@/types";
import { cn } from "@/lib/utils";
import { MessageSquareHeart } from "lucide-react";

interface GuestbookProps {
  rsvps: RsvpEntry[];
  variant?: "elegant" | "rustic" | "minimalist" | "pastel" | "conservatory";
}

export function Guestbook({ rsvps, variant = "elegant" }: GuestbookProps) {
  if (!rsvps || rsvps.length === 0) return null;

  const isRustic = variant === "rustic";
  const isMinimalist = variant === "minimalist";
  const isPastel = variant === "pastel";
  const isConservatory = variant === "conservatory";

  return (
    <div
      className={cn(
        "w-full max-w-lg mx-auto p-6 md:p-8 shadow-sm transition-all mt-12 text-left animate-fade-in-up",
        isPastel
          ? "bg-[#15102a]/80 border border-purple-800/40 text-slate-100 rounded-3xl backdrop-blur-sm"
          : isConservatory
          ? "bg-[#0D2818]/80 border border-emerald-700/30 text-[#F9F8F4] rounded-3xl backdrop-blur-sm"
          : isRustic
          ? "bg-[#F8F5EE] border-2 border-[#2E4A3D]/25 border-dashed rounded-3xl text-stone-800 shadow-[0_10px_30px_rgba(46,74,61,0.06)]"
          : isMinimalist
          ? "bg-white border border-black/15 rounded-none text-black p-6 sm:p-8"
          : "bg-[#FDFBF7] border border-[#D4AF37]/50 rounded-3xl text-[#3A0A13] shadow-[0_12px_40px_rgba(107,23,40,0.08)]"
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <MessageSquareHeart
          className={cn(
            "w-5 h-5",
            isPastel
              ? "text-purple-400"
              : isConservatory
              ? "text-emerald-400"
              : isRustic
              ? "text-[#2E4A3D]"
              : isMinimalist
              ? "text-black"
              : "text-[#AA7C11]"
          )}
        />
        <h3
          className={cn(
            "text-xl font-bold",
            isMinimalist
              ? "font-mono uppercase tracking-[0.2em] text-sm text-black"
              : isConservatory
              ? "font-serif text-[#A8E6CF]"
              : isRustic
              ? "font-serif text-[#2E4A3D]"
              : "font-serif text-[#6B1728]"
          )}
        >
          Ucapan &amp; Doa ({rsvps.length})
        </h3>
      </div>

      {/* Scrollable Container */}
      <div className="flex flex-col gap-3.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {rsvps.map((entry, idx) => {
          const initial = entry.nama_tamu ? entry.nama_tamu.charAt(0).toUpperCase() : "?";

          return (
            <div
              key={idx}
              className={cn(
                "p-4 transition-all duration-300",
                isPastel
                  ? "bg-purple-950/30 border border-purple-800/30 rounded-2xl"
                  : isConservatory
                  ? "bg-emerald-950/30 border border-emerald-700/25 rounded-2xl"
                  : isRustic
                  ? "bg-[#FAF7F0] border border-[#2E4A3D]/15 rounded-2xl"
                  : isMinimalist
                  ? "bg-zinc-50 border border-black/10 rounded-none"
                  : "bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-2xl"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-9 h-9 flex items-center justify-center text-xs font-bold",
                      isPastel
                        ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full shadow-inner"
                        : isConservatory
                        ? "bg-gradient-to-br from-emerald-600 to-emerald-800 text-[#F9F8F4] rounded-full shadow-inner"
                        : isRustic
                        ? "bg-[#2E4A3D] text-[#F8F5EE] rounded-full"
                        : isMinimalist
                        ? "bg-black text-white rounded-none font-mono"
                        : "bg-gradient-to-br from-[#6B1728] to-[#851C32] text-[#F3E5AB] border border-[#D4AF37]/50 rounded-full"
                    )}
                  >
                    {initial}
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-sm font-semibold leading-tight",
                        isMinimalist ? "font-sans uppercase text-xs" : isConservatory ? "font-serif text-[#A8E6CF]" : isRustic ? "font-serif text-[#2E4A3D]" : "font-serif text-[#50101E]"
                      )}
                    >
                      {entry.nama_tamu}
                    </p>
                    <span
                      className={cn(
                        "text-[10px] font-medium px-2 py-0.5 inline-block mt-1",
                        entry.kehadiran === "Hadir"
                          ? isPastel
                            ? "bg-purple-900/60 text-purple-200 border border-purple-700/40 rounded-full"
                            : isConservatory
                            ? "bg-emerald-800/40 text-emerald-200 border border-emerald-600/30 rounded-full"
                            : isRustic
                            ? "bg-[#2E4A3D]/10 text-[#2E4A3D] rounded-full"
                            : isMinimalist
                            ? "bg-black text-white rounded-none font-mono text-[9px]"
                            : "bg-[#AA7C11]/15 text-[#6B1728] border border-[#D4AF37]/30 rounded-full"
                          : isMinimalist
                          ? "bg-zinc-200 text-zinc-600 rounded-none font-mono text-[9px]"
                          : "bg-stone-100 text-stone-500 rounded-full"
                      )}
                    >
                      {entry.kehadiran}
                    </span>
                  </div>
                </div>

                {entry.timestamp && (
                  <span
                    className={cn(
                      "text-[10px] shrink-0 mt-0.5",
                      isMinimalist ? "font-mono text-zinc-400" : "text-stone-400"
                    )}
                  >
                    {entry.timestamp}
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "mt-2.5 text-xs md:text-sm leading-relaxed italic border-l-2 pl-3 py-0.5",
                  isPastel
                    ? "text-slate-300 border-purple-500/40"
                    : isConservatory
                    ? "text-emerald-200/70 border-emerald-500/40 font-serif"
                    : isRustic
                    ? "text-stone-600 border-[#A65D46]/60 font-serif"
                    : isMinimalist
                    ? "text-zinc-600 border-black not-italic font-sans text-xs"
                    : "text-stone-700 border-[#D4AF37]/60 font-serif"
                )}
              >
                &ldquo;{entry.pesan}&rdquo;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
