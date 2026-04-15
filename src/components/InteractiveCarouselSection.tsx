import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  title?: RichTextItem[] | string;
  subtitle?: string;
  listSample?: Partial<ContentItem>[];
  images?: string[];
}

const InteractiveCarouselSection = ({ 
  title, 
  subtitle, 
  listSample = [],
  images = [],
}: InteractiveCarouselSectionProps) => {
  // Garantir exatamente 7 itens conforme solicitado
  const items: ContentItem[] = listSample.slice(0, 7).map((item, index) => ({
    id: item.id || `sumario-${index}`,
    title: item.title || `Destaque ${index + 1}`,
    subtitle: item.subtitle || "Resumo Pedagógico",
    description: item.description || "Exploração profunda do conteúdo clássico e tradicional.",
    image: images[index] || item.image || ""
  }));

  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const next = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section className="relative py-24 px-6 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="apple-headline text-4xl md:text-7xl mb-6 tracking-tight"
          >
            <TitleWithColor title={title} colorClassName="text-[hsl(var(--primary-emphasis-color))]" />
          </motion.h2>
          <p className="apple-subheadline text-xl text-[hsl(var(--secondary-text-color))] max-w-2xl mx-auto">
            {subtitle || "Um sumário visual da nossa excelência pedagógica."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Lado Esquerdo: Imagem com Animação */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={items[activeIndex].id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-black/5 bg-black/5">
                  <OptimizedImage
                    src={items[activeIndex].image}
                    alt={items[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Lado Direito: Conteúdo e Navegação */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(var(--primary-emphasis-color))]">
                Item {activeIndex + 1} de {items.length}
              </span>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[activeIndex].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[hsl(var(--primary-text-color))]">
                    {items[activeIndex].title}
                  </h3>
                  <p className="text-lg md:text-2xl text-[hsl(var(--secondary-text-color))] leading-relaxed">
                    {items[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navegação Customizada Premium */}
            <div className="flex items-center gap-6 pt-8">
              <button 
                onClick={prev}
                className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <div className="flex gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      activeIndex === idx ? "w-12 bg-[hsl(var(--primary-emphasis-color))]" : "w-1.5 bg-black/10"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={next}
                className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors group"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveCarouselSection;
