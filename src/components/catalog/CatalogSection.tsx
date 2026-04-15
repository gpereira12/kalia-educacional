import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, LayoutGrid, Search } from "lucide-react";
import BookCatalogCard from "./BookCatalogCard";

interface CatalogSectionProps {
  books: any[];
}

const CatalogSection = ({ books }: CatalogSectionProps) => {
  const [activeTab, setActiveTab] = useState("Infantil");
  const [selectedSubject, setSelectedSubject] = useState("Todas as Matérias");
  const [selectedLevel, setSelectedLevel] = useState("Todos os Níveis");
  const [visibleCount, setVisibleCount] = useState(12);

  const tabs = ["Infantil", "Fundamental I", "Fundamental II"];

  const normalizeCollection = (val: string | null) => {
    if (!val) return "";
    return val.replace("Fundamental 1", "Fundamental I").replace("Fundamental 2", "Fundamental II");
  };

  const subjects = useMemo(() => {
    const allSubjects = books
      .filter(b => normalizeCollection(b.colecao).includes(activeTab))
      .flatMap(b => b.categoria);
    return ["Todas as Matérias", ...Array.from(new Set(allSubjects))];
  }, [books, activeTab]);

  const levels = useMemo(() => {
    const allLevels = books
      .filter(b => normalizeCollection(b.colecao).includes(activeTab))
      .map(b => b.nivel)
      .filter(Boolean);
    return ["Todos os Níveis", ...Array.from(new Set(allLevels))];
  }, [books, activeTab]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchTab = normalizeCollection(book.colecao).includes(activeTab);
      const matchSubject = selectedSubject === "Todas as Matérias" || book.categoria.includes(selectedSubject);
      const matchLevel = selectedLevel === "Todos os Níveis" || book.nivel === selectedLevel;
      return matchTab && matchSubject && matchLevel;
    });
  }, [books, activeTab, selectedSubject, selectedLevel]);

  const booksToDisplay = useMemo(() => {
    return filteredBooks.slice(0, visibleCount);
  }, [filteredBooks, visibleCount]);

  return (
    <div className="space-y-12">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[10px] font-bold tracking-widest uppercase text-secondary">
            <LayoutGrid className="w-3 h-3" />
            Catálogo Completo
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-primary">
            Nossas <span className="italic">Obras</span>
          </h2>
        </div>

        {/* Categories Tabs */}
        <div className="flex p-1.5 bg-white/50 backdrop-blur-md rounded-2xl border border-black/5 shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedSubject("Todas as Matérias");
                setSelectedLevel("Todos os Níveis");
                setVisibleCount(12);
              }}
              className={`relative px-6 py-3 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-500 overflow-hidden ${
                activeTab === tab ? "text-white" : "text-black/40 hover:text-primary"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-primary shadow-lg shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 py-6 border-y border-black/5">
        <div className="flex items-center gap-2 text-black/40 mr-4">
          <Filter className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-widest uppercase">Filtros</span>
        </div>

        {/* Subject Filter */}
        <div className="relative group">
          <select 
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setVisibleCount(12);
            }}
            className="appearance-none bg-white/60 hover:bg-white border border-black/5 px-6 py-2.5 pr-12 rounded-full text-[11px] font-bold tracking-widest uppercase text-primary focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer shadow-sm"
          >
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
        </div>

        {/* Level Filter */}
        <div className="relative group">
          <select 
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
              setVisibleCount(12);
            }}
            className="appearance-none bg-white/60 hover:bg-white border border-black/5 px-6 py-2.5 pr-12 rounded-full text-[11px] font-bold tracking-widest uppercase text-primary focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer shadow-sm"
          >
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
        </div>

        <div className="ml-auto text-[10px] font-medium text-black/30 tracking-wider">
          Exibindo {filteredBooks.length} obras
        </div>
      </div>

      {/* Grid */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredBooks.length > 0 ? (
            <motion.div
              key={activeTab + selectedSubject + selectedLevel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
            >
              {booksToDisplay.map((book) => (
                <BookCatalogCard key={book.slug} book={book} />
              ))}
            </motion.div>
          ) : (
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center justify-center py-32 space-y-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center">
                <Search className="w-8 h-8 text-black/20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-primary italic">Nenhum resultado</h3>
                <p className="text-text/60 max-w-xs mx-auto">Tente ajustar seus filtros para encontrar o que procura.</p>
                <button 
                  onClick={() => {
                    setSelectedSubject("Todas as Matérias");
                    setSelectedLevel("Todos os Níveis");
                  }}
                  className="text-[10px] font-bold tracking-widest uppercase text-primary hover:underline pt-4"
                >
                  Limpar Filtros
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {visibleCount < filteredBooks.length && (
        <div className="flex justify-center pt-12 pb-16">
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="px-12 py-4 bg-primary text-white rounded-full text-[11px] font-bold tracking-widest uppercase hover:bg-secondary hover:scale-105 transition-all duration-500 shadow-xl shadow-primary/20 active:scale-95 flex items-center gap-2"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogSection;
