import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Timeline", id: "timeline" },
    { label: "Gallery", id: "gallery" },
    { label: "Reasons", id: "reasons" },
    { label: "Letter", id: "love-letter" },
    { label: "Carousel", id: "carousel" },
    { label: "Favorites", id: "favorites" },
    { label: "Countdown", id: "countdown" },
    { label: "Surprise", id: "surprise" },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-luxury-bg/85 backdrop-blur-md border-b border-white/5 shadow-lg' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            onClick={() => onScrollToSection('top')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Heart fill="#ff758c" className="w-5 h-5 text-romantic-pink group-hover:scale-110 transition-transform" />
            <span className="font-serif text-lg font-bold tracking-wider text-white group-hover:text-romantic-pink transition-colors">
              {loveConfig.girlfriendName}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-romantic-pink font-semibold transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white/80 hover:text-white p-1 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 z-39 bg-zinc-950/95 backdrop-blur-lg border-b border-white/10 overflow-hidden lg:hidden"
          >
            <div className="flex flex-col py-6 px-6 gap-5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left text-sm uppercase tracking-widest text-white/80 hover:text-romantic-pink font-medium py-1 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
