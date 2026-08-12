import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { Magnetic } from "./magnetic";
import { useLang, useT } from "@/lib/i18n";

const LANGS = ["ru"] as const;
const LANG_SHORT: Record<(typeof LANGS)[number], string> = {
  ru: "RU",
};
const LANG_FULL: Record<(typeof LANGS)[number], string> = {
  ru: "Русский",
};

const LINKS = [
  { key: "nav.work", href: "#work" },
  { key: "nav.about", href: "#about" },
  { key: "nav.services", href: "#services" },
  { key: "nav.process", href: "#process-photos" },
  { key: "nav.contact", href: "#contact" },
];

export function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [cta, setCta] = useState<"idle" | "in" | "out">("idle");
  const ctaAnim =
    cta === "in"
      ? "animate-[tf-slide-in-x_0.35s_ease-out_forwards]"
      : cta === "out"
      ? "animate-[tf-slide-out-x_0.35s_ease-out_forwards]"
      : "-translate-x-full";
  const { lang, setLang } = useLang();
  const t = useT();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(7,7,7,0)", "rgba(7,7,7,0.55)"]);
  const border = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, borderBottomColor: border }}
        className="fixed inset-x-0 top-0 z-[80] border-b backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:h-20 lg:px-10">
          <Magnetic as="a" href={location.pathname === "/" ? "#top" : "/#top"} className="inline-flex items-center gap-2" strength={16}>
            <span className="grid h-7 w-7 place-items-center rounded-sm border border-white/30 text-[8px] font-medium tracking-tighter text-white">
              РР
            </span>
            <span className="text-sm font-medium tracking-wide text-white">Ремонт Решения</span>
          </Magnetic>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => {
              const href = (location.pathname !== "/" && l.href === "#about") ? "/#about" : l.href;
              
              return (
                <Magnetic
                  key={l.href}
                  as="a"
                  href={href}
                  strength={14}
                  className="group relative px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span data-cursor="link">{t(l.key)}</span>
                </Magnetic>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {/* Language switcher removed per requirements */}
            <Magnetic
              as="a"
              href={location.pathname === "/" ? "#contact" : "/#contact"}
              strength={18}
              onMouseEnter={() => setCta("in")}
              onMouseLeave={() => setCta((s) => (s === "in" ? "out" : s))}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-sm text-white"
            >
              <span aria-hidden className={`absolute inset-0 bg-white ${ctaAnim}`} />
              <span data-cursor="link" className={`relative z-10 transition-colors duration-300 ${cta === "in" ? "text-black" : "text-white"}`}>
                {t("nav.cta")}
              </span>
              <span aria-hidden className={`relative z-10 inline-block transition-all duration-300 ${cta === "in" ? "text-black translate-x-1" : "text-white"}`}>→</span>
            </Magnetic>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile language switcher removed */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className={`block h-px w-4 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`block h-px w-4 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-x-0 top-16 z-[75] border-b border-white/10 bg-[#070707]/95 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((l) => {
                const href = l.href;
                return (
                  <li key={l.href}>
                    <a
                      onClick={() => setOpen(false)}
                      href={href}
                      className="font-display block py-3 text-4xl text-white"
                    >
                      {t(l.key)}
                    </a>
                  </li>
                );
              })}
              {/* Language switcher removed */}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MobileLangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 h-10 text-white/80 transition-colors hover:text-white"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe size={16} />
        <span className="text-[11px] tracking-widest uppercase">
          {LANG_SHORT[lang]}
        </span>
      </button>
      <div
        className={`absolute right-0 top-full z-[85] mt-2 min-w-[10rem] origin-top-right overflow-hidden rounded-lg border border-white/10 bg-[#070707]/95 shadow-lg backdrop-blur-md transition-all duration-200 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => {
              setLang(l);
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between px-4 py-2.5 text-[11px] uppercase tracking-widest transition-colors ${
              l === lang
                ? "bg-white/5 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span>{LANG_FULL[l]}</span>
            <span className="text-white/40">{LANG_SHORT[l]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}