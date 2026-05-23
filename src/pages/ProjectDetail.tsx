import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { allProjects } from "@/data/projects";
import NeoButton from "@/components/NeoButton";
import CustomCursor from "@/components/CustomCursor";
import FloatingPet from "@/components/FloatingPet";
import {
  ArrowLeft, ExternalLink, Github, CheckCircle,
  Calendar, User, ArrowRight, ArrowLeftCircle, ArrowRightCircle,
  ChevronLeft, ChevronRight, BookOpen, Trello, Users
} from "lucide-react";
import { toast } from "sonner";

// ── Brand-color map (same as ProjectsSection) ─────────────────────────────────
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "React":       { bg: "#61DAFB22", text: "#0891b2" },
  "Node.js":     { bg: "#33993322", text: "#16a34a" },
  "Stripe":      { bg: "#635BFF22", text: "#635BFF" },
  "Next.js":     { bg: "#00000015", text: "#111"    },
  "TypeScript":  { bg: "#3178C622", text: "#3178C6" },
  "Socket.io":   { bg: "#01010115", text: "#333"    },
  "API":         { bg: "#F59E0B22", text: "#b45309" },
  "Charts":      { bg: "#F97316"+"22", text: "#ea580c" },
  "Vue.js":      { bg: "#42B88322", text: "#16a34a" },
  "Firebase":    { bg: "#FFCA2822", text: "#b45309" },
  "Tailwind":    { bg: "#06B6D422", text: "#0891b2" },
  "Canvas":      { bg: "#EC489922", text: "#db2777" },
  "WebGL":       { bg: "#8B5CF622", text: "#7c3aed" },
  "WebAssembly": { bg: "#654FF022", text: "#5b21b6" },
  "AI":          { bg: "#10B98122", text: "#059669" },
  "Web Audio":   { bg: "#F5920022", text: "#d97706" },
  "Python":      { bg: "#3776AB22", text: "#1d4ed8" },
  "OpenAI":      { bg: "#10a37f22", text: "#065f46" },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);

  const projectIndex = allProjects.findIndex((p) => p.id === id);
  const project = allProjects[projectIndex];
  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-4xl font-black">Project not found 😢</h1>
        <Link to="/projects">
          <NeoButton variant="primary"><ArrowLeft size={16} className="mr-2" />Back to Projects</NeoButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <FloatingPet />

      {/* ── Decorative corner elements ── */}
      <div className="fixed top-0 left-0 w-40 h-40 pointer-events-none opacity-10 z-0"
        style={{ background: "radial-gradient(circle at 0 0, hsl(72 100% 72%), transparent 70%)" }} />
      <div className="fixed bottom-0 right-0 w-60 h-60 pointer-events-none opacity-10 z-0"
        style={{ background: "radial-gradient(circle at 100% 100%, hsl(300 100% 72%), transparent 70%)" }} />

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">

        {/* ── Back button ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8 flex items-center gap-3">
          <Link to="/projects">
            <NeoButton variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-1" /> All Projects
            </NeoButton>
          </Link>
          <span className="text-muted-foreground text-sm font-medium">
            {projectIndex + 1} / {allProjects.length}
          </span>
        </motion.div>

        {/* ── Hero block ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="grid md:grid-cols-5 gap-8 mb-12"
        >
          {/* Left: Info */}
          <div className="md:col-span-2 space-y-5">
            {/* Status badge */}
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-primary border-[2px] border-foreground px-2 py-1"
                style={{ boxShadow: "2px 2px 0 #000" }}>
                ⭐ Featured Project
              </span>
            )}
            {project.inProcess && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-accent border-[2px] border-foreground px-2 py-1"
                style={{ boxShadow: "2px 2px 0 #000" }}>
                🔨 In Progress
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-black leading-tight">{project.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 text-sm font-bold">
              <span className="flex items-center gap-1 border-[2px] border-foreground/30 px-2 py-0.5">
                <Calendar size={13} /> {project.year}
              </span>
              <span className="flex items-center gap-1 border-[2px] border-foreground/30 px-2 py-0.5">
                <User size={13} /> {project.role}
              </span>
              {project.teamSize && (
                <span className="flex items-center gap-1 border-[2px] border-foreground px-2 py-0.5 bg-primary text-foreground font-bold shadow-[2px_2px_0_0_#000]">
                  <Users size={13} /> Team: {project.teamSize}
                </span>
              )}
            </div>

            <p className="text-base leading-relaxed text-foreground/80">{project.longDescription}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => {
                const brand = TAG_COLORS[tag] ?? { bg: "#88888822", text: "#555" };
                return (
                  <span key={tag}
                    className="text-xs font-black uppercase tracking-wider px-2 py-1 border-[2px] border-foreground/25"
                    style={{ background: brand.bg, color: brand.text }}
                  >{tag}</span>
                );
              })}
            </div>

            {/* Action buttons — smart undefined handling */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.link ? (
                <motion.a href={project.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <NeoButton variant="primary" size="sm" className="gap-2">
                    <ExternalLink size={14} /> Live Demo
                  </NeoButton>
                </motion.a>
              ) : (
                <NeoButton variant="outline" size="sm"
                  className="gap-2 opacity-50 cursor-not-allowed" disabled>
                  <ExternalLink size={14} />
                  {project.inProcess ? "In Dev" : "Coming Soon"}
                </NeoButton>
              )}
              {project.github ? (
                <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <NeoButton variant="outline" size="sm" className="gap-2">
                    <Github size={14} /> Source Code
                  </NeoButton>
                </motion.a>
              ) : (
                <NeoButton variant="outline" size="sm"
                  className="gap-2 opacity-50 cursor-not-allowed" disabled>
                  <Github size={14} /> Private
                </NeoButton>
              )}
              {/* Jira board */}
              {project.jira && (
                <motion.a href={project.jira} target="_blank" rel="noopener noreferrer"
                  onClick={() => {
                    if (project.jiraToastMsg) {
                      toast.info(project.jiraToastMsg);
                    }
                  }}
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                  title="View Jira board">
                  <NeoButton variant="outline" size="sm" className="gap-2">
                    <Trello size={14} />
                    <span className="font-black text-[#0052CC]">Jira</span>
                  </NeoButton>
                </motion.a>
              )}
              {/* Docs */}
              {project.docs && (
                <motion.a href={project.docs} target="_blank" rel="noopener noreferrer"
                  onClick={() => {
                    if (project.docsToastMsg) {
                      toast.info(project.docsToastMsg);
                    }
                  }}
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                  title="View documentation">
                  <NeoButton variant="outline" size="sm" className="gap-2">
                    <BookOpen size={14} /> Docs
                  </NeoButton>
                </motion.a>
              )}
            </div>
          </div>

          {/* Right: Image gallery */}
          <div className="md:col-span-3 space-y-3">
            {/* Main image with browser chrome */}
            <div className="border-[3px] border-foreground overflow-hidden" style={{ boxShadow: "6px 6px 0 #000" }}>
              {/* Browser bar — neutral dark */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#2a2a2a] border-b-[3px] border-foreground">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1DAD2B]" />
                <span className="ml-3 flex-1 bg-[#3a3a3a] border border-white/10 rounded-sm px-2 py-0.5 text-[9px] font-mono text-white/50 truncate">
                  https://congduong.dev/{project.id}
                </span>
              </div>
              {/* Active image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={project.images[activeImg]}
                  alt={`${project.title} screenshot ${activeImg + 1}`}
                  className="w-full h-64 object-cover"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            {project.images.length > 1 && (
              <div className="flex gap-2">
                {project.images.map((img, i) => (
                  <motion.button key={i} onClick={() => setActiveImg(i)}
                    className={`flex-1 border-[3px] overflow-hidden ${i === activeImg ? "border-foreground" : "border-foreground/30"}`}
                    style={{ boxShadow: i === activeImg ? "3px 3px 0 #000" : "none" }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  >
                    <img src={img} alt={`thumb ${i + 1}`} className="w-full h-16 object-cover" />
                  </motion.button>
                ))}
                {/* Prev / Next controls */}
                <motion.button onClick={() => setActiveImg((activeImg - 1 + project.images.length) % project.images.length)}
                  className="px-2 border-[3px] border-foreground/30 bg-background hover:bg-muted"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ChevronLeft size={18} />
                </motion.button>
                <motion.button onClick={() => setActiveImg((activeImg + 1) % project.images.length)}
                  className="px-2 border-[3px] border-foreground/30 bg-background hover:bg-muted"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Highlights ── */}
        <motion.div
          className="border-[3px] border-foreground p-6 mb-12"
          style={{ boxShadow: "5px 5px 0 #000" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            🔍 Key Highlights
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {project.highlights.map((h, i) => (
              <motion.li key={i}
                className="flex items-start gap-2 text-sm font-medium"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
              >
                <CheckCircle size={16} className="shrink-0 mt-0.5 text-green-600" />
                {h}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── Prev / Next navigation ── */}
        <motion.div
          className="grid md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        >
          {prevProject ? (
            <motion.button
              onClick={() => navigate(`/projects/${prevProject.id}`)}
              className="flex items-center gap-3 border-[3px] border-foreground p-4 text-left hover:bg-muted transition-colors"
              style={{ boxShadow: "4px 4px 0 #000" }}
              whileHover={{ x: -4 }} whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftCircle size={24} className="shrink-0" />
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Previous</div>
                <div className="font-black">{prevProject.title}</div>
              </div>
            </motion.button>
          ) : <div />}

          {nextProject ? (
            <motion.button
              onClick={() => navigate(`/projects/${nextProject.id}`)}
              className="flex items-center justify-end gap-3 border-[3px] border-foreground p-4 text-right hover:bg-muted transition-colors"
              style={{ boxShadow: "4px 4px 0 #000" }}
              whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Next</div>
                <div className="font-black">{nextProject.title}</div>
              </div>
              <ArrowRightCircle size={24} className="shrink-0" />
            </motion.button>
          ) : <div />}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
