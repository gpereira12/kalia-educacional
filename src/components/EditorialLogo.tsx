import React from 'react';

export type EditorialLabel = "Companhia de Jesus" | "Ílios Editorial" | "Edições Coala" | "Crônicas de Eldoria";

interface EditorialLogoProps {
  label: EditorialLabel | string;
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'lg' | 'xl';
  noBg?: boolean;
}

const normalizeLabel = (label: string) => {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

export const getBranding = (label: string, variant: 'light' | 'dark' = 'dark') => {
  const normalizedLabel = normalizeLabel(label || "");
  
  if (normalizedLabel.includes("ilios")) {
    return {
      logo: "/ilios/logo.svg",
      name: "Ílios Editorial",
      color: "#B68F49"
    };
  }
  
  if (normalizedLabel.includes("coala")) {
    return {
      logo: "/coala/logo.svg",
      name: "Edições Coala",
      color: "#8C8C8C"
    };
  }
  
  if (normalizedLabel.includes("eldoria")) {
    return {
      logo: "/eldoria/logo-dragao.svg",
      name: "Crônicas de Eldoria",
      color: "#8B4513"
    };
  }

  if (normalizedLabel.includes("kalia")) {
    return {
      logo: "/logo-transparent.svg",
      name: "Kalia Educacional",
      color: "#1B365D"
    };
  }

  // Default to Companhia de Jesus
  return {
    logo: variant === 'light' ? "/cia-de-jesus/logo_light.svg" : "/cia-de-jesus/logo_transparent.svg",
    name: "Editora Companhia de Jesus",
    color: "#1B365D"
  };
};


const EditorialLogo = ({ 
  label, 
  className = "", 
  variant = 'dark',
  size = 'sm',
  noBg = false
}: EditorialLogoProps) => {
  const branding = getBranding(typeof label === 'string' ? label : label, variant);

  const sizeClasses = {
    sm: 'w-10 h-10',
    lg: 'w-14 h-14 md:w-18 md:h-18',
    xl: 'w-20 h-20 md:w-24 md:h-24'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group">
        <div 
          className={`shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${sizeClasses[size]} ${
            noBg ? '' : 'rounded-full border border-black/5 bg-white shadow-sm'
          }`}
        >
          <div 
            className={`${noBg ? 'w-full h-full' : 'w-[60%] h-[60%]'} transition-colors duration-300`}
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
      {/* Vertical divider — only in inline (hero) mode, not footer */}
      {!noBg && (
        <span className={`${
          variant === 'light' ? 'text-white/30' : 'text-black/15'
        } ${
          size === 'xl' ? 'text-lg md:text-xl' : size === 'lg' ? 'text-base md:text-lg' : 'text-xs md:text-sm'
        } select-none`}>|</span>
      )}

      <span className={`font-bold uppercase tracking-[0.3em] leading-tight transition-colors duration-300 ${
        variant === 'light' ? 'text-white' : 'text-black/60'
      } ${
        size === 'xl' ? 'text-sm md:text-base lg:text-lg' : size === 'lg' ? 'text-xs md:text-sm lg:text-base' : 'text-[10px] md:text-xs'
      }`}>
        {branding.name}
      </span>
    </div>
  );
};

export default EditorialLogo;
