import { useEffect, useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage";

interface RichTextItem {
  text: string;
  bold: boolean;
}

interface IllustrationsSectionProps {
  title?: RichTextItem[] | string;
  description?: string;
  image?: string;
}

const IllustrationsSection = ({ title, description, image }: IllustrationsSectionProps) => {
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

  // Helper to render title which might be string or RichTextItem[]
  const renderTitle = (content?: RichTextItem[] | string) => {
    if (!content) return null;
    if (typeof content === "string") return content;
    
    return content.map((item, index) => (
      <span
        key={index}
        className={item.bold ? "text-[hsl(var(--primary-emphasis-color))]" : "block mt-2"}
      >
        {item.text}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="presentation-section"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--secondary-background-color))]/50 via-[hsl(var(--secondary-background-color))]/30 to-[hsl(var(--secondary-emphasis-color))]/20 py-12 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div
          className={`space-y-8 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <h2 className="apple-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
            {renderTitle(title)}
          </h2>

          <p className="apple-subheadline text-base sm:text-lg md:text-2xl text-[hsl(var(--secondary-text-color))] leading-relaxed">
            {description}
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          {image && (
            <OptimizedImage
              src={image}
              alt="Ilustração do Livro"
              className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default IllustrationsSection;
