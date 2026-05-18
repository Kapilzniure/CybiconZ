import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useSignalFlicker(
  ref: React.RefObject<HTMLElement>,
  prefersReduced: boolean
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const scheduleFlicker = () => {
      const delay = 6000 + Math.random() * 8000;
      timerRef.current = setTimeout(() => {
        if (!ref.current) return;
        gsap.timeline()
          .to(ref.current, { opacity: 0.35, duration: 0.08, ease: "none" })
          .to(ref.current, { opacity: 1,    duration: 0.06, ease: "none" })
          .to(ref.current, { opacity: 0.5,  duration: 0.05, ease: "none" })
          .to(ref.current, {
            opacity: 1,
            duration: 0.08,
            ease: "none",
            onComplete: scheduleFlicker,
          });
      }, delay);
    };

    const startTimer = setTimeout(scheduleFlicker, 2000);

    return () => {
      clearTimeout(startTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [ref, prefersReduced]);
}
