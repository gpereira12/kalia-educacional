import { Lock, Shield } from "lucide-react";
import EditorialLogo from "./EditorialLogo";
import { SellerUrls } from "@/lib/types";

interface FooterProps {
  sellerUrls?: SellerUrls;
}

const Footer = ({ sellerUrls }: FooterProps) => {
  // Build dynamic seller entries — only include sellers with a valid URL
  const sellerEntries = sellerUrls ? [
    { name: "CEDET", url: sellerUrls["cedet-book"] },
    { name: "Amazon", url: sellerUrls["amazon-book"] },
    { name: "Um Livro", url: sellerUrls["umlivro-book"] },
  ].filter(s => s.url && s.url.trim() !== "") : [];

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 px-6 overflow-hidden border-t border-white/5">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40vw] h-48 bg-brand-gold/5 blur-[100px] rounded-full" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Brand Identity Section */}
        <div className="flex flex-col items-center space-y-6 mb-16 text-center">
          <img 
            src="/logo-transparent.svg" 
            alt="Kalia Educacional" 
            className="h-16 w-auto brightness-0 invert" 
          />
          <div className="space-y-2">
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.5em] text-white/60 italic flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0">
              <span>Bondade</span>
              <span className="text-secondary/60 mx-0 md:mx-3">•</span>
              <span>Beleza</span>
              <span className="text-secondary/60 mx-0 md:mx-3">•</span>
              <span>Verdade</span>
            </p>
          </div>
        </div>
        
        {/* Partner Bookstores Section removed as requested - No products yet */}

        {/* Legal & Copyright Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-white/50">
          <div className="flex items-center gap-6">
            <p className="text-xs uppercase tracking-[0.1em]">
               Kalia Educacional
            </p>
          </div>
          
          <p className="text-xs tracking-[0.05em] text-center md:text-right text-white/50">
            © {new Date().getFullYear()} Kalia Educacional. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
