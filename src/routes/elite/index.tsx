import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/routes/index";

export const Route = createFileRoute("/elite/")({
  component: ElitePage,
});

function ElitePage() {
  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-10 max-w-[1600px] mx-auto pb-20">
        <Reveal>
          <h1 className="text-7xl font-display mb-10 italic">Элитный ремонт</h1>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-20">
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-400">
              Премиальные материалы, авторский надзор и безупречное исполнение. Мы создаем интерьеры, которые подчеркивают ваш статус.
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
              <button className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                Получить индивидуальную смету
              </button>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}

