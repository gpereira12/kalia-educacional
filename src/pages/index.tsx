import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { BookOpen, Menu } from "lucide-react";
import Footer from "@/components/Footer";
import Hero from "@/components/catalog/Hero";
import CreatorsSection from "@/components/catalog/CreatorsSection";
import Differentiators from "@/components/catalog/Differentiators";
import PremiumBackground from "@/components/catalog/PremiumBackground";
import CatalogSearch from "@/components/catalog/CatalogSearch";
import CatalogSection from "@/components/catalog/CatalogSection";
import { getAllBooks } from "@/lib/api";

interface IndexProps {
  catalogBooks: {
    isbn: string;
    title: any;
    subtitle: any;
    slug: string;
    urlSlug: string;
    type: string[];
    categoria: string[];
    colecao: string | null;
    coverImage: string;
    author: {
      name: string;
    };
  }[];
}

export default function Index({ catalogBooks }: IndexProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scroll handling
      let ticking = false;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Kalia Educacional - Uma Educação para o Bem, o Belo e a Verdade</title>
        <meta
          name="description"
          content="A Kalia Educacional oferece materiais pedagógicos sólidos e ordenados, inspirando crianças ao aprendizado virtuoso através da lógica e da beleza clássica."
        />
        <meta name="keywords" content="Kalia Educacional, educação infantil, formação de virtudes, material pedagógico, artes liberais, educação clássica" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kaliaeducacional.com.br/" />
        <meta property="og:title" content="Kalia Educacional - Solidez e Criatividade na Educação" />
        <meta property="og:description" content="Materiais concebidos em blocos coesos para uma educação ordenada e restauradora." />
        <meta property="og:image" content="/logo-kalia.png" />
        <meta property="og:site_name" content="Kalia Educacional" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kaliaeducacional.com.br/" />
        <meta property="twitter:title" content="Kalia Educacional | Educação para o Belo" />
        <meta property="twitter:description" content="A fortaleza segura do aprendizado, edificada bloco a bloco." />
        <meta property="twitter:image" content="/logo-kalia.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://kaliaeducacional.com.br/" />

        {/* AEO: Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kalia Educacional",
              "url": "https://kaliaeducacional.com.br/",
              "logo": "https://kaliaeducacional.com.br/logo-kalia.svg",
              "description": "Instituição dedicada a preencher as lacunas da educação infantil com ordem, estabilidade e clareza.",
              "sameAs": [
                "https://www.instagram.com/kaliaeducacional/"
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-transparent selection:bg-primary/20">
        <PremiumBackground />
        
        <header 
          className={`fixed w-full top-0 left-0 z-50 transition-all duration-500 border-b ${
            isScrolled 
              ? "bg-white/80 backdrop-blur-xl border-black/5 py-1.5 shadow-lg" 
              : "bg-transparent border-transparent py-2"
          }`}
        >
          <div className="container mx-auto px-4 py-2 relative z-10">
            <div className="flex items-center justify-between gap-8 relative">
              <Link href="/" className="group flex items-center gap-3 relative z-20">
                <div className="relative">
                  <img 
                    src="/logo-kalia.svg" 
                    alt="Kalia Educacional" 
                    width="160"
                    height="40"
                    className="h-10 w-auto transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full max-w-xl z-10 pointer-events-none">
                <div className="w-full pointer-events-auto">
                  <CatalogSearch books={catalogBooks as any} isScrolled={isScrolled} />
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-20">
                <div className="h-6 w-px bg-black/10 hidden md:block" />
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 hidden lg:block ${
                  isScrolled ? "text-black/60" : "text-brand-text/60"
                }`}>
                  Kalia {new Date().getFullYear()}
                </span>
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Abrir menu"
                  className={`md:hidden p-2 rounded-full border transition-colors ${
                    isScrolled 
                      ? "bg-black/5 border-black/10 text-black/70" 
                      : "bg-black/5 border-black/10 text-brand-text/70"
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          <Hero />
          
          <div id="catalogo" className="container mx-auto px-4 py-20 md:py-32">
            <CatalogSection books={catalogBooks} />
          </div>
 
          <CreatorsSection />
          <Differentiators />
        </main>
 
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allBooks = getAllBooks();
  
  const catalogBooks = allBooks.map((book) => {
    return {
      isbn: book.isbn || "",
      title: book.title || "",
      subtitle: book.subtitle || "",
      slug: book.slug || "",
      urlSlug: book.urlSlug || "",
      type: book.type || [],
      categoria: book.categoria || [],
      colecao: book.colecao || null,
      nivel: book.nivel || null,
      coverImage: book.coverImage || "",
      author: {
        name: book.author?.name || ""
      }
    };
  });

  return {
    props: {
      catalogBooks: JSON.parse(JSON.stringify(catalogBooks)),
    },
  };
}
