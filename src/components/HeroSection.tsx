import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import MultiSellerCTA from "./MultiSellerCTA";
import EditorialLogo from "./EditorialLogo";
import { SellerUrls, RichTextItem } from "@/lib/types";

interface HeroSectionProps {
  title?: RichTextItem[] | string;
  subtitle?: RichTextItem[] | string;
  image?: string;
  buttonBuy?: string;
  buttonPreview?: string;
  sellerUrls: SellerUrls;
  backgroundTexture?: string;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  image, 
  sellerUrls,
  backgroundTexture,
}: HeroSectionProps) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderText = (content?: RichTextItem[] | string, isTitle = false) => {
    if (!content) return null;

    if (typeof content === "string") {
      if (content.includes('|')) {
        const parts = content.split('|');
        return (
          <span className="block space-y-1">
            {parts.map((part, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                className={`block ${
                  isTitle 
                    ? (i === 0 ? "" : "text-[hsl(var(--primary-emphasis-color))] italic font-serif")
                    : (i === 0 ? "font-bold text-primary/80" : "text-[hsl(var(--secondary-emphasis-color))] font-medium text-lg sm:text-xl")
                }`}
              >
                {part.trim()}
              </motion.span>
            ))}
          </span>
        );
      }

      if (!isTitle) return content;
      return content;
    }

    return content.map((item, index) => {
      const isSecondLinePlus = isTitle && index >= 1;
      const shouldHighlight = item.bold || isSecondLinePlus;
      return (
        <span
          key={index}
          className={
            shouldHighlight 
              ? (isTitle ? "block text-[hsl(var(--primary-emphasis-color))]" : "block mt-2 text-[hsl(var(--secondary-emphasis-color))] font-semibold") 
              : "block"
          }
        >
          {item.text}
        </span>
      );
    });
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center bg-gradient-to-b from-[hsl(var(--primary-background-color))] via-[hsl(var(--primary-background-color))] to-[hsl(var(--secondary-background-color))]/5 px-6 py-12 overflow-hidden z-20">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full opacity-20 blur-[140px]"
          animate={{
             background: [
                'radial-gradient(circle, hsl(var(--primary-emphasis-color)) 0%, transparent 70%)',
                'radial-gradient(circle, hsl(var(--secondary-emphasis-color)) 0%, transparent 70%)',
                'radial-gradient(circle, hsl(var(--primary-emphasis-color)) 0%, transparent 70%)'
             ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-15 blur-[120px]"
          style={{ background: 'hsl(var(--secondary-emphasis-color))' }}
        />
      </div>

      {backgroundTexture && (
        <motion.div
          style={{ opacity: 0.05, scale: 1.1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <OptimizedImage 
            src={backgroundTexture} 
            alt="" 
            className="w-full h-full object-cover sepia-[0.1]" 
            priority 
          />
        </motion.div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Image Perspective Column */}
        <motion.div
          style={{ opacity, scale }}
          className="flex justify-center relative"
        >
          {image && (
            <div className="relative group">
              {/* Luxury Shadow Glow */}
              <div className="absolute -inset-10 bg-[hsl(var(--primary-emphasis-color))]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <motion.div
                initial={{ opacity: 0, rotateY: -20, rotateX: 10, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <OptimizedImage
                  src={image}
                  alt="Capa em Perspectiva"
                  className="w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] mx-auto h-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.18)] select-none hover:scale-[1.03] transition-transform duration-1000 ease-out"
                  priority
                />
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* High-End Typography Column */}
        <div className="text-center lg:text-left space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EditorialLogo className="mb-8 justify-center lg:justify-start scale-110" />
          </motion.div>

          <div className="space-y-4">
            {typeof subtitle === "string" && subtitle.includes('|') && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[hsl(var(--secondary-text-color))]/60"
              >
                {subtitle.split('|')[0].trim()}
              </motion.span>
            )}

            <h1 className="apple-headline font-sans text-5xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tightest leading-[0.9] pt-2 text-[hsl(var(--primary-emphasis-color))]">
              {renderText(title, true)}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="apple-subheadline text-2xl sm:text-3xl md:text-4xl text-[hsl(var(--secondary-emphasis-color))] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-serif italic"
          >
            {typeof subtitle === "string" && subtitle.includes('|') 
              ? subtitle.split('|')[1].trim()
              : renderText(subtitle, false)
            }
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-6 flex flex-col gap-8 justify-center lg:justify-start"
          >
            <MultiSellerCTA sellerUrls={sellerUrls} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
