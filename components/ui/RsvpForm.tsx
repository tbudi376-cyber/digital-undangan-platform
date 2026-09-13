"use client";

import { useState, useCallback } from "react";
import { submitRsvp } from "@/lib/api";
import { Toast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import type { RsvpPayload } from "@/types";

interface RsvpFormProps {
  slug: string;
  guestName?: string;
  variant?: "elegant" | "rustic" | "minimalist" | "pastel";
  onRsvpSuccess?: (entry: { nama_tamu: string; kehadiran: "Hadir" | "Tidak Hadir"; pesan: string; timestamp: string }) => void;
}

export function RsvpForm({ slug, guestName, variant = "elegant", onRsvpSuccess }: RsvpFormProps) {
  const [prevGuestName, setPrevGuestName] = useState(guestName);
  const [nama, setNama] = useState(guestName || "");
  const [kehadiran, setKehadiran] = useState<"Hadir" | "Tidak Hadir">("Hadir");
  const [pesan, setPesan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (guestName !== prevGuestName) {
    setPrevGuestName(guestName);
    setNama(guestName || "");
  }

  const [toast, setToast] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const showToast = useCallback(
    (message: string, toastVariant: "success" | "error" = "success") => {
      setToast({ message, variant: toastVariant });
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNama = nama.trim();
    const cleanPesan = pesan.trim();
    if (!cleanNama || !cleanPesan || isSubmitting) return;

    if (cleanPesan.length > 500) {
      showToast("Pesan terlalu panjang (maksimal 500 karakter)", "error");
      return;
    }

    // Q3: Anti-Spam Cooldown (10 menit) via localStorage
    try {
      const storageKey = `temu_rsvp_${slug}`;
      const lastSubmitTime = localStorage.getItem(storageKey);
      if (lastSubmitTime) {
        const elapsed = Date.now() - parseInt(lastSubmitTime, 10);
        const cooldownMs = 10 * 60 * 1000; // 10 menit
        if (elapsed < cooldownMs) {
          const remainingMin = Math.ceil((cooldownMs - elapsed) / 60000);
          const confirmResubmit = window.confirm(
            `Anda baru saja mengirimkan ucapan beberapa saat yang lalu (${remainingMin} menit tersisa pada jeda kirim). Apakah Anda ingin mengirimkan ucapan tambahan?`
          );
          if (!confirmResubmit) {
            return;
          }
        }
      }
    } catch {
      // Ignore localStorage security/sandbox errors
    }

    const entry = {
      nama_tamu: cleanNama,
      kehadiran,
      pesan: cleanPesan,
      timestamp: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    const payload: RsvpPayload = {
      slug,
      nama_tamu: entry.nama_tamu,
      kehadiran: entry.kehadiran,
      pesan: entry.pesan,
    };

    // Optimistic UI update
    if (onRsvpSuccess) {
      onRsvpSuccess(entry);
    }
    setPesan("");
    showToast("Doa & ucapan Anda terkirim! ✨");
    setIsSubmitting(true);

    try {
      const success = await submitRsvp(payload);
      if (!success) {
        showToast("Gagal mengirim ke server, coba lagi nanti", "error");
      } else {
        try {
          localStorage.setItem(`temu_rsvp_${slug}`, Date.now().toString());
        } catch {
          // Ignore
        }
      }
    } catch {
      showToast("Terjadi kendala jaringan", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRustic = variant === "rustic";
  const isMinimalist = variant === "minimalist";
  const isPastel = variant === "pastel";

  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "p-6 md:p-8 transition-all shadow-sm",
          isPastel
            ? "bg-[#15102a]/80 border border-purple-800/40 text-slate-100 rounded-3xl backdrop-blur-md"
            : isRustic
            ? "bg-[#F8F5EE] border-2 border-[#2E4A3D]/25 border-dashed rounded-3xl text-stone-800 shadow-[0_10px_30px_rgba(46,74,61,0.06)]"
            : isMinimalist
            ? "bg-white border border-black/15 rounded-none text-black p-6 sm:p-8"
            : "bg-[#FDFBF7] border border-[#D4AF37]/50 rounded-3xl text-[#3A0A13] shadow-[0_12px_40px_rgba(107,23,40,0.08)]"
        )}
      >
        <h3
          className={cn(
            "text-xl font-bold text-center mb-6",
            isMinimalist
              ? "font-mono uppercase tracking-[0.2em] text-sm text-black"
              : isRustic
              ? "font-serif text-[#2E4A3D]"
              : "font-serif text-[#6B1728]"
          )}
        >
          Konfirmasi Kehadiran &amp; Doa Restu
        </h3>

        {/* Nama Tamu */}
        <div className="mb-5 text-left">
          <label
            htmlFor="rsvp-nama"
            className={cn(
              "block text-xs font-semibold uppercase tracking-wider mb-2",
              isPastel
                ? "text-purple-200"
                : isRustic
                ? "text-[#2E4A3D] font-serif"
                : isMinimalist
                ? "text-zinc-600 font-mono text-[10px] tracking-widest"
                : "text-[#6B1728] font-medium"
            )}
          >
            Nama Tamu
          </label>
          <input
            id="rsvp-nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            placeholder="Masukkan nama Anda"
            className={cn(
              "w-full px-4 py-3 border outline-none transition-all duration-200 text-sm",
              isPastel
                ? "bg-purple-950/40 border-purple-800/60 text-white placeholder:text-purple-300/40 focus:border-purple-400 rounded-xl"
                : isRustic
                ? "bg-white border-[#2E4A3D]/25 text-stone-800 placeholder:text-stone-400 focus:border-[#2E4A3D] rounded-xl"
                : isMinimalist
                ? "bg-zinc-50 border border-black/20 text-black placeholder:text-zinc-400 focus:border-black rounded-none font-sans"
                : "bg-white border-[#D4AF37]/40 text-[#450F1B] placeholder:text-stone-400 focus:border-[#AA7C11] rounded-xl"
            )}
          />
        </div>

        {/* Kehadiran */}
        <div className="mb-5 text-left">
          <label
            className={cn(
              "block text-xs font-semibold uppercase tracking-wider mb-2",
              isPastel
                ? "text-purple-200"
                : isRustic
                ? "text-[#2E4A3D] font-serif"
                : isMinimalist
                ? "text-zinc-600 font-mono text-[10px] tracking-widest"
                : "text-[#6B1728] font-medium"
            )}
          >
            Konfirmasi Kehadiran
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["Hadir", "Tidak Hadir"] as const).map((option) => {
              const selected = kehadiran === option;
              return (
                <label
                  key={option}
                  className={cn(
                    "flex items-center justify-center gap-2 py-3 px-3 border text-xs font-semibold cursor-pointer transition-all select-none",
                    selected
                      ? isPastel
                        ? "bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-900/40 rounded-xl"
                        : isRustic
                        ? "bg-[#2E4A3D] border-[#2E4A3D] text-[#F8F5EE] shadow-md shadow-stone-800/20 rounded-xl"
                        : isMinimalist
                        ? "bg-black border-black text-white shadow-none rounded-none font-mono text-[11px]"
                        : "bg-[#6B1728] border-[#D4AF37] text-[#F3E5AB] shadow-md shadow-[#6B1728]/30 rounded-xl"
                      : isPastel
                      ? "bg-purple-950/20 border-purple-800/40 text-purple-200/70 hover:border-purple-700 rounded-xl"
                      : isRustic
                      ? "bg-white/70 border-[#2E4A3D]/20 text-stone-700 hover:border-[#2E4A3D]/40 rounded-xl"
                      : isMinimalist
                      ? "bg-zinc-50 border-black/15 text-zinc-600 hover:border-black/30 rounded-none font-mono text-[11px]"
                      : "bg-white/70 border-[#D4AF37]/30 text-stone-700 hover:border-[#D4AF37]/60 rounded-xl"
                  )}
                >
                  <input
                    type="radio"
                    name="kehadiran"
                    value={option}
                    checked={selected}
                    onChange={() => setKehadiran(option)}
                    className="sr-only"
                  />
                  <span>{option === "Hadir" ? "✓ Hadir" : "✕ Tidak Hadir"}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Pesan & Doa */}
        <div className="mb-6 text-left">
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="rsvp-pesan"
              className={cn(
                "block text-xs font-semibold uppercase tracking-wider",
                isPastel
                  ? "text-purple-200"
                  : isRustic
                  ? "text-[#2E4A3D] font-serif"
                  : isMinimalist
                  ? "text-zinc-600 font-mono text-[10px] tracking-widest"
                : "text-[#6B1728] font-medium"
              )}
            >
              Ucapan &amp; Doa Restu
            </label>
            <span
              className={cn(
                "text-[10px]",
                pesan.length > 450 ? "text-amber-500 font-medium" : "text-gray-400"
              )}
            >
              {pesan.length}/500
            </span>
          </div>
          <textarea
            id="rsvp-pesan"
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            required
            maxLength={500}
            rows={3}
            placeholder="Tuliskan ucapan selamat & doa untuk kedua mempelai..."
            className={cn(
              "w-full px-4 py-3 border outline-none transition-all duration-200 resize-none text-sm",
              isPastel
                ? "bg-purple-950/40 border-purple-800/60 text-white placeholder:text-purple-300/40 focus:border-purple-400 rounded-xl"
                : isRustic
                ? "bg-white border-[#2E4A3D]/25 text-stone-800 placeholder:text-stone-400 focus:border-[#2E4A3D] rounded-xl font-serif"
                : isMinimalist
                ? "bg-zinc-50 border border-black/20 text-black placeholder:text-zinc-400 focus:border-black rounded-none font-sans"
                : "bg-white border-[#D4AF37]/40 text-[#450F1B] placeholder:text-stone-400 focus:border-[#AA7C11] rounded-xl"
            )}
          />
        </div>

        {/* Tombol Kirim */}
        <button
          type="submit"
          disabled={isSubmitting || !nama.trim() || !pesan.trim()}
          className={cn(
            "w-full py-3.5 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.99] cursor-pointer text-sm",
            isPastel
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-700/30 text-white rounded-xl"
              : isRustic
              ? "bg-[#2E4A3D] hover:bg-[#243B30] text-[#F8F5EE] shadow-stone-800/20 rounded-xl font-serif tracking-wider"
              : isMinimalist
              ? "bg-black hover:bg-zinc-800 text-white shadow-none rounded-none font-mono uppercase tracking-[0.2em] text-xs"
              : "bg-gradient-to-r from-[#6B1728] via-[#851C32] to-[#6B1728] text-[#F3E5AB] border border-[#D4AF37]/60 shadow-[0_8px_25px_rgba(107,23,40,0.4)] hover:brightness-105 rounded-xl font-serif tracking-wider"
          )}
        >
          {isSubmitting ? "Mengirimkan Doa..." : "Kirim Ucapan & Konfirmasi 💌"}
        </button>
      </form>

      {toast && (
        <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
