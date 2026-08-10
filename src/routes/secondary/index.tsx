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
        <div className="grid md:grid-cols-2 gap-20 mb-20">
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
              <a href="/#contact" className="mt-8 inline-block px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform text-center">
                Заказать выезд замерщика
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
            <h2 className="text-5xl font-display mb-12">Портфолио работ</h2>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
                <div key={i} className="group border border-white/10 p-6 rounded-xl hover:border-white/30 transition-all">
                    <img src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800" className="rounded-lg mb-6 w-full h-64 object-cover" alt="До" />
                    <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" className="rounded-lg mb-6 w-full h-64 object-cover" alt="После" />
                    <h3 className="text-2xl font-bold mb-4">Объект №{i}</h3>
                    <p className="text-gray-400 mb-4">Задача: Полная реконструкция старой квартиры.</p>
                    <p className="text-gray-400">Срок выполнения: 5 месяцев.</p>
                </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}