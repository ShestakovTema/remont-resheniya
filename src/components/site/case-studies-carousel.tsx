import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

type CaseStudy = {
  title: string;
  type: string;
  year: string | number;
  desc: string;
  work: string[];
  area: string;
  time: string;
  assets: string[];
};

export function CaseStudiesCarousel({
  projects,
  onOpenGallery,
}: {
  projects: CaseStudy[];
  onOpenGallery: (assets: string[], idx: number) => void;
}) {
  const [active, setActive] = useState(0);
  const total = projects.length;
  const go = (i: number) => setActive(Math.min(total - 1, Math.max(0, i)));
  const project = projects[active];
  if (!project) return null;

  return (
    <div className="mb-20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="text-xs uppercase tracking-[0.3em] text-white/40">
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Предыдущий проект"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15 disabled:opacity-30"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Следующий проект"
            onClick={() => go(active + 1)}
            disabled={active === total - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:bg-white/15 disabled:opacity-30"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <section
        key={active}
        className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 sm:p-10"
      >
        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-white/40">{project.type}</span>
          <span className="h-px w-8 bg-white/20" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/30">{project.year}</span>
        </div>
        <h3 className="font-display mb-6 text-3xl sm:text-5xl">{project.title}</h3>

        <div className="mb-10 grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-white/40">Задача (ТЗ)</p>
            <p className="leading-relaxed text-gray-400">{project.desc}</p>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-white/40">Что сделали</p>
            <ul className="list-inside list-disc space-y-2 text-gray-400">
              {project.work.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                Площадь: <span className="font-bold text-white">{project.area}</span>
              </div>
              <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                Срок: <span className="font-bold text-white">{project.time}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mx-6 overflow-hidden sm:mx-0">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-6 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {project.assets.map((src, i) => (
              <div
                key={src}
                className="group relative aspect-[16/10] min-w-[85vw] cursor-pointer snap-center overflow-hidden rounded-xl sm:min-w-0"
                onClick={() => onOpenGallery(project.assets, i)}
              >
                <img
                  src={src}
                  alt={`${project.title} — фото ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <Maximize2 className="text-white" size={20} aria-hidden="true" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center text-[10px] uppercase tracking-widest text-white/30 sm:hidden">
            Листайте для просмотра →
          </div>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            aria-label={`Проект ${p.title}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-white" : "w-3 bg-white/25 hover:bg-white/50"}`}
          />
        ))}
      </div>
      <Reveal className="sr-only">Портфолио</Reveal>
    </div>
  );
}
