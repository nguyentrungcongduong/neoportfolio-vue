import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 8;           // giảm từ 12 → 8
const EMOJIS = ['✨', '⭐', '💫'];
const THROTTLE_MS = 40;           // tăng từ 30 → 40ms
const IDLE_TIMEOUT_MS = 300;      // dừng RAF sau 300ms không move chuột

interface Particle {
  x: number;
  y: number;
  emoji: string;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastAddedRef = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    if (window.innerWidth <= 768) return;          // skip mobile
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // respect a11y

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Draw one frame and stop when particles are gone
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const len = particles.length;

      if (len === 0) {
        isRunningRef.current = false;
        return;                                    // stop RAF when no particles
      }

      for (let i = 0; i < len; i++) {
        const p = particles[i];
        const relativeAge = len - 1 - i;          // 0 = newest
        const lifeFraction = relativeAge / TRAIL_LENGTH;
        const opacity = Math.max(0, 1 - lifeFraction);
        if (opacity <= 0.02) continue;

        const fontSize = Math.round((12 + (1 - lifeFraction) * 4));
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.font = `${fontSize}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, p.x, p.y - lifeFraction * 8);
        ctx.restore();
      }

      // Trim oldest particle each frame
      if (particles.length >= TRAIL_LENGTH) particles.shift();

      rafRef.current = requestAnimationFrame(draw);
    };

    const startRAF = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastAddedRef.current < THROTTLE_MS) return;
      lastAddedRef.current = now;

      particlesRef.current.push({
        x: e.clientX + (Math.random() - 0.5) * 8,
        y: e.clientY + (Math.random() - 0.5) * 8,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      });

      if (particlesRef.current.length > TRAIL_LENGTH) {
        particlesRef.current.shift();
      }

      startRAF();

      // Reset idle timer — stop adding but let RAF clear particles naturally
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        // don't add more; RAF will stop itself when particles drain
      }, IDLE_TIMEOUT_MS);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9990,
      }}
      aria-hidden="true"
    />
  );
};

export default CursorTrail;
