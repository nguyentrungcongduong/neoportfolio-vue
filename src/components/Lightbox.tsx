import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

// ── Lightbox Modal ─────────────────────────────────────────────
interface LightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export const Lightbox = ({ src, alt = "Image", onClose }: LightboxProps) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!src) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [src, handleKey]);

  return createPortal(
    <AnimatePresence>
      {src && (
        <motion.div
          key="lightbox-backdrop"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/25 border border-white/30 rounded-full text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </motion.button>

          {/* Image */}
          <motion.img
            src={src}
            alt={alt}
            className="max-w-[92vw] max-h-[90vh] object-contain rounded shadow-2xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* ESC hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
            Nhấn ESC hoặc click ra ngoài để đóng
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ── Zoomable Image wrapper ────────────────────────────────────
interface ZoomableImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "eager" | "lazy";
}


export const ZoomableImage = ({ src, alt = "Image", className = "", style, loading = "lazy" }: ZoomableImageProps) => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="relative group cursor-zoom-in" onClick={() => setLightbox(src)}>
        <img
          src={src}
          alt={alt}
          className={className}
          style={style}
          loading={loading}
          decoding="async"
        />
        {/* Zoom hint overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-all duration-200 opacity-0 group-hover:opacity-100">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
            <ZoomIn size={18} className="text-white" />
          </div>
        </div>
      </div>
      <Lightbox src={lightbox} alt={alt} onClose={() => setLightbox(null)} />
    </>
  );
};

export default Lightbox;
