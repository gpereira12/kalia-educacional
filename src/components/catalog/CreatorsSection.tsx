import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const CreatorsSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white/30">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Image Column - Two Founders */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4 md:gap-6 relative"
          >
            <div className="space-y-4 md:space-y-6">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 aspect-[3/4]">
                <img 
                  src="/Mariana.png" 
                  alt="Mariana Munhoz" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
              </div>
            </div>
            
            <div className="pt-12 space-y-4 md:space-y-6">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 aspect-[3/4]">
                <img 
                  src="/Dayane.png" 
                  alt="Dayane Torres" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 bg-secondary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 md:w-40 md:h-40 bg-primary/5 rounded-full blur-2xl -z-10" />
          </motion.div>
          
          {/* Content Column */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-secondary mb-4 block"
              >
                As Fundadoras
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif text-primary leading-tight"
              >
                Mentes que <span className="italic uppercase">Educam</span> e <br />
                Corações que <span className="italic uppercase">Inspiram</span>
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {[
                { name: "Mariana Munhoz", role: "Pedagoga" },
                { name: "Dayane Torres", role: "Pedagoga" }
              ].map((creator, index) => (
                <div key={index} className="space-y-2 border-l-2 border-secondary/30 pl-6">
                  <h3 className="text-xl md:text-2xl font-serif text-brand-text font-medium">
                    {creator.name}
                  </h3>
                  <p className="text-brand-text/50 uppercase tracking-widest text-[10px] md:text-xs font-bold">
                    {creator.role}
                  </p>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative p-8 md:p-10 rounded-3xl bg-secondary/5 border border-secondary/10"
            >
              <Quote className="absolute -top-4 -left-4 w-10 h-10 text-secondary/20" />
              <p className="text-brand-text/70 text-lg md:text-xl font-light italic leading-relaxed">
                "Nossa missão na Kalia é resgatar a ordem e a beleza no aprendizado, 
                fornecendo as ferramentas necessárias para que cada criança floresça em virtude e inteligência."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;
