import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

gsap.registerPlugin(ScrollTrigger);

export const StoryTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  
  const timelineMemories = loveConfig.memories.filter(
    (m) => m.category === 'timeline' || m.category === 'all'
  );

  useEffect(() => {
    if (!containerRef.current || !glowLineRef.current) return;

    // GSAP ScrollTrigger to animate the height scale of the glowing center line
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 80%",
        scrub: 1.2,
      }
    });

    tl.fromTo(glowLineRef.current, 
      { scaleY: 0 }, 
      { scaleY: 1, ease: "none" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="timeline" className="py-24 px-4 md:px-12 bg-gradient-radial-luxury relative overflow-hidden" ref={containerRef}>
      {/* Background visual decorations */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-romantic-pink/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-romantic-lavender/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="text-romantic-pink text-xs uppercase tracking-[0.25em] font-semibold">How It Started vs How It's Going</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-3 mb-4 text-gradient-rose-gold">
            Our Love Timeline
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto font-sans">
            A vertical trip down memory lane, remembering the beautiful milestones that defined our infinity.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-romantic-pink to-romantic-lavender mx-auto mt-6" />
        </div>

        {/* Timeline body wrapper */}
        <div className="relative">
          
          {/* Timeline Center Line (Gray Background) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-[1px] pointer-events-none rounded-full" />
          
          {/* GSAP-Animated Glowing Line */}
          <div 
            ref={glowLineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] glow-line -translate-x-[1px] origin-top pointer-events-none rounded-full"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Timeline Milestones */}
          <div className="space-y-16 md:space-y-24">
            {timelineMemories.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={milestone.id} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Left Side (Even items get details on left on desktop, odd items get spacing) */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-16' : 'md:order-last md:justify-start md:pl-16'} pl-12 md:pl-0`}>
                    
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, type: 'spring', bounce: 0.15 }}
                      className="w-full max-w-lg glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-romantic-pink/30 hover:shadow-[0_10px_30px_rgba(255,117,140,0.1)] transition-all group"
                    >
                      {/* Milestone Text Details */}
                      <div className="p-6 md:p-8">
                        {/* Date Badge */}
                        <span className="inline-flex items-center gap-1.5 text-romantic-pink/95 text-xs font-semibold uppercase tracking-wider mb-4 bg-romantic-pink/10 px-3 py-1 rounded-full border border-romantic-pink/20 w-fit">
                          <Calendar className="w-3.5 h-3.5" />
                          {milestone.date}
                        </span>

                        <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-romantic-pink transition-colors">
                          {milestone.title}
                        </h3>
                        <p className="text-white/70 font-light text-sm md:text-base leading-relaxed font-sans">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bullet Heart Marker (Centered on desktop, left-aligned on mobile) */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                      className="w-8 h-8 rounded-full bg-zinc-950 border-2 border-romantic-pink flex items-center justify-center shadow-[0_0_12px_rgba(255,117,140,0.6)] cursor-pointer hover:bg-romantic-pink transition-colors group"
                    >
                      <Heart className="w-3.5 h-3.5 text-romantic-pink group-hover:text-white fill-current transition-colors" />
                    </motion.div>
                  </div>

                  {/* Spacing for layout alignment */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
