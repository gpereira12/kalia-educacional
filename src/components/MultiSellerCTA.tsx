import React, { useState } from "react";
import StoreIcon from "./StoreIcon";
import { SellerUrls } from "@/lib/types";

interface MultiSellerCTAProps {
  sellerUrls: SellerUrls;
  primaryButtonText?: string;
  className?: string;
}

const MultiSellerCTA = ({ 
  sellerUrls, 
  className = "" 
}: MultiSellerCTAProps) => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  // Group sellers by vendor
  const getSellers = (vendor: string) => {
    const vol1 = sellerUrls[`${vendor}-book`] || sellerUrls[`${vendor}-ebook`];
    const vol2 = sellerUrls[`${vendor}-book-2`] || sellerUrls[`${vendor}-ebook-2`];
    
    if (!vol1 && !vol2) return null;
    
    return {
      id: vendor,
      label: vendor.charAt(0).toUpperCase() + vendor.slice(1),
      vol1,
      vol2
    };
  };

  const vendors = ["amazon", "umlivro", "cedet"]
    .map(v => getSellers(v))
    .filter((v): v is NonNullable<typeof v> => v !== null);

  const isDualVolume = vendors.some(v => v.vol2);

  const renderStoreButton = (vendor: any) => (
    <div key={vendor.id} className={`relative ${selectedStore === vendor.id ? "z-[50]" : "z-10"}`}>
      <button
        onClick={() => {
          if (isDualVolume && vendor.vol2) {
            setSelectedStore(selectedStore === vendor.id ? null : vendor.id);
          } else {
            window.open(vendor.vol1, "_blank");
          }
        }}
        className={`group/btn relative flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-full transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1 overflow-hidden bg-white/80 backdrop-blur-md text-[hsl(var(--secondary-emphasis-color))] border border-[hsl(var(--secondary-emphasis-color))]/20 w-full`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/5 to-black/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
        <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-black/5 shrink-0 transition-all duration-500 group-hover/btn:scale-110">
          <StoreIcon store={vendor.id as any} className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
        </div>
        <div className="relative flex flex-col items-start min-w-0">
          <span className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1 text-black/60">
            {isDualVolume && vendor.vol2 ? "Ver volumes na" : "Comprar na"}
          </span>
          <span className="text-xs sm:text-sm md:text-base font-bold truncate w-full tracking-tight text-black/90">{vendor.label}</span>
        </div>
        {isDualVolume && vendor.vol2 && (
          <div className={`ml-auto transition-transform duration-300 ${selectedStore === vendor.id ? "rotate-180" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        )}
      </button>

      {/* Popover */}
      {selectedStore === vendor.id && (
        <>
          <div 
            className="fixed inset-0 z-[40]" 
            onClick={() => setSelectedStore(null)} 
          />
          <div className="absolute top-full left-0 right-0 mt-3 p-3 bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-black/5 z-[41] animate-in fade-in zoom-in-95 duration-300 origin-top">
            <div className="flex flex-col gap-2">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 px-3 mb-1">Escolha o Volume</div>
              
              {vendor.vol1 && (
                <a
                  href={vendor.vol1}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-full bg-[hsl(var(--secondary-emphasis-color))] text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
                    <StoreIcon store={vendor.id as any} className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black uppercase tracking-wider opacity-60 leading-none mb-0.5">Disponível</span>
                    <span className="text-xs font-bold leading-tight">CONJUNTO (TEXTO)</span>
                  </div>
                </a>
              )}

              {vendor.vol2 && (
                <a
                  href={vendor.vol2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-full bg-white border border-black/5 text-black/80 transition-all hover:bg-black/5 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 shrink-0">
                    <StoreIcon store={vendor.id as any} className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black uppercase tracking-wider opacity-40 leading-none mb-0.5">Opcional</span>
                    <span className="text-xs font-bold leading-tight">SOMENTE GRAVURAS</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const availableSellers = vendors.map(v => ({ id: v.id, url: v.vol1!, label: v.label }));
  
  if (availableSellers.length === 0) return null;

  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 w-full ${className} animate-fade-in`}>
      {vendors.map(vendor => renderStoreButton(vendor))}
    </div>
  );
};

export default MultiSellerCTA;
