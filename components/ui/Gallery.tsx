"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { DriveImage } from "@/components/ui/DriveImage";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string; // comma separated urls
  variant?: "elegant" | "rustic" | "minimalist" | "pastel" | "conservatory";
}

export function Gallery({ images, variant = "elegant" }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images) return null;
  const imageUrls = images.split(",").map((s) => s.trim()).filter(Boolean);
  if (imageUrls.length === 0) return null;

  const isRustic = variant === "rustic";
  const isMinimalist = variant === "minimalist";
  const isPastel = variant === "pastel";
  const isConservatory = variant === "conservatory";

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 w-full max-w-4xl mx-auto">
        {imageUrls.map((url, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(url)}
            className={cn(
              "relative aspect-square md:aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group",
              isPastel
                ? "border-2 border-purple-900/40"
                : isConservatory
                ? "border-2 border-emerald-700/30 shadow-[0_8px_25px_rgba(16,60,35,0.15)] rounded-2xl"
                : isRustic
                ? "border-2 border-[#2E4A3D]/20 shadow-[0_8px_25px_rgba(46,74,61,0.1)] rounded-2xl"
                : isMinimalist
                ? "border border-black/20 rounded-none shadow-none"
                : "border-2 border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(107,23,40,0.12)] rounded-2xl",
              i % 3 === 1 ? "md:mt-6" : "",
              i % 3 === 2 ? "md:-mt-3" : ""
            )}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 z-10" />

            <DriveImage
              url={url}
              alt={`Gallery Image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 z-50 hover:scale-110 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-7 h-7" />
          </button>

          <div className="relative w-full h-full max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <DriveImage
              url={selectedImage}
              alt="Enlarged Gallery Image"
              fill
              className="object-contain animate-fade-in-up"
            />
          </div>
        </div>
      )}
    </>
  );
}
