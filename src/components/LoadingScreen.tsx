import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingTexts = [
  "Our Story",
  "My Favorite Person",
  "Forever Begins Here"
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; scale: number; speed: number }>>([]);

  // Generate background heart particles
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random horizontal position
      delay: Math.random() * 5, // random delay up to 5s
      scale: Math.random() * 0.8 + 0.4, // random scale
      speed: Math.random() * 4 + 4 // random float speed in seconds
    }));
    setParticles(generated);
  }, []);

  // Animate counter and cycle texts
  useEffect(() => {
    // Text cycling interval (every 1.5s)
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1600);

    // Progress counter
    const duration = 3000; // 3 seconds loading
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          // Wait 300ms at 100% then trigger fadeout
          setTimeout(() => {
            setIsFadingOut(true);
            // Finish fade out transition then invoke completion
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-luxury-bg bg-gradient-radial-luxury select-none overflow-hidden"
        >
          {/* Floating Heart Particles in Background */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute text-romantic-pink text-opacity-50 select-none pointer-events-none"
                style={{
                  left: `${p.left}%`,
                  bottom: `-5%`,
                  transform: `scale(${p.scale})`,
                  animation: `float-particle ${p.speed}s linear infinite`,
                  animationDelay: `${p.delay}s`,
                }}
              >
                ❤️
              </div>
            ))}
          </div>

          {/* Central Container */}
          <div className="text-center z-10 flex flex-col items-center">
            {/* Cycling Text */}
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={textIndex}
                  initial={{ y: 20, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="font-serif text-3xl md:text-5xl text-gradient-rose-gold font-light tracking-wide italic"
                >
                  {loadingTexts[textIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Glowing separator */}
            <div className="w-24 h-[1px] my-6 bg-gradient-to-r from-transparent via-romantic-pink to-transparent shadow-[0_0_8px_rgba(255,117,140,0.6)]" />

            {/* Percentage counter */}
            <div className="relative font-sans text-5xl md:text-7xl font-extralight tracking-widest text-white/90">
              {String(Math.floor(progress)).padStart(3, '0')}
              <span className="text-xs md:text-sm text-romantic-pink font-normal absolute -top-1 -right-6">
                %
              </span>
            </div>
            
            <p className="text-white/40 text-[10px] uppercase tracking-[0.25em] mt-4">
              Loading our universe
            </p>
          </div>

          {/* Bottom styling */}
          <div className="absolute bottom-10 text-white/20 text-xs tracking-widest font-light">
            GAURAV ❤️ DEEPIKA
          </div>

          {/* CSS for custom float particle */}
          <style>{`
            @keyframes float-particle {
              0% {
                transform: translateY(0) scale(0.5);
                opacity: 0;
              }
              10% {
                opacity: 0.6;
              }
              90% {
                opacity: 0.4;
              }
              100% {
                transform: translateY(-110vh) rotate(360deg) scale(1.1);
                opacity: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
