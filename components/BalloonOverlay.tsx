"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const BALLOON_COLORS = [
  "#ff6b6b", // Red
  "#ffd93d", // Yellow
  "#6bcb77", // Green
  "#4d96ff", // Blue
  "#ff6eb4", // Pink
  "#c44dff", // Purple
  "#ff8c42", // Orange
];

const BALLOON_COUNT = 20;

interface Balloon {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const createBalloons = () =>
  Array.from({ length: BALLOON_COUNT }, (_, i) => ({
    id: i,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 6 + Math.random() * 4,
    size: 0.8 + Math.random() * 0.5,
  }));

export default function BalloonOverlay() {
  const [balloons] = useState<Balloon[]>(createBalloons);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute bottom-[-150px]"
          style={{ left: `${balloon.left}%` }}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: -1200,
            opacity: [1, 1, 0.8, 0],
            x: [0, 15, -15, 10, -10, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "easeOut",
            x: {
              duration: balloon.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        >
          {/* Balloon SVG */}
          <svg
            width={60 * balloon.size}
            height={80 * balloon.size}
            viewBox="0 0 60 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Balloon body */}
            <ellipse
              cx="30"
              cy="28"
              rx="26"
              ry="28"
              fill={balloon.color}
            />
            {/* Shine/highlight */}
            <ellipse
              cx="20"
              cy="18"
              rx="8"
              ry="10"
              fill="white"
              fillOpacity="0.3"
            />
            {/* Knot */}
            <path
              d="M27 55 L30 58 L33 55 L30 52 Z"
              fill={balloon.color}
            />
            {/* String */}
            <path
              d="M30 58 Q32 65 28 72 Q34 78 30 85"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
