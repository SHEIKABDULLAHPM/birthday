"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEMORY_CATEGORIES, SORTED_MEMORY_PHOTOS } from "@/lib/constants";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; caption: string } | null>(null);

  return (
    <section className="relative z-10 w-full bg-black">
      {/* Header */}
      <div className="text-center py-12 md:py-16 lg:py-20 px-4">
         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-lg">
          Our Journey Together 📸
        </h2>
        <p className="mt-3 md:mt-4 lg:mt-6 text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide">Swipe or scroll to explore our memories...</p>
      </div>
      
      {/* Categories - Horizontal Scroll */}
      <div className="w-full space-y-12 md:space-y-16 pb-16 md:pb-20">
        {MEMORY_CATEGORIES.map((category) => (
          <HorizontalGalleryCategory
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
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center drop-shadow-md">{selectedPhoto.caption}</p>
              </div>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface HorizontalGalleryCategoryProps {
  title: string;
  photos: Array<{ src: string; caption: string }>;
  onPhotoClick: (photo: { src: string; caption: string }) => void;
}

function HorizontalGalleryCategory({ title, photos, onPhotoClick }: HorizontalGalleryCategoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-4 md:mb-6 px-4 sm:px-6 lg:px-8 flex items-end justify-between"
      >
        <div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
            {title}
          </h3>
          <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mt-2 rounded-full" />
        </div>
        
        {/* Navigation Arrows - Hidden on Mobile */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory scroll-smooth"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {photos.map((photo, photoIndex) => (
          <HorizontalPhotoCard
            key={photoIndex}
            photo={photo}
            index={photoIndex}
            onClick={() => onPhotoClick(photo)}
          />
        ))}
        {/* End spacer for proper padding */}
        <div className="w-1 sm:w-2 lg:w-4 flex-shrink-0" aria-hidden="true" />
      </div>

      {/* Scroll indicator hint */}
      <div className="flex justify-center mt-3 sm:hidden">
        <div className="flex gap-1 items-center text-white/30 text-xs">
          <ChevronLeft className="w-3 h-3" />
          <span>Swipe</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

interface HorizontalPhotoCardProps {
  photo: { src: string; caption: string };
  index: number;
  onClick: () => void;
}

function HorizontalPhotoCard({ photo, index, onClick }: HorizontalPhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 0.25),
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-10px" }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] xl:w-[22vw] aspect-[4/5] cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-zinc-900 border border-white/5 shadow-lg hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 snap-start"
    >
      <Image
        src={photo.src}
        alt={photo.caption}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 28vw"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      
      {/* Caption - Always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <p className="text-white text-base sm:text-lg md:text-xl font-bold leading-tight drop-shadow-lg">
          {photo.caption}
        </p>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-1 ring-white/10 group-hover:ring-pink-500/40 transition-all duration-300" />
    </motion.div>
  );
}
