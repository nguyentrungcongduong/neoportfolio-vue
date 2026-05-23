import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Show progress bar only after scrolling a bit
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 bg-transparent z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-primary border-b-[3px] border-foreground origin-left"
        style={{ 
          scaleX,
          boxShadow: '0 2px 0 rgba(0,0,0,0.1)'
        }}
      />
      {/* Progress indicator percentage */}
      <motion.div
        className="absolute top-4 right-4 px-2 py-1 bg-foreground text-background text-xs font-bold border-2 border-foreground"
        style={{
          boxShadow: '2px 2px 0 rgba(0,0,0,1)'
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -10
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ScrollPercentage />
      </motion.div>
    </motion.div>
  );
};

// Separate component to show percentage
const ScrollPercentage = () => {
  const [percentage, setPercentage] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return <span>{percentage}%</span>;
};

export default ScrollProgress;
