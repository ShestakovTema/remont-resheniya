import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "./index";

const TITLE = "Замена проводки в квартире — Ремонт Решения";
const DESC =
  "Замена проводки в квартире под ключ: демонтаж старой сети, штробление, новый кабель и щит. Москва и область, 15 лет опыта.";

export const Route = createFileRoute("/zamena-provodki-v-kvartire")({
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
    links: [{ rel: "canonical", href: "https://remontresheniya.pro/zamena-provodki-v-kvartire" }],
  }),
  component: () => <HomePage h1={{ a: "Замена проводки", b: "в квартире" }} />,
});
