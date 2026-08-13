import { useRef, useEffect } from "react";
import { useT } from "@/lib/i18n";
import { Reveal, TextReveal } from "./reveal";

export function About() {
  const t = useT();
  const stats = [
    { k: "15+", v: t("about.stat.1") },
    { k: "250+", v: t("about.stat.2") },
    { k: "500+", v: t("about.stat.3") },
    { k: "3", v: t("about.stat.4") },
  ];
  return (
    <section className="relative border-t border-white/10 py-20 sm:py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 text-xs uppercase tracking-[0.3em] text-white/60 md:col-span-3">
            {t("about.section")}
          </Reveal>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl">
              <TextReveal key={`aa-${t("about.h.a")}`} text={t("about.h.a")} />
              <br />
              <TextReveal key={`ab-${t("about.h.b")}`} text={t("about.h.b")} delay={0.1} className="text-[#8F8F8F]" />
              <br />
              <TextReveal key={`ac-${t("about.h.c")}`} text={t("about.h.c")} delay={0.25} className="italic" />
            </h2>
            <div className="mt-14 space-y-12">
              <div className="grid gap-14 lg:grid-cols-2">
                <Reveal className="text-lg leading-relaxed text-[#8F8F8F] sm:text-xl">
                  {t("about.p1")}
                </Reveal>
                <Reveal delay={0.4} className="text-lg leading-relaxed text-[#8F8F8F] sm:text-xl">
                  {t("about.p2")}
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px w-8 bg-white/40" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Профессиональный инструмент</span>
                  </div>
                  <p className="text-lg font-medium leading-relaxed text-white md:text-2xl">
                    {t("about.tools")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 justify-items-center gap-y-10 border-t border-white/10 pt-14 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08} className="flex flex-col items-center">
              <Stat value={s.k} />
              <span className="mt-3 max-w-[16ch] text-center text-sm text-[#8F8F8F]">{s.v}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1] ?? "0", 10) : 0;
  const suffix = match ? (match[2] ?? "") : value;
  const ref = useRef<HTMLSpanElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    const num = numRef.current;
    if (!el || !num) return;
    num.textContent = "0";
    let started = false;
    let raf = 0;
    const start = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const duration = 3000;
      let last = -1;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = Math.round(eased * target);
        if (v !== last) {
          num.textContent = String(v);
          last = v;
        }
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [match, target]);

  if (!match) {
    return <span className="font-display text-5xl sm:text-6xl md:text-8xl">{value}</span>;
  }
  return (
    <span ref={ref} className="font-display text-5xl sm:text-6xl md:text-8xl tabular-nums">
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  );
}
