import { createFileRoute, Link } from '@tanstack/react-router';
import { Nav } from '@/components/site/nav';
import { ChevronLeft } from 'lucide-react';

export const Route = createFileRoute('/404')({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070707] text-white">
      <Nav />
      <div className="flex flex-1 items-center justify-center px-4 pt-16">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <Link 
              to="/"
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
            >
              <ChevronLeft size={14} />
              На главную
            </Link>
          </div>
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
    </div>
  );
}
