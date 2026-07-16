import { motion } from "framer-motion";
import { Github, Facebook, Twitter, Heart, Sparkles } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLang();

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
              { icon: Github, hoverColor: "hover:bg-primary", href: "https://github.com/nguyentrungcongduong" },
              { icon: Facebook, hoverColor: "hover:bg-blue-600", href: "https://www.facebook.com/congduong.nguyentrung.3?locale=vi_VN" },
              { icon: Twitter, hoverColor: "hover:bg-secondary", href: "#" },
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
            {t.footer.madeWith}{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={18} className="text-secondary fill-secondary" />
            </motion.span>{" "}
            in Vietnam 🇻🇳
          </p>
          <p className="text-background/60 mt-2">
            © {currentYear} {t.footer.rights}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
