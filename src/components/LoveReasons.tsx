import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smile, Heart, Shield, Sparkles, Music, Ghost, Brain, CloudSun, 
  Flame, HandHeart, Hourglass, Coffee, Palette, Sun, Feather, 
  Crown, Moon, Laugh, Gem, Infinity as InfinityIcon, X, CheckCircle 
} from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import type { LoveReason } from '../config/loveConfig';

// Map string icon names to Lucide components
const iconMap: Record<string, React.ComponentType<any>> = {
  Smile,
  Heart,
  Shield,
  Sparkles,
  Music,
  Ghost,
  Brain,
  CloudSun,
  Flame,
  HandHeart,
  Hourglass,
  Coffee,
  Palette,
  Sun,
  Feather,
  Crown,
  Moon,
  Laugh,
  Gem,
  Infinity: InfinityIcon
};

export const LoveReasons: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<LoveReason | null>(null);

  const handleOpenDetail = (reason: LoveReason) => {
    setSelectedReason(reason);
  };

  const handleCloseDetail = () => {
    setSelectedReason(null);
  };

  return (
    <section id="reasons" className="py-24 px-4 md:px-12 bg-zinc-950/70 relative">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-romantic-pink/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-romantic-lavender/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-romantic-pink text-xs uppercase tracking-[0.25em] font-semibold">20 Reasons Why</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-3 mb-4 text-gradient-pink-lavender">
            Reasons I Love You
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto font-sans">
            A small list of infinite things about you that make my heart skip a beat. Hover to peek, click to read the full message.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-romantic-pink to-romantic-lavender mx-auto mt-6" />
        </div>

        {/* 20 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {loveConfig.reasons.map((reason, index) => {
            const IconComponent = iconMap[reason.iconName] || Heart;

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.08 }}
                onClick={() => handleOpenDetail(reason)}
                className="h-[190px] sm:h-[250px] w-full cursor-pointer perspective-1000 group select-none"
              >
                {/* Flippable Card Container */}
                <div className="relative w-full h-full duration-700 preserve-3d group-hover:rotate-y-180 ease-out">
                  
                  {/* Card Front (Default State) */}
                  <div className="absolute inset-0 backface-hidden glass-panel rounded-2xl p-3 sm:p-6 flex flex-col items-center justify-center text-center border border-white/5 hover:border-romantic-pink/30 shadow-lg">
                    {/* Glowing card border helper */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-romantic-pink/0 to-romantic-pink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <div className="p-2.5 sm:p-4 bg-romantic-pink/5 group-hover:bg-romantic-pink/15 rounded-full border border-romantic-pink/15 group-hover:border-romantic-pink/30 text-romantic-pink transition-all duration-300 transform group-hover:scale-115 mb-3 sm:mb-5">
                      <IconComponent className="w-5 h-5 sm:w-8 h-8" />
                    </div>

                    <span className="text-white/40 text-[8px] sm:text-[10px] tracking-[0.2em] font-semibold uppercase mb-1">
                      Reason #{String(reason.id).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-xs sm:text-base md:text-lg font-bold text-white leading-snug group-hover:text-romantic-pink transition-colors">
                      {reason.title}
                    </h3>
                  </div>

                  {/* Card Back (Hover State) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-3 sm:p-6 flex flex-col items-center justify-center text-center border border-romantic-pink/20 shadow-xl">
                    <Heart className="w-4 h-4 sm:w-5 h-5 text-romantic-pink fill-current mb-2 sm:mb-3 animate-pulse" />
                    <p className="text-white/80 font-sans text-[10px] sm:text-xs md:text-sm font-light leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                      "{reason.preview}"
                    </p>
                    <span className="text-[8px] sm:text-[10px] text-romantic-pink uppercase tracking-widest font-semibold bg-romantic-pink/10 px-2.5 sm:px-3 py-1 rounded-full border border-romantic-pink/20">
                      Read more
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedReason !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDetail}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass-panel rounded-3xl p-5 sm:p-8 md:p-10 border border-white/10 relative shadow-[0_20px_50px_rgba(255,117,140,0.15)] overflow-hidden my-auto"
            >
              {/* Back decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-romantic-pink/10 blur-[40px] pointer-events-none rounded-full" />

              {/* Close Button */}
              <button
                onClick={handleCloseDetail}
                className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Body */}
              <div className="flex flex-col items-center text-center">
                
                {/* Icon */}
                <div className="p-4 bg-romantic-pink/10 rounded-full border border-romantic-pink/25 text-romantic-pink mb-4">
                  {React.createElement(iconMap[selectedReason.iconName] || Heart, { className: "w-10 h-10" })}
                </div>

                {/* Header info */}
                <span className="text-romantic-pink/80 text-xs font-semibold uppercase tracking-[0.2em] mb-1">
                  Reason #{String(selectedReason.id).padStart(2, '0')}
                </span>
                
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6">
                  {selectedReason.title}
                </h3>

                <div className="w-12 h-[1px] bg-white/10 mb-6" />

                {/* Long detailed description */}
                <p className="text-white/90 leading-relaxed font-sans text-sm md:text-base font-light mb-8 text-justify md:text-center">
                  {selectedReason.detail}
                </p>

                {/* Bottom affirmation */}
                <div className="flex items-center gap-1.5 text-xs text-romantic-pink font-semibold uppercase tracking-wider bg-romantic-pink/5 px-4 py-2 rounded-full border border-romantic-pink/10">
                  <CheckCircle className="w-4 h-4" />
                  Written with all my heart
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inject custom css for 3D flip card effect */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group-hover\\:rotate-y-180:hover {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};
