import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "./index";

const TITLE = "Электрика в квартире — Ремонт Решения";
const DESC =
  "Электрика в квартире под ключ: проектирование, монтаж проводки, щитов и освещения в Москве. 15 лет опыта.";

export const Route = createFileRoute("/elektrika-v-kvartire")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { property: "og:image", content: "https://remontresheniya.pro/images/interior-1600210492486-724fe5c67fb0.webp" },
      { name: "twitter:image", content: "https://remontresheniya.pro/images/interior-1600210492486-724fe5c67fb0.webp" },
    ],
    links: [{ rel: "canonical", href: "https://remontresheniya.pro/elektrika-v-kvartire" }],
  }),
  component: () => (
    <HomePage
      h1={{ a: "Электрика", b: "в квартире" }}
      heroDescription="Поменяем проводку, сделаем электрику в вашей квартире"
      electricityLanding
    />
  ),
});
