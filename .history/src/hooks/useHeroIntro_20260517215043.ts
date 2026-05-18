import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";

interface UseHeroIntroOptions {
  canvasWrapperRef?:  RefObject<HTMLElement>;
  topBarRef?:         RefObject<HTMLElement>;
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
  topBarRef,
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
    let breathingTween: gsap.core.Tween | null = null;
    let breathingTimer: ReturnType<typeof setTimeout> | null = null;
    let scrollTimer:    ReturnType<typeof setTimeout> | null = null;
    let scrollCleanup:  (() => void) | null = null;

    const ctx = gsap.context(() => {

      // ─── REDUCED MOTION: snap everything to final visible state ───────
      if (prefersReduced) {
        if (canvasWrapperRef?.current)
          gsap.set(canvasWrapperRef.current, { opacity: 0.4 });
        if (topBarRef?.current)
          gsap.set(topBarRef.current, { opacity: 1, y: 0 });
        gsap.set(eyebrowRef.current, { clipPath: "inset(0 0% 0 0)" });
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { yPercent: 0 });
        gsap.set(line2Ref.current, {
          textShadow: "0 0 60px rgba(0,196,255,0.5), 0 0 130px rgba(0,196,255,0.15)",
        });
        gsap.set([subtitleRef.current, ctaRowRef.current], { opacity: 1, y: 0 });
        if (scrollIndicatorRef.current)
          gsap.set(scrollIndicatorRef.current, { opacity: 0.4 });
        if (statsRef.current)
          gsap.set(
            statsRef.current.querySelectorAll("[data-stat-item]"),
            { opacity: 1, y: 0 },
          );
        return;
      }

      // ─── SET INITIAL HIDDEN STATES ────────────────────────────────────
      // GSAP owns these properties — nothing in JSX should set them too.

      if (canvasWrapperRef?.current)
        gsap.set(canvasWrapperRef.current, { opacity: 0 });

      if (topBarRef?.current)
        gsap.set(topBarRef.current, { opacity: 0, y: -10 });

      gsap.set(eyebrowRef.current, { clipPath: "inset(0 100% 0 0)" });

      gsap.set(line1Ref.current, { yPercent: 110 });
      gsap.set(line2Ref.current, {
        yPercent:   110,
        textShadow: "0 0 0px rgba(0,196,255,0)",
      });
      gsap.set(line3Ref.current, { yPercent: 110 });

      gsap.set(subtitleRef.current, { opacity: 0, y: 16 });
      gsap.set(ctaRowRef.current,   { opacity: 0, y: 16 });

      if (scrollIndicatorRef.current)
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });

      if (statsRef.current)
        gsap.set(
          statsRef.current.querySelectorAll("[data-stat-item]"),
          { opacity: 0, y: 8 },
        );

      // ─── MASTER TIMELINE ──────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // t=0ms    Three.js city fades in slowly
      if (canvasWrapperRef?.current)
        tl.to(canvasWrapperRef.current,
          { opacity: 0.42, duration: 1.2, ease: "power1.inOut" }, 0);

      // t=0ms    Top info bar slides down
      if (topBarRef?.current)
        tl.to(topBarRef.current,
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 0);

      // t=160ms  Eyebrow reveals left → right
      tl.to(eyebrowRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 0.65, ease: "power2.out" }, 0.16);

      // t=380ms  "We build" label (small, mono)
      tl.to(line1Ref.current,
        { yPercent: 0, duration: 0.85, ease: "expo.out" }, 0.38);

      // t=520ms  "digital" — the hero word
      tl.to(line2Ref.current,
        {
          yPercent:   0,
          duration:   0.9,
          ease:       "expo.out",
          onComplete: () => onLine2CompleteRef.current?.(),
        }, 0.52);

      // t=660ms  "products."
      tl.to(line3Ref.current,
        { yPercent: 0, duration: 0.9, ease: "expo.out" }, 0.66);

      // t=900ms  Subtitle fades up
      tl.to(subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.7 }, 0.9);

      // t=1080ms CTAs fade up
      tl.to(ctaRowRef.current,
        { opacity: 1, y: 0, duration: 0.6 }, 1.08);

      // t=1280ms Stats stagger up
      if (statsRef.current)
        tl.to(
          statsRef.current.querySelectorAll("[data-stat-item]"),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
          1.28,
        );

      // t=1480ms Scroll indicator
      if (scrollIndicatorRef.current)
        tl.to(scrollIndicatorRef.current,
          { opacity: 0.4, duration: 0.5 }, 1.48);

      // t=1420ms "digital" breathing glow starts after its reveal lands
      // (handled via setTimeout outside ctx so it survives ctx.revert safely)
    });

    // ─── BREATHING GLOW on "digital" ─────────────────────────────────────
    // Starts after line2 reveal finishes (~0.52 + 0.9 = 1.42s)
    if (!prefersReduced) {
      breathingTimer = setTimeout(() => {
        if (!line2Ref.current) return;
        breathingTween = gsap.to(line2Ref.current, {
          textShadow:
            "0 0 80px rgba(0,196,255,0.65), 0 0 160px rgba(0,196,255,0.22)",
          duration: 3.5,
          repeat:   -1,
          yoyo:     true,
          ease:     "power1.inOut",
          // Start from the resting glow that the timeline left
          immediateRender: false,
        });
      }, 1420);

      // ─── SCROLL INDICATOR dismiss ───────────────────────────────────────
      scrollTimer = setTimeout(() => {
        if (!scrollIndicatorRef.current) return;
        const onScroll = () => {
          if (window.scrollY > 80) {
            if (scrollIndicatorRef.current)
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
      breathingTween?.kill();
      if (breathingTimer !== null) clearTimeout(breathingTimer);
      if (scrollTimer    !== null) clearTimeout(scrollTimer);
      scrollCleanup?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced]);
}