import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, BookOpen, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, RichTextItem } from "@/lib/types";
import { getPlainText } from "@/lib/utils";
import Link from "next/link";

interface CatalogSearchProps {
  books: Book[];
  isScrolled?: boolean;
  dropUp?: boolean;
}

const CatalogSearch = ({ books, isScrolled, dropUp = false }: CatalogSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);


  // Debounce logic (200ms)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const results = debouncedTerm.trim() === "" 
    ? [] 
    : books.filter(book => {
        const title = getPlainText(book.title).toLowerCase();
        const search = debouncedTerm.toLowerCase();
        return (
          title.includes(search) ||
          book.author.name.toLowerCase().includes(search) ||
          book.type.join(", ").toLowerCase().includes(search) ||
          book.categoria.join(", ").toLowerCase().includes(search)
        );
      }).slice(0, 5); // Limit to top 5 results for clarity

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full group">
      <div className="relative flex items-center">
        <Search className={`absolute left-4 w-4 h-4 transition-colors duration-300 ${
          isFocused 
            ? isScrolled ? "text-primary" : "text-brand-gold" 
            : "text-brand-text/40 group-hover:text-brand-text/60" 
        }`} />
        <input
          type="text"
          placeholder="Encontrar uma obra..."
          value={searchTerm}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full h-10 pl-11 pr-10 rounded-full border text-[16px] md:text-sm focus:outline-none transition-all duration-300 shadow-sm ${
            isFocused 
              ? isScrolled
                ? "border-primary/40 bg-white/70 ring-4 ring-primary/5 text-brand-text shadow-md" 
                : "border-brand-gold/40 bg-white/40 ring-4 ring-brand-gold/10 text-brand-text shadow-md"
              : isScrolled
                ? "bg-white/60 border-black/10 text-brand-text placeholder:text-brand-text/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                : "bg-black/5 border-black/10 text-brand-text placeholder:text-brand-text/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
          }`}
        />
        <AnimatePresence>
          {(searchTerm || isLoading) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3"
            >
              {isLoading ? (
                <Loader2 className={`w-3.5 h-3.5 animate-spin ${isScrolled ? "text-brand-text/40" : "text-brand-text/40"}`} />
              ) : (
                <button
                  onClick={() => setSearchTerm("")}
                  className={`p-1 rounded-full transition-colors ${
                    isScrolled ? "hover:bg-black/5" : "hover:bg-white/10"
                  }`}
                >
                  <X className={`w-3.5 h-3.5 ${isScrolled ? "text-brand-text/40" : "text-brand-text/40"}`} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isFocused && debouncedTerm.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? -10 : 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? -10 : 10, scale: 0.98 }}
            className={`absolute ${dropUp ? "bottom-full mb-3" : "top-full mt-3"} left-0 right-0 backdrop-blur-2xl border rounded-2xl overflow-hidden z-[60] shadow-2xl overflow-y-auto max-h-[70vh] ${
              isScrolled 
                ? "bg-white/95 border-black/10" 
                : "bg-black/90 border-white/10"
            }`}
          >
            <div className="p-2">
              <div className={`px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] border-b mb-1 ${
                isScrolled ? "text-black/40 border-black/5" : "text-white/40 border-white/5"
              }`}>
                Resultados Sugeridos
              </div>
              
              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((book) => (
                    <Link
                      key={book.isbn}
                      href={`/${book.urlSlug}`}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-all group/item ${
                        isScrolled ? "hover:bg-black/5" : "hover:bg-white/10"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border ${
                        isScrolled ? "bg-black/5 border-black/5" : "bg-white/5 border-white/10"
                      }`}>
                        {book.coverImage ? (
                          <img 
                            src={`/books/${book.slug}/${book.coverImage}`} 
                            alt={getPlainText(book.title)} 
                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className={`w-5 h-5 ${isScrolled ? "text-black/20" : "text-white/20"}`} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-semibold truncate group-hover/item:text-brand-gold transition-colors ${
                          isScrolled ? "text-brand-text" : "text-white"
                        }`}>
                          {getPlainText(book.title)}
                        </h4>
                        <p className={`text-xs truncate ${isScrolled ? "text-brand-text/40" : "text-white/40"}`}>
                          {book.author.name} • <span className={isScrolled ? "text-brand-text/60" : "text-white/60"}>{book.categoria.join(", ")}</span>
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all ${
                        isScrolled ? "text-black/20" : "text-white/20"
                      }`} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto border ${
                    isScrolled ? "bg-black/5 border-black/5" : "bg-white/5 border-white/10"
                  }`}>
                    <Search className={`w-6 h-6 ${isScrolled ? "text-black/20" : "text-white/20"}`} />
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${isScrolled ? "text-black/60" : "text-white/60"}`}>Nenhuma obra encontrada</p>
                    <p className={`text-xs ${isScrolled ? "text-black/30" : "text-white/30"}`}>Tente buscar por outro título ou autor</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogSearch;
