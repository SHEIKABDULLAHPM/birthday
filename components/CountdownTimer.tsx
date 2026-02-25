"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BIRTHDAY_DATE, WAITING_MESSAGE } from "@/lib/constants";

interface CountdownTimerProps {
  onComplete: () => void;
}

export default function CountdownTimer({ onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(BIRTHDAY_DATE) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
        onComplete();
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!timeLeft) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white z-40"
    >
      <div className="text-center space-y-8 p-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-light text-pink-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {WAITING_MESSAGE}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 w-24 md:w-32">
              <span className="text-4xl md:text-5xl font-bold tabular-nums">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-white/50 mt-2">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
