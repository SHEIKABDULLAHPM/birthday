import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift } from "lucide-react";

export default function HiddenSurprise() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.7 },
      colors: ["#ffd1dc", "#e6e6fa", "#fdfd96"],
      zIndex: 1000
    });
  };

  return (
    <div className="py-32 flex flex-col items-center justify-center relative z-10 min-h-[50vh]">
      
      <div className="relative w-32 h-32 cursor-pointer group perspective-1000" onClick={handleReveal}>
        {/* Gift Box Container */}
        <motion.div
            animate={isRevealed ? { rotateY: 360, scale: 0 } : { rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${!isRevealed && "group-hover:scale-110"}`}
        >
             {/* Box Body */}
             <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-xl flex items-center justify-center transform translate-z-16">
                 <div className="w-full h-8 bg-yellow-300 absolute top-1/2 -translate-y-1/2 opacity-80" />
                 <div className="h-full w-8 bg-yellow-300 absolute left-1/2 -translate-x-1/2 opacity-80" />
             </div>
             
             {/* Box Lid */}
             <motion.div 
                className="absolute -top-4 -left-2 -right-2 h-8 bg-pink-600 rounded-sm shadow-lg flex items-center justify-center transform-style-3d origin-bottom"
                animate={isRevealed ? { rotateX: -120, opacity: 0 } : { rotateX: 0, opacity: 1 }}
             >
                <div className="w-8 h-full bg-yellow-300 opacity-90" />
             </motion.div>
             
             {/* Floating Icon Hint */}
             {!isRevealed && (
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest uppercase text-sm whitespace-nowrap"
                 >
                     Open Me
                 </motion.div>
             )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isRevealed && (
            <motion.div
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 12 }}
                className="absolute inset-x-4 md:inset-x-auto p-8 max-w-lg bg-black/60 backdrop-blur-xl border border-pink-500/30 rounded-3xl text-center shadow-[0_0_50px_rgba(236,72,153,0.3)]"
            >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full shadow-lg">
                    <Gift className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 mb-4 mt-4">
                    Surprise! 🎁
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                    "You are the most amazing person I know. Here's to another year of laughter, secrets, and unforgettable memories!"
                </p>
                <div className="mt-6 text-5xl animate-bounce">
                    👯‍♀️✨❤️
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
