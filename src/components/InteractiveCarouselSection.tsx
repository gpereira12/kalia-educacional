import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import TitleWithColor from "./TitleWithColor";
import OptimizedImage from "./OptimizedImage";



interface RichTextItem {
  text: string;
  bold: boolean;
}

interface ContentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface InteractiveCarouselSectionProps {
  title?: RichTextItem[] | string; // Supports string just in case
  subtitle?: string;
  listSample?: Partial<ContentItem>[]; // Incoming data might not have all fields populated or id
  images?: string[];
  backgroundImage?: string;
}

const InteractiveCarouselSection = ({ 
  title, 
  subtitle, 
  listSample = [],
  images = [],
  backgroundImage
}: InteractiveCarouselSectionProps) => {
  // Map images to content items
  const contentItems: ContentItem[] = listSample.map((item, index) => ({
    id: item.id || `item-${index}`,
    title: item.title || "",
    subtitle: item.subtitle || "",
    description: item.description || "",
    image: images[index] || item.image || ""
  }));

  if (contentItems.length === 0) {
    return null;
  }

  const [expandedId, setExpandedId] = useState<string | null>(
    listSample.length > 0 ? (listSample[0].id || "item-0") : null
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgesContainerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

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

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Scroll to active badge on mobile when expandedId changes
  useEffect(() => {
    if (isMobile && expandedId && badgeRefs.current[expandedId]) {
      const timer = setTimeout(() => {
        const badge = badgeRefs.current[expandedId];
        const container = badgesContainerRef.current;
        if (badge && container) {
          const badgeLeft = badge.offsetLeft;
          const badgeWidth = badge.offsetWidth;
          const containerWidth = container.offsetWidth;
          const scrollPosition = badgeLeft - containerWidth / 2 + badgeWidth / 2;

          container.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [expandedId, isMobile]);

  const handleItemClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePrevious = () => {
    if (!expandedId) return;
    const currentIndex = contentItems.findIndex((item) => item.id === expandedId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : contentItems.length - 1;
    const newId = contentItems[prevIndex].id;
    setExpandedId(newId);
  };

  const handleNext = () => {
    if (!expandedId) return;
    const currentIndex = contentItems.findIndex((item) => item.id === expandedId);
    const nextIndex = currentIndex < contentItems.length - 1 ? currentIndex + 1 : 0;
    const newId = contentItems[nextIndex].id;
    setExpandedId(newId);
  };

  // Swipe handlers for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };



  // Mobile Layout
  if (isMobile) {
    const currentIndex = contentItems.findIndex((item) => item.id === expandedId);

    return (
      <section
        ref={sectionRef}
        className="relative py-8 px-4 bg-[hsl(var(--primary-background-color))] overflow-hidden min-h-[85vh] flex flex-col justify-center"
      >
        <div className="absolute inset-0 bg-[hsl(var(--primary-background-color))]/40 backdrop-blur-md z-[1]" />

        <div className="relative flex flex-col z-[2] max-w-lg mx-auto w-full">
          {/* Header Section - Compact */}
          <div
            className={`text-center mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="apple-headline text-2xl sm:text-3xl mb-1 tracking-tight">
              <TitleWithColor title={title} colorClassName="text-[#8b1a1a]" />
            </h2>
            <p className="apple-subheadline text-sm text-[hsl(var(--secondary-text-color))] opacity-70">
              {subtitle || "Uma estrutura pedagógica completa."}
            </p>
          </div>

          {/* Main Visual - Compact image + swipe area */}
          <div className="relative flex flex-col items-center">
            {contentItems.map((item) => {
              const isActive = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`w-full transition-all duration-500 ease-out flex flex-col items-center ${
                    isActive ? "opacity-100 scale-100" : "absolute opacity-0 scale-95 pointer-events-none"
                  }`}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {/* Image - constrained height */}
                  <div className="w-full max-h-[50vh] flex items-center justify-center px-6 py-2">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-[50vh] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] rounded-xl"
                      fallbackSrc="/cia-de-jesus/sem-imagem.png"
                    />
                  </div>

                  {/* Inline Navigation Controls */}
                  <div className="flex items-center justify-center gap-4 py-3 w-full">
                    <button
                      onClick={handlePrevious}
                      className="w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-[#8b1a1a] active:scale-90 transition-transform"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {/* Pagination Dots */}
                    <div className="flex gap-1.5 items-center">
                      {contentItems.map((dotItem, idx) => (
                        <button
                          key={dotItem.id}
                          onClick={() => handleItemClick(dotItem.id)}
                          className={`rounded-full transition-all duration-300 ${
                            expandedId === dotItem.id 
                              ? "w-6 h-2 bg-[#8b1a1a]" 
                              : "w-2 h-2 bg-[#8b1a1a]/20 hover:bg-[#8b1a1a]/40"
                          }`}
                          aria-label={`Ir para ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-[#8b1a1a] active:scale-90 transition-transform"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Info Card - Condensed */}
                  <div className="w-full px-4 text-center">
                    <h3 className="text-xl font-bold text-[#8b1a1a] mb-0.5">{item.title}</h3>
                    <p className="text-[10px] font-bold text-[#d2993b] uppercase tracking-widest mb-2">{item.subtitle}</p>
                    <p className="text-sm text-[hsl(var(--secondary-text-color))] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Counter indicator */}
          <div className="text-center mt-3">
            <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest">
              {currentIndex + 1} / {contentItems.length}
            </span>
          </div>  
        </div>
      </section>
    );
  }

  // Desktop Layout
  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-[hsl(var(--primary-background-color))] via-[hsl(var(--primary-background-color))] to-[hsl(var(--secondary-background-color))]/5"
    >
      {/* Dynamic Background Gradient (Premium substitute for background image) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[hsl(var(--secondary-emphasis-color))]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[hsl(var(--primary-emphasis-color))]/5 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="relative max-w-[1600px] mx-auto w-full z-[2]">
        <div
          className={`text-center mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="apple-headline text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            <TitleWithColor title={title} colorClassName="text-[hsl(var(--secondary-emphasis-color))]" />
          </h2>
          <p className="apple-subheadline text-xl md:text-2xl text-[hsl(var(--secondary-text-color))] max-w-3xl mx-auto">
            {subtitle || "Descubra cada aspecto da liturgia através de ilustrações exclusivas."}
          </p>
        </div>

        <div className="relative flex gap-12 items-center justify-center transition-all duration-700 min-h-[600px]">
          {expandedId && (
            <div className="flex flex-col gap-4 absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={handlePrevious}
                aria-label="Anterior"
                className="w-12 h-12 rounded-full bg-[hsl(var(--secondary-emphasis-color))]/10 hover:bg-[hsl(var(--secondary-emphasis-color))]/20 border border-[hsl(var(--secondary-emphasis-color))]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <ChevronUp className="w-6 h-6 text-[hsl(var(--secondary-emphasis-color))] group-hover:text-[hsl(var(--secondary-emphasis-color))]" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Próximo"
                className="w-12 h-12 rounded-full bg-[hsl(var(--secondary-emphasis-color))]/10 hover:bg-[hsl(var(--secondary-emphasis-color))]/20 border border-[hsl(var(--secondary-emphasis-color))]/30 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <ChevronDown className="w-6 h-6 text-[hsl(var(--secondary-emphasis-color))] group-hover:text-[hsl(var(--secondary-emphasis-color))]" />
              </button>
            </div>
          )}

          <div
            ref={badgesContainerRef}
            className={`flex flex-col gap-3 transition-all duration-1000 delay-300 overflow-y-auto w-fit py-8 px-2 scrollbar-hide max-h-[700px] ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {contentItems.map((item, index) => {
              const isExpanded = expandedId === item.id;
              return (
                <button
                  key={item.id}
                  ref={(el) => { badgeRefs.current[item.id] = el; }}
                  onClick={() => handleItemClick(item.id)}
                  className={`group relative px-6 py-4 rounded-2xl bg-[hsl(var(--primary-background-color))]/50 backdrop-blur border-2 border-border/20 hover:border-[hsl(var(--secondary-emphasis-color))]/50 hover:bg-[hsl(var(--secondary-emphasis-color))]/5 transition-all duration-700 ease-in-out text-left ${
                    isExpanded ? "border-[hsl(var(--secondary-emphasis-color))] w-full max-w-sm shadow-lg" : "hover:scale-105 hover:shadow-xl w-fit"
                  }`}
                  style={{
                    animation: isVisible ? `fade-in 0.6s ease-out ${index * 0.1}s both` : "none",
                  }}
                >
                  <div
                    className={`transition-all duration-700 ease-in-out ${isExpanded ? "w-full" : "flex items-center gap-4"}`}
                  >
                    {!isExpanded && (
                      <>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--secondary-emphasis-color))]/10 flex items-center justify-center text-sm font-bold text-[hsl(var(--secondary-emphasis-color))] group-hover:bg-[hsl(var(--secondary-emphasis-color))] group-hover:text-primary-foreground transition-all duration-300">
                          {index + 1}
                        </div>
                        <p className="font-semibold text-base md:text-lg text-[hsl(var(--primary-text-color))] group-hover:text-[hsl(var(--secondary-emphasis-color))] transition-colors whitespace-nowrap">
                          {item.title}
                        </p>
                      </>
                    )}
                    {isExpanded && (
                      <div className="animate-fade-in">
                        <p className="text-sm text-[hsl(var(--secondary-emphasis-color))] font-bold mb-2 uppercase tracking-wide">{item.subtitle}</p>
                        <p className="text-sm text-[hsl(var(--secondary-text-color))] leading-relaxed">{item.description}</p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex-1 max-w-[500px] flex items-center justify-center">
            {contentItems.map((item) => (
              <div
                key={item.id}
                className={`w-full h-auto flex items-center justify-center ${
                  expandedId === item.id ? "opacity-100" : "absolute opacity-0 pointer-events-none"
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-3xl overflow-hidden"
                    fallbackSrc="/cia-de-jesus/sem-imagem.png"
                  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCarouselSection;
