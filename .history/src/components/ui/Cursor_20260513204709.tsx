import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const POINTER_MEDIA = "(pointer: fine)";
const SPRING_BASE = { stiffness: 160, damping: 22 };
const TRAIL_CONFIGS = [
  { stiffness: 160, damping: 22 },
  { stiffness: 120, damping: 22 },
  { stiffness: 90, damping: 22 },
  { stiffness: 60, damping: 22 },
  { stiffness: 40, damping: 22 },
];
const TRAIL_FACTORS = [0.8, 0.72, 0.64, 0.56, 0.48];
const TRAIL_OPACITIES = [0.15, 0.12, 0.09, 0.06, 0.04];

const sectionColorMap: Record<string, string> = {
  "hero-section": "#4F46E5",
  "services-section": "#06B6D4",
  "portfolio-section": "#F97316",
  "testimonials-section": "#EC4899",
  "tech-section": "#F59E0B",
  "faq-section": "#06B6D4",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "view" | "drag">("default");
  const [sectionColor, setSectionColor] = useState("#FFFFFF");
  const [isButtonTarget, setIsButtonTarget] = useState(false);
  const [isImageTarget, setIsImageTarget] = useState(false);
  const [isLinkTarget, setIsLinkTarget] = useState(false);

  const targetXRef = useRef(-100);
  const targetYRef = useRef(-100);
  const magneticRef = useRef<{ dx: number; dy: number; dist: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotTargetX = useMotionValue(-100);
  const dotTargetY = useMotionValue(-100);

  const dotX = useSpring(dotTargetX, { stiffness: 220, damping: 26 });
  const dotY = useSpring(dotTargetY, { stiffness: 220, damping: 26 });
  const smoothX = useSpring(mouseX, SPRING_BASE);
  const smoothY = useSpring(mouseY, SPRING_BASE);

  const trail1X = useSpring(mouseX, TRAIL_CONFIGS[0]);
  const trail1Y = useSpring(mouseY, TRAIL_CONFIGS[0]);
  const trail2X = useSpring(trail1X, TRAIL_CONFIGS[1]);
  const trail2Y = useSpring(trail1Y, TRAIL_CONFIGS[1]);
  const trail3X = useSpring(trail2X, TRAIL_CONFIGS[2]);
  const trail3Y = useSpring(trail2Y, TRAIL_CONFIGS[2]);
  const trail4X = useSpring(trail3X, TRAIL_CONFIGS[3]);
  const trail4Y = useSpring(trail3Y, TRAIL_CONFIGS[3]);
  const trail5X = useSpring(trail4X, TRAIL_CONFIGS[4]);
  const trail5Y = useSpring(trail4Y, TRAIL_CONFIGS[4]);

  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);

  const velocityMagnitude = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    return Math.sqrt(Number(vx) ** 2 + Number(vy) ** 2);
  });

  const scaleX = useTransform(velocityMagnitude, (magnitude) =>
    1 + Math.min(magnitude * 0.0005, 0.4)
  );
  const scaleY = useTransform(velocityMagnitude, (magnitude) =>
    1 - Math.min(magnitude * 0.0002, 0.15)
  );
  const rotation = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    const angle = Math.atan2(Number(vy), Number(vx)) * (180 / Math.PI);
    return clamp(angle, -25, 25);
  });

  useEffect(() => {
    const media = window.matchMedia(POINTER_MEDIA);
    const handlePointerChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };
    setIsDesktop(media.matches);
    media.addEventListener("change", handlePointerChange);

    const handleMouseMove = (e: MouseEvent) => {
      targetXRef.current = e.clientX;
      targetYRef.current = e.clientY;

      const target = e.target as HTMLElement;
      if (!target) return;

      const isView = Boolean(target.closest('[data-cursor="view"]'));
      const isDrag = Boolean(target.closest('[data-cursor="drag"]'));
      const isImage = Boolean(target.closest("img, picture, [data-cursor='image']"));
      const isButton = Boolean(
        target.closest(
          "button, [role=button], input[type='button'], input[type='submit'], a[href]"
        )
      );
      const isLink = Boolean(target.closest("a[href], [data-cursor='view']"));

      setIsButtonTarget(isButton);
      setIsImageTarget(isImage);
      setIsLinkTarget(isLink);

      if (isDrag) {
        setCursorState("drag");
      } else if (isView) {
        setCursorState("view");
      } else if (isButton || isLink) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }

      const section = target.closest("[data-section]") as HTMLElement | null;
      const sectionName = section?.dataset.section ?? "";
      setSectionColor(sectionColorMap[sectionName] ?? "#FFFFFF");

      const magneticElements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]")
      );
      let nearest = null;
      let nearestDistance = Infinity;

      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - e.clientX;
        const dy = centerY - e.clientY;
        const distance = Math.hypot(dx, dy);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = { dx, dy, dist: distance };
        }
      });

      if (nearest && nearestDistance < 60) {
        magneticRef.current = nearest;
      } else {
        magneticRef.current = null;
      }
    };

    const animateCursor = () => {
      const x = targetXRef.current;
      const y = targetYRef.current;

      mouseX.set(x);
      mouseY.set(y);

      if (magneticRef.current) {
        const { dx, dy, dist } = magneticRef.current;
        const ratio = clamp(1 - dist / 60, 0, 1);
        const norm = dist || 1;
        const pull = ratio * 12;
        const offsetX = clamp((dx / norm) * pull, -12, 12);
        const offsetY = clamp((dy / norm) * pull, -12, 12);

        dotTargetX.set(x + offsetX);
        dotTargetY.set(y + offsetY);
      } else {
        dotTargetX.set(x);
        dotTargetY.set(y);
      }

      rafRef.current = window.requestAnimationFrame(animateCursor);
    };

    rafRef.current = window.requestAnimationFrame(animateCursor);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      media.removeEventListener("change", handlePointerChange);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY, dotTargetX, dotTargetY]);

  if (!isDesktop) return null;

  const ringSizes = {
    default: 38,
    hover: 54,
    view: 72,
    drag: 54,
  };
  const ringSize = ringSizes[cursorState];
  const ringFillColor = hexToRgba(sectionColor, 0.08);
  const ringBorderColor = hexToRgba(sectionColor, 0.9);
  const ringBorderRadius = isImageTarget ? "4px" : "50%";
  const dotVisible = cursorState !== "hover";
  const dotScale = isLinkTarget ? [1, 1.4, 1] : 1;
  const dotTransition = isLinkTarget
    ? { duration: 0.3, ease: "easeInOut" }
    : { duration: 0.2 };

  const trailRingData = [
    { x: trail1X, y: trail1Y, factor: TRAIL_FACTORS[0], opacity: TRAIL_OPACITIES[0] },
    { x: trail2X, y: trail2Y, factor: TRAIL_FACTORS[1], opacity: TRAIL_OPACITIES[1] },
    { x: trail3X, y: trail3Y, factor: TRAIL_FACTORS[2], opacity: TRAIL_OPACITIES[2] },
    { x: trail4X, y: trail4Y, factor: TRAIL_FACTORS[3], opacity: TRAIL_OPACITIES[3] },
    { x: trail5X, y: trail5Y, factor: TRAIL_FACTORS[4], opacity: TRAIL_OPACITIES[4] },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {trailRingData.map((trail, index) => (
        <motion.div
          key={`trail-${index}`}
          style={{
            x: trail.x,
            y: trail.y,
            translateX: "-50%",
            translateY: "-50%",
            width: ringSize * trail.factor,
            height: ringSize * trail.factor,
            rotate: rotation,
          }}
          animate={{
            borderColor: ringBorderColor,
            opacity: trail.opacity,
          }}
          transition={{ duration: 0.5 }}
          className="absolute rounded-full border-[1px] will-change-transform"
        />
      ))}

      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: dotScale,
          opacity: dotVisible ? 1 : 0,
        }}
        transition={dotTransition}
        className="absolute w-1.5 h-1.5 bg-white rounded-full mix-blend-difference will-change-transform"
      />

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
          scaleX,
          scaleY,
          borderRadius: ringBorderRadius,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: ringBorderColor,
          backgroundColor: cursorState === "hover" ? ringFillColor : "transparent",
          borderWidth: isButtonTarget ? 2 : 1.5,
          borderStyle: cursorState === "drag" ? "dashed" : "solid",
        }}
        transition={{ type: "spring", stiffness: 160, damping: 22, duration: 0.5 }}
        className="absolute flex items-center justify-center will-change-transform"
      >
        {isButtonTarget && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ borderRadius: ringBorderRadius, backgroundColor: ringFillColor }}
            animate={{
              clipPath: [
                "inset(100% 0 0 0 round 50%)",
                "inset(0 0 0 0 round 50%)",
                "inset(100% 0 0 0 round 50%)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <AnimatePresence>
          {cursorState === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: sectionColor }}
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
