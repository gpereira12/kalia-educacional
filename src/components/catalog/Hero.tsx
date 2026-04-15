import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import AnimatedBook from "./AnimatedBook";

const Hero = () => {
  const scrollToCatalog = () => {
    const element = document.getElementById("catalogo");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      <HeroBackground />
      
      {/* Header Compensation removed for overlay effect */}
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center pt-10 md:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center relative"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-primary block">
                Kalia Educacional
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 md:mb-10 leading-[1.2] md:leading-[1.1] tracking-tight text-primary px-2">
              Ordem e <span className="text-secondary italic pr-1">Beleza</span> <br className="md:hidden" />
              na Educação
            </h1>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mb-8 md:mb-14 text-base md:text-xl text-primary/80 font-light max-w-3xl mx-auto leading-relaxed"
          >
            <p>
              um caminho sólido para a formação da criança. Peça por peça, construimos um castelo
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <button 
              onClick={scrollToCatalog}
              className="group relative px-12 py-5 bg-primary text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_-10px_rgba(27,54,93,0.4)] active:scale-95 shadow-xl"
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:scale-105 inline-block">
                Explorar Catálogo
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
            </button>
          </motion.div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default Hero;
