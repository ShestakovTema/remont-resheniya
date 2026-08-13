import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Footer, 
  About, 
  Services, 
  Testimonials, 
  Contact, 
  ProcessPhotos,
  FullscreenGallery,
  Reveal,
  TextReveal,
  Cursor
} from "@/components/site";
import { eliteCaseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/elite/")({
  component: ElitePage,
});

function ElitePage() {
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);
  
  // Combine all images for the main gallery
  const allImages = eliteCaseStudies.flatMap(cs => cs.assets);
  
  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
      <Cursor />
      
      {/* Back Button */}
      <div className="fixed left-6 top-6 z-50 md:left-10 md:top-10">
        <Link 
          to="/" 
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10"
        >
          <ChevronLeft className="transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative flex min-h-[70vh] items-center pt-32 pb-20 px-5 sm:px-6 md:px-10">
          <div className="mx-auto max-w-[1600px] w-full">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">Категория</span>
            </Reveal>
            <h1 className="font-display mt-6 text-[clamp(2.5rem,10vw,6rem)] leading-[0.9]">
              <TextReveal text="Современные" />
              <br />
              <TextReveal text="объекты" className="italic" delay={0.1} />
            </h1>
            <Reveal delay={0.3} className="mt-12 max-w-2xl text-lg text-[#8F8F8F] md:text-xl">
              Наш профиль в современных объектах — электромонтаж, сантехника, перепланировка квартир и отделка под покраску под ключ, а также мебель и потолки.
            </Reveal>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 px-5 sm:px-6 md:px-10 border-t border-white/10">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-20">
              {eliteCaseStudies.map((project, idx) => (
                <div key={project.title} className="grid gap-12 lg:grid-cols-2 lg:items-start">
                  <Reveal className="space-y-8 lg:sticky lg:top-32">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Кейс {idx + 1}</span>
                      <h2 className="font-display mt-4 text-4xl md:text-5xl">{project.title}</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Год</span>
                        <p className="mt-1 text-sm">{project.year}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Тип</span>
                        <p className="mt-1 text-sm">{project.type}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Задачи</span>
                        <p className="mt-2 text-sm leading-relaxed text-[#8F8F8F]">{project.desc}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const startIdx = eliteCaseStudies.slice(0, idx).reduce((acc, p) => acc + p.assets.length, 0);
                        setFullscreenIdx(startIdx);
                      }}
                      className="group inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium transition-all hover:bg-white/10"
                    >
                      Смотреть проект
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </Reveal>

                  <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
                    {project.assets.map((asset, assetIdx) => (
                      <div 
                        key={assetIdx}
                        className={`overflow-hidden rounded-2xl bg-white/5 cursor-pointer ${assetIdx === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                        onClick={() => {
                          const startIdx = eliteCaseStudies.slice(0, idx).reduce((acc, p) => acc + p.assets.length, 0);
                          setFullscreenIdx(startIdx + assetIdx);
                        }}
                      >
                        <Reveal delay={assetIdx * 0.1} className="h-full w-full">
                          <img 
                            src={asset} 
                            alt={`${project.title} detail ${assetIdx + 1}`}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </Reveal>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <About />
        <Services />
        <ProcessPhotos />
        <Testimonials />
        <Contact />
        <Footer />
      </main>

      <AnimatePresence>
        {fullscreenIdx !== null && (
          <FullscreenGallery 
            images={allImages} 
            initialIdx={fullscreenIdx} 
            onClose={() => setFullscreenIdx(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
