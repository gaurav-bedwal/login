import React, { useState, useEffect } from 'react';
import { motion as motionFM, AnimatePresence as AnimatePresenceFM } from 'framer-motion';
import { Heart, Check, X } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

export const FinalEmotional: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Background slideshow photo URLs (pick 5 major memories)
  const slidePhotos = [
    loveConfig.memories[2].image, // First Date
    loveConfig.memories[5].image, // First Trip
    loveConfig.memories[7].image, // Birthday
    loveConfig.memories[11].image, // New Year
    loveConfig.memories[18].image  // Anniversary
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidePhotos.length);
    }, 6000); // Change slides every 6 seconds

    return () => clearInterval(timer);
  }, [slidePhotos.length]);

  return (
    <section id="final" className="relative w-full h-screen flex flex-col items-center justify-center bg-luxury-bg text-center select-none overflow-hidden">
      
      {/* Cinematic Slideshow Background (Ken Burns effect) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresenceFM mode="wait">
          <motionFM.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: 0.3, // Subtle opacity for readability
              scale: 1.15,
            }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 3.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-top filter brightness-[0.3] contrast-[1.05]"
            style={{ backgroundImage: `url(${slidePhotos[currentSlide]})` }}
          />
        </AnimatePresenceFM>
      </div>

      {/* Cinematic Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg via-transparent to-luxury-bg z-1 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, rgba(9, 5, 14, 0.95) 100%) z-1 pointer-events-none" />

      {/* Main Content */}
      <div className="z-10 px-4 flex flex-col items-center max-w-4xl">
        {/* Glowing Heart Ring */}
        <motionFM.div
          animate={{ 
            scale: [1, 1.15, 1],
            boxShadow: [
              '0 0 20px rgba(255,117,140,0.3)',
              '0 0 40px rgba(255,117,140,0.6)',
              '0 0 20px rgba(255,117,140,0.3)'
            ]
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="mb-8 p-4 bg-romantic-pink/15 text-romantic-pink rounded-full border border-romantic-pink/20"
        >
          <Heart fill="#ff758c" className="w-10 h-10" />
        </motionFM.div>

        {/* Section Heading */}
        <span className="text-white/50 text-xs md:text-sm uppercase tracking-[0.25em] font-semibold mb-4 block">
          One Last Thing
        </span>
        
        <h2 className="font-serif text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-white">
          <span className="text-gradient-rose-gold block md:inline">Thank You For Being</span>
          <span className="text-gradient-pink-lavender block md:inline md:ml-3">My Happiness</span>
        </h2>

        <p className="text-white/70 font-light max-w-lg mx-auto font-sans text-sm md:text-base mb-10 leading-relaxed">
          Every moment with you is etched in my soul. I'm looking forward to building a beautiful lifetime, filled with endless joy, adventures, and laughs.
        </p>

        {/* Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-5 bg-gradient-to-r from-romantic-pink to-romantic-lavender hover:from-romantic-pink hover:to-romantic-pink text-white font-medium rounded-full shadow-[0_5px_30px_rgba(255,117,140,0.5)] transform hover:scale-105 active:scale-95 transition-all text-sm tracking-widest uppercase font-semibold border border-white/10 glow-on-hover cursor-pointer"
        >
          Read My Promise
        </button>
      </div>

      {/* Promise Modal Overlay */}
      <AnimatePresenceFM>
        {isModalOpen && (
          <motionFM.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md overflow-y-auto"
          >
            <motionFM.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl glass-panel rounded-3xl p-5 sm:p-8 md:p-12 border border-white/10 relative shadow-[0_20px_50px_rgba(255,117,140,0.18)] my-auto"
            >
              {/* Back decoration glow */}
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-romantic-pink/10 blur-[40px] rounded-full pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Body */}
              <div className="flex flex-col items-center">
                {/* Header Badge */}
                <span className="text-romantic-pink text-[10px] uppercase tracking-widest font-bold mb-1 block">
                  To Deepika
                </span>
                
                <h3 className="font-serif text-3xl font-bold text-white mb-8">
                  My Promises To You
                </h3>

                <div className="w-12 h-[1px] bg-white/10 mb-8" />

                {/* Promises list */}
                <div className="space-y-5 text-left w-full">
                  {loveConfig.promises.map((promise, index) => (
                    <motionFM.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.2 }}
                      className="flex items-start gap-4"
                    >
                      <div className="p-1 bg-romantic-pink/15 text-romantic-pink rounded-full border border-romantic-pink/20 mt-1 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-white/80 font-sans text-sm md:text-base font-light leading-relaxed">
                        {promise}
                      </p>
                    </motionFM.div>
                  ))}
                </div>

                {/* Heart closure */}
                <div className="mt-10 flex flex-col items-center gap-1">
                  <div className="text-romantic-pink/40 text-[9px] uppercase tracking-[0.2em] font-semibold">
                    Forever & Always
                  </div>
                  <Heart fill="#ff758c" className="w-5 h-5 text-romantic-pink animate-pulse" />
                </div>
              </div>

            </motionFM.div>
          </motionFM.div>
        )}
      </AnimatePresenceFM>

    </section>
  );
};
