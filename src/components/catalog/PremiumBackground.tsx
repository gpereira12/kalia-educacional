import React from "react";
import { motion } from "framer-motion";

const PremiumBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-brand-cream">
      {/* Primary Cream Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#fff_0%,var(--brand-cream)_40%,#f5f1e8_100%)]" />
      
      {/* Texture Layer - Enhanced Grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-multiply" />
      
      {/* Fixed Ethereal Glows - Softer depth */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <motion.div
          animate={{
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[10%] w-[50%] h-[50%] bg-[#d4af37]/5 blur-[80px] rounded-full"
        />
        <motion.div
          animate={{
            opacity: [0.05, 0.12, 0.05],
            scale: [1.05, 1, 1.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-[#ebae2a]/5 blur-[70px] rounded-full"
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none mix-blend-soft-light" />
    </div>
  );
};

export default React.memo(PremiumBackground);
