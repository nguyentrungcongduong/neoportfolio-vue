import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NeoButton from "@/components/NeoButton";
import { ExternalLink, Github, ArrowLeft, Filter, Lock, Clock, BookOpen, Trello, Users, User } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import FloatingPet from "@/components/FloatingPet";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { allProjects } from "@/data/projects";
import { toast } from "sonner";

// ── Brand-color map ────────────────────────────────────────────────────────────
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "React":          { bg: "#61DAFB22", text: "#0891b2" },
  "Node.js":        { bg: "#33993322", text: "#16a34a" },
  "Next.js":        { bg: "#00000015", text: "#111"    },
  "TypeScript":     { bg: "#3178C622", text: "#3178C6" },
  "Vue 3":          { bg: "#42B88322", text: "#16a34a" },
  "Firebase":       { bg: "#FFCA2822", text: "#b45309" },
  "TailwindCSS":    { bg: "#06B6D422", text: "#0891b2" },
  "Tailwind":       { bg: "#06B6D422", text: "#0891b2" },
  "Spring Boot":    { bg: "#6DB33F22", text: "#3d7a13" },
  "PostgreSQL":     { bg: "#33679122", text: "#1a4d6e" },
  "Docker":         { bg: "#2496ED22", text: "#1a7ab8" },
  "Clerk":          { bg: "#7C3AED22", text: "#7C3AED" },
  "Inngest":        { bg: "#EC489922", text: "#db2777" },
  "Ant Design":     { bg: "#1677FF22", text: "#1677FF" },
  "Bootstrap":      { bg: "#7952B322", text: "#5a2d9a" },
  "Bootstrap 5":    { bg: "#7952B322", text: "#5a2d9a" },
  "jQuery":         { bg: "#0769AD22", text: "#0769AD" },
  "Thymeleaf":      { bg: "#005F0F22", text: "#005F0F" },
  "Recharts":       { bg: "#FF6B6B22", text: "#e53e3e" },
  "Java":           { bg: "#ED8B0022", text: "#b86000" },
  "Go":             { bg: "#00ADD822", text: "#007d9e" },
  "Python":         { bg: "#3776AB22", text: "#1d4ed8" },
  "Three.js":       { bg: "#00000015", text: "#333"    },
  "Redis":          { bg: "#DC382D22", text: "#b91c1c" },
  "Expo":           { bg: "#00000015", text: "#333"    },
  "NativeWind":     { bg: "#06B6D422", text: "#0891b2" },
  "MySQL":          { bg: "#4479A122", text: "#1e4d7b" },
  "Yjs":            { bg: "#FF6B6B22", text: "#e53e3e" },
  "Laravel Reverb": { bg: "#FF2D2022", text: "#b91c1c" },
  "Laravel":        { bg: "#FF2D2022", text: "#b91c1c" },
  "Socket.IO":      { bg: "#01010115", text: "#333"    },
  "React Query":    { bg: "#FF475722", text: "#e11d48" },
  "Zustand":        { bg: "#43433E22", text: "#555"    },
  "PHP":            { bg: "#777BB422", text: "#4f4f8f" },
  "HTML":           { bg: "#E44D2622", text: "#c2410c" },
  "CSS":            { bg: "#1572B622", text: "#1d4ed8" },
  "JavaScript":     { bg: "#F7DF1E22", text: "#92680a" },
  "Google Forms":   { bg: "#4285F422", text: "#1d4ed8" },
  "Google Sheets":  { bg: "#34A85322", text: "#16a34a" },
};

const AllProjects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(true);
  const [groupProjectsOnly, setGroupProjectsOnly] = useState(false);

  // Tag categories
  const TAG_GROUPS = [
    {
      label: "🎨 Frontend",
      tags: ["React", "Vue 3", "Next.js", "TypeScript", "TailwindCSS", "HTML", "CSS", "JavaScript", "Bootstrap", "Bootstrap 5", "NativeWind", "Three.js", "Expo"],
    },
    {
      label: "⚙️ Backend",
      tags: ["Spring Boot", "Node.js", "Laravel", "PHP", "Python", "Go", "Java", "Inngest", "Clerk", "Yjs", "Laravel Reverb", "Socket.IO", "Thymeleaf", "jQuery"],
    },
    {
      label: "🗄️ Database",
      tags: ["PostgreSQL", "MySQL", "Redis", "Firebase", "Google Sheets", "Google Forms"],
    },
    {
      label: "🚀 DevOps & Tools",
      tags: ["Docker", "Ant Design", "Recharts", "React Query", "Zustand"],
    },
  ];

  // Only show groups that have at least 1 tag used in real projects
  const allTagsSet = useMemo(() => {
    const tags = new Set<string>();
    allProjects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return tags;
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      const matchTags = selectedTags.length === 0 || p.tags.some(t => selectedTags.includes(t));
      const matchGroup = groupProjectsOnly ? p.teamSize !== undefined : true;
      return matchTags && matchGroup;
    });
  }, [selectedTags, groupProjectsOnly]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Browser chrome bar
  const BrowserBar = ({ color }: { color: string }) => (
    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#2a2a2a] border-b-[3px] border-foreground shrink-0">
      <span className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
      <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
      <span className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1DAD2B]" />
      <span className="ml-3 flex-1 bg-[#3a3a3a] border border-white/10 rounded-sm px-2 py-0.5 text-[9px] font-mono text-white/50 truncate">
        https://congduong.dev
      </span>
      <span className={`w-2 h-2 rounded-full ${color} ml-2 opacity-80`} />
    </div>
  );

  return (
    <div className="min-h-screen relative bg-background">
      <CustomCursor />
      <FloatingPet />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link to="/">
            <NeoButton variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </NeoButton>
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-black text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          All{" "}
          <span className="bg-secondary px-2 inline-block">Projects</span>{" "}
          🚀
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {allProjects.length} projects — from distributed systems to micro-products ✨
        </motion.p>

        {/* ── Filter Panel ── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Panel header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-[3px] border-foreground bg-background cursor-pointer select-none"
            style={{ boxShadow: "4px 4px 0 #000" }}
            onClick={() => setFilterOpen(o => !o)}
          >
            <div className="flex items-center gap-3">
              <Filter size={18} />
              <span className="font-black text-base">Filter by tech</span>
              {selectedTags.length > 0 && (
                <motion.span
                  key={selectedTags.length}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[10px] font-black uppercase px-2 py-0.5 bg-primary border-[2px] border-foreground"
                  style={{ boxShadow: "1px 1px 0 #000" }}
                >
                  {selectedTags.length} selected
                </motion.span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {(selectedTags.length > 0 || groupProjectsOnly) && (
                <motion.button
                  onClick={e => { e.stopPropagation(); setSelectedTags([]); setGroupProjectsOnly(false); }}
                  className="text-xs font-black uppercase px-2 py-1 border-[2px] border-foreground/40 hover:border-foreground transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✕ Clear
                </motion.button>
              )}
              <motion.span
                className="font-black text-sm tabular-nums"
                key={filteredProjects.length}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {filteredProjects.length}/{allProjects.length}
              </motion.span>
              <span className="font-black text-lg leading-none">{filterOpen ? "▲" : "▼"}</span>
            </div>
          </div>

          {/* Panel body */}
          <AnimatePresence initial={false}>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden border-x-[3px] border-b-[3px] border-foreground"
                style={{ boxShadow: "4px 4px 0 #000" }}
              >
                <div className="p-4 space-y-4 bg-muted/30">
                  {/* Group Filter */}
                  <div className="space-y-1.5 border-b-[2px] border-dashed border-foreground/20 pb-4 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                      👥 Project Type
                    </span>
                    <div className="flex gap-2 mt-1">
                      <motion.button
                        onClick={() => setGroupProjectsOnly(prev => !prev)}
                        className="shrink-0 text-xs font-black uppercase tracking-wider px-3 py-1.5 border-[2px] cursor-pointer transition-all whitespace-nowrap"
                        style={{
                          background: groupProjectsOnly ? "#000" : "transparent",
                          color: groupProjectsOnly ? "#fff" : "#000",
                          borderColor: "#000",
                          boxShadow: groupProjectsOnly ? "2px 2px 0 rgba(0,0,0,0.4)" : "none",
                        }}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {groupProjectsOnly && <span className="mr-1">✓</span>}
                        Group Projects Only
                      </motion.button>
                    </div>
                  </div>

                  {TAG_GROUPS.map(group => {
                    // Only show tags that exist in actual data
                    const usedTags = group.tags.filter(t => allTagsSet.has(t));
                    if (usedTags.length === 0) return null;
                    return (
                      <div key={group.label} className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                          {group.label}
                        </span>
                        {/* Horizontal scrollable tag row */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {usedTags.map(tag => {
                            const isSelected = selectedTags.includes(tag);
                            const brand = TAG_COLORS[tag] ?? { bg: "#88888822", text: "#555" };
                            return (
                              <motion.button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className="shrink-0 text-xs font-black uppercase tracking-wider px-3 py-1.5 border-[2px] cursor-pointer transition-all whitespace-nowrap"
                                style={{
                                  background: isSelected ? brand.text : brand.bg,
                                  color: isSelected ? "#fff" : brand.text,
                                  borderColor: isSelected ? brand.text : "transparent",
                                  boxShadow: isSelected ? `2px 2px 0 ${brand.text}66` : "none",
                                }}
                                whileHover={{ scale: 1.06, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {isSelected && <span className="mr-1">✓</span>}
                                {tag}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>


        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ delay: index * 0.04, type: "spring", stiffness: 80 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative">
                  {/* Featured / WIP badge */}
                  {project.featured && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-primary border-[2px] border-foreground px-2 py-1"
                        style={{ boxShadow: "2px 2px 0 #000" }}>
                        ⭐ Featured
                      </span>
                    </div>
                  )}
                  {project.inProcess && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-accent border-[2px] border-foreground px-2 py-1"
                        style={{ boxShadow: "2px 2px 0 #000" }}>
                        🔨 WIP
                      </span>
                    </div>
                  )}

                  <div
                    className="border-[3px] border-foreground bg-background flex flex-col"
                    style={{ boxShadow: "5px 5px 0 #000" }}
                  >
                    {/* Browser chrome + carousel */}
                    <div className="overflow-hidden">
                      <BrowserBar color={project.color} />
                      <Carousel className="w-full" plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}>
                        <CarouselContent>
                          {project.images.map((img, i) => (
                            <CarouselItem key={i}>
                              <div className="relative h-52 overflow-hidden">
                                <img
                                  src={img}
                                  alt={`${project.title} screenshot ${i + 1}`}
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </Carousel>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div>
                        <h3 className="text-xl font-black leading-tight mb-1">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          <div className="inline-flex items-center gap-1 border-[2px] border-foreground/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-foreground/80">
                            <User size={11} /> {project.role}
                          </div>
                          {project.teamSize && (
                            <div className="inline-flex items-center gap-1 border-[2px] border-foreground px-1.5 py-0.5 bg-primary text-foreground text-[10px] font-bold uppercase tracking-widest">
                              <Users size={11} /> Team: {project.teamSize}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => {
                          const brand = TAG_COLORS[tag] ?? { bg: "#88888822", text: "#555" };
                          return (
                            <span key={tag}
                              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border-[2px] border-foreground/25"
                              style={{ background: brand.bg, color: brand.text }}
                            >{tag}</span>
                          );
                        })}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-auto pt-1">
                        <Link to={`/projects/${project.id}`} className="flex-1">
                          <NeoButton variant="outline" size="sm" className="w-full justify-center gap-2">
                            🔍 Details
                          </NeoButton>
                        </Link>

                        {project.link ? (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <NeoButton variant="primary" size="sm" className="w-full justify-center gap-2">
                              <ExternalLink size={13} /> Live Demo
                            </NeoButton>
                          </a>
                        ) : (
                          <div className="flex-1" title={project.inProcess ? "In development" : "Not deployed yet"}>
                            <NeoButton variant="outline" size="sm"
                              className="w-full justify-center gap-2 opacity-50 cursor-not-allowed" disabled>
                              <Clock size={13} />
                              {project.inProcess ? "In Dev" : "Coming Soon"}
                            </NeoButton>
                          </div>
                        )}

                        {/* GitHub */}
                        {project.github ? (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" title="Source code">
                            <NeoButton variant="outline" size="sm" className="px-3">
                              <Github size={14} />
                            </NeoButton>
                          </a>
                        ) : (
                          <div title="Private repository">
                            <NeoButton variant="outline" size="sm"
                              className="px-3 opacity-50 cursor-not-allowed" disabled>
                              <Lock size={13} />
                            </NeoButton>
                          </div>
                        )}

                        {/* Jira — icon only */}
                        {project.jira && (
                          <a href={project.jira} target="_blank" rel="noopener noreferrer" title="Jira board"
                            onClick={() => {
                              if (project.jiraToastMsg) toast.info(project.jiraToastMsg);
                            }}>
                            <NeoButton variant="outline" size="sm" className="px-3">
                              <Trello size={14} className="text-[#0052CC]" />
                            </NeoButton>
                          </a>
                        )}

                        {/* Docs — icon only */}
                        {project.docs && (
                          <a href={project.docs} target="_blank" rel="noopener noreferrer" title="Documentation"
                            onClick={() => {
                              if (project.docsToastMsg) toast.info(project.docsToastMsg);
                            }}>
                            <NeoButton variant="outline" size="sm" className="px-3">
                              <BookOpen size={14} />
                            </NeoButton>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
