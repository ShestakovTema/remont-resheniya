import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Cable, CircleCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterContact } from "./master-contact";
import masterPhoto from "@/assets/mikhail-master.webp.asset.json";

const navigation = [["about", "О мастере"], ["prices", "Прайс-лист"], ["steps", "Этапы"], ["nuances", "Нюансы"], ["process-photos", "Работы"], ["reviews", "Отзывы"]];
const services = [
  ["⛏️", "Штробление без пыли", "Штробление под электрику, сантехнику, вырезка розеток в стене БЕЗ ПЫЛИ 💯%."],
  ["🕳️", "Алмазное бурение", "Алмазное бурение под ваши нужды."],
  ["🛠️", "Помощь по дому", "Частный мастер, помощь и консультация, сборка мебели, мелкий ремонт."],
  ["👷", "Электрика", "Электрик 5 категорий, диагностика и устранение неисправностей."],
  ["🧑‍🔧", "Сантехника", "Сантехника, замена и установка."],
  ["⛏️", "Обслуживание помещений", "Техническое обслуживание коммерческих помещений."],
];
const steps = [
  ["Обсуждаем задачу", "Расскажите, что нужно сделать, и пришлите фотографии в Telegram."],
  ["Уточняем объём", "Определяем точки, материалы и особенности помещения."],
  ["Согласовываем стоимость", "До начала работ обсуждаем состав работ, стоимость и сроки."],
  ["Выполняем и проверяем", "После монтажа проверяем результат и отвечаем на ваши вопросы."],
];

function Heading({ number, label, children }: { number: string; label: string; children: ReactNode }) {
  return <div className="mb-10"><p className="master-eyebrow">({number}) {label}</p><h2 className="font-display mt-4 text-5xl sm:text-7xl">{children}</h2></div>;
}

export function PrivateMasterHome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="master-home bg-background text-foreground">
    <header className="master-header border-b border-border">
      <div className="master-container flex min-h-20 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 font-medium"><Cable className="h-7 w-7" aria-hidden /><span>Частный мастер<br /><span className="text-xs text-muted-foreground">Михаил · Москва</span></span></a>
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
          <h1 className="font-display mt-7 text-6xl sm:text-7xl lg:text-8xl">Замена проводки<br /><span className="italic">от Частного<br />Мастера</span></h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">Электрика, сантехника и помощь по дому.<br />От диагностики до новой проводки в квартире.</p>
          <div className="mt-9 flex flex-wrap gap-3"><MasterContact kind="telegram" className="h-14 rounded-full px-6 text-base" /><MasterContact kind="phone" variant="outline" className="h-14 rounded-full px-6 text-base" /></div>
          <a href="#about" className="mt-12 inline-flex items-center gap-3 text-sm text-muted-foreground"><ArrowDown className="h-4 w-4" aria-hidden />Познакомимся</a>
        </div>
        <figure className="master-portrait"><img src={masterPhoto.url} width={432} height={768} fetchPriority="high" alt="Михаил рядом с установленными сантехническими коммуникациями" /><figcaption className="mt-4 text-sm sm:text-base">Михаил • Электрик 5 категории</figcaption></figure>
      </section>
      <section id="about" className="master-section master-container border-t border-border">
        <Heading number="01" label="О мастере">Добрый день👋,<br /><span className="italic">меня зовут Миша🙂.</span></Heading>
        <p className="mb-12 text-xl">✨ 12 лет в Строительстве ✨.</p>
        <p className="mb-7 text-lg text-muted-foreground">Работаю по таким направлениям:</p>
        <div className="grid gap-x-12 md:grid-cols-2">{services.map(([emoji, title, description]) => <article key={title} className="flex gap-5 border-t border-border py-7"><span className="text-2xl" aria-hidden>{emoji}</span><div><h3 className="text-xl">{title}</h3><p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{description}</p></div></article>)}</div>
        <p className="mt-8 text-lg">✨Пишите, звоните, буду рад Вам ответить. ✨.</p>
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3">
          {[['12', 'лет в строительстве'], ['5', 'категория электрика'], ['6', 'направлений работы']].map(([value, label]) => <div key={label}><p className="font-display text-7xl">{value}</p><p className="mt-3 text-muted-foreground">{label}</p></div>)}
        </div>
      </section>
      <section id="prices" className="master-section border-y border-border bg-card"><div className="master-container">
        <Heading number="02" label="Стоимость">Прайс<span className="italic">-лист</span></Heading>
        <div className="flex flex-col gap-4 border-b border-border pb-7 md:flex-row md:justify-between"><p className="max-w-xl leading-relaxed text-muted-foreground">Стоимость зависит от объёма работ, материала стен и сложности монтажа. Обсудим вашу задачу и рассчитаем цену.</p><MasterContact kind="telegram" variant="outline" className="h-12 rounded-full px-6" >Узнать стоимость</MasterContact></div>
        <dl>{services.map(([, title]) => <div key={title} className="flex flex-wrap justify-between gap-3 border-b border-border py-6"><dt className="text-lg">{title}</dt><dd className="text-muted-foreground">По согласованию</dd></div>)}</dl>
      </div></section>
      <section id="steps" className="master-section master-container"><Heading number="03" label="Процесс">Как проходит <span className="italic">работа</span></Heading>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([title, detail], index) => <article className="border-t border-border pt-6" key={title}><p className="font-display text-5xl text-muted-foreground">0{index + 1}</p><h3 className="mt-6 text-xl">{title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{detail}</p></article>)}</div>
      </section>
      <section id="nuances" className="master-section master-container border-t border-border"><Heading number="04" label="Нюансы">Важные <span className="italic">детали</span></Heading>
        <div className="grid gap-10 md:grid-cols-3">{[["Работаю в Москве", "Выезд по городу. По Московской области не работаю."], ["Каждая задача индивидуальна", "Для оценки нужны объём работ, состояние коммуникаций и фотографии объекта."], ["Сначала согласование", "Материалы, доступ к помещению и дополнительные работы обсуждаем заранее."]].map(([title, text]) => <div key={title}><CircleCheck className="mb-5 h-6 w-6" aria-hidden /><h3 className="text-xl">{title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{text}</p></div>)}</div>
      </section>
      {children}
      <section id="reviews" className="master-section master-container border-t border-border"><Heading number="06" label="Обратная связь">Отзывы <span className="italic">клиентов</span></Heading>
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center"><p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Выполнял для вас работу? Буду рад вашему отзыву — напишите мне в Telegram.</p><MasterContact kind="telegram" variant="outline" className="h-14 rounded-full px-6">Оставить отзыв</MasterContact></div>
      </section>
      <section id="contact" className="master-section border-t border-border bg-card"><div className="master-container"><Heading number="07" label="Контакты">Обсудим <span className="italic">вашу задачу?</span></Heading>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Расскажите, что нужно сделать. Пишите, звоните — буду рад Вам ответить.</p>
        <div className="mt-9 flex flex-wrap gap-4"><MasterContact kind="phone" className="h-14 rounded-full px-7 text-base">+7 916 799-12-16</MasterContact><MasterContact kind="telegram" variant="outline" className="h-14 rounded-full px-7 text-base" /></div>
        <p className="mt-7 text-sm text-muted-foreground">Михаил · Частный мастер · Москва</p>
      </div></section>
    </main>
    <footer className="master-container flex flex-wrap items-center justify-between gap-6 py-9 text-sm text-muted-foreground"><p>© 2026 Михаил · Замена проводки от Частного Мастера</p><a href="#top" className="inline-flex items-center gap-2">Наверх<ArrowUpRight className="h-4 w-4" aria-hidden /></a></footer>
  </div>;
}