import { useT } from "@/lib/i18n";
import { PHONE_NUMBER, WHATSAPP_HREF, SITE_HANDLE } from "@/lib/constants";

export function Footer() {
  const t = useT();
  const handle = SITE_HANDLE;
  
  return (
    <footer className="bg-[#141414] text-white">
      {/* Main footer grid */}
      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-6 md:px-10 md:py-16">
        <div className="grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:gap-12 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {t("footer.gallery")}
            </p>
            <div className="space-y-1 text-sm">
              <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }} className="block text-white transition-colors hover:text-white/60">
                {t("nav.work")}
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="block text-white transition-colors hover:text-white/60">
                {t("nav.about")}
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="block text-white transition-colors hover:text-white/60">
                {t("nav.services")}
              </a>
              <a href="#blog" onClick={(e) => { e.preventDefault(); document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }); }} className="block text-white transition-colors hover:text-white/60">
                {t("nav.blog")}
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="block text-white transition-colors hover:text-white/60">
                {t("nav.contact")}
              </a>
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              {t("footer.contact")}
            </p>
            <div className="min-w-0 space-y-1 text-sm text-white">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="block transition-colors hover:text-white/60"
              >
                Тел: {PHONE_NUMBER}
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-white/60"
              >
                WhatsApp: {PHONE_NUMBER}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-white/60">
              ИП Ларионов Михаил Валентинович
            </p>
          </div>
        </div>
      </div>

      {/* Large scrolling handle */}
      <div className="overflow-hidden py-6 md:py-8">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              aria-hidden={i >= 4 ? true : undefined}
              className="font-display mx-12 text-6xl font-bold text-white md:text-8xl lg:text-[10rem]"
            >
              {handle}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
