import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { ArrowDown, ArrowUpRight, Cable, CircleCheck, Menu, X, Plug, PanelsTopLeft, Building2, Star, List, Wrench, ShieldCheck, Hammer, Check, MessageCircle, ScanLine, ClipboardCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MasterContact } from "./master-contact";
import masterPhoto from "@/assets/mikhail-master.webp.asset.json";

const navigation = [["about", "О мастере"], ["prices", "Прайс-лист"], ["steps", "Этапы"], ["nuances", "Нюансы"], ["process-photos", "Работы"], ["reviews", "Отзывы"]];
const facts = [
  { title: "12 лет в строительстве", text: "Добрый день👋, меня зовут Миша🙂. Занимаюсь электрикой, сантехникой и помогаю с ремонтом квартир и коммерческих помещений.", icon: Hammer },
  { title: "Профессиональный электрик 5 категории", text: "Работаю по ГОСТу и СНиПу. Диагностика и устранение неисправностей, замена проводки и сборка электрощитов. Техническое обслуживание коммерческих помещений.", icon: ShieldCheck },
  { title: "Работаю чисто и профессионально", text: "Работаю в чистоте, штроблю с промышленным пылесосом, накрываю мебель, убираю после себя, вывожу мусор.\n\nИспользую в работе только Дорогие Профессиональные инструменты.", icon: Cable },
  { title: "Помощь и консультация", text: "Помогу и проконсультирую всё простым и понятным языком!\n\nРаботаю по договору. Лично отвечаю за качество работы!\n\nЗа всё время работы не было ни одного недоделанного заказа!", icon: Wrench },
];
const priceServices = [
  { title: "Замена розеток и выключателей", description: "Замена и перенос точек в кухне и комнатах", icon: Plug },
  { title: "Сборка электрощитов", description: "Сборка, монтаж и подготовка квартирного электрощитка", icon: PanelsTopLeft },
  { title: "Электромонтажные работы в новостройках", description: "Новая проводка, розетки, освещение и подключение техники", icon: Building2 },
];
const fullServices = [
  "Перенос розеток и выключателей в кухне и комнатах",
  "Перенос и углубление электрощитка в квартирах",
  "Подготовка под электромонтаж (штробление стен и высверливание подрозетников)",
  "Электромонтажные работы в новостройках",
  "Замена электропроводки",
  "Электромонтаж в кафе и других производственных помещениях",
  "Сборка электрощитов",
  "Монтаж и замена любого электрооборудования",
  "Монтаж и ремонт люстр, светильников, бра",
  "Подключение варочных поверхностей, духовок, стиральных машин и т.д.",
  "Монтаж слаботочных систем (ТВ, Интернет)",
  "Высверливание подрозетников под блоки розеток",
];
const reviews = [
  { name: "Анастасия", date: "10 сентября", text: "Обратились за консультацией с проблемой после того, как неумелые электрики ЖЭКа испортили и стены и провода.\nМихаил грамотный специалист, объяснил как нужно делать, дал советы\nДоговорились быстро, приехал в этот же день ! Рекомендую данного мастера !" },
  { name: "Дмитрий К.", date: "3 сентября", text: "Все сделано в срок. Цена как при договоре. Удобно. все под ключ. Материалы все свои. но могут и ваши использовать." },
  { name: "Дмитрий", date: "15 сентября", text: "Ребята работают очень аккуратно, внимательны к деталям. Предвосхитили все ожидания. В каких то моментах предложили решения лучше чем я хотел без увеличения стоимости. В целом я очень доволен что выбрал их услуги. Все оборудование hilti, штробят с пылесосом. После себя не оставляют мусор. Очень позитивные, приятно вести диалог и обсуждать детали работы." },
  { name: "Алекс", date: "23 августа", text: "Наилучшие рекомендации Михаилу и Вячеславу!\nБыстро договорились и по цене и по дате. Оборудование профессиональное!, Видно, что мастера готовы к работе и любым сложностям которые могут возникнуть в процессе, что говорит о высоком уровне профессионализма и подготовки. Работа была выполнена качественно и в срок. Цена соответствовала раннее озвученой. Благодарю Вас ребята! Всех Вам Благ!\nС уважением, Александр." },
  { name: "Анна П.", date: "7 августа", text: "Перестали работать 2 розетки, написала Михаилу, приехал в этот же день, быстро все починил и объяснил почему это могло произойти. Однозначно рекомендую" },
  { name: "Надежда", date: "5 августа", text: "Михаил очень приятный молодой человек, с умелыми руками и нужными компетенциями. Установил электрощиток на 24 модуля, с разводкой по квартире. Все очень красиво, аккуратно. При штраблении не было пыли, у него отличное оборудование, все пылесосил, работал в чистоте. Более того скорректировал ремонтные работы и по другим направлениям, подсказал, где можно сэкономить и найти исполнителей. Считаю, что нам очень повезло, выполнено с большой буквы профессионализма и адекватности стоимости. Его работу также оценили другие мастера, по сантехнике и плитке, отметив, что очень уровневое исполнение. Очень рекомендую." },
];
const steps = [
  ["Обсуждаем задачу", "Расскажите, что нужно сделать, и пришлите фотографии в Telegram."],
  ["Уточняем объём", "Определяем точки, материалы и особенности помещения."],
  ["Согласовываем стоимость", "До начала работ обсуждаем состав работ, стоимость и сроки."],
  ["Выполняем и проверяем", "После монтажа проверяем результат и отвечаем на ваши вопросы."],
];

const orderedReviews = [...reviews.slice(-1), ...reviews.slice(0, -1)];
const stepIcons = [MessageCircle, ScanLine, ClipboardCheck, ShieldCheck];

function SectionGlows() {
  return <div className="master-section-glows" aria-hidden>{Array.from({ length: 6 }, (_, index) => <span key={index} className={`master-glow-sm master-glow-${index % 4} master-glow-sm-${index + 1}`} />)}</div>;
}

function Heading({ number, label, children }: { number: string; label: string; children: ReactNode }) {
  return <div className="mb-10"><p className="master-eyebrow">({number}) {label}</p><h2 className="font-display mt-4 text-5xl sm:text-7xl">{children}</h2></div>;
}

export function PrivateMasterHome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const navigateAnchor = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    if (!(event.target instanceof Element)) return;
    const id = event.target.closest<HTMLAnchorElement>('a[href^="#"]')?.getAttribute("href")?.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setMenuOpen(false);
    const top = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - 104;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    history.pushState(null, "", `#${id}`);
  };
  const moveReview = (direction: number) => {
    const track = reviewsRef.current;
    if (!track) return;
    const index = Math.max(0, Math.min(orderedReviews.length - 1, reviewIndex + direction));
    const card = track.children.item(index);
    if (!(card instanceof HTMLElement)) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <div className="master-home bg-background text-foreground" onClick={navigateAnchor}>
    <div className="master-glows" aria-hidden>{Array.from({ length: 12 }, (_, index) => <span key={index} className={`master-glow master-glow-${index % 4}`} />)}</div>
    <header className="master-header border-b border-border">
      <div className="master-container grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-3 font-medium"><Cable className="h-7 w-7 shrink-0" aria-hidden /><span className="min-w-0"><span className="block truncate">Михаил Ларионов</span><span className="block text-xs text-muted-foreground">Мастер по Электрике · Москва</span></span></a>
        <nav aria-label="Разделы главной" className="hidden items-center gap-6 xl:flex">{navigation.map(([id, label]) => <a className="text-sm text-muted-foreground transition-colors hover:text-foreground" key={id} href={`#${id}`}>{label}</a>)}</nav>
        <div className="flex gap-2"><MasterContact kind="phone" variant="outline" className="hidden rounded-full sm:inline-flex" />
          <Button aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} variant="ghost" size="icon" className="xl:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </div>
      {menuOpen && <nav aria-label="Мобильное меню" className="master-container grid grid-cols-2 gap-5 py-6 xl:hidden">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
    </header>
    <main id="top">
      <section className="master-hero master-container">
        <div className="master-hero-copy">
          <p className="master-eyebrow">Частный мастер · Москва</p>
          <h1 className="font-display mt-7 text-6xl sm:text-7xl lg:text-8xl">Электрика<br /><span className="italic">от Частного<br />Мастера</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">Электрика, сантехника и помощь по дому.<br />От диагностики до новой проводки в квартире.</p>
          <div className="mt-9 flex flex-wrap gap-3"><MasterContact kind="telegram" className="h-14 rounded-full px-6 text-base" /><MasterContact kind="phone" variant="outline" className="h-14 rounded-full px-6 text-base" /></div>
          <a href="#about" className="mt-12 inline-flex items-center gap-3 text-sm text-muted-foreground"><ArrowDown className="h-4 w-4" aria-hidden />Познакомимся</a>
        </div>
        <figure className="master-portrait"><img src={masterPhoto.url} width={432} height={768} fetchPriority="high" alt="Михаил рядом с установленными сантехническими коммуникациями" /><figcaption className="mt-4 text-sm sm:text-base">Михаил • Профессиональный электрик 5 категории</figcaption></figure>
      </section>
      <section id="about" className="master-section master-container border-t border-border">
        <div className="mb-12 text-center"><Heading number="01" label="О мастере">Немного <span className="italic">про себя</span></Heading><p className="-mt-4 text-lg text-muted-foreground">Для понимания, с кем будете работать</p></div>
        <div className="master-facts-layout">
          <figure className="master-facts-photo"><img src={masterPhoto.url} width={432} height={768} loading="lazy" alt="Частный мастер Михаил на объекте" className="h-full w-full rounded-lg object-cover" /><figcaption className="sr-only">Михаил • Профессиональный электрик 5 категории</figcaption></figure>
          {facts.map(({ title, text, icon: Icon }, index) => <article key={title} className={`master-fact master-fact-${index + 1} flex flex-col rounded-lg border border-border bg-card p-6`}><p className="text-xs text-muted-foreground">Факт #{index + 1}</p><h3 className="mt-5 text-xl font-medium">{title}</h3><p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{text}</p><Icon className="mt-auto h-7 w-7 pt-0" aria-hidden /></article>)}
        </div>
      </section>
      <section id="prices" className="master-section border-y border-border bg-card"><SectionGlows /><div className="master-container">
        <Heading number="02" label="Стоимость">Прайс<span className="italic">-лист</span></Heading>
        <p className="mb-12 max-w-xl leading-relaxed text-muted-foreground">Стоимость зависит от объёма работ, материала стен и сложности монтажа. Обсудим вашу задачу и рассчитаем цену.</p>
        <div className="space-y-6">{priceServices.map(({ title, description, icon: Icon }) => <article key={title} className="master-price-row rounded-lg border border-border bg-background p-7 sm:p-9"><div className="flex items-center justify-center"><Icon className="h-24 w-24 sm:h-32 sm:w-32" strokeWidth={1} aria-hidden /></div><div><p className="mb-4 text-sm text-muted-foreground">{description}</p><h3 className="text-2xl leading-snug sm:text-3xl">{title}</h3></div><div className="master-price-action flex flex-col items-start gap-4"><p className="text-xl sm:text-2xl">По согласованию</p><p className="text-sm text-muted-foreground">Зависит от объёма работ</p><Button asChild className="mt-auto h-12 rounded-full px-6"><a href="#contact">Заказать<ArrowUpRight aria-hidden /></a></Button></div></article>)}</div>
        <div className="mt-9 flex justify-center"><Dialog><DialogTrigger asChild><Button variant="outline" className="h-14 rounded-full px-6 text-base"><List aria-hidden />Полный перечень услуг</Button></DialogTrigger><DialogContent className="max-h-[85svh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg p-6 sm:p-8"><DialogTitle className="pr-6 text-2xl">Полный перечень услуг</DialogTitle><DialogDescription>Электрика в квартирах и коммерческих помещениях</DialogDescription><ul className="mt-2 space-y-4">{fullServices.map(service => <li key={service} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base"><CircleCheck className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden /><span>{service}</span></li>)}</ul></DialogContent></Dialog></div>
      </div></section>
      <section id="steps" className="master-section master-container"><Heading number="03" label="Процесс">Как проходит <span className="italic">работа</span></Heading>
        <ol className="master-steps">{steps.map(([title, detail], index) => {
          const Icon = stepIcons[index];
          return <li className="master-step" key={title}><div className="master-step-top"><span className="master-step-icon">{Icon && <Icon className="h-7 w-7" aria-hidden />}</span><span className="text-sm text-muted-foreground">0{index + 1}</span></div><h3 className="mt-7 text-xl">{title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{detail}</p>{index < steps.length - 1 && <span className="master-step-arrow" aria-hidden />}</li>;
        })}</ol>
      </section>
      <section id="nuances" className="master-section master-container border-t border-border"><Heading number="04" label="Нюансы">Важные <span className="italic">детали</span></Heading>
        <div className="grid gap-10 md:grid-cols-2">{[["Работаю в Москве", "Выезд по городу. По Московской области не работаю."], ["Каждая задача индивидуальна", "Для оценки нужны объём работ, состояние коммуникаций и фотографии объекта."], ["Сначала согласование", "Материалы, доступ к помещению и дополнительные работы обсуждаем заранее."], ["Не прячусь за фирмой - работаю лично", "Я работаю и отвечаю за результат - лично. При этом есть проверенные спецы по плиткам, потолкам, мебели и пр."]].map(([title, text]) => <div key={title}><div className="master-detail-heading"><span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-contact-action text-contact-action-foreground"><Check className="h-5 w-5" strokeWidth={3} aria-hidden /></span><h3 className="min-w-0 text-xl">{title}</h3></div><p className="mt-4 leading-relaxed text-muted-foreground">{text}</p></div>)}</div>
      </section>
      {children}
      <section id="reviews" className="master-section master-container border-t border-border"><Heading number="06" label="Обратная связь">Отзывы <span className="italic">клиентов</span></Heading>
        <div ref={reviewsRef} className="master-reviews" onScroll={() => {
          const track = reviewsRef.current;
          const first = track?.firstElementChild;
          if (track && first instanceof HTMLElement) setReviewIndex(Math.round(track.scrollLeft / (first.offsetWidth + 24)));
        }}>{orderedReviews.map(({ name, date, text }) => <article key={name} className="rounded-lg border border-border bg-card p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-3"><h3 className="text-xl font-medium">{name}</h3><p className="text-sm text-muted-foreground">{date}</p></div><div className="my-5 flex gap-1 text-review-star" role="img" aria-label="5 из 5 звёзд">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-4 w-4 fill-current" aria-hidden />)}</div><p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">{text}</p></article>)}</div>
        <div className="mt-6 flex items-center justify-between md:hidden"><Button variant="outline" size="icon" aria-label="Предыдущий отзыв" disabled={reviewIndex === 0} onClick={() => moveReview(-1)}><ChevronLeft /></Button><span className="text-sm text-muted-foreground" aria-live="polite">{reviewIndex + 1} / {orderedReviews.length}</span><Button variant="outline" size="icon" aria-label="Следующий отзыв" disabled={reviewIndex === orderedReviews.length - 1} onClick={() => moveReview(1)}><ChevronRight /></Button></div>
        <div className="mt-10 flex justify-center"><MasterContact kind="telegram" variant="outline" className="h-14 rounded-full px-6">Оставить отзыв</MasterContact></div>
      </section>
      <section id="contact" className="master-section border-t border-border bg-card"><div className="master-container master-contact-layout"><figure className="master-contact-photo"><img src={masterPhoto.url} width={432} height={768} loading="lazy" alt="Михаил Ларионов — мастер по электрике в Москве" /></figure><div className="master-contact-copy"><Heading number="07" label="Контакты">Обсудим <span className="italic">вашу задачу?</span></Heading>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Расскажите, что нужно сделать. Пишите, звоните — буду рад Вам ответить.</p>
        <div className="mt-9 flex flex-wrap gap-4"><MasterContact kind="phone" className="h-14 rounded-full px-7 text-base">+7 916 799-12-16</MasterContact><MasterContact kind="telegram" variant="outline" className="h-14 rounded-full px-7 text-base" /></div>
        <div className="mt-7"><p className="text-base font-medium">Михаил</p><p className="mt-1 text-sm text-muted-foreground">Ваш Профессионал по Электрике</p></div>
      </div></div></section>
    </main>
    <footer className="master-container flex flex-wrap items-center justify-between gap-6 py-9 text-sm text-muted-foreground"><p>© 2026 Михаил · Электрика от Частного Мастера</p><a href="#top" className="inline-flex items-center gap-2">Наверх<ArrowUpRight className="h-4 w-4" aria-hidden /></a></footer>
  </div>;
}