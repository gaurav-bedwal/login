import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

interface HeartTrail {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
}

export const CustomCursor: React.FC = () => {
  const [trail, setTrail] = useState<HeartTrail[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const nextId = useRef(0);
  const lastSpawn = useRef({ x: 0, y: 0 });

  // Motion values to avoid React re-renders on mousemove
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  
  // Spring physics for ultra-smooth trailing effect
  const springConfig = { stiffness: 900, damping: 40, mass: 0.1 };
  const cursorX = useSpring(rawX, springConfig);
  const cursorY = useSpring(rawY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      rawX.set(x);
      rawY.set(y);

      if (!isVisible) setIsVisible(true);

      // Calculate distance from last heart spawn
      const dx = x - lastSpawn.current.x;
      const dy = y - lastSpawn.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Spawn a trail heart if mouse moved more than 40px (slightly optimized spacing)
      if (distance > 40) {
        const id = nextId.current++;
        const size = Math.random() * 12 + 8; // 8px to 20px
        const rotate = Math.random() * 60 - 30; // -30deg to 30deg

        setTrail((prev) => [
          ...prev.slice(-10), // Limit trail length for better performance
          { id, x, y, size, rotate },
        ]);

        lastSpawn.current = { x, y };
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Event delegation: Attach a single listener to window to inspect hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, .hover-trigger');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Clean up old hearts from the trail array
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 850);
    return () => clearTimeout(timer);
  }, [trail]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null; // Don't show custom cursor on mobile
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 overflow-hidden">
      {/* Heart Trail */}
      <AnimatePresence>
        {trail.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0.8, scale: 0.8, x: heart.x - heart.size / 2, y: heart.y - heart.size / 2 }}
            animate={{ 
              opacity: 0, 
              scale: 0.1, 
              y: heart.y - heart.size / 2 - 50, // Float upwards
              x: heart.x - heart.size / 2 + (Math.random() * 20 - 10) // Drifting sideways
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute text-romantic-pink pointer-events-none select-none"
            style={{ fontSize: heart.size, transform: `rotate(${heart.rotate}deg)` }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Cursor Dot */}
      {isVisible && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isClicked ? 0.8 : isHovering ? 1.6 : 1,
            backgroundColor: isHovering ? 'rgba(255, 117, 140, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            borderColor: isHovering ? '#ff758c' : 'rgba(255, 255, 255, 0.4)',
          }}
          className="absolute w-6 h-6 rounded-full border border-solid pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
        >
          {/* Innermost Heart */}
          <motion.div
            animate={{
              scale: isHovering ? 1.2 : 0.8,
              color: isHovering || isClicked ? '#ff758c' : '#ffffff',
            }}
            className="text-[9px]"
          >
            ❤️
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
