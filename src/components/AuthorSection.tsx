import OptimizedImage from "./OptimizedImage";
import { Instagram } from "lucide-react";

interface AuthorSectionProps {
  name: string;
  bio: string;
  instagram: string;
  image: string;
  backgroundTexture?: string;
}

const AuthorSection = ({ name, bio, instagram, image, backgroundTexture }: AuthorSectionProps) => {
  if (!name || !image || image.includes('placeholder')) return null;

  return (
    <section className="min-h-screen w-full flex items-center bg-[hsl(var(--primary-background-color))] relative overflow-hidden py-20 px-4">
      {/* Premium Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--secondary-emphasis-color))]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(var(--primary-emphasis-color))]/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      
      {/* Paper texture overlay - Optional and Dynamic */}
      {backgroundTexture && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <OptimizedImage 
            src={backgroundTexture} 
            alt="" 
            className="w-full h-full object-cover" 
          />
        </div>
      )}

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Outer Glow/Ring */}
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--secondary-emphasis-color))]/20 to-transparent rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60" />
              
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-hidden rounded-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white/80 transition-transform duration-700 group-hover:scale-[1.02]">
                <OptimizedImage
                  src={image || "/placeholder-author.jpg"} 
                  alt={name}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--secondary-emphasis-color))] text-white px-10 py-3 rounded-full shadow-[0_15px_30px_-5px_hsl(var(--secondary-emphasis-color)/0.3)] border border-white/20 transform transition-all duration-500 group-hover:-translate-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Conheça o Autor</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12 text-center lg:text-left space-y-10">
            <div className="space-y-4">
              <p className="text-[hsl(var(--secondary-emphasis-color))] font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs opacity-70">
                Liderança & Visão
              </p>
              <h2 className="apple-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[hsl(var(--primary-text-color))] tracking-tight">
                {name}
              </h2>
              <div className="h-0.5 w-32 bg-[hsl(var(--secondary-emphasis-color))] mx-auto lg:mx-0 opacity-40" />
            </div>

            <p className="apple-subheadline text-lg sm:text-xl md:text-2xl text-[hsl(var(--secondary-text-color))] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light italic">
              "{bio}"
            </p>

            {instagram && (
              <div className="pt-6">
                <a 
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-6 px-10 py-5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 rounded-3xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--secondary-emphasis-color))]/10 flex items-center justify-center text-[hsl(var(--secondary-emphasis-color))] transition-all duration-500 group-hover:bg-[hsl(var(--secondary-emphasis-color))] group-hover:text-white group-hover:rotate-[10deg]">
                    <Instagram className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--secondary-text-color))] opacity-60">Siga no Instagram</span>
                    <span className="font-bold text-xl text-[hsl(var(--primary-text-color))] tracking-tight">@{instagram.replace('@', '')}</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;
