import { useEffect, useRef } from "react";

// Lightweight canvas confetti — no dependency. Respects reduced motion.
export function Confetti({ duration = 2500 }: { duration?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const colors = ["#7aa2f7", "#9ece6a", "#ff9e64", "#bb9af7", "#f7768e"];
    const N = 140;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.5,
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      s: 4 + Math.random() * 4,
      c: colors[Math.floor(Math.random() * colors.length)],
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.2,
    }));
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
        ctx.restore();
      }
      if (t - start < duration) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}