"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music2, Disc } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BACKGROUND_MUSIC_URL } from "@/lib/constants";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Attempt autoplay on mount (might be blocked by browser)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0; // Start at 0
      
      const fadeAudioIn = setInterval(() => {
        if (audioRef.current) {
          if (audioRef.current.volume < 0.4) {
            audioRef.current.volume = Math.min(0.4, audioRef.current.volume + 0.05);
          } else {
            clearInterval(fadeAudioIn);
          }
        }
      }, 200);

      // Attempt play
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
          playPromise
            .then(() => {
                setIsPlaying(true);
            })
            .catch(error => {
                console.log("Autoplay blocked:", error);
                setIsPlaying(false); // UI shows muted state
            });
      }
      
      return () => clearInterval(fadeAudioIn);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={BACKGROUND_MUSIC_URL} loop />
      
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="cursor-pointer group relative w-16 h-16"
      >
        {/* Spinning Disc */}
        <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className={`w-full h-full rounded-full border-2 border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.4)] ${isPlaying ? 'opacity-100' : 'opacity-80'}`}
            style={{
                background: "conic-gradient(from 0deg, #18181b, #27272a, #18181b)",
            }}
        >
            {/* Center Label */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-zinc-900 flex items-center justify-center">
                    {/* Tiny Center Hole */}
                    <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
                </div>
            </div>
            
            {/* Grooves */}
            <div className="absolute inset-2 rounded-full border border-white/5 opacity-50" />
            <div className="absolute inset-4 rounded-full border border-white/5 opacity-50" />
        </motion.div>

        {/* Music Note Float */}
        <AnimatePresence>
            {isPlaying && (
                <motion.div
                    initial={{ opacity: 0, y: 0, x: 0 }}
                    animate={{ opacity: [0, 1, 0], y: -40, x: 20 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute -top-2 right-0 pointer-events-none"
                >
                    <Music2 className="w-4 h-4 text-pink-400" />
                </motion.div>
            )}
        </AnimatePresence>

        {/* Status Icon Overlay (Pause/Play) */}
        {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-[1px]">
                  <Disc className="w-6 h-6 text-white/80" />
            </div>
        )}
      </motion.div>
    </div>
  );
}
