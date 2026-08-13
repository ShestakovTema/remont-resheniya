import { useT } from "@/lib/i18n";
import { Reveal, TextReveal } from "./reveal";
import { LeadForm } from "./lead-form";
import { PHONE_NUMBER } from "@/lib/constants";

export function Contact({ id }: { id?: string }) {
  const t = useT();
  return (
    <section id={id || "contact"} className="relative overflow-hidden border-t border-white/10 py-20 sm:py-28 md:py-44">
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <Reveal className="text-xs uppercase tracking-[0.3em] text-white/60">
          {t("contact.section")}
        </Reveal>
        <h2 className="font-display mx-auto mt-6 max-w-[18ch] break-words text-center text-[clamp(2.75rem,13vw,5rem)] leading-[0.95] md:text-[10vw]">
          <TextReveal key={`ca-${t("contact.h.a")}`} text={t("contact.h.a")} />
          <br />
          <TextReveal key={`cb-${t("contact.h.b")}`} text={t("contact.h.b")} delay={0.15} />
          {" "}
          <TextReveal key={`cc-${t("contact.h.c")}`} text={t("contact.h.c")} delay={0.3} className="italic" />
        </h2>
        <div className="mt-14 flex flex-col items-center gap-12 text-center max-w-4xl mx-auto">
          <Reveal delay={0.5} className="w-full">
            <div className="mx-auto flex w-full flex-col items-stretch gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10">
              <div className="relative flex flex-col items-center gap-2 rounded-2xl px-4 py-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {t("contact.whatsapp.label")}
                </span>
                <Reveal delay={0.1}>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                    className="group inline-flex items-center gap-4 text-3xl font-medium text-white transition-colors hover:text-white/70 sm:text-4xl md:text-5xl lg:text-6xl"
                  >
                    <span data-cursor="link">{PHONE_NUMBER}</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </a>
                </Reveal>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.55} className="text-sm font-medium uppercase tracking-[0.2em] text-white/30">
            ИЛИ
          </Reveal>

          <Reveal delay={0.6} className="w-full">
            <div className="mx-auto flex w-full flex-col items-stretch gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10 text-left">
              <h3 className="text-xl font-bold mb-4 text-center">Оставить заявку</h3>
              <LeadForm />
            </div>
          </Reveal>

          <Reveal delay={0.7} className="max-w-md text-base text-[#8F8F8F] sm:text-lg">
            {t("contact.desc")}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
