import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Footer, About, Services, Testimonials, Contact, FullscreenGallery, ProcessPhotos } from "@/routes/index";
import { LangProvider } from "@/lib/i18n";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { secondaryCaseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/secondary/")({
  component: () => (
    <LangProvider>
      <SecondaryPage />
    </LangProvider>
  ),
});

function SecondaryPage() {
  const [fullscreenImages, setFullscreenImages] = useState<string[] | null>(null);
  const [fullscreenIdx, setFullscreenIdx] = useState(0);

  const openGallery = (assets: string[], idx: number) => {
    setFullscreenImages(assets);
    setFullscreenIdx(idx);
  };

  return (
    <div id="top" className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <SmoothScroll />
      <main className="pt-32 px-5 sm:px-10 max-w-[1600px] mx-auto pb-20">
        <Reveal>
          <h1 className="text-5xl sm:text-7xl font-display mb-10 italic">Вторичное жилье</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 uppercase text-xs tracking-widest group">
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> На главную
          </Link>
        </Reveal>
        <div id="about" className="grid md:grid-cols-2 gap-20 mb-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Капитальное обновление инженерных сетей: полная замена электрики и сантехники, демонтаж, перепланировка квартир и отделка под покраску in старом фонде. Мебель и потолки — через проверенных партнёров.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Особенности:</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Полный демонтаж и вывоз мусора</li>
                <li>Замена электрики и сантехники</li>
                <li>Минимальный шум для соседей</li>
                <li>Согласование перепланировки под ключ</li>
                <li>Бережная работа в жилых домах</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h2 id="work" className="text-5xl font-display mb-12">Портфолио работ</h2>
        </Reveal>
        
        <div className="space-y-24">
          {secondaryCaseStudies.map((project, pIdx) => (
            <section key={pIdx} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 transition-colors hover:border-white/20">
              <Reveal>
                <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">{project.type}</span>
                  <span className="h-px w-8 bg-white/20" />
                  <span className="text-xs uppercase tracking-[0.3em] text-white/30">{project.year}</span>
                </div>
                <h3 className="font-display mb-6 text-3xl sm:text-5xl">{project.title}</h3>
              </Reveal>

              <div className="mb-10 grid gap-10 md:grid-cols-2">
                <Reveal delay={0.1}>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Задача (ТЗ)</p>
                  <p className="text-gray-400 leading-relaxed">{project.desc}</p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Что сделали</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    {project.work.map((w, i) => <li key={i}>{w}</li>)}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                      Площадь: <span className="font-bold text-white">{project.area}</span>
                    </div>
                    <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                      Срок: <span className="font-bold text-white">{project.time}</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Mobile-optimized scrollable gallery */}
              <div className="relative -mx-6 sm:mx-0 overflow-hidden">
                <div className="flex gap-4 overflow-x-auto px-6 sm:px-0 pb-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible no-scrollbar scroll-smooth snap-x snap-mandatory">
                  {project.assets.map((src: string, i: number) => (
                    <div 
                      key={src} 
                      className="min-w-[85vw] sm:min-w-0 snap-center group relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                      onClick={() => openGallery(project.assets, i)}
                    >
                      <img
                        src={src}
                        alt={`${project.title} — фото ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                          <Maximize2 className="text-white" size={20} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mobile hint */}
                <div className="flex justify-center mt-2 sm:hidden text-[10px] uppercase tracking-widest text-white/30">
                  Листайте для просмотра →
                </div>
              </div>
            </section>
          ))}
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
        <div id="services">
          <Services />
        </div>
        <ProcessPhotos />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
