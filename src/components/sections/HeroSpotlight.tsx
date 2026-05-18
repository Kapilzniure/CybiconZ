import { useEffect, useRef } from "react";

export default function HeroSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let W = 0;
    let H = 0;
    let mouse = { x: -9999, y: -9999 };
    let currentX = -9999;
    let currentY = -9999;
    let rafId = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);

      currentX += (mouse.x - currentX) * 0.08;
      currentY += (mouse.y - currentY) * 0.08;

      if (currentX < 0) return;

      const gradient = ctx.createRadialGradient(
        currentX, currentY, 0,
        currentX, currentY, 280
      );
      gradient.addColorStop(0, "rgba(255,255,255,0.04)");
      gradient.addColorStop(0.4, "rgba(0,196,255,0.025)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const ro = new ResizeObserver(resize);
    resize();
    tick();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  );
}
