import { useEffect, useState } from "react";
import StoreIcon from "./StoreIcon";
import { SellerUrls, EditorialLabel } from "@/lib/types";
import { getBranding } from "./EditorialLogo";

interface StickyCTAProps {
  sellerUrls: SellerUrls;
  bookName?: string;
  editorialLabel?: EditorialLabel;
}

const StickyCTA = ({ sellerUrls, bookName = "Livro", editorialLabel = "Kalia Educacional" }: StickyCTAProps) => {
  const branding = getBranding(editorialLabel, 'light');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  // Group sellers by vendor
  const getSellers = (vendor: string) => {
    const vol1 = sellerUrls[`${vendor}-book`] || sellerUrls[`${vendor}-ebook`];
    const vol2 = sellerUrls[`${vendor}-book-2`] || sellerUrls[`${vendor}-ebook-2`];
    if (!vol1 && !vol2) return null;
    return { id: vendor, label: vendor.charAt(0).toUpperCase() + vendor.slice(1), vol1, vol2 };
  };

  const vendors = ["amazon", "umlivro", "cedet"]
    .map(v => getSellers(v))
    .filter((v): v is NonNullable<typeof v> => v !== null);

  const isDualVolume = vendors.some(v => v.vol2);
  const primarySeller = vendors[0];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerHeight = 400;
      
      const shouldShow = scrollPosition > heroHeight * 0.8;
      const isNearFooter = scrollPosition + windowHeight > documentHeight - footerHeight;
      
      setIsVisible(shouldShow && !isNearFooter);
      if (!shouldShow || isNearFooter) {
        setShowOptions(false);
        setSelectedStore(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!primarySeller) return null;

  const renderSellerButtons = (isCompact = false) => {
    if (isDualVolume && selectedStore) {
      const vendor = vendors.find(v => v.id === selectedStore);
      if (!vendor) return null;

      return (
        <div className="flex flex-col gap-2 animate-fade-in">
          <button 
            onClick={() => setSelectedStore(null)}
            className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black/40 hover:text-black/60 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Voltar
          </button>
          {[
            { url: vendor.vol1, label: "Volume 1 (Texto)", isPrimary: true },
            { url: vendor.vol2, label: "Volume 2 (Gravuras)", isPrimary: false }
          ].filter(v => v.url).map((vol, idx) => (
            <a
              key={idx}
              href={vol.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-3 rounded-full transition-all duration-300 border ${
                vol.isPrimary 
                  ? "bg-[hsl(var(--secondary-emphasis-color))] text-white border-transparent shadow-md" 
                  : "bg-black/5 text-black border-transparent hover:bg-black/10 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm shrink-0">
                <StoreIcon store={vendor.id as any} className="w-4 h-4 text-black" />
              </div>
              <div className="flex flex-col">
                <span className={`text-[8px] font-black uppercase tracking-wider leading-none mb-1 ${vol.isPrimary ? "text-white/60" : "text-black/40"}`}>Comprar</span>
                <span className={`text-xs font-bold leading-tight ${vol.isPrimary ? "text-white" : "text-black/80"}`}>{vol.label}</span>
              </div>
            </a>
          ))}
        </div>
      );
    }

    return vendors.map((vendor) => (
      <button
        key={vendor.id}
        onClick={() => {
          if (isDualVolume && vendor.vol2) {
            setSelectedStore(vendor.id);
          } else {
            window.open(vendor.vol1, "_blank");
          }
        }}
        className={`group/btn relative flex items-center gap-3 p-3 rounded-full transition-all duration-300 bg-black/5 border border-transparent hover:border-black/10 hover:bg-black/10 shadow-sm ${isCompact ? "justify-center" : ""}`}
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm border border-black/5 shrink-0 transition-transform duration-500 group-hover/btn:scale-110">
          <StoreIcon store={vendor.id as any} className="w-4 h-4 text-black" />
        </div>
        {!isCompact && (
          <div className="flex flex-col items-start min-w-0">
            <span className="text-black/40 text-[8px] font-black uppercase tracking-wider leading-none mb-1">
              {isDualVolume && vendor.vol2 ? "Ver volumes na" : "Loja"}
            </span>
            <span className="text-black/80 text-xs font-bold truncate leading-tight">{vendor.label}</span>
          </div>
        )}
      </button>
    ));
  };

  // Mobile version
  if (isMobile) {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {showOptions && vendors.length > 0 && (
          <div className="bg-white/95 backdrop-blur-xl border-t border-black/5 p-4 animate-fade-in-up">
            <div className="text-[hsl(var(--secondary-text-color))] text-[10px] font-bold uppercase tracking-widest mb-3 px-2">
              {isDualVolume && selectedStore ? `Opções na ${selectedStore.charAt(0).toUpperCase() + selectedStore.slice(1)}` : "Opções de Compra"}
            </div>
            <div className={`grid ${isDualVolume && selectedStore ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
              {renderSellerButtons()}
            </div>
          </div>
        )}
        
        <div className="bg-[hsl(var(--secondary-emphasis-color))] backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center justify-between gap-3 border-t border-white/10">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-black/5">
              <div 
                className="w-6 h-6"
                style={{ 
                  maskImage: `url("${branding.logo}")`,
                  maskSize: 'contain',
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat',
                  backgroundColor: branding.color,
                  // @ts-ignore
                  WebkitMaskImage: `url("${branding.logo}")`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat'
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-primary-foreground text-[8px] font-black uppercase tracking-wider opacity-60 leading-none mb-1">Obra Disponível</span>
              <span className="text-primary-foreground text-xs font-bold truncate leading-tight">{bookName}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowOptions(!showOptions);
                if (showOptions) setSelectedStore(null);
              }}
              className="inline-flex items-center justify-center rounded-full bg-white text-[hsl(var(--secondary-emphasis-color))] px-6 py-2.5 text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              {showOptions ? "Fechar" : "Comprar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="relative group">
        {vendors.length > 0 && (
          <div className={`absolute bottom-full right-0 mb-4 bg-white/95 backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border border-black/5 min-w-[220px] transition-all duration-300 origin-bottom-right ${showOptions ? "scale-100 opacity-100 visible" : "scale-90 opacity-0 invisible"}`}>
            <div className="text-black/40 text-[9px] font-black uppercase tracking-[0.2em] mb-3 px-3">
              {isDualVolume && selectedStore ? `Opções na ${selectedStore.charAt(0).toUpperCase() + selectedStore.slice(1)}` : "Onde Adquirir"}
            </div>
            <div className="flex flex-col gap-2">
              {renderSellerButtons()}
            </div>
          </div>
        )}

        <div className="bg-[hsl(var(--secondary-emphasis-color))] backdrop-blur-xl rounded-full px-5 py-3.5 flex items-center gap-4 shadow-[0_8px_30_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all duration-300 border border-white/10 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md border border-black/5">
              <div 
                className="w-8 h-8"
                style={{ 
                  maskImage: `url("${branding.logo}")`,
                  maskSize: 'contain',
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat',
                  backgroundColor: branding.color,
                  // @ts-ignore
                  WebkitMaskImage: `url("${branding.logo}")`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat'
                }}
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-primary-foreground text-[10px] opacity-70 leading-none mb-1">Garanta o seu</span>
              <span className="text-primary-foreground text-sm font-bold whitespace-nowrap leading-none">
                {bookName}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowOptions(!showOptions);
                if (showOptions) setSelectedStore(null);
              }}
              className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--primary-background-color))] text-[hsl(var(--secondary-emphasis-color))] px-7 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg whitespace-nowrap"
            >
              {showOptions ? "Fechar" : "Comprar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
