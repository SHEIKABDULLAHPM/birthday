"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TiltCard from "./TiltCard";
import { cn } from "@/lib/utils";

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
  });

  // Transform vertical scroll to horizontal scroll
  // Adjusted for smoother traversing. -80% usually covers the content width without overshooting too much on desktop.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  
  // Opacity fade in/out for the section header
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent"> 
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Dynamic Title */}
        <motion.div 
            style={{ opacity }}
            className="absolute top-8 left-6 md:top-12 md:left-12 z-30 pointer-events-none"
        >
             <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
                {title}
            </h3>
            <p className="text-white/60 text-sm md:text-lg mt-2 font-light tracking-widest uppercase ml-1">Scroll to explore</p>
        </motion.div>

        {/* Horizontal Moving Strip */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 pl-[5vw] items-center">
          {photos.map((photo, index) => (
            <PhotoCard key={index} photo={photo} index={index} onClick={() => onPhotoClick(photo)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PhotoCard({ photo, index, onClick }: { photo: Photo, index: number, onClick: () => void }) {
    return (
        <motion.div
            initial={{ scale: 1.5, opacity: 0 }} // Reduced scale to prevent clipping
            whileInView={{ 
                scale: 1, 
                opacity: 1,
                transition: { 
                    duration: 0.8, 
                    delay: index * 0.05, // Faster stagger
                    ease: "easeOut"
                }
            }}
            viewport={{ once: true, margin: "-10%" }}
            className="group relative h-[65vh] w-[85vw] md:w-[40vw] lg:w-[30vw] flex-shrink-0"
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
