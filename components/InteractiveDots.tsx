"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function InteractiveDots() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      confetti({
        particleCount: 15,
        spread: 40,
        origin: { x, y },
        colors: ["#ffd1dc", "#e6e6fa", "#fdfd96"], // Pastel colors
        disableForReducedMotion: true,
        zIndex: 9999,
        scalar: 0.8,
        shapes: ["circle"],
        ticks: 100,
      });
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return null; // This component handles global side effects, no visible DOM structure needed itself
}
