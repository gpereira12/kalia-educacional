import { useEffect, useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import TitleWithColor from "./TitleWithColor";


interface RichTextItem {
  text: string;
  bold: boolean;
}

interface SpecItem {
  title: string;
  description: string;
}

interface SpecsSectionProps {
  title?: RichTextItem[] | string;
  specs: SpecItem[];
  backgroundTexture?: string;
}

const SpecsSection = ({ title, specs = [], backgroundTexture }: SpecsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);




  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--secondary-background-color))]/50 via-[hsl(var(--primary-background-color))] to-[hsl(var(--primary-background-color))] py-12 px-4 transition-colors duration-1000"
    >
      {/* Textured Background - Optional and Dynamic */}
      {backgroundTexture && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <OptimizedImage 
            src={backgroundTexture} 
            alt="" 
            className="w-full h-full object-cover" 
            priority={false}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <h2
          className={`apple-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <TitleWithColor title={title} colorClassName="text-[hsl(var(--secondary-emphasis-color))]" />
        </h2>

        <dl className="space-y-6">
          {specs.filter(s => s.description && s.description.trim() !== "" && s.description !== "–" && s.description !== "-").length > 0 ? (
            specs.filter(s => s.description && s.description.trim() !== "" && s.description !== "–" && s.description !== "-").map((spec, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row md:items-center md:justify-between py-6 border-b border-border last:border-b-0 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <dt className="apple-subheadline text-sm sm:text-base md:text-xl font-semibold mb-2 md:mb-0">
                  {spec.title}
                </dt>
                <dd className="apple-subheadline text-sm sm:text-base md:text-xl text-[hsl(var(--secondary-text-color))] md:text-right max-w-md">
                  {spec.description}
                </dd>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-[hsl(var(--secondary-text-color))]">Nenhuma especificação disponível</p>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
};

export default SpecsSection;
