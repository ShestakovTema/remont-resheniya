import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "Привет",
    meta: [
      { name: "description", content: "Простое приветствие" },
      { property: "og:title", content: "Привет" },
      { property: "og:description", content: "Простое приветствие" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-bold">Привет</h1>
    </div>
  );
}
