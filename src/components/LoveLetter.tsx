import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = loveConfig.letterMessage;

  // Typing effect when letter opens
  useEffect(() => {
    if (!isOpen) {
      setTypedText('');
      setIsTypingComplete(false);
      return;
    }

    // Delay typing slightly to let the letter slide up first
    const delayTimer = setTimeout(() => {
      let index = 0;
      const speed = 25; // millisecond per character for realistic feel
      
      const typingInterval = setInterval(() => {
        setTypedText(fullText.substring(0, index));
        index++;
        
        if (index > fullText.length) {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, 1500); // Wait 1.5s (envelope opens and slides out)

    return () => clearTimeout(delayTimer);
  }, [isOpen, fullText]);

  const handleOpenLetter = () => {
    setIsOpen(true);
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
  };

  return (
    <section id="love-letter" className="py-24 px-4 md:px-12 bg-luxury-bg relative flex flex-col items-center overflow-hidden">
      {/* Background bokeh light effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-romantic-pink/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-romantic-pink text-xs uppercase tracking-[0.25em] font-semibold">A Secret Note</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-3 mb-4 text-gradient-pink-lavender">
            Interactive Love Letter
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto font-sans text-sm md:text-base">
            Click to unseal the letter, and read what my heart wanted to write to you.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-romantic-pink to-romantic-lavender mx-auto mt-6" />
        </div>

        {/* Outer Envelope Wrapper */}
        <div className="w-full max-w-lg min-h-[380px] flex items-center justify-center relative">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              // Unopened Sealed Envelope
              <motion.div
                key="envelope-closed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpenLetter}
                className="w-full max-w-[420px] aspect-[4/3] bg-gradient-to-br from-neutral-800 to-zinc-900 border border-white/10 rounded-2xl relative shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer hover:border-romantic-pink/30 hover:shadow-[0_20px_50px_rgba(255,117,140,0.15)] flex flex-col items-center justify-center group overflow-hidden"
              >
                {/* Envelope fold diagonal overlay (back flap visual) */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_50%,transparent_50%)] pointer-events-none" />
                
                {/* Heart Wax Seal */}
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="w-20 h-20 bg-romantic-pink hover:bg-rose-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,117,140,0.6)] border border-white/15 z-10 transition-colors"
                >
                  <Heart fill="white" className="w-9 h-9 text-white animate-pulse" />
                </motion.div>

                <p className="text-white/80 font-serif text-lg italic mt-6 z-10">
                  Open Letter
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2 z-10 group-hover:text-romantic-pink/80 transition-colors">
                  To Deepika ❤️
                </p>
                <div className="absolute bottom-4 right-4 text-[9px] text-white/20 tracking-wider">
                  GAURAV
                </div>
              </motion.div>
            ) : (
              // Opened Letter Modal View (zooms in overlay for reading comfort)
              <motion.div
                key="letter-opened"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md overflow-y-auto"
                onClick={handleCloseLetter}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl old-paper rounded-2xl p-5 sm:p-8 md:p-14 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#d2b48c] overflow-hidden my-8"
                >


                  {/* Close button */}
                  <button
                    onClick={handleCloseLetter}
                    className="absolute top-4 right-4 text-amber-900/60 hover:text-amber-900 font-sans font-medium text-xs border border-amber-900/20 hover:border-amber-900/40 px-3 py-1 rounded-full transition-all cursor-pointer"
                  >
                    Fold & Close
                  </button>

                  {/* Letter Content (Scrollable if text exceeds height on smaller screens) */}
                  <div className="max-h-[70vh] overflow-y-auto pr-2 mt-6 font-serif text-amber-950 font-normal leading-relaxed text-sm sm:text-base md:text-lg whitespace-pre-line text-left">
                    {typedText}
                    {/* Blink cursor */}
                    {!isTypingComplete && (
                      <span className="inline-block w-1.5 h-5 ml-1 bg-amber-900 animate-blink" />
                    )}
                  </div>

                  {/* Sealed Wax Seal Indicator at bottom */}
                  {isTypingComplete && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                      className="mt-10 flex flex-col items-center text-center select-none"
                    >
                      <div className="w-12 h-12 bg-[#b23b3b] rounded-full flex items-center justify-center shadow-md border border-[#c14a4a]">
                        <Heart fill="white" className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-900/60 font-semibold mt-2 flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#b23b3b]" /> Delivered With Love
                      </span>
                    </motion.div>
                  )}

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Typing Cursor Blink Animation */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
    </section>
  );
};
