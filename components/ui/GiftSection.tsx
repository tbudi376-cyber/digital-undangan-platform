"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DriveImage } from "@/components/ui/DriveImage";
import { Copy, Check } from "lucide-react";

interface GiftSectionProps {
  bankName: string;
  bankAccount: string;
  accountOwner: string;
  qrisImage?: string;
  variant?: "elegant" | "rustic";
}

export function GiftSection({
  bankName,
  bankAccount,
  accountOwner,
  qrisImage,
  variant = "elegant",
}: GiftSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bankAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRustic = variant === "rustic";

  if (!bankName && !bankAccount && !qrisImage) return null;

  return (
    <div className={cn(
      "w-full max-w-md mx-auto p-6 md:p-8 rounded-3xl border backdrop-blur-sm mt-8 text-center animate-fade-in-up",
      isRustic ? "bg-white/50 border-green-200/40" : "bg-white/60 border-rose-200/40"
    )}>
      <h3 className={cn(
        "text-lg font-serif font-semibold mb-6",
        isRustic ? "text-stone-700" : "text-gray-800"
      )}>
        Transfer Bank
      </h3>
      
      {bankName && bankAccount && (
        <div className={cn(
          "p-5 rounded-2xl border mb-6 transition-all duration-300",
          isRustic ? "bg-white/60 border-green-100 hover:border-green-200" : "bg-white/70 border-rose-100 hover:border-rose-200"
        )}>
          <p className={cn("text-sm font-semibold mb-1 uppercase tracking-wider", isRustic ? "text-green-700" : "text-rose-600")}>
            {bankName}
          </p>
          <p className={cn("text-2xl tracking-widest font-mono font-medium mb-2", isRustic ? "text-stone-800" : "text-gray-800")}>
            {bankAccount}
          </p>
          <p className={cn("text-sm mb-5", isRustic ? "text-stone-500" : "text-gray-500")}>
            a.n. {accountOwner}
          </p>
          
          <button
            onClick={handleCopy}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95",
              copied 
                ? "bg-green-500 text-white shadow-lg shadow-green-500/25" 
                : isRustic 
                  ? "bg-green-100 text-green-700 hover:bg-green-200" 
                  : "bg-rose-100 text-rose-600 hover:bg-rose-200"
            )}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Berhasil Disalin!" : "Salin Rekening"}
          </button>
        </div>
      )}

      {qrisImage && (
        <>
          {bankName && bankAccount && (
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={cn("h-px flex-1", isRustic ? "bg-green-200/50" : "bg-rose-200/50")} />
              <span className={cn("text-xs font-semibold tracking-widest", isRustic ? "text-stone-400" : "text-gray-400")}>ATAU</span>
              <div className={cn("h-px flex-1", isRustic ? "bg-green-200/50" : "bg-rose-200/50")} />
            </div>
          )}
          
          <h3 className={cn(
            "text-lg font-serif font-semibold mb-4",
            isRustic ? "text-stone-700" : "text-gray-800"
          )}>
            QRIS
          </h3>
          
          <div className="relative w-56 h-56 mx-auto p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            <DriveImage
              url={qrisImage}
              alt="QRIS Code"
              fill
              className="object-contain p-3"
            />
          </div>
        </>
      )}
    </div>
  );
}
