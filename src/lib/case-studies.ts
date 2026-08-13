
import { regisseurAssets } from "./regisseur-assets";

export const eliteCaseStudies = [
  {
    title: "ЖК «Режиссёр», 105 м²",
    type: "Современный ремонт",
    year: "В работе · 2025-2026",
    desc: "Квартира 105 м² в состоянии «от застройщика». Требовалось выполнить полный комплекс инженерии и подготовки под чистовую отделку: спроектировать и смонтировать электрику на 118 линий с двумя щитами, развести сантехнику с коллекторными узлами, смонтировать водяной тёплый пол в трёх зонах, возвести перегородки, выполнить стяжку с шумоизоляцией и штукатурку стен под покраску по маякам с геометрией в 1 мм.",
    work: [
      "Штробление, прокладка кабеля, сборка и подключение двух щитов",
      "Разводка ХВС/ГВС и канализации, коллекторы, установка приборов",
      "Водяной тёплый пол, опрессовка и балансировка контуров",
      "Перегородки, стяжка с шумоизоляцией, гидроизоляция мокрых зон",
      "Штукатурка и шпаклёвка стен и потолков под покраску",
      "Координация мебельщиков и потолочников через партнёров"
    ],
    area: "105 м²",
    time: "3,5 месяца",
    assets: (regisseurAssets.length > 0 ? regisseurAssets : [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1603988492906-4fb0fb251cb8?auto=format&fit=crop&q=80&w=800"
    ]).slice(0, 9)
  },
  {
    title: "Современный ремонт на Арбате",
    type: "Электрика и сантехника",
    year: "Сдан · 2025",
    desc: "Полная замена всех инженерных сетей в историческом фонде. Сложность заключалась в бережном демонтаже старых коммуникаций и усилении перекрытий перед монтажом новых систем.",
    work: [
      "Демонтаж до кирпичного основания",
      "Замена стояков и радиаторов отопления",
      "Полная замена электропроводки",
      "Монтаж коллекторного узла сантехники",
      "Штукатурка стен по маякам",
      "Подготовка поверхностей под высококачественную покраску"
    ],
    area: "85 м²",
    time: "4 месяца",
    assets: [
      arbatAsset.url,
      "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Апартаменты в Хамовниках",
    type: "Перепланировка",
    year: "Сдан · 2024",
    desc: "Проект по созданию открытого пространства с зонированием через световые сценарии и перепланировку. Особое внимание уделено шумоизоляции и скрытым системам вентиляции.",
    work: [
      "Возведение перегородок из ПГП",
      "Монтаж системы 'Умный дом' (свет, шторы, климат)",
      "Скрытая разводка сантехники и отопления",
      "Устройство наливного пола с шумоизоляцией",
      "Высококачественная отделка под покраску",
      "Монтаж скрытых люков и систем хранения"
    ],
    area: "120 м²",
    time: "5 месяцев",
    assets: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

export const newBuildingCaseStudies = [
  {
    title: "ЖК «Зиларт» — Инженерные системы",
    type: "Новостройка",
    year: "Сдан · 2024",
    desc: "Комплексная подготовка квартиры под чистовую отделку. Необходимо было выполнить возведение межкомнатных перегородок из пазогребневых плит, полную разводку электросети (более 80 точек), монтаж системы водоснабжения с установкой системы защиты от протечек и качественную штукатурку стен под покраску.",
    work: [
      "Монтаж перегородок с соблюдением геометрии углов 90°",
      "Прокладка кабелей ГОСТ в гофре, сборка силового щита",
      "Разводка труб Rehau, установка инсталляций, фильтров очистки",
      "Механизированная штукатурка стен и шпаклевка в 3 слоя",
      "Шумоизоляция пола перед заливкой стяжки"
    ],
    area: "78 м²",
    time: "2,5 месяца",
    assets: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582408921715-18e7826363bb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "ЖК «Сердце Столицы»",
    type: "Новостройка",
    year: "Сдан · 2024",
    desc: "Монтаж инженерных систем в видовой квартире. Акцент на премиальные материалы и современные технологические решения для комфортной жизни.",
    work: [
      "Индивидуальный проект электрики и слаботочных систем",
      "Монтаж системы кондиционирования и вентиляции",
      "Инженерная разводка сантехники в 3-х санузлах",
      "Штукатурка стен под лазерный уровень",
      "Подготовка пола под паркетную доску"
    ],
    area: "115 м²",
    time: "3 месяца",
    assets: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "ЖК «Символ»",
    type: "Новостройка",
    year: "Сдан · 2023",
    desc: "Реализация перепланировки и инженерной подготовки в квартире для большой семьи. Зонирование и продуманная эргономика пространства.",
    work: [
      "Демонтаж и возведение новых перегородок",
      "Монтаж электросети на 65 точек",
      "Разводка водоснабжения с системой очистки воды",
      "Выравнивание стен и потолков под покраску",
      "Гидроизоляция мокрых зон"
    ],
    area: "94 м²",
    time: "2,5 месяца",
    assets: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

export const secondaryCaseStudies = [
  {
    title: "Реновация в сталинском доме",
    type: "Вторичное жилье",
    year: "Сдан · 2024",
    desc: "Капитальный ремонт квартиры в доме 1954 года постройки. Требовался полный демонтаж старых перегородок и дранки, замена всех коммуникаций, усиление дверных проемов, монтаж новой системы отопления с заменой радиаторов и подготовка поверхностей под высококачественную покраску.",
    work: [
      "Демонтаж до кирпичного основания, вывоз 40 кубов мусора",
      "Замена стояков, разводка труб и монтаж радиаторов Rifar",
      "Монтаж электрощита, прокладка новой меди, заземление",
      "Выравнивание стен по маякам, армирование сеткой от трещин",
      "Подготовка стен под покраску и потолков из ГКЛ"
    ],
    area: "92 м²",
    time: "4 месяца",
    assets: [
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582268611958-ebaf161c8e28?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Квартира в 'доме-корабле'",
    type: "Вторичное жилье",
    year: "Сдан · 2024",
    desc: "Обновление инженерии в панельном доме. Замена устаревшей алюминиевой проводки и гнилых коммуникаций на современные надежные системы.",
    work: [
      "Полный демонтаж сантехкабины и отделки",
      "Замена электропроводки на медную ГОСТ",
      "Монтаж системы защиты от протечек",
      "Выравнивание полов самонивелирующейся смесью",
      "Штукатурка стен с геометрией под мебель"
    ],
    area: "64 м²",
    time: "3 месяца",
    assets: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1603988492906-4fb0fb251cb8?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    title: "Лофт на Пресне",
    type: "Вторичное жилье",
    year: "Сдан · 2023",
    desc: "Превращение старого нежилого фонда в стильный лофт. Инженерные системы проложены открытым способом с соблюдением эстетики индустриального стиля.",
    work: [
      "Демонтаж и очистка кирпичной кладки",
      "Монтаж электрики в ретро-стиле (медные трубы)",
      "Разводка отопления с использованием чугунных радиаторов",
      "Устройство наливных полимерных полов",
      "Реставрация оконных проемов"
    ],
    area: "76 м²",
    time: "3,5 месяца",
    assets: [
      "/mnt/user-uploads/file-51",
      "https://images.unsplash.com/photo-1582268611958-ebaf161c8e28?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

import arbatAsset from "@/assets/arbat-new.jpg.asset.json";
import arbatBath from "@/assets/arbat/bath.jpg.asset.json";
import arbatHall from "@/assets/arbat/hall.jpg.asset.json";
import villaAsset from "@/assets/villa-podmoskovye-new.jpg.asset.json";
import e1 from "@/assets/process/electro/1.png.asset.json";
import e2 from "@/assets/process/electro/2.png.asset.json";
import e3 from "@/assets/process/electro/3.png.asset.json";
import e4 from "@/assets/process/electro/4.png.asset.json";
import e5 from "@/assets/process/electro/5.png.asset.json";
import e6 from "@/assets/process/electro/6.png.asset.json";
import e7 from "@/assets/process/electro/7.png.asset.json";
import e8 from "@/assets/process/electro/8.png.asset.json";
import e9 from "@/assets/process/electro/9.png.asset.json";
import e10 from "@/assets/process/electro/10.png.asset.json";
import e11 from "@/assets/process/electro/11.png.asset.json";
import e12 from "@/assets/process/electro/12.png.asset.json";
import e13 from "@/assets/process/electro/13.png.asset.json";
import e14 from "@/assets/process/electro/14.png.asset.json";
import e15 from "@/assets/process/electro/15.png.asset.json";
import e16 from "@/assets/process/electro/16.png.asset.json";
import e17 from "@/assets/process/electro/17.png.asset.json";
import e18 from "@/assets/process/electro/18.png.asset.json";
import e19 from "@/assets/process/electro/19.png.asset.json";
import e20 from "@/assets/process/electro/20.png.asset.json";
import p1 from "@/assets/process/plumbing/p1.png.asset.json";
import p2 from "@/assets/process/plumbing/p2.png.asset.json";
import p3 from "@/assets/process/plumbing/p3.png.asset.json";
import p4 from "@/assets/process/plumbing/p4.png.asset.json";
import p5 from "@/assets/process/plumbing/p5.png.asset.json";
import p6 from "@/assets/process/plumbing/p6.png.asset.json";
import p7 from "@/assets/process/plumbing/p7.png.asset.json";
import p8 from "@/assets/process/plumbing/p8.png.asset.json";
import p9 from "@/assets/process/plumbing/p9.png.asset.json";
import p10 from "@/assets/process/plumbing/p10.png.asset.json";

export const processPhotos = {
  electro: [
    e1.url, e2.url, e3.url, e4.url, e5.url, e6.url, e7.url, e8.url, e9.url, e10.url,
    e11.url, e12.url, e13.url, e14.url, e15.url, e16.url, e17.url, e18.url, e19.url, e20.url
  ],
  plumbing: [
    p1.url, p2.url, p3.url, p4.url, p5.url, p6.url, p7.url, p8.url, p9.url, p10.url
  ]
};
