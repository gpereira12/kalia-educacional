import { useEffect, useState } from "react";
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
  seloEditorial?: string;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  image, 
  sellerUrls,
  backgroundTexture,
  seloEditorial
}: HeroSectionProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Disable parallax scale on mobile to prevent clipping
  const scale = isMobile ? 1 : 1 + scrollY * 0.0005;
  const opacity = isMobile ? 1 : 1 - scrollY * 0.001;

  // Helper to render title/subtitle which might be string or RichTextItem[]
  const renderText = (content?: RichTextItem[] | string, isTitle = false) => {
    if (!content) return null;

    // Auto-split plain string titles: first half normal, second half accent
    if (typeof content === "string") {
      if (!isTitle) return content;

      // Support manual break with pipe (matches TitleWithColor)
      if (content.includes('|')) {
        const parts = content.split('|');
        const firstHalf = parts[0].trim();
        const secondHalf = parts.slice(1).join('|').trim();
        
        return (
          <>
            <span className="block">{firstHalf}</span>
            <span className="block text-[hsl(var(--primary-emphasis-color))]">{secondHalf}</span>
          </>
        );
      }

      const words = content.split(" ");
      if (words.length <= 1) return content;

      // Split at midpoint — first half shorter, second half (accent) longer
      const splitIndex = Math.floor(words.length / 2);
      const firstHalf = words.slice(0, splitIndex).join(" ");
      const secondHalf = words.slice(splitIndex).join(" ");

      return (
        <>
          <span className="block">{firstHalf}</span>
          <span className="block text-[hsl(var(--primary-emphasis-color))]">{secondHalf}</span>
        </>
      );
    }

    
    return content.map((item, index) => {
      // For titles, if it's the second line (index >= 1) or bold, apply primary color
      const isSecondLinePlus = isTitle && index >= 1;
      const shouldHighlight = item.bold || isSecondLinePlus;
      
      return (
        <span
          key={index}
          className={
            shouldHighlight 
              ? (isTitle ? "block text-[hsl(var(--primary-emphasis-color))]" : "block mt-1 md:mt-2 text-[hsl(var(--secondary-emphasis-color))] font-semibold") 
              : "block"
          }
        >
          {item.text}
        </span>
      );
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[hsl(var(--primary-background-color))] via-[hsl(var(--primary-background-color))] to-[hsl(var(--secondary-background-color))]/5 px-4 py-6 md:py-12 transition-colors duration-1000 z-20">
      {/* Atmospheric Gradient Background using book identity colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Primary radial glow — top-left warmth */}
        <div 
          className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'hsl(var(--primary-emphasis-color))' }}
        />
        {/* Secondary radial glow — bottom-right depth */}
        <div 
          className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full opacity-15 blur-[120px]"
          style={{ background: 'hsl(var(--secondary-emphasis-color))' }}
        />
        {/* Subtle center accent */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full opacity-[0.08] blur-[100px]"
          style={{ background: 'hsl(var(--primary-emphasis-color))' }}
        />
      </div>

      {/* Background Texture - Old Paper Effect - Optional and Dynamic */}
      {backgroundTexture && (
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <OptimizedImage 
            src={backgroundTexture} 
            alt="" 
            className="w-full h-full object-cover sepia-[0.2]" 
            priority 
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-12 items-center w-full px-4 md:px-0">
        {/* Image Column */}
        <div
          className="flex justify-center transition-all duration-300"
          style={{
            transform: `scale(${Math.min(scale, 1.1)})`,
            opacity: Math.max(opacity, 0),
          }}
        >
          {image && (
            <OptimizedImage
              src={image}
              alt="Capa do Livro"
              className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-md h-auto animate-float opacity-100"
              priority
              sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 448px"
            />
          )}
        </div>

        {/* Text Column */}
        <div className="text-center lg:text-left space-y-4 md:space-y-6 animate-fade-in-up">
          <EditorialLogo 
            label={seloEditorial || "Companhia de Jesus"} 
            className="mb-2 justify-center lg:justify-start" 
          />
          
          <h1 className="apple-headline font-sans text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-[0.95] pt-0">
            {renderText(title, true)}
          </h1>

          <p
            id="section-01-subtitle"
            className="apple-subheadline text-base sm:text-lg md:text-xl lg:text-2xl text-[hsl(var(--secondary-text-color))] max-w-2xl mx-auto lg:mx-0"
          >
            {renderText(subtitle, false)}
          </p>

          <div className="pt-2 md:pt-4 flex flex-col gap-6 md:gap-8 justify-center lg:justify-start">
            <MultiSellerCTA 
              sellerUrls={sellerUrls} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
