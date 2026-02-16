"use client";

import { useState } from "react";
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
  const [showWishes, setShowWishes] = useState(false);

  const handleLightsOn = () => {
    setIsLightsOn(true);
    if (onLightsOnStart) onLightsOnStart();
    // Start showing wishes after a brief delay for light expansion
    setTimeout(() => setShowWishes(true), 1500);
  };

  const handleNextWish = () => {
    // Prevent race conditions with rapid clicks
    setWishIndex((prev) => {
      if (prev >= BIRTHDAY_WISHES.length - 1) {
        onComplete();
        return prev;
      }
      return prev + 1;
    });
  };

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
                  {currentWish.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.05, 
                        delay: index * 0.03 + 0.5, // Start typing after fade-in
                        ease: "easeOut"
                      }}
                      className="inline-block text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-indigo-200 leading-tight"
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
