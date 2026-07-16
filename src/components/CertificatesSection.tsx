import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import { Award, ZoomIn, ExternalLink } from "lucide-react";
import { certificates } from "@/data/certificatesData";
import { Lightbox } from "./Lightbox";
import { useLang } from "@/context/LanguageContext";

const INITIAL_DISPLAY = 3;

const CertificatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const { t } = useLang();

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
        <motion.div className="text-center mb-16" variants={itemVariants} style={{ willChange: "transform, opacity" }}>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ willChange: "transform, opacity" }}
          >
            {t.certificates.title}{" "}
            <motion.span
              className="bg-secondary px-2 inline-block text-shadow-neo"
              whileHover={{ rotate: 5, scale: 1.1 }}
              animate={isInView ? { rotate: [0, -5, 5, 0] } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ willChange: "transform" }}
            >
              {t.certificates.titleHighlight}
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t.certificates.subtitle}
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
              style={{ willChange: "transform, opacity" }}
            >
              <NeoCard className="h-full flex flex-col group p-0 overflow-hidden bg-white dark:bg-card">
                  {/* Image — click to zoom */}
                  <div
                    className="relative w-full aspect-[4/3] border-b-3 border-foreground bg-gray-50 flex items-center justify-center p-6 overflow-hidden cursor-zoom-in group/img"
                    onClick={() => setLightboxSrc(cert.imageUrl)}
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
                          {t.certificates.view} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </NeoCard>
            </motion.div>
          ))}
        </div>

        {certificates.length > INITIAL_DISPLAY && (
          <motion.div className="text-center mt-10" variants={itemVariants} style={{ willChange: "transform, opacity" }}>
            <Link to="/certificates">
              <motion.button
                className="px-8 py-3 bg-foreground text-background font-bold text-lg border-3 border-foreground rounded-xl shadow-neo hover:shadow-none transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ willChange: "transform" }}
              >
                {t.certificates.viewAll.replace("→", `(${certificates.length}) →`)}
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
      <Lightbox src={lightboxSrc} alt="Certificate" onClose={() => setLightboxSrc(null)} />
    </section>
  );
};

export default CertificatesSection;
