import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const pets = [
  { emoji: "🐱", name: "Mèo" },
  { emoji: "🐶", name: "Chó" },
  { emoji: "🐰", name: "Thỏ" },
  { emoji: "🐼", name: "Gấu trúc" },
  { emoji: "🦊", name: "Cáo" },
];

const FloatingPet = () => {
  const [currentPet, setCurrentPet] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Position values
  const x = useMotionValue(100);
  const y = useMotionValue(100);
  
  // Smooth spring physics
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });
  
  // Direction for flipping
  const [direction, setDirection] = useState(1);
  
  // Movement parameters
  const speed = useRef(1.5);
  const targetX = useRef(Math.random() * 300 + 50);
  const targetY = useRef(Math.random() * 300 + 100);
  
  useAnimationFrame(() => {
    if (isHovered) return;
    
    const currentX = x.get();
    const currentY = y.get();
    
    // Calculate distance to target
    const dx = targetX.current - currentX;
    const dy = targetY.current - currentY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If close to target, pick new target
    if (distance < 20) {
      const maxX = (containerRef.current?.parentElement?.clientWidth || window.innerWidth) - 80;
      const maxY = (containerRef.current?.parentElement?.clientHeight || window.innerHeight) - 80;
      targetX.current = Math.random() * Math.min(maxX, 400) + 50;
      targetY.current = Math.random() * Math.min(maxY, 600) + 100;
    }
    
    // Move towards target
    const moveX = (dx / distance) * speed.current;
    const moveY = (dy / distance) * speed.current;
    
    // Update direction for flip
    if (moveX > 0.1) setDirection(1);
    if (moveX < -0.1) setDirection(-1);
    
    x.set(currentX + moveX);
    y.set(currentY + moveY);
  });

  // Change pet on click
  const handleClick = () => {
    setCurrentPet((prev) => (prev + 1) % pets.length);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  // Random messages
  const messages = [
    "Xin chào! 👋",
    "Bạn khỏe không? 💖",
    "Nhấn vào tôi nè! ✨",
    "Trang web đẹp quá! 🌟",
    "Cảm ơn bạn đã ghé thăm! 🎉",
  ];
  
  const [randomMessage] = useState(() => 
    messages[Math.floor(Math.random() * messages.length)]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed z-40 cursor-pointer select-none"
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Speech Bubble */}
      <motion.div
        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-background border-[3px] border-foreground px-3 py-2 rounded-lg whitespace-nowrap"
        initial={{ opacity: 0, scale: 0, y: 10 }}
        animate={showMessage ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 10 }}
        style={{ boxShadow: "3px 3px 0px 0px hsl(0 0% 0%)" }}
      >
        <span className="text-sm font-bold">{randomMessage}</span>
        {/* Triangle */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-foreground" />
      </motion.div>

      {/* Pet Container */}
      <motion.div
        className="relative"
        animate={{
          scaleX: direction,
          rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
        }}
        transition={{
          rotate: { duration: 0.5, repeat: isHovered ? Infinity : 0 },
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Shadow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-foreground/20 rounded-full"
          animate={{
            scale: isHovered ? 1.2 : [1, 0.8, 1],
            opacity: isHovered ? 0.3 : [0.2, 0.1, 0.2],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        
        {/* Pet Emoji */}
        <motion.span
          className="text-5xl block"
          animate={
            isHovered
              ? { y: -10 }
              : { y: [0, -10, 0] }
          }
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {pets[currentPet].emoji}
        </motion.span>
        
        {/* Sparkles around pet when hovered */}
        {isHovered && (
          <>
            <motion.span
              className="absolute -top-2 -left-2 text-lg"
              animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute -top-2 -right-2 text-lg"
              animate={{ scale: [0, 1, 0], rotate: [0, -180] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            >
              💫
            </motion.span>
            <motion.span
              className="absolute -bottom-2 left-1/2 text-lg"
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            >
              ⭐
            </motion.span>
          </>
        )}
      </motion.div>
      
      {/* Pet name tooltip */}
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold bg-primary px-2 py-0.5 border-2 border-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{ boxShadow: "2px 2px 0px 0px hsl(0 0% 0%)" }}
      >
        {pets[currentPet].name}
      </motion.div>
    </motion.div>
  );
};

export default FloatingPet;
