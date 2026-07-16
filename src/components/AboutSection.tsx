import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import NeoBadge from "./NeoBadge";
import { Code, Award, Layers, Coffee } from "lucide-react";
import { allProjects } from "@/data/projects";
import { certificates } from "@/data/certificatesData";
import { useLang } from "@/context/LanguageContext";



const skillGroups = [
  {
    label: "Frontend",
    emoji: "🎨",
    color: "bg-primary",
    skills: [
      { name: "React", emoji: "⚛️", variant: "primary" as const },
      { name: "TypeScript", emoji: "📘", variant: "info" as const },
      { name: "Vue.js", emoji: "💚", variant: "accent" as const },
      { name: "Next.js", emoji: "▲", variant: "secondary" as const },
      { name: "React Native", emoji: "📱", variant: "info" as const },
    ],
  },
  {
    label: "Backend",
    emoji: "⚙️",
    color: "bg-secondary",
    skills: [
      { name: "Spring Boot", emoji: "🍃", variant: "accent" as const },
      { name: "Laravel", emoji: "🔴", variant: "primary" as const },
      { name: "Golang/Gin", emoji: "🐹", variant: "info" as const },
      { name: "Kotlin", emoji: "🟣", variant: "secondary" as const },
    ],
  },
  {
    label: "Database & DevOps",
    emoji: "🛠️",
    color: "bg-info",
    skills: [
      { name: "PostgreSQL", emoji: "🐘", variant: "secondary" as const },
      { name: "MongoDB", emoji: "🍃", variant: "accent" as const },
      { name: "Redis", emoji: "⚡", variant: "accent" as const },
      { name: "Docker", emoji: "🐳", variant: "info" as const },
      { name: "AWS", emoji: "☁️", variant: "accent" as const },
      { name: "Git", emoji: "🎋", variant: "primary" as const },
    ],
  },
];

const uniqueTechnologiesCount = new Set(allProjects.flatMap(p => p.tags)).size;



const stickers = [
  { text: "Based in Vietnam 🇻🇳", rotate: -3, style: { top: "14%",  left: "0.3%"  } },
  { text: "Available for work ✦",  rotate:  2, style: { top: "46%",  left: "0.3%"  } },
  { text: "Full Stack Dev 💻",     rotate:  4, style: { top: "18%",  right: "0.3%" } },
  { text: "Open Source ❤️",        rotate: -2, style: { bottom: "20%", right: "0.3%" } },
];

const AboutSection = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = t.about.highlights.map((text, i) => ({
    icon: ["🚀", "💻", "🧠", "🌐", "☕"][i],
    text,
  }));

  const stats = [
    { icon: Code,   label: t.stats.projects,     value: `${allProjects.length}`,      color: "bg-primary"   },
    { icon: Layers, label: t.stats.techStack,     value: `${uniqueTechnologiesCount}`, color: "bg-accent"    },
    { icon: Award,  label: t.stats.certificates,  value: `${certificates.length}`,     color: "bg-info"      },
    { icon: Coffee, label: t.stats.coffee,        value: "∞",                          color: "bg-secondary" },
  ];

  return (
    <section id="about" className="py-20 px-4 overflow-hidden relative" ref={ref}>

      {/* ── Vertical background text ── */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 font-black text-[7rem] uppercase text-foreground/[0.04] pointer-events-none select-none hidden lg:block"
        style={{ writingMode: "vertical-rl", letterSpacing: "0.25em", transform: "translateY(-50%) translateX(-42%)" }}
      >DEVELOPER</div>
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-black text-[7rem] uppercase text-foreground/[0.04] pointer-events-none select-none hidden lg:block"
        style={{ writingMode: "vertical-rl", letterSpacing: "0.25em", transform: "translateY(-50%) translateX(42%)" }}
      >CREATIVE</div>

      {/* ── Sticker tags ── */}
      {stickers.map((s, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex text-[10px] font-black uppercase tracking-widest border-[2px] border-foreground/20 px-2 py-1 bg-primary/15 text-foreground/35 whitespace-nowrap pointer-events-none"
          style={{ ...s.style }}
          animate={{ rotate: [s.rotate - 2, s.rotate + 2, s.rotate - 2] }}
          transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: "easeInOut" }}
        >{s.text}</motion.div>
      ))}

      {/* ── Doodle arrows + stars ── */}
      <motion.div className="absolute hidden md:block font-black text-foreground/20 text-4xl pointer-events-none select-none"
        style={{ top: "38%", left: "8%" }}
        animate={{ x: [0, 8, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >→</motion.div>
      <motion.div className="absolute hidden md:block font-black text-foreground/20 text-3xl pointer-events-none select-none"
        style={{ bottom: "28%", right: "8%" }}
        animate={{ y: [0, -8, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 }}
      >↑</motion.div>
      {["✦", "✶", "✹"].map((star, i) => (
        <motion.span key={i}
          className="absolute hidden md:block text-xl text-foreground/12 pointer-events-none select-none"
          style={{ top: `${28 + i * 22}%`, right: `${5.5 + (i % 2) * 2}%` }}
          animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
          transition={{ duration: 7 + i * 2, repeat: Infinity, ease: "linear" }}
        >{star}</motion.span>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section heading ── */}
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t.about.title}{" "}
            <motion.span className="bg-accent px-2 inline-block text-shadow-neo"
              whileHover={{ rotate: 5, scale: 1.1 }}
              animate={isInView ? { rotate: [0, -5, 5, 0] } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >{t.about.titleHighlight}</motion.span>
          </h2>
          <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          >
            {t.about.subtitle}
          </motion.p>
        </motion.div>

        {/* ── Asymmetric 60/40 grid ── */}
        <div className="grid md:grid-cols-5 gap-8 mb-10">

          {/* Who I Am — 60%, tilted -1deg */}
          <motion.div className="md:col-span-3"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
          >
            <div className="border-[3px] border-foreground p-6 space-y-5 h-full"
              style={{ boxShadow: "6px 6px 0 #000", transform: "rotate(-1deg)", background: "hsl(60 100% 97%)" }}
            >
              <h3 className="text-2xl font-bold">{t.about.whoIAm}</h3>

              {/* Bullet points instead of wall of text */}
              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <motion.li key={i} className="flex items-start gap-3 text-base leading-snug"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.09 }}
                  >
                    <span className="text-xl shrink-0">{h.icon}</span>
                    <span>{h.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Quick-fact tags */}
              <div className="flex flex-wrap gap-2 pt-3 border-t-[2px] border-foreground/20">
                {t.about.tags.map((tag) => (
                  <span key={tag}
                    className="text-[10px] font-black uppercase tracking-wide border-[2px] border-foreground/30 px-2 py-0.5 bg-secondary/30"
                  >{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills grouped — 40%, free-floating categories */}
          <motion.div className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, delay: 0.3 }}
          >
            {skillGroups.map((group, gi) => (
              <motion.div key={group.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + gi * 0.15 }}
                style={{ transform: `rotate(${gi % 2 === 0 ? 0.6 : -0.6}deg)` }}
              >
                {/* Category label */}
                <div className="mb-2">
                  <span className={`inline-block text-[10px] font-black uppercase tracking-widest ${group.color} border-[2px] border-foreground px-2 py-0.5`}
                    style={{ boxShadow: "2px 2px 0 #000" }}
                  >{group.emoji} {group.label}</span>
                </div>
                {/* Skills floating freely */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.div key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + gi * 0.1 + si * 0.06, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.15, rotate: [-3, 3, 0], transition: { duration: 0.3 } }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <NeoBadge variant={skill.variant}>{skill.emoji} {skill.name}</NeoBadge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[14px]">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              className={`${stat.color} border-[3px] border-foreground p-4 flex flex-col items-center gap-1 cursor-default`}
              style={{ boxShadow: "4px 4px 0 #000" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
              whileHover={{ y: -8, boxShadow: "8px 8px 0 #000", transition: { type: "spring", stiffness: 300 } }}
            >
              <stat.icon size={26} strokeWidth={2.5} />
              <span className="text-3xl font-black">{stat.value}</span>
              <span className="text-xs font-black uppercase tracking-widest text-center">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
