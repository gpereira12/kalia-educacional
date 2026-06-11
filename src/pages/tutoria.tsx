import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  ChevronDown, 
  BookMarked, 
  Clock, 
  Users, 
  Layers, 
  Check,
  Heart,
  Smile,
  GraduationCap
} from "lucide-react";
import PremiumBackground from "@/components/catalog/PremiumBackground";
import Footer from "@/components/Footer";

// Custom FAQ Item Component with framer-motion animations
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-2 group focus:outline-none"
      >
        <span className="text-lg font-semibold text-brand-text/90 group-hover:text-brand-blue transition-colors duration-300">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-brand-gold p-1 bg-black/5 rounded-full"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="py-3 text-base text-black/70 leading-relaxed font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Tutoria() {
  const whatsappUrl = "https://wa.me/5511991596893?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20diagn%C3%B3stica%20para%20o%20Programa%20de%20Tutoria%20Kalia.";

  const pains = [
    {
      title: "Reclamações frequentes",
      description: "A escola ou professora aponta constantemente falta de atenção ou atraso no desenvolvimento do seu filho em relação aos colegas.",
      icon: <AlertCircle className="w-6 h-6 text-red-500" />
    },
    {
      title: "Bloqueio com estudos",
      description: "A hora da leitura parece um castigo e os deveres de matemática geram choro, estresse e muita resistência na criança.",
      icon: <Smile className="w-6 h-6 text-red-500 rotate-180" />
    },
    {
      title: "Lacunas acumuladas",
      description: "A matéria avança a cada bimestre na escola tradicional, mas a base (alfabetização primária e lógica de contas) continua fraca.",
      icon: <Layers className="w-6 h-6 text-red-500" />
    },
    {
      title: "Rotina familiar desgastada",
      description: "Horas do seu dia tentando ensinar seu filho em casa que terminam em frustração, cansaço e conflito desnecessário.",
      icon: <Clock className="w-6 h-6 text-red-500" />
    }
  ];

  const pillars = [
    {
      title: "Material Próprio e Ordenado",
      desc: "Nossas apostilas e livros exclusivos são projetados para atenção profunda. Com ilustrações inspiradas na arte clássica, evitam a poluição visual e conduzem a mente de maneira lógica e focada.",
      icon: <BookMarked className="w-6 h-6 text-brand-gold" />
    },
    {
      title: "Turmas Ultra-Reduzidas",
      desc: "Nossos tutores guiam grupos minúsculos. Seu filho não será apenas 'mais um' em uma sala lotada; ele terá um atendimento personalizado, respeitoso e acolhedor.",
      icon: <Users className="w-6 h-6 text-brand-gold" />
    },
    {
      title: "Praticidade 100% Online",
      desc: "Economize seu tempo e elimine o estresse do trânsito. O aluno aprende em tempo real por videoconferência direta no conforto e segurança do próprio lar.",
      icon: <GraduationCap className="w-6 h-6 text-brand-gold" />
    },
    {
      title: "Atividades de Fixação Semanal",
      desc: "Para fortalecer a autonomia e o ritmo de estudos, enviamos atividades complementares planejadas para que a criança pratique sozinha ao longo da semana.",
      icon: <CheckCircle2 className="w-6 h-6 text-brand-gold" />
    },
    {
      title: "Acompanhamento Ativo dos Pais",
      desc: "Você sempre por dentro de tudo. Enviamos relatórios constantes com os avanços obtidos e os próximos passos para garantir transparência absoluta.",
      icon: <Heart className="w-6 h-6 text-brand-gold" />
    }
  ];

  return (
    <>
      <Head>
        <title>Programa de Tutoria - Kalia Educacional</title>
        <meta 
          name="description" 
          content="Programa de aulas e tutoria online de Alfabetização e Matemática para crianças de 4 a 10 anos. Método clássico focado em resultados reais." 
        />
        <meta name="keywords" content="Tutoria Kalia Educacional, aulas particulares online, alfabetização clássica, matemática infantil, dislexia, TDAH" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kaliaeducacional.com.br/tutoria" />
        <meta property="og:title" content="Programa de Tutoria | Kalia Educacional" />
        <meta property="og:description" content="Aulas personalizadas de Alfabetização e Matemática no ritmo do seu filho." />
        <meta property="og:image" content="/logo-kalia.png" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Programa de Tutoria Kalia Educacional",
              "description": "Tutoria especializada de Alfabetização e Matemática para crianças de 4 a 10 anos.",
              "provider": {
                "@type": "Organization",
                "name": "Kalia Educacional",
                "sameAs": "https://kaliaeducacional.com.br"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-transparent selection:bg-primary/20 text-brand-text">
        <PremiumBackground />

        {/* Floating Glass Header */}
        <header className="fixed w-full top-0 left-0 z-50 py-3 transition-all duration-300">
          <div className="container mx-auto px-4">
            <div className="glass-apple rounded-full px-6 py-3 flex items-center justify-between shadow-md">
              <Link href="/" className="flex items-center gap-2 group">
                <img 
                  src="/logo-kalia.svg" 
                  alt="Kalia Educacional" 
                  width="130"
                  height="32"
                  className="h-8 w-auto transition-transform duration-300 group-hover:scale-102"
                />
              </Link>

              <Link 
                href="/#catalogo" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue/80 hover:text-brand-blue transition-colors duration-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar ao Catálogo</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="pt-24 md:pt-32">
          
          {/* 1. Hero Section */}
          <section className="py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Text block */}
                <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-brand-gold font-semibold text-xs tracking-wider uppercase">
                    <Sparkles className="w-3 h-3" />
                    Programa de Tutoria Online
                  </div>
                  <h1 className="apple-headline text-4xl sm:text-5xl md:text-6xl text-brand-blue tracking-tight leading-[1.1]">
                    Chega de reclamações da escola e da frustração de ver seu filho com <span className="text-gold-gradient italic">dificuldades para aprender</span>.
                  </h1>
                  <p className="apple-subheadline text-lg md:text-xl text-black/70 leading-relaxed font-medium max-w-2xl">
                    Dê a ele o suporte do método Kalia: Alfabetização e Matemática de verdade, no ritmo dele e no conforto do lar. Para crianças de <strong className="text-brand-blue">4 a 10 anos</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apple-button flex items-center justify-center gap-2 group shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Agendar Avaliação Gratuita</span>
                    </a>
                  </div>
                  <p className="text-xs text-black/50 font-semibold tracking-wide flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Vagas limitadas para garantir atenção individualizada.
                  </p>
                </div>

                {/* Media Placeholder block */}
                <div className="lg:col-span-5 relative w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-[#eee7db] border border-black/5 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-transparent z-10" />
                  {/* Space for video / main image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-brand-blue/80 relative z-20">
                    <div className="w-16 h-16 rounded-full bg-white/95 shadow-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      <BookOpen className="w-8 h-8 text-brand-blue" />
                    </div>
                    <span className="text-sm font-extrabold uppercase tracking-widest text-brand-blue/90">
                      [Espaço para Imagem/Vídeo Institucional]
                    </span>
                    <p className="text-xs text-black/60 mt-2 max-w-xs leading-normal">
                      Mostre aqui uma aula demonstrativa online ou a apresentação do material didático físico Kalia.
                    </p>
                  </div>
                  {/* Visual frame element */}
                  <div className="absolute inset-4 border-2 border-dashed border-brand-gold/30 rounded-2xl pointer-events-none" />
                </div>

              </div>
            </div>
          </section>

          {/* 2. Pain / Empathy Section */}
          <section className="py-16 bg-white/50 border-y border-black/5">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <h2 className="apple-headline text-3xl md:text-4xl text-brand-blue mb-4">
                Você sente que o aprendizado do seu filho está travado?
              </h2>
              <p className="apple-subheadline text-lg text-black/60 max-w-3xl mx-auto mb-12 font-medium">
                Muitas vezes, a rotina escolar se torna sinônimo de frustração. A escola tradicional avança rápido demais em turmas lotadas, sem preencher as lacunas básicas de quem ficou para trás.
              </p>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-left">
                {pains.map((pain, idx) => (
                  <div key={idx} className="glass-apple rounded-2xl p-6 md:p-8 flex gap-4 transition-all duration-300 hover:shadow-lg">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-2.5 bg-red-50 rounded-xl">
                        {pain.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-blue mb-2">{pain.title}</h3>
                      <p className="text-sm text-black/75 leading-relaxed font-medium">{pain.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. The Solution & Subject Tracks */}
          <section className="py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                O Resgate Pedagógico
              </span>
              <h2 className="apple-headline text-3xl md:text-5xl text-brand-blue mt-4 mb-6">
                Um caminho ordenado e seguro para o aprendizado real
              </h2>
              <p className="apple-subheadline text-lg text-black/60 max-w-2xl mx-auto mb-16 font-medium">
                O programa reconstrói as bases que sustentam toda a vida escolar. Nossas aulas focam diretamente nas duas maiores necessidades da infância:
              </p>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Track 1: Literacy */}
                <div className="glass-apple rounded-3xl p-8 md:p-12 text-left relative overflow-hidden group flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h3 className="apple-headline text-2xl md:text-3xl text-brand-blue">
                      1. Alfabetização e Linguagem
                    </h3>
                    <p className="text-black/70 font-medium leading-relaxed">
                      Conduzimos a criança desde o som das letras até a leitura fluente e a escrita autônoma. O método Kalia preenche as lacunas do método construtivista clássico, devolvendo a clareza e despertando o amor natural pelos livros.
                    </p>
                    <ul className="space-y-2">
                      {["Consciência Fonêmica (sons das letras)", "Leitura fluida com entonação", "Vocabulário rico e boa escrita"].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-black/80">
                          <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Image Placeholder */}
                  <div className="mt-8 relative w-full h-44 rounded-2xl overflow-hidden bg-[#e5ddd2] border border-black/5 flex items-center justify-center text-center p-4">
                    <div className="absolute inset-0 bg-grain opacity-[0.03]" />
                    <div className="z-10 text-brand-blue/60 flex flex-col items-center">
                      <BookMarked className="w-8 h-8 mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider">[Imagem do Material de Alfabetização]</span>
                    </div>
                  </div>
                </div>

                {/* Track 2: Mathematics */}
                <div className="glass-apple rounded-3xl p-8 md:p-12 text-left relative overflow-hidden group flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center">
                      <Layers className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h3 className="apple-headline text-2xl md:text-3xl text-brand-blue">
                      2. Fundamentos da Matemática
                    </h3>
                    <p className="text-black/70 font-medium leading-relaxed">
                      Livre do decoreba burocrático de regras. Apresentamos a lógica numérica de forma concreta, visual e gradual. A criança aprende a somar, subtrair, multiplicar e dividir entendendo a mecânica por trás das contas.
                    </p>
                    <ul className="space-y-2">
                      {["Raciocínio lógico e espacial", "Cálculo mental estruturado", "Autonomia na resolução de problemas"].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-black/80">
                          <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Image Placeholder */}
                  <div className="mt-8 relative w-full h-44 rounded-2xl overflow-hidden bg-[#e5ddd2] border border-black/5 flex items-center justify-center text-center p-4">
                    <div className="absolute inset-0 bg-grain opacity-[0.03]" />
                    <div className="z-10 text-brand-blue/60 flex flex-col items-center">
                      <Layers className="w-8 h-8 mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider">[Imagem do Material de Matemática]</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 4. Core Pillars of Kalia Method */}
          <section className="py-16 md:py-24 bg-brand-cream/40 border-y border-black/5">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="apple-headline text-3xl md:text-5xl text-brand-blue">
                  Por que pais exigentes escolhem a Kalia?
                </h2>
                <p className="apple-subheadline text-lg text-black/60 mt-4 font-medium">
                  Não somos apenas um reforço paliativo. Focamos no desenvolvimento ordenado com bases sólidas.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {pillars.map((pillar, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/90 border border-black/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="space-y-4">
                      <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                        {pillar.icon}
                      </div>
                      <h3 className="text-lg font-bold text-brand-blue">{pillar.title}</h3>
                      <p className="text-sm text-black/70 leading-relaxed font-medium">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
                
                {/* Call to action card inside the grid */}
                <div className="bg-brand-blue text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-gold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-gold">Mude a realidade dos estudos hoje</h3>
                    <p className="text-sm text-white/80 leading-relaxed font-medium">
                      O primeiro passo é totalmente gratuito. Entenda as necessidades reais de seu filho com nossa avaliação.
                    </p>
                  </div>
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="apple-button-liturgical mt-6 text-center w-full !py-3 !text-sm text-brand-blue"
                  >
                    Agendar Avaliação
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Atypical Children Special Section (Neurodiversity) */}
          <section className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Text explanation */}
                <div className="space-y-6 md:space-y-8 text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full">
                    Atenção e Neurodivergência
                  </span>
                  <h2 className="apple-headline text-3xl md:text-5xl text-brand-blue leading-tight">
                    Seu filho tem TDAH, dislexia ou dificuldades de foco?
                  </h2>
                  <p className="apple-subheadline text-lg text-black/75 leading-relaxed font-medium">
                    A escola tradicional, com seu excesso de estímulos e prazos engessados, costuma ser hostil para crianças atípicas. Elas se sentem confusas, gerando ansiedade e baixa autoestima.
                  </p>
                  <p className="text-base text-black/70 leading-relaxed font-medium">
                    O método da Kalia Educacional funciona porque é **ordenado e sem distrações visuais**. Nossos livros clássicos oferecem silêncio cognitivo, permitindo foco profundo na tarefa, acalmando o ritmo hiperativo e auxiliando no processamento de leitura e raciocínio lógico.
                  </p>
                </div>

                {/* Case study: Tomás (styled beautifully like a classic quote card) */}
                <div className="bg-[#fcfaf5] border border-brand-gold/30 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />
                  <div className="text-4xl text-brand-gold font-serif leading-none mb-4">“</div>
                  <p className="font-serif italic text-lg md:text-xl text-brand-blue leading-relaxed mb-6">
                    O Tomás foi diagnosticado com dislexia. Na escola tradicional, ler parecia um desafio impossível, o que destruía sua confiança. Ao iniciar o Programa de Tutoria Kalia e usar o material estruturado, o aprendizado começou a fluir. Hoje ele não apenas lê com fluidez, mas sente orgulho de abrir seus livros. O progresso dele nos ensina que nenhuma mente está fechada ao aprendizado quando ensinada com o método e carinho corretos.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-blue font-bold">
                      T
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-blue">Tomás (Diagnóstico de Dislexia)</h4>
                      <p className="text-xs text-black/50 font-semibold">Aluno do Programa de Tutoria Kalia</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 6. Step-by-Step Program Dynamic */}
          <section className="py-16 md:py-24 bg-brand-cream/40 border-y border-black/5">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <h2 className="apple-headline text-3xl md:text-5xl text-brand-blue mb-16">
                Como funciona o programa na prática?
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 text-left relative">
                {[
                  { step: "01", title: "Avaliação Inicial", desc: "Entendemos exatamente o nível de leitura e matemática do aluno e quais são suas lacunas." },
                  { step: "02", title: "Alocação", desc: "Seu filho é posicionado em um grupo compatível com o nível cognitivo e de idade." },
                  { step: "03", title: "Aulas + Material", desc: "Aulas online dinâmicas ao vivo com tutores e uso de nossas apostilas físicas." },
                  { step: "04", title: "Prática Semanal", desc: "Tarefas rápidas de fixação enviadas para casa para desenvolver autonomia." },
                  { step: "05", title: "Acompanhamento", desc: "Feedbacks periódicos para você ver a evolução nítida a cada módulo." }
                ].map((item, idx) => (
                  <div key={idx} className="relative space-y-3">
                    <div className="text-3xl md:text-4xl font-extrabold text-brand-gold/30 font-serif">
                      {item.step}
                    </div>
                    <h3 className="text-base font-bold text-brand-blue">{item.title}</h3>
                    <p className="text-xs text-black/70 leading-relaxed font-semibold">{item.desc}</p>
                    
                    {/* Visual arrow lines for desktop */}
                    {idx < 4 && (
                      <div className="hidden lg:block absolute top-4 left-[90%] w-full h-[1px] bg-brand-gold/20 -z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FAQ Section */}
          <section className="py-16 md:py-24 max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                Esclareça Suas Dúvidas
              </span>
              <h2 className="apple-headline text-3xl md:text-4xl text-brand-blue mt-4">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-2">
              <FAQItem 
                question="Para qual idade o Programa de Tutoria é recomendado?" 
                answer="Nosso programa atende crianças de 4 a 10 anos, cobrindo a fase de alfabetização e os fundamentos iniciais da matemática."
              />
              <FAQItem 
                question="As aulas online funcionam para crianças pequenas ou com déficit de atenção?" 
                answer="Sim. Pelo fato de trabalharmos com turmas minúsculas, o tutor estabelece uma dinâmica interativa permanente. O material limpo e focado impede o cansaço visual, enquanto atividades rápidas e direcionadas mantêm o foco da criança sem estressá-la."
              />
              <FAQItem 
                question="Como funciona o material didático das aulas?" 
                answer="Utilizamos as apostilas e livros físicos da Kalia Educacional. O cronograma de material é integrado com o plano de aula, e o acesso aos módulos físicos é providenciado aos pais no momento da contratação da tutoria."
              />
              <FAQItem 
                question="Meu filho tem dislexia/TDAH. A tutoria é indicada?" 
                answer="Com certeza. Nossos melhores resultados são com crianças atípicas que necessitam de previsibilidade, ordem no currículo e menos poluição de estímulos visuais na folha para conseguirem focar e reter o aprendizado."
              />
              <FAQItem 
                question="Qual a frequência e duração dos encontros?" 
                answer="As aulas acontecem semanalmente ao vivo, com duração projetada para respeitar o limiar máximo de concentração infantil, variando entre 45 e 50 minutos por sessão."
              />
              <FAQItem 
                question="Preciso acompanhar meu filho durante toda a aula?" 
                answer="Para crianças de 4 a 5 anos, recomendamos auxílio inicial de um adulto apenas para conexão técnica. Para crianças mais velhas, nosso objetivo é o desenvolvimento da autonomia, para que façam a aula de forma independente com o tutor."
              />
            </div>
          </section>

          {/* 8. Final Call to Action Section */}
          <section className="py-20 md:py-32 bg-brand-blue text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-[0.02]" />
            <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
              <h2 className="apple-headline text-3xl sm:text-4xl md:text-5xl text-brand-gold tracking-tight leading-tight">
                Não permita que as dificuldades de hoje se transformem nos bloqueios de amanhã.
              </h2>
              <p className="apple-subheadline text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium">
                Cada mês que passa sem a base pedagógica correta acumula mais lacunas no aprendizado do seu filho. Mude o futuro escolar dele agora.
              </p>
              
              <div className="pt-4 flex flex-col items-center gap-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-button-liturgical !px-10 !py-5 text-base flex items-center justify-center gap-2 text-brand-blue hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Quero Agendar Avaliação no WhatsApp</span>
                </a>
                <p className="text-xs text-white/60 font-semibold tracking-wide">
                  Dê ao seu filho o caminho seguro para aprender com confiança e autonomia.
                </p>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
