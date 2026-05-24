"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { DriveImage } from "@/components/ui/DriveImage";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string; // comma separated urls
  variant?: "elegant" | "rustic";
}

export function Gallery({ images, variant = "elegant" }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images) return null;
  const imageUrls = images.split(",").map((s) => s.trim()).filter(Boolean);
  if (imageUrls.length === 0) return null;

  const isRustic = variant === "rustic";

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 p-4 md:p-6 w-full max-w-4xl mx-auto">
        {imageUrls.map((url, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(url)}
            className={cn(
              "relative aspect-square md:aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group",
              isRustic ? "border-2 border-green-100/50" : "border-4 border-white",
              // Vary heights slightly for a masonry-lite look on CSS Grid
              i % 3 === 1 ? "md:mt-8" : "",
              i % 3 === 2 ? "md:-mt-4" : ""
            )}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
            
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
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/25 rounded-full text-white transition-all duration-300 z-50 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
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
