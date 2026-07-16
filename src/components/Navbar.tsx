import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import NeoButton from "./NeoButton";
import { Menu, X, Sparkles, Sun, Moon, Palette } from "lucide-react";
import { useTheme, ACCENTS, AccentKey } from "@/context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { dark, toggleDark, accent, setAccent } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  // Close palette on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setShowPalette(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { href: "#about",    label: "About" },
    { href: "#skills",   label: "Skills" },
    { href: "#timeline", label: "Timeline" },
    { href: "#projects", label: "Projects" },
    { href: "#blog",     label: "Blog" },
    { href: "#contact",  label: "Contact" },
  ];

  const navVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, when: "afterChildren" } },
    open:   { opacity: 1, height: "auto", transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.1 } },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open:   { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b-[3px] border-foreground"
      variants={navVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-bold flex items-center gap-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.span>
            Công Dưỡng<span className="text-primary">.</span>dev
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-bold uppercase tracking-wide hover:bg-primary px-2 py-1 transition-colors relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: [-1, 1, -1, 0] }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* ── Theme controls ── */}
            <div className="flex items-center gap-1">
              {/* Dark mode toggle */}
              <motion.button
                onClick={toggleDark}
                className="w-9 h-9 flex items-center justify-center border-[3px] border-foreground bg-background hover:bg-primary transition-colors"
                style={{ boxShadow: "2px 2px 0 var(--foreground)" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={dark ? "Switch to Light" : "Switch to Dark"}
              >
                <AnimatePresence mode="wait">
                  {dark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun size={16} />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Accent color picker */}
              <div className="relative" ref={paletteRef}>
                <motion.button
                  onClick={() => setShowPalette((p) => !p)}
                  className="w-9 h-9 flex items-center justify-center border-[3px] border-foreground bg-background hover:bg-primary transition-colors"
                  style={{ boxShadow: "2px 2px 0 var(--foreground)" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Theme color"
                >
                  <Palette size={16} />
                </motion.button>

                <AnimatePresence>
                  {showPalette && (
                    <motion.div
                      className="absolute top-12 right-0 bg-background border-[3px] border-foreground p-3 flex flex-col gap-2 z-50"
                      style={{ boxShadow: "4px 4px 0 var(--foreground)", minWidth: "140px" }}
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-muted-foreground">Accent Color</p>
                      {(Object.entries(ACCENTS) as [AccentKey, typeof ACCENTS[AccentKey]][]).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => { setAccent(key); setShowPalette(false); }}
                          className="flex items-center gap-2 px-2 py-1.5 font-bold text-sm hover:bg-primary/30 transition-colors text-left"
                          style={{
                            border: accent === key ? "2px solid var(--foreground)" : "2px solid transparent",
                            background: accent === key ? `hsl(${val.hsl} / 0.3)` : undefined,
                          }}
                        >
                          <span
                            className="w-4 h-4 border-2 border-foreground inline-block shrink-0"
                            style={{ background: `hsl(${val.hsl})` }}
                          />
                          {val.label}
                          {accent === key && <span className="ml-auto text-xs">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={{ filter: "drop-shadow(3px 3px 0px var(--foreground))" }}>
                <NeoButton variant="primary" size="sm" className="hover-jello">
                  Hire Me 🚀
                </NeoButton>
              </div>
            </motion.div>
          </div>

          {/* Mobile: dark toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleDark}
              className="w-9 h-9 flex items-center justify-center border-[3px] border-foreground bg-background"
              whileTap={{ scale: 0.9 }}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            <motion.button
              className="neo-button bg-background p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block font-bold uppercase tracking-wide hover:bg-primary px-2 py-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                    variants={menuItemVariants}
                    whileHover={{ x: 10 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                {/* Mobile accent swatches */}
                <motion.div variants={menuItemVariants} className="flex gap-2 pt-1">
                  {(Object.entries(ACCENTS) as [AccentKey, typeof ACCENTS[AccentKey]][]).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setAccent(key)}
                      className="w-7 h-7 border-[3px] border-foreground"
                      style={{
                        background: `hsl(${val.hsl})`,
                        boxShadow: accent === key ? "2px 2px 0 var(--foreground)" : "none",
                        transform: accent === key ? "scale(1.2)" : "scale(1)",
                      }}
                      title={val.label}
                    />
                  ))}
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <NeoButton variant="primary" size="sm" className="w-full">
                    Hire Me 🚀
                  </NeoButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
