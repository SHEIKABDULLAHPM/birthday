"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";
import { PASSWORD } from "@/lib/constants";

interface PasswordScreenProps {
  onUnlock: () => void;
}

export default function PasswordScreen({ onUnlock }: PasswordScreenProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase() === PASSWORD.toLowerCase()) {
      setUnlocked(true);
      setTimeout(onUnlock, 1500); // Wait for unlock animation
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {!unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white p-4"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md space-y-8 text-center"
          >
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur-lg">
                <Lock className="w-8 h-8 text-pink-300" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-pink-100 sm:text-4xl">
              Who is this for?
            </h1>
            
            <form onSubmit={handleSubmit} className="relative mt-8">
              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter the magic word..."
                className={cn(
                  "w-full px-6 py-4 text-center bg-white/5 border-2 rounded-2xl text-xl placeholder:text-white/20 focus:outline-none transition-all duration-300",
                  error 
                    ? "border-red-500/50 shake-animation" 
                    : "border-white/10 focus:border-pink-500/50 focus:bg-white/10"
                )}
                autoFocus
              />
              <style jsx>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  25% { transform: translateX(-5px); }
                  75% { transform: translateX(5px); }
                }
                .shake-animation {
                  animation: shake 0.2s ease-in-out 2;
                }
              `}</style>
            </form>
          </motion.div>
        </motion.div>
      )}
      
      {unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-pink-500 pointer-events-none"
        >
          <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: [0, 1.2, 1] }}
             transition={{ duration: 0.5 }}
          >
            <Unlock className="w-24 h-24 text-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
