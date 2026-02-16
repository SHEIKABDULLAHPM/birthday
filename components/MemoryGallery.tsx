"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEMORY_CATEGORIES, SORTED_MEMORY_PHOTOS } from "@/lib/constants";
import Image from "next/image"; // Kept for Lightbox
import HorizontalScrollCategory from "./HorizontalScrollCategory";
import { X } from "lucide-react";

export default function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string } | null>(null);

  return (
    <section className="relative z-10 w-full bg-black">
      {/* Header */}
      <div className="text-center py-20 px-4">
         <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 inline-block drop-shadow-lg">
          Our Journey Together 📸
        </h2>
        <p className="mt-6 text-gray-400 text-xl font-light tracking-wide">Scroll down to explore the timeline...</p>
      </div>
      
      {/* Categories Layered */}
      <div className="w-full">
        {MEMORY_CATEGORIES.map((category) => (
          <HorizontalScrollCategory
            key={category}
            title={category}
            photos={SORTED_MEMORY_PHOTOS[category]}
            onPhotoClick={setSelectedPhoto}
          />
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              layoutId={`photo-${selectedPhoto.src}`}
              className="relative max-w-5xl max-h-[90vh] w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <p className="text-white text-2xl md:text-3xl font-bold text-center drop-shadow-md">{selectedPhoto.caption}</p>
              </div>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
