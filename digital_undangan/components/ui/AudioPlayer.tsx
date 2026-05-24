"use client";

import { useState, useEffect, useRef } from "react";
import { Disc, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Convert Google Drive view link to direct download link for streaming
  const streamUrl = (() => {
    if (!audioUrl) return "";
    if (audioUrl.includes("drive.google.com/file/d/")) {
      const match = audioUrl.match(/\/d\/([^/]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
      }
    }
    return audioUrl;
  })();

  useEffect(() => {
    if (!streamUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(streamUrl);
      audioRef.current.loop = true;
    }

    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Autoplay blocked by browser. User interaction required.", err);
            setIsPlaying(false);
          });
      }
    };

    // Attempt to play immediately (usually blocked unless previous interactions)
    attemptPlay();

    // Attach interaction events to trigger play if autoplay was blocked
    const handleInteraction = () => {
      if (!isPlaying) {
        attemptPlay();
      }
      // Clean up listeners after first user interaction
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("scroll", handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("scroll", handleInteraction);
    };
  }, [streamUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  if (!streamUrl) return null;

  return (
    <button
      onClick={togglePlay}
      className={cn(
        "fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-3 md:p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-lg border border-white/40 transition-all duration-300 hover:scale-110 active:scale-95",
        isPlaying ? "bg-white/40" : "bg-white/80",
        "animate-fade-in-up"
      )}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      <Disc 
        className={cn(
          "w-6 h-6 md:w-8 md:h-8 transition-colors duration-300",
          isPlaying ? "animate-spin text-rose-500" : "text-stone-500"
        )}
        style={isPlaying ? { animationDuration: "3s" } : undefined}
      />
      
      {/* Decorative musical notes that only appear when playing */}
      {isPlaying && (
        <div className="absolute -top-2 -right-2 text-rose-400 animate-pulse">
          <Music className="w-3 h-3" />
        </div>
      )}
    </button>
  );
}
