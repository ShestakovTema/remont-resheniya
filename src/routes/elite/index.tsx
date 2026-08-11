import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal, TextReveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer, About, Services, Testimonials, Contact } from "@/routes/index";
import { LeadForm } from "@/components/site/lead-form";
import { LangProvider } from "@/lib/i18n";
import { regisseurAssets } from "@/lib/regisseur-assets";

export const Route = createFileRoute("/elite/")({
  component: () => (
    <LangProvider>
      <ElitePage />
    </LangProvider>
  ),
});

const PHONE_NUMBER = "+7 916 799-12-16";

function ElitePage() {
  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-5 sm:px-10 max-w-[1600px] mx-auto pb-20">
        <Reveal>
          <h1 className="text-5xl sm:text-7xl font-display mb-10 italic">Элитные объекты</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 uppercase text-xs tracking-widest group">
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> На главную</Link>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Наш профиль в премиальных объектах — электромонтаж, сантехника, черновые работы и отделка под покраску. Полный ремонт «под ключ» мы не делаем, но мебель и потолки организуем через проверенных партнёров.
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

        {/* Action Buttons Section */}
        <div className="flex flex-col items-center gap-8 mb-32 max-w-4xl mx-auto">
          <Reveal delay={0.5} className="w-full">
            <div className="mx-auto flex w-full flex-col items-stretch gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Позвоните нам
              </span>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="group inline-flex items-center justify-center gap-4 text-3xl font-medium text-white transition-colors hover:text-white/70 sm:text-4xl md:text-5xl lg:text-6xl"
              >
                <span data-cursor="link">{PHONE_NUMBER}</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </a>
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
        </div>

        <Reveal>
            <h2 className="text-5xl font-display mb-12">Портфолио работ</h2>
        </Reveal>

        {/* Кейс: ЖК «Режиссёр» */}
        <section className="mb-24 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">Элитный ремонт</span>
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/30">В работе · 2025-2026</span>
            </div>
            <h3 className="font-display mb-6 text-3xl sm:text-5xl">Элитная квартира в ЖК «Режиссёр»</h3>
          </Reveal>

          <div className="mb-10 grid gap-10 md:grid-cols-2">
            <Reveal delay={0.1}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Задача (ТЗ)</p>
              <p className="text-gray-400">
                Квартира 142 м² в состоянии «от застройщика». Требовалось выполнить полный комплекс
                инженерии и подготовки под чистовую отделку: спроектировать и смонтировать электрику
                на 118 линий с двумя щитами, развести сантехнику с коллекторными узлами, смонтировать
                водяной тёплый пол в трёх зонах, возвести перегородки, выполнить стяжку с шумоизоляцией
                и штукатурку стен под покраску по маякам с геометрией в 1 мм.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Что сделали</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>Штробление, прокладка кабеля, сборка и подключение двух щитов</li>
                <li>Разводка ХВС/ГВС и канализации, коллекторы, установка приборов</li>
                <li>Водяной тёплый пол, опрессовка и балансировка контуров</li>
                <li>Перегородки, стяжка с шумоизоляцией, гидроизоляция мокрых зон</li>
                <li>Штукатурка и шпаклёвка стен и потолков под покраску</li>
                <li>Координация мебельщиков и потолочников через партнёров</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                  Площадь: <span className="font-bold text-white">142 м²</span>
                </div>
                <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                  Срок: <span className="font-bold text-white">3,5 месяца</span>
                </div>
                <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                  Стоимость работ: <span className="font-bold text-white">2 450 000 ₽</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regisseurAssets.map((src, i) => (
              <Reveal key={src} delay={0.05 * i}>
                <div className="group relative aspect-[16/10] overflow-hidden rounded-xl">
                  <img
                    src={src}
                    alt={`ЖК Режиссёр — ход работ, фото ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        
        <div className="grid md:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
                <div key={i} className="group border border-white/10 p-6 rounded-xl hover:border-white/30 transition-all overflow-hidden bg-white/[0.02]">
                    <div className="space-y-4 mb-8">
                        <div className="relative group/img">
                            <span className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs uppercase tracking-widest font-bold">До</span>
                            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" className="rounded-lg w-full h-80 object-cover transition-transform duration-700 group-hover/img:scale-105" alt="До" />
                        </div>
                        <div className="relative group/img">
                            <span className="absolute top-4 left-4 z-10 bg-white text-black px-3 py-1 rounded text-xs uppercase tracking-widest font-bold">После</span>
                            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" className="rounded-lg w-full h-80 object-cover transition-transform duration-700 group-hover/img:scale-105" alt="После" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white/90">Объект в Хамовниках №{i}</h3>
                        <div className="space-y-2">
                            <p className="text-white/40 text-xs uppercase tracking-widest">Задача (ТЗ):</p>
                            <p className="text-gray-400">Создание интерьера в классическом стиле с использованием натурального мрамора и ценных пород дерева. Полная звукоизоляция и система "Умный дом".</p>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="bg-white/5 px-4 py-2 rounded-full text-sm text-gray-300">
                                Срок: <span className="text-white font-bold">4 месяца</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
