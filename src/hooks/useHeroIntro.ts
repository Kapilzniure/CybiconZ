import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";

interface UseHeroIntroOptions {
  canvasWrapperRef:   RefObject<HTMLElement>;
  eyebrowRef:         RefObject<HTMLElement>;
  line1Ref:           RefObject<HTMLElement>;
  line2Ref:           RefObject<HTMLElement>;
  line3Ref:           RefObject<HTMLElement>;
  subtitleRef:        RefObject<HTMLElement>;
  ctaRowRef:          RefObject<HTMLElement>;
  statsRef:           RefObject<HTMLElement>;
  scrollIndicatorRef: RefObject<HTMLElement>;
  prefersReduced:     boolean;
  onLine2Complete?:   () => void;
}

export function useHeroIntro({
  canvasWrapperRef,
  eyebrowRef,
  line1Ref,
  line2Ref,
  line3Ref,
  subtitleRef,
  ctaRowRef,
  statsRef,
  scrollIndicatorRef,
  prefersReduced,
  onLine2Complete,
}: UseHeroIntroOptions): void {
  const onLine2CompleteRef = useRef(onLine2Complete);
  onLine2CompleteRef.current = onLine2Complete;

  useEffect(() => {
    let scrollTimer:     ReturnType<typeof setTimeout> | null = null;
    let scrollCleanup:   (() => void) | null = null;

    const ctx = gsap.context(() => {

      // ── Reduced motion: snap everything to final state ──────────
      if (prefersReduced) {
        gsap.set(canvasWrapperRef.current,  { opacity: 0.5 });
        gsap.set(eyebrowRef.current,        { opacity: 1 });
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { opacity: 1, y: 0 });
        gsap.set([subtitleRef.current, ctaRowRef.current], { opacity: 1, y: 0 });
        gsap.set(scrollIndicatorRef.current, { opacity: 0.4 });
        if (statsRef.current) {
          gsap.set(statsRef.current.querySelectorAll("[data-stat-item]"), { opacity: 1, y: 0 });
        }
        return;
      }

      // ── Set initial hidden states — GSAP owns these, NOT JSX ────
      gsap.set(canvasWrapperRef.current,  { opacity: 0 });
      gsap.set(eyebrowRef.current,        { opacity: 0, x: -12 });
      gsap.set(line1Ref.current,          { opacity: 0, y: 24 });
      gsap.set(line2Ref.current,          { opacity: 0, y: 24 });
      gsap.set(line3Ref.current,          { opacity: 0, y: 24 });
      gsap.set([subtitleRef.current, ctaRowRef.current], { opacity: 0, y: 16 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      if (statsRef.current) {
        gsap.set(statsRef.current.querySelectorAll("[data-stat-item]"), { opacity: 0, y: 8 });
      }

      // ── Master timeline ──────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // t=0 — canvas fades in slowly as scene loads
      tl.to(canvasWrapperRef.current,  { opacity: 0.5, duration: 2.0, ease: "power1.out" }, 0);

      // t=0.16 — eyebrow fades + slides in
      tl.to(eyebrowRef.current,        { opacity: 1, x: 0, duration: 0.8 }, 0.16);

      // t=0.38 — "We build" fades up
      tl.to(line1Ref.current,          { opacity: 1, y: 0, duration: 0.9 }, 0.38);

      // t=0.52 — "digital" fades up
      tl.to(line2Ref.current,          { opacity: 1, y: 0, duration: 0.9 }, 0.52);

      // t=0.66 — "products." fades up
      tl.to(line3Ref.current,          {
        opacity: 1, y: 0, duration: 0.9,
        onComplete: () => onLine2CompleteRef.current?.(),
      }, 0.66);

      // t=0.90 — subtitle fades up
      tl.to(subtitleRef.current,       { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.90);

      // t=1.08 — CTAs fade up
      tl.to(ctaRowRef.current,         { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.08);

      // t=1.28 — stats stagger in
      if (statsRef.current) {
        tl.to(statsRef.current.querySelectorAll("[data-stat-item]"), {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.08,
        }, 1.28);
      }

      // t=1.48 — scroll indicator
      tl.to(scrollIndicatorRef.current, { opacity: 0.4, duration: 0.5, ease: "power1.out" }, 1.48);
    });

    // Dismiss scroll indicator on first scroll
    if (!prefersReduced) {
      scrollTimer = setTimeout(() => {
        const onScroll = () => {
          if (window.scrollY > 80) {
            gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 });
            window.removeEventListener("scroll", onScroll);
            scrollCleanup = null;
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        scrollCleanup = () => window.removeEventListener("scroll", onScroll);
      }, 1600);
    }

    return () => {
      ctx.revert();
      if (scrollTimer)    clearTimeout(scrollTimer);
      scrollCleanup?.();
    };
  }, [prefersReduced]); // eslint-disable-line react-hooks/exhaustive-deps
}