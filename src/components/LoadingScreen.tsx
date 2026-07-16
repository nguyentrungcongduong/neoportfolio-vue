import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Initializing portfolio...",
  "Loading projects...",
  "Brewing coffee ☕...",
  "Deploying awesomeness...",
  "Almost there...",
];

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Progress bar fills in ~1.8s
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 18 + 6;
        return next >= 100 ? 100 : next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cycle through status lines
    const t = setInterval(() => {
      setLineIdx((i) => (i + 1) % LINES.length);
    }, 400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setLeaving(true);
        setTimeout(onDone, 600);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999999] bg-background flex flex-col items-center justify-center gap-8 overflow-hidden"
          exit={{ y: "-100%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Bouncing emoji */}
          <motion.div
            className="text-7xl select-none"
            animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          >
            🥕
          </motion.div>

          {/* Name */}
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-black tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Công Dưỡng
              <span className="text-primary"> .dev</span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-sm mt-1 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Full Stack Developer
            </motion.p>
          </div>

          {/* Progress bar */}
          <motion.div
            className="w-72 md:w-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Bar track */}
            <div className="h-4 border-[3px] border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            </div>
            {/* Status text */}
            <div className="flex justify-between items-center mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lineIdx}
                  className="text-xs font-mono text-muted-foreground"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {LINES[lineIdx]}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs font-black font-mono">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </motion.div>

          {/* Decorative corner tags */}
          {["REACT", "NODE", "JAVA", "PHP"].map((tag, i) => (
            <motion.div
              key={tag}
              className="absolute text-[10px] font-black px-2 py-1 border-[2px] border-foreground bg-primary"
              style={{
                top: i < 2 ? "1.5rem" : undefined,
                bottom: i >= 2 ? "1.5rem" : undefined,
                left: i % 2 === 0 ? "1.5rem" : undefined,
                right: i % 2 === 1 ? "1.5rem" : undefined,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i + 0.2, type: "spring" }}
            >
              {tag} ⚡
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
