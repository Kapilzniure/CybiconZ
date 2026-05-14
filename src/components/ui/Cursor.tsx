import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useTransform,
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
  default: "#ffffff",
};

// Helper to interpolate colors manually for rAF loop
function lerpColor(from: string, to: string, amount: number) {
  const fromRgb = hexToRgb(from);
  const toRgb = hexToRgb(to);
  
  const r = Math.round(fromRgb.r + (toRgb.r - fromRgb.r) * amount);
  const g = Math.round(fromRgb.g + (toRgb.g - fromRgb.g) * amount);
  const b = Math.round(fromRgb.b + (toRgb.b - fromRgb.b) * amount);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}

export function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view">("default");
  const [isImageTarget, setIsImageTarget] = useState(false);

  // Motion values for positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, SPRING_CONFIG);
  const ringY = useSpring(mouseY, SPRING_CONFIG);

  // Motion values for dynamic styles (to avoid re-renders)
  const ringOpacity = useMotionValue(0.5);
  const dotOpacity = useMotionValue(1);
  const sectionColor = useMotionValue("#ffffff");
  const auraOpacity = useMotionValue(0.06);

  // Transform color for gradient/backgrounds
  const auraBackground = useTransform(sectionColor, (c) => 
    `radial-gradient(circle, ${c}cc 0%, transparent 70%)`
  );
  
  const ringBackground = useTransform(sectionColor, (c) => 
    cursorState === "hover" ? `${c}14` : "transparent"
  );

  // Refs for logic & canvas
  const cursorStateRef = useRef<"default" | "hover" | "view">("default");
  const isInputTargetRef = useRef(false);
  const isTransitioningRef = useRef(false);
  
  const auraRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetColorRef = useRef("#ffffff");
  const currentColorRef = useRef("#ffffff");
  const trailBufferRef = useRef<Array<{ x: number; y: number }>>([]);
  const lastMousePosRef = useRef({ x: -100, y: -100 });
  const lastMoveTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const ringSize = useMemo(() => {
    if (cursorState === "hover") return 52;
    if (cursorState === "view") return 68;
    return 36;
  }, [cursorState]);

  useEffect(() => {
    setIsClient(true);
    const media = window.matchMedia("(pointer: fine)");
    setIsDesktop(media.matches);
    const handleMediaChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", handleMediaChange);

    if (!media.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      lastMoveTimeRef.current = performance.now();

      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect input/textarea
      const isInput = !!target.closest("input, textarea, select, [contenteditable]");
      isInputTargetRef.current = isInput;

      // Detect special states
      const isHover = !!target.closest("a, button, [role='button']");
      const isView = !!target.closest("[data-cursor='view']");
      const isImage = !!target.closest("img, [data-cursor='image']");

      setIsImageTarget(isImage);
      const newState = isView ? "view" : isHover ? "hover" : "default";
      cursorStateRef.current = newState;
      setCursorState(newState);

      // Detect section color
      const section = target.closest("[data-section]") as HTMLElement;
      const sectionId = section?.dataset.section;
      targetColorRef.current = sectionColorMap[sectionId as keyof typeof sectionColorMap] || sectionColorMap.default;
    };

    const handleFocusIn = (e: FocusEvent) => {
      const isInput = !!(e.target as HTMLElement).closest('input, textarea, select, [contenteditable]');
      isInputTargetRef.current = isInput;
      // Trigger logic update
      mouseX.set(mouseX.get());
    };

    const handleFocusOut = () => {
      isInputTargetRef.current = false;
      mouseX.set(mouseX.get());
    };

    const handleTransitionStart = () => { isTransitioningRef.current = true; };
    const handleTransitionEnd = () => { isTransitioningRef.current = false; };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    window.addEventListener('transition:start', handleTransitionStart);
    window.addEventListener('transition:end', handleTransitionEnd);

    // Animation Loop
    let rafId: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const animate = () => {
      const now = performance.now();
      const currentX = mouseX.get();
      const currentY = mouseY.get();
      const state = cursorStateRef.current;
      
      const isHidden = isInputTargetRef.current || isTransitioningRef.current;

      // Calculate Velocity
      const dx = currentX - lastMousePosRef.current.x;
      const dy = currentY - lastMousePosRef.current.y;
      const instantVelocity = Math.sqrt(dx * dx + dy * dy);
      velocityRef.current = velocityRef.current * 0.8 + instantVelocity * 0.2;
      
      // Update Trail Buffer
      if (instantVelocity > 0.1) {
        trailBufferRef.current.push({ x: currentX, y: currentY });
        if (trailBufferRef.current.length > 12) trailBufferRef.current.shift();
      }

      // Color Lerp
      if (currentColorRef.current !== targetColorRef.current) {
        currentColorRef.current = lerpColor(currentColorRef.current, targetColorRef.current, 0.08);
        sectionColor.set(currentColorRef.current);
      }

      // Dynamic Opacity based on velocity + visibility
      const targetRingOpacity = isHidden ? 0 : (0.45 + Math.min(velocityRef.current / 200, 1) * 0.2);
      ringOpacity.set(targetRingOpacity);
      dotOpacity.set(isHidden ? 0 : 1);

      // Aura logic
      if (isHidden) {
        auraOpacity.set(0);
      } else if (state === "view") {
        const pulse = Math.sin((now / 1500) * Math.PI * 2) * 0.04 + 0.16;
        auraOpacity.set(pulse);
      } else if (state === "hover") {
        auraOpacity.set(0.12);
      } else {
        auraOpacity.set(0.06);
      }

      // Draw Canvas Trail
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const timeSinceMove = now - lastMoveTimeRef.current;
        if (!isHidden && velocityRef.current > 80 && timeSinceMove < 300) {
          const rgb = hexToRgb(currentColorRef.current);
          trailBufferRef.current.forEach((p, i) => {
            const alpha = (i / trailBufferRef.current.length) * 0.25;
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }

      lastMousePosRef.current = { x: currentX, y: currentY };
      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      media.removeEventListener("change", handleMediaChange);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('transition:start', handleTransitionStart);
      window.removeEventListener('transition:end', handleTransitionEnd);
      cancelAnimationFrame(rafId);
    };
  }, []); // Run once on mount

  if (!isClient || !isDesktop) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ willChange: "transform" }}
      />
      
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        {/* Glow Aura */}
        <motion.div
          ref={auraRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            width: ringSize + 16,
            height: ringSize + 16,
            background: auraBackground,
            opacity: auraOpacity,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />

        {/* Outer Ring */}
        <motion.div
          className="absolute pointer-events-none flex items-center justify-center overflow-hidden"
          animate={{
            width: ringSize,
            height: ringSize,
            borderWidth: cursorState === "hover" ? "1px" : "1.5px",
            borderRadius: isImageTarget ? "8px" : "50%",
            rotate: cursorState === "view" ? 360 : 0,
            backgroundColor: cursorState === "hover" ? `${currentColorRef.current}14` : "transparent",
          }}
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            borderColor: sectionColor,
            background: ringBackground,
            opacity: ringOpacity,
            borderStyle: "solid",
            borderWidth: "1.5px", // Default stable width
            willChange: "transform",
            transform: "translateZ(0)",
          }}
          transition={{
            width: { type: "spring", ...SPRING_CONFIG },
            height: { type: "spring", ...SPRING_CONFIG },
            borderWidth: { duration: 0.2 },
            borderRadius: { duration: 0.25 },
            rotate: cursorState === "view" 
              ? { duration: 3, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 },
            backgroundColor: { duration: 0.2 }
          }}
        >
          <AnimatePresence>
            {cursorState === "view" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-[9px] font-mono uppercase tracking-widest pointer-events-none select-none"
                style={{ color: sectionColor }}
              >
                VIEW
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Core Dot */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={{
            scale: cursorState === "hover" ? 0 : 1,
          }}
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
            width: 5,
            height: 5,
            backgroundColor: sectionColor,
            opacity: dotOpacity,
            mixBlendMode: "difference",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </div>
    </>
  );
}
