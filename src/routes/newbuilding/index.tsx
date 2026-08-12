import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer, About, Services, Testimonials, Contact, FullscreenGallery } from "@/routes/index";
import { LangProvider } from "@/lib/i18n";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/newbuilding/")({
  component: () => (
    <LangProvider>
      <NewBuildingPage />
    </LangProvider>
  ),
});

const zilartAssets = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1582408921715-18e7826363bb?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
];

function NewBuildingPage() {
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-5 sm:px-10 max-w-[1600px] mx-auto pb-20">
        <Reveal>
          <h1 className="text-5xl sm:text-7xl font-display mb-10 italic">Новостройки</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 uppercase text-xs tracking-widest group">
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> На главную</Link>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Инженерия и подготовка в новых домах: электромонтаж, разводка сантехники, перепланировка квартир и отделка под покраску с учётом всех норм. Мебель и потолки — через партнёров.
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


        <Reveal>
            <h2 className="text-5xl font-display mb-12">Портфолио работ</h2>
        </Reveal>
        
        <section className="mb-24 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">Новостройка</span>
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/30">Сдан · 2024</span>
            </div>
            <h3 className="font-display mb-6 text-3xl sm:text-5xl">ЖК «Зиларт» — Инженерные системы</h3>
          </Reveal>

          <div className="mb-10 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.1}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Задача (ТЗ)</p>
              <p className="text-gray-400">
                Комплексная подготовка квартиры под чистовую отделку. Необходимо было выполнить 
                возведение межкомнатных перегородок из пазогребневых плит, полную разводку 
                электросети (более 80 точек), монтаж системы водоснабжения с установкой системы 
                защиты от протечек и качественную штукатурку стен под покраску.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Что сделали</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>Монтаж перегородок с соблюдением геометрии углов 90°</li>
                <li>Прокладка кабелей ГОСТ в гофре, сборка силового щита</li>
                <li>Разводка труб Rehau, установка инсталляций, фильтров очистки</li>
                <li>Механизированная штукатурка стен и шпаклевка в 3 слоя</li>
                <li>Шумоизоляция пола перед заливкой стяжки</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                  Площадь: <span className="font-bold text-white">78 м²</span>
                </div>
                <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                  Срок: <span className="font-bold text-white">2,5 месяца</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zilartAssets.map((src, i) => (
              <Reveal key={src} delay={0.05 * i}>
                <div 
                  className="group relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setFullscreenIdx(i)}
                >
                  <img
                    src={src}
                    alt={`ЖК Зиларт — фото работ ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                      <Maximize2 className="text-white" size={20} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {fullscreenIdx !== null && (
            <FullscreenGallery 
              images={zilartAssets} 
              initialIdx={fullscreenIdx} 
              onClose={() => setFullscreenIdx(null)} 
            />
          )}
        </AnimatePresence>

        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}