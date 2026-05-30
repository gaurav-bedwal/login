import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import type { Memory } from '../config/loveConfig';

export const BentoGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const galleryMemories = loveConfig.memories.filter(m => m.category === 'gallery' || m.category === 'all');

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! + 1) % galleryMemories.length);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! - 1 + galleryMemories.length) % galleryMemories.length);
  };

  return (
    <section id="gallery" className="py-24 px-4 md:px-12 bg-luxury-bg relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-romantic-pink/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-romantic-lavender/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-romantic-pink text-xs uppercase tracking-[0.25em] font-semibold">Visual Love Journal</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-3 mb-4 text-gradient-pink-lavender">
            Our Bento Gallery
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto font-sans">
            Every picture tells a story, and every story with you is my absolute favorite. Click on any frame to unfold the memories.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-romantic-pink to-romantic-lavender mx-auto mt-6" />
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {galleryMemories.map((photo, index) => (
            <BentoCard
              key={photo.id}
              photo={photo}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Popup */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={showPrev}
              className="absolute left-4 md:left-8 z-50 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={showNext}
              className="absolute right-4 md:right-8 z-50 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Body */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.8)] my-auto"
            >
              {/* Image side */}
              <div className="md:w-3/5 relative bg-neutral-950 flex items-center justify-center min-h-[300px] max-h-[60vh] md:max-h-[80vh]">
                <img
                  src={galleryMemories[selectedPhotoIndex].image}
                  alt={galleryMemories[selectedPhotoIndex].title}
                  className="w-full h-full object-contain max-h-[60vh] md:max-h-[80vh]"
                />
              </div>

              {/* Text side */}
              <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-zinc-950/80">
                <span className="inline-flex items-center gap-2 text-romantic-pink/90 text-xs font-semibold uppercase tracking-wider mb-4 bg-romantic-pink/10 px-3 py-1 rounded-full border border-romantic-pink/20 w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  {galleryMemories[selectedPhotoIndex].date}
                </span>

                <h3 className="font-serif text-3xl font-bold mb-4 text-white drop-shadow-md">
                  {galleryMemories[selectedPhotoIndex].title}
                </h3>

                <div className="w-12 h-[1px] bg-romantic-pink/40 mb-6" />

                <p className="text-white/80 leading-relaxed font-sans text-base mb-6 font-light">
                  {galleryMemories[selectedPhotoIndex].description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-2 text-white/40 text-xs italic">
                  <MessageCircle className="w-4 h-4 text-romantic-lavender" />
                  A piece of our infinite adventure.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* Bento Card Component with 3D Tilt Effect */
interface BentoCardProps {
  photo: Memory;
  onClick: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ photo, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse coords relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = x / rect.width;
    const normalizedY = y / rect.height;
    
    // Tilt sensitivity angle (max 10 degrees)
    const maxTilt = 10;
    setTilt({
      x: normalizedY * -maxTilt, // rotate around X axis
      y: normalizedX * maxTilt,  // rotate around Y axis
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="break-inside-avoid relative overflow-hidden rounded-2xl glass-card-interactive group cursor-pointer"
    >
      {/* 3D Tilt container */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        className="relative w-full h-full"
      >
        {/* Photo layer */}
        <div className="overflow-hidden w-full h-full relative">
          <img
            src={photo.image}
            alt={photo.title}
            loading="lazy"
            className="w-full h-auto object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
        </div>

        {/* Hover-reveal Overlay Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[10px] text-romantic-pink font-semibold uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {photo.date}
          </span>
          <h4 className="font-serif text-lg md:text-xl font-bold text-white mb-1">
            {photo.title}
          </h4>
          <p className="text-xs text-white/70 line-clamp-2 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-100">
            {photo.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
