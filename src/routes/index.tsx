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
  processPhotos,
  eliteCaseStudies, 
  newBuildingCaseStudies, 
  secondaryCaseStudies 
} from "@/lib/case-studies";
import arbatAsset from "@/assets/arbat-new.jpg.asset.json";
import villaAsset from "@/assets/villa-podmoskovye-new.jpg.asset.json";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { FullscreenGallery } from "@/components/site/fullscreen-gallery";
import { Footer } from "@/components/site/footer";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { ProcessPhotos } from "@/components/site/process-photos";
import { PHONE_NUMBER, WHATSAPP_HREF, SITE_HANDLE } from "@/lib/constants";



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
    name: "Современная квартира на Тверской", 
    category: "Электрика и сантехника", 
    year: "2025", 
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", 
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    url: "/elite/" 
  },
  { name: "ЖК 'Премиум Парк'", category: "Сделана перепланировка", year: "2025", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200", url: "/newbuilding/" },
  { 
    name: "Лофт в старом центре", 
    category: "Сантехника и демонтаж", 
    year: "2024", 
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200", 
    beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    url: "/secondary/" 
  },
  { name: "Пентхаус с видом на Сити", category: "Полная электрика", year: "2024", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200", url: "/elite/" },
  { name: "Семейная квартира в Хамовниках", category: "Перепланировка и инженерия", year: "2024", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200", url: "/newbuilding/" },
  { name: "Апартаменты в Хамовниках", category: "Электрика и перепланировка", year: "2023", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200", url: "/elite/" },
  { 
    name: "Современный ремонт на Арбате", 
    category: "Замена коммуникаций", 
    year: "2025", 
    image: arbatAsset.url, 
    beforeImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
    url: "/elite/" 
  },
  { name: "Квартира-студия в ЖК 'Зиларт'", category: "Монтаж инженерии", year: "2024", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200", url: "/newbuilding/" },
  { name: "Реновация квартиры 1985г.", category: "Сделана перепланировка", year: "2024", image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=1200", url: "/secondary/" },
  { name: "Вилла в Подмосковье", category: "Инженерные системы", year: "2025", image: villaAsset.url, url: "/elite/" },
];

const UPCOMING_PROJECTS: Project[] = [
  {
    name: "ЖК «Режиссёр», 105 м²",
    category: "Современный ремонт",
    year: "В работе",
    image: regisseurAssets[0] || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    url: "/elite/"
  }
];

// ProcessPhotos moved to src/components/site/process-photos.tsx


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
          <div id="about" className="pt-24">
            <About />
          </div>
          <div id="services">
            <Services />
          </div>
          <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10 py-12">
            <CostCalculator />
          </div>
          <ProcessPhotos />
          <Testimonials id="testimonials" />
          <Contact id="contact" />
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
    <section className="relative z-10 pt-10 pb-5 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1} y={40}>
              <Link
                to={item.href}
                className="group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl lg:aspect-[4/3] lg:min-h-[400px]"
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
    <section id="work-in-progress" className="relative pt-10 pb-0 sm:pt-14 sm:pb-0 md:pt-20 md:pb-0">
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

// FullscreenGallery moved to src/components/site/fullscreen-gallery.tsx



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
// Components moved to src/components/site/

