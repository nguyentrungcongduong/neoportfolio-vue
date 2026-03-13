import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import { Code, Palette, Zap, Coffee, Heart, Layers, Users } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: "React", variant: "primary" as const, emoji: "⚛️" },
    { name: "TypeScript", variant: "info" as const, emoji: "📘" },
    { name: "Vuejs", variant: "accent" as const, emoji: "💚" },
    { name: "React-Native", variant: "info" as const, emoji: "📱" },
    { name: "Next.js", variant: "secondary" as const, emoji: "▲" },
    { name: "Laravel", variant: "primary" as const, emoji: "🔴" },
    { name: "Golang-Gin", variant: "info" as const, emoji: "🐹" },
    { name: "Spring boot", variant: "accent" as const, emoji: "🍃" },
    { name: "Kotlin", variant: "secondary" as const, emoji: "🟣" },
    { name: "AWS", variant: "accent" as const, emoji: "☁️" },
    { name: "Docker", variant: "info" as const, emoji: "🐳" },
    { name: "MongoDB", variant: "accent" as const, emoji: "🍃" },
    { name: "Git", variant: "primary" as const, emoji: "🎋" },
    { name: "Mysql", variant: "info" as const, emoji: "🐬" },
    { name: "PostgreSQL", variant: "secondary" as const, emoji: "🐘" },
    { name: "Redis", variant: "accent" as const, emoji: "⚡" },
  ];

  const stats = [
    { icon: Code, label: "Projects Done", value: "50+", color: "bg-primary" },
    { icon: Zap, label: "Years Exp", value: "5+", color: "bg-info" },
    { icon: Layers, label: "Tech Stack", value: "15+", color: "bg-accent" },
    { icon: Users, label: "Happy Clients", value: "20+", color: "bg-secondary" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
      },
    }),
  };

  return (
    <section id="about" className="py-20 px-4 overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants} style={{ willChange: "transform, opacity" }}>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ willChange: "transform, opacity" }}
          >
            About{" "}
            <motion.span
              className="bg-accent px-2 inline-block text-shadow-neo"
              whileHover={{ rotate: 5, scale: 1.1 }}
              animate={isInView ? { rotate: [0, -5, 5, 0] } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ willChange: "transform" }}
            >
              Me
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            A passionate developer who loves creating beautiful and functional web applications
            <motion.span
              className="inline-block ml-2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ willChange: "transform" }}
            >
              <Heart className="inline w-5 h-5 text-secondary fill-secondary" />
            </motion.span>
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div variants={itemVariants} style={{ willChange: "transform, opacity" }}>
            <NeoCard className="space-y-4 h-full">
              <motion.h3
                className="text-2xl font-bold"
                whileHover={{ x: 10 }}
                style={{ willChange: "transform" }}
              >
                Who I Am 🙋‍♂️
              </motion.h3>
              <p className="text-lg leading-relaxed">
                I'm a{" "}
                <motion.span
                  className="bg-primary px-1 inline-block"
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  style={{ willChange: "transform" }}
                >
                  Full Stack Developer
                </motion.span>{" "}
                passionate about building modern web applications and exploring new technologies. I
                enjoy turning ideas into real products through clean code and thoughtful design.
              </p>
              <p className="text-lg leading-relaxed">
                I focus on developing skills in web development, scalable systems, and modern
                frameworks by building personal projects and experimenting with new tools.
              </p>
              <p className="text-lg leading-relaxed">
                When I'm not coding, you can find me exploring technology trends, design ideas, and
                open-source projects — sometimes with a good cup of coffee ☕.
              </p>
            </NeoCard>
          </motion.div>

          <motion.div variants={itemVariants} style={{ willChange: "transform, opacity" }}>
            <NeoCard variant="primary" className="space-y-4 h-full">
              <motion.h3
                className="text-2xl font-bold"
                whileHover={{ x: 10 }}
                style={{ willChange: "transform" }}
              >
                My Skills 🛠️
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    variants={skillVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{
                      scale: 1.15,
                      rotate: [-5, 5, -5, 0],
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    style={{ willChange: "transform" }}
                  >
                    <NeoBadge variant={skill.variant}>
                      {skill.emoji} {skill.name}
                    </NeoBadge>
                  </motion.div>
                ))}
              </div>
            </NeoCard>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <NeoCard className={`${stat.color} text-center`}>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={isInView ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  style={{ willChange: "transform" }}
                >
                  <stat.icon size={32} className="mx-auto mb-2" />
                </motion.div>
                <motion.div
                  className="text-3xl font-bold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                  style={{ willChange: "transform, opacity" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm font-medium uppercase">{stat.label}</div>
              </NeoCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
