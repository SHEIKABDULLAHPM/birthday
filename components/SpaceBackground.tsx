"use client";

import { useState } from "react";

const STAR_COUNT = 200;

const createStars = () =>
  Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random(),
      transform: `scale(${Math.random() * 0.5 + 0.5})`,
    },
  }));

export default function SpaceBackground() {
  const [stars] = useState<{ id: number; style: React.CSSProperties }[]>(createStars);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
          style={star.style}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
    </div>
  );
}
