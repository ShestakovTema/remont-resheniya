import { createFileRoute } from "@tanstack/react-router";
import { Reveal, TextReveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/routes/index";
import { LeadForm } from "@/components/site/lead-form";
import { LangProvider } from "@/lib/i18n";

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
          <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 uppercase text-xs tracking-widest group">
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> На главную
          </a>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Специализированные инженерные решения для премиальных интерьеров. Безупречный электромонтаж, надежная сантехника и идеальная черновая подготовка.
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
      </main>
      <Footer />
    </div>
  );
}
