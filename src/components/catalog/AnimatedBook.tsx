import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

/**
 * Volumetric 3D Book Component
 * Refined for 60FPS smoothness and SSR hydration stability.
 */

const BookCover = ({ thickness = 8, side = "front", children }: { thickness?: number, side?: "front" | "back", children?: React.ReactNode }) => {
  const isFront = side === "front";
  
  return (
    <div className="relative w-full h-full [transform-style:preserve-3d]">
      {/* Main Face */}
      <div 
        className={`absolute inset-0 bg-[#004080] rounded-sm shadow-2xl border-l-[1px] border-white/5 ${isFront ? "border-r-[4px] border-black/30" : "border-l-[4px] border-black/30"}`}
        style={{ 
          transform: `translateZ(${thickness / 2}px)`,
          backgroundColor: 'var(--brand-blue)'
        }}
      >
        <div className="absolute inset-0 opacity-[0.12] bg-grain" />
        {children}
      </div>
      
      {/* Back Face */}
      <div 
        className="absolute inset-0 bg-[#002b57] rounded-sm"
        style={{ 
          transform: `translateZ(${-thickness / 2}px) rotateY(180deg)`,
          backgroundColor: 'var(--brand-blue)',
          filter: 'brightness(0.8)'
        }}
      />
      
      {/* Edges consolidated for performance */}
      <div className="absolute top-0 left-0 w-full bg-[#004080] brightness-125 h-[thickness] [transform:translateY(-50%)_rotateX(90deg)]" style={{ height: thickness, backgroundColor: 'var(--brand-blue)', filter: 'brightness(1.2)' }} />
      <div className="absolute bottom-0 left-0 w-full bg-[#002b57] brightness-75 h-[thickness] [transform:translateY(50%)_rotateX(-90deg)]" style={{ height: thickness, backgroundColor: 'var(--brand-blue)', filter: 'brightness(0.7)' }} />
      <div 
        className={`absolute top-0 w-[${thickness}px] h-full bg-[#002b57] brightness-90`}
        style={{ 
          width: thickness,
          right: isFront ? 0 : "auto", 
          left: isFront ? "auto" : 0,
          transform: `translateX(${isFront ? thickness/2 : -thickness/2}px) rotateY(${isFront ? 90 : -90}deg)`,
          backgroundColor: 'var(--brand-blue)',
          filter: 'brightness(0.9)'
        }}
      />
    </div>
  );
};

const PageContent = () => {
  return (
    <div className="absolute inset-16 flex flex-col gap-4 opacity-[0.03]">
      {[...Array(8)].map((_, j) => (
        <div key={j} className="h-[2px] bg-brand-gold" style={{ width: `${70 + (j * 13) % 30}%` }} />
      ))}
    </div>
  );
};

const AnimatedBook = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Premium High-Inertia Spring
  const cinematicSpring = { 
    type: "spring" as const,
    stiffness: 15,
    damping: 25,
    mass: 1.5,
    restDelta: 0.001
  };

  return (
    <div className="relative w-[300px] h-[400px] md:w-[380px] md:h-[520px] lg:w-[420px] lg:h-[580px] [perspective:3000px] select-none pointer-events-none flex items-center justify-center">
      {/* Refined Atmospheric Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            opacity: [0.15, 0.35, 0.15], 
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(var(--brand-gold),0.2)_0%,transparent_75%)] blur-[120px]"
          style={{ backgroundImage: 'radial-gradient(circle, var(--brand-gold) 0%, transparent 75%)', opacity: 0.2 }}
        />
      </div>

      <motion.div
        // INITIAL: Emerging from the depth
        initial={{ rotateY: -12, rotateX: 10, scale: 0.3, z: -1500, opacity: 0 }}
        // ANIMATE: Elegant presentation tilt
        animate={{ 
          rotateY: isMounted ? -6 : -12, 
          rotateX: isMounted ? 2 : 10,
          scale: isMounted ? 0.95 : 0.3,
          z: isMounted ? 0 : -1500,
          opacity: isMounted ? 1 : 0,
        }}
        transition={{ 
          ...cinematicSpring,
          delay: 0.3,
          opacity: { duration: 1.8 }
        }}
        className="relative w-full h-full [transform-style:preserve-3d] will-change-transform"
      >
        {/* BACK COVER - Heavy Cardboard depth */}
        <div className="absolute inset-0 [transform:translateZ(-35px)] [backface-visibility:hidden]">
          <BookCover side="back" thickness={12} />
        </div>

        {/* PAGE STACK - Crisp Paper Block */}
        <div className="absolute inset-y-2.5 right-2 w-[94%] [transform-style:preserve-3d] [transform:translateZ(-25px)] [backface-visibility:hidden]">
            <div className="absolute inset-0 bg-brand-cream shadow-[inset_0_0_40px_rgba(0,0,0,0.08)] rounded-sm" style={{ backgroundColor: 'var(--brand-cream)' }} />
            <div className="absolute inset-0 opacity-[0.05] bg-grain mix-blend-multiply" />
        </div>

        {/* OPEN PAGES - Hierarchical Depth (12px intervals) */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ rotateY: -155 - i * 3 }}
            animate={{ rotateY: -155 - i * 3 }}
            className="absolute inset-y-2.5 right-2 w-[94%] bg-brand-cream border-l border-black/5 origin-left [transform-style:preserve-3d] shadow-[4px_0_20px_rgba(0,0,0,0.03)] [backface-visibility:hidden]"
            style={{ 
              zIndex: 20 + i, 
              transform: `translateZ(${-15 + i * 12}px)`,
              backgroundColor: 'var(--brand-cream)'
            }}
          >
            <div className="absolute inset-0 opacity-[0.06] bg-grain" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5" />
            <PageContent />
          </motion.div>
        ))}

        {/* FRONT COVER - High Fidelity Gold Accents */}
        <motion.div
           initial={{ rotateY: -168 }}
           animate={{ rotateY: -168 }}
           style={{ 
             zIndex: 500, 
             transform: "translateZ(30px)", 
             transformStyle: "preserve-3d"
           }}
           className="absolute inset-0 [backface-visibility:hidden]"
        >
          <BookCover side="front" thickness={14}>
            <div className="absolute inset-6 border-[1.5px] border-brand-gold/20 rounded-sm flex flex-col items-center justify-center text-center [transform:translateZ(15px)] [backface-visibility:hidden]" style={{ borderColor: 'rgba(var(--brand-gold), 0.2)' }}>
                <div className="w-20 h-20 mb-6 relative">
                    <div className="absolute inset-[-30px] bg-brand-gold/15 blur-2xl rounded-full animate-pulse" />
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-brand-gold filter drop-shadow-[0_0_12px_rgba(var(--brand-gold),0.6)]" style={{ color: 'var(--brand-gold)' }}>
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.8" />
                        <path d="M50 25 V75 M25 50 H75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                        <rect x="42" y="42" width="16" height="16" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.1" />
                    </svg>
                </div>
                <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mb-5" />
                <div className="text-[8px] font-black tracking-[0.7em] uppercase text-brand-gold/50" style={{ color: 'var(--brand-gold)' }}>
                    AD MAIOREM DEI GLORIAM
                </div>
            </div>
          </BookCover>
        </motion.div>

        {/* SPINE - Dark Blue Depth */}
        <div className="absolute inset-y-0 left-0 w-20 bg-[#004080] -translate-x-full origin-right [rotateY:-90deg] [transform-style:preserve-3d] shadow-2xl [backface-visibility:hidden]" style={{ backgroundColor: 'var(--brand-blue)', filter: 'brightness(0.6)' }}>
            <div className="absolute inset-0 opacity-[0.12] bg-grain" />
            <div className="absolute inset-y-16 left-6 w-[1px] bg-brand-gold/20" style={{ backgroundColor: 'var(--brand-gold)', opacity: 0.2 }} />
            <div className="absolute inset-y-16 right-6 w-[1px] bg-brand-gold/20" style={{ backgroundColor: 'var(--brand-gold)', opacity: 0.2 }} />
        </div>
      </motion.div>

      {/* Cinematic Ground Shadow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[240%] h-40 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,transparent_80%)] blur-[70px] pointer-events-none" />
    </div>
  );
};

export default AnimatedBook;
