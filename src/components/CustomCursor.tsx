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
      {/* Main cursor - Bold square */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 border-[3px] border-white bg-transparent"
            animate={{
              width: isHovering ? 50 : 30,
              height: isHovering ? 50 : 30,
              borderRadius: isHovering ? '4px' : '0px',
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          />
          
          {/* Inner dot */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 bg-white"
            animate={{
              width: isClicking ? 12 : isHovering ? 8 : 6,
              height: isClicking ? 12 : isHovering ? 8 : 6,
              borderRadius: isHovering ? '0px' : '50%',
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          />
        </motion.div>

        {/* Cursor text label */}
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-6 top-6 px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider border-2 border-white whitespace-nowrap"
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>

      {/* Trailing shapes */}
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

// Trailing geometric shapes
const CursorTrail = ({ 
  cursorX, 
  cursorY, 
  isHovering 
}: { 
  cursorX: any; 
  cursorY: any; 
  isHovering: boolean;
}) => {
  const shapes = [
    { delay: 0.05, size: 12, color: 'bg-neo-pink' },
    { delay: 0.1, size: 10, color: 'bg-neo-blue' },
    { delay: 0.15, size: 8, color: 'bg-neo-yellow' },
  ];

  const springConfig = { damping: 30, stiffness: 200 };

  return (
    <>
      {shapes.map((shape, i) => {
        const delayedX = useSpring(cursorX, { ...springConfig, damping: springConfig.damping - i * 5 });
        const delayedY = useSpring(cursorY, { ...springConfig, damping: springConfig.damping - i * 5 });

        return (
          <motion.div
            key={i}
            className={`fixed top-0 left-0 pointer-events-none z-[9998] ${shape.color} border-2 border-black`}
            style={{
              x: delayedX,
              y: delayedY,
              width: shape.size,
              height: shape.size,
            }}
            animate={{
              rotate: isHovering ? 180 + i * 45 : i * 30,
              scale: isHovering ? 1.2 : 1,
              opacity: isHovering ? 1 : 0.7,
            }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div 
              className="w-full h-full -translate-x-1/2 -translate-y-1/2"
              style={{ marginLeft: -shape.size / 2, marginTop: -shape.size / 2 }}
            />
          </motion.div>
        );
      })}
    </>
  );
};

export default CustomCursor;
