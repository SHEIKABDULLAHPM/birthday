"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BALLOON_COLORS = ["#ffd1dc", "#e6e6fa", "#fdfd96", "#ffb7b2", "#b5ead7"];

export default function BalloonOverlay() {
  const [balloons, setBalloons] = useState<number[]>([]);

  useEffect(() => {
    // Generate a fixed number of balloons
    const balloonCount = 15;
    const newBalloons = Array.from({ length: balloonCount }, (_, i) => i);
    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {balloons.map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-100px] w-16 h-20 rounded-t-full rounded-b-full shadow-lg"
          style={{
            backgroundColor: BALLOON_COLORS[i % BALLOON_COLORS.length],
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: 0, opacity: 0.8 }}
          animate={{
            y: -1000,
            opacity: 0,
            x: [0, Math.random() * 50 - 25, 0], // Swaying motion
          }}
          transition={{
            duration: Math.random() * 5 + 5, // Random speed (5-10s)
            delay: Math.random() * 2, // Random start delay
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {/* Balloon string */}
          <div className="absolute top-full left-1/2 w-[1px] h-16 bg-white/30 origin-top transform -translate-x-1/2" />
        </motion.div>
      ))}
    </div>
  );
}
