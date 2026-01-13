import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import NeoButton from "./NeoButton";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with cart, checkout, and payment integration.",
      tags: ["React", "Node.js", "Stripe"],
      color: "bg-primary",
      link: "#",
      github: "#",
    },
    {
      title: "Task Management App",
      description: "Kanban-style project management tool with real-time collaboration.",
      tags: ["Next.js", "TypeScript", "Socket.io"],
      color: "bg-secondary",
      link: "#",
      github: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather app with forecasts, maps, and location-based alerts.",
      tags: ["React", "API", "Charts"],
      color: "bg-accent",
      link: "#",
      github: "#",
    },
    {
      title: "Portfolio Generator",
      description: "Create stunning portfolios with drag-and-drop builder and templates.",
      tags: ["Vue.js", "Firebase", "Tailwind"],
      color: "bg-info",
      link: "#",
      github: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            My <span className="bg-secondary px-2 inline-block transform -rotate-1">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent works that I'm proud of
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <NeoCard key={index} className="group">
              {/* Project Image Placeholder */}
              <div className={`${project.color} h-48 border-b-[3px] border-foreground -m-6 mb-4 flex items-center justify-center`}>
                <span className="text-6xl">🚀</span>
              </div>
              
              <div className="space-y-4 pt-2">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <NeoBadge key={tag} variant="outline">
                      {tag}
                    </NeoBadge>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <NeoButton variant="primary" size="sm">
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </NeoButton>
                  <NeoButton variant="outline" size="sm">
                    <Github size={16} className="mr-2" />
                    Code
                  </NeoButton>
                </div>
              </div>
            </NeoCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <NeoButton variant="accent" size="lg">
            View All Projects
          </NeoButton>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
