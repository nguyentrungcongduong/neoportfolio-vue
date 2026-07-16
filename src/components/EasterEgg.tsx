import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

const CONFETTI_EMOJIS = ['🎉', '🌟', '🎊', '✨', '🥳', '💥', '🎈', '🏆', '💫', '⭐'];

// Generate confetti pieces once (stable)
const CONFETTI_PIECES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 1.5,
  duration: 2 + Math.random() * 2,
  size: 16 + Math.floor(Math.random() * 16),
  rotate: Math.random() * 360,
}));

// ──────────────────────────────────────────────
// Confetti Rain
// ──────────────────────────────────────────────
const ConfettiRain = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      borderRadius: 'inherit',
    }}
    aria-hidden="true"
  >
    {CONFETTI_PIECES.map((p) => (
      <motion.span
        key={p.id}
        initial={{ y: -50, opacity: 0, rotate: 0 }}
        animate={{
          y: '110%',
          opacity: [0, 1, 1, 0],
          rotate: p.rotate + 360,
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          repeatDelay: Math.random() * 1,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          left: p.left,
          top: 0,
          fontSize: p.size,
          display: 'inline-block',
          willChange: 'transform, opacity',
        }}
      >
        {p.emoji}
      </motion.span>
    ))}
  </div>
);

// ──────────────────────────────────────────────
// Modal
// ──────────────────────────────────────────────
const EasterEggModal = ({ onClose }: { onClose: () => void }) => {
  const [rewardClaimed, setRewardClaimed] = useState(false);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        id="easter-egg-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Modal Box */}
        <motion.div
          id="easter-egg-modal"
          initial={{ scale: 0, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 8 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 22,
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            backgroundColor: 'hsl(72, 100%, 72%)', // neo-yellow / primary
            border: '4px solid #000',
            boxShadow: '8px 8px 0px 0px #000',
            borderRadius: 0,
            padding: '2rem',
            maxWidth: 480,
            width: '100%',
            fontFamily: "'Space Grotesk', sans-serif",
            overflow: 'hidden',
          }}
        >
          {/* Confetti inside modal */}
          <ConfettiRain />

          {/* Close button */}
          <button
            id="easter-egg-close"
            onClick={onClose}
            aria-label="Đóng"
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              background: '#000',
              color: '#fff',
              border: '2px solid #000',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 18,
              cursor: 'none',
              zIndex: 10,
              lineHeight: 1,
            }}
          >
            ×
          </button>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
            {/* Title */}
            <motion.h2
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: '0 0 1rem',
                textShadow: '3px 3px 0 #000',
              }}
            >
              🎮 CHEAT CODE ACTIVATED!
            </motion.h2>

            {/* Divider */}
            <div
              style={{
                height: 4,
                backgroundColor: '#000',
                margin: '1rem 0',
              }}
            />

            {/* Body text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                margin: '0 0 1.5rem',
                lineHeight: 1.5,
              }}
            >
              Bạn đã tìm thấy Easter Egg!<br />
              Bạn thật sự là <span style={{ textDecoration: 'underline', textDecorationThickness: 3 }}>dev</span>! 🥕
            </motion.p>

            {/* Reward area */}
            <AnimatePresence mode="wait">
              {!rewardClaimed ? (
                <motion.button
                  id="easter-egg-reward-btn"
                  key="claim"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -4, boxShadow: '8px 8px 0px 0px #000' }}
                  whileTap={{ y: 2, boxShadow: '2px 2px 0px 0px #000' }}
                  onClick={() => setRewardClaimed(true)}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#000',
                    color: 'hsl(72, 100%, 72%)',
                    border: '3px solid #000',
                    padding: '0.75rem 2rem',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'none',
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.3)',
                    willChange: 'transform, box-shadow',
                  }}
                >
                  Nhận thưởng 🎁
                </motion.button>
              ) : (
                <motion.div
                  key="reward"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                  style={{
                    backgroundColor: '#000',
                    color: 'hsl(72, 100%, 72%)',
                    border: '3px solid #000',
                    padding: '1rem 1.5rem',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    letterSpacing: '0.04em',
                    boxShadow: '4px 4px 0 rgba(255,255,255,0.2)',
                  }}
                >
                  🏆 Phần thưởng: +9999 skill points! 💪
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer hint */}
            <p
              style={{
                marginTop: '1.5rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                opacity: 0.6,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

// ──────────────────────────────────────────────
// Main EasterEgg component
// ──────────────────────────────────────────────
const EasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sequenceRef = useRef<string[]>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      sequenceRef.current.push(e.code);

      // Keep only the last N keys
      if (sequenceRef.current.length > KONAMI.length) {
        sequenceRef.current.shift();
      }

      // Check match
      if (sequenceRef.current.join(',') === KONAMI.join(',')) {
        sequenceRef.current = [];
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && <EasterEggModal onClose={() => setIsOpen(false)} />}
    </AnimatePresence>
  );
};

export default EasterEgg;
