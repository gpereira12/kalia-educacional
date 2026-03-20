import { motion } from "framer-motion";
import React from "react";

// Deterministic values for SSR/Client consistency
const FLYING_PAGES_CONFIG = [
  { delay: 2, duration: 30, x: 15, moveX: 10 },
  { delay: 5, duration: 35, x: 75, moveX: -15 },
  { delay: 8, duration: 28, x: 40, moveX: 20 },
  { delay: 1, duration: 40, x: 85, moveX: -5 },
  { delay: 12, duration: 32, x: 10, moveX: 25 },
  { delay: 15, duration: 38, x: 60, moveX: -10 },
];

const FlyingPage = ({ index }: { index: number }) => {
  const config = FLYING_PAGES_CONFIG[index % FLYING_PAGES_CONFIG.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
      animate={{ 
        opacity: [0, 0.2, 0.3, 0.2, 0],
        y: ["110vh", "-20vh"],
        x: [`${config.x}vw`, `${config.x + config.moveX}vw`],
        rotate: [0, index % 2 === 0 ? 45 : -45, 0],
        rotateY: [0, 180, 360],
        scale: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        delay: config.delay,
        ease: "easeInOut"
      }}
      className="absolute top-0 left-0"
    >
      <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary/20">
        <path d="M5 10C5 10 15 5 20 10C25 15 35 10 35 10V40C35 40 25 45 20 40C15 35 5 40 5 40V10Z" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="0.5" />
        <line x1="20" y1="10" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
};

const HeroBackground = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const stars = React.useMemo(() => [...Array(40)].map((_, i) => {
    const size = Math.random() * 2 + 0.4;
    const isGold = Math.random() > 0.85;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 2 + Math.random() * 4;
    const delay = Math.random() * 5;
    const initialOpacity = Math.random() * 0.5;
    
    return {
      size,
      isGold,
      x,
      y,
      duration,
      delay,
      initialOpacity
    };
  }), []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#F9F6F0]">
      {/* Primary Gold/Cream Gradient - More pronounced at the edges for contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(209,162,122,0.25)_50%,rgba(182,143,73,0.15)_100%)]" />
      
      {/* Top Gradient for Header Contrast - Linear Gold tint */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#D1A27A]/20 to-transparent" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply" />
      
      {/* Radiant Glows */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[90vw] h-[90vw] bg-secondary/15 blur-[120px] rounded-full"
        />
      </div>

      {/* Star Particles */}
      <div className="absolute inset-0">
        {isMounted && stars.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [star.initialOpacity, 0.7, star.initialOpacity],
              scale: [0.5, 1, 0.5],
              rotate: [0, 90, 180]
            }}
            transition={{
              duration: star.duration * 1.5,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              willChange: "transform, opacity"
            }}
          >
            <svg 
              width={star.size * 4} 
              height={star.size * 4} 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={star.isGold ? 'text-secondary font-bold' : 'text-primary/30'}
            >
              <path 
                d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" 
                fill="currentColor" 
                className={star.isGold ? 'drop-shadow-[0_0_3px_rgba(209,162,122,0.5)]' : ''}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(HeroBackground);
