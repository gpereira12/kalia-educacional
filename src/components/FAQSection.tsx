import { useEffect, useRef, useState, useMemo, memo } from "react";
import TitleWithColor from "./TitleWithColor";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RichTextItem {
  text: string;
  bold: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: RichTextItem[] | string;
  faqs?: FAQItem[];
}

const MemoizedFAQItem = memo(({ faq, index }: { faq: FAQItem; index: number }) => (
  <AccordionItem
    value={`item-${index}`}
    className="border-2 border-[hsl(var(--secondary-emphasis-color))]/20 hover:border-[hsl(var(--secondary-emphasis-color))]/50 transition-colors rounded-xl px-6 bg-card"
  >
    <AccordionTrigger className="apple-subheadline text-left text-sm sm:text-base md:text-xl hover:no-underline py-6">
      {faq.question}
    </AccordionTrigger>
    <AccordionContent className="apple-subheadline text-sm sm:text-base md:text-lg text-[hsl(var(--secondary-text-color))] pb-6">
      {faq.answer}
    </AccordionContent>
  </AccordionItem>
));

MemoizedFAQItem.displayName = "MemoizedFAQItem";

const FAQSection = ({ title, faqs = [] }: FAQSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);



  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[hsl(var(--primary-background-color))] via-[hsl(var(--secondary-background-color))]/30 to-[hsl(var(--secondary-background-color))]/40 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2
          className={`apple-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <TitleWithColor title={title} colorClassName="text-[hsl(var(--primary-emphasis-color))]" />
        </h2>
        
        <Accordion
          type="single"
          collapsible
          className={`space-y-4 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <MemoizedFAQItem key={`faq-${index}`} faq={faq} index={index} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-[hsl(var(--secondary-text-color))]">Nenhuma pergunta disponível</p>
            </div>
          )}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
