import { useState } from "react";
import { Book } from "@/lib/types";
import { Search, Check } from "lucide-react";

interface FilterSidebarProps {
  title: string;
  items: string[];
  selected: string[];
  onChange: (items: string[]) => void;
  books: Book[];
  type: 'categoria' | 'colecao';
  hideAllOption?: boolean;
  disableScroll?: boolean;
}

const FilterSidebar = ({ title, items, selected, onChange, books, type, hideAllOption = false, disableScroll = false }: FilterSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate counts for each item
  const getItemCount = (item: string | null) => {
    if (type === 'colecao' && item === null) {
      return books.filter(book => book.colecao !== null).length;
    }
    
    if (item === null) return books.length;
    
    return books.filter(book => {
      if (type === 'categoria') {
        const categories = Array.isArray(book.categoria) ? book.categoria : [book.categoria || 'Geral'];
        return categories.includes(item!);
      } else {
        return book.colecao === item;
      }
    }).length;
  };

  const handleSelect = (item: string | null) => {
    if (item === null) {
      onChange([]);
      return;
    }

    if (selected.includes(item)) {
      onChange(selected.filter(i => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="space-y-4">
        {/* Title removed to avoid redundancy as discussed with user */}

        <div className="px-1 mb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
            <input
              type="text"
              placeholder={`Buscar ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 border-none rounded-xl py-2.5 pl-10 pr-4 text-base focus:ring-1 focus:ring-primary/20 transition-all text-[16px]"
            />
          </div>
        </div>
        
        <nav className={`space-y-1 px-1 ${disableScroll ? "" : "max-h-[60vh] overflow-y-auto scrollbar-hide"}`}>
          {!hideAllOption && (
            <button
              onClick={() => handleSelect(null)}
              className={`w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                selected.length === 0 
                  ? "bg-primary/10 text-[hsl(var(--brand-gold-contrast))] border border-primary/20" 
                  : "text-black/80 hover:bg-black/5 hover:text-black/90"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  selected.length === 0 ? "bg-primary border-primary" : "border-black/20 group-hover:border-black/40"
                }`}>
                  {selected.length === 0 && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm font-serif italic transition-all ${selected.length === 0 ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                  {type === 'categoria' ? "Todas as Obras" : "Todas as Coleções"}
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-colors ${
                selected.length === 0 
                  ? "bg-primary/20 text-[hsl(var(--brand-gold-contrast))]" 
                  : "bg-black/10 text-black/60 group-hover:text-black/80"
              }`}>
                {getItemCount(null)}
              </span>
            </button>
          )}

          {filteredItems.map((item) => {
            const isSelected = selected.includes(item);
            return (
              <button
                key={item}
                onClick={() => handleSelect(item)}
                className={`w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isSelected 
                    ? "bg-brand-gold/10 text-[hsl(var(--brand-gold-contrast))] border border-brand-gold/20" 
                    : "text-brand-text/90 hover:bg-brand-text/5 hover:text-brand-text/100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isSelected ? "bg-primary border-primary" : "border-black/20 group-hover:border-black/40"
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm font-serif italic transition-all ${isSelected ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                    {item}
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-colors ${
                  isSelected 
                    ? "bg-primary/20 text-[hsl(var(--brand-gold-contrast))]" 
                    : "bg-black/10 text-black/60 group-hover:text-black/80"
                }`}>
                  {getItemCount(item)}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default FilterSidebar;
