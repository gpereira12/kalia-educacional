import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getPlainText } from "@/lib/utils";

interface BookCatalogCardProps {
  book: {
    isbn: string;
    title: any;
    subtitle: any;
    slug: string;
    urlSlug: string;
    categoria: string[];
    colecao: string | null;
    nivel: string | null;
    coverImage: string;
  };
}

const normalizeColecao = (colecao: string | null): string => {
  if (!colecao) return "";
  return colecao
    .replace("Fundamental 1", "Fundamental I")
    .replace("Fundamental 2", "Fundamental II");
};

const getLevelBadge = (colecao: string | null): { label: string; className: string } | null => {
  const normalized = normalizeColecao(colecao);
  if (normalized.includes("Fundamental II")) {
    return {
      label: "Fundamental II",
      className: "bg-violet-600/90 text-white border-violet-400/30",
    };
  }
  if (normalized.includes("Fundamental I")) {
    return {
      label: "Fundamental I",
      className: "bg-blue-600/90 text-white border-blue-400/30",
    };
  }
  if (normalized.includes("Infantil")) {
    return {
      label: "Infantil",
      className: "bg-emerald-600/90 text-white border-emerald-400/30",
    };
  }
  return null;
};

const BookCatalogCard = ({ book }: BookCatalogCardProps) => {
  const title = getPlainText(book.title);
  const badge = getLevelBadge(book.colecao);

  return (
    <Link href={`/${book.urlSlug}`}>
      <motion.div
        layout
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="group relative flex flex-col h-full bg-white/40 backdrop-blur-md rounded-[20px] p-1.5 border border-black/5 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
      >
        {/* Mockup Image Container */}
        <div className="relative aspect-[16/9] rounded-[14px] overflow-hidden bg-black/5 mb-2">
          {book.coverImage ? (
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={`/books/${book.slug}/${book.coverImage}`}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-black/10" />
            </div>
          )}

          {/* Level Badge */}
          {badge && (
            <div
              className={`absolute top-2 left-2 px-2 py-0.5 rounded-full backdrop-blur-sm border text-[9px] font-black tracking-widest uppercase shadow-md ${badge.className}`}
            >
              {badge.label}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 px-1 pb-1.5 flex flex-col justify-center text-center">
          <h3 className="text-[11px] font-serif text-primary leading-tight group-hover:text-secondary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCatalogCard;
