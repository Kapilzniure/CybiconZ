import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  basevx: number; basevy: number;
  radius: number;
  baseOpacity: number;
  phase: number;
  colorIndex: 0 | 1 | 2;
}

const COLORS = [
  (a: number) => `rgba(255,255,255,${a})`,
  (a: number) => `rgba(0,196,255,${a})`,
  (a: number) => `rgba(57,255,20,${a})`,
];

function pickColorIndex(): 0 | 1 | 2 {
  const r = Math.random();
  if (r < 0.72) return 0;
  if (r < 0.94) return 1;
  return 2;
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const COUNT = prefersReduced ? 30 : isMobile ? 120 : 200;

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };
    let scrollY = 0;
    let opacityMultiplier = 0;
    let rafId = 0;
    let startTime = performance.now();

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles = Array.from({ length: COUNT }, () => {
        const bvx = (Math.random() - 0.5) * 0.28;
        const bvy = (Math.random() - 0.5) * 0.28;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: bvx, vy: bvy,
          basevx: bvx, basevy: bvy,
          radius: 0.8 + Math.random() * 1.8,
          baseOpacity: prefersReduced
            ? 0.05 + Math.random() * 0.1
            : 0.12 + Math.random() * 0.32,
          phase: Math.random() * Math.PI * 2,
          colorIndex: pickColorIndex(),
        };
      });
    };

    const REPEL_RADIUS = 130;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      const elapsed = (performance.now() - startTime) / 1000;
      // Ramp up opacity over 1.4 seconds
      opacityMultiplier = Math.min(1, opacityMultiplier + 0.006);
      const scrollFade = Math.max(0, 1 - scrollY / 420);
      const globalAlpha = opacityMultiplier * scrollFade;

      for (const p of particles) {
        // Cursor repulsion
        if (!isMobile && !prefersReduced) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * 1.4;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            const maxV = 3;
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > maxV) { p.vx = (p.vx / speed) * maxV; p.vy = (p.vy / speed) * maxV; }
          }
        }

        // Drift back
        p.vx = p.vx * 0.95 + p.basevx * 0.05;
        p.vy = p.vy * 0.95 + p.basevy * 0.05;

        // Move + wrap
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        // Breathing
        const breathe = 0.55 + 0.45 * Math.sin(elapsed * 0.7 + p.phase);
        const alpha = p.baseOpacity * breathe * globalAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.colorIndex === 1) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(0,196,255,0.4)";
          ctx.fillStyle = COLORS[1](alpha);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (p.colorIndex === 2) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(57,255,20,0.35)";
          ctx.fillStyle = COLORS[2](alpha);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = COLORS[0](alpha);
          ctx.fill();
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onScroll = () => { scrollY = window.scrollY; };

    const ro = new ResizeObserver(() => { resize(); initParticles(); });

    resize();
    initParticles();
    tick();

    if (!isMobile && !prefersReduced) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}