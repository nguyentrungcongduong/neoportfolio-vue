import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="text-2xl font-bold">
            Alex<span className="text-primary">.</span>dev
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="#" 
              className="p-3 bg-background text-foreground border-[3px] border-background hover:bg-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className="p-3 bg-background text-foreground border-[3px] border-background hover:bg-info transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="#" 
              className="p-3 bg-background text-foreground border-[3px] border-background hover:bg-secondary transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart size={18} className="text-secondary fill-secondary" /> in Vietnam
          </p>
          <p className="text-background/60 mt-2">
            © {currentYear} Alex Nguyen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
