import { useEffect, useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import MultiSellerCTA from "./MultiSellerCTA";
import EditorialLogo from "./EditorialLogo";
import TitleWithColor from "./TitleWithColor";

import { SellerUrls, RichTextItem, EditorialLabel } from "@/lib/types";

interface FinalCTASectionProps {
  title?: RichTextItem[] | string;
  description?: string;
  buttonText?: string;
  image?: string;
  sellerUrls: SellerUrls;
  editorialLabel?: EditorialLabel;
}

const FinalCTASection = ({ title, description, buttonText, image, sellerUrls, editorialLabel }: FinalCTASectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);



  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--secondary-background-color))]/40 via-[hsl(var(--primary-background-color))] to-[hsl(var(--primary-background-color))] py-12 px-4"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div
          className={`space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <EditorialLogo 
            label={"Kalia Educacional"} 
            className="mb-6 justify-center md:justify-start" 
          />
          
          <h2 className="apple-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
            <TitleWithColor 
              title={title} 
              colorClassName="text-[hsl(var(--primary-emphasis-color))]" 
            />
          </h2>
          
          <p className="apple-subheadline text-base sm:text-lg md:text-2xl text-[hsl(var(--secondary-text-color))] leading-relaxed">
            {description || "O \"Santa Missa Ilustrada\" já está disponível. Garanta o seu exemplar e comece hoje a transformar a sua experiência na Missa."}
          </p>
          
          <div className="pt-4 flex justify-center md:justify-start">
            <MultiSellerCTA 
              sellerUrls={sellerUrls} 
            />
          </div>
        </div>
        
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"
          }`}
        >
          <OptimizedImage
            src={image || "/mockup-frente.png"}
            alt="Santa Missa Ilustrada"
            className="w-full h-auto drop-shadow-2xl animate-float"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
