// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Статический экспорт: `npm run build:static` — генерирует HTML-файлы всех
// страниц в .output/public (можно залить на обычный хостинг вроде reg.ru).
const STATIC = process.env["STATIC_EXPORT"] === "1";

export default defineConfig({
  ...(STATIC ? { nitro: false as const } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(STATIC
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
autoSubfolderIndex: true,
          },
          pages: [
            { path: "/" },
            { path: "/elite" },
            { path: "/newbuilding" },
            { path: "/secondary" },
            { path: "/privacy" },
            { path: "/cookies" },
            { path: "/404" },
          ],
        }
      : {}),
  },
});
