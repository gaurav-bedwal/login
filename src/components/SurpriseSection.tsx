import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  delay: number;
  speed: number;
}

export const SurpriseSection: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const handleUnlockSurprise = () => {
    setIsUnlocked(true);

    // 1. Confetti Explosion
    // Fire from left edge
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.8 },
      colors: ['#ff758c', '#ff7e5f', '#c084fc', '#e5c158']
    });
    // Fire from right edge
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.8 },
      colors: ['#ff758c', '#ff7e5f', '#c084fc', '#e5c158']
    });
    // Center big burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#ff758c', '#ff8fa3', '#e5c158']
      });
    }, 250);

    // 2. Generate a wave of floating hearts
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5, // 5% to 95%
      size: Math.random() * 24 + 16, // 16px to 40px
      delay: Math.random() * 2,
      speed: Math.random() * 3 + 3 // 3s to 6s
    }));
    setHearts(newHearts);
  };

  return (
    <section id="surprise" className="py-24 px-4 md:px-12 bg-luxury-bg relative overflow-hidden transition-colors duration-1000 min-h-[500px] flex items-center justify-center">
      {/* Background Lighting transition */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isUnlocked 
            ? 'bg-gradient-to-tr from-[#31112c]/40 via-[#1b081e]/60 to-[#0e0712] opacity-100' 
            : 'opacity-0'
        }`} 
      />

      {/* Floating Hearts wave when unlocked */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute text-rose-500 fill-current select-none pointer-events-none text-opacity-70"
            style={{
              left: `${h.left}%`,
              bottom: `-10%`,
              fontSize: `${h.size}px`,
              animation: `rise-heart ${h.speed}s ease-in forwards`,
              animationDelay: `${h.delay}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="max-w-4xl w-full text-center relative z-25">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            // Locked Vault State
            <motion.div
              key="surprise-locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Floating Gift Box Icon */}
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 4, -4, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4, 
                  ease: 'easeInOut' 
                }}
                className="mb-8 p-6 bg-romantic-pink/10 hover:bg-romantic-pink/15 text-romantic-pink rounded-3xl border border-romantic-pink/20 cursor-pointer shadow-[0_0_20px_rgba(255,117,140,0.15)] flex items-center justify-center hover:scale-105 transition-transform"
                onClick={handleUnlockSurprise}
              >
                <Gift className="w-16 h-16 animate-pulse" />
              </motion.div>

              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
                A Little Surprise Box
              </h2>
              <p className="text-white/60 font-light max-w-md mx-auto mb-10 font-sans text-sm md:text-base">
                There is one final secret note hidden inside this chest. Go ahead and unlock it!
              </p>

              <button
                onClick={handleUnlockSurprise}
                className="px-8 py-4 bg-gradient-to-r from-romantic-pink to-romantic-lavender hover:from-romantic-pink hover:to-romantic-pink text-white font-medium rounded-full shadow-[0_4px_25px_rgba(255,117,140,0.45)] transform hover:scale-105 active:scale-95 transition-all text-sm tracking-widest uppercase font-semibold border border-white/10 flex items-center gap-2 glow-on-hover cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" /> Click For A Surprise ❤️
              </button>
            </motion.div>
          ) : (
            // Unlocked Revealed Message State
            <motion.div
              key="surprise-unlocked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
              className="glass-panel rounded-3xl p-6 sm:p-10 md:p-16 border border-romantic-pink/20 shadow-[0_20px_50px_rgba(255,117,140,0.2)] flex flex-col items-center max-w-2xl mx-auto"
            >
              {/* Glowing Heart Icon */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="mb-8 text-rose-500 fill-current bg-rose-500/10 p-5 rounded-full border border-rose-500/20"
              >
                <Heart fill="#f43f5e" className="w-12 h-12" />
              </motion.div>

              <span className="text-romantic-pink text-xs uppercase tracking-[0.3em] font-semibold block mb-4">
                My Eternal Vow
              </span>

              {/* Large quote message */}
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 italic leading-normal">
                "I would choose you in every lifetime."
              </h2>

              <div className="w-16 h-[2px] bg-gradient-to-r from-romantic-pink to-romantic-lavender mb-6" />

              <p className="text-white/80 font-sans font-light leading-relaxed text-sm md:text-base text-center max-w-lg">
                If there are infinite universes, in every single one of them, I would search for you. And when I found you, I would choose you over and over, without a single doubt or a second thought. You are my true north.
              </p>

              {/* Reset button to let them click again */}
              <button
                onClick={() => { setIsUnlocked(false); setHearts([]); }}
                className="text-[10px] text-white/30 hover:text-white/60 uppercase tracking-widest font-semibold mt-10 border border-white/5 hover:border-white/15 px-4 py-1.5 rounded-full transition-all cursor-pointer"
              >
                Reset Box
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Heart floating custom keyframes */}
      <style>{`
        @keyframes rise-heart {
          0% {
            transform: translateY(0) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) scale(1.3) rotate(180deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};
