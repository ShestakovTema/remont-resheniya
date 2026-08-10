import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Cursor } from "@/components/site/cursor";
import { Nav } from "@/components/site/nav";
import { IntroLoader } from "@/components/site/loader";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Reveal, TextReveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";

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

import kaplankaya from "@/assets/project-kaplankaya.jpg";
import dmaris from "@/assets/project-dmaris.jpg";
import zuma from "@/assets/project-zuma.jpg";
import aman from "@/assets/project-aman.jpg";
import macakizi from "@/assets/project-macakizi.jpg";
import nusret from "@/assets/project-nusret.jpg";
import rixos from "@/assets/project-rixos.jpg";
import mandarin from "@/assets/project-mandarin.jpg";
import goldcoast from "@/assets/project-goldcoast.jpg";
import auberge from "@/assets/project-auberge.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: kaplankaya },
      { name: "twitter:image", content: kaplankaya },
    ],
    links: [
      { rel: "preload", as: "image", href: kaplankaya, fetchPriority: "high" } as never,
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
};

const PROJECTS: Project[] = [
  { name: "Six Senses Kaplankaya", category: "Resort · Turkey", year: "2025", image: kaplankaya, url: "https://www.sixsenses.com/en/hotels-resorts/europe/turkey/kaplankaya/" },
  { name: "D Maris Bay", category: "Resort · Marmaris", year: "2025", image: dmaris, url: "https://www.dmarisbay.com/" },
  { name: "Rixos", category: "Hospitality Group", year: "2024", image: rixos, url: "https://www.rixos.com/" },
  { name: "Mandarin Oriental Bodrum", category: "Resort · Bodrum", year: "2024", image: mandarin, url: "https://www.mandarinoriental.com/ru/bodrum/paradise-bay" },
  { name: "Gold Coast Hotel", category: "Hotel · Hong Kong", year: "2024", image: goldcoast, url: "https://web.sino-hotels.com/en/hk/gold-coast-hotel" },
  { name: "Auberge Discovery Bay", category: "Boutique Hotel", year: "2023", image: auberge, url: "https://www.aubergediscoverybay.com/en-us" },
  { name: "Zuma", category: "Restaurant · Global", year: "2025", image: zuma, url: "https://www.zumarestaurant.com/en" },
  { name: "Nusr-Et", category: "Steakhouse · Global", year: "2024", image: nusret, url: "https://www.nusr-et.com.tr/en" },
  { name: "Maçakızı", category: "Beach Hotel · Bodrum", year: "2024", image: macakizi, url: "https://www.macakizi.com/" },
  { name: "Aman", category: "Luxury Resorts", year: "2025", image: aman, url: "https://www.aman.com/" },
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
          <FeaturedWork />
          <About />
          <Services />
          <Process />
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
          <TextReveal key={`h1c-${t("hero.h1.c")}`} text={t("hero.h1.c")} as="span" delay={0.4} className="italic" />
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
  const items = [kaplankaya, dmaris, aman, mandarin];
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
            Two Frame Studio · Est. 2018 · Luxury Digital Experiences · Worldwide ·
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
    <section id="work" className="relative py-20 sm:py-28 md:py-40">
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
        <ProjectRow key={p.name} project={p} index={i} />
      ))}
    </div>
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
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
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
            </a>
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

function ProjectRow({ project, index }: { project: Project; index: number }) {
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
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
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
          </a>
        </Magnetic>
      </motion.div>

      <Reveal
        y={16}
        className="col-span-12 flex flex-col gap-2 md:col-span-3 md:[direction:ltr]"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">
          {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </div>
        <div className="font-display text-2xl">{project.name}</div>
        <div className="text-sm text-[#8F8F8F]">{project.category}</div>
      </Reveal>
    </div>
  );
}

/* ------------------------------ ABOUT ------------------------------ */
function About() {
  const t = useT();
  const stats = [
    { k: "8+", v: t("about.stat.1") },
    { k: "100+", v: t("about.stat.2") },
    { k: "16+", v: t("about.stat.3") },
    { k: "9+", v: t("about.stat.4") },
  ];
  return (
    <section id="studio" className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
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
function Services() {
  const t = useT();
  const SERVICES = [1, 2, 3, 4, 5, 6].map((i) => ({
    n: String(i).padStart(2, "0"),
    t: t(`services.${i}.t`),
    d: t(`services.${i}.d`),
  }));
  return (
    <section id="services" className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-16 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 text-xs uppercase tracking-[0.3em] text-white/60 md:col-span-3">
            {t("services.section")}
          </Reveal>
          <h2 className="font-display col-span-12 max-w-[18ch] text-4xl sm:text-5xl md:col-span-9 md:text-7xl">
            <TextReveal key={`sa-${t("services.h.a")}`} text={t("services.h.a")} />
            <br />
            <TextReveal key={`sb-${t("services.h.b")}`} text={t("services.h.b")} delay={0.15} className="italic" />
          </h2>
        </div>
        <ul className="border-t border-white/10">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.n} {...s} last={i === SERVICES.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceRow({ n, t, d, last }: { n: string; t: string; d: string; last: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative overflow-hidden border-white/10 ${last ? "border-b" : "border-b"}`}
      data-cursor="link"
    >
      <motion.div
        initial={false}
        animate={{ y: hover ? 0 : "100%" }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 bg-white"
      />
      <div className="relative z-10 grid grid-cols-12 items-center gap-x-4 gap-y-2 py-6 sm:gap-6 sm:py-8 md:px-8 md:py-12 lg:px-12">
        <div className={`col-span-2 font-mono text-[10px] tracking-widest transition-colors sm:text-xs md:col-span-1 ${hover ? "text-black" : "text-white/50"}`}>{n}</div>
        <motion.h3
          animate={{ x: hover ? 16 : 0, color: hover ? "#070707" : "#ffffff" }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="font-display col-span-10 text-2xl sm:text-3xl md:col-span-6 md:text-5xl lg:text-6xl"
        >
          {t}
        </motion.h3>
        <motion.p
          animate={{ color: hover ? "rgba(7,7,7,0.75)" : "#8F8F8F" }}
          className="col-span-12 text-xs sm:text-sm md:col-span-5 md:justify-self-end md:text-right md:text-base"
        >
          {d}
        </motion.p>
      </div>
    </li>
  );
}

/* ------------------------------ PROCESS ------------------------------ */
function Process() {
  const t = useT();
  const STEPS = [1, 2, 3, 4, 5].map((i) => ({
    n: String(i).padStart(2, "0"),
    t: t(`process.${i}.t`),
    d: t(`process.${i}.d`),
  }));
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  return (
    <section id="process" ref={ref} className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-16 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 text-xs uppercase tracking-[0.3em] text-white/60 md:col-span-3">
            {t("process.section")}
          </Reveal>
          <h2 className="font-display col-span-12 max-w-[18ch] text-4xl sm:text-5xl md:col-span-9 md:text-7xl">
            <TextReveal key={`ph-${t("process.h")}`} text={t("process.h")} />
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-16 md:grid-cols-5 md:gap-6">
          <div className="absolute left-[10%] right-[10%] top-[31px] hidden h-px bg-white/10 md:block">
            <motion.div
              style={{ width: line }}
              className="h-px bg-white"
            />
          </div>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="relative">
              <div className="mb-4 flex items-center gap-3 md:block">
                <span className="inline-block h-3 w-3 -translate-y-1 rounded-full bg-white md:absolute md:left-1/2 md:top-[26px] md:h-3 md:w-3 md:-translate-x-1/2 md:translate-y-0" />
                <span className="font-mono text-xs tracking-widest text-white/60 md:mt-8 md:block">{s.n}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl">{s.t}</h3>
              <p className="mt-3 max-w-xs text-sm text-[#8F8F8F]">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS ------------------------------ */
function Testimonials() {
  const t = useT();
  const QUOTES = [
    { q: t("test.1.q"), a: "Selin K.", r: t("test.1.r") },
    { q: t("test.2.q"), a: "Marco V.", r: t("test.2.r") },
    { q: t("test.3.q"), a: "Alessandra R.", r: t("test.3.r") },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, [QUOTES.length]);
  const cur = QUOTES[i];
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
    "Hello, Two Frame Studio",
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


const EMAIL_ADDRESS = "twoframestudio@outlook.com";
const MAIL_SUBJECT = "New Project Inquiry — Two Frame Studio";
const mailHref = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
  MAIL_SUBJECT,
)}&body=${encodeURIComponent(MAIL_BODY)}`;
const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL_ADDRESS,
)}&su=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;
const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
  EMAIL_ADDRESS,
)}&subject=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

const WHATSAPP_NUMBER = "971555709324";
const WHATSAPP_MESSAGE = [
  "Hello Two Frame Studio 👋",
  "",
  "I'm interested in working with you on a new project.",
  "",
  "Here are the project details:",
  "",
  "• Company / Brand:",
  "• Industry:",
  "• Project Type:",
  "• Project Overview:",
  "• Project Goals:",
  "• Website Inspiration:",
  "• Estimated Timeline:",
  "• Estimated Budget:",
  "• Additional Information:",
  "",
  "My contact details:",
  "",
  "• Name:",
  "• Email:",
  "• Country:",
  "",
  "Looking forward to hearing from you. Thank you!",
].join("\n");
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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

function Contact() {
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
        <div className="mt-14 flex flex-col items-center gap-12 text-center">
          <Reveal delay={0.5} className="w-full">
            <div className="mx-auto flex w-full max-w-[min(640px,100%)] flex-col items-stretch gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10">
              <EmailAction email="twoframestudio@outlook.com" href={mailHref} />
              <div className="flex w-full items-center gap-4">
                <span className="h-px flex-1 bg-white/15" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">or</span>
                <span className="h-px flex-1 bg-white/15" />
              </div>
              <div className="relative flex flex-col items-center gap-2 rounded-2xl px-4 py-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {t("contact.whatsapp.label")}
                </span>
                <HoverUnderlineAction
                  label="WhatsApp"
                  activeLabel={t("contact.opened")}
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden
                      className="h-[1em] w-[1em] fill-current"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24.02 12.045.02 5.463.02.104 5.379.101 11.959c0 2.096.55 4.14 1.595 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.447h.005c6.582 0 11.943-5.359 11.945-11.945a11.87 11.87 0 0 0-3.495-8.4" />
                    </svg>
                  }
                  onActivate={() => {
                    window.open(whatsappHref, "_blank", "noopener,noreferrer");
                  }}
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.4} className="max-w-md text-base text-[#8F8F8F] sm:text-lg">
            {t("contact.desc")}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ FOOTER (P1 echelon style) ------------------------------ */
function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  const handle = "@twoframestudio";
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
              <a href="#studio" className="block text-white transition-colors hover:text-white/60">
                {t("nav.studio")}
              </a>
              <a href="#services" className="block text-white transition-colors hover:text-white/60">
                {t("nav.services")}
              </a>
              <a href="#process" className="block text-white transition-colors hover:text-white/60">
                {t("nav.process")}
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
                href={mailHref}
                className="block whitespace-nowrap transition-colors hover:text-white/60"
              >
                twoframestudio@outlook.com
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-white/60"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {t("footer.studioLead")}
            </p>
            <div className="space-y-1 text-sm text-white">
              <p>{t("footer.leadName")}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {t("footer.legal")}
            </p>
            <div className="space-y-1 text-sm text-white/60">
              <p>© {year} Two Frame Studio — {t("footer.rights")}</p>
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
