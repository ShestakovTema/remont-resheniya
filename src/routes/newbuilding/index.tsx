import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/routes/index";

export const Route = createFileRoute("/newbuilding/")({
  component: NewBuildingPage,
});

function NewBuildingPage() {
  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-10 max-w-[1600px] mx-auto pb-20">
        <Reveal>
          <h1 className="text-7xl font-display mb-10 italic">Ремонт новостроек</h1>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Профессиональный подход к ремонту в новых домах с учетом усадки и всех технических особенностей современных ЖК.
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
                <div key={i} className="group border border-white/10 p-6 rounded-xl hover:border-white/30 transition-all">
                    <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" className="rounded-lg mb-6 w-full h-64 object-cover" alt="До" />
                    <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800" className="rounded-lg mb-6 w-full h-64 object-cover" alt="После" />
                    <h3 className="text-2xl font-bold mb-4">Объект №{i}</h3>
                    <p className="text-gray-400 mb-4">Задача: Создание комфортного пространства для семьи.</p>
                    <p className="text-gray-400">Срок выполнения: 3 месяца.</p>
                </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}