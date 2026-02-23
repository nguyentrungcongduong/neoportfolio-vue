import { motion } from "framer-motion";
import NeoCard from "@/components/NeoCard";
import NeoBadge from "@/components/NeoBadge";
import { Award, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const certificates = [
  {
    name: "Google AI for K12 Educators",
    org: "Google",
    date: "01/2026",
    emoji: "🤖",
    variant: "primary" as const,
    badgeVariant: "primary" as const,
  },
  {
    name: "Google Cloud Computing Foundations Certificate",
    org: "Google Cloud",
    date: "01/2026",
    emoji: "☁️",
    variant: "info" as const,
    badgeVariant: "info" as const,
  },
  {
    name: "Build a Secure Google Cloud Network Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    emoji: "🔒",
    variant: "accent" as const,
    badgeVariant: "accent" as const,
  },
  {
    name: "Implement Load Balancing on Compute Engine Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    emoji: "⚖️",
    variant: "secondary" as const,
    badgeVariant: "secondary" as const,
  },
  {
    name: "Prepare Data for ML APIs on Google Cloud Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    emoji: "📊",
    variant: "primary" as const,
    badgeVariant: "primary" as const,
  },
  {
    name: "Set Up an App Dev Environment on Google Cloud Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    emoji: "🛠️",
    variant: "info" as const,
    badgeVariant: "info" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 },
  },
};

const AllCertificates = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-lg hover:underline"
          >
            <ArrowLeft size={20} /> Quay lại
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          variants={itemVariants}
        >
          Tất cả chứng chỉ 🏆
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground mb-12"
          variants={itemVariants}
        >
          Tổng cộng {certificates.length} chứng chỉ đã đạt được
        </motion.p>

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
                    animate={{ rotate: [0, -10, 10, 0] }}
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
              </NeoCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AllCertificates;
