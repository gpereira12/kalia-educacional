import { useEffect, useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import TitleWithColor from "./TitleWithColor";


interface RichTextItem {
  text: string;
  bold: boolean;
}

interface GallerySectionProps {
  title?: RichTextItem[] | string;
  subtitle?: string;
  images?: string[];
}

const GallerySection = ({ title, subtitle, images = [] }: GallerySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Map images from props
  // Note: images array typically contains relative paths from API or full resolved paths.
  // BookPage resolves them usually to /books/slug/image.png
  // I will assume the parent passes pre-resolved paths.
  const galleryImages = images.map((img, index) => ({ 
    src: img, 
    alt: `Página do livro - Ilustração ${index + 1}` 
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const targetScroll =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, [galleryImages]); // Re-check if images change



  return (
    <section ref={sectionRef} className="relative py-8 px-4 bg-gradient-to-b from-[hsl(var(--secondary-emphasis-color))]/20 via-[hsl(var(--primary-background-color))] to-[hsl(var(--primary-background-color))] overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="apple-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight">
            <TitleWithColor title={title} colorClassName="text-[hsl(var(--secondary-emphasis-color))]" />
          </h2>

          <p className="apple-subheadline text-base sm:text-lg md:text-2xl text-[hsl(var(--secondary-text-color))] max-w-3xl mx-auto">
            {subtitle || "Navegue pelas páginas e descubra cada detalhe das ilustrações."}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[hsl(var(--primary-background-color))]/80 backdrop-blur-xl border-2 border-border shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[hsl(var(--primary-background-color))]"
              aria-label="Anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[hsl(var(--primary-background-color))]/80 backdrop-blur-xl border-2 border-border shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[hsl(var(--primary-background-color))]"
              aria-label="Próximo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          {galleryImages.length > 0 ? (
            <div
              ref={scrollContainerRef}
              className={`flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 px-4 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] xl:w-[35vw] snap-center group"
                  style={{
                    animation: isVisible ? `fadeIn 0.8s ease-out ${index * 0.05}s both` : "none",
                  }}
                >
                  <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[hsl(var(--secondary-background-color))]/20 to-[hsl(var(--primary-background-color))] shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_hsl(var(--secondary-emphasis-color)/0.3)] hover:scale-[1.02] cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--secondary-emphasis-color))]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <OptimizedImage 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover" 
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 55vw, (max-width: 1280px) 45vw, 35vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--secondary-emphasis-color))]/10 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-[hsl(var(--secondary-emphasis-color))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[hsl(var(--secondary-text-color))] text-lg">Nenhuma imagem disponível no momento</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
