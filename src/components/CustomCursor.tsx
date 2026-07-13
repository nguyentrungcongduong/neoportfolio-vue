import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);

        // Check for specific cursor text
        const cursorLabel = target.getAttribute('data-cursor') ||
          target.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (cursorLabel) {
          setCursorText(cursorLabel);
        }
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor - LoL cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: "transform"
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.65 : isHovering ? 1.25 : 1,
            rotate: isClicking ? 15 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 350 }}
          style={{ willChange: "transform" }}
        >
          <motion.img
            src="/lol_cursor.png"
            alt=""
            className="select-none"
            style={{
              width: isHovering ? 44 : 36,
              height: isHovering ? 44 : 36,
              willChange: "transform",
              filter: isHovering
                ? "drop-shadow(0 0 8px #c89b3c) drop-shadow(0 0 16px #f0c060) brightness(1.2)"
                : isClicking
                ? "drop-shadow(0 0 12px #fff) brightness(1.4)"
                : "drop-shadow(0 0 3px rgba(200,155,60,0.6))",
              transition: "width 0.15s, height 0.15s, filter 0.15s",
            }}
            animate={{
              rotate: isHovering ? [0, -8, 8, -8, 0] : 0,
            }}
            transition={{
              duration: 0.4,
              repeat: isHovering ? Infinity : 0,
              repeatDelay: 0.5,
            }}
          />
        </motion.div>

        {/* Cursor text label */}
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-8 top-8 px-3 py-1 bg-neo-yellow text-black text-xs font-bold uppercase tracking-wider border-3 border-black shadow-neo whitespace-nowrap"
            style={{ willChange: "transform, opacity" }}
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>

      {/* Trailing cute elements */}
      <CursorTrail cursorX={cursorXSpring} cursorY={cursorYSpring} isHovering={isHovering} />

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

// Trailing cute elements
const CursorTrail = ({
  cursorX,
  cursorY,
  isHovering
}: {
  cursorX: any;
  cursorY: any;
  isHovering: boolean;
}) => {
  const items = [
    { emoji: '🌱', size: 16 },
    { emoji: '🍃', size: 14 },
    { emoji: '💚', size: 12 },
  ];

  const springConfig = { damping: 40, stiffness: 200 };

  return (
    <>
      {items.map((item, i) => {
        const delayedX = useSpring(cursorX, { ...springConfig, damping: springConfig.damping - i * 5 });
        const delayedY = useSpring(cursorY, { ...springConfig, damping: springConfig.damping - i * 5 });

        return (
          <motion.div
            key={i}
            className="fixed top-0 left-0 pointer-events-none z-[9998] select-none"
            style={{
              x: delayedX,
              y: delayedY,
              fontSize: item.size,
              willChange: "transform"
            }}
            animate={{
              rotate: isHovering ? 360 : i * 20,
              scale: isHovering ? 1.3 : 0.9,
              opacity: isHovering ? 1 : 0.6,
            }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <span className="-translate-x-1/2 -translate-y-1/2 block drop-shadow-sm">
              {item.emoji}
            </span>
          </motion.div>
        );
      })}
    </>
  );
};

export default CustomCursor;
