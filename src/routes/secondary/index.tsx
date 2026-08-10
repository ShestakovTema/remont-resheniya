import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";

export const Route = createFileRoute("/secondary/")({
  component: SecondaryPage,
});

function SecondaryPage() {
  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-10 max-w-[1600px] mx-auto">
        <Reveal>
          <h1 className="text-7xl font-display mb-10">Ремонт вторички</h1>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Второе дыхание для вашей квартиры. Капитальный ремонт с полной заменой всех коммуникаций и перепланировкой.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Наши преимущества:</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Бережный демонтаж</li>
                <li>Полная замена электрики и сантехники</li>
                <li>Минимальный шум для соседей</li>
                <li>Работа с «убитыми» квартирами</li>
                <li>Согласование перепланировки под ключ</li>
              </ul>
              <button className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                Заказать расчет сметы
              </button>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
