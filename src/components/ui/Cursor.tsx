import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "view";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<CursorState>("default");

  // Dot follows instantly
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Ring follows with spring lag (~0.15s)
  const ringX = useSpring(mouseX, { stiffness: 160, damping: 22, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 22, mass: 0.5 });

  useEffect(() => {
    // Desktop (fine pointer) only
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor='view']")) {
        setState("view");
      } else if (el.closest("a, button, [role='button']")) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const ringSize = state === "view" ? 72 : state === "hover" ? 60 : 40;

  return (
    <>
      {/* Small dot — instant follow, mix-blend-mode: difference */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          mixBlendMode: "difference",
        }}
      />

      {/* Large ring — spring lag, morphs on state change */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full flex items-center justify-center overflow-hidden"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor:
            state === "view"
              ? "rgba(255,255,255,0.12)"
              : state === "hover"
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0)",
          borderColor:
            state === "default"
              ? "rgba(255,255,255,0.5)"
              : "rgba(255,255,255,0.85)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.5 }}
      >
        <AnimatePresence>
          {state === "view" && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 600,
                color: "white",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
