import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function FullscreenGallery({ 
  images, 
  initialIdx, 
  onClose 
}: { 
  images: string[], 
  initialIdx: number, 
  onClose: () => void 
}) {
  const [idx, setIdx] = useState(initialIdx);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  const handleNext = () => {
    if (idx < images.length - 1) {
      setDirection(1);
      setIdx(idx + 1);
    }
  };

  const handlePrev = () => {
    if (idx > 0) {
      setDirection(-1);
      setIdx(idx - 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      style={{ cursor: 'auto' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button 
        onClick={onClose}
        className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={24} />
      </button>

      <div 
        className="relative h-full w-full flex items-center justify-center p-4 md:p-20 pointer-events-none"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={idx}
            src={images[idx]}
            initial={{ opacity: 0, scale: 0.9, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-h-full max-w-full object-contain shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        {idx > 0 && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-6 top-1/2 z-[110] -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10 pointer-events-auto"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {idx < images.length - 1 && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-6 top-1/2 z-[110] -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10 pointer-events-auto"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-sm tracking-widest text-white/50">
        {idx + 1} / {images.length}
      </div>
    </motion.div>
  );
}
