import { motion } from "framer-motion";
import NeoButton from "./NeoButton";
import NeoBadge from "./NeoBadge";
import { Github, Facebook, Mail, ArrowDown, Sparkles } from "lucide-react";
import avatarImg from "../assets/projects/porofolio.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden relative">
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary border-[3px] border-foreground"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary border-[3px] border-foreground rounded-full"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-accent border-[3px] border-foreground"
          animate={{ rotate: [-10, 10, -10], scale: [1, 0.9, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ willChange: "transform" }}
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ willChange: "opacity" }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: -3 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoBadge variant="accent" className="flex items-center gap-1">
                  <Sparkles size={14} className="animate-pulsate" />
                  Backend Developer
                </NeoBadge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 3 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoBadge variant="secondary">Frontend Developer</NeoBadge>
              </motion.div>
               <motion.div whileHover={{ scale: 1.1, rotate: 3 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoBadge variant="secondary">Mobile Developer</NeoBadge>
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{ willChange: "transform, opacity" }}
            >
              Hello, My name is{" "}
              <motion.span
                className="bg-primary px-2 inline-block text-shadow-neo"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
                style={{ willChange: "transform" }}
              >
                Công Dưỡng
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl font-medium leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ willChange: "transform, opacity" }}
            >
              I’m a{" "}
              <motion.span
                className="bg-secondary px-1 inline-block font-bold"
                whileHover={{ scale: 1.1 }}
                style={{ willChange: "transform" }}
              >
                software developer
              </motion.span>{" "}
              passionate about building{" "}
              <motion.span
                className="bg-accent px-1 inline-block font-bold"
                whileHover={{ scale: 1.1 }}
                style={{ willChange: "transform" }}
              >
                modern web applications
              </motion.span>{" "}
              with <span className="font-bold">clean code</span> and{" "}
              <span className="font-bold">scalable architecture</span>.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoButton variant="primary" size="lg" className="hover-jello">View My Work</NeoButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} style={{ willChange: "transform" }}>
                <NeoButton variant="outline" size="lg" className="hover-wobble">Download CV</NeoButton>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ willChange: "transform, opacity" }}
            >
              {[
                { icon: Github, color: "bg-foreground text-background", label: "GitHub", href: "https://github.com/nguyentrungcongduong" },
                { icon: Facebook, color: "bg-blue-600", label: "Facebook", href: "https://www.facebook.com/congduong.nguyentrung.3?locale=vi_VN" },
                { icon: Mail, color: "bg-secondary", label: "Email", href: "mailto:congduongnguyentrung@gmail.com" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`neo-button ${social.color} p-3`}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ willChange: "transform" }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Avatar */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="relative">
              <motion.div
                className="w-72 h-72 md:w-96 md:h-96 bg-primary border-[3px] border-foreground shadow-neo-lg flex items-center justify-center overflow-hidden"
                animate={{ y: [-10, 10, -10], rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
                style={{ willChange: "transform" }}
              >
                <img
                  src={avatarImg}
                  alt="Avatar"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  style={{ willChange: "transform" }}
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 neo-badge bg-accent"
                animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.3 }}
                style={{ willChange: "transform" }}
              >
                React ⚛️
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 neo-badge bg-secondary"
                animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                whileHover={{ scale: 1.3 }}
                style={{ willChange: "transform" }}
              >
                Java 💙
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-8 neo-badge bg-info"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.3 }}
                style={{ willChange: "transform" }}
              >
                Php 🎨
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#about"
            className="neo-button bg-background p-3"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            whileHover={{ scale: 1.2 }}
          >
            <ArrowDown size={24} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
