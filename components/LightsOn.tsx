"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { BIRTHDAY_WISHES } from "@/lib/constants";

interface LightsOnProps {
  onComplete: () => void;
  onLightsOnStart?: () => void;
}

export default function LightsOn({ onComplete, onLightsOnStart }: LightsOnProps) {
  const [isLightsOn, setIsLightsOn] = useState(false);
  const [wishIndex, setWishIndex] = useState(0);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Handle completion outside of render cycle
  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  const handleLightsOn = () => {
    setIsLightsOn(true);
    if (onLightsOnStart) onLightsOnStart();
    // Show music prompt after light expands
    setTimeout(() => setShowMusicPrompt(true), 1500);
  };

  const handleStartMusic = useCallback(() => {
    if (hasStartedMusic) return;
    setHasStartedMusic(true);
    setShowMusicPrompt(false);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("birthday:play-music"));
    }

    // Reveal wishes shortly after music starts
    setTimeout(() => setShowWishes(true), 600);
  }, [hasStartedMusic]);

  const handleNextWish = useCallback(() => {
    if (wishIndex >= BIRTHDAY_WISHES.length - 1) {
      setIsComplete(true);
    } else {
      setWishIndex((prev) => prev + 1);
    }
  }, [wishIndex]);

  const currentWish = BIRTHDAY_WISHES[wishIndex] || "";

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-[2000ms] ${isLightsOn ? 'bg-gradient-to-b from-indigo-950 to-black' : 'bg-black'}`}>
      
      <AnimatePresence>
        {!isLightsOn && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            whileHover={{ scale: 1.1, textShadow: "0 0 8px rgb(255 255 255 / 0.8)" }}
            onClick={handleLightsOn}
            className="group flex flex-col items-center gap-4 cursor-pointer"
          >
            <div className="p-6 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(253,253,150,0.6)] transition-all duration-500">
              <Lightbulb className="w-12 h-12 text-gray-400 group-hover:text-yellow-200 transition-colors" />
            </div>
            <span className="text-xl text-gray-400 font-light tracking-widest group-hover:text-white transition-colors">
              Turn On the Light ✨
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Light Expansion Effect */}
      {isLightsOn && (
        <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-100/10 via-transparent to-transparent pointer-events-none"
        />
      )}

      {/* Music Prompt */}
      <AnimatePresence>
        {showMusicPrompt && !hasStartedMusic && (
          <motion.div
            key="music-prompt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm uppercase tracking-[0.4em] text-white/50"
            >
              Let the soundtrack begin
            </motion.div>
            <motion.button
              onClick={handleStartMusic}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236,72,153,0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-4 rounded-full border border-pink-400/60 bg-pink-500/20 text-white text-lg font-semibold tracking-wide backdrop-blur-md"
            >
              Turn on the Music 🎵
            </motion.button>
            <p className="text-white/50 text-xs uppercase tracking-[0.3em]">Tap to continue</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sequential Wishes */}
      <AnimatePresence mode="wait">
        {showWishes && currentWish && (
          <motion.div
            key={wishIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            onClick={handleNextWish}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 cursor-pointer text-center z-50"
          >
            <div className="max-w-4xl">
              {/* Array.from keeps emoji graphemes intact while animating */}
              {Array.from(currentWish).map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.05,
                    delay: index * 0.03 + 0.5,
                    ease: "easeOut",
                  }}
                  className="inline-block text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-indigo-200 leading-tight"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: currentWish.length * 0.03 + 1.5 }}
              className="absolute bottom-20 text-sm text-white/30 tracking-widest uppercase animate-pulse"
            >
              (Tap to continue)
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
