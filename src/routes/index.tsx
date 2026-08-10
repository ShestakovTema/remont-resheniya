import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Как дела",
    meta: [
      { name: "description", content: "Простая страница с вопросом Как дела" },
      { property: "og:title", content: "Как дела" },
      { property: "og:description", content: "Простая страница с вопросом Как дела" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-bold">Как дела</h1>
    </div>
  );
}
