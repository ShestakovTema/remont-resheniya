import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "tr" | "zh" | "ar";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.work": "Work",
  "nav.studio": "Studio",
  "nav.services": "Services",
  "nav.process": "Process",
  "nav.contact": "Contact",
  "nav.cta": "Start a project",

  "hero.badge": "Luxury Digital Experience Studio · Est. 2018",
  "hero.h1.a": "Crafting Digital",
  "hero.h1.b": "Experiences That",
  "hero.h1.c": "Feel Luxury.",
  "hero.sub":
    "We design and build immersive websites for hospitality, resorts, luxury restaurants, and premium brands — engineered for storytelling, speed, and quiet confidence.",
  "hero.cta.projects": "View Projects",
  "hero.cta.contact": "Let's work together",
  "hero.scroll": "Scroll to explore",
  "hero.cities": "Working worldwide",

  "marquee.1": "Hospitality",
  "marquee.2": "Resorts",
  "marquee.3": "Restaurants",
  "marquee.4": "Beach Clubs",
  "marquee.5": "Wellness",
  "marquee.6": "Private Villas",
  "marquee.7": "Yachting",
  "marquee.8": "Fine Dining",

  "work.section": "(01) Selected Work",
  "work.h.a": "A quiet portfolio",
  "work.h.b": "of loud results.",
  "work.desc":
    "Ten years of collaboration with hospitality and hospitality-adjacent brands that treat the web as a first impression.",

  "about.section": "(02) The Studio",
  "about.h.a": "We are an independent studio",
  "about.h.b": "obsessed with the frame before the click,",
  "about.h.c": "and the second after.",
  "about.p1":
    "We partner with hospitality, resort, restaurant and lifestyle brands to build digital experiences that mirror the quality of the physical one — considered composition, cinematic motion, and quiet performance under load.",
  "about.p2":
    "Every project is led end-to-end by the founders. No juniors staffed to your brand, no template thinking. Just two frames of the same picture — the one you want the world to see, and the one that makes it feel real.",
  "about.stat.1": "years crafting the web",
  "about.stat.2": "shipped luxury projects",
  "about.stat.3": "hospitality brands",
  "about.stat.4": "design awards",

  "services.section": "(03) Services",
  "services.h.a": "Six disciplines,",
  "services.h.b": "one point of view.",
  "services.1.t": "Luxury Website Design",
  "services.1.d": "Editorial art direction, typography systems and motion language.",
  "services.2.t": "Development",
  "services.2.d": "Bespoke Next.js/React builds with 60fps interaction and CMS integrations.",
  "services.3.t": "UI / UX",
  "services.3.d": "Booking flows and journeys that convert without breaking character.",
  "services.4.t": "Creative Direction",
  "services.4.d": "Long-form partnership from moodboard to launch film.",
  "services.5.t": "Brand Experiences",
  "services.5.d": "Digital lookbooks, launch microsites, seasonal editorials.",
  "services.6.t": "Motion Design",
  "services.6.d": "Scroll-linked cinema, cursor language, transitions with intent.",

  "process.section": "(04) Process",
  "process.h": "Five deliberate steps.",
  "process.1.t": "Discover",
  "process.1.d": "Immersion in the brand, guests, competitors and constraints.",
  "process.2.t": "Design",
  "process.2.d": "Editorial art direction, motion language and prototype.",
  "process.3.t": "Prototype",
  "process.3.d": "Interactive proof of the experience in the real device.",
  "process.4.t": "Develop",
  "process.4.d": "Bespoke code, CMS, performance and accessibility engineering.",
  "process.5.t": "Launch",
  "process.5.d": "Quiet handover, measured rollout, ongoing partnership.",

  "test.section": "(05) Testimonials",
  "test.1.q":
    "Two Frame Studio designed a site that finally feels like arriving at the property. Bookings jumped, and so did the mood of every email we get.",
  "test.1.r": "Brand Director, Coastal Resort",
  "test.2.q":
    "They approach a homepage the way a director approaches an opening scene. Everything on our site now has intent.",
  "test.2.r": "Founder, Restaurant Group",
  "test.3.q":
    "Cinematic without ever being loud. The kind of restraint we spent months briefing other studios on — Two Frame Studio just knew.",
  "test.3.r": "Marketing Lead, Boutique Hotel",

  "contact.section": "(06) Let's talk",
  "contact.h.a": "Let's build",
  "contact.h.b": "something",
  "contact.h.c": "exceptional.",
  "contact.desc":
    "We're currently accepting new partnerships for Q3 and Q4 2026. Tell us about your brand and where you want to take it.",
  "contact.email.label": "Email · write us",
  "contact.whatsapp.label": "WhatsApp · opens chat",
  "contact.copied": "Copied!",
  "contact.opened": "Opened!",

  "footer.desc": "A luxury digital experience studio. Working worldwide.",
  "footer.rights": "All rights reserved",
  "footer.gallery": "Studio",
  "footer.contact": "Contact",
  "footer.legal": "Legal",
  "footer.studioLead": "Studio Lead",
  "footer.leadName": "Daniel Carter",
};

const tr: Dict = {
  "nav.work": "Projeler",
  "nav.studio": "Stüdyo",
  "nav.services": "Hizmetler",
  "nav.process": "Süreç",
  "nav.contact": "İletişim",
  "nav.cta": "Projeye başla",

  "hero.badge": "Lüks Dijital Deneyim Stüdyosu · Kuruluş 2018",
  "hero.h1.a": "Lüks hissini",
  "hero.h1.b": "yaşatan dijital",
  "hero.h1.c": "deneyimler.",
  "hero.sub":
    "Otelcilik, resort, lüks restoran ve prestijli markalar için sürükleyici siteler tasarlıyor ve inşa ediyoruz — hikaye, hız ve sessiz bir özgüven için üretilmiş.",
  "hero.cta.projects": "Projeleri gör",
  "hero.cta.contact": "Birlikte çalışalım",
  "hero.scroll": "Keşfetmek için kaydırın",
  "hero.cities": "Dünya genelinde çalışıyoruz",

  "marquee.1": "Otelcilik",
  "marquee.2": "Resortlar",
  "marquee.3": "Restoranlar",
  "marquee.4": "Beach Club",
  "marquee.5": "Wellness",
  "marquee.6": "Özel Villalar",
  "marquee.7": "Yatçılık",
  "marquee.8": "Fine Dining",

  "work.section": "(01) Seçilmiş Projeler",
  "work.h.a": "Sessiz bir portföy,",
  "work.h.b": "gürültülü sonuçlar.",
  "work.desc":
    "Web'i ilk izlenim olarak gören otelcilik ve yakın markalarla on yıllık bir iş birliği.",

  "about.section": "(02) Stüdyo",
  "about.h.a": "Biz bağımsız bir stüdyoyuz,",
  "about.h.b": "tıklamadan önceki kareye,",
  "about.h.c": "ve sonraki saniyeye takıntılı.",
  "about.p1":
    "Otelcilik, resort, restoran ve lifestyle markalarıyla, fiziksel deneyimin kalitesini yansıtan dijital deneyimler kuruyoruz — özenli kompozisyon, sinematik hareket ve yük altında sessiz bir performans.",
  "about.p2":
    "Her proje baştan sona kurucular tarafından yönetilir. Markanıza atanan junior yok, şablon düşünce yok. Sadece aynı fotoğrafın iki karesi — dünyaya göstermek istediğiniz ve onu gerçek kılan.",
  "about.stat.1": "yıllık web deneyimi",
  "about.stat.2": "teslim edilen lüks proje",
  "about.stat.3": "otelcilik markası",
  "about.stat.4": "tasarım ödülü",

  "services.section": "(03) Hizmetler",
  "services.h.a": "Altı disiplin,",
  "services.h.b": "tek bir bakış.",
  "services.1.t": "Lüks Web Tasarımı",
  "services.1.d": "Editöryel sanat yönetimi, tipografi sistemleri ve hareket dili.",
  "services.2.t": "Geliştirme",
  "services.2.d": "Next.js/React ile özel yapımlar, 60fps etkileşim ve CMS entegrasyonları.",
  "services.3.t": "UI / UX",
  "services.3.d": "Karakteri bozmadan dönüştüren rezervasyon akışları.",
  "services.4.t": "Kreatif Yönetim",
  "services.4.d": "Moodboard'dan lansman filmine uzun soluklu ortaklık.",
  "services.5.t": "Marka Deneyimleri",
  "services.5.d": "Dijital lookbook'lar, lansman mikro siteleri, sezonluk yayınlar.",
  "services.6.t": "Motion Tasarımı",
  "services.6.d": "Scroll'a bağlı sinema, imleç dili, niyetli geçişler.",

  "process.section": "(04) Süreç",
  "process.h": "Beş özenli adım.",
  "process.1.t": "Keşif",
  "process.1.d": "Markaya, misafirlere, rakiplere ve kısıtlara dalış.",
  "process.2.t": "Tasarım",
  "process.2.d": "Editöryel sanat yönetimi, hareket dili ve prototip.",
  "process.3.t": "Prototip",
  "process.3.d": "Deneyimin gerçek cihazda interaktif kanıtı.",
  "process.4.t": "Geliştirme",
  "process.4.d": "Özel kod, CMS, performans ve erişilebilirlik mühendisliği.",
  "process.5.t": "Lansman",
  "process.5.d": "Sessiz teslim, ölçülü çıkış, devam eden ortaklık.",

  "test.section": "(05) Yorumlar",
  "test.1.q":
    "Two Frame Studio, sonunda mülke varış hissini veren bir site tasarladı. Rezervasyonlar arttı, aldığımız her e-postanın havası da.",
  "test.1.r": "Marka Direktörü, Sahil Resort",
  "test.2.q":
    "Ana sayfaya bir yönetmenin açılış sahnesine yaklaştığı gibi yaklaşıyorlar. Sitedeki her şeyin artık bir niyeti var.",
  "test.2.r": "Kurucu, Restoran Grubu",
  "test.3.q":
    "Hiç yüksek sesli olmadan sinematik. Aylarca diğer stüdyolara anlattığımız bu ölçü — Two Frame Studio zaten biliyordu.",
  "test.3.r": "Pazarlama Lideri, Butik Otel",

  "contact.section": "(06) Konuşalım",
  "contact.h.a": "Birlikte",
  "contact.h.b": "istisnai bir şey",
  "contact.h.c": "inşa edelim.",
  "contact.desc":
    "Şu anda 2026 3. ve 4. çeyrek için yeni iş birliklerine açığız. Markanızı ve onu nereye taşımak istediğinizi anlatın.",
  "contact.email.label": "E-posta · bize yazın",
  "contact.whatsapp.label": "WhatsApp · sohbeti açar",
  "contact.copied": "Kopyalandı!",
  "contact.opened": "Açıldı!",

  "footer.desc": "Lüks bir dijital deneyim stüdyosu. Dünya genelinde çalışıyoruz.",
  "footer.rights": "Tüm hakları saklıdır",
  "footer.gallery": "Stüdyo",
  "footer.contact": "İletişim",
  "footer.legal": "Yasal",
  "footer.studioLead": "Stüdyo Lideri",
  "footer.leadName": "Daniel Carter",
};

const zh: Dict = {
  "nav.work": "作品",
  "nav.studio": "工作室",
  "nav.services": "服务",
  "nav.process": "流程",
  "nav.contact": "联系",
  "nav.cta": "开启项目",

  "hero.badge": "奢华数字体验工作室 · 创立于 2018",
  "hero.h1.a": "打造沉浸的",
  "hero.h1.b": "数字体验",
  "hero.h1.c": "触感如奢。",
  "hero.sub":
    "我们为酒店、度假村、高端餐饮与奢华品牌设计与开发沉浸式网站——为叙事、速度与从容的自信而生。",
  "hero.cta.projects": "查看项目",
  "hero.cta.contact": "与我们合作",
  "hero.scroll": "向下滚动探索",
  "hero.cities": "服务全球",

  "marquee.1": "酒店",
  "marquee.2": "度假村",
  "marquee.3": "餐厅",
  "marquee.4": "海滩俱乐部",
  "marquee.5": "健康疗养",
  "marquee.6": "私人别墅",
  "marquee.7": "游艇",
  "marquee.8": "精致料理",

  "work.section": "(01) 精选作品",
  "work.h.a": "沉静的作品集,",
  "work.h.b": "响亮的成果。",
  "work.desc":
    "十年与将网站视为第一印象的酒店与相关品牌合作。",

  "about.section": "(02) 关于工作室",
  "about.h.a": "我们是一间独立工作室,",
  "about.h.b": "执着于点击前的画面,",
  "about.h.c": "以及点击后的那一秒。",
  "about.p1":
    "我们与酒店、度假村、餐厅及生活方式品牌合作,打造与实体体验同样精致的数字体验——考究的构图、电影般的动态,以及负载下的从容表现。",
  "about.p2":
    "每个项目都由创始人从头至尾亲自主导。没有指派给品牌的初级设计师,没有模板式的思维。只有同一幅画的两帧——你想让世界看到的,以及让它显得真实的那一帧。",
  "about.stat.1": "年网站打造经验",
  "about.stat.2": "交付的奢华项目",
  "about.stat.3": "酒店品牌",
  "about.stat.4": "设计奖项",

  "services.section": "(03) 服务",
  "services.h.a": "六项专业,",
  "services.h.b": "同一视角。",
  "services.1.t": "奢华网站设计",
  "services.1.d": "编辑式艺术指导、字体系统与动态语言。",
  "services.2.t": "开发",
  "services.2.d": "定制 Next.js / React 构建,60fps 交互与 CMS 集成。",
  "services.3.t": "UI / UX",
  "services.3.d": "既能转化又不破坏格调的预订流程与旅程。",
  "services.4.t": "创意指导",
  "services.4.d": "从情绪板到发布短片的长期伙伴关系。",
  "services.5.t": "品牌体验",
  "services.5.d": "数字 lookbook、发布微站与季节性专题。",
  "services.6.t": "动态设计",
  "services.6.d": "与滚动同步的影像、光标语言、有意的过渡。",

  "process.section": "(04) 流程",
  "process.h": "五个从容的步骤。",
  "process.1.t": "洞察",
  "process.1.d": "深入品牌、宾客、竞争与限制。",
  "process.2.t": "设计",
  "process.2.d": "编辑式艺术指导、动态语言与原型。",
  "process.3.t": "原型",
  "process.3.d": "在真实设备上对体验的交互式验证。",
  "process.4.t": "开发",
  "process.4.d": "定制代码、CMS、性能与可访问性工程。",
  "process.5.t": "上线",
  "process.5.d": "从容交付、审慎发布、持续合作。",

  "test.section": "(05) 客户评价",
  "test.1.q":
    "Two Frame Studio 打造的网站,终于让人感觉像抵达度假地。预订量攀升,收到的每一封邮件的语气也变了。",
  "test.1.r": "品牌总监,海岸度假村",
  "test.2.q":
    "他们对待首页就像导演对待开场戏。现在,网站上每一处都有意图。",
  "test.2.r": "创始人,餐厅集团",
  "test.3.q":
    "极具电影感,却从不喧哗。这种克制,我们向其他工作室反复解释了几个月——Two Frame Studio 一开始就懂。",
  "test.3.r": "市场负责人,精品酒店",

  "contact.section": "(06) 让我们聊聊",
  "contact.h.a": "让我们打造",
  "contact.h.b": "一件",
  "contact.h.c": "非凡的作品。",
  "contact.desc":
    "我们正接受 2026 年 Q3 与 Q4 的新合作。告诉我们您的品牌,以及您希望把它带向何处。",
  "contact.email.label": "邮箱 · 写信给我们",
  "contact.whatsapp.label": "WhatsApp · 打开聊天",
  "contact.copied": "已复制!",
  "contact.opened": "已打开!",

  "footer.desc": "一间奢华数字体验工作室。服务全球。",
  "footer.rights": "版权所有",
  "footer.gallery": "工作室",
  "footer.contact": "联系",
  "footer.legal": "法律",
  "footer.studioLead": "工作室主理",
  "footer.leadName": "Daniel Carter",
};

const ar: Dict = {
  "nav.work": "الأعمال",
  "nav.studio": "الاستوديو",
  "nav.services": "الخدمات",
  "nav.process": "المنهجية",
  "nav.contact": "تواصل",
  "nav.cta": "ابدأ مشروعًا",

  "hero.badge": "استوديو تجارب رقمية فاخرة · تأسّس 2018",
  "hero.h1.a": "نصنع تجارب",
  "hero.h1.b": "رقمية بإحساس",
  "hero.h1.c": "الفخامة.",
  "hero.sub":
    "نصمّم ونطوّر مواقع غامرة للفنادق والمنتجعات والمطاعم الراقية والعلامات التجارية الفاخرة — مصممة للسرد والسرعة والثقة الهادئة.",
  "hero.cta.projects": "استعراض المشاريع",
  "hero.cta.contact": "لنعمل معًا",
  "hero.scroll": "مرّر للاستكشاف",
  "hero.cities": "نعمل حول العالم",

  "marquee.1": "الضيافة",
  "marquee.2": "المنتجعات",
  "marquee.3": "المطاعم",
  "marquee.4": "نوادي الشاطئ",
  "marquee.5": "العافية",
  "marquee.6": "الفلل الخاصة",
  "marquee.7": "اليخوت",
  "marquee.8": "المطاعم الفاخرة",

  "work.section": "(01) أعمال مختارة",
  "work.h.a": "معرض هادئ",
  "work.h.b": "بنتائج صاخبة.",
  "work.desc":
    "عشر سنوات من التعاون مع علامات الضيافة التي ترى في الويب انطباعًا أول.",

  "about.section": "(02) الاستوديو",
  "about.h.a": "نحن استوديو مستقل،",
  "about.h.b": "مهووس بالكادر قبل النقرة،",
  "about.h.c": "وبالثانية التي تليها.",
  "about.p1":
    "نتعاون مع علامات الفنادق والمنتجعات والمطاعم ونمط الحياة لبناء تجارب رقمية تعكس جودة التجربة الواقعية — تكوين مدروس، حركة سينمائية، وأداء هادئ تحت الضغط.",
  "about.p2":
    "يقود كل مشروع المؤسسون من البداية إلى النهاية. لا مبتدئون على علامتك، ولا تفكير قوالب. فقط كادران من الصورة نفسها — الذي تريد أن يراه العالم، والذي يجعلها حقيقية.",
  "about.stat.1": "سنوات في صناعة الويب",
  "about.stat.2": "مشروع فاخر منجز",
  "about.stat.3": "علامة ضيافة",
  "about.stat.4": "جائزة تصميم",

  "services.section": "(03) الخدمات",
  "services.h.a": "ستّ تخصصات،",
  "services.h.b": "وجهة نظر واحدة.",
  "services.1.t": "تصميم مواقع فاخرة",
  "services.1.d": "إخراج فني تحريري، أنظمة طباعية ولغة حركة.",
  "services.2.t": "التطوير",
  "services.2.d": "بناء مخصّص بـ Next.js / React بتفاعل 60fps وتكاملات CMS.",
  "services.3.t": "UI / UX",
  "services.3.d": "رحلات حجز تحوّل دون كسر الشخصية.",
  "services.4.t": "الإخراج الإبداعي",
  "services.4.d": "شراكة طويلة الأمد من لوح الإلهام إلى فيلم الإطلاق.",
  "services.5.t": "تجارب العلامة",
  "services.5.d": "كتيّبات رقمية، مواقع إطلاق مصغّرة، إصدارات موسمية.",
  "services.6.t": "تصميم الحركة",
  "services.6.d": "سينما متزامنة مع التمرير، لغة للمؤشر، انتقالات بنيّة.",

  "process.section": "(04) المنهجية",
  "process.h": "خمس خطوات متأنّية.",
  "process.1.t": "الاكتشاف",
  "process.1.d": "انغماس في العلامة والضيوف والمنافسين والقيود.",
  "process.2.t": "التصميم",
  "process.2.d": "إخراج فني تحريري، لغة حركة ونموذج أوّلي.",
  "process.3.t": "النموذج الأوّلي",
  "process.3.d": "إثبات تفاعلي للتجربة على الجهاز الفعلي.",
  "process.4.t": "التطوير",
  "process.4.d": "كود مخصّص، CMS، هندسة أداء وإتاحة.",
  "process.5.t": "الإطلاق",
  "process.5.d": "تسليم هادئ، طرح مدروس، شراكة مستمرة.",

  "test.section": "(05) شهادات",
  "test.1.q":
    "صمّم Two Frame Studio موقعًا يمنح أخيرًا شعور الوصول إلى المنتجع. ارتفعت الحجوزات، وارتفع مزاج كل بريد نستقبله.",
  "test.1.r": "مديرة العلامة، منتجع ساحلي",
  "test.2.q":
    "يتعاملون مع الصفحة الرئيسية كما يتعامل مخرج مع مشهد الافتتاح. كل شيء على موقعنا اليوم له نية واضحة.",
  "test.2.r": "المؤسس، مجموعة مطاعم",
  "test.3.q":
    "سينمائي دون أن يكون صاخبًا أبدًا. هذا الانضباط الذي أمضينا شهورًا في شرحه لاستوديوهات أخرى — Two Frame Studio عرفه ببساطة.",
  "test.3.r": "قائدة تسويق، فندق بوتيك",

  "contact.section": "(06) لنتحدّث",
  "contact.h.a": "لنبنِ",
  "contact.h.b": "شيئًا",
  "contact.h.c": "استثنائيًا.",
  "contact.desc":
    "نستقبل حاليًا شراكات جديدة للربعين الثالث والرابع من 2026. أخبرنا عن علامتك وإلى أين تريد أن تأخذها.",
  "contact.email.label": "البريد · راسلنا",
  "contact.whatsapp.label": "WhatsApp · افتح المحادثة",
  "contact.copied": "تم النسخ!",
  "contact.opened": "تم الفتح!",

  "footer.desc": "استوديو تجارب رقمية فاخرة. نعمل حول العالم.",
  "footer.rights": "جميع الحقوق محفوظة",
  "footer.gallery": "الاستوديو",
  "footer.contact": "تواصل",
  "footer.legal": "قانوني",
  "footer.studioLead": "قائد الاستوديو",
  "footer.leadName": "Daniel Carter",
};

const DICTS: Record<Lang, Dict> = { en, tr, zh, ar };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("tf-lang") as Lang | null) : null;
    if (saved === "en" || saved === "tr" || saved === "zh" || saved === "ar") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("tf-lang", l);
      document.documentElement.lang = l;
      // Keep layout LTR — Arabic text still renders RTL naturally inside its
      // own containers. Flipping the whole document breaks absolute-positioned
      // decor, the hero showcase, marquee, and grid direction tricks.
      document.documentElement.dir = "ltr";
    } catch {}
  };
  const t = (k: string) => DICTS[lang][k] ?? DICTS.en[k] ?? k;
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
export const useT = () => useContext(LangCtx).t;