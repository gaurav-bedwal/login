import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StoryTimeline } from './components/StoryTimeline';
import { BentoGallery } from './components/BentoGallery';
import { LoveReasons } from './components/LoveReasons';
import { LoveLetter } from './components/LoveLetter';
import { MemoryCarousel } from './components/MemoryCarousel';
import { FavoriteThings } from './components/FavoriteThings';
import { Countdown } from './components/Countdown';
import { SurpriseSection } from './components/SurpriseSection';
import { FinalEmotional } from './components/FinalEmotional';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    lenisRef.current = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoading]);

  const handleScrollToSection = (sectionId: string) => {
    if (lenisRef.current) {
      // Use Lenis's ultra smooth scrollTo method with custom offset
      if (sectionId === 'top') {
        lenisRef.current.scrollTo(0, {
          duration: 1.5,
        });
      } else {
        lenisRef.current.scrollTo(`#${sectionId}`, {
          offset: -70,
          duration: 1.5,
        });
      }
    } else {
      // Fallback scroll
      if (sectionId === 'top') {
        window.scrollTo({
          top: 0,
        });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: offsetTop - 70,
          });
        }
      }
    }
  };



  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full min-h-screen bg-luxury-bg text-gray-100 flex flex-col relative overflow-x-hidden selection:bg-romantic-pink/30 selection:text-white"
          >
            {/* Custom Interactive Elements */}
            <CustomCursor />
            <Navbar onScrollToSection={handleScrollToSection} />

            {/* Viewport Sections */}
            <Hero onScrollToSection={handleScrollToSection} />
            
            <div className="w-full relative">
              <StoryTimeline />
              <BentoGallery />
              <LoveReasons />
              <LoveLetter />
              <MemoryCarousel />
              <FavoriteThings />
              <Countdown />
              <SurpriseSection />
              <FinalEmotional />
            </div>

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
