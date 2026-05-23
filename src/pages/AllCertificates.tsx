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
              <a 
                href={cert.link || "#"} 
                target={cert.link ? "_blank" : "_self"} 
                rel={cert.link ? "noopener noreferrer" : ""}
                className="block h-full"
              >
                <NeoCard className="h-full flex flex-col cursor-pointer group p-0 overflow-hidden bg-white dark:bg-card">
                  {/* Image Top Half */}
                  <div className="relative w-full aspect-[4/3] border-b-3 border-foreground bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
                    <motion.img
                      src={cert.imageUrl}
                      alt={cert.name}
                      className="w-full h-full object-contain drop-shadow-sm"
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-3 right-3 z-10 shadow-neo">
                      <NeoBadge variant={cert.badgeVariant}>{cert.date}</NeoBadge>
                    </div>
                    {/* Decorative overlay on hover */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  
                  {/* Content Bottom Half */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <h3 className="text-lg font-black leading-tight line-clamp-3 group-hover:text-primary transition-colors">{cert.name}</h3>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-dashed border-foreground/20">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award size={16} className={`text-${cert.variant}`} />
                        <span className="text-sm font-bold uppercase tracking-wider">{cert.org}</span>
                      </div>
                    </div>
                  </div>
                </NeoCard>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AllCertificates;
