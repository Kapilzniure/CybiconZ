import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useSignalFlicker(
  ref: React.RefObject<HTMLElement>,
  prefersReduced: boolean
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const schedule = () => {
      const delay = 6000 + Math.random() * 8000; // 6–14 seconds
      timerRef.current = setTimeout(() => {
        if (!ref.current) return;
        gsap.timeline()
          .to(ref.current, { opacity: 0.3, duration: 0.07, ease: "none" })
          .to(ref.current, { opacity: 1,   duration: 0.05, ease: "none" })
          .to(ref.current, { opacity: 0.5, duration: 0.06, ease: "none" })
          .to(ref.current, { opacity: 1,   duration: 0.08, ease: "none",
            onComplete: schedule })
      }, delay);
    };

    // Start after intro finishes
    const init = setTimeout(schedule, 2000);
    return () => {
      clearTimeout(init);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [ref, prefersReduced]);
}