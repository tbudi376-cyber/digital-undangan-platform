'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  autoPlayTrigger?: boolean;
}

const emptySubscribe = () => () => {};

/**
 * Ekstrak Video ID dari berbagai format URL YouTube:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtu.be/VIDEO_ID?si=xxxxx
 * - https://www.youtube.com/embed/VIDEO_ID
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

export function AudioPlayer({ audioUrl, autoPlayTrigger }: AudioPlayerProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isPlaying, setIsPlaying] = useState(false);
  // YouTube iframe HANYA di-mount setelah klik pertama user
  const [showYT, setShowYT] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const isYouTube = audioUrl?.includes('youtube.com') || audioUrl?.includes('youtu.be');
  const videoId = isYouTube ? extractYouTubeId(audioUrl) : null;

  // Setup HTML5 Audio HANYA jika bukan YouTube
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

  // Handle external trigger (misal saat CoverScreen 'Buka Undangan' diklik)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
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
    }
  }, [autoPlayTrigger, isYouTube, videoId, isPlaying]);

  const togglePlay = useCallback(() => {
    if (isYouTube && videoId) {
      if (!showYT) {
        // Klik pertama: mount iframe dengan autoplay=1 (diizinkan browser
        // karena dipicu oleh user gesture / klik)
        setShowYT(true);
        setIsPlaying(true);
      } else if (iframeRef.current?.contentWindow) {
        // Klik berikutnya: kontrol via postMessage YouTube IFrame API
        if (isPlaying) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
            '*'
          );
          setIsPlaying(false);
        } else {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
            '*'
          );
          setIsPlaying(true);
        }
      }
    } else {
      // Handle MP3 / Google Drive audio
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.warn('Playback prevented:', error);
              setIsPlaying(false);
            });
        }
      }
    }
  }, [isYouTube, videoId, isPlaying, showYT]);

  if (!isMounted || !audioUrl) return null;

  return (
    <>
      {/* YouTube: iframe native, tanpa react-player, tanpa AbortError */}
      {isYouTube && showYT && videoId && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1`}
          allow="autoplay"
          className="absolute opacity-0 pointer-events-none w-[1px] h-[1px] overflow-hidden -z-50 top-0 left-0"
          title="Background Music"
        />
      )}

      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 transition-all duration-300 ${
          isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''
        }`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {/* Ikon Piringan Hitam (Vinyl) */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-800">
          <div className="absolute w-2 h-2 rounded-full bg-white" />
          <div className="w-8 h-8 rounded-full border border-gray-700/50" />
          <div className="absolute w-5 h-5 rounded-full border border-gray-700/50" />
        </div>
        {/* Ikon Not Balok */}
        {isPlaying && (
          <span className="absolute -top-2 -right-2 text-pink-500 text-xs animate-bounce">
            ♪
          </span>
        )}
      </button>
    </>
  );
}
