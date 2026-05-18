import { useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";

interface ScrambleTextProps {
  text: string;
  trigger: boolean;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function ScrambleText({
  text,
  trigger,
  duration = 800,
  style,
  className,
  innerRef,
}: ScrambleTextProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  // Merge internal ref with forwarded innerRef (for GSAP access in parent)
  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      elRef.current = el;
      if (!innerRef) return;
      if (typeof innerRef === "function") {
        innerRef(el);
      } else {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }
    },
    [innerRef],
  );

  // Fire once when trigger flips to true
  useEffect(() => {
    if (!trigger) return;
    const el = elRef.current;
    if (!el) return;

    cancelAnimationFrame(rafRef.current);
    const startTime = performance.now();

    // Characters settle left-to-right: char at index i settles at settleAt(i) ms
    function animate(now: number) {
      if (!el) return;
      const elapsed = now - startTime;
      let result = "";
      let allSettled = true;

      for (let i = 0; i < text.length; i++) {
        const settleAt = (i / text.length) * duration * 0.8;
        if (elapsed >= settleAt) {
          result += text[i];
        } else {
          allSettled = false;
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      // Write directly to DOM — zero React re-renders during scramble
      el.textContent = result;

      if (!allSettled || elapsed < duration) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        el.textContent = text;
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, text, duration]);

  return (
    // Children provide initial text content (visible during GSAP slide-up)
    <div ref={setRef} className={className} style={style}>
      {text}
    </div>
  );
}
