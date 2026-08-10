import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/routes/index";

export const Route = createFileRoute("/secondary/")({
  component: SecondaryPage,
});

function SecondaryPage() {
  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-10 max-w-[1600px] mx-auto pb-20">
        <Reveal>
          <h1 className="text-7xl font-display mb-10 italic">Ремонт вторички</h1>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Капитальное обновление старого жилого фонда: от демонтажа до полной замены всех коммуникаций и создания современного интерьера.
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
              <button className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                Заказать выезд замерщика
              </button>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
