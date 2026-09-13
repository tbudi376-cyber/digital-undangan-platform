"use client";

import { useState, useEffect } from "react";
import type { RsvpEntry } from "@/types";
import { MessageSquareQuote, X } from "lucide-react";

interface FloatingWishesTickerProps {
  guestbook?: RsvpEntry[];
  groomNickname?: string;
  brideNickname?: string;
}

const DEFAULT_WISHES = [
  {
    nama_tamu: "Keluarga Besar",
    pesan: "Semoga menjadi keluarga sakinah, mawaddah, warahmah penuh keberkahan.",
  },
  {
    nama_tamu: "Sahabat Terdekat",
    pesan: "Selamat menempuh babak baru penuh cinta, tawa, dan kebahagiaan abadi!",
  },
  {
    nama_tamu: "Rekan & Kerabat",
    pesan: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir.",
  },
];

export function FloatingWishesTicker({
  guestbook = [],
  groomNickname,
  brideNickname,
}: FloatingWishesTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fadeState, setFadeState] = useState<"enter" | "exit">("enter");

  // Filter ucapan yang memiliki pesan nyata
  const validEntries = guestbook
    .filter((entry) => entry.pesan && entry.pesan.trim().length > 0)
    .map((entry) => ({
      nama_tamu: entry.nama_tamu || "Tamu Undangan",
      pesan: entry.pesan,
    }));

  const activeWishes = validEntries.length > 0 ? validEntries : DEFAULT_WISHES;
  const totalCount = validEntries.length > 0 ? validEntries.length : 12;

  // Rotasi otomatis setiap 6 detik
  useEffect(() => {
    if (isDismissed || isHovered || activeWishes.length <= 1) return;

    const interval = setInterval(() => {
      setFadeState("exit");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activeWishes.length);
        setFadeState("enter");
      }, 400);
    }, 6000);

    return () => clearInterval(interval);
  }, [isDismissed, isHovered, activeWishes.length]);

  if (isDismissed) return null;

  const currentWish = activeWishes[currentIndex] || activeWishes[0];

  const handleScrollToGuestbook = () => {
    const el = document.getElementById("guestbook") || document.querySelector("section:has(#guestbook)");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Doa & Ucapan Tamu Undangan"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-20 left-4 max-w-[calc(100vw-115px)] sm:bottom-6 sm:left-6 sm:max-w-sm z-30 transition-all duration-500 animate-fade-in select-none"
    >
      <div className="relative group bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)] rounded-2xl p-2.5 sm:p-3 flex items-start gap-2.5">
        {/* Clickable Area for Scrolling */}
        <div
          onClick={handleScrollToGuestbook}
          className="flex-1 cursor-pointer flex items-start gap-2.5 overflow-hidden text-left"
          title="Ketuk untuk melihat seluruh doa di buku tamu"
        >
          {/* Badge Icon */}
          <div className="w-7 h-7 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <MessageSquareQuote className="w-3.5 h-3.5" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header / Guest Count */}
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400">
                💌 {totalCount} Doa Restu
              </span>
              <span className="text-[9px] text-stone-400 truncate">
                {groomNickname && brideNickname ? `untuk ${groomNickname} & ${brideNickname}` : "Live Feed"}
              </span>
            </div>

            {/* Rotating Text Content */}
            <div
              className={`transition-all duration-400 ${
                fadeState === "enter"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1.5"
              }`}
            >
              <p className="text-xs font-semibold text-stone-800 dark:text-stone-100 truncate">
                {currentWish.nama_tamu}
              </p>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 line-clamp-1 italic font-serif">
                &ldquo;{currentWish.pesan}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          aria-label="Sembunyikan ucapan doa"
          className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 rounded-full transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
