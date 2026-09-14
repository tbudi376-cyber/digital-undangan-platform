"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DriveImage } from "@/components/ui/DriveImage";
import { Copy, Check, Gift, CreditCard, Package } from "lucide-react";

interface GiftSectionProps {
  bankName?: string;
  bankAccount?: string;
  accountOwner?: string;
  qrisImage?: string;
  physicalGiftAddress?: string;
  physicalGiftRecipient?: string;
  physicalGiftPhone?: string;
  variant?: "elegant" | "rustic" | "minimalist" | "pastel" | "conservatory";
}

export function GiftSection({
  bankName,
  bankAccount,
  accountOwner,
  qrisImage,
  physicalGiftAddress,
  physicalGiftRecipient,
  physicalGiftPhone,
  variant = "elegant",
}: GiftSectionProps) {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyBank = () => {
    if (!bankAccount) return;
    navigator.clipboard.writeText(bankAccount);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleCopyAddress = () => {
    if (!physicalGiftAddress) return;
    const fullText = `${physicalGiftAddress}\nPenerima: ${physicalGiftRecipient || ""}${
      physicalGiftPhone ? ` (${physicalGiftPhone})` : ""
    }`.trim();
    navigator.clipboard.writeText(fullText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const isRustic = variant === "rustic";
  const isMinimalist = variant === "minimalist";
  const isPastel = variant === "pastel";
  const isConservatory = variant === "conservatory";
  const isElegant = variant === "elegant" || (!isPastel && !isRustic && !isMinimalist && !isConservatory);

  const hasBank = Boolean(bankName && bankAccount);
  const hasQris = Boolean(qrisImage);
  const hasPhysical = Boolean(physicalGiftAddress);

  if (!hasBank && !hasQris && !hasPhysical) return null;

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto p-6 md:p-8 transition-all animate-fade-in-up text-center",
        isPastel
          ? "bg-[#15102a]/80 border border-purple-900/40 text-slate-100 rounded-3xl backdrop-blur-sm"
          : isConservatory
          ? "bg-[#0D2818]/80 border border-emerald-700/30 text-[#F9F8F4] rounded-3xl backdrop-blur-sm"
          : isRustic
          ? "bg-[#F8F5EE] border-2 border-[#2E4A3D]/20 border-dashed rounded-3xl text-stone-800 shadow-[0_10px_30px_rgba(46,74,61,0.06)]"
          : isMinimalist
          ? "bg-white border border-black/10 rounded-none text-black p-6 sm:p-8"
          : "bg-[#FDFBF7] border border-[#D4AF37]/40 rounded-3xl text-[#3A0A13] shadow-[0_12px_40px_rgba(107,23,40,0.08)]"
      )}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Gift
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
            "text-xl font-bold tracking-tight",
            isMinimalist ? "font-mono uppercase tracking-[0.2em] text-sm" : isConservatory ? "font-serif text-[#A8E6CF]" : isRustic ? "font-serif text-[#2E4A3D]" : "font-serif text-[#6B1728]"
          )}
        >
          Tanda Kasih
        </h3>
      </div>

      <p
        className={cn(
          "text-xs md:text-sm mb-8 leading-relaxed max-w-xs mx-auto",
          isPastel
            ? "text-slate-300"
            : isConservatory
            ? "text-emerald-200/70 font-serif"
            : isRustic
            ? "text-stone-600 font-serif"
            : isMinimalist
            ? "text-zinc-500 font-sans"
            : "text-stone-600 font-serif"
        )}
      >
        Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih,
        Anda dapat menyampaikannya melalui:
      </p>

      {/* ── 1. Transfer Bank ──────────────────────────────────────── */}
      {hasBank && (
        <div
          className={cn(
            "p-6 rounded-2xl mb-6 transition-all duration-300 relative overflow-hidden text-left",
            isPastel
              ? "bg-gradient-to-br from-[#1e173a] to-[#2a1d52] border border-purple-700/50 shadow-lg text-slate-100"
              : isConservatory
              ? "bg-gradient-to-br from-[#0A1F14] via-[#0D2818] to-[#071510] border border-emerald-600/40 shadow-lg text-[#F9F8F4]"
              : isRustic
              ? "bg-[#FAF7F0] border border-[#2E4A3D]/25 shadow-sm text-stone-800"
              : isMinimalist
              ? "bg-zinc-50 border border-black/10 rounded-none text-black"
              : "bg-gradient-to-br from-[#2A0910] via-[#450F1B] to-[#1A050A] border border-[#D4AF37]/50 shadow-[0_12px_35px_rgba(107,23,40,0.3)] text-[#FDFBF7]"
          )}
        >
          {/* Elegant Metallic Gold Foil Card Elements */}
          {isElegant && (
            <div className="flex items-center justify-between mb-4">
              {/* EMV Gold Chip SVG Graphic */}
              <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-[#C5A059] via-[#F3E5AB] to-[#AA7C11] p-1 shadow-inner relative flex flex-col justify-between border border-[#D4AF37]/80">
                <div className="h-px bg-[#6B1728]/40 w-full" />
                <div className="h-px bg-[#6B1728]/40 w-full" />
                <div className="absolute inset-y-0 left-1/3 w-px bg-[#6B1728]/40" />
                <div className="absolute inset-y-0 right-1/3 w-px bg-[#6B1728]/40" />
              </div>
              <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#D4AF37]">
                Digital Envelope
              </span>
            </div>
          )}

          {isPastel && (
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-300">
                Digital Card
              </span>
              <CreditCard className="w-5 h-5 text-purple-300 opacity-70" />
            </div>
          )}

          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wider mb-1",
              isPastel
                ? "text-purple-200"
                : isConservatory
                ? "text-emerald-400/80 font-serif"
                : isRustic
                ? "text-[#A65D46] font-serif"
                : isMinimalist
                ? "text-zinc-500 font-mono text-[10px] tracking-widest"
                : "text-[#D4AF37] font-medium tracking-widest"
            )}
          >
            {bankName}
          </p>

          <p
            className={cn(
              "text-2xl tracking-widest font-mono font-medium mb-1",
              isPastel ? "text-white" : isConservatory ? "text-[#A8E6CF]" : isRustic ? "text-[#2E4A3D]" : isMinimalist ? "text-black tracking-normal" : "text-[#FDFBF7] drop-shadow-sm"
            )}
          >
            {bankAccount}
          </p>

          <p
            className={cn(
              "text-xs mb-5",
              isPastel
                ? "text-purple-200/80"
                : isConservatory
                ? "text-emerald-300/60"
                : isRustic
                ? "text-stone-500"
                : isMinimalist
                ? "text-zinc-500 font-mono text-[11px]"
                : "text-amber-100/70"
            )}
          >
            a.n. {accountOwner}
          </p>

          <button
            onClick={handleCopyBank}
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer shadow-sm",
              copiedBank
                ? "bg-emerald-600 text-white"
                : isPastel
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : isConservatory
                ? "bg-emerald-600 text-[#F9F8F4] hover:bg-emerald-500 font-medium tracking-wider shadow-md"
                : isRustic
                ? "bg-[#2E4A3D] text-[#F8F5EE] hover:bg-[#243B30]"
                : isMinimalist
                ? "bg-black hover:bg-zinc-800 text-white rounded-none font-mono uppercase tracking-wider"
                : "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#450F1B] hover:brightness-105 font-medium tracking-wider shadow-md"
            )}
          >
            {copiedBank ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedBank ? "Berhasil Disalin!" : "Salin No. Rekening"}
          </button>
        </div>
      )}

      {/* ── 2. QRIS Code ──────────────────────────────────────────── */}
      {hasQris && (
        <div className="mb-8">
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-widest mb-3",
              isPastel ? "text-purple-300" : isConservatory ? "text-emerald-400/80 font-serif" : isRustic ? "text-[#2E4A3D] font-serif" : isMinimalist ? "text-zinc-600 font-mono text-[10px]" : "text-[#851C32]"
            )}
          >
            QRIS Pembayaran
          </p>
          <div
            className={cn(
              "relative w-52 h-52 mx-auto p-3 bg-white rounded-2xl shadow-sm border",
              isMinimalist ? "border-black/15 rounded-none" : "border-stone-200"
            )}
          >
            <DriveImage url={qrisImage!} alt="QRIS Code" fill className="object-contain p-2" />
          </div>
        </div>
      )}

      {/* ── 3. Kado Fisik ─────────────────────────────────────────── */}
      {hasPhysical && (
        <div
          className={cn(
            "p-5 rounded-2xl border text-left transition-all duration-300",
            isPastel
              ? "bg-[#1d1637] border-purple-800/40 text-slate-200"
              : isConservatory
              ? "bg-[#0D2818] border-emerald-700/30 text-[#F9F8F4]"
              : isRustic
              ? "bg-[#FAF7F0] border border-[#2E4A3D]/20 text-stone-800"
              : isMinimalist
              ? "bg-zinc-50 border border-black/10 rounded-none text-black"
              : "bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#450F1B]"
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <Package
              className={cn(
                "w-4 h-4",
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
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
                isMinimalist && "font-mono text-[10px]"
              )}
            >
              Kirim Kado Fisik
            </span>
          </div>

          <p className="text-sm font-medium leading-relaxed mb-2">{physicalGiftAddress}</p>

          {(physicalGiftRecipient || physicalGiftPhone) && (
            <p
              className={cn(
                "text-xs mb-4",
                isPastel
                  ? "text-slate-400"
                  : isRustic
                  ? "text-stone-500"
                  : isMinimalist
                  ? "text-zinc-500 font-mono text-[11px]"
                  : "text-stone-500"
              )}
            >
              Penerima: <strong className="font-semibold">{physicalGiftRecipient}</strong>
              {physicalGiftPhone ? ` (${physicalGiftPhone})` : ""}
            </p>
          )}

          <button
            onClick={handleCopyAddress}
            type="button"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer",
              copiedAddress
                ? "bg-emerald-600 text-white"
                : isPastel
                ? "bg-purple-900/60 hover:bg-purple-900 text-purple-200 border border-purple-700/50"
                : isConservatory
                ? "bg-emerald-800/40 text-emerald-200 hover:bg-emerald-800/60 border border-emerald-600/40"
                : isRustic
                ? "bg-[#2E4A3D]/10 text-[#2E4A3D] hover:bg-[#2E4A3D]/20 border border-[#2E4A3D]/30"
                : isMinimalist
                ? "bg-black text-white hover:bg-zinc-800 rounded-none font-mono uppercase tracking-wider"
                : "bg-[#AA7C11]/15 text-[#6B1728] hover:bg-[#AA7C11]/25 border border-[#D4AF37]/50"
            )}
          >
            {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedAddress ? "Alamat Disalin!" : "Salin Alamat Pengiriman"}
          </button>
        </div>
      )}
    </div>
  );
}
