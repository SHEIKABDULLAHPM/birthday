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
            <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] z-[-1] pointer-events-none mix-blend-overlay"></div>
            <SpaceBackground />


            {/* Content Container */}
            <div className="container mx-auto px-4 py-20 flex flex-col items-center space-y-32">
              
              {/* Header Section */}
              <section className="text-center space-y-8 relative pt-20 h-screen flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                   <h1 className="text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 pb-4 tracking-tight drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                     Happy Birthday!
                   </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-xl md:text-2xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed font-light"
                >
                  "Count your life by smiles, not tears. Count your age by friends, not years."
                </motion.p>
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 2, duration: 1 }}
                   className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400"
                >
                  Scroll Down ↓
                </motion.div>
              </section>

              {/* Memory Gallery (Vertical Timeline) */}
              <MemoryGallery />

              {/* Joke Section */}
              <InsideJokes />

              {/* Hidden Surprise */}
              <HiddenSurprise />

              {/* Final Explosion */}
              <BirthdayExplosion />

              {/* Footer */}
              <footer className="text-center pb-20 pt-10 text-gray-600 text-sm">
                 <p>Made with all my heart ❤️</p>
              </footer>

            </div>
        </motion.div>
      )}
    </main>
  );
}
