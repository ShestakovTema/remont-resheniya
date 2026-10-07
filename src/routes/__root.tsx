import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { CookieConsent } from "../components/site/cookie-consent";
import appCss from "../styles.css?url";

import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  useEffect(() => {
    // Redirect to custom 404 if needed or just render the custom UI
  }, []);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070707] px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold md:text-9xl">404</h1>
        <h2 className="mt-4 text-2xl font-medium uppercase tracking-widest md:text-3xl">Страница не найдена</h2>
        <p className="mt-4 text-sm text-white/40 md:text-base">
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-bold text-black transition-all hover:scale-105 active:scale-95"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}


function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const normalizedError = error instanceof Error ? error : new Error(String(error));
  console.error(normalizedError);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(normalizedError, { boundary: "tanstack_root_error_component" });
  }, [normalizedError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ремонт Решения — Профессиональная электрика, сантехника, перепланировка квартир и отделка под покраску" },
      {
        name: "description",
        content:
          "Ремонт Решения — профессиональный электромонтаж, сантехника, перепланировка квартир и отделка под покраску в Москве. 15 лет опыта.",
      },
      { name: "keywords", content: "ремонт квартир, электромонтаж, сантехника, перепланировка, отделка под покраску, ремонт москва" },
      { name: "author", content: "Ремонт Решения" },
      { name: "theme-color", content: "#070707" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Ремонт Решения — Профессиональная электрика, сантехника, перепланировка квартир и отделка под покраску" },
      {
        property: "og:description",
        content:
          "Ремонт Решения — профессиональный электромонтаж, сантехника, перепланировка квартир и отделка под покраску в Москве. 15 лет опыта.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://remontresheniya.pro/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ремонт Решения — Профессиональная электрика, сантехника, перепланировка квартир и отделка под покраску" },
      { name: "twitter:description", content: "Ремонт Решения — профессиональный электромонтаж, сантехника, перепланировка квартир и отделка под покраску в Москве. 15 лет опыта." },

    ],
    links: [
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap",
      },
      { rel: "canonical", href: "https://remontresheniya.pro/" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111768505', 'ym');
              ym(111768505, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/111768505"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieConsent />
    </QueryClientProvider>

  );
}
