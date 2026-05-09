import { useScrollTheme } from "@/hooks/useScrollTheme";

export function ThemeOverlay() {
  const { index, glow } = useScrollTheme();
  const odd = index % 2 === 1;
  // Odd sections: bottom-left. Even sections: top-right.
  const position = odd ? "20% 80%" : "80% 20%";

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        mixBlendMode: "screen",
        background: `radial-gradient(900px 700px at ${position}, ${glow}, transparent 70%)`,
        transition: "background 800ms ease",
      }}
    />
  );
}