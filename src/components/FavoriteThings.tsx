import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Compass, Bookmark, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

interface FavoriteItem {
  id: number;
  label: string;
  title: string;
  desc: string;
  image?: string;
  extra?: string;
  icon: React.ComponentType<any>;
}

export const FavoriteThings: React.FC = () => {
  const f = loveConfig.favorites;

  const items: FavoriteItem[] = [
    {
      id: 1,
      label: "Favorite Photo",
      title: f.photo.title,
      desc: f.photo.desc,
      image: f.photo.image,
      icon: Camera
    },
    {
      id: 2,
      label: "Favorite Moment",
      title: f.moment.title,
      desc: f.moment.desc,
      image: f.moment.image,
      icon: Compass
    },

    {
      id: 4,
      label: "Favorite Memory",
      title: f.memory.title,
      desc: f.memory.desc,
      image: f.memory.image,
      icon: Bookmark
    },
    {
      id: 5,
      label: "Favorite Dream Together",
      title: f.dream.title,
      desc: f.dream.desc,
      image: f.dream.image,
      icon: Sparkles
    }
  ];

  return (
    <section id="favorites" className="py-24 px-4 md:px-12 bg-luxury-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-romantic-lavender/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-romantic-pink text-xs uppercase tracking-[0.25em] font-semibold font-sans">Our Sweet Preferences</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-3 mb-4 text-gradient-pink-lavender">
            Favorite Things About Her
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto font-sans text-sm md:text-base">
            The special choices, tracks, and visions that make our shared time together so beautifully unique.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-romantic-pink to-romantic-lavender mx-auto mt-6" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                className="glass-card-interactive rounded-2xl overflow-hidden border border-white/5 flex flex-col hover:border-romantic-pink/30 hover:-translate-y-2 group shadow-xl hover:shadow-[0_15px_35px_rgba(255,117,140,0.12)] min-h-[380px]"
              >
                {/* Image Backdrop Top Header */}
                {item.image && (
                  <div className="h-32 w-full overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-black/20" />
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col relative">
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute -top-6 left-6 p-3 bg-zinc-950 border border-white/10 rounded-xl text-romantic-pink shadow-lg group-hover:bg-romantic-pink group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="mt-4 flex-grow">
                    {/* Category Label */}
                    <span className="text-[10px] text-romantic-pink uppercase tracking-widest font-semibold block mb-1">
                      {item.label}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-romantic-pink transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Extra item information if exists (e.g. artist) */}
                    {item.extra && (
                      <span className="text-[10px] text-white/40 block mb-2 font-mono uppercase tracking-wider">
                        {item.extra}
                      </span>
                    )}

                    {/* Description text */}
                    <p className="text-white/70 font-light font-sans text-xs md:text-sm leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
