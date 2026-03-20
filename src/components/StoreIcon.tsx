import React from "react";
import OptimizedImage from "./OptimizedImage";

interface StoreIconProps {
  store: "amazon" | "umlivro" | "cedet";
  className?: string;
}

const StoreIcon = ({ store, className = "w-5 h-5" }: StoreIconProps) => {
  switch (store) {
    case "amazon":
      return (
        <OptimizedImage 
          src="/Amazon_icon.svg" 
          alt="Amazon" 
          className={className} 
          fallbackSrc="/cia-de-jesus/sem-imagem.png"
        />
      );
    case "umlivro":
      return (
        <OptimizedImage 
          src="/umlivro_icon.png" 
          alt="UmLivro" 
          className={`${className} object-contain`} 
          fallbackSrc="/cia-de-jesus/sem-imagem.png"
        />
      );
    case "cedet":
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className={className}
        >
          <path d="M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export default StoreIcon;

