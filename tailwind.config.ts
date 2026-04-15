import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  safelist: [
    // Level badge classes (BookCatalogCard)
    "bg-emerald-600/90", "border-emerald-400/30",
    "bg-blue-600/90", "border-blue-400/30",
    "bg-violet-600/90", "border-violet-400/30",
  ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "brand-gold": "hsl(var(--brand-gold))",
        "brand-blue": "hsl(var(--brand-blue))",
        "brand-cream": "hsl(var(--brand-cream))",
        "brand-text": "hsl(var(--brand-text))",
        "jesuit-blue": "hsl(var(--jesuit-blue))",
        "jesuit-gold": "hsl(var(--jesuit-gold))",
        "jesuit-red": "hsl(var(--jesuit-red))",
        "jesuit-cream": "hsl(var(--jesuit-cream))",
        "jesuit-dark": "hsl(var(--jesuit-dark))",
        "apple-blue": "hsl(var(--apple-blue))",
        "apple-gray": "hsl(var(--apple-gray))",
        "gold-accent": "hsl(var(--gold-accent))",
        "liturgical-red": "hsl(var(--liturgical-red))",
        "liturgical-gold": "hsl(var(--liturgical-gold))",
        "liturgical-cream": "hsl(var(--liturgical-cream))",
        "primary-text-color": "hsl(var(--primary-text-color))",
        "secondary-text-color": "hsl(var(--secondary-text-color))",
        "primary-emphasis-color": "hsl(var(--primary-emphasis-color))",
        "secondary-emphasis-color": "hsl(var(--secondary-emphasis-color))",
        "primary-background-color": "hsl(var(--primary-background-color))",
        "secondary-background-color": "hsl(var(--secondary-background-color))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "fade-scale": "fade-in 0.5s ease-out, scale-in 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
