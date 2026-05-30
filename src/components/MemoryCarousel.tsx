import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';

export const MemoryCarousel: React.FC = () => {
  const carouselMemories = loveConfig.memories.filter(
    (m) => m.category === 'carousel' || m.category === 'all'
  );

  const [rotation, setRotation] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);
  const dragThreshold = 10;
  const isMoved = useRef(false);

  // Auto spin timer
  const autoSpinTimer = useRef<any>(null);

  // Standard dimensions
  const [radius, setRadius] = useState(300);
  const [cardWidth, setCardWidth] = useState(280);
  const [cardHeight, setCardHeight] = useState(350);
  const [viewportHeight, setViewportHeight] = useState(450);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setCardWidth(125);
        setCardHeight(170);
        setRadius(100);
        setViewportHeight(240);
      } else if (w < 480) {
        setCardWidth(140);
        setCardHeight(190);
        setRadius(115);
        setViewportHeight(265);
      } else if (w < 640) {
        setCardWidth(170);
        setCardHeight(230);
        setRadius(140);
        setViewportHeight(310);
      } else if (w < 1024) {
        setCardWidth(230);
        setCardHeight(300);
        setRadius(240);
        setViewportHeight(380);
      } else {
        setCardWidth(280);
        setCardHeight(350);
        setRadius(320);
        setViewportHeight(450);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const angleOffset = 360 / carouselMemories.length;

  // Auto spin effect when idle
  useEffect(() => {
    if (isDragging) return;

    autoSpinTimer.current = setInterval(() => {
      setRotation((prev) => prev - 0.2); // Slow background drift
    }, 40);

    return () => {
      if (autoSpinTimer.current) clearInterval(autoSpinTimer.current);
    };
  }, [isDragging]);

  // Track the active (center-most) item based on rotation angle
  useEffect(() => {
    // Normalise rotation between 0 and 360 degrees
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    
    // Find the item index that is closest to facing the camera (which is at 0 degrees)
    // The angle of item i is (i * angleOffset + rotation)
    // To be at the center (0 degrees), we want (i * angleOffset + rotation) = 0 mod 360
    // i.e., i * angleOffset = -rotation mod 360
    const targetAngle = (360 - normalizedRotation) % 360;
    let closestIndex = 0;
    let minDifference = 360;

    for (let i = 0; i < carouselMemories.length; i++) {
      const itemAngle = (i * angleOffset) % 360;
      let diff = Math.abs(itemAngle - targetAngle);
      if (diff > 180) diff = 360 - diff;
      
      if (diff < minDifference) {
        minDifference = diff;
        closestIndex = i;
      }
    }
    
    setActiveItem(closestIndex);
  }, [rotation, angleOffset, carouselMemories.length]);

  // Drag Gesture Handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    currentRotation.current = rotation;
    isMoved.current = false;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX.current;
    
    if (Math.abs(deltaX) > dragThreshold) {
      isMoved.current = true;
    }
    
    // Convert drag movement pixels to rotation degrees
    const rotationSensitivity = 0.25;
    setRotation(currentRotation.current + deltaX * rotationSensitivity);
  };

  const handleEnd = () => {
    setIsDragging(false);
    
    // Snap to the nearest item angle upon releasing the drag
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const itemIndex = Math.round((360 - normalizedRotation) / angleOffset) % carouselMemories.length;
    const targetAngle = -itemIndex * angleOffset;

    // Smoothly snap using standard animation frame or transitions (here state update is immediate, but transition is handled by CSS)
    // Let's snap to the angle
    setRotation(targetAngle);
  };

  // Next / Prev Button Controls
  const rotateTo = (index: number) => {
    const targetAngle = -index * angleOffset;
    setRotation(targetAngle);
  };

  const handleNext = () => {
    const nextIndex = (activeItem + 1) % carouselMemories.length;
    rotateTo(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeItem - 1 + carouselMemories.length) % carouselMemories.length;
    rotateTo(prevIndex);
  };

  return (
    <section id="carousel" className="py-24 px-4 md:px-12 bg-zinc-950/40 relative overflow-hidden select-none">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-romantic-pink/5 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-romantic-lavender/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-romantic-pink text-xs uppercase tracking-[0.25em] font-semibold">Love in 3D Motion</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-3 mb-4 text-gradient-pink-lavender">
            Memory Carousel
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto font-sans text-sm md:text-base">
            Drag to spin or swipe through our favorite captured snaps. Watch the moments cycle in infinite rotation.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-romantic-pink to-romantic-lavender mx-auto mt-6" />
        </div>

        {/* 3D Scene viewport */}
        <div 
          className="relative w-full flex items-center justify-center overflow-visible"
          style={{ perspective: '1200px', height: `${viewportHeight}px` }}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
        >
          {/* Drag Indicator Overlay */}
          <div className="absolute top-0 right-4 flex items-center gap-1.5 text-[10px] text-white/30 tracking-widest uppercase">
            <Hand className="w-3.5 h-3.5" /> Drag to spin
          </div>

          {/* Carousel Cylinder */}
          <div
            className="relative transition-transform duration-500 ease-out"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {carouselMemories.map((item, index) => {
              const itemAngle = index * angleOffset;
              const isActive = index === activeItem;

              return (
                <div
                  key={item.id}
                  className="absolute inset-0 origin-center transition-all duration-300 rounded-2xl overflow-hidden border border-white/10"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    boxShadow: isActive 
                      ? '0 0 35px 2px rgba(255, 117, 140, 0.45), 0 10px 30px rgba(0,0,0,0.8)' 
                      : '0 8px 24px rgba(0,0,0,0.6)',
                    borderColor: isActive ? '#ff758c' : 'rgba(255,255,255,0.08)',
                    opacity: isActive ? 1 : 0.45,
                    scale: isActive ? 1.08 : 0.95,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable="false"
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                  />
                  
                  {/* Subtle caption bottom overlay inside card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[9px] text-romantic-pink font-semibold uppercase tracking-wider">{item.date}</span>
                    <h4 className="text-white font-serif text-sm md:text-base font-bold truncate">{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Details Overlay (Displays description of active center card) */}
        <div className="w-full max-w-xl text-center px-4 min-h-[130px] flex flex-col justify-start">
          <span className="text-romantic-pink text-xs font-semibold uppercase tracking-[0.2em] mb-1">
            {carouselMemories[activeItem]?.date}
          </span>
          <h3 className="font-serif text-2xl font-bold text-white mb-3">
            {carouselMemories[activeItem]?.title}
          </h3>
          <p className="text-white/70 font-light text-sm md:text-base leading-relaxed font-sans max-w-lg mx-auto">
            "{carouselMemories[activeItem]?.description}"
          </p>
        </div>

        {/* Buttons Controls */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 hover:border-romantic-pink/40 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 hover:border-romantic-pink/40 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
