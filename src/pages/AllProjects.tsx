import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NeoCard from "@/components/NeoCard";
import NeoBadge from "@/components/NeoBadge";
import NeoButton from "@/components/NeoButton";
import { ExternalLink, Github, ShoppingCart, CheckSquare, Cloud, Layers, ArrowLeft, Gamepad2, Camera, Music, Brain, Filter } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import FloatingPet from "@/components/FloatingPet";
import { cn } from "@/lib/utils";

const allProjects = [
  { title: "E-Commerce Platform", description: "A full-featured online store with cart, checkout, and payment integration.", tags: ["React", "Node.js", "Stripe"], color: "bg-primary", icon: ShoppingCart },
  { title: "Task Management App", description: "Kanban-style project management tool with real-time collaboration.", tags: ["Next.js", "TypeScript", "Socket.io"], color: "bg-secondary", icon: CheckSquare },
  { title: "Weather Dashboard", description: "Beautiful weather app with forecasts, maps, and location-based alerts.", tags: ["React", "API", "Charts"], color: "bg-accent", icon: Cloud },
  { title: "Portfolio Generator", description: "Create stunning portfolios with drag-and-drop builder and templates.", tags: ["Vue.js", "Firebase", "Tailwind"], color: "bg-info", icon: Layers },
  { title: "Retro Game Hub", description: "Collection of classic arcade games rebuilt with modern web technologies.", tags: ["Canvas", "TypeScript", "WebGL"], color: "bg-primary", icon: Gamepad2 },
  { title: "Photo Editor Pro", description: "Browser-based photo editor with filters, layers, and AI-powered enhancements.", tags: ["React", "WebAssembly", "AI"], color: "bg-secondary", icon: Camera },
  { title: "Music Streaming App", description: "Spotify-inspired music player with playlist management and audio visualizer.", tags: ["React", "Web Audio", "Node.js"], color: "bg-accent", icon: Music },
  { title: "AI Chat Assistant", description: "Intelligent chatbot powered by GPT with memory and context awareness.", tags: ["Python", "OpenAI", "React"], color: "bg-info", icon: Brain },
];

const AllProjects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allProjects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return allProjects;
    return allProjects.filter(project =>
      project.tags.some(tag => selectedTags.includes(tag))
    );
  }, [selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen relative">
      <CustomCursor />
      <FloatingPet />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/">
            <NeoButton variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" /> Về trang chủ
            </NeoButton>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-black text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tất Cả <span className="bg-secondary px-2 inline-block">Dự Án</span> 🚀
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Bộ sưu tập đầy đủ các dự án mình đã thực hiện ✨
        </motion.p>

        {/* Filter Section */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} />
              <h3 className="text-lg font-bold">Lọc theo công nghệ:</h3>
            </div>
            <motion.div
              className="text-muted-foreground font-medium"
              key={filteredProjects.length}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {filteredProjects.length} dự án
            </motion.div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NeoButton
                variant={selectedTags.length === 0 ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedTags([])}
              >
                Tất cả
              </NeoButton>
            </motion.div>
            
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <motion.div
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "neo-badge cursor-pointer transition-all",
                      isSelected ? "bg-accent" : "bg-background"
                    )}
                  >
                    {tag}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 80 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
              <NeoCard className="group overflow-hidden">
                <motion.div
                  className={`${project.color} h-48 border-b-[3px] border-foreground -m-6 mb-4 flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)",
                    }}
                  />
                  <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                    <project.icon size={80} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <motion.div key={tag} whileHover={{ scale: 1.1, rotate: 5 }}>
                        <NeoBadge variant="outline">{tag}</NeoBadge>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <NeoButton variant="primary" size="sm">
                      <ExternalLink size={16} className="mr-2" /> Live Demo
                    </NeoButton>
                    <NeoButton variant="outline" size="sm">
                      <Github size={16} className="mr-2" /> Code
                    </NeoButton>
                  </div>
                </div>
              </NeoCard>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
