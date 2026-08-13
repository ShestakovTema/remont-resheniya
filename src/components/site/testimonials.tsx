import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { Reveal } from "./reveal";

export function Testimonials({ id }: { id?: string }) {
  const t = useT();
  const QUOTES = [
    { q: t("test.1.q"), a: "Алексей И.", r: "Элитный ремонт в Хамовниках" },
    { q: t("test.2.q"), a: "Марина С.", r: "Ремонт в новостройке ЖК 'Зиларт'" },
    { q: t("test.3.q"), a: "Сергей П.", r: "Капитальный ремонт вторички" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(timer);
  }, [QUOTES.length]);
  const cur = QUOTES[i] || QUOTES[0];
  
  return (
    <section id={id || "testimonials"} className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between">
          <Reveal className="text-xs uppercase tracking-[0.3em] text-white/60">
            {t("test.section")}
          </Reveal>
          <div className="flex gap-2">
            {QUOTES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-[2px] w-8 transition-colors ${idx === i ? "bg-white" : "bg-white/25"}`}
              />
            ))}
          </div>
        </div>
        <div className="relative">
          <div aria-hidden className="invisible pointer-events-none">
            <div className="relative">
              {QUOTES.map((qq, idx) => (
                <div
                  key={`s-${idx}`}
                  className={idx === 0 ? "relative" : "absolute inset-0"}
                >
                  <blockquote className="font-display max-w-[24ch] text-3xl leading-tight sm:text-4xl md:text-7xl">
                    “{qq.q}”
                  </blockquote>
                  <div className="mt-10 flex items-center gap-4 text-sm">
                    <span>{qq.a}</span>
                    <span className="h-px w-8" />
                    <span>{qq.r}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="font-display max-w-[24ch] text-3xl leading-tight sm:text-4xl md:text-7xl"
            >
              “{cur?.q}”
            </motion.blockquote>
            <motion.footer
              key={`f-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex items-center gap-4 text-sm text-white/70"
            >
              <span className="text-white">{cur?.a}</span>
              <span className="h-px w-8 bg-white/30" />
              <span>{cur?.r}</span>
            </motion.footer>
          </div>
        </div>
      </div>
    </section>
  );
}
