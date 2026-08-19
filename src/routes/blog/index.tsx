import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/routes/index";
import { LangProvider } from "@/lib/i18n";

export const Route = createFileRoute("/blog/")({
  component: () => (
    <LangProvider>
      <BlogPage />
    </LangProvider>
  ),
});

const ARTICLES = [
  {
    title: "Как выбрать материалы для новостройки",
    excerpt: "Основные моменты, на которые стоит обратить внимание при выборе черновых и чистовых материалов в новом доме.",
    image: "/images/interior-1581094794329-c8112a89af12.jpg",
    date: "12.05.2025"
  },
  {
    title: "Секреты элитного ремонта",
    excerpt: "Что делает ремонт по-настоящему премиальным: от шумоизоляции до интеграции систем умного дома.",
    image: "/images/interior-1600210492486-724fe5c67fb0.jpg",
    date: "10.05.2025"
  },
  {
    title: "Тренды в дизайне интерьера 2025",
    excerpt: "Минимализм, экологичность и функциональность — главные направления этого года.",
    image: "/images/interior-1618221195710-dd6b41faaea6.jpg",
    date: "05.05.2025"
  }
];

function BlogPage() {
  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <Nav />
      <main className="pt-32 px-5 sm:px-10 max-w-[1600px] mx-auto pb-20">
        <Reveal>
          <h1 className="text-5xl sm:text-7xl font-display mb-16 italic">Блог экспертов</h1>
        </Reveal>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {ARTICLES.map((article, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white/70 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
