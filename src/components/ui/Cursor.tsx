import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from "framer-motion";

const SPRING_CONFIG = { stiffness: 160, damping: 22 };

export function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view">("default");
  const [sectionColor, setSectionColor] = useState("#FFFFFF");

  // Mouse positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth positions for the ring
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  // Velocity tracking
  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);

  // Transform velocity magnitude into skew and scale
  // We use Math.abs because velocity can be negative
  const skewX = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    const magnitude = Math.sqrt(Number(vx) ** 2 + Number(vy) ** 2);
    return Math.min(magnitude * 0.0004, 0.3); // Cap skew at 0.3
  });

  const scaleX = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    const magnitude = Math.sqrt(Number(vx) ** 2 + Number(vy) ** 2);
    return 1 + Math.min(magnitude * 0.0006, 0.4); // Cap scale at 1.4 total
  });

  useEffect(() => {
    // Only render on desktop (pointer: fine)
    const checkDevice = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    checkDevice();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      // Update Cursor State (Size/Morph)
      if (target.closest('[data-cursor="view"]')) {
        setCursorState("view");
      } else if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }

      // Update Section-aware Color
      const section = target.closest('[data-section]') as HTMLElement;
      const sectionName = section?.dataset.section;

      switch (sectionName) {
        case "hero-section":
          setSectionColor("#4F46E5"); // Indigo
          break;
        case "services-section":
          setSectionColor("#06B6D4"); // Cyan
          break;
        case "portfolio-section":
          setSectionColor("#F97316"); // Orange
          break;
        case "testimonials-section":
          setSectionColor("#EC4899"); // Pink
          break;
        default:
          setSectionColor("#FFFFFF"); // Default White
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  const ringSizes = {
    default: 40,
    hover: 56,
    view: 72,
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Small Dot (follows instantly) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-2 h-2 bg-white rounded-full mix-blend-difference absolute"
      />

      {/* 2. Large Ring (spring lag + velocity effects) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          skewX,
          scaleX,
        }}
        animate={{
          width: ringSizes[cursorState],
          height: ringSizes[cursorState],
          borderColor: sectionColor,
        }}
        transition={{
          type: "spring",
          ...SPRING_CONFIG,
        }}
        className="border-[1.5px] rounded-full absolute flex items-center justify-center"
      >
        <AnimatePresence>
          {cursorState === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: sectionColor }}
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
