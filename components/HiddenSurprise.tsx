"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Lock } from "lucide-react";
import { SECRET_GALLERY } from "@/lib/constants";

export default function HiddenSurprise() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (!showPasswordInput && !isRevealed) {
      setShowPasswordInput(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "gundus") {
      setIsRevealed(true);
      setShowPasswordInput(false);
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#ffd1dc", "#e6e6fa", "#fdfd96", "#ff69b4", "#da70d6"],
        zIndex: 1000
      });
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center relative z-10 min-h-[50vh]">
      
      {/* Hidden Click Area */}
      {!isRevealed && !showPasswordInput && (
        <motion.div 
          className="cursor-pointer text-center group"
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.p
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/30 text-lg tracking-[0.3em] uppercase font-light select-none"
          >
            psst... click me
          </motion.p>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-4 text-white/20"
          >
            ↓
          </motion.div>
        </motion.div>
      )}

      {/* Password Input */}
      <AnimatePresence>
        {showPasswordInput && !isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-full bg-pink-500/20 border border-pink-500/30">
                <Lock className="w-8 h-8 text-pink-300" />
              </div>
            </div>
            <p className="text-pink-200 mb-4 text-lg">Enter the secret word 🤫</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className={`px-6 py-3 bg-white/5 border-2 rounded-xl text-center text-white text-xl placeholder:text-white/20 focus:outline-none transition-all ${
                  error ? "border-red-500 animate-shake" : "border-white/10 focus:border-pink-500/50"
                }`}
                autoFocus
              />
            </form>
            <style jsx>{`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
              }
              .animate-shake {
                animation: shake 0.2s ease-in-out 2;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed Letter */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: "spring", damping: 15, duration: 0.8 }}
            className="relative w-full max-w-md md:max-w-lg mx-auto p-6 sm:p-8 md:p-10 bg-gradient-to-br from-pink-950/80 to-purple-950/80 backdrop-blur-xl border border-pink-500/30 rounded-2xl md:rounded-3xl shadow-[0_0_60px_rgba(236,72,153,0.4)]"
          >
            {/* Decorative Heart */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-full shadow-lg">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            
            {/* Letter Content */}
            <div className="mt-4 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 text-center">
                Dear Best Friend 💖
              </h3>
              
              <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-3 font-light">
                <p>
                  You’re not just my friend — you’re my person. The one who knows my weird thoughts, my ugly laughs, and my deepest secrets.
                </p>
                <p>
                  Thank you for being my 3 AM call, my partner in crime, and my biggest cheerleader. Life would be so boring without you!
                </p>
                <p className="text-pink-300 font-medium">
                  Here’s to another year of us being absolutely chaotic together. 🎉
                </p>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-pink-400 font-semibold">With all my love,</p>
                <p className="text-2xl mt-2">❤️🥰💕</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-pink-200 uppercase tracking-[0.3em] text-xs">Secret Gallery</p>
                <span className="text-pink-400 text-sm">Swipe-worthy moments</span>
              </div>
              <div
                className="relative flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {SECRET_GALLERY.map((photo, index) => {
                  const isVideo = photo.src.toLowerCase().endsWith(".mp4");

                  return (
                    <motion.div
                      key={photo.src}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group relative flex-shrink-0 w-40 sm:w-48 md:w-56 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      <div className="relative h-32 sm:h-36">
                        {isVideo ? (
                          <video
                            controls
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 h-full w-full object-cover bg-black"
                          >
                            <source src={photo.src} type="video/mp4" />
                          </video>
                        ) : (
                          <Image
                            src={photo.src}
                            alt={photo.caption || "Secret memory"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 20vw"
                          />
                        )}
                        <div className={`absolute inset-0 ${isVideo ? "pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent"}`} />
                        {photo.caption && (
                          <p className={`absolute inset-x-3 bottom-3 text-white text-xs sm:text-sm font-semibold leading-tight drop-shadow-lg ${isVideo ? "bg-black/50 rounded-lg px-2 py-1 backdrop-blur-sm" : ""}`}>
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                <div className="flex-shrink-0 w-2" aria-hidden="true" />
              </div>
              <div className="flex justify-center mt-2 text-white/40 text-xs sm:hidden">
                <span className="tracking-[0.3em] uppercase">Swipe →</span>
              </div>
            </div>
            
            {/* Sparkles */}
            <div className="absolute top-4 right-4 text-2xl animate-pulse">✨</div>
            <div className="absolute bottom-4 left-4 text-2xl animate-pulse delay-300">✨</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
