import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";

export function ProcessPhotos({ id }: { id?: string }) {
  const t = useT();
  const [activeTab, setActiveTab] = useState<'electrical' | 'plumbing'>('electrical');
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const constraintsRef = useRef(null);

  const electricalImages = [
    { src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800", alt: "Электромонтаж щита" },
    { src: "https://images.unsplash.com/photo-1558449028-c54758e57820?q=80&w=800", alt: "Прокладка кабеля" },
    { src: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800", alt: "Розетки и выключатели" },
    { src: "https://images.unsplash.com/photo-1565608087341-404b25458f63?q=80&w=800", alt: "Маркировка кабеля" },
    { src: "https://images.unsplash.com/photo-1521203478051-419b7875a6c4?q=80&w=800", alt: "Система умный дом" },
    { src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800", alt: "Инженерное оборудование" },
    { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800", alt: "Тестирование сетей" },
    { src: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800", alt: "Скрытая проводка" },
  ];

  const plumbingImages = [
    { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800", alt: "Коллекторный узел" },
    { src: "https://images.unsplash.com/photo-1504328156602-ff144cab47c0?q=80&w=800", alt: "Разводка труб REHAU" },
    { src: "https://images.unsplash.com/photo-1585704032915-c3400ca1f963?q=80&w=800", alt: "Инсталляция сантехники" },
    { src: "https://images.unsplash.com/photo-1607472586893-edb58bdc0e39?q=80&w=800", alt: "Система защиты от протечек" },
    { src: "https://images.unsplash.com/photo-1595191028557-5c5cba316975?q=80&w=800", alt: "Водомерный узел" },
    { src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800", alt: "Отопление и радиаторы" },
    { src: "https://images.unsplash.com/photo-1632833239129-234b4c781602?q=80&w=800", alt: "Фильтрация воды" },
    { src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800", alt: "Тёплый пол" },
  ];

  const currentImages = activeTab === 'electrical' ? electricalImages : plumbingImages;
  const totalPages = Math.ceil(currentImages.length / itemsPerPage);
  const displayedImages = currentImages.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const handleTabChange = (tab: 'electrical' | 'plumbing') => {
    setActiveTab(tab);
    setPage(0);
  };

  return (
    <section id={id || "process"} className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-xs uppercase tracking-[0.3em] text-white/60">
            {t("process.section")}
          </div>
          <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => handleTabChange('electrical')}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeTab === 'electrical' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              {t("process.electrical")}
            </button>
            <button
              onClick={() => handleTabChange('plumbing')}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeTab === 'plumbing' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              {t("process.plumbing")}
            </button>
          </div>
        </div>

        <div className="relative" ref={constraintsRef}>
          <div className="hidden md:block absolute -left-12 top-1/2 -translate-y-1/2 z-10 text-white/20 rotate-90 text-[10px] tracking-[0.3em] uppercase pointer-events-none">
            Swipe images
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${page}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3"
            >
              {displayedImages.map((img, i) => (
                <div 
                  key={img.src} 
                  className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all ${
                  page === i ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
