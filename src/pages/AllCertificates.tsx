import { motion } from "framer-motion";
import NeoCard from "@/components/NeoCard";
import NeoBadge from "@/components/NeoBadge";
import { Award, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { certificates } from "@/data/certificatesData";

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
              <NeoCard className="h-full flex flex-col gap-4 cursor-pointer group">
                <div className="flex items-start justify-between gap-3">
                  <motion.div
                    className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-background border-3 border-foreground shadow-neo"
                    animate={{ scale: [1, 1.05, 1] }}
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
      </motion.div>
    </div>
  );
};

export default AllCertificates;
