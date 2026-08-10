import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";

export const Route = createFileRoute("/newbuilding/")({
  component: NewBuildingPage,
});

function NewBuildingPage() {
  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-10 max-w-[1600px] mx-auto">
        <Reveal>
          <h1 className="text-7xl font-display mb-10">Ремонт новостроек</h1>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Профессиональная отделка в новых жилых комплексах с учетом усадки дома и всех технических регламентов застройщиков.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Почему мы:</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Поэтапная сдача работ</li>
                <li>Знание специфики усадки дома</li>
                <li>Согласование перепланировки в БТИ</li>
                <li>Вывоз строительного мусора</li>
                <li>Помощь в выборе материалов</li>
              </ul>
              <button className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                Заказать выезд замерщика
              </button>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
