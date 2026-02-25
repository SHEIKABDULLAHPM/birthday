"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TiltCard from "./TiltCard";

interface Photo {
  src: string;
  caption: string;
}

interface HorizontalScrollCategoryProps {
  title: string;
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export default function HorizontalScrollCategory({ title, photos, onPhotoClick }: HorizontalScrollCategoryProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Calculate scroll distance to ensure all photos are visible
  // Each photo is ~30vw wide on desktop with gaps
  const scrollDistance = Math.max(0, (photos.length - 2) * 32);
  const x = useTransform(scrollYProgress, [0.15, 0.85], ["0%", `-${scrollDistance}%`]);
  
  // Opacity fade in/out for the section header
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);

  // Section height - controls how much vertical scroll maps to horizontal movement
  const sectionHeight = Math.max(120, 80 + photos.length * 8);

  return (
    <section ref={targetRef} className="relative bg-transparent" style={{ height: `${sectionHeight}vh` }}> 
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Dynamic Title */}
        <motion.div 
            style={{ opacity }}
            className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-8 lg:left-12 z-30 pointer-events-none max-w-[180px] sm:max-w-[220px] md:max-w-none"
        >
             <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 leading-tight">
                {title}
            </h3>
            <p className="text-white/50 text-[10px] sm:text-xs md:text-sm lg:text-base mt-1 md:mt-2 font-light tracking-widest uppercase">Scroll to explore</p>
        </motion.div>

        {/* Horizontal Moving Strip */}
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 pl-[40vw] md:pl-[30vw] pr-[20vw] items-center">
          {photos.map((photo, index) => (
            <PhotoCard key={index} photo={photo} index={index} onClick={() => onPhotoClick(photo)} />
          ))}
          {/* Spacer to ensure last photo is fully visible */}
          <div className="w-[10vw] flex-shrink-0" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}

function PhotoCard({ photo, index, onClick }: { photo: Photo, index: number, onClick: () => void }) {
    return (
        <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ 
                scale: 1, 
                opacity: 1,
                transition: { 
                    duration: 0.6, 
                    delay: Math.min(index * 0.03, 0.3),
                    ease: "easeOut"
                }
            }}
            viewport={{ once: true, margin: "-5%" }}
            className="group relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] w-[70vw] sm:w-[60vw] md:w-[40vw] lg:w-[32vw] xl:w-[28vw] flex-shrink-0"
        >
            <TiltCard 
                className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-zinc-900"
                onClick={onClick}
            >
                <div className="relative w-full h-full">
                    <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 90vw, 40vw"
                    />
                     {/* Cinematic Frame / Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none" />
                    
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg leading-tight">{photo.caption}</p>
                        <div className="w-12 h-1 bg-pink-500 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    )
}
