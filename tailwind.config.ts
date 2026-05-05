import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        brand: {
          base: "hsl(var(--bg-base))",
          card: "hsl(var(--bg-card))",
          raised: "hsl(var(--bg-raised))",
          hover: "hsl(var(--bg-hover))",
          light: "hsl(var(--bg-light))",
          lightcard: "hsl(var(--bg-light-card))",
          dark: "hsl(var(--text-dark))",
        },
        ink: {
          DEFAULT: "hsl(var(--text-white))",
          muted: "hsl(var(--text-muted))",
          dark: "hsl(var(--text-dark))",
        },
        violet: { DEFAULT: "hsl(var(--accent-from))" },
        pink: { DEFAULT: "hsl(var(--accent-to))" },
        cyan: { DEFAULT: "hsl(var(--cyan))" },
        amber: { DEFAULT: "hsl(var(--amber))" },
        emerald: { DEFAULT: "hsl(var(--emerald))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        '2xl': "20px",
        '3xl': "28px",
      },
      boxShadow: {
        'card-dark': '0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        'card-light': '0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)',
        'glow-purple': '0 8px 40px rgba(124,58,237,0.35)',
        'poster': '-12px 16px 40px rgba(0,0,0,0.2)',
        'poster-hover': '0 24px 60px rgba(0,0,0,0.15)',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
