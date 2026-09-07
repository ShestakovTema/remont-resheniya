import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "./index";

const TITLE = "Отделка квартир в Москве — Ремонт Решения";
const DESC =
  "Отделка квартир в Москве: подготовка стен под покраску, перепланировка, электрика и сантехника под ключ. 15 лет опыта.";

export const Route = createFileRoute("/otdelka-kvartir-v-moskve")({
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
    links: [{ rel: "canonical", href: "https://remontresheniya.pro/otdelka-kvartir-v-moskve" }],
  }),
  component: () => <HomePage h1={{ a: "Отделка квартир", b: "в Москве" }} />,
});
