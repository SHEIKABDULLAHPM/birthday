"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { INSIDE_JOKES } from "@/lib/constants";
import TiltCard from "./TiltCard";

export default function InsideJokes() {
  return (
    <section className="py-20 px-4 w-full max-w-6xl mx-auto z-10 relative">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 inline-block w-full">
        Inside Jokes & Memories 😂
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4">
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
    <div 
      className="relative w-full h-64 md:h-80 cursor-pointer perspective-1000 group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <TiltCard className="w-full h-full relative preserve-3d rounded-2xl">
          <motion.div
            className="w-full h-full relative transition-all duration-500 transform-style-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 backface-hidden shadow-2xl">
              <span className="text-5xl mb-6 filter drop-shadow-lg">🤔</span>
              <p className="text-2xl md:text-3xl font-bold text-pink-200 text-center leading-tight">{joke.setup}</p>
              <div className="absolute bottom-6 flex items-center gap-2 text-sm text-white/40 font-medium tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                Tap to reveal
              </div>
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl p-8 backface-hidden shadow-2xl border border-white/20"
              style={{ transform: "rotateY(180deg)" }}
            >
              <span className="text-5xl mb-6 filter drop-shadow-lg">😂</span>
              <p className="text-2xl md:text-3xl font-black text-white text-center leading-tight drop-shadow-md">{joke.punchline}</p>
            </div>
          </motion.div>
      </TiltCard>
    </div>
  );
}
