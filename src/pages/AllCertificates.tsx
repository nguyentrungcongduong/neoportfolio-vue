import { motion } from "framer-motion";
import NeoCard from "@/components/NeoCard";
import NeoBadge from "@/components/NeoBadge";
import { Award, ArrowLeft, ExternalLink, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import { certificates } from "@/data/certificatesData";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";

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
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

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
          {certificates.map((cert) => (
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
              <NeoCard className="h-full flex flex-col group p-0 overflow-hidden bg-white dark:bg-card">
                {/* Image — click to zoom */}
                <div
                  className="relative w-full aspect-[4/3] border-b-3 border-foreground bg-gray-50 flex items-center justify-center p-6 overflow-hidden cursor-zoom-in group/img"
                  onClick={() => { setLightboxSrc(cert.imageUrl); setLightboxAlt(cert.name); }}
                >
                  <motion.img
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="w-full h-full object-contain drop-shadow-sm pointer-events-none"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 right-3 z-10 shadow-neo">
                    <NeoBadge variant={cert.badgeVariant}>{cert.date}</NeoBadge>
                  </div>
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/img:bg-black/20 transition-all duration-200">
                    <div className="opacity-0 group-hover/img:opacity-100 transition-opacity w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/60">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <h3 className="text-lg font-black leading-tight line-clamp-3">{cert.name}</h3>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-dashed border-foreground/20">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award size={16} className={`text-${cert.variant}`} />
                      <span className="text-sm font-bold uppercase tracking-wider">{cert.org}</span>
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-150"
                      >
                        Xem chứng chỉ <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </NeoCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={() => setLightboxSrc(null)} />
    </div>
  );
};

export default AllCertificates;
