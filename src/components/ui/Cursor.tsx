import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useTransform,
} from "framer-motion";

const SPRING_CONFIG = { stiffness: 220, damping: 28 };

export function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "explore">("default");

  // Motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, SPRING_CONFIG);
  const ringY = useSpring(mouseY, SPRING_CONFIG);

  const ringOpacity = useMotionValue(0.4);
  const dotOpacity = useMotionValue(1);

  // Refs
  const cursorStateRef = useRef<"default" | "hover" | "view" | "explore">("default");
  const isInputTargetRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailBufferRef = useRef<Array<{ x: number; y: number }>>([]);
  const lastMousePosRef = useRef({ x: -100, y: -100 });
  const velocityRef = useRef(0);

  const ringSize = useMemo(() => {
    if (cursorState === "hover") return 48;
    if (cursorState === "view") return 64;
    if (cursorState === "explore") return 52;
    return 32;
  }, [cursorState]);

  useEffect(() => {
    setIsClient(true);
    const media = window.matchMedia("(pointer: fine)");
    setIsDesktop(media.matches);
    
    if (!media.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      const isInput = !!target.closest("input, textarea, select, [contenteditable]");
      isInputTargetRef.current = isInput;

      const isHover = !!target.closest("a, button, [role='button']");
      const isView = !!target.closest("[data-cursor='view']");
      const isExplore = !!target.closest("[data-cursor='explore']") && !isHover;

      const newState = isView ? "view" : isExplore ? "explore" : isHover ? "hover" : "default";
      cursorStateRef.current = newState;
      setCursorState(newState);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let rafId: number;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const animate = () => {
      const currentX = mouseX.get();
      const currentY = mouseY.get();
      const isHidden = isInputTargetRef.current;

      const dx = currentX - lastMousePosRef.current.x;
      const dy = currentY - lastMousePosRef.current.y;
      const instantVelocity = Math.sqrt(dx * dx + dy * dy);
      velocityRef.current = velocityRef.current * 0.8 + instantVelocity * 0.2;
      
      if (instantVelocity > 0.5) {
        trailBufferRef.current.push({ x: currentX, y: currentY });
        if (trailBufferRef.current.length > 8) trailBufferRef.current.shift();
      }

      ringOpacity.set(isHidden ? 0 : (0.4 + Math.min(velocityRef.current / 300, 0.4)));
      dotOpacity.set(isHidden ? 0 : 1);

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!isHidden && velocityRef.current > 60) {
          trailBufferRef.current.forEach((p, i) => {
            const alpha = (i / trailBufferRef.current.length) * 0.15;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
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
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isClient || !isDesktop) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />
      
      <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
        {/* Outer Ring */}
        <motion.div
          className="absolute pointer-events-none flex items-center justify-center border-white/40"
          animate={{
            width: ringSize,
            height: ringSize,
            rotate: cursorState === "view" || cursorState === "explore" ? 360 : 0,
            backgroundColor: cursorState === "hover" ? "rgba(255,255,255,0.08)" : "transparent",
            borderRadius: "50%",
          }}
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: ringOpacity,
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          transition={{
            width: { type: "spring", ...SPRING_CONFIG },
            height: { type: "spring", ...SPRING_CONFIG },
            rotate: cursorState === "view" || cursorState === "explore"
              ? { duration: 4, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 },
          }}
        >
          <AnimatePresence>
            {cursorState === "view" && (
              <motion.span
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[8px] font-mono uppercase tracking-[0.2em] text-white"
              >
                VIEW
              </motion.span>
            )}
            {cursorState === "explore" && (
              <motion.span
                key="explore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-white"
              >
                ✦
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Core Dot */}
        <motion.div
          className="absolute rounded-full pointer-events-none bg-white"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
            width: 4,
            height: 4,
            opacity: dotOpacity,
            mixBlendMode: "difference",
          }}
        />
      </div>
    </>
  );
}
