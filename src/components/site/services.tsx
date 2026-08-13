import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { useT } from "@/lib/i18n";
import { Magnetic } from "./magnetic";

export function Services({ id }: { id?: string }) {
  const t = useT();
  const services = [
    { id: "elite", n: "01", t: t("services.elite.title"), d: t("services.elite.desc"), href: "/elite" },
    { id: "new", n: "02", t: t("services.new.title"), d: t("services.new.desc"), href: "/newbuilding" },
    { id: "secondary", n: "03", t: t("services.secondary.title"), d: t("services.secondary.desc"), href: "/secondary" },
    { id: "design", n: "04", t: t("services.design.title"), d: t("services.design.desc"), href: "#contact" },
    { id: "electro", n: "05", t: t("services.electro.title"), d: t("services.electro.desc"), href: "#contact" },
    { id: "heating", n: "06", t: t("services.heating.title"), d: t("services.heating.desc"), href: "#contact" },
    { id: "water", n: "07", t: t("services.water.title"), d: t("services.water.desc"), href: "#contact" },
    { id: "low", n: "08", t: t("services.low.title"), d: t("services.low.desc"), href: "#contact" },
    { id: "smart", n: "09", t: t("services.smart.title"), d: t("services.smart.desc"), href: "#contact" },
    { id: "demolition", n: "10", t: t("services.demolition.title"), d: t("services.demolition.desc"), href: "#contact" },
    { id: "procurement", n: "11", t: t("services.procurement.title"), d: t("services.procurement.desc"), href: "#contact" },
    { id: "commissioning", n: "12", t: t("services.commissioning.title"), d: t("services.commissioning.desc"), href: "#contact" },
    { id: "cleaning", n: "13", t: t("services.cleaning.title"), d: t("services.cleaning.desc"), href: "#contact" },
  ];

  return (
    <section id={id || "services"} className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between">
          <div className="text-xs uppercase tracking-[0.3em] text-white/60">
            {t("services.section")}
          </div>
        </div>
        <ul className="border-t border-white/10">
          {services.map((s, i) => (
            <ServiceRow key={s.id} {...s} last={i === services.length - 1} />
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Magnetic>
                <button 
                  className="group relative inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-8 py-5 text-lg font-medium text-white transition-all hover:bg-white/10"
                  data-cursor="link"
                >
                  <span>{t("services.more.btn")}</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                    <Maximize2 size={12} strokeWidth={3} />
                  </div>
                </button>
              </Magnetic>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />
              <Dialog.Content 
                className="fixed left-1/2 top-1/2 z-[90] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 border border-white/10 bg-[#070707] p-6 text-white shadow-2xl animate-in zoom-in-95 duration-300 sm:rounded-3xl pointer-events-auto"
              >
                <Dialog.Title className="font-display text-3xl md:text-5xl">{t("services.modal.title")}</Dialog.Title>
                <div 
                  className="mt-8 grid gap-6 max-h-[70vh] overflow-y-auto pr-4 sm:grid-cols-2"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
                >
                  {services.map((s) => (
                    <div key={s.id} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-white/20">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] tracking-widest text-white/30">{s.n}</span>
                        <Link to={s.href} className="text-white/40 hover:text-white transition-colors">→</Link>
                      </div>
                      <h4 className="font-display mt-4 text-xl">{s.t.replace(' →', '')}</h4>
                      <p className="mt-2 text-sm text-[#8F8F8F] leading-relaxed">{s.d}</p>
                      
                      {s.id === "electro" && t("services.electro.list") !== "services.electro.list" && (
                        <div className="mt-4 border-t border-white/5 pt-4">
                          <div className="whitespace-pre-line text-[11px] leading-relaxed text-[#8F8F8F]/80">
                            {t("services.electro.list")}
                          </div>
                        </div>
                      )}
                      {s.id === "heating" && t("services.heating.list") !== "services.heating.list" && (
                        <div className="mt-4 border-t border-white/5 pt-4">
                          <div className="whitespace-pre-line text-[11px] leading-relaxed text-[#8F8F8F]/80">
                            {t("services.heating.list")}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <Dialog.Close asChild>
                    <button className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Закрыть</button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  n,
  t,
  d,
  href,
  last,
}: {
  n: string;
  t: string;
  d: string;
  href: string;
  last: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative overflow-hidden border-white/10 ${last ? "border-b" : "border-b"}`}
      data-cursor="link"
    >
      <Link to={href} className="block">
        <motion.div
          initial={false}
          animate={{ y: hover ? 0 : "100%" }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 bg-white"
        />
        <div className="relative z-10 grid grid-cols-12 items-center gap-x-4 gap-y-2 py-6 sm:gap-6 sm:py-8 md:px-8 md:py-12 lg:px-12">
          <div
            className={`col-span-2 font-mono text-[10px] tracking-widest transition-colors sm:text-xs md:col-span-1 ${hover ? "text-black" : "text-white/50"}`}
          >
            {n}
          </div>
          <motion.h3
            animate={{ x: hover ? 16 : 0, color: hover ? "#070707" : "#ffffff" }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="font-display col-span-10 text-2xl sm:text-3xl md:col-span-6 md:text-5xl lg:text-6xl"
          >
            {t} <span className="text-sm align-middle inline-block ml-2 opacity-50 group-hover:opacity-100 transition-opacity">→</span>
          </motion.h3>
          <motion.p
            animate={{ color: hover ? "rgba(7,7,7,0.75)" : "#8F8F8F" }}
            className="col-span-12 text-xs sm:text-sm md:col-span-5 md:justify-self-end md:text-right md:text-base"
          >
            {d}
          </motion.p>
        </div>
      </Link>
    </li>
  );
}
