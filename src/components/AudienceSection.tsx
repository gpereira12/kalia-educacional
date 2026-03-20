import { useEffect, useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import TitleWithColor from "./TitleWithColor";


interface RichTextItem {
  text: string;
  bold: boolean;
}

interface AudienceItem {
  title: string;
  subtitle: string;
  description: string;
}

interface AudienceSectionProps {
  title?: RichTextItem[] | string;
  audiences?: AudienceItem[];
  image?: string;
  backgroundTexture?: string;
}

const AudienceSection = ({ title, audiences = [], image, backgroundTexture }: AudienceSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        setScrollY(Math.max(0, Math.min(1, scrollProgress)));
      }
    };

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[hsl(var(--primary-background-color))] via-[hsl(var(--primary-background-color))] to-[hsl(var(--secondary-background-color))]/5 py-12 px-4 transition-colors duration-1000"
    >
      {/* Textured Background - Optional and Dynamic */}
      {backgroundTexture && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <OptimizedImage
            src={backgroundTexture}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className={`apple-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <TitleWithColor title={title} colorClassName="text-[hsl(var(--secondary-emphasis-color))]" />
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            {audiences.length > 0 ? (
              audiences.map((audience, index) => (
                <div
                  key={index}
                  className={`space-y-3 transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <p className="text-sm font-semibold text-[hsl(var(--secondary-text-color))] uppercase tracking-wider">
                    {audience.subtitle}
                  </p>
                  <h3 className="apple-headline text-2xl sm:text-3xl md:text-4xl">
                    {audience.title}
                  </h3>
                  <p className="apple-subheadline text-base sm:text-lg md:text-xl text-[hsl(var(--secondary-text-color))]">
                    {audience.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-[hsl(var(--secondary-text-color))]">Nenhum público definido</p>
              </div>
            )}
          </div>
          
          <div
            className="parallax flex justify-center lg:justify-end"
            style={{
              transform: `translateY(${scrollY * -50}px)`
            }}
          >
            {image ? (
              <OptimizedImage
                src={image}
                alt="Livro Aberto"
                className="w-full h-auto max-w-[500px] drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            ) : (
              <div className="text-center py-10">
                <p className="text-[hsl(var(--secondary-text-color))]">Nenhuma imagem disponível</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
