"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PasswordScreen from "@/components/PasswordScreen";
import CountdownTimer from "@/components/CountdownTimer";
import LightsOn from "@/components/LightsOn"; 
import BalloonOverlay from "@/components/BalloonOverlay";
import InteractiveDots from "@/components/InteractiveDots";
import MemoryGallery from "@/components/MemoryGallery"; 
import InsideJokes from "@/components/InsideJokes";
import MusicPlayer from "@/components/MusicPlayer";
import HiddenSurprise from "@/components/HiddenSurprise";
import BirthdayExplosion from "@/components/BirthdayExplosion"; // New Component
import SpaceBackground from "@/components/SpaceBackground";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [isLightsOnComplete, setIsLightsOnComplete] = useState(false); 
  const [showBalloons, setShowBalloons] = useState(false);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden relative text-white font-sans selection:bg-pink-500/30">
      
      {/* Global Interactive Elements */}
      <InteractiveDots />
      <MusicPlayer />
      
      {/* Balloon Layer (Triggered on Lights On) */}
      <AnimatePresence>
        {showBalloons && <BalloonOverlay />}
      </AnimatePresence>

      {/* 1. Password Protection Layer */}
      <AnimatePresence>
        {!isAuthenticated && (
          <PasswordScreen onUnlock={() => setIsAuthenticated(true)} />
        )}
      </AnimatePresence>

      {/* 2. Countdown Layer */}
      <AnimatePresence>
        {isAuthenticated && !isCountdownComplete && (
          <CountdownTimer onComplete={() => setIsCountdownComplete(true)} />
        )}
      </AnimatePresence>

      {/* 3. Lights On Interaction Layer */}
      <AnimatePresence>
        {isAuthenticated && isCountdownComplete && !isLightsOnComplete && (
           <LightsOn 
             onComplete={() => setIsLightsOnComplete(true)} 
             onLightsOnStart={() => setShowBalloons(true)}
           />
        )}
      </AnimatePresence>

      {/* 4. Main Celebration Content (Revealed after Lights On) */}
      {isAuthenticated && isCountdownComplete && isLightsOnComplete && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 2 }}
           className="relative z-10 w-full"
        >
            {/* Background Atmosphere */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-zinc-900 to-black z-[-1]" />
            {/* Noise texture removed - using gradient only for better compatibility */}
            <SpaceBackground />


            {/* Hero Section */}
            <div className="w-full px-4 sm:px-6 md:px-8">
              <section className="text-center space-y-6 md:space-y-8 relative min-h-screen flex flex-col justify-center items-center py-20">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                   <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 pb-2 md:pb-4 tracking-tight drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                     Happy Birthday!
                   </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-200/80 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-light"
                >
                  &ldquo;Count your life by smiles, not tears. Count your age by friends, not years.&rdquo;
                </motion.p>
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 2, duration: 1 }}
                   className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 text-sm md:text-base"
                >
                  Scroll Down ↓
                </motion.div>
              </section>
            </div>

            {/* Memory Gallery - Full Width for horizontal scroll */}
            <MemoryGallery />

            {/* Content Container for remaining sections */}
            <div className="w-full flex flex-col items-center">
              {/* Joke Section */}
              <div className="w-full py-16 md:py-24">
                <InsideJokes />
              </div>

              {/* Hidden Surprise */}
              <div className="w-full py-16 md:py-24">
                <HiddenSurprise />
              </div>

              {/* Final Explosion */}
              <div className="w-full py-16 md:py-24">
                <BirthdayExplosion />
              </div>

              {/* Footer */}
              <footer className="w-full text-center py-12 md:py-16 border-t border-white/5">
                <p className="text-gray-500 text-sm md:text-base tracking-wide">Made with all my heart ❤️</p>
                <p className="text-gray-600 text-xs mt-2">© {new Date().getFullYear()}</p>
              </footer>
            </div>
        </motion.div>
      )}
    </main>
  );
}
