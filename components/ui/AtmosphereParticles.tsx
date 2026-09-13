"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export type AtmosphereTheme = "elegant" | "rustic" | "pastel" | "theme9" | "minimalist" | "conservatory";

interface AtmosphereParticlesProps {
  theme?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
  rotation?: number;
  rotationSpeed?: number;
  shape?: "circle" | "sparkle" | "leaf" | "square";
}

export function AtmosphereParticles({ theme = "elegant" }: AtmosphereParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  const normalizedTheme = (theme?.toLowerCase().trim() || "elegant") as AtmosphereTheme;

  // Cek prefers-reduced-motion saat mount
  useEffect(() => {
    queueMicrotask(() => {
      if (typeof window !== "undefined") {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const savedPref = localStorage.getItem("temu-waktu:particles");
        if (savedPref !== null) {
          setIsEnabled(savedPref === "true");
        } else if (mediaQuery.matches) {
          setIsEnabled(false);
        }
      }
    });
  }, []);

  const toggleParticles = useCallback(() => {
    setIsEnabled((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("temu-waktu:particles", String(next));
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const initParticles = () => {
      const count = Math.min(Math.floor(width / 35), 45); // Hemat baterai & ringan
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        let color = "rgba(212, 175, 55, 0.6)"; // Default Gold
        let shape: Particle["shape"] = "circle";
        let size = Math.random() * 3 + 1.5;
        let speedY = -(Math.random() * 0.4 + 0.15); // Drifts upward
        let speedX = (Math.random() - 0.5) * 0.3;

        if (normalizedTheme === "elegant") {
          // Gold champagne bokeh & sparkles
          color = Math.random() > 0.4 ? "rgba(212, 175, 55, 0.7)" : "rgba(243, 229, 171, 0.85)";
          shape = Math.random() > 0.6 ? "sparkle" : "circle";
          size = Math.random() * 3.5 + 1.2;
        } else if (normalizedTheme === "rustic") {
          // Drifting olive leaf & terracotta flakes
          const isTerracotta = Math.random() > 0.55;
          color = isTerracotta ? "rgba(166, 93, 70, 0.65)" : "rgba(46, 74, 61, 0.6)";
          shape = "leaf";
          size = Math.random() * 5 + 3;
          speedY = Math.random() * 0.5 + 0.2; // Falling downward gently
          speedX = (Math.random() - 0.5) * 0.6;
        } else if (normalizedTheme === "pastel" || normalizedTheme === "theme9") {
          // Violet starlight embers
          color = Math.random() > 0.5 ? "rgba(192, 132, 252, 0.75)" : "rgba(233, 213, 255, 0.85)";
          shape = Math.random() > 0.5 ? "sparkle" : "circle";
          size = Math.random() * 3 + 1.5;
        } else if (normalizedTheme === "minimalist") {
          // Swiss architectural dust & coordinate dots
          color = "rgba(100, 100, 100, 0.35)";
          shape = Math.random() > 0.6 ? "square" : "circle";
          size = Math.random() * 2 + 1;
        } else if (normalizedTheme === "conservatory") {
          // Whispering fireflies (bioluminescent green-gold)
          color = Math.random() > 0.3 ? "rgba(190, 242, 100, 0.85)" : "rgba(253, 224, 71, 0.9)";
          shape = "circle";
          size = Math.random() * 4 + 2;
          speedY = (Math.random() - 0.5) * 0.35;
          speedX = (Math.random() - 0.5) * 0.35;
        }

        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX,
          speedY,
          opacity: Math.random() * 0.7 + 0.3,
          baseOpacity: Math.random() * 0.5 + 0.3,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          color,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          shape,
        });
      }
      particlesRef.current = newParticles;
    };

    initParticles();

    const drawSparkle = (x: number, y: number, radius: number, alpha: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      // 4-point diamond sparkle
      ctx.moveTo(0, -radius * 1.6);
      ctx.quadraticCurveTo(0, 0, radius * 1.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, radius * 1.6);
      ctx.quadraticCurveTo(0, 0, -radius * 1.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, -radius * 1.6);
      ctx.fill();
      ctx.restore();
    };

    const drawLeaf = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      alpha: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.5, size * 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        p.pulsePhase += p.pulseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.25;
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
          p.rotation += p.rotationSpeed;
        }

        // Wrap boundaries
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const currentAlpha = Math.max(0.1, Math.min(1, p.opacity));

        if (p.shape === "sparkle") {
          drawSparkle(p.x, p.y, p.size, currentAlpha, p.color);
        } else if (p.shape === "leaf") {
          drawLeaf(p.x, p.y, p.size, p.rotation || 0, currentAlpha, p.color);
        } else if (p.shape === "square") {
          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.restore();
        } else {
          // Circle with soft radial glow
          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isEnabled, normalizedTheme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-700"
        style={{ opacity: isEnabled ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Floating Toggle Pill */}
      <button
        type="button"
        onClick={toggleParticles}
        title={isEnabled ? "Matikan Efek Suasana" : "Aktifkan Efek Suasana"}
        className="fixed top-4 right-4 z-40 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide flex items-center gap-1.5 transition-all duration-300 shadow-md backdrop-blur-md border bg-white/80 hover:bg-white/95 text-stone-700 border-stone-200/80 active:scale-95 select-none"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            isEnabled ? "bg-amber-500 animate-pulse" : "bg-stone-300"
          }`}
        />
        <span>{isEnabled ? "Atmosfer: ON" : "Atmosfer: OFF"}</span>
      </button>
    </>
  );
}
