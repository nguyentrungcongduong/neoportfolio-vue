import { motion, AnimatePresence } from "framer-motion";
import NeoButton from "./NeoButton";
import NeoBadge from "./NeoBadge";
import { Github, Facebook, Mail, ArrowDown, Sparkles, Code2, Briefcase, Award, Coffee, Download, ChevronDown, FileCode2, Code } from "lucide-react";
import avatarImg from "../assets/projects/porofolio.jpg";
const avatarUrl = "/cuto.jpg";
import { allProjects } from "@/data/projects";
import { certificates } from "@/data/certificatesData";
import { useState, useRef, useEffect } from "react";
import { Lightbox } from "./Lightbox";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";

const uniqueTechnologiesCount = new Set(allProjects.flatMap(p => p.tags)).size;



const techStack = [
  { name: "React", emoji: "⚛️" },
  { name: "TypeScript", emoji: "🔷" },
  { name: "Java", emoji: "☕" },
  { name: "Spring Boot", emoji: "🍃" },
  { name: "PHP", emoji: "🐘" },
  { name: "Laravel", emoji: "🔴" },
  { name: "Vue.js", emoji: "💚" },
  { name: "MySQL", emoji: "🗄️" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "Docker", emoji: "🐳" },
  { name: "Android", emoji: "🤖" },
  { name: "Git", emoji: "🌿" },
  { name: "Node.js", emoji: "🟢" },
  { name: "Tailwind", emoji: "🎨" },
];

// ── CV Dropdown Component ──────────────────────────────────────
const CV_OPTIONS = [
  {
    label: "Java Backend CV",
    desc: "Spring Boot · Microservices · AWS",
    file: "/cv_java_backend.pdf",
    icon: "☕",
    color: "bg-primary",
  },
  {
    label: "PHP / Laravel CV",
    desc: "Laravel · REST API · WebSocket",
    file: "/cv_laravel_php.pdf",
    icon: "🐘",
    color: "bg-secondary",
  },
];

const CVDropdown = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleDownload = (file: string, label: string) => {
    const a = document.createElement("a");
    a.href = file;
    a.download = label.replace(/\s+/g, "_") + ".pdf";
    a.click();
    setOpen(false);
    toast.success(`📄 ${t.hero.downloadCV}: ${label}`, { duration: 3000 });
  };

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        style={{ willChange: "transform" }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-6 py-3 text-base font-bold border-[3px] border-foreground bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover-wobble"
      >
        <Download size={18} />
        {t.hero.downloadCV}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 bottom-full mb-2 w-72 border-[3px] border-foreground bg-background shadow-[6px_-6px_0px_0px_rgba(0,0,0,1)] z-[9998]"
          >
            <div className="px-4 py-2 border-b-[3px] border-foreground bg-foreground text-background text-xs font-bold uppercase tracking-widest">
              {t.hero.cvDropdownTitle}
            </div>
            {CV_OPTIONS.map((opt) => (
              <button
                key={opt.file}
                onClick={() => handleDownload(opt.file, opt.label)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-foreground hover:text-background transition-colors group border-b-[2px] border-foreground last:border-b-0"
              >
                <span className={`w-10 h-10 flex items-center justify-center text-xl border-[2px] border-foreground ${opt.color} flex-shrink-0`}>
                  {opt.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm leading-tight">{opt.label}</div>
                  <div className="text-xs text-muted-foreground group-hover:text-background/70 leading-tight mt-0.5">{opt.desc}</div>
                </div>
                <Download size={16} className="flex-shrink-0 opacity-40 group-hover:opacity-100" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// ─────────────────────────────────────────────────────────────

const HeroSection = () => {
  const { t } = useLang();
  const [avatarLightbox, setAvatarLightbox] = useState(false);

  const stats = [
    { icon: Briefcase, value: `${allProjects.length}`, label: t.stats.projects, color: "bg-primary" },
    { icon: Code2, value: `${uniqueTechnologiesCount}`, label: t.stats.techStack, color: "bg-secondary" },
    { icon: Award, value: `${certificates.length}`, label: t.stats.certificates, color: "bg-accent" },
    { icon: Coffee, value: "∞", label: t.stats.coffee, color: "bg-info" },
  ];

  return (
    <section className="flex flex-col px-4 pt-12 pb-0 overflow-hidden relative">
      {/* ── Decorative Background Layer ──────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">

        {/* ── Geometric shapes (original 3, kept) ── */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary border-[3px] border-foreground"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary border-[3px] border-foreground rounded-full"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-accent border-[3px] border-foreground"
          animate={{ rotate: [-10, 10, -10], scale: [1, 0.9, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ willChange: "transform" }}
        />

        {/* ── Floating code symbols — left side ── */}
        {[
          { text: "</>",  top: "12%",  left: "3%",   delay: 0,    dur: 4   },
          { text: "{ }",  top: "30%",  left: "1.5%", delay: 0.8,  dur: 5   },
          { text: "=>",   top: "52%",  left: "4%",   delay: 1.6,  dur: 3.5 },
          { text: "//",   top: "70%",  left: "2%",   delay: 0.4,  dur: 4.5 },
          { text: "[ ]",  top: "85%",  left: "5%",   delay: 1.2,  dur: 3.8 },
          { text: "&&",   top: "22%",  left: "7%",   delay: 2,    dur: 4.2 },
        ].map((s) => (
          <motion.span
            key={s.text + s.top}
            className="absolute font-black text-foreground/10 text-2xl font-mono"
            style={{ top: s.top, left: s.left }}
            animate={{ y: [0, -12, 0], opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          >
            {s.text}
          </motion.span>
        ))}

        {/* ── Floating code symbols — right side ── */}
        {[
          { text: "===", top: "10%",  right: "3%",   delay: 0.5,  dur: 4.2 },
          { text: "()",  top: "28%",  right: "2%",   delay: 1.3,  dur: 3.6 },
          { text: "++",  top: "48%",  right: "4.5%", delay: 0.2,  dur: 5   },
          { text: "fn",  top: "64%",  right: "2.5%", delay: 1.8,  dur: 4   },
          { text: "**",  top: "80%",  right: "3.5%", delay: 0.9,  dur: 3.5 },
          { text: "??",  top: "18%",  right: "7%",   delay: 2.2,  dur: 4.8 },
        ].map((s) => (
          <motion.span
            key={s.text + s.top}
            className="absolute font-black text-foreground/10 text-2xl font-mono"
            style={{ top: s.top, right: s.right }}
            animate={{ y: [0, -12, 0], opacity: [0.1, 0.22, 0.1] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          >
            {s.text}
          </motion.span>
        ))}

        {/* ── Doodle arrows pointing toward hero content ── */}
        {/* Arrow right side → pointing left toward avatar */}
        <motion.div
          className="absolute font-black text-foreground/20 text-4xl"
          style={{ top: "38%", right: "10%" }}
          animate={{ x: [0, -8, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ←
        </motion.div>
        {/* Arrow left side → pointing right toward text */}
        <motion.div
          className="absolute font-black text-foreground/20 text-4xl"
          style={{ top: "25%", left: "10%" }}
          animate={{ x: [0, 8, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          →
        </motion.div>
        {/* Down arrow toward stats */}
        <motion.div
          className="absolute font-black text-foreground/15 text-3xl"
          style={{ bottom: "20%", left: "13%" }}
          animate={{ y: [0, 8, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          ↓
        </motion.div>

        {/* ── Tiny pixel dots grid pattern — far left edge ── */}
        <div className="absolute left-0 top-0 h-full w-8 flex flex-col justify-around items-center opacity-15">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-foreground"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        {/* ── Tiny pixel dots grid pattern — far right edge ── */}
        <div className="absolute right-0 top-0 h-full w-8 flex flex-col justify-around items-center opacity-15">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-foreground"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}
        </div>

        {/* ── Sticker decorations ── */}
        <motion.div
          className="absolute text-sm font-black uppercase tracking-widest border-[2px] border-foreground/20 px-2 py-0.5 bg-primary/20 text-foreground/30"
          style={{ top: "60%", left: "2%" }}
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          open to work ✦
        </motion.div>
        <motion.div
          className="absolute text-sm font-black uppercase tracking-widest border-[2px] border-foreground/20 px-2 py-0.5 bg-secondary/20 text-foreground/30"
          style={{ top: "15%", right: "1.5%" }}
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          2025 ✦
        </motion.div>
        <motion.div
          className="absolute text-xs font-black border-[2px] border-foreground/15 px-2 py-0.5 bg-accent/20 text-foreground/25 rotate-[-8deg]"
          style={{ bottom: "28%", right: "6%" }}
          animate={{ rotate: [-8, -4, -8] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {"< clean code />"}
        </motion.div>

        {/* ── Horizontal dashed decoration lines ── */}
        <motion.div
          className="absolute h-px bg-foreground/8"
          style={{ top: "42%", left: 0, right: 0 }}
          animate={{ scaleX: [0.3, 1, 0.3], opacity: [0, 0.15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Hero Grid ── */}
      <motion.div
        className="max-w-6xl mx-auto w-full relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ willChange: "opacity" }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content — all children share same left edge via pl-0 */}
          <div className="space-y-6 pl-0">
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: -3 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoBadge variant="accent" className="flex items-center gap-1">
                  <Sparkles size={14} className="animate-pulsate" />
                  {t.hero.badge1}
                </NeoBadge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 3 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoBadge variant="secondary">{t.hero.badge2}</NeoBadge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 3 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoBadge variant="secondary">{t.hero.badge3}</NeoBadge>
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              {t.hero.greeting}{" "}
              <motion.span
                className="bg-primary px-2 inline-block text-shadow-neo"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
                style={{ willChange: "transform" }}
              >
                Công Dưỡng
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl font-medium leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ willChange: "transform, opacity" }}
            >
              {t.hero.descPre}{" "}
              <motion.span className="bg-secondary px-1 inline-block font-bold" whileHover={{ scale: 1.1 }} style={{ willChange: "transform" }}>
                {t.hero.descH1}
              </motion.span>{" "}
              {t.hero.descMid}{" "}
              <motion.span className="bg-accent px-1 inline-block font-bold" whileHover={{ scale: 1.1 }} style={{ willChange: "transform" }}>
                {t.hero.descH2}
              </motion.span>{" "}
              {t.hero.descSuffix}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoButton variant="primary" size="lg" className="hover-jello">{t.hero.viewWork}</NeoButton>
              </motion.div>
              {/* Download CV Dropdown */}
              <CVDropdown />
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ willChange: "transform, opacity" }}
            >
              {[
                { icon: Github, color: "bg-foreground text-background", label: "GitHub", href: "https://github.com/nguyentrungcongduong" },
                { icon: Facebook, color: "bg-blue-600", label: "Facebook", href: "https://www.facebook.com/congduong.nguyentrung.3?locale=vi_VN" },
                { icon: Mail, color: "bg-secondary", label: "Email", href: "mailto:congduongnguyentrung@gmail.com" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`neo-button ${social.color} p-3`}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ willChange: "transform" }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Avatar */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Static tilt wrapper — gives "scrapbook" energy */}
            <div className="relative" style={{ transform: "rotate(3deg)" }}>
              <motion.div
                className="w-64 md:w-72 lg:w-80 border-[4px] border-dashed border-primary overflow-hidden relative"
                style={{ boxShadow: "10px 10px 0px 0px #000", willChange: "transform", aspectRatio: "1/1" }}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover select-none cursor-zoom-in"
                  style={{
                    willChange: "transform",
                    objectPosition: "center 15%",
                    filter: "saturate(1.35) contrast(1.08) brightness(1.04)",
                  }}
                  loading="eager"
                  decoding="async"
                  onClick={() => setAvatarLightbox(true)}
                />
                {avatarLightbox && (
                  <Lightbox src={avatarUrl} alt="Avatar" onClose={() => setAvatarLightbox(false)} />
                )}
                {/* Pop-art color wash — warm amber tint overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "rgba(255,180,0,0.08)", mixBlendMode: "color-dodge" }}
                />
              </motion.div>

              {/* ── Emoji stickers on corners ── */}
              <motion.span
                className="absolute -top-6 -left-4 text-4xl cursor-default"
                animate={{ rotate: [-15, 10, -15], scale: [1, 1.25, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                title="⚡"
              >⚡</motion.span>

              <motion.span
                className="absolute -top-4 right-2 text-3xl cursor-default"
                animate={{ rotate: [10, -12, 10], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: 0.4 }}
              >🔥</motion.span>

              <motion.span
                className="absolute -bottom-5 -right-3 text-3xl cursor-default"
                animate={{ y: [0, -6, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >💻</motion.span>

              <motion.span
                className="absolute bottom-6 -left-6 text-2xl cursor-default"
                animate={{ rotate: [-20, 20, -20], scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
              >✨</motion.span>

              {/* Floating tech badges — kept from before */}
              <motion.div
                className="absolute -top-4 -right-4 neo-badge bg-accent"
                animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.3 }}
                style={{ willChange: "transform" }}
              >
                React ⚛️
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 neo-badge bg-secondary"
                animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                whileHover={{ scale: 1.3 }}
                style={{ willChange: "transform" }}
              >
                Java 💙
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-8 neo-badge bg-info"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.3 }}
                style={{ willChange: "transform" }}
              >
                PHP 🎨
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* ── Hand-drawn arrow: text → avatar ── */}
        <motion.div
          className="hidden md:block absolute top-[42%] left-[50%] translate-x-[-80px] font-black text-foreground/25 text-3xl pointer-events-none select-none"
          animate={{ x: [0, 10, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          ➜
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-[14px] mt-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ willChange: "transform, opacity" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`${stat.color} border-[3px] border-foreground p-4 flex flex-col items-center gap-1 cursor-default`}
              style={{ boxShadow: "4px 4px 0px 0px #000", willChange: "transform, box-shadow" }}
              whileHover={{ transform: "translate(-4px, -4px)", boxShadow: "8px 8px 0px 0px #000" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <stat.icon size={22} strokeWidth={2.5} />
              <span className="text-3xl font-black">{stat.value}</span>
              <span className="text-xs font-black uppercase tracking-widest text-center">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="#about"
            className="neo-button bg-background p-3"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            whileHover={{ scale: 1.2 }}
          >
            <ArrowDown size={24} />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── Tech Stack Marquee ── */}
      <div className="w-full mt-8 border-y-[3px] border-foreground overflow-hidden relative bg-black">
        <motion.div 
          className="flex w-max py-3 gap-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-6 font-bold text-sm uppercase tracking-widest whitespace-nowrap text-white"
            >
              <span className="text-base">{tech.emoji}</span>
              {tech.name}
              <span className="ml-4 text-primary opacity-60">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
