import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Footer, About, Services, Testimonials, Contact, FullscreenGallery, ProcessPhotos, HeroShowcase, SiteAurora } from "@/routes/index";
import { CaseStudiesCarousel } from "@/components/site/case-studies-carousel";
import { Cursor } from "@/components/site/cursor";
import { LangProvider } from "@/lib/i18n";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { newBuildingCaseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/newbuilding/")({
  head: () => ({
    title: "Новостройки — Ремонт Решения",
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "description", content: "Ремонт квартир в новостройках под ключ. Инженерные системы, перепланировка и качественная отделка в новых домах Москвы." },
      { name: "keywords", content: "ремонт в новостройке, ремонт под ключ новостройка, отделка новой квартиры" },
      { property: "og:title", content: "Новостройки — Ремонт Решения" },
      { property: "og:description", content: "Ремонт квартир в новостройках под ключ. Инженерные системы, перепланировка и качественная отделка." },
      { name: "twitter:title", content: "Новостройки — Ремонт Решения" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://remontresheniya.ru/newbuilding/" },
    ],
  }),
  component: () => (
    <LangProvider>
      <NewBuildingPage />
    </LangProvider>
  ),
});

function NewBuildingPage() {
  const [fullscreenImages, setFullscreenImages] = useState<string[] | null>(null);
  const [fullscreenIdx, setFullscreenIdx] = useState(0);

  const openGallery = (assets: string[], idx: number) => {
    setFullscreenImages(assets);
    setFullscreenIdx(idx);
  };

  return (
    <div id="top" className="bg-[#070707] text-white min-h-screen">
      <Cursor />
      <Nav />
      <SmoothScroll />
      <div className="relative z-10 overflow-hidden bg-[#070707]">
        <SiteAurora />
        <main className="relative z-10 pt-32 px-5 sm:px-10 max-w-[1600px] mx-auto pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-10">
            <Reveal>
              <h1 className="text-5xl sm:text-7xl font-display italic">Новостройки</h1>
              <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mt-6 uppercase text-xs tracking-widest group">
                <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> На главную
              </Link>
            </Reveal>
            <div className="hidden lg:block">
              <HeroShowcase />
            </div>
          </div>
        <div id="about" className="grid md:grid-cols-2 gap-20 mb-20">

          <Reveal delay={0.2}>
            <p className="text-xl text-[#8F8F8F] leading-relaxed">
              Инженерия и подготовка в новых домах: <span className="font-bold text-white">электромонтаж, сантехнику, перепланировку квартир, отделку под покраску</span> с учетом всех норм, а также мебель и потолки. Наш опыт позволяет реализовывать <span className="font-bold text-white">проекты любой сложности</span>.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Особенности:</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Поэтапная сдача работ</li>
                <li>Знание специфики усадки дома</li>
                <li>Согласование перепланировок в БТИ</li>
                <li>Работаем с любыми застройщиками</li>
                <li>Помощь в выборе черновых материалов</li>
              </ul>
            </div>
          </Reveal>
        </div>

        

        <AnimatePresence>
          {fullscreenImages && (
            <FullscreenGallery 
              images={fullscreenImages} 
              initialIdx={fullscreenIdx} 
              onClose={() => setFullscreenImages(null)} 
            />
          )}
        </AnimatePresence>

        <div id="about" className="pt-20">
          <About />
        </div>
        <ProcessPhotos />
        <Reveal>
          <h2 id="work" className="text-5xl font-display my-12"><span className="text-xs uppercase tracking-[0.3em] text-white/40 block mb-4">(04) Портфолио</span>Портфолио работ</h2>
        </Reveal>
        <CaseStudiesCarousel projects={newBuildingCaseStudies} onOpenGallery={openGallery} />
        <div id="services" className="pt-20">
          <Services />
        </div>
        <Testimonials id="testimonials" />
        <Contact id="contact" />
        </main>
      </div>
      <Footer />
      <div className="bg-[#141414] pb-10 px-10 text-center">
        <div className="flex flex-col sm:flex-row justify-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
          <a href="/cookies" className="hover:text-white transition-colors">Политика Cookies</a>
        </div>
      </div>
    </div>
  );
}