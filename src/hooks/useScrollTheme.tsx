import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export const sectionThemes: Record<string, { primary: string; secondary: string; glow: string }> = {
  "hero-section":         { primary: "#4F46E5", secondary: "#818CF8", glow: "rgba(79,70,229,0.15)"   },
  "services-section":     { primary: "#06B6D4", secondary: "#22D3EE", glow: "rgba(6,182,212,0.12)"   },
  "process-section":      { primary: "#F97316", secondary: "#FB923C", glow: "rgba(249,115,22,0.12)"  },
  "stats-section":        { primary: "#F97316", secondary: "#FBBF24", glow: "rgba(249,115,22,0.10)"  },
  "portfolio-section":    { primary: "#06B6D4", secondary: "#818CF8", glow: "rgba(6,182,212,0.10)"   },
  "studio-section":       { primary: "#10B981", secondary: "#34D399", glow: "rgba(16,185,129,0.10)"  },
  "tech-section":         { primary: "#818CF8", secondary: "#A78BFA", glow: "rgba(129,140,248,0.10)" },
  "testimonials-section": { primary: "#EC4899", secondary: "#F472B6", glow: "rgba(236,72,153,0.10)"  },
  "cybilearn-section":    { primary: "#10B981", secondary: "#06B6D4", glow: "rgba(16,185,129,0.08)"  },
  "cta-section":          { primary: "#4F46E5", secondary: "#818CF8", glow: "rgba(79,70,229,0.18)"   },
};

const SECTION_ORDER = Object.keys(sectionThemes);

type ThemeState = { sectionId: string; primary: string; secondary: string; glow: string; index: number };

const defaultId = "hero-section";
const ThemeContext = createContext<ThemeState>({
  sectionId: defaultId,
  ...sectionThemes[defaultId],
  index: 0,
});

export function useScrollTheme() {
  return useContext(ThemeContext);
}

type RGB = { r: number; g: number; b: number };

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return { r: Math.round(lerp(a.r, b.r, t)), g: Math.round(lerp(a.g, b.g, t)), b: Math.round(lerp(a.b, b.b, t)) };
}

function rgbToHslStr({ r, g, b }: RGB): string {
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rr: h = (gg - bb) / d + (gg < bb ? 6 : 0); break;
      case gg: h = (bb - rr) / d + 2; break;
      case bb: h = (rr - gg) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

export function ScrollThemeProvider({ children }: { children: ReactNode }) {
  const [sectionId, setSectionId] = useState<string>(defaultId);
  const currentRef = useRef<{ p: RGB; s: RGB }>({
    p: hexToRgb(sectionThemes[defaultId].primary),
    s: hexToRgb(sectionThemes[defaultId].secondary),
  });
  const rafRef = useRef<number | null>(null);

  // Observe sections, pick the most-visible.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!sections.length) return;
    const ratios = new Map<string, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).dataset.section!;
          ratios.set(id, e.intersectionRatio);
        });
        let bestId: string | null = null;
        let best = -1;
        ratios.forEach((r, id) => {
          if (r > best && sectionThemes[id]) { best = r; bestId = id; }
        });
        if (bestId) {
          setSectionId((prev) => (prev === bestId ? prev : (bestId as string)));
        }
      },
      { threshold: [0, 0.2, 0.4, 0.5, 0.7, 1] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Lerp CSS vars whenever sectionId changes.
  useEffect(() => {
    const theme = sectionThemes[sectionId] ?? sectionThemes[defaultId];
    const target = { p: hexToRgb(theme.primary), s: hexToRgb(theme.secondary) };
    const from = { p: { ...currentRef.current.p }, s: { ...currentRef.current.s } };
    const start = performance.now();
    const duration = 600;
    const root = document.documentElement.style;

    root.setProperty("--theme-glow", theme.glow);

    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const e = easeInOut(k);
      const p = lerpRgb(from.p, target.p, e);
      const s = lerpRgb(from.s, target.s, e);
      currentRef.current = { p, s };
      root.setProperty("--accent-from", rgbToHslStr(p));
      root.setProperty("--accent-mid", rgbToHslStr(s));
      root.setProperty("--accent-to", rgbToHslStr(s));
      root.setProperty("--theme-primary", `rgb(${p.r},${p.g},${p.b})`);
      root.setProperty("--theme-secondary", `rgb(${s.r},${s.g},${s.b})`);
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [sectionId]);

  const theme = sectionThemes[sectionId] ?? sectionThemes[defaultId];
  const idx = SECTION_ORDER.indexOf(sectionId);
  const value: ThemeState = { sectionId, ...theme, index: idx < 0 ? 0 : idx };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}