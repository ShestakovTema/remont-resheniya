import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Globe, ChevronDown } from "lucide-react";
import { Magnetic } from "./magnetic";
import { useLang, useT } from "@/lib/i18n";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const LANGS = ["ru"] as const;
const LANG_SHORT: Record<(typeof LANGS)[number], string> = {
  ru: "RU",
};
const LANG_FULL: Record<(typeof LANGS)[number], string> = {
  ru: "Русский",
};

const LINKS = [
  { key: "nav.work", href: "work" },
  { key: "nav.about", href: "about" },
  { key: "nav.services", href: "services" },
  { key: "nav.process", href: "process-photos" },
  { key: "nav.contact", href: "contact" },
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
  const bg = useTransform(scrollY, [0, 120], ["rgba(7,7,7,0)", "rgba(10,10,10,0.8)"]);
  const border = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, borderBottomColor: border }}
        className="fixed inset-x-0 top-0 z-[80] border-b backdrop-blur-lg"
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:h-20 lg:px-10">
          <Magnetic 
            as="a" 
            href={location.pathname === "/" ? "#top" : "/"} 
            onClick={(e: React.MouseEvent) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-2" 
            strength={16}
          >
            <span className="grid h-7 w-7 place-items-center rounded-sm border border-white/30 text-[8px] font-medium tracking-tighter text-white">
              РР
            </span>
            <span className="text-sm font-medium tracking-wide text-white">Ремонт Решения</span>
          </Magnetic>

          <nav className="hidden items-center gap-1 lg:flex">
            {/* Repair Types Dropdown */}
            <DropdownMenu.Root open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenu.Trigger asChild>
                <div className="px-4">
                  <Magnetic
                    as="button"
                    strength={14}
                    className="group relative flex items-center gap-1 py-2 text-sm text-white/70 transition-colors hover:text-white outline-none"
                  >
                    <span data-cursor="link">{t("nav.repairTypes")}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </Magnetic>
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="z-[90] min-w-[200px] rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 shadow-2xl"
                  sideOffset={8}
                  align="start"
                >
                  <DropdownMenu.Item asChild>
                    <a
                      href="/elite"
                      className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm text-white/60 outline-none transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {t("nav.repairTypes.elite")}
                    </a>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <a
                      href="/newbuilding"
                      className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm text-white/60 outline-none transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {t("nav.repairTypes.new")}
                    </a>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <a
                      href="/secondary"
                      className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm text-white/60 outline-none transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {t("nav.repairTypes.secondary")}
                    </a>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {LINKS.map((l) => {
              const href = location.pathname === "/" ? `#${l.href}` : `${location.pathname}#${l.href}`;
              const handleClick = (e: React.MouseEvent) => {
                e.preventDefault();
                const id = l.href;
                const element = document.getElementById(id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else if (location.pathname !== "/") {
                  // Fallback for subpages if IDs differ, though we should align them
                  window.location.hash = l.href;
                }
              };

              return (
                <Magnetic
                  key={l.href}
                  as="a"
                  href={href}
                  onClick={handleClick}
                  strength={14}
                  className="group relative px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span data-cursor="link">{t(l.key)}</span>
                </Magnetic>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Magnetic
              as="a"
              href={location.pathname === "/" ? "#contact" : `${location.pathname}#contact`}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
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
            className="fixed inset-x-0 top-16 z-[75] border-b border-white/10 bg-[#070707]/95 backdrop-blur-md lg:hidden max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              <li>
                <div className="font-display block py-3 text-4xl text-white/40 uppercase text-xs tracking-[0.2em] mb-2">
                  {t("nav.repairTypes")}
                </div>
                <div className="flex flex-col gap-2 pl-4 mb-4">
                  <a href="/elite" onClick={() => setOpen(false)} className="text-2xl text-white/70 hover:text-white">
                    {t("nav.repairTypes.elite")}
                  </a>
                  <a href="/newbuilding" onClick={() => setOpen(false)} className="text-2xl text-white/70 hover:text-white">
                    {t("nav.repairTypes.new")}
                  </a>
                  <a href="/secondary" onClick={() => setOpen(false)} className="text-2xl text-white/70 hover:text-white">
                    {t("nav.repairTypes.secondary")}
                  </a>
                </div>
              </li>
              {LINKS.map((l) => {
                const href = location.pathname === "/" ? `#${l.href}` : `${location.pathname}#${l.href}`;
                return (
                  <li key={l.href}>
                    <a
                      href={href}
                      onClick={(e) => {
                        setOpen(false);
                        e.preventDefault();
                        const element = document.getElementById(l.href);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        } else if (location.pathname !== "/") {
                          window.location.hash = l.href;
                        }
                      }}
                      className="font-display block py-3 text-4xl text-white"
                    >
                      {t(l.key)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
