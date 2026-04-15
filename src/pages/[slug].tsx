import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { GetStaticProps, GetStaticPaths } from "next";
import { getBookBySlug, getAllBookSlugs } from "@/lib/api";
import { Book, RichTextItem } from "@/lib/types";
import { getPlainText } from "@/lib/utils";
import HeroSection from "@/components/HeroSection";
import AuthorSection from "@/components/AuthorSection";
import Footer from "@/components/Footer";

import IllustrationsSection from "@/components/IllustrationsSection";
import GallerySection from "@/components/GallerySection";
import AudienceSection from "@/components/AudienceSection";
import InteractiveCarouselSection from "@/components/InteractiveCarouselSection";
import SpecsSection from "@/components/SpecsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import StickyCTA from "@/components/StickyCTA";
import OptimizedImage from "@/components/OptimizedImage";

interface BookPageProps {
  book: Book;
}

export default function BookPage({ book }: BookPageProps) {
  if (!book) {
    return <div className="text-center py-20">Livro não encontrado</div>;
  }


  // Helper to resolve asset URLs to public folder
  const resolveAsset = (path?: string | null) => {
    if (!path || path === "undefined") return undefined;
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `/books/${book.slug}/${path}`;
  };

  // Helper to convert hex to HSL for CSS variables compatibility
  const hexToHsl = (hex: string) => {
    if (!hex || !hex.startsWith('#')) return "";
    
    // Remove #
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
  };

  // Map book identity colors to CSS variables
  const dynamicStyles = book.identityColors ? {
    // Component-specific mappings
    '--primary-emphasis-color': hexToHsl(book.identityColors['primary-emphasis-color']),
    '--secondary-emphasis-color': hexToHsl(book.identityColors['secondary-emphasis-color']),
    '--primary-text-color': hexToHsl(book.identityColors['primary-text-color']),
    '--secondary-text-color': hexToHsl(book.identityColors['secondary-text-color']),
    '--primary-background-color': hexToHsl(book.identityColors['primary-background-color']),
    '--secondary-background-color': hexToHsl(book.identityColors['secondary-background-color']),
    
    // Base system mappings for deeper integration (overriding globals)
    '--primary': hexToHsl(book.identityColors['primary-emphasis-color']),
    '--secondary': hexToHsl(book.identityColors['secondary-emphasis-color']),
    '--background': hexToHsl(book.identityColors['primary-background-color']),
    '--foreground': hexToHsl(book.identityColors['primary-text-color']),
    '--brand-gold': hexToHsl(book.identityColors['primary-emphasis-color']),
    '--brand-blue': hexToHsl(book.identityColors['secondary-emphasis-color']),
    '--brand-cream': hexToHsl(book.identityColors['primary-background-color']),
    '--brand-text': hexToHsl(book.identityColors['primary-text-color']),
  } as React.CSSProperties : {};

  return (
    <>
      <Head>
        <title>{`${getPlainText(book.title)} - Kalia Educacional`}</title>
        <meta name="description" content={getPlainText(book.subtitle) || `Conheça ${getPlainText(book.title)}, uma obra da Kalia Educacional.`} />
        <meta name="keywords" content={`${getPlainText(book.title)}, ${book.author.name}, Kalia Educacional, literatura catolica, ${book.type}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="book" />
        <meta property="og:url" content={`https://kaliaeducacional.com.br/${book.urlSlug}`} />
        <meta property="og:title" content={`${getPlainText(book.title)} - Kalia Educacional`} />
        <meta property="og:description" content={getPlainText(book.subtitle)} />
        <meta property="og:image" content={`https://kaliaeducacional.com.br${resolveAsset(book.coverImage)}`} />
        <meta property="og:site_name" content="Kalia Educacional" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${getPlainText(book.title)} - Kalia Educacional`} />
        <meta property="twitter:description" content={getPlainText(book.subtitle)} />
        <meta property="twitter:image" content={`https://kaliaeducacional.com.br${resolveAsset(book.coverImage)}`} />

        {/* Canonical */}
        <link rel="canonical" href={`https://kaliaeducacional.com.br/${book.urlSlug}`} />

        {/* AEO: Structured Data (JSON-LD) - Book */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              "name": getPlainText(book.title),
              "author": {
                "@type": "Person",
                "name": book.author.name
              },
              "publisher": {
                "@type": "Organization",
                "name": "Kalia Educacional"
              },
              "description": getPlainText(book.subtitle),
              "isbn": book.isbn,
              "image": `https://kaliaeducacional.com.br${resolveAsset(book.coverImage)}`,
              "offers": {
                "@type": "Offer",
                "url": book.sellerUrls["amazon-book"] || book.sellerUrls["umlivro-book"] || book.sellerUrls["cedet-book"],
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
        
        {/* AEO: Structured Data (JSON-LD) - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "BreadcrumbList",
               "itemListElement": [
                 {
                   "@type": "ListItem",
                   "position": 1,
                   "name": "Catálogo",
                   "item": "https://kaliaeducacional.com.br/"
                 },
                 {
                   "@type": "ListItem",
                   "position": 2,
                    "name": getPlainText(book.title),
                   "item": `https://kaliaeducacional.com.br/${book.urlSlug}`
                 }
               ]
             })
          }}
        />

        {/* AEO: Structured Data (JSON-LD) - FAQPage */}
        {book.faq?.faq && book.faq.faq.filter(f => f.question?.trim()).length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": book.faq.faq
                  .filter(f => f.question?.trim())
                  .map(f => ({
                    "@type": "Question",
                    "name": f.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": f.answer
                    }
                  }))
              })
            }}
          />
        )}
      </Head>

      <main 
        className="min-h-screen w-full overflow-x-hidden bg-background text-foreground selection:bg-[hsl(var(--primary-emphasis-color))/30]"
        style={dynamicStyles}
      >
        {/* Back to Catalog Button */}
        <div className="fixed top-6 left-6 z-[60] pointer-events-none">
          <Link 
            href="/#catalogo"
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl border border-black/5 rounded-full text-black/60 hover:text-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl group active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-[10px] font-extrabold tracking-widest uppercase">Catálogo</span>
          </Link>
        </div>
        
        {/* Dynamic Sticky CTA */}
        <StickyCTA 
          sellerUrls={book.sellerUrls} 
          bookName={getPlainText(book.title)}
        />
        
        {book.hero && (
          <HeroSection
            title={book.hero.title}
            subtitle={book.hero.subtitle}
            image={resolveAsset(book.hero["image-main"])}
            buttonBuy={book.hero["button-buy"]}
            buttonPreview={book.hero["button-preview"]}
            sellerUrls={book.sellerUrls}
            backgroundTexture={resolveAsset(book.backgroundTexture)}
          />
        )}

        {/* New Vitrine Highlight Section */}
        <section className="py-20 md:py-32 bg-[hsl(var(--primary-background-color))]">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                 <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                 >
                    <h2 className="apple-headline text-4xl md:text-6xl tracking-tight leading-tight">
                       Uma obra de arte em <span className="text-[hsl(var(--primary-emphasis-color))]">cada detalhe.</span>
                    </h2>
                    <p className="apple-subheadline text-xl md:text-2xl text-[hsl(var(--secondary-text-color))] leading-relaxed">
                       {book.presentation?.description || "Desenvolvida com o rigor da tradição clássica e a beleza que a educação cristã merece."}
                    </p>
                    <div className="flex gap-4">
                       <div className="p-4 bg-white shadow-xl rounded-2xl border border-black/5">
                          <p className="text-3xl font-bold text-[hsl(var(--primary-emphasis-color))] mb-1">100%</p>
                          <p className="text-sm font-medium text-[hsl(var(--secondary-text-color))] uppercase tracking-wider">Fidelidade Católica</p>
                       </div>
                       <div className="p-4 bg-white shadow-xl rounded-2xl border border-black/5">
                          <p className="text-3xl font-bold text-[hsl(var(--primary-emphasis-color))] mb-1">A4</p>
                          <p className="text-sm font-medium text-[hsl(var(--secondary-text-color))] uppercase tracking-wider">Tamanho Superior</p>
                       </div>
                    </div>
                 </motion.div>
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                 >
                    <div className="absolute -inset-4 bg-[hsl(var(--primary-emphasis-color))]/10 blur-3xl rounded-full" />
                    <OptimizedImage 
                       src={resolveAsset("vitrine.png") || ""} 
                       alt="Vitrine do Livro" 
                       className="relative z-10 w-full h-auto drop-shadow-3xl rounded-3xl"
                    />
                 </motion.div>
              </div>
           </div>
        </section>
        
        {(() => {
          const validSamples = book.sample?.["list-sample"]?.filter(s => s.image && s.image.trim() !== "") || [];
          if (validSamples.length === 0) return null;
          return (
            <InteractiveCarouselSection 
              title={book.sample?.title}
              subtitle={book.sample?.subtitle}
              listSample={validSamples}
              images={validSamples.map(item => resolveAsset(item.image) || "")}
            />
          );
        })()}
        
        {(() => {
          const validInterior = book.interior?.["list-interior"]?.filter(i => i.image && i.image.trim() !== "") || [];
          if (validInterior.length === 0) return null;
          return (
            <GallerySection 
              title="A Beleza Revelada"
              subtitle="Navegue pelas páginas deste tesouro pedagógico"
              images={validInterior.map(item => resolveAsset(item.image) || "")}
            />
          );
        })()}

        <AuthorSection
          name={book.author.name}
          bio={book.author.bio}
          instagram={book.author.instagram}
          image={resolveAsset(book.author.image) || ""}
          backgroundTexture={resolveAsset(book.backgroundTexture)}
        />

        {book.technical && (
          <SpecsSection 
            title={book.technical.title}
            specs={book.technical.technical}
            backgroundTexture={resolveAsset(book.backgroundTexture)}
          />
        )}

        {(() => {
          const validFaqs = book.faq?.faq?.filter(f => f.question && f.question.trim() !== "") || [];
          if (validFaqs.length === 0) return null;
          return (
            <FAQSection 
              title={book.faq?.title}
              faqs={validFaqs}
            />
          );
        })()}

        {book.finalCTA && (
          <FinalCTASection 
            title={book.finalCTA.title}
            description={book.finalCTA.description}
            buttonText={book.finalCTA["button-buy"]}
            image={resolveAsset(book.finalCTA["image-main"])}
            sellerUrls={book.sellerUrls}
          />
        )}

        <Footer sellerUrls={book.sellerUrls} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllBookSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // 404 if not found
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const rawBook = getBookBySlug(slug);

  if (!rawBook) {
    return {
      notFound: true,
    };
  }

  // Defensive mapping to ensure only serializable and expected properties are passed
  const book = {
    isbn: rawBook.isbn || "",
    title: rawBook.title || "",
    subtitle: rawBook.subtitle || "",
    slug: rawBook.slug || "",
    urlSlug: rawBook.urlSlug || "",
    type: rawBook.type || [],
    categoria: rawBook.categoria || [],
    colecao: rawBook.colecao || null,
    coverImage: rawBook.coverImage || "",
    backgroundTexture: rawBook.backgroundTexture || null,
    identityColors: rawBook.identityColors || null,
    author: {
      name: rawBook.author?.name || "",
      bio: rawBook.author?.bio || "",
      instagram: rawBook.author?.instagram || "",
      image: rawBook.author?.image || ""
    },
    hero: rawBook.hero,
    presentation: rawBook.presentation,
    sample: rawBook.sample,
    interior: rawBook.interior,
    targetAudience: rawBook.targetAudience,
    technical: rawBook.technical,
    faq: rawBook.faq,
    finalCTA: rawBook.finalCTA,
    sellerUrls: rawBook.sellerUrls || {}
  };

  return {
    props: {
      book: JSON.parse(JSON.stringify(book)),
    },
  };
};
