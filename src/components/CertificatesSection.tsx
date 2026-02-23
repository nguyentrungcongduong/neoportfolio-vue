import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    name: "React Developer Certificate",
    org: "Meta",
    date: "2024",
    emoji: "⚛️",
    variant: "primary" as const,
    badgeVariant: "primary" as const,
  },
  {
    name: "TypeScript Mastery",
    org: "Udemy",
    date: "2024",
    emoji: "💙",
    variant: "info" as const,
    badgeVariant: "info" as const,
  },
  {
    name: "UI/UX Design Fundamentals",
    org: "Google",
    date: "2023",
    emoji: "🎨",
    variant: "accent" as const,
    badgeVariant: "accent" as const,
  },
  {
    name: "Full-Stack Web Development",
    org: "freeCodeCamp",
    date: "2023",
    emoji: "🚀",
    variant: "secondary" as const,
    badgeVariant: "secondary" as const,
  },
  {
    name: "AWS Cloud Practitioner",
    org: "Amazon",
    date: "2023",
    emoji: "☁️",
    variant: "primary" as const,
    badgeVariant: "primary" as const,
  },
  {
    name: "Git & GitHub Mastery",
    org: "Coursera",
    date: "2022",
    emoji: "📦",
    variant: "info" as const,
    badgeVariant: "info" as const,
  },
];

const CertificatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 12 },
    },
  };

  return (
    <section id="certificates" className="py-20 px-4 overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Chứng chỉ{" "}
            <motion.span
              className="bg-secondary px-2 inline-block text-shadow-neo"
              whileHover={{ rotate: 5, scale: 1.1 }}
              animate={isInView ? { rotate: [0, -5, 5, 0] } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              🏆
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Những chứng chỉ mình đã đạt được trên hành trình học hỏi và phát triển
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.name}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <NeoCard className="h-full flex flex-col gap-3 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <motion.span
                    className="text-4xl"
                    animate={isInView ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {cert.emoji}
                  </motion.span>
                  <NeoBadge variant={cert.badgeVariant}>{cert.date}</NeoBadge>
                </div>
                <h3 className="text-lg font-bold leading-snug">{cert.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award size={16} />
                  <span className="text-sm font-medium">{cert.org}</span>
                </div>
                <motion.div
                  className="mt-auto pt-2 flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Xem chi tiết <ExternalLink size={14} />
                </motion.div>
              </NeoCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CertificatesSection;
