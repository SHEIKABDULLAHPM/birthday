"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function BirthdayExplosion() {
  const [exploded, setExploded] = useState(false);

  const triggerExplosion = () => {
    setExploded(true);
    
    // Multiple confetti bursts
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section className="py-20 text-center relative z-20 overflow-hidden">
      {!exploded ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerExplosion}
          className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-xl shadow-lg hover:shadow-pink-500/50 transition-all"
        >
          <span className="relative z-10">Make a Wish! 🕯️</span>
          <div className="absolute inset-0 rounded-full bg-white/20 blur-md group-hover:blur-xl transition-all" />
        </motion.button>
      ) : (
        <motion.div
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: "spring", bounce: 0.5 }}
           className="space-y-6"
        >
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-pink-500 to-purple-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
            HAPPY BIRTHDAY!
          </h2>
          <p className="text-2xl text-pink-200">
            May all your dreams come true! ❤️
          </p>
          <div className="flex justify-center gap-4 text-4xl animate-bounce pt-8">
            🎉 🎂 🎁 🎈
          </div>
        </motion.div>
      )}
    </section>
  );
}
