import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Понятно",
    meta: [
      { name: "description", content: "Простая страница с текстом Понятно" },
      { property: "og:title", content: "Понятно" },
      { property: "og:description", content: "Простая страница с текстом Понятно" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-bold">Понятно</h1>
    </div>
  );
}
