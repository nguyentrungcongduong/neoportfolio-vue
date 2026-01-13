import NeoButton from "./NeoButton";
import NeoBadge from "./NeoBadge";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <NeoBadge variant="accent">Available for work</NeoBadge>
              <NeoBadge variant="secondary">Frontend Developer</NeoBadge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hi, I'm{" "}
              <span className="bg-primary px-2 inline-block transform -rotate-1">
                Alex Nguyen
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              I craft <span className="bg-secondary px-1">bold</span> and{" "}
              <span className="bg-accent px-1">memorable</span> digital experiences 
              with clean code and creative design.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <NeoButton variant="primary" size="lg">
                View My Work
              </NeoButton>
              <NeoButton variant="outline" size="lg">
                Download CV
              </NeoButton>
            </div>
            
            <div className="flex gap-4 pt-4">
              <a 
                href="#" 
                className="neo-button bg-foreground text-background p-3"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="#" 
                className="neo-button bg-info p-3"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#contact" 
                className="neo-button bg-secondary p-3"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          {/* Right Content - Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 bg-primary border-[3px] border-foreground shadow-neo-lg transform rotate-3 flex items-center justify-center overflow-hidden">
                <div className="text-[200px] font-bold select-none">👨‍💻</div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 neo-badge bg-accent animate-bounce">
                React
              </div>
              <div className="absolute -bottom-4 -left-4 neo-badge bg-secondary">
                TypeScript
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <a href="#about" className="neo-button bg-background p-3 animate-bounce">
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
