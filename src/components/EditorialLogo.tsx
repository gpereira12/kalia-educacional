import React from 'react';
import { cn } from "@/lib/utils";

export const getBranding = (variant: 'light' | 'dark' = 'dark') => {
  return {
    logo: "/logo-kalia.svg",
    name: "Kalia Educacional",
    color: "#1B365D"
  };
};

interface EditorialLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'lg' | 'xl';
  noBg?: boolean;
}

const EditorialLogo = ({ 
  className = "", 
  variant = 'dark',
  size = 'sm',
  noBg = false
}: EditorialLogoProps) => {
  const branding = getBranding(variant);

  const sizeClasses = {
    sm: 'w-10 h-10',
    lg: 'w-14 h-14 md:w-18 md:h-18',
    xl: 'w-20 h-20 md:w-24 md:h-24'
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative group">
        <div 
          className={cn(
            "shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
            sizeClasses[size],
            !noBg && 'rounded-full border border-black/5 bg-white shadow-sm'
          )}
        >
          <div 
            className={cn(noBg ? 'w-full h-full' : 'w-[60%] h-[60%]', "transition-colors duration-300")}
            style={{ 
              maskImage: `url(${branding.logo})`,
              maskSize: 'contain',
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
              backgroundColor: noBg && variant === 'light' ? 'white' : branding.color,
              // @ts-ignore - Webkit prefix for older browsers
              WebkitMaskImage: `url(${branding.logo})`,
              WebkitMaskSize: 'contain',
              WebkitMaskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat'
            }}
          />
        </div>
      </div>
      
      {!noBg && (
        <span className={cn(
          "select-none",
          variant === 'light' ? 'text-white/30' : 'text-black/15',
          size === 'xl' ? 'text-lg md:text-xl' : size === 'lg' ? 'text-base md:text-lg' : 'text-xs md:text-sm'
        )}>|</span>
      )}

      <span className={cn(
        "font-bold uppercase tracking-[0.3em] leading-tight transition-colors duration-300",
        variant === 'light' ? 'text-white' : 'text-black/60',
        size === 'xl' ? 'text-sm md:text-base lg:text-lg' : size === 'lg' ? 'text-xs md:text-sm lg:text-base' : 'text-[10px] md:text-xs'
      )}>
        {branding.name}
      </span>
    </div>
  );
};

export default EditorialLogo;
