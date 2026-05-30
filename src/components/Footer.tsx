import React from 'react';
import { Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-luxury-bg border-t border-white/5 text-center relative z-10 select-none">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-1.5 text-sm text-white/50 tracking-wider">
          <span>Made with</span>
          <Heart fill="#ff758c" className="w-4 h-4 text-romantic-pink animate-pulse" />
          <span>for {loveConfig.girlfriendName}</span>
        </div>
        <div className="text-[10px] text-white/20 tracking-widest uppercase mt-1">
          GAURAV &copy; {new Date().getFullYear()} &bull; Our Story is Infinite
        </div>
      </div>
    </footer>
  );
};
