import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";

interface UseHeroIntroOptions {
  canvasWrapperRef?:   RefObject<HTMLElement>;
  topBarRef?:          RefObject<HTMLElement>;
  eyebrowRef:          RefObject<HTMLElement>;
  line1Ref:            RefObject<HTMLElement>;
  line2Ref:            RefObject<HTMLElement>;
  line3Ref:            RefObject<HTMLElement>;
  subtitleRef:         RefObject<HTMLElement>;
  ctaRowRef:           RefObject<HTMLElement>;
  statsRef:            RefObject<HTMLElement>;
  scrollIndicatorRef:  RefObject<HTMLElement>;
  prefersReduced:      boolean;
  onLine2Complete?:    () => void;
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
  // Stable ref so GSAP closure always calls the latest callback
  const onLine2CompleteRef = useRef(onLine2Complete);
  onLine2CompleteRef.current = onLine2Complete;

  useEffect(() => {
    // Guard: critical refs must be mounted before we touch GSAP
    if (
      !eyebrowRef.current ||
      !line1Ref.current   ||
      !line2Ref.current   ||
      !line3Ref.current   ||
      !subtitleRef.current ||
      !ctaRowRef.current
    ) return;

    let breathingTween:  gsap.core.Tween | null = null;
    let breathingTimer:  ReturnType<typeof setTimeout> | null = null;
    let scrollTimer:     ReturnType<typeof setTimeout> | null = null;
    let scrollCleanup:   (() => void) | null = null;

    const ctx = gsap.context(() => {

      // ── Reduced motion: snap everything to final visible state ──
      if (prefersReduced) {
        if (canvasWrapperRef?.current)
          gsap.set(canvasWrapperRef.current, { opacity: 0.4 });
        if (topBarRef?.current)
          gsap.set(topBarRef.current, { opacity: 1, y: 0 });
        gsap.set(eyebrowRef.current, { clipPath: "inset(0 0% 0 0)" });
        gsap.set(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          { yPercent: 0 },
        );
        gsap.set(
          [subtitleRef.current, ctaRowRef.current],
          { opacity: 1, y: 0 },
        );
        if (scrollIndicatorRef.current)
          gsap.set(scrollIndicatorRef.current, { opacity: 0.4 });
        if (statsRef.current)
          gsap.set(
            statsRef.current.querySelectorAll("[data-stat-item]"),
            { opacity: 1, y: 0 },
          );
        return;
      }

      // ── Set initial invisible states ──
      if (canvasWrapperRef?.current)
        gsap.set(canvasWrapperRef.current, { opacity: 0 });
      if (topBarRef?.current)
        gsap.set(topBarRef.current, { opacity: 0, y: -8 });

      gsap.set(eyebrowRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(line1Ref.current,   { yPercent: 110 });
      gsap.set(line2Ref.current,   {
        yPercent:   110,
        textShadow: "0 0 60px rgba(0,196,255,0.38), 0 0 130px rgba(0,196,255,0.10)",
      });
      gsap.set(line3Ref.current,   { yPercent: 110 });
      gsap.set(
        [subtitleRef.current, ctaRowRef.current],
        { opacity: 0, y: 16 },
      );
      if (scrollIndicatorRef.current)
        gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      if (statsRef.current)
        gsap.set(
          statsRef.current.querySelectorAll("[data-stat-item]"),
          { opacity: 0, y: 8 },
        );

      // ── Master timeline ──
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // t=0ms   — Three.js city fades in
      if (canvasWrapperRef?.current) {
        tl.to(
          canvasWrapperRef.current,
          { opacity: 0.42, duration: 1.0, ease: "power1.inOut" },
          0,
        );
      }

      // t=0ms   — Top info bar slides down
      if (topBarRef?.current) {
        tl.to(
          topBarRef.current,
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          0,
        );
      }

      // t=160ms — Eyebrow line reveals left→right
      tl.to(
        eyebrowRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 0.6 },
        0.16,
      );

      // t=380ms — Headline line 1 ("We build")
      tl.to(
        line1Ref.current,
        { yPercent: 0, duration: 0.85, ease: "expo.out" },
        0.38,
      );

      // t=520ms — Headline line 2 ("digital")
      tl.to(
        line2Ref.current,
        {
          yPercent: 0,
          duration: 0.9,
          ease: "expo.out",
          onComplete: () => onLine2CompleteRef.current?.(),
        },
        0.52,
      );

      // t=660ms — Headline line 3 ("products.")
      tl.to(
        line3Ref.current,
        { yPercent: 0, duration: 0.9, ease: "expo.out" },
        0.66,
      );

      // t=900ms — Subtitle
      tl.to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.7 },
        0.9,
      );

      // t=1080ms — CTAs
      tl.to(
        ctaRowRef.current,
        { opacity: 1, y: 0, duration: 0.6 },
        1.08,
      );

      // t=1280ms — Stats stagger
      if (statsRef.current) {
        tl.to(
          statsRef.current.querySelectorAll("[data-stat-item]"),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
          1.28,
        );
      }

      // t=1480ms — Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          { opacity: 0.4, duration: 0.5 },
          1.48,
        );
      }
    });

    // Breathing glow on "digital" — fires after line 2 reveal completes (~1.42s)
    breathingTimer = setTimeout(() => {
      if (!line2Ref.current) return;
      breathingTween = gsap.to(line2Ref.current, {
        textShadow:
          "0 0 90px rgba(0,196,255,0.78), 0 0 180px rgba(0,196,255,0.28)",
        duration:  4,
        repeat:    -1,
        yoyo:      true,
        ease:      "power1.inOut",
      });
    }, 1420);

    // Scroll dismiss — scroll indicator fades when user scrolls
    scrollTimer = setTimeout(() => {
      if (!scrollIndicatorRef.current) return;
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