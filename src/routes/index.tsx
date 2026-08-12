import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Copy, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Cursor } from "@/components/site/cursor";
import { Nav } from "@/components/site/nav";
import { IntroLoader } from "@/components/site/loader";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Reveal, TextReveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";
import { LeadForm } from "@/components/site/lead-form";
import { CostCalculator } from "@/components/site/calculator";
import { regisseurAssets } from "@/lib/regisseur-assets";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

/* ------------------------------ SITE-WIDE AURORA ------------------------------ */
function SiteAurora() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const palette = [
    "rgba(200,150,90,0.55)",
    "rgba(90,140,210,0.55)",
    "rgba(80,200,170,0.5)",
    "rgba(180,80,180,0.5)",
  ];
  // Distribute ~4 orbs per viewport-height. Assume the site is ~6 viewports tall,
  // so place one orb roughly every ~4% of total page height.
  const xPositions = [-10, 20, 45, 72, 90, 5, 30, 55, 78];
  // Massively reduce orb count and disable animation on mobile to prevent
  // repaint jank from many large blur-3xl layers.
  const count = isMobile ? 5 : 26;
  const orbs = Array.from({ length: count }, (_, i) => ({
    top: `${1 + i * 3.8}%`,
    left: `${xPositions[i % xPositions.length]}%`,
    size: `${28 + ((i * 7) % 12)}vmax`,
    color: palette[i % palette.length],
    delay: `-${(i * 2.7) % 20}s`,
    opacity: 0.65 + ((i * 13) % 20) / 100,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((o, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-2xl ${isMobile ? "" : "aurora blur-3xl"}`}
          style={{
            top: o.top,
            left: o.left,
            width: o.size,
            height: o.size,
            opacity: o.opacity,
            background: `radial-gradient(closest-side, ${o.color}, transparent 70%)`,
            animationDelay: o.delay,
          }}
        />
      ))}
    </div>
  );
}
import { LangProvider, useT } from "@/lib/i18n";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" },
    ],
    links: [
      { rel: "preload", as: "image", href: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", fetchPriority: "high" } as never,
    ],
  }),
  component: Index,
});

type Project = {
  name: string;
  category: string;
  year: string;
  image: string;
  url: string;
  beforeImage?: string;
};

const PROJECTS: Project[] = [
  { 
    name: "Элитная квартира на Тверской", 
    category: "Элитный ремонт", 
    year: "2025", 
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", 
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    url: "/elite/" 
  },
  { name: "ЖК 'Премиум Парк'", category: "Новостройка", year: "2025", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200", url: "/newbuilding/" },
  { 
    name: "Лофт в старом центре", 
    category: "Ремонт вторички", 
    year: "2024", 
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200", 
    beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    url: "/secondary/" 
  },
  { name: "Пентхаус с видом на Сити", category: "Элитный ремонт", year: "2024", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200", url: "/elite/" },
  { name: "Семейная квартира в Хамовниках", category: "Новостройка", year: "2024", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200", url: "/newbuilding/" },
  { name: "Апартаменты в Москва-Сити", category: "Элитный ремонт", year: "2023", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200", url: "/elite/" },
  { 
    name: "Дизайнерский ремонт на Арбате", 
    category: "Вторичное жилье", 
    year: "2025", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", 
    beforeImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200",
    url: "/secondary/" 
  },
  { name: "Квартира-студия в ЖК 'Зиларт'", category: "Новостройка", year: "2024", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200", url: "/newbuilding/" },
  { name: "Реновация квартиры 1985г.", category: "Ремонт вторички", year: "2024", image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1200", url: "/secondary/" },
  { name: "Вилла в Подмосковье", category: "Загородный дом", year: "2025", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200", url: "/elite/" },
];

const UPCOMING_PROJECTS: Project[] = [
  {
    name: "ЖК Режиссер 105 квадратных метров",
    category: "Элитный ремонт",
    year: "В работе",
    image: regisseurAssets[0] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    url: "/elite/"
  }
];

function Index() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const update = () => setFooterHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <LangProvider>
      <IntroLoader />
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Nav />

      {/* Footer permanently pinned to viewport bottom, behind main content on z */}
      <div
        ref={footerRef}
        className="fixed inset-x-0 bottom-0 z-0 bg-[#141414] text-white"
      >
        <Footer />
      </div>

      <main id="top" className="relative z-10 overflow-hidden rounded-b-[40px] bg-[#070707] text-white md:rounded-b-[56px]">
        <SiteAurora />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[5] hidden opacity-60 md:block"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
            mixBlendMode: "overlay",
          }}
        />
        <div className="relative z-10">
          <Hero />
          <Marquee />
          <RepairTypeNav />
          <WorkInProgress />
          <FeaturedWork />
          <About />
          <Services />
          <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10 py-20">
            <CostCalculator />
          </div>
          <Testimonials />
          <Contact />
        </div>
      </main>


      {/* Spacer equal to footer height so page can scroll far enough
          for Contact to lift off and reveal the pinned footer below */}
      <div style={{ height: footerHeight }} aria-hidden />
    </LangProvider>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  const t = useT();
  const ref = useRef<HTMLDivElement | null>(null);
  const [enableParallax, setEnableParallax] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setEnableParallax(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = enableParallax ? yRaw : undefined;
  const opacity = enableParallax ? opacityRaw : undefined;

  return (
    <section ref={ref} className="relative min-h-[92svh] overflow-hidden pt-24 md:pt-32 pb-4 md:pb-6">
      {/* subtle grain */}
      <div className="grain absolute inset-0" aria-hidden />

      {/* Floating showcase — visible on md+ where the hero has empty space to the right */}
      <HeroShowcase />

      <motion.div style={{ y, opacity } as any} className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-10 px-5 sm:gap-14 sm:px-6 md:px-10">

        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
          <Reveal>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white blink" />
          </Reveal>
          <Reveal delay={0.05}>{t("hero.badge")}</Reveal>
        </div>

        <h1 className="font-display max-w-[16ch] break-words text-[clamp(2.75rem,12vw,4.75rem)] leading-[0.9] md:text-[9vw]">
          <TextReveal key={`h1a-${t("hero.h1.a")}`} text={t("hero.h1.a")} as="span" />
          <br />
          <TextReveal key={`h1b-${t("hero.h1.b")}`} text={t("hero.h1.b")} as="span" delay={0.2} />
          <br />
          {t("hero.h1.c") && t("hero.h1.c") !== "hero.h1.c" && <TextReveal key={`h1c-${t("hero.h1.c")}`} text={t("hero.h1.c")} as="span" delay={0.4} className="italic" />}
        </h1>

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <Reveal delay={0.5} className="max-w-xl text-base text-[#8F8F8F] sm:text-lg md:text-xl">
            {t("hero.sub")}
          </Reveal>

          <Reveal delay={0.6} className="flex w-full flex-wrap items-center justify-center gap-3 md:w-auto md:justify-end">
            <Magnetic
              as="a"
              href="#work"
              className="group relative inline-flex w-full max-w-[300px] flex-none items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-medium text-black sm:w-auto sm:min-w-[170px]"
            >
              <span
                data-cursor="link"
                className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100"
              >
                {t("hero.cta.projects")}
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Magnetic>
            <Magnetic
              as="a"
              href="#contact"
              className="group relative inline-flex w-full max-w-[300px] flex-none items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-4 text-sm text-white/90 sm:w-auto sm:min-w-[170px]"
            >
              <span
                data-cursor="link"
                className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100"
              >
                {t("hero.cta.contact")}
              </span>
            </Magnetic>
          </Reveal>


        </div>

        <div className="mt-6 flex items-end justify-between text-xs uppercase tracking-[0.3em] text-white/50">
          <div>{t("hero.scroll")}</div>
          <div className="hidden md:block">{t("hero.cities")}</div>
        </div>
      </motion.div>
    </section>
  );
}


/* Floating showcase in the empty right side of the hero */
function HeroShowcase() {
  const items = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600",
    regisseurAssets[0],
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600"

  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 3800);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[4%] top-[16%] z-[6] hidden h-[30vmin] w-[30vmin] max-h-[420px] max-w-[420px] lg:block"
    >
      {/* rotating ring text */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path
            id="tf-hero-ring"
            d="M 100,100 m -92,0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0"
          />
        </defs>
        <text
          fill="rgba(255,255,255,0.55)"
          style={{ fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase" }}
        >
          <textPath href="#tf-hero-ring">
            Ремонт и отделка · 15 лет опыта · Качество под ключ · Москва и МО ·
          </textPath>
        </text>
      </motion.svg>

      {/* floating portrait card */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-1/2 aspect-[3/4] w-[68%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
      >
        {items.map((src, idx) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            loading="eager"
            initial={false}
            animate={{ opacity: idx === i ? 1 : 0, scale: idx === i ? 1 : 1.08 }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-white/85">
          <span>Featured</span>
          <span className="font-mono tabular-nums">
            {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      {/* orbit dot */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        className="absolute inset-0"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
      </motion.div>
    </div>
  );
}

/* ------------------------------ MARQUEE ------------------------------ */
function Marquee() {
  const t = useT();
  const items = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`marquee.${n}`));
  const doubled = [...items, ...items];
  return (
    <section aria-hidden className="relative z-10 bg-transparent py-4 md:py-6">
      <div className="overflow-hidden bg-transparent py-2">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap px-5 text-3xl leading-[1.3] sm:gap-14 sm:px-6 sm:text-4xl md:gap-24 md:text-6xl">
          {doubled.map((t, i) => (
            <span key={i} className="font-display flex items-center gap-10 text-white/40 sm:gap-14 md:gap-24">
              <span>{t}</span>
              <span className="inline-block h-2 w-2 rounded-full bg-white/20" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ WORK ------------------------------ */
function FeaturedWork() {
  const t = useT();
  return (
    <section id="work" className="relative pt-10 pb-20 sm:pt-14 sm:pb-28 md:pt-20 md:pb-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-8 sm:mb-16 md:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal className="text-xs uppercase tracking-[0.3em] text-white/60">
              {t("work.section")}
            </Reveal>
            <h2 className="font-display mt-4 max-w-[12ch] text-5xl sm:text-6xl md:max-w-none md:text-7xl lg:max-w-[16ch] lg:text-8xl">
              <TextReveal key={`wa-${t("work.h.a")}`} text={t("work.h.a")} />
              <br />
              <TextReveal key={`wb-${t("work.h.b")}`} text={t("work.h.b")} delay={0.15} className="italic" />
            </h2>
          </div>
          <Reveal className="max-w-xs text-[#8F8F8F]">
            {t("work.desc")}
          </Reveal>
        </div>



        {/* Mobile: horizontal swipe carousel */}
        <MobileProjectsCarousel />

        {/* Desktop: stacked rows — only mount on md+ to avoid mobile scroll subscribers */}
        <DesktopProjectsList />
      </div>
    </section>
  );
}

function DesktopProjectsList() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  if (!enabled) return null;
  return (
    <div className="hidden md:flex md:flex-col md:gap-36">
      {PROJECTS.map((p, i) => (
        <ProjectRow key={p.name} project={p} index={i} totalCount={PROJECTS.length} />
      ))}
    </div>
  );
}

/* ------------------------------ REPAIR TYPE NAV ------------------------------ */
function RepairTypeNav() {
  const t = useT();
  const items = [
    { 
      id: "elite", 
      t: t("repairNav.elite"), 
      href: "/elite", 
      img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: "new", 
      t: t("repairNav.new"), 
      href: "/newbuilding", 
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      id: "secondary", 
      t: t("repairNav.secondary"), 
      href: "/secondary", 
      img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800" 
    },
  ];

  return (
    <section className="relative z-10 py-10 md:py-20">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1} y={40}>
              <Link
                to={item.href}
                className="group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl lg:aspect-[4/3]"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.img} 
                    alt={item.t}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
                </div>
                <div className="relative z-10 text-center">
                  <h3 className="font-display px-4 text-2xl text-white transition-transform duration-500 group-hover:scale-110 sm:text-3xl lg:text-4xl">
                    {item.t}
                  </h3>
                  <div className="mt-2 flex items-center justify-center overflow-hidden">
                    <span className="h-px w-0 bg-white transition-all duration-500 group-hover:w-12" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ WORK IN PROGRESS ------------------------------ */
function WorkInProgress() {
  const t = useT();
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);

  return (
    <section id="work-in-progress" className="relative pt-20 pb-0 sm:pt-28 sm:pb-0 md:pt-40 md:pb-0">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-8 sm:mb-16 md:mb-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal className="text-xs uppercase tracking-[0.3em] text-white/60">
              {t("workInProgress.section")}
            </Reveal>
            <h2 className="font-display mt-4 max-w-[12ch] text-5xl sm:text-6xl md:max-w-none md:text-7xl lg:max-w-[16ch] lg:text-8xl">
              <TextReveal key={`wipa-${t("workInProgress.h.a")}`} text={t("workInProgress.h.a")} />
              <br />
              <TextReveal key={`wipb-${t("workInProgress.h.b")}`} text={t("workInProgress.h.b")} delay={0.15} className="italic" />
            </h2>
          </div>
          <Reveal className="max-w-xs text-[#8F8F8F]">
            {t("workInProgress.desc")}
          </Reveal>
        </div>

        <div className="space-y-24">
          {UPCOMING_PROJECTS.map((p, i) => (
            <div key={p.name} className="space-y-8">
              <div className="max-w-3xl">
                <h3 className="font-display text-3xl md:text-5xl mb-4">{p.name}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-6">
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
                  {p.category}
                </div>
                <span className="h-px w-8 bg-white/20" />
                <div className="text-xs uppercase tracking-[0.2em] text-white/30">
                  {p.year}
                </div>
              </div>
              
              <RegisseurCarousel onImageClick={(idx) => setFullscreenIdx(idx)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {fullscreenIdx !== null && (
          <FullscreenGallery 
            images={regisseurAssets} 
            initialIdx={fullscreenIdx} 
            onClose={() => setFullscreenIdx(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function RegisseurCarousel({ onImageClick }: { onImageClick: (idx: number) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth * 0.7 
      : scrollLeft + clientWidth * 0.7;
    
    scrollRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  return (
    <div className="group/carousel relative w-full">
      {/* Desktop Controls */}
      <div className="mb-4 hidden items-center justify-end gap-4 md:flex">
        <button 
          onClick={() => scroll('left')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/10"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-colors hover:bg-white/10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-[2vw] md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {regisseurAssets.map((src, i) => (
          <RegisseurImage key={src} src={src} index={i} onClick={() => onImageClick(i)} />
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          Листайте вправо →
        </div>
      </div>
    </div>
  );
}

function RegisseurImage({ src, index, onClick }: { src: string, index: number, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: index * 0.05 }}
      className="relative aspect-[16/10] w-[85vw] md:w-[60vw] shrink-0 cursor-pointer overflow-hidden rounded-xl snap-center"
      onClick={onClick}
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[110%] w-full">
        <motion.img
          src={src}
          alt={`Объект Режиссёр фото ${index + 1}`}
          loading="lazy"
          style={{ scale }}
          className="h-full w-full object-cover transition-transform duration-700 hover:brightness-110"
        />
      </motion.div>
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
          <Maximize2 className="text-white" size={20} />
        </div>
      </div>
    </motion.div>
  );
}

export function FullscreenGallery({ images, initialIdx, onClose }: { images: string[], initialIdx: number, onClose: () => void }) {
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


function MobileProjectsCarousel() {
  const [active, setActive] = useState(0);
  const [dragDx, setDragDx] = useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);
  const axisLocked = useRef<"x" | "y" | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const commit = (nextIdx: number) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, nextIdx));
    setActive(clamped);
    setDragDx(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    axisLocked.current = null;
    startX.current = e.touches[0]?.clientX ?? 0;
    startY.current = e.touches[0]?.clientY ?? 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    const dx = (e.touches[0]?.clientX ?? 0) - startX.current;
    const dy = (e.touches[0]?.clientY ?? 0) - startY.current;
    if (!axisLocked.current) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        axisLocked.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
    }
    if (axisLocked.current === "x") {
      // rubber band, cap drag to 60% of slide width
      const el = trackRef.current;
      const max = el ? el.clientWidth * 0.6 : 300;
      const clamped = Math.max(-max, Math.min(max, dx));
      setDragDx(clamped);
    }
  };
  const onTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (axisLocked.current !== "x") {
      setDragDx(0);
      return;
    }
    const el = trackRef.current;
    const width = el ? el.clientWidth : 300;
    const threshold = Math.min(60, width * 0.12);
    if (dragDx <= -threshold) commit(active + 1);
    else if (dragDx >= threshold) commit(active - 1);
    else setDragDx(0);
  };

  // Slide is 85% of container width; gap-4 = 16px
  const slidePercent = 85;
  const gapPx = 16;
  // Center the active slide: base offset = 7.5% (half of 15% empty)
  const baseOffset = (100 - slidePercent) / 2;
  const translateStyle = {
    transform: `translate3d(calc(${baseOffset}% - ${active * slidePercent}% - ${active * gapPx}px + ${dragDx}px), 0, 0)`,
    transition: dragging.current ? "none" : "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)",
  } as const;

  return (
    <div className="md:hidden">
      <div
        ref={trackRef}
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        <div className="flex" style={translateStyle}>
          {PROJECTS.map((p, i) => (
            <Link
              key={p.name}
              to={p.url}
              className="group relative block shrink-0 overflow-hidden rounded-lg"
              style={{ width: `${slidePercent}%`, marginRight: i < PROJECTS.length - 1 ? gapPx : 0 }}
              onClick={(e) => {
                if (Math.abs(dragDx) > 4) e.preventDefault();
              }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                      {p.category}
                    </div>
                    <div className="font-display mt-1 truncate text-xl">{p.name}</div>
                  </div>
                  <div className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/70">
                    {p.year}
                  </div>
                </div>
              </div>
              <div className="absolute left-3 top-3 rounded-full bg-white/10 px-2 py-1 text-[10px] font-mono tracking-widest text-white/80">
                {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {PROJECTS.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/25"}`}

          />
        ))}
      </div>
      <div className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/40">
        {active + 1} / {PROJECTS.length} — swipe →
      </div>
    </div>
  );
}

function ProjectRow({ project, index, totalCount }: { project: Project; index: number; totalCount: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);
  const [hover, setHover] = useState(false);
  const alignRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-12 items-center gap-6 ${alignRight ? "md:[direction:rtl]" : ""}`}
    >
      <motion.div
        className="col-span-12 md:col-span-9 md:[direction:ltr]"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        <Magnetic strength={12} className="group relative block overflow-hidden rounded-lg">
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            data-cursor="view"
            data-cursor-label="STF"
            className="relative block aspect-[16/10] w-full overflow-hidden"
          >
            <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
              <motion.img
                src={project.image}
                alt={project.name}
                width={1600}
                height={1000}
                loading="lazy"
                style={{ scale }}
                className="h-[115%] w-full object-cover"
              />
              {project.beforeImage && hover && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={project.beforeImage}
                  alt={`До: ${project.name}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </motion.div>
            <motion.div
              initial={false}
              animate={{ opacity: hover ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />
            <motion.div
              initial={false}
              animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 12 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-10"
            >
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                  {project.category}
                </div>
                <div className="font-display mt-2 text-2xl sm:text-3xl md:text-5xl">{project.name}</div>
              </div>
              <div className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                {project.year}
              </div>
            </motion.div>
          </div>
        </Magnetic>
      </motion.div>

      <Reveal
        y={16}
        className="col-span-12 flex flex-col gap-2 md:col-span-3 md:[direction:ltr]"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">
          {String(index + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
        </div>
        <div className="font-display text-2xl">{project.name}</div>
        <div className="text-sm text-[#8F8F8F]">{project.category}</div>
      </Reveal>
    </div>
  );
}

/* ------------------------------ ABOUT ------------------------------ */
export function About() {
  const t = useT();
  const stats = [
    { k: "15+", v: t("about.stat.1") },
    { k: "250+", v: t("about.stat.2") },
    { k: "500+", v: t("about.stat.3") },
    { k: "3", v: t("about.stat.4") },
  ];
  return (
    <section id="about" className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 text-xs uppercase tracking-[0.3em] text-white/60 md:col-span-3">
            {t("about.section")}
          </Reveal>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl">
              <TextReveal key={`aa-${t("about.h.a")}`} text={t("about.h.a")} />
              <br />
              <TextReveal key={`ab-${t("about.h.b")}`} text={t("about.h.b")} delay={0.1} className="text-[#8F8F8F]" />
              <br />
              <TextReveal key={`ac-${t("about.h.c")}`} text={t("about.h.c")} delay={0.25} className="italic" />
            </h2>
            <div className="mt-14 grid gap-14 md:grid-cols-2">
              <Reveal className="text-lg text-[#8F8F8F]">
                {t("about.p1")}
              </Reveal>
              <Reveal delay={0.1} className="text-lg text-[#8F8F8F]">
                {t("about.p2")}
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 justify-items-center gap-y-10 border-t border-white/10 pt-14 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08} className="flex flex-col items-center">
              <Stat value={s.k} />
              <span className="mt-3 max-w-[16ch] text-center text-sm text-[#8F8F8F]">{s.v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1] ?? "0", 10) : 0;
  const suffix = match ? (match[2] ?? "") : value;
  const ref = useRef<HTMLSpanElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    const num = numRef.current;
    if (!el || !num) return;
    num.textContent = "0";
    let started = false;
    let raf = 0;
    const start = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const duration = 3000;
      let last = -1;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = Math.round(eased * target);
        if (v !== last) {
          num.textContent = String(v);
          last = v;
        }
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [match, target]);

  if (!match) {
    return <span className="font-display text-5xl sm:text-6xl md:text-8xl">{value}</span>;
  }
  return (
    <span ref={ref} className="font-display text-5xl sm:text-6xl md:text-8xl tabular-nums">
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  );
}

/* ------------------------------ SERVICES ------------------------------ */
export function Services() {
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
    <section id="services" className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-16 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 text-xs uppercase tracking-[0.3em] text-white/60 md:col-span-3">
            {t("services.section")}
          </Reveal>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display max-w-[18ch] text-4xl sm:text-5xl md:text-7xl">
              <TextReveal key={`sa-${t("services.h.a")}`} text={t("services.h.a")} />
              <br />
              <TextReveal
                key={`sb-${t("services.h.b")}`}
                text={t("services.h.b")}
                delay={0.15}
                className="italic"
              />
            </h2>
          </div>
        </div>
        <ul className="border-t border-white/10">
          {services.map((s, i) => (
            <ServiceRow key={s.id} {...s} last={i === services.length - 1} />
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent 
              className="max-w-4xl border-white/10 bg-[#070707] text-white sm:rounded-3xl mt-10 md:mt-20 pointer-events-auto"
              onPointerDownOutside={(e) => {
                // If the target is the overlay, we close. Radix manages this via Dialog.
              }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-3xl md:text-5xl">{t("services.modal.title")}</DialogTitle>
              </DialogHeader>
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
                    
                    {/* Detailed sub-services list if available */}
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
                <DialogClose asChild>
                  <button className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">Закрыть</button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
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


/* ------------------------------ TESTIMONIALS ------------------------------ */
export function Testimonials() {
  const t = useT();
  const QUOTES = [
    { q: t("test.1.q"), a: "Алексей И.", r: "Элитный ремонт в Хамовниках" },
    { q: t("test.2.q"), a: "Марина С.", r: "Ремонт в новостройке ЖК 'Зиларт'" },
    { q: t("test.3.q"), a: "Сергей П.", r: "Капитальный ремонт вторички" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, [QUOTES.length]);
  const cur = QUOTES[i] || QUOTES[0];
  return (
    <section className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="mb-16 flex items-end justify-between">
          <Reveal className="text-xs uppercase tracking-[0.3em] text-white/60">
            {t("test.section")}
          </Reveal>
          <div className="flex gap-2">
            {QUOTES.map((_, idx) => (
              <div
                key={idx}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-[2px] w-8 transition-colors ${idx === i ? "bg-white" : "bg-white/25"}`}
              />
            ))}
          </div>
        </div>
        <div className="relative">
          {/* Sizer: reserves height of the tallest testimonial so the block never jumps */}
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
          {/* Active quote overlays the sizer */}
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

/* ------------------------------ CONTACT ------------------------------ */
const MAIL_BODY = [
    "Здравствуйте, Ремонт Решения",
    "",
    "I'm interested in working with you on a new project.",
    "",
    "Here are the project details:",
    "",
    "• Company / Brand: ",
    "• Industry: ",
    "• Project Type: ",
    "• Project Overview: ",
    "• Project Goals: ",
    "• Website Inspiration: ",
    "• Estimated Timeline: ",
    "• Estimated Budget: ",
    "• Additional Information: ",
    "",
    "My contact details:",
    "",
    "• Name: ",
    "• Email: ",
    "• Country: ",
    "",
    "Looking forward to hearing from you.",
    "Best regards,",
].join("\r\n");


const PHONE_NUMBER = "+79167991216";
const WHATSAPP_MESSAGE = "Здравствуйте, хотели бы узнать по поводу ремонта";
const whatsappHref = `https://wa.me/${PHONE_NUMBER.replace(/\+/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function HoverUnderlineAction({
  label,
  activeLabel,
  onActivate,
  icon,
}: {
  label: string;
  activeLabel: string;
  onActivate: () => void;
  icon?: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const handle = () => {
    onActivate();
    setActive(true);
    setTimeout(() => setActive(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handle}
      data-cursor="link"
      className="group relative inline-flex items-center gap-3 whitespace-nowrap font-light tracking-tight text-white text-[clamp(1.25rem,5.5vw,3rem)]"
    >
      {icon ? <span className="flex shrink-0 items-center">{icon}</span> : null}
      <span className="relative inline-block">
        {/* Sizer locks width to the longest label so "Copied!" doesn't re-center */}
        <span aria-hidden className="invisible">{label}</span>
        <span className="absolute inset-0 flex items-center justify-center gap-2">
          {active ? (
            <>
              <span>{activeLabel}</span>
              <Check size={22} strokeWidth={2.5} />
            </>
          ) : (
            <span>{label}</span>
          )}
        </span>
        {!active && (
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-1 left-0 hidden h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100 lg:block"
          />
        )}
      </span>
    </button>
  );
}

function EmailAction({ email, href }: { email: string; href: string }) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative flex flex-col items-center gap-2 rounded-2xl px-2 py-4 sm:px-4">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
        {t("contact.email.label")}
      </span>
      <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy email"}
          data-cursor="link"
          className="shrink-0 text-white transition-opacity hover:opacity-80 text-[clamp(1.25rem,5.5vw,3rem)]"
        >
          {copied ? (
            <Check className="h-[1em] w-[1em]" strokeWidth={2} />
          ) : (
            <Copy className="h-[1em] w-[1em]" strokeWidth={1.75} />
          )}
        </button>
        <a
          href={href}
          data-cursor="link"
          className="group relative min-w-0 flex-shrink font-light tracking-tight text-white text-[clamp(1rem,4.6vw,2rem)]"
        >
          <span className="relative inline-block whitespace-nowrap">
            <span aria-hidden className="invisible">{email}</span>
            <span className="absolute inset-0 flex items-center justify-center">
              {copied ? t("contact.copied") : email}
            </span>
            {!copied && (
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-1 left-0 hidden h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100 lg:block"
              />
            )}
          </span>
        </a>
      </div>
    </div>
  );
}

export function Contact() {
  const t = useT();
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 py-20 sm:py-28 md:py-44">
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <Reveal className="text-xs uppercase tracking-[0.3em] text-white/60">
          {t("contact.section")}
        </Reveal>
        <h2 className="font-display mx-auto mt-6 max-w-[18ch] break-words text-center text-[clamp(2.75rem,13vw,5rem)] leading-[0.95] md:text-[10vw]">
          <TextReveal key={`ca-${t("contact.h.a")}`} text={t("contact.h.a")} />
          <br />
          <TextReveal key={`cb-${t("contact.h.b")}`} text={t("contact.h.b")} delay={0.15} />
          {" "}
          <TextReveal key={`cc-${t("contact.h.c")}`} text={t("contact.h.c")} delay={0.3} className="italic" />
        </h2>
        <div className="mt-14 flex flex-col items-center gap-12 text-center max-w-4xl mx-auto">
          <Reveal delay={0.5} className="w-full">
            <div className="mx-auto flex w-full flex-col items-stretch gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10">
              <div className="relative flex flex-col items-center gap-2 rounded-2xl px-4 py-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {t("contact.whatsapp.label")}
                </span>
                <Reveal delay={0.1}>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                    className="group inline-flex items-center gap-4 text-3xl font-medium text-white transition-colors hover:text-white/70 sm:text-4xl md:text-5xl lg:text-6xl"
                  >
                    <span data-cursor="link">{PHONE_NUMBER}</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </a>
                </Reveal>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.55} className="text-sm font-medium uppercase tracking-[0.2em] text-white/30">
            ИЛИ
          </Reveal>

          <Reveal delay={0.6} className="w-full">
            <div className="mx-auto flex w-full flex-col items-stretch gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10 text-left">
              <h3 className="text-xl font-bold mb-4 text-center">Оставить заявку</h3>
              <LeadForm />
            </div>
          </Reveal>

          <Reveal delay={0.7} className="max-w-md text-base text-[#8F8F8F] sm:text-lg">
            {t("contact.desc")}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FOOTER (P1 echelon style) ------------------------------ */
export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  const handle = "РЕМОНТ РЕШЕНИЯ";
  return (
    <footer className="bg-[#141414] text-white">
      {/* Main footer grid */}
      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-6 md:px-10 md:py-16">
        <div className="grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:gap-12 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {t("footer.gallery")}
            </p>
            <div className="space-y-1 text-sm">
              <a href="#work" className="block text-white transition-colors hover:text-white/60">
                {t("nav.work")}
              </a>
              <a href="#about" className="block text-white transition-colors hover:text-white/60">
                {t("nav.about")}
              </a>
              <a href="#services" className="block text-white transition-colors hover:text-white/60">
                {t("nav.services")}
              </a>
              <a href="#blog" className="block text-white transition-colors hover:text-white/60">
                {t("nav.blog")}
              </a>
              <a href="#contact" className="block text-white transition-colors hover:text-white/60">
                {t("nav.contact")}
              </a>
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {t("footer.contact")}
            </p>
            <div className="min-w-0 space-y-1 text-sm text-white">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="block transition-colors hover:text-white/60"
              >
                Тел: {PHONE_NUMBER}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-white/60"
              >
                WhatsApp: {PHONE_NUMBER}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {t("footer.studioLead")}
            </p>
            <div className="space-y-1 text-sm text-white">
              <p>ИП Ларионов Михаил Валентинович</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {t("footer.legal")}
            </p>
            <div className="space-y-1 text-sm text-white/60">
              <p>© {year} Ремонт Решения — {t("footer.rights")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Large scrolling handle */}
      <div className="overflow-hidden py-6 md:py-8">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              aria-hidden={i >= 4 ? true : undefined}
              className="font-display mx-12 text-6xl font-bold text-white md:text-8xl lg:text-[10rem]"
            >
              {handle}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
