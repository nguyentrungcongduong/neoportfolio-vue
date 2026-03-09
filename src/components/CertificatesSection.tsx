import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import { Award } from "lucide-react";
import { certificates } from "@/data/certificatesData";

const INITIAL_DISPLAY = 3;

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
          {certificates.slice(0, INITIAL_DISPLAY).map((cert, index) => (
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
              <NeoCard className="h-full flex flex-col gap-4 cursor-pointer group">
                <div className="flex items-start justify-between gap-3">
                  <motion.div
                    className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-background border-3 border-foreground shadow-neo"
                    animate={isInView ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <NeoBadge variant={cert.badgeVariant}>{cert.date}</NeoBadge>
                </div>
                <h3 className="text-lg font-bold leading-snug">{cert.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mt-auto">
                  <Award size={16} />
                  <span className="text-sm font-medium">{cert.org}</span>
                </div>
              </NeoCard>
            </motion.div>
          ))}
        </div>

        {certificates.length > INITIAL_DISPLAY && (
          <motion.div className="text-center mt-10" variants={itemVariants}>
            <Link to="/certificates">
              <motion.button
                className="px-8 py-3 bg-foreground text-background font-bold text-lg border-3 border-foreground rounded-xl shadow-neo hover:shadow-none transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Xem tất cả ({certificates.length}) →
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default CertificatesSection;
