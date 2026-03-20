import { motion } from "framer-motion";

interface FilterBarProps {
  options: string[];
  selected: string | null;
  onChange: (option: string | null) => void;
}

const FilterBar = ({ options, selected, onChange }: FilterBarProps) => {
  return (
    <div className="relative w-full border-b border-border/5">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-4 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex items-center gap-2 p-1 bg-muted/20 backdrop-blur-md rounded-full border border-border/40">
          <button
            onClick={() => onChange(null)}
            className={`relative px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 z-10 ${
              selected === null ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {selected === null && (
              <motion.div
                layoutId="active-filter"
                className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
              />
            )}
            Todos
          </button>

          <div className="w-[1px] h-4 bg-border/40 mx-1 flex-shrink-0" />

          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`relative px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-500 z-10 ${
                selected === option ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {selected === option && (
                <motion.div
                  layoutId="active-filter"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                />
              )}
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator for mobile */}
      <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-8 h-8 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
};

export default FilterBar;
