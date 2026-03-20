import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

import { RichTextItem } from "@/lib/types";
import { getPlainText } from "@/lib/utils";

interface BookCardProps {
  isbn: string;
  title: string | RichTextItem[];
  slug: string;
  imageUrl?: string;
}

const BookCard = ({ isbn, title, slug, imageUrl }: BookCardProps) => {

  const plainTitle = getPlainText(title);
  
  return (
    <Link href={`/${slug}`} className="group block h-full">
      <div className="relative h-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-black/5 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
        <div className="aspect-square overflow-hidden relative bg-black/5">
          <OptimizedImage
            src={imageUrl || "/cia-de-jesus/sem-imagem.png"}
            alt={plainTitle}
            aspectRatio="1/1"
            fallbackSrc="/cia-de-jesus/sem-imagem.png"

            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-semibold text-black/80 leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {plainTitle}
          </h3>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
              Conferir
            </span>
            <div className="h-px flex-1 bg-primary/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
