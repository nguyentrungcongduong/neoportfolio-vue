import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 12;
const EMOJIS = ['✨', '⭐', '💫'];

interface Particle {
  x: number;
  y: number;
  age: number; // 0 = newest, TRAIL_LENGTH - 1 = oldest
  emoji: string;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const lastAddedRef = useRef<number>(0);

  useEffect(() => {
    // Only show on non-mobile
    if (window.innerWidth <= 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to fill viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position and add new particle every ~30ms
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      if (now - lastAddedRef.current > 30) {
        lastAddedRef.current = now;

        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

        // Add slight random offset so particles don't all stack exactly
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;

        particlesRef.current.push({
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          age: 0,
          emoji,
        });

        // Keep array length bounded
        if (particlesRef.current.length > TRAIL_LENGTH) {
          particlesRef.current.shift();
        }
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      particles.forEach((p, i) => {
        // Age goes from 0 (newest, at the end) to particles.length-1 (oldest)
        // Re-map: newest particle index is particles.length - 1 in the array (last pushed)
        const relativeAge = particles.length - 1 - i; // 0 = newest
        const lifeFraction = relativeAge / TRAIL_LENGTH; // 0 = newest, 1 = oldest

        const opacity = Math.max(0, 1 - lifeFraction);
        const scale = Math.max(0, 1 - lifeFraction * 0.7);
        const fontSize = Math.round((14 + (1 - lifeFraction) * 4) * scale); // 12–18px

        if (opacity <= 0 || fontSize <= 0) return;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.font = `${fontSize}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Slight upward drift for older particles
        const drift = lifeFraction * 8;
        ctx.fillText(p.emoji, p.x, p.y - drift);
        ctx.restore();
      });

      // Gradually age out & remove fully-faded particles
      if (particles.length > 0) {
        // Remove particle when it would be older than TRAIL_LENGTH slots
        if (particles.length >= TRAIL_LENGTH) {
          particles.shift();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(rafRef.current);
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
