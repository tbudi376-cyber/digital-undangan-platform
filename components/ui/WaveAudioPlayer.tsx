"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface WaveAudioPlayerProps {
  audioUrl?: string;
  autoPlayTrigger?: boolean;
  trackTitle?: string;
  theme?: string;
}

const emptySubscribe = () => () => {};

/**
 * Ekstrak Video ID dari berbagai format URL YouTube
 */
function extractYouTubeId(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([^?&#]+)/);
  if (shortMatch) return shortMatch[1];

  const longMatch = url.match(/[?&]v=([^?&#]+)/);
  if (longMatch) return longMatch[1];

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&#]+)/);
  if (embedMatch) return embedMatch[1];

  return null;
}

export function WaveAudioPlayer({
  audioUrl,
  autoPlayTrigger,
  trackTitle = "Canon in D — Acoustic Cello",
  theme = "elegant",
}: WaveAudioPlayerProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showYT, setShowYT] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const isYouTube = Boolean(audioUrl?.includes("youtube.com") || audioUrl?.includes("youtu.be"));
  const videoId = isYouTube && audioUrl ? extractYouTubeId(audioUrl) : null;

  // Inisialisasi audio HTML5
  useEffect(() => {
    if (!isMounted || isYouTube || !audioUrl) return;

    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isMounted, isYouTube, audioUrl]);

  // Fungsi trigger play aman
  const startPlayback = useCallback(() => {
    if (isYouTube && videoId) {
      queueMicrotask(() => {
        setShowYT(true);
        setIsPlaying(true);
      });
    } else if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked by browser policy:", err);
        });
    }
  }, [isYouTube, videoId]);

  // Handle external trigger (props autoPlayTrigger)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      queueMicrotask(() => {
        startPlayback();
      });
    }
  }, [autoPlayTrigger, isPlaying, startPlayback]);

  // Handle custom window event saat CoverScreen dibuka
  useEffect(() => {
    const handleOpenCover = () => {
      startPlayback();
    };

    window.addEventListener("temu-waktu:open-cover", handleOpenCover);
    return () => {
      window.removeEventListener("temu-waktu:open-cover", handleOpenCover);
    };
  }, [startPlayback]);

  const togglePlay = useCallback(() => {
    if (isYouTube && videoId) {
      if (!showYT) {
        setShowYT(true);
        setIsPlaying(true);
      } else if (iframeRef.current?.contentWindow) {
        if (isPlaying) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "pauseVideo", args: "" }),
            "*"
          );
          setIsPlaying(false);
        } else {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "playVideo", args: "" }),
            "*"
          );
          setIsPlaying(true);
        }
      }
    } else {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.warn("Playback prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [isYouTube, videoId, isPlaying, showYT]);

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isYouTube && videoId && iframeRef.current?.contentWindow) {
        if (!isMuted) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "mute", args: "" }),
            "*"
          );
          setIsMuted(true);
        } else {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "unMute", args: "" }),
            "*"
          );
          setIsMuted(false);
        }
      } else if (audioRef.current) {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    },
    [isMuted, isYouTube, videoId]
  );

  if (!isMounted || !audioUrl) return null;

  // Warna equalizer bar & accent pill sesuai tema
  const isRustic = theme === "rustic";
  const isPastel = theme === "pastel" || theme === "theme9";
  const isMinimalist = theme === "minimalist";
  const isConservatory = theme === "conservatory";

  const barColor = isRustic
    ? "bg-amber-400"
    : isPastel
    ? "bg-purple-300"
    : isMinimalist
    ? "bg-white"
    : isConservatory
    ? "bg-emerald-400"
    : "bg-[#D4AF37]"; // Gold Elegant

  return (
    <>
      {/* YouTube hidden player iframe */}
      {isYouTube && showYT && videoId && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1`}
          allow="autoplay"
          className="absolute opacity-0 pointer-events-none w-[1px] h-[1px] overflow-hidden -z-50 top-0 left-0"
          title="Background Wedding Melody"
        />
      )}

      {/* Floating Audio Equalizer Pill */}
      <div
        className="fixed bottom-6 right-6 z-40 flex items-center shadow-2xl transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        role="region"
        aria-label="Pemutar Audio Musik Pernikahan"
      >
        <div
          onClick={togglePlay}
          className="cursor-pointer group flex items-center gap-3 px-3.5 py-2 rounded-full backdrop-blur-xl border bg-stone-950/85 text-white border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
        >
          {/* Animated 4-Bar Equalizer */}
          <div
            className="flex items-end gap-[3px] h-4 w-4 justify-center"
            title={isPlaying ? "Musik Berputar" : "Musik Dijeda"}
          >
            <span
              className={`w-[2.5px] rounded-full transition-all duration-300 ${barColor} ${
                isPlaying ? "animate-[equalizer1_1s_ease-in-out_infinite]" : "h-1"
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full transition-all duration-300 ${barColor} ${
                isPlaying ? "animate-[equalizer2_0.8s_ease-in-out_infinite]" : "h-2"
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full transition-all duration-300 ${barColor} ${
                isPlaying ? "animate-[equalizer3_1.2s_ease-in-out_infinite]" : "h-1.5"
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full transition-all duration-300 ${barColor} ${
                isPlaying ? "animate-[equalizer4_0.9s_ease-in-out_infinite]" : "h-1"
              }`}
            />
          </div>

          {/* Marquee Track Title */}
          <div className="hidden sm:flex flex-col max-w-[130px] md:max-w-[170px] overflow-hidden">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-medium">
              {isPlaying ? "Memutar Suasana" : "Suasana Dijeda"}
            </span>
            <span className="text-xs font-serif font-medium truncate text-stone-100 group-hover:text-amber-200 transition-colors">
              {trackTitle}
            </span>
          </div>

          {/* Play/Pause Action Indicator */}
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-stone-200 group-hover:bg-white/20 transition-colors">
            {isPlaying ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3 h-3 fill-current ml-0.5" />
            )}
          </div>

          {/* Quick Mute Button */}
          {isPlaying && (
            <button
              type="button"
              onClick={toggleMute}
              title={isMuted ? "Bunyikan Suara" : "Bisukan Suara"}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
