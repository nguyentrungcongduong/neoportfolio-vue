import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Heart, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <motion.div 
            className="text-2xl font-bold flex items-center gap-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
            Công Dưỡng<span className="text-primary">.</span>dev
          </motion.div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { icon: Github, hoverColor: "hover:bg-primary" },
              { icon: Linkedin, hoverColor: "hover:bg-info" },
              { icon: Twitter, hoverColor: "hover:bg-secondary" },
            ].map((social, index) => (
              <motion.a 
                key={index}
                href="#" 
                className={`p-3 bg-background text-foreground border-[3px] border-background ${social.hoverColor} transition-colors`}
                aria-label={social.icon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div 
          className="border-t border-background/20 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="flex items-center justify-center gap-2">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={18} className="text-secondary fill-secondary" />
            </motion.span>{" "}
            in Vietnam 🇻🇳
          </p>
          <p className="text-background/60 mt-2">
            © {currentYear} Nguyễn Trung Công Dưỡng. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
