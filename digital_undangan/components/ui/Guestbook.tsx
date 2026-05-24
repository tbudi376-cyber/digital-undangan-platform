"use client";

import type { RsvpEntry } from "@/types";
import { cn } from "@/lib/utils";
import { MessageSquareHeart } from "lucide-react";

interface GuestbookProps {
  rsvps: RsvpEntry[];
  variant?: "elegant" | "rustic";
}

export function Guestbook({ rsvps, variant = "elegant" }: GuestbookProps) {
  if (!rsvps || rsvps.length === 0) return null;

  const isRustic = variant === "rustic";

  return (
    <div className={cn(
      "w-full max-w-lg mx-auto p-6 md:p-8 rounded-3xl border shadow-sm backdrop-blur-sm mt-16 text-left animate-fade-in-up",
      isRustic ? "bg-white/50 border-green-200/40" : "bg-white/60 border-rose-100/50"
    )}>
      <div className="flex items-center gap-3 mb-6">
        <MessageSquareHeart className={cn("w-6 h-6", isRustic ? "text-green-600" : "text-rose-400")} />
        <h3 className={cn(
          "text-xl font-serif font-semibold",
          isRustic ? "text-stone-700" : "text-gray-800"
        )}>
          Ucapan & Doa ({rsvps.length})
        </h3>
      </div>
      
      {/* Scrollable Container */}
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {rsvps.map((entry, idx) => {
          const initial = entry.nama_tamu ? entry.nama_tamu.charAt(0).toUpperCase() : "?";
          
          return (
            <div 
              key={idx}
              className={cn(
                "p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                isRustic ? "bg-white/80 border-green-50" : "bg-white/90 border-rose-50"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-inner",
                    isRustic ? "bg-green-600/80" : "bg-gradient-to-br from-rose-400 to-pink-400"
                  )}>
                    {initial}
                  </div>
                  <div>
                    <p className={cn("text-sm font-semibold", isRustic ? "text-stone-800" : "text-gray-800")}>
                      {entry.nama_tamu}
                    </p>
                    <p className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-1",
                      entry.kehadiran === "Hadir" 
                        ? isRustic ? "bg-green-100 text-green-700" : "bg-rose-50 text-rose-600"
                        : "bg-gray-100 text-gray-500"
                    )}>
                      {entry.kehadiran}
                    </p>
                  </div>
                </div>
                
                {entry.timestamp && (
                  <p className="text-[10px] text-gray-400">
                    {new Date(entry.timestamp).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>
                )}
              </div>
              
              <div className={cn(
                "mt-3 text-sm italic border-l-2 pl-3 py-1",
                isRustic ? "text-stone-600 border-green-200/50" : "text-gray-600 border-rose-200/50"
              )}>
                "{entry.pesan}"
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
