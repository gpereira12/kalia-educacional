import { motion } from "framer-motion";
import { Paintbrush, Lightbulb, BookOpen, Users, Cross } from "lucide-react";

const differentiators = [
  {
    icon: Paintbrush,
    title: "Arte que Eleva",
    description: "Beleza que cativa, encanta a criança e lhe forma a percepção da harmonia necessária à contemplação."
  },
  {
    icon: Lightbulb,
    title: "Sabedoria Perene",
    description: "Conhecimento organizado com clareza e profundidade."
  },
  {
    icon: BookOpen,
    title: "Narrativas de Excelência",
    description: "Textos selecionados pensados também na formação do imaginário e na transmissão de valores."
  },
  {
    icon: Users,
    title: "Métodos consolidados",
    description: "Metodologia baseada em evidências científicas e nos melhores resultados acadêmicos."
  },
  {
    icon: Cross,
    title: "Valores Eternos",
    description: "Princípios que edificam a inteligência e fortalecem o espírito."
  }
];

const Differentiators = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-20">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-3 md:mb-4 block"
            >
              Nossa Essência
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-6xl font-serif leading-[1.2] md:leading-tight text-black/90"
            >
              Os Diferenciais da <br className="md:hidden" />
              <span className="italic text-primary font-medium">Kalia Educacional</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:block h-px flex-1 bg-border/40 mb-4 mx-12"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`group p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-black/5 hover:border-primary/30 hover:bg-white/80 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 ${index === 0 ? "md:col-span-12 lg:col-span-7" :
                index === 1 ? "md:col-span-12 lg:col-span-5" :
                  "md:col-span-12 lg:col-span-4"
                }`}
            >
              <div className="flex flex-col h-full justify-between gap-8 md:gap-12">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <div>
                    <h3 className="text-2xl font-serif text-brand-text group-hover:text-brand-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-brand-text/60 leading-relaxed text-lg font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Blob */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default Differentiators;
