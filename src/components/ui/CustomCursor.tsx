import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hovering, setHovered] = useState<"link" | "image" | null>(null);
  const [labelState, setLabelState] = useState<{ label: string | null; size: 'normal' | 'large' }>({ label: null, size: 'normal' });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = { x: -100, y: -100 };
  const ring = { x: -100, y: -100 };

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const target = e.target as HTMLElement;
      const isLink = !!target.closest("a, button, [role='button']");
      const isImage = !!target.closest("img, .cursor-image-trigger");

      if (isLink) setHovered("link");
      else if (isImage) setHovered("image");
      else setHovered(null);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleLabel = (e: Event) => {
      const ev = e as CustomEvent<{ label: string | null; size?: 'normal' | 'large' }>;
      setLabelState({ label: ev.detail.label, size: ev.detail.size === 'large' ? 'large' : 'normal' });
    };
    window.addEventListener('cursor:label', handleLabel as EventListener);

    const animate = () => {
      if (!dotRef.current || !ringRef.current) return;

      // Instant follow for the dot
      dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;

      // Lerp for the ring
      ring.x = ring.x + (mouse.x - ring.x) * 0.12;
      ring.y = ring.y + (mouse.y - ring.y) * 0.12;
      ringRef.current.style.transform = `translate(${ring.x - 18}px, ${ring.y - 18}px)`;

      requestAnimationFrame(animate);
    };

    if (!isTouch) {
      requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener('cursor:label', handleLabel as EventListener);
    };
  }, [isTouch, isVisible]); // Re-run effect if isTouch or isVisible changes

  if (isTouch) return null;

  const ringSize = labelState.size === 'large' ? 80 : 40;
  const ringOffset = ringSize / 2;

  return (
    <>
      {/* Small Dot — Instant */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "10px",
          height: "10px",
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
        className="w-2 h-2 rounded-full bg-white mix-blend-difference transition-opacity duration-300"
      />

      {/* Large Ring — Delayed (Lerp) */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `${20 - ringOffset}px`,
          marginTop: `${20 - ringOffset}px`,
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
        }}
        className="rounded-full border border-white/40 flex items-center justify-center overflow-hidden"
        data-hover={hovering} // Custom attribute for potential CSS state management
      >
        {labelState.label ? (
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white text-center px-2">
            {labelState.label}
          </span>
        ) : hovering === "image" && (
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-white"
          >
            View
          </span>
        )}
      </div>
    </>
  );
}
