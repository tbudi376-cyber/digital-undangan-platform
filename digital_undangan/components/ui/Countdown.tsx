"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: string;
  variant?: "elegant" | "rustic";
}

export function Countdown({ targetDate, variant = "elegant" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!targetDate) return;
    
    // Set target to midnight of the target date
    const target = new Date(`${targetDate}T00:00:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ hari: 0, jam: 0, menit: 0, detik: 0 });
      } else {
        setTimeLeft({
          hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
          jam: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          menit: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          detik: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) return null;

  const isRustic = variant === "rustic";

  const timeUnits = [
    { label: "Hari", value: timeLeft.hari },
    { label: "Jam", value: timeLeft.jam },
    { label: "Menit", value: timeLeft.menit },
    { label: "Detik", value: timeLeft.detik },
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6 mt-12 mb-4 animate-fade-in-up">
      {timeUnits.map((unit) => (
        <div 
          key={unit.label}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl backdrop-blur-md shadow-sm border",
            isRustic 
              ? "bg-white/50 border-green-200/50 text-stone-700" 
              : "bg-white/60 border-rose-100/50 text-gray-800"
          )}
        >
          <span className="text-xl md:text-2xl font-semibold font-serif leading-none">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className={cn(
            "text-[10px] md:text-xs uppercase tracking-widest mt-1",
            isRustic ? "text-green-600/70" : "text-rose-400"
          )}>
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
