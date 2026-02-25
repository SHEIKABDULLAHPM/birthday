"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { INSIDE_JOKES } from "@/lib/constants";

export default function InsideJokes() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-10">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Our Inside Jokes 🤭
        </h2>
        <p className="text-gray-400 mt-3 md:mt-4 text-sm md:text-base lg:text-lg">Tap to reveal the punchline!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
        {INSIDE_JOKES.map((joke, index) => (
          <JokeCard key={index} joke={joke} index={index} />
        ))}
      </div>
    </section>
  );
}

function JokeCard({ joke, index }: { joke: { setup: string, punchline: string }, index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      className="relative w-full h-52 sm:h-56 md:h-60 lg:h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div 
        className="relative w-full h-full transition-all duration-500"
        style={{ 
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 backdrop-blur-sm rounded-2xl border border-white/10 p-5 md:p-6 shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-3xl md:text-4xl mb-3 md:mb-4">🤔</span>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-pink-200 text-center leading-snug px-2">{joke.setup}</p>
          <div className="absolute bottom-3 md:bottom-4 flex items-center gap-2 text-[10px] md:text-xs text-white/30 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            Tap to reveal
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl p-5 md:p-6 shadow-xl"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <span className="text-3xl md:text-4xl mb-3 md:mb-4">😂</span>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center leading-snug px-2">{joke.punchline}</p>
        </div>
      </div>
    </motion.div>
  );
}
