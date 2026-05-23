import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import NeoButton from "./NeoButton";
import { ExternalLink, Github, Rocket, Lock, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Project images
import ecommerce1 from "@/assets/projects/ecommerce-1.png";
import ecommerce2 from "@/assets/projects/ecommerce-2.png";
import task1 from "@/assets/projects/task-1.png";
import task2 from "@/assets/projects/task-2.png";
import weather1 from "@/assets/projects/weather-1.png";
import weather2 from "@/assets/projects/weather-2.png";
import portfolio1 from "@/assets/projects/portfolio-1.png";
import portfolio2 from "@/assets/projects/portfolio-2.png";

// ── Brand-color map for tech tags ─────────────────────────────────────────────────
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "React":       { bg: "#61DAFB22", text: "#0891b2" },
  "Node.js":     { bg: "#33993322", text: "#16a34a" },
  "Stripe":      { bg: "#635BFF22", text: "#635BFF" },
  "Next.js":     { bg: "#00000015", text: "#111"    },
  "TypeScript":  { bg: "#3178C622", text: "#3178C6" },
  "Socket.io":   { bg: "#01010115", text: "#333"    },
  "Vue.js":      { bg: "#42B88322", text: "#16a34a" },
  "Firebase":    { bg: "#FFCA2822", text: "#b45309" },
  "Tailwind":    { bg: "#06B6D422", text: "#0891b2" },
  "TailwindCSS": { bg: "#06B6D422", text: "#0891b2" },
  "Spring Boot": { bg: "#6DB33F22", text: "#3d7a13" },
  "PostgreSQL":  { bg: "#33679122", text: "#1a4d6e" },
  "Docker":      { bg: "#2496ED22", text: "#1a7ab8" },
  "JWT":         { bg: "#F59E0B22", text: "#b45309" },
  "Clerk":       { bg: "#7C3AED22", text: "#7C3AED" },
  "Inngest":     { bg: "#EC489922", text: "#db2777" },
  "Ant Design":  { bg: "#1677FF22", text: "#1677FF" },
  "Bootstrap":   { bg: "#7952B322", text: "#5a2d9a" },
  "jQuery":      { bg: "#0769AD22", text: "#0769AD" },
  "Thymeleaf":   { bg: "#005F0F22", text: "#005F0F" },
  "Zustand":     { bg: "#43433E22", text: "#555"    },
  "Recharts":    { bg: "#FF6B6B22", text: "#e53e3e" },
  "Kotlin":      { bg: "#7F52FF22", text: "#6d3fd4" },
  "Java":        { bg: "#ED8B0022", text: "#b86000" },
  // new
  "Go":          { bg: "#00ADD822", text: "#007d9e" },
  "Python":      { bg: "#3776AB22", text: "#1d4ed8" },
  "Three.js":    { bg: "#00000015", text: "#333"    },
  "Redis":       { bg: "#DC382D22", text: "#b91c1c" },
  "OR-Tools":    { bg: "#4285F422", text: "#1d4ed8" },
  "Expo":        { bg: "#00000015", text: "#333"    },
  "NativeWind":  { bg: "#06B6D422", text: "#0891b2" },
  "MySQL":       { bg: "#4479A122", text: "#1e4d7b" },
  "Vue 3":       { bg: "#42B88322", text: "#16a34a" },
  "Yjs":         { bg: "#FF6B6B22", text: "#e53e3e" },
  "Laravel Reverb": { bg: "#FF2D2022", text: "#b91c1c" },
  "Socket.IO":   { bg: "#01010115", text: "#333"    },
  "React Query": { bg: "#FF475722", text: "#e11d48" },
  "PHP":         { bg: "#777BB422", text: "#4f4f8f" },
  "HTML":        { bg: "#E44D2622", text: "#c2410c" },
  "CSS":         { bg: "#1572B622", text: "#1d4ed8" },
  "Bootstrap 5": { bg: "#7952B322", text: "#5a2d9a" },
};

// ── Per-card hover shadow colours ─────────────────────────────────────────────
const CARD_SHADOWS = [
  { idle: "5px 5px 0px 0px #000", hover: "10px 10px 0px 0px #7C3AED" }, // purple
  { idle: "5px 5px 0px 0px #000", hover: "10px 10px 0px 0px #F59E0B" }, // amber
  { idle: "5px 5px 0px 0px #000", hover: "10px 10px 0px 0px #2563EB" }, // blue
  { idle: "5px 5px 0px 0px #000", hover: "10px 10px 0px 0px #16A34A" }, // green
];

// 4 most impressive projects shown on homepage
const projects = [
  {
    id: "3d-load-planning",
    title: "3D Container Load Planning",
    description: "Distributed 3D bin-packing optimizer with OR-Tools, Go/Gin API, Redis queue & Three.js real-time visualization.",
    tags: ["React", "Go", "Python", "Three.js", "Redis"],
    headerColor: "bg-accent",
    images: [portfolio1, portfolio2],
    link: undefined,
    github: undefined,
    featured: true,
  },
  {
    id: "news-portal-cms",
    title: "News Portal CMS",
    description: "Headless CMS for newsrooms: multi-role workflow, drag-drop Page Builder & Breaking News via Socket.IO.",
    tags: ["Laravel", "React", "Next.js", "Redis", "Socket.IO"],
    headerColor: "bg-primary",
    images: [ecommerce1, ecommerce2],
    link: "https://news-portal-public-gray.vercel.app",
    github: undefined,
    featured: true,
  },
  {
    id: "job-application-tracker",
    title: "Job Application Tracker Pro",
    description: "Full-stack job management with Kanban board, AI resume analysis & automated notifications on AWS EC2.",
    tags: ["Spring Boot", "React", "TypeScript", "Docker", "PostgreSQL"],
    headerColor: "bg-secondary",
    images: [task1, task2],
    link: "https://57.180.52.73",
    github: "https://github.com/nguyentrungcongduong/Job-Application-Tracker-Pro.git",
    featured: true,
  },
  {
    id: "miro-clone",
    title: "Real-Time Collaborative Whiteboard",
    description: "Miro-inspired whiteboard with live multi-user sync via Yjs CRDT and Laravel Reverb WebSockets.",
    tags: ["Vue 3", "Laravel", "Yjs", "Laravel Reverb", "PostgreSQL"],
    headerColor: "bg-info",
    images: [weather1, weather2],
    link: undefined,
    github: undefined,
    featured: true,
  },
];

// ── Background decorative code symbols ────────────────────────────────────────
const BG_SYMBOLS = [
  { s: "{}", x: "3%",  y: "18%", rot: -20 },
  { s: "[]", x: "8%",  y: "72%", rot:  15 },
  { s: ";",  x: "93%", y: "12%", rot:  10 },
  { s: "#",  x: "91%", y: "60%", rot: -12 },
  { s: "()", x: "5%",  y: "45%", rot:  30 },
  { s: "//", x: "89%", y: "85%", rot: -18 },
  { s: "</>",x: "50%", y: "92%", rot:   8 },
  { s: "=>", x: "48%", y: "4%",  rot:  -5 },
];

// ── Browser Chrome bar — neutral dark, real browser feel ─────────────────────
const BrowserBar = ({ accentColor }: { accentColor: string }) => (
  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#2a2a2a] border-b-[3px] border-foreground shrink-0">
    <span className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
    <span className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1DAD2B]" />
    <span className="ml-3 flex-1 bg-[#3a3a3a] border border-white/10 rounded-sm px-2 py-0.5 text-[9px] font-mono text-white/50 truncate">
      https://congduong.dev
    </span>
    <span className={`w-2 h-2 rounded-full ${accentColor} ml-2 opacity-80`} />
  </div>
);

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-4 bg-muted overflow-hidden relative" ref={ref}>

      {/* ── Background texture: code symbols ── */}
      {BG_SYMBOLS.map((sym, i) => (
        <motion.div key={i}
          className="absolute font-black text-foreground/[0.06] text-2xl pointer-events-none select-none hidden md:block"
          style={{ left: sym.x, top: sym.y, rotate: `${sym.rot}deg` }}
          animate={{ rotate: [sym.rot - 4, sym.rot + 4, sym.rot - 4], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: "easeInOut" }}
        >{sym.s}</motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Heading ── */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            My{" "}
            <motion.span className="bg-secondary px-2 inline-block text-shadow-neo"
              whileHover={{ rotate: 5, scale: 1.1 }}
              animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >Projects</motion.span>
            <motion.span className="inline-block ml-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Rocket className="inline w-10 h-10" />
            </motion.span>
          </h2>
          <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          >
            Here are some of my recent works that I'm proud of ✨
          </motion.p>
        </motion.div>

        {/* ── Project cards grid ── */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const shadow = CARD_SHADOWS[index];
            return (
              <motion.div key={index}
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 80, damping: 12, delay: index * 0.12 }}
                whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                style={{ willChange: "transform" }}
              >
              {/* Card — overflow-visible so FEATURED badge shows */}
              <div className="relative">
                <motion.div
                  className="border-[3px] border-foreground bg-background flex flex-col"
                  style={{ boxShadow: shadow.idle }}
                  whileHover={{ boxShadow: shadow.hover }}
                  transition={{ duration: 0.2 }}
                >
                  {/* ── FEATURED badge — outside clip path ── */}
                  {project.featured && (
                    <motion.div
                      className="absolute -top-3 -right-3 z-20"
                      animate={{ rotate: [-3, 3, -3], scale: [1, 1.05, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-primary border-[2px] border-foreground px-2 py-1"
                        style={{ boxShadow: "2px 2px 0 #000" }}>
                        ⭐ Featured
                      </span>
                    </motion.div>
                  )}
                  {project.inProcess && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-accent border-[2px] border-foreground px-2 py-1"
                        style={{ boxShadow: "2px 2px 0 #000" }}>
                        🔨 WIP
                      </span>
                    </div>
                  )}

                  {/* ── Browser chrome + carousel ── */}
                  <div className="overflow-hidden">
                    <BrowserBar accentColor={project.headerColor} />
                    <Carousel
                      className="w-full"
                      plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]}
                    >
                      <CarouselContent>
                        {project.images.map((img, imgIdx) => (
                          <CarouselItem key={imgIdx}>
                            <div className="relative h-56 overflow-hidden">
                              <img
                                src={img}
                                alt={`${project.title} screenshot ${imgIdx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                                decoding="async"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  </div>

                  {/* ── Card body ── */}
                  <div className="p-6 space-y-4 flex flex-col flex-1">
                    <motion.h3 className="text-2xl font-bold" whileHover={{ x: 6 }}>
                      {project.title}
                    </motion.h3>
                    <p className="text-muted-foreground">{project.description}</p>

                    {/* ── Brand-color tech tags ── */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => {
                        const brand = TAG_COLORS[tag] ?? { bg: "#88888822", text: "#555" };
                        return (
                          <motion.span key={tag}
                            className="text-xs font-black uppercase tracking-wider px-2 py-1 border-[2px] border-foreground/30"
                            style={{ background: brand.bg, color: brand.text }}
                            whileHover={{ scale: 1.1, rotate: 3 }}
                            whileTap={{ scale: 0.95 }}
                          >{tag}</motion.span>
                        );
                      })}
                    </div>

                    {/* ── Action buttons with smart states ── */}
                    <div className="flex gap-3 pt-2 mt-auto">
                      {/* Details — always available */}
                      <Link to={`/projects/${project.id}`} className="flex-1">
                        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                          <NeoButton variant="outline" size="sm" className="w-full justify-center gap-2">
                            🔍 Details
                          </NeoButton>
                        </motion.div>
                      </Link>

                      {/* Live Demo — disabled if no link */}
                      {project.link ? (
                        <motion.a href={project.link} target="_blank" rel="noopener noreferrer"
                          whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                          className="flex-1"
                        >
                          <NeoButton variant="primary" size="sm" className="w-full justify-center gap-2">
                            <ExternalLink size={14} /> Live Demo
                          </NeoButton>
                        </motion.a>
                      ) : (
                        <div className="flex-1" title={project.inProcess ? "Still in development" : "Not deployed yet"}>
                          <NeoButton variant="outline" size="sm"
                            className="w-full justify-center gap-2 opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <Clock size={14} />
                            {project.inProcess ? "In Dev" : "Coming Soon"}
                          </NeoButton>
                        </div>
                      )}

                      {/* GitHub — lock icon if private */}
                      {project.github ? (
                        <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
                          title="View source code"
                        >
                          <NeoButton variant="outline" size="sm" className="px-3">
                            <Github size={15} />
                          </NeoButton>
                        </motion.a>
                      ) : (
                        <div title="Private repository">
                          <NeoButton variant="outline" size="sm"
                            className="px-3 opacity-50 cursor-not-allowed"
                            disabled
                          >
                            <Lock size={14} />
                          </NeoButton>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── View all button ── */}
        <motion.div className="text-center mt-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <Link to="/projects">
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <NeoButton variant="accent" size="lg" className="hover-jello">
                View All Projects 🚀
              </NeoButton>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
