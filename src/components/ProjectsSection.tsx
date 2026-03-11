import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import NeoButton from "./NeoButton";
import { ExternalLink, Github, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import ecommerce1 from "@/assets/projects/ecommerce-1.png";
import ecommerce2 from "@/assets/projects/ecommerce-2.png";
import task1 from "@/assets/projects/task-1.png";
import task2 from "@/assets/projects/task-2.png";
import weather1 from "@/assets/projects/weather-1.png";
import weather2 from "@/assets/projects/weather-2.png";
import portfolio1 from "@/assets/projects/portfolio-1.png";
import portfolio2 from "@/assets/projects/portfolio-2.png";
const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with cart, checkout, and payment integration.",
      tags: ["React", "Node.js", "Stripe"],
      color: "bg-primary",
      icon: ShoppingCart,
      link: "#",
      github: "#",
    },
    {
      title: "Task Management App",
      description: "Kanban-style project management tool with real-time collaboration.",
      tags: ["Next.js", "TypeScript", "Socket.io"],
      color: "bg-secondary",
      icon: CheckSquare,
      link: "#",
      github: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather app with forecasts, maps, and location-based alerts.",
      tags: ["React", "API", "Charts"],
      color: "bg-accent",
      icon: Cloud,
      link: "#",
      github: "#",
    },
    {
      title: "Portfolio Generator",
      description: "Create stunning portfolios with drag-and-drop builder and templates.",
      tags: ["Vue.js", "Firebase", "Tailwind"],
      color: "bg-info",
      icon: Layers,
      link: "#",
      github: "#",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
      },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 bg-muted overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            My{" "}
            <motion.span
              className="bg-secondary px-2 inline-block text-shadow-neo"
              whileHover={{ rotate: 5, scale: 1.1 }}
              animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Projects
            </motion.span>
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Rocket className="inline w-10 h-10" />
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Here are some of my recent works that I'm proud of ✨
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <NeoCard className="group overflow-hidden">
                {/* Project Image Placeholder */}
                <motion.div
                  className={`${project.color} h-48 border-b-[3px] border-foreground -m-6 mb-4 flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    style={{
                      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)",
                      backgroundSize: "200% 200%",
                    }}
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <project.icon size={80} strokeWidth={1.5} />
                  </motion.div>
                </motion.div>

                <div className="space-y-4 pt-2">
                  <motion.h3
                    className="text-2xl font-bold"
                    whileHover={{ x: 10 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-muted-foreground">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 + tagIndex * 0.05 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <NeoBadge variant="outline">{tag}</NeoBadge>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NeoButton variant="primary" size="sm">
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </NeoButton>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NeoButton variant="outline" size="sm">
                        <Github size={16} className="mr-2" />
                        Code
                      </NeoButton>
                    </motion.div>
                  </div>
                </div>
              </NeoCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/projects">
              <NeoButton variant="accent" size="lg" className="hover-jello">
                View All Projects 🚀
              </NeoButton>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
