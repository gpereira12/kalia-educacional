import React from 'react';
import { RichTextItem } from '@/lib/types';

interface TitleWithColorProps {
  title?: RichTextItem[] | string;
  className?: string;
  colorClassName?: string;
}

const TitleWithColor = ({ title, className = "", colorClassName = "text-[hsl(var(--secondary-emphasis-color))]" }: TitleWithColorProps) => {
  if (!title) return null;

  const getParts = (text: string) => {
    // Support manual break with pipe
    if (text.includes('|')) {
      const parts = text.split('|');
      return [parts[0].trim(), parts.slice(1).join('|').trim()];
    }

    // Try to split by common words or punctuation
    const splitters = [": ", " - ", " sobre ", " do ", " da ", " em ", " para ", " com ", " no ", " na "];
    
    for (const splitter of splitters) {
      if (text.includes(splitter)) {
        const parts = text.split(splitter);
        return [parts[0], splitter.trim() + " " + parts.slice(1).join(splitter)];
      }
    }

    // Fallback: split in the middle
    const words = text.split(' ');
    if (words.length <= 2) return [text, ""];
    
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  };

  if (Array.isArray(title)) {
    return (
      <span className={className}>
        {title.map((item, index) => (
          <span key={index} className={item.bold ? colorClassName : ""}>
            {item.text}
          </span>
        ))}
      </span>
    );
  }

  const [part1, part2] = getParts(title);

  return (
    <span className={className}>
      {part1}
      {part2 && (
        <>
          <br />
          <span className={colorClassName}>{part2}</span>
        </>
      )}
    </span>
  );
};

export default TitleWithColor;
