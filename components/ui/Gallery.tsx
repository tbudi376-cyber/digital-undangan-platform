"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { DriveImage } from "@/components/ui/DriveImage";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string; // comma separated urls
  variant?: "elegant" | "rustic" | "minimalist" | "pastel" | "conservatory";
}

export function Gallery({ images, variant = "elegant" }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const imageUrls = (images || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const isRustic = variant === "rustic";
  const isMinimalist = variant === "minimalist";
  const isPastel = variant === "pastel";
  const isConservatory = variant === "conservatory";

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : imageUrls.length - 1) : null
    );
  }, [imageUrls.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev < imageUrls.length - 1 ? prev + 1 : 0) : null
    );
  }, [imageUrls.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  if (!images || imageUrls.length === 0) return null;

  const selectedImage = selectedIndex !== null ? imageUrls[selectedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 w-full max-w-4xl mx-auto">
        {imageUrls.map((url, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Buka foto momen pernikahan ${i + 1} dari ${imageUrls.length}`}
            onClick={() => setSelectedIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedIndex(i);
              }
            }}
            className={cn(
              "relative aspect-square md:aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isPastel
                ? "border-2 border-purple-900/40 focus-visible:ring-purple-400"
                : isConservatory
                ? "border-2 border-emerald-700/30 shadow-[0_8px_25px_rgba(16,60,35,0.15)] rounded-2xl focus-visible:ring-emerald-400"
                : isRustic
                ? "border-2 border-[#2E4A3D]/20 shadow-[0_8px_25px_rgba(46,74,61,0.1)] rounded-2xl focus-visible:ring-[#2E4A3D]"
                : isMinimalist
                ? "border border-black/20 rounded-none shadow-none focus-visible:ring-black"
                : "border-2 border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(107,23,40,0.12)] rounded-2xl focus-visible:ring-[#D4AF37]",
              i % 3 === 1 ? "md:mt-6" : "",
              i % 3 === 2 ? "md:-mt-3" : ""
            )}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 z-10" />

            <DriveImage
              url={url}
              alt={`Foto momen pernikahan ${i + 1} dari ${imageUrls.length}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 animate-fade-in"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan Foto Penuh"
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Tutup Galeri (Esc)"
            className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 z-50 hover:scale-110 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev button */}
          {imageUrls.length > 1 && (
            <button
              type="button"
              aria-label="Foto Sebelumnya (Panah Kiri)"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 z-50 hover:scale-110 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {imageUrls.length > 1 && (
            <button
              type="button"
              aria-label="Foto Selanjutnya (Panah Kanan)"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 z-50 hover:scale-110 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Photo container */}
          <div
            className="relative w-full h-full max-w-4xl max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <DriveImage
              url={selectedImage}
              alt={`Foto momen pernikahan ${selectedIndex + 1} dari ${imageUrls.length}`}
              fill
              className="object-contain animate-fade-in-up"
            />
          </div>

          {/* Counter pill */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-serif tracking-widest uppercase border border-white/15">
            {selectedIndex + 1} / {imageUrls.length}
          </div>
        </div>
      )}
    </>
  );
}
