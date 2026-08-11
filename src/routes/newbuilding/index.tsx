import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer, About, Services, Testimonials, Contact } from "@/routes/index";
import { LeadForm } from "@/components/site/lead-form";
import { LangProvider } from "@/lib/i18n";

export const Route = createFileRoute("/newbuilding/")({
  component: () => (
    <LangProvider>
      <NewBuildingPage />
    </LangProvider>
  ),
});

const PHONE_NUMBER = "+7 916 799-12-16";

function NewBuildingPage() {
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
              Инженерия и подготовка в новых домах: электромонтаж, разводка сантехники, черновые работы и отделка под покраску с учётом всех норм. Мебель и потолки — через партнёров.
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
        
        <div className="grid md:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
                <div key={i} className="group border border-white/10 p-6 rounded-xl hover:border-white/30 transition-all overflow-hidden bg-white/[0.02]">
                    <div className="space-y-4 mb-8">
                        <div className="relative group/img">
                            <span className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs uppercase tracking-widest font-bold">До</span>
                            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" className="rounded-lg w-full h-80 object-cover transition-transform duration-700 group-hover/img:scale-105" alt="До" />
                        </div>
                        <div className="relative group/img">
                            <span className="absolute top-4 left-4 z-10 bg-white text-black px-3 py-1 rounded text-xs uppercase tracking-widest font-bold">После</span>
                            <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800" className="rounded-lg w-full h-80 object-cover transition-transform duration-700 group-hover/img:scale-105" alt="После" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white/90">Квартира в ЖК "Зиларт" №{i}</h3>
                        <div className="space-y-2">
                            <p className="text-white/40 text-xs uppercase tracking-widest">Задача (ТЗ):</p>
                            <p className="text-gray-400">Черновая и чистовая отделка с нуля. Возведение перегородок, разводка инженерии, укладка инженерной доски и покраска стен по дизайн-проекту.</p>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="bg-white/5 px-4 py-2 rounded-full text-sm text-gray-300">
                                Срок: <span className="text-white font-bold">3 месяца</span>
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
