import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { 
  Footer,
  Reveal,
  TextReveal,
  Cursor
} from "@/components/site";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
});

const ARTICLES = [
  {
    id: 1,
    title: "Как выбрать электрика?",
    date: "15 Января 2025",
    desc: "Основные критерии качества электромонтажных работ и на что обратить внимание при приемке.",
    category: "Советы"
  },
  {
    id: 2,
    title: "Тренды в сантехнике 2025",
    date: "10 Января 2025",
    desc: "Коллекторные узлы, системы защиты от протечек и скрытый монтаж — что актуально сегодня.",
    category: "Технологии"
  },
  {
    id: 3,
    title: "Особенности ремонта во вторичке",
    date: "5 Января 2025",
    desc: "С какими скрытыми проблемами можно столкнуться при демонтаже и как их решать.",
    category: "Опыт"
  }
];

function BlogPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
      <Cursor />
      
      <div className="fixed left-6 top-6 z-50 md:left-10 md:top-10">
        <Link 
          to="/" 
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10"
        >
          <ChevronLeft className="transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>

      <main className="relative z-10">
        <section className="relative flex min-h-[60vh] items-center pt-32 pb-20 px-5 sm:px-6 md:px-10">
          <div className="mx-auto max-w-[1600px] w-full">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">Наш блог</span>
            </Reveal>
            <h1 className="font-display mt-6 text-[clamp(2.5rem,10vw,6rem)] leading-[0.9]">
              <TextReveal text="Экспертные" />
              <br />
              <TextReveal text="статьи" className="italic" delay={0.1} />
            </h1>
            <Reveal delay={0.3} className="mt-12 max-w-2xl text-lg text-[#8F8F8F] md:text-xl">
              Делимся опытом, техническими тонкостями и советами по обустройству современных инженерных систем.
            </Reveal>
          </div>
        </section>

        <section className="py-20 px-5 sm:px-6 md:px-10 border-t border-white/10">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-12">
              {ARTICLES.map((article, idx) => (
                <Reveal key={article.id} delay={idx * 0.1}>
                  <div className="group border-b border-white/10 pb-12 last:border-0">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-white/40">
                          <span>{article.date}</span>
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          <span>{article.category}</span>
                        </div>
                        <h2 className="font-display mt-4 text-3xl transition-colors group-hover:text-white/70 md:text-4xl">
                          {article.title}
                        </h2>
                        <p className="mt-4 text-[#8F8F8F] leading-relaxed">
                          {article.desc}
                        </p>
                      </div>
                      <Link 
                        to="/blog"
                        className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-transform group-hover:rotate-[-45deg] group-hover:bg-white group-hover:text-black"
                      >
                        →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
