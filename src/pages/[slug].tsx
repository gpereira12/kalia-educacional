import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
        <title>{`${getPlainText(book.title)} - ${book.seloEditorial}`}</title>
        <meta name="description" content={getPlainText(book.subtitle) || `Conheça ${getPlainText(book.title)}, uma obra da ${book.seloEditorial}.`} />
        <meta name="keywords" content={`${getPlainText(book.title)}, ${book.author.name}, ${book.seloEditorial}, literatura catolica, ${book.type}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="book" />
        <meta property="og:url" content={`https://catalogo.editoraciadejesus.com.br/${book.urlSlug}`} />
        <meta property="og:title" content={`${getPlainText(book.title)} - ${book.seloEditorial}`} />
        <meta property="og:description" content={getPlainText(book.subtitle)} />
        <meta property="og:image" content={`https://catalogo.editoraciadejesus.com.br${resolveAsset(book.coverImage)}`} />
        <meta property="og:site_name" content={book.seloEditorial} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${getPlainText(book.title)} - ${book.seloEditorial}`} />
        <meta property="twitter:description" content={getPlainText(book.subtitle)} />
        <meta property="twitter:image" content={`https://catalogo.editoraciadejesus.com.br${resolveAsset(book.coverImage)}`} />

        {/* Canonical */}
        <link rel="canonical" href={`https://catalogo.editoraciadejesus.com.br/${book.urlSlug}`} />

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
                "name": book.seloEditorial
              },
              "description": getPlainText(book.subtitle),
              "isbn": book.isbn,
              "image": `https://catalogo.editoraciadejesus.com.br${resolveAsset(book.coverImage)}`,
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
                   "item": "https://catalogo.editoraciadejesus.com.br/"
                 },
                 {
                   "@type": "ListItem",
                   "position": 2,
                    "name": getPlainText(book.title),
                   "item": `https://catalogo.editoraciadejesus.com.br/${book.urlSlug}`
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
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-black/10 rounded-full text-black/80 hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-sm font-medium tracking-tight">Catálogo</span>
          </Link>
        </div>
        
        {/* Dynamic Sticky CTA */}
        <StickyCTA 
          sellerUrls={book.sellerUrls} 
          bookName={getPlainText(book.title)}
          editorialLabel={book.seloEditorial}
        />
        
        {book.hero && (
          <HeroSection
            title={book.hero.title}
            subtitle={getPlainText(book.hero.subtitle)}
            image={resolveAsset(book.hero["image-main"])}
            buttonBuy={book.hero["button-buy"]}
            buttonPreview={book.hero["button-preview"]}
            sellerUrls={book.sellerUrls}
            backgroundTexture={resolveAsset(book.backgroundTexture)}
            seloEditorial={book.seloEditorial}
          />
        )}

        {book.presentation && book.presentation["image-main"] && book.presentation.title && (
          <IllustrationsSection 
            title={book.presentation.title}
            description={book.presentation.description}
            image={resolveAsset(book.presentation["image-main"])}
          />
        )}
        
        {(() => {
          const validSamples = book.sample?.["list-sample"]?.filter(s => s.image && s.image.trim() !== "") || [];
          if (validSamples.length === 0) return null;
          return (
            <InteractiveCarouselSection 
              title={book.sample?.title}
              subtitle={book.sample?.subtitle}
              listSample={validSamples}
              images={validSamples.map(item => resolveAsset(item.image) || "")}
              backgroundImage={resolveAsset(book.coverImage)}
            />
          );
        })()}
        
        {(() => {
          const validInterior = book.interior?.["list-interior"]?.filter(i => i.image && i.image.trim() !== "") || [];
          if (validInterior.length === 0) return null;
          return (
            <GallerySection 
              title={book.interior?.title}
              subtitle={book.interior?.subtitle}
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

        {book.targetAudience && (
          <AudienceSection 
            title={book.targetAudience.title}
            image={resolveAsset(book.targetAudience.image)}
            audiences={book.targetAudience["target-list"]}
            backgroundTexture={resolveAsset(book.backgroundTexture)}
          />
        )}

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
            image={resolveAsset(book.finalCTA["image-main"]) || resolveAsset("mockups_3d/foto_catalogo.avif")}
            sellerUrls={book.sellerUrls}
            editorialLabel={book.seloEditorial}
          />
        )}

        <Footer seloEditorial={book.seloEditorial} sellerUrls={book.sellerUrls} />
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
  const book = getBookBySlug(slug);

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};
