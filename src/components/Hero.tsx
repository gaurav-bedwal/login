import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  // Motion values for smooth 3D parallax effect on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for dampening movement
  const bgX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const bgY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const contentX = useSpring(mouseX, { stiffness: 90, damping: 25 });
  const contentY = useSpring(mouseY, { stiffness: 90, damping: 25 });

  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; top: number; left: number; delay: number; scale: number }>>([]);

  useEffect(() => {
    // Track mouse move for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Map mouse position to range [-0.5, 0.5]
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;

      // Move background opposite to mouse, move content with mouse
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate floating hearts specifically around the title area
    const hearts = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      // Focus them in a boundary around the middle of the screen
      top: 35 + Math.random() * 20, // 35% to 55%
      left: 30 + Math.random() * 40, // 30% to 70%
      delay: Math.random() * 4,
      scale: Math.random() * 0.6 + 0.4
    }));
    setFloatingHearts(hearts);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Interpolate motion values to pixels using useTransform
  const bgTransformX = useTransform(bgX, (x) => x * -45);
  const bgTransformY = useTransform(bgY, (y) => y * -45);
  const contentTransformX = useTransform(contentX, (x) => x * 25);
  const contentTransformY = useTransform(contentY, (y) => y * 25);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-luxury-bg select-none">
      {/* Background Image Layer (Parallax) */}
      <motion.div
        style={{
          x: bgTransformX,
          y: bgTransformY,
          backgroundImage: `url(${loveConfig.memories[0].image})`, // Pull first image as default
          scale: 1.15,
        }}
        className="absolute inset-0 bg-cover bg-top filter brightness-[0.35] contrast-[1.05]"
      />

      {/* Blur Overlay & Vignette for Cinematic Feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-luxury-bg/50 opacity-90" />
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, rgba(9, 5, 14, 0.8) 100%) pointer-events-none" />
      <div className="cinematic-blur-overlay pointer-events-none" />

      {/* Floating Hearts Around Center (Desktop Only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0.1, y: 10 }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              y: [0, -40, 0],
              scale: [heart.scale, heart.scale * 1.3, heart.scale],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'easeInOut',
            }}
            className="absolute text-romantic-pink/45"
            style={{
              top: `${heart.top}%`,
              left: `${heart.left}%`,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main Glassmorphic Title Card */}
      <motion.div
        style={{
          x: contentTransformX,
          y: contentTransformY,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="z-10 w-[90%] max-w-3xl glass-panel rounded-3xl p-8 md:p-16 text-center border border-white/10 flex flex-col items-center"
      >
        {/* Heart Icon top indicator */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mb-4 text-romantic-pink/80 bg-romantic-pink/10 p-3 rounded-full border border-romantic-pink/20"
        >
          <Heart fill="#ff758c" className="w-6 h-6 animate-pulse" />
        </motion.div>

        {/* Small subtitle */}
        <span className="text-white/60 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase block mb-4">
          {loveConfig.tagline}
        </span>

        {/* Animated Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-none relative">
          <span className="text-gradient-rose-gold drop-shadow-[0_0_20px_rgba(255,117,140,0.35)]">
            {loveConfig.girlfriendName}
          </span>
          <span className="inline-block animate-pulse text-romantic-pink ml-2">❤️</span>
        </h1>

        {/* Short description */}
        <p className="text-white/80 font-light text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-sans">
          "{loveConfig.heroSubheading}"
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => onScrollToSection('gallery')}
            className="px-8 py-4 bg-gradient-to-r from-romantic-pink to-romantic-lavender hover:from-romantic-pink hover:to-romantic-pink text-white font-medium rounded-full shadow-[0_4px_20px_rgba(255,117,140,0.4)] hover:shadow-[0_4px_30px_rgba(255,117,140,0.6)] transform hover:-translate-y-0.5 transition-all glow-on-hover text-sm tracking-widest uppercase font-semibold border border-white/10"
          >
            Our Memories
          </button>
          
          <button
            onClick={() => onScrollToSection('love-letter')}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white hover:text-romantic-pink font-medium rounded-full border border-white/15 hover:border-romantic-pink/40 backdrop-blur-sm transform hover:-translate-y-0.5 transition-all text-sm tracking-widest uppercase font-semibold"
          >
            Love Letter
          </button>
        </div>
      </motion.div>

      {/* Down Arrow / Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        onClick={() => onScrollToSection('gallery')}
        className="absolute bottom-8 cursor-pointer text-white/40 hover:text-romantic-pink transition-colors z-10 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-light">Scroll Down</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};
