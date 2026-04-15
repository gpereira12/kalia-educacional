import { motion } from "framer-motion";
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

const FAQSection = ({ title, faqs = [] }: FAQSectionProps) => {
  return (
    <section className="relative py-24 px-6 md:py-32 bg-gradient-to-b from-[hsl(var(--primary-background-color))] to-[hsl(var(--secondary-background-color))]/20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="apple-headline text-4xl md:text-6xl tracking-tight mb-6">
            <TitleWithColor title={title} colorClassName="text-[hsl(var(--primary-emphasis-color))]" />
          </h2>
          <p className="apple-subheadline text-[hsl(var(--secondary-text-color))] max-w-2xl mx-auto text-lg md:text-xl">
            Tudo o que você precisa saber sobre o nosso compromisso com a educação do seu filho.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index}`}
                className="border border-[hsl(var(--secondary-emphasis-color))]/10 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all rounded-2xl px-6 py-2 overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="apple-subheadline text-left text-lg md:text-xl font-medium hover:no-underline py-4 text-[hsl(var(--primary-text-color))] group">
                  <span className="group-hover:text-[hsl(var(--primary-emphasis-color))] transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="apple-subheadline text-base md:text-lg text-[hsl(var(--secondary-text-color))] pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* SEO Hidden Content for crawlers (Fallback) */}
        <div className="sr-only" aria-hidden="true">
          {faqs.map((f, i) => (
            <div key={i}>
              <h3>{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
