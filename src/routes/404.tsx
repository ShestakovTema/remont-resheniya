import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/404' as any)({
  component: NotFoundPage,
});

function NotFoundPage() {
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
