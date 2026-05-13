import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const SPRING_CONFIG = { stiffness: 160, damping: 22 };

const sectionColorMap: Record<string, string> = {
  "hero-section": "#4F46E5",
  "services-section": "#00C4FF",
  "portfolio-section": "#F97316",
  "process-section": "#F97316",
  "stats-section": "#39FF14",
  "testimonials-section": "#EC4899",
  "tech-section": "#F59E0B",
  "faq-section": "#06B6D4",
  "cybilearn-section": "#10B981",
  "cta-section": "#4F46E5",
};

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

const rgbToString = (r: number, g: number, b: number): string => {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

export function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view">(
    "default"
  );
  const [showText, setShowText] = useState(false);
  const [displayColor, setDisplayColor] = useState("#FFFFFF");
  const [isImageTarget, setIsImageTarget] = useState(false);
  const [isInputTarget, setIsInputTarget] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);

  const velocityMagnitude = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    return Math.sqrt(Number(vx) ** 2 + Number(vy) ** 2);
  });

  // Ring opacity based on velocity: 0.45 at rest, 0.65 at high speed
  const ringOpacity = useTransform(velocityMagnitude, (magnitude) => {
    if (magnitude < 80) return 0.5;
    return Math.min(0.45 + (magnitude - 80) * 0.001, 0.65);
  });

  const targetColorRef = useRef("#FFFFFF");
  const currentColorRef = useRef("#FFFFFF");
  const lastMouseXRef = useRef(-100);
  const lastMouseYRef = useRef(-100);
  const trailBufferRef = useRef<Array<{ x: number; y: number }>>([]);
  const lastMovementTimeRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ringSizes = {
    default: 36,
    hover: 52,
    view: 68,
  };

  const ringSize = ringSizes[cursorState];
  const ringBorderRadius = isImageTarget ? "8px" : "50%";

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const handlePointerChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };
    setIsDesktop(media.matches);
    media.addEventListener("change", handlePointerChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      lastMovementTimeRef.current = performance.now();

      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for input/textarea first — hides entire cursor
      const isInput = Boolean(target.closest("input, textarea"));
      setIsInputTarget(isInput);

      if (isInput) {
        setCursorState("default");
        setShowText(false);
        setIsImageTarget(false);
        return;
      }

      // Determine cursor state and special targets
      const isView = Boolean(target.closest('[data-cursor="view"]'));
      const isImage = Boolean(target.closest("img, picture, [data-cursor='image']"));
      const isButton = Boolean(target.closest("button, [role=button], a[href]"));

      setIsImageTarget(isImage);

      if (isView) {
        setCursorState("view");
        setShowText(true);
      } else if (isButton) {
        setCursorState("hover");
        setShowText(false);
      } else {
        setCursorState("default");
        setShowText(false);
      }

      // Update target section color
      const section = target.closest("[data-section]") as HTMLElement | null;
      const sectionName = section?.dataset.section ?? "";
      targetColorRef.current = sectionColorMap[sectionName] ?? "#FFFFFF";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Canvas and color lerp animation loop
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      const now = performance.now();
      const timeSinceMove = now - lastMovementTimeRef.current;

      // Collect trail points when moving
      const dx = lastMouseXRef.current - mouseX.get();
      const dy = lastMouseYRef.current - mouseY.get();
      const velocity = Math.sqrt(dx * dx + dy * dy);

      if (velocity > 0.1) {
        trailBufferRef.current.push({
          x: mouseX.get(),
          y: mouseY.get(),
        });
        if (trailBufferRef.current.length > 12) {
          trailBufferRef.current.shift();
        }
      }

      lastMouseXRef.current = mouseX.get();
      lastMouseYRef.current = mouseY.get();

      // Lerp color smoothly toward target
      if (currentColorRef.current !== targetColorRef.current) {
        const fromRgb = hexToRgb(currentColorRef.current);
        const toRgb = hexToRgb(targetColorRef.current);
        const lerped = {
          r: fromRgb.r + (toRgb.r - fromRgb.r) * 0.08,
          g: fromRgb.g + (toRgb.g - fromRgb.g) * 0.08,
          b: fromRgb.b + (toRgb.b - fromRgb.b) * 0.08,
        };
        currentColorRef.current = rgbToString(lerped.r, lerped.g, lerped.b);
        setDisplayColor(currentColorRef.current);
      }

      // Draw trail on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (velocity > 80 && timeSinceMove < 300) {
        const rgb = hexToRgb(currentColorRef.current);
        const count = trailBufferRef.current.length;

        trailBufferRef.current.forEach((point, idx) => {
          const opacity = ((count - idx) / count) * 0.25;
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      media.removeEventListener("change", handlePointerChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  if (!isDesktop || isInputTarget) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />

      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        {/* Glow aura: radial gradient behind ring */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            width: ringSize + 16,
            height: ringSize + 16,
            opacity:
              cursorState === "view"
                ? 0.18
                : cursorState === "hover"
                  ? 0.12
                  : 0.06,
          }}
          transition={{ type: "spring", ...SPRING_CONFIG }}
          className="absolute rounded-full will-change-transform"
          style={{
            background: `radial-gradient(circle, ${displayColor}1a 0%, transparent 70%)`,
            transform: "translateZ(0)",
          }}
        />

        {/* Outer ring: always circular, springs smoothly, rotates on view state */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            rotate: cursorState === "view" ? 360 : 0,
          }}
          animate={{
            width: ringSize,
            height: ringSize,
            borderColor: displayColor,
            backgroundColor:
              cursorState === "hover" ? `${displayColor}14` : "transparent",
            opacity: ringOpacity,
            borderRadius: ringBorderRadius,
          }}
          transition={{
            type: "spring",
            ...SPRING_CONFIG,
            rotate:
              cursorState === "view"
                ? { duration: 3, repeat: Infinity, ease: "linear" }
                : { duration: 0.3 },
            borderRadius: { duration: 0.25 },
          }}
          className="absolute border-[1.5px] rounded-full flex items-center justify-center will-change-transform"
          style={{ transform: "translateZ(0)" }}
        >
          <AnimatePresence>
            {showText && cursorState === "view" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="text-[9px] font-mono uppercase tracking-widest"
                style={{ color: displayColor }}
              >
                View
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Core dot: instant follow, disappears on hover */}
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: cursorState === "hover" ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute w-[5px] h-[5px] rounded-full will-change-transform"
          style={{
            backgroundColor: displayColor,
            mixBlendMode: "difference",
            transform: "translateZ(0)",
          }}
        />
      </div>
    </>
  );
}
