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
import { eliteCaseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/elite/")({
  head: () => ({
    title: "Премиум объекты — Ремонт Решения",
    meta: [
      { name: "description", content: "Элитный ремонт квартир в Москве. Профессиональный электромонтаж, сантехника и премиальная отделка под покраску для премиум объектов." },
      { name: "keywords", content: "элитный ремонт, премиум ремонт квартир, ремонт хамовники, дизайнерский ремонт" },
      { property: "og:title", content: "Премиум объекты — Ремонт Решения" },
      { property: "og:description", content: "Элитный ремонт квартир в Москве. Профессиональный электромонтаж, сантехника и премиальная отделка." },
      { name: "twitter:title", content: "Премиум объекты — Ремонт Решения" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://remontresheniya.ru/elite/" },
    ],
  }),
  component: () => (
    <LangProvider>
      <ElitePage />
    </LangProvider>
  ),
});

function ElitePage() {
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
              <h1 className="text-5xl sm:text-7xl font-display italic">Премиум объекты</h1>
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
              Наш профиль в премиум объектах — <span className="font-bold text-white">электромонтаж, сантехнику, перепланировку квартир, отделку под покраску</span> под ключ, а также мебель и потолки. Наш опыт позволяет реализовывать <span className="font-bold text-white">проекты любой сложности</span>.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Особенности:</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Работа с архитекторами и дизайнерами</li>
                <li>Премиальная шумоизоляция</li>
                <li>Бесшумные технологии монтажа</li>
                <li>Фиксированная смета без доплат</li>
                <li>Гарантия 3 года</li>
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

        <div className="pt-20">
          <About />
        </div>
        <ProcessPhotos />
        <Reveal>
          <h2 id="work" className="text-5xl font-display my-12"><span className="text-xs uppercase tracking-[0.3em] text-white/40 block mb-4">(04) Портфолио</span>Портфолио работ</h2>
        </Reveal>
        <CaseStudiesCarousel projects={eliteCaseStudies} onOpenGallery={openGallery} />
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
