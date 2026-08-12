import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer, About, Services, Testimonials, Contact, FullscreenGallery } from "@/routes/index";
import { LangProvider } from "@/lib/i18n";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/secondary/")({
  component: () => (
    <LangProvider>
      <SecondaryPage />
    </LangProvider>
  ),
});

const secondaryAssets = [
  "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1582268611958-ebaf161c8e28?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800"
];

function SecondaryPage() {
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);

  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-5 sm:px-10 max-w-[1600px] mx-auto pb-20">
        <Reveal>
          <h1 className="text-5xl sm:text-7xl font-display mb-10 italic">Вторичное жилье</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 uppercase text-xs tracking-widest group">
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> На главную
          </Link>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20 mb-20">
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
            <h2 className="text-5xl font-display mb-12">Портфолио работ</h2>
        </Reveal>
        
        <section className="mb-24 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">Вторичное жилье</span>
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/30">Сдан · 2024</span>
            </div>
            <h3 className="font-display mb-6 text-3xl sm:text-5xl">Реновация в сталинском доме</h3>
          </Reveal>

          <div className="mb-10 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.1}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Задача (ТЗ)</p>
              <p className="text-gray-400">
                Капитальный ремонт квартиры в доме 1954 года постройки. Требовался полный демонтаж 
                старых перегородок и дранки, замена всех коммуникаций, усиление дверных проемов, 
                монтаж новой системы отопления с заменой радиаторов и подготовка поверхностей 
                под высококачественную покраску.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Что сделали</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>Демонтаж до кирпичного основания, вывоз 40 кубов мусора</li>
                <li>Замена стояков, разводка труб и монтаж радиаторов Rifar</li>
                <li>Монтаж электрощита, прокладка новой меди, заземление</li>
                <li>Выравнивание стен по маякам, армирование сеткой от трещин</li>
                <li>Подготовка стен под покраску и потолков из ГКЛ</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                  Площадь: <span className="font-bold text-white">92 м²</span>
                </div>
                <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                  Срок: <span className="font-bold text-white">4 месяца</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryAssets.map((src, i) => (
              <Reveal key={src} delay={0.05 * i}>
                <div 
                  className="group relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setFullscreenIdx(i)}
                >
                  <img
                    src={src}
                    alt={`Сталинка — фото работ ${i + 1}`}
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
              images={secondaryAssets} 
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