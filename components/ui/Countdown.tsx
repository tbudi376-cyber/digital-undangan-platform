"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: string;
  variant?: "elegant" | "rustic" | "minimalist" | "pastel" | "conservatory";
}

const emptySubscribe = () => () => {};

function calculateRemainingTime(targetDate: string) {
  if (!targetDate) return { hari: 0, jam: 0, menit: 0, detik: 0 };
  const targetStr = targetDate.includes("T") ? targetDate : `${targetDate}T08:00:00`;
  const target = new Date(targetStr).getTime();
  if (isNaN(target)) return { hari: 0, jam: 0, menit: 0, detik: 0 };
  const now = new Date().getTime();
  const difference = target - now;
  if (difference <= 0) return { hari: 0, jam: 0, menit: 0, detik: 0 };
  return {
    hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
    jam: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    menit: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    detik: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

export function Countdown({ targetDate, variant = "elegant" }: CountdownProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [timeLeft, setTimeLeft] = useState(() => calculateRemainingTime(targetDate));

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      setTimeLeft(calculateRemainingTime(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) return null;

  const isRustic = variant === "rustic";
  const isMinimalist = variant === "minimalist";
  const isPastel = variant === "pastel";
  const isConservatory = variant === "conservatory";
  const isElegant = variant === "elegant" || (!isPastel && !isRustic && !isMinimalist && !isConservatory);

  const timeUnits = [
    { label: "Hari", value: timeLeft.hari },
    { label: "Jam", value: timeLeft.jam },
    { label: "Menit", value: timeLeft.menit },
    { label: "Detik", value: timeLeft.detik },
  ];

  if (isMinimalist) {
    return (
      <div className="my-10 animate-fade-in-up">
        <div className="grid grid-cols-4 border-y border-black/15 divide-x divide-black/15 max-w-lg mx-auto bg-zinc-50/50">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="py-4 px-2 sm:px-4 text-center">
              <span className="block font-mono text-2xl sm:text-3xl font-bold tracking-tight text-black">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="block text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-400 mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isPastel) {
    return (
      <div
        className="relative w-full max-w-sm mx-auto my-8 py-2 px-3 select-none animate-fade-in-up"
        aria-label="Hitung mundur pernikahan"
      >
        <div className="absolute inset-0 bg-purple-600/10 blur-2xl rounded-full pointer-events-none" />

        <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full backdrop-blur-xl bg-purple-950/70 border border-purple-400/40 shadow-[0_8px_32px_rgba(168,85,247,0.25)] transition-transform hover:scale-105 -translate-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white leading-none">
              {String(timeLeft.hari).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200 mt-1">
              Hari
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-18 h-18 sm:w-22 sm:h-22 rounded-full backdrop-blur-xl bg-[#1d1238]/80 border border-purple-400/35 shadow-[0_6px_24px_rgba(147,51,234,0.2)] transition-transform hover:scale-105 translate-y-1">
            <span className="font-serif text-xl sm:text-2xl font-bold text-purple-100 leading-none">
              {String(timeLeft.jam).padStart(2, "0")}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-purple-300 mt-1">
              Jam
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-18 h-18 sm:w-22 sm:h-22 rounded-full backdrop-blur-xl bg-[#221542]/80 border border-purple-400/35 shadow-[0_6px_24px_rgba(192,132,252,0.2)] transition-transform hover:scale-105 -translate-y-2">
            <span className="font-serif text-xl sm:text-2xl font-bold text-purple-100 leading-none">
              {String(timeLeft.menit).padStart(2, "0")}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-purple-300 mt-1">
              Menit
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full backdrop-blur-xl bg-purple-900/50 border border-purple-300/40 shadow-[0_4px_16px_rgba(192,132,252,0.3)] transition-transform hover:scale-105 translate-y-2">
            <span className="font-serif text-lg sm:text-xl font-bold text-purple-200 leading-none">
              {String(timeLeft.detik).padStart(2, "0")}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-purple-300 mt-1">
              Detik
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-6 my-8 animate-fade-in-up">
      {timeUnits.map((unit) => (
        <div
          key={unit.label}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-18 sm:w-20 sm:h-22 rounded-2xl transition-all shadow-sm",
            isPastel
              ? "bg-[#1d1637]/80 border border-purple-800/50 text-white backdrop-blur-md"
              : isConservatory
              ? "bg-[#0F3321]/80 border border-emerald-700/40 shadow-[0_4px_16px_rgba(16,60,35,0.15)] text-[#F9F8F4] backdrop-blur-md"
              : isRustic
              ? "bg-[#F8F5EE] border border-[#2E4A3D]/25 shadow-[0_4px_16px_rgba(46,74,61,0.08)] text-stone-800"
              : isElegant
              ? "bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-[0_6px_20px_rgba(107,23,40,0.06)] text-[#50101E]"
              : "bg-white/70 border border-rose-100/60 text-gray-800"
          )}
        >
          <span
            className={cn(
              "text-2xl sm:text-3xl font-bold leading-none",
              isConservatory ? "font-serif text-[#A8E6CF]" : isRustic ? "font-serif text-[#2E4A3D]" : isElegant ? "font-serif text-[#6B1728]" : "font-serif"
            )}
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "text-[9px] sm:text-[10px] uppercase tracking-widest mt-1.5 font-medium",
              isPastel
                ? "text-purple-300"
                : isConservatory
                ? "text-emerald-400/80"
                : isRustic
                ? "text-[#A65D46]"
                : isElegant
                ? "text-[#AA7C11]"
                : "text-rose-400"
            )}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
