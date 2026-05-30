import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

export const Countdown: React.FC = () => {
  const [anniversaryDate, setAnniversaryDate] = useState(loveConfig.anniversaryDate);
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Anniversary date string helper for input format YYYY-MM-DD
  const inputDateFormat = anniversaryDate.substring(0, 10);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryDate).getTime();
      const now = new Date().getTime();
      const difference = now - start;

      if (difference < 0) {
        // If anniversary date is set in the future, show 0s or handle as countdown
        setTimeElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [anniversaryDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      // Append time portion to selected date
      setAnniversaryDate(`${selectedDate}T00:00:00`);
    }
  };

  const timerItems = [
    { label: "Days", value: timeElapsed.days },
    { label: "Hours", value: timeElapsed.hours },
    { label: "Minutes", value: timeElapsed.minutes },
    { label: "Seconds", value: timeElapsed.seconds },
  ];

  return (
    <section id="countdown" className="py-24 px-4 md:px-12 bg-zinc-950/70 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-romantic-pink/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-romantic-pink text-xs uppercase tracking-[0.25em] font-semibold">Ticking Our Life Journey</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-3 mb-4 text-gradient-rose-gold">
            Love Counter
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto font-sans text-sm md:text-base">
            Every second spent with you is a treasure. Here is a live ticking record of our wonderful journey together.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-romantic-pink to-romantic-lavender mx-auto mt-6" />
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mb-12">
          {timerItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 120 }}
              className="glass-panel rounded-2xl p-6 md:p-8 text-center border border-white/5 relative flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg group hover:border-romantic-pink/20"
            >
              {/* Back card background pulse effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-romantic-pink/0 to-romantic-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Animated value */}
              <div className="font-sans text-4xl md:text-6xl font-extralight tracking-tight text-white mb-2 group-hover:text-romantic-pink transition-colors">
                {String(item.value).padStart(2, '0')}
              </div>

              {/* Sub-label */}
              <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Display Text & Date Picker Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl glass-panel rounded-2xl p-6 md:p-8 border border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
        >
          {/* Sentence Summary */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
            <div className="p-3.5 bg-romantic-pink/15 text-romantic-pink rounded-2xl border border-romantic-pink/20 flex-shrink-0">
              <Heart fill="#ff758c" className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Our Journey Duration</p>
              <h4 className="font-serif text-lg md:text-xl font-bold text-white mt-0.5 leading-snug">
                We've been creating memories for <span className="text-gradient-rose-gold font-sans font-bold">{timeElapsed.days}</span> days.
              </h4>
            </div>
          </div>

          {/* Date Picker Input */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1">
              <Calendar className="w-3 h-3 text-romantic-pink" /> Set Anniversary
            </span>
            
            <input
              type="date"
              value={inputDateFormat}
              onChange={handleDateChange}
              className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-2 text-white font-sans text-sm focus:outline-none focus:border-romantic-pink/50 transition-colors w-full md:w-auto cursor-pointer"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
