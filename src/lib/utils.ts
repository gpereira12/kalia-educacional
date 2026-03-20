import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { RichTextItem } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts RichTextItem[] or string to plain text.
 * Joins multiple items with a space to avoid joined words (e.g., "IlustradaNovo").
 */
export function getPlainText(content?: RichTextItem[] | string): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  
  return content
    .map(item => item.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
