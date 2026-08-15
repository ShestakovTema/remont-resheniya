import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { SmoothScroll } from '@/components/site/smooth-scroll';
import { Cursor } from '@/components/site/cursor';

export const Route = createFileRoute('/cookies')({
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="bg-[#070707] text-white min-h-screen">
      <SmoothScroll />
      <Cursor />
      
      <main className="mx-auto max-w-4xl px-6 py-32 md:py-40">
        <div className="mb-12 flex justify-center">
          <Link 
            to="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
          >
            <ChevronLeft size={14} />
            На главную
          </Link>
        </div>
        <h1 className="font-display text-4xl md:text-6xl mb-12 italic text-center">Политика использования Cookies</h1>
        
        <div className="space-y-8 text-white/70 leading-relaxed text-sm md:text-base">
          <p className="text-center font-medium">Версия от 17.08.2026</p>

          <section>
            <p>
              1. Сайт <a href="https://remontresheniya.ru" className="text-white underline">https://remontresheniya.ru</a> (далее Сайт) обрабатывает данные, указанные в настоящем документе (далее — Политика), собранные в процессе использования посетителями веб-сайта. При нажатии кнопки «Согласиться» в окне-уведомлении об обработке Cookies, Вы даете свое согласие на обработку Ваших Cookies. Вы также можете отказаться от обработки Cookies в соответствии с пунктом 6 настоящей Политики.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Что такое Cookies?</h2>
            <p>
              Сookies — это небольшой фрагмент данных, который веб-сайт запрашивает у браузера, используемого на вашем компьютере или мобильном устройстве. Cookies содержат информацию о Ваших действиях на веб-сайте, а также могут содержать сведения о Вашем оборудовании, дату и время сессии. Сookies хранятся локально на Вашем компьютере или мобильном устройстве.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Как на Сайте используют Ваши Cookies?</h2>
            <p>
              Cookies используются на Сайте в целях улучшения и обеспечения нормальной работоспособности веб-сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Как Сайт обрабатывает Ваши Cookies?</h2>
            <p>
              Мы обрабатываем полученные данные с использованием системы сбора статистики Яндекс.Метрика и других сервисов аналитики и метрических программ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Какие виды Сookies используются?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-1">5.1. Временные («сессионные»)</h3>
                <p>Такие cookie используются только в момент пользования веб-сайтом. Например, в них могут быть данные о просмотренных страницах. Эти файлы удаляются после закрытия окна браузера.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">5.2. Постоянные</h3>
                <p>Сookies, которые хранятся на Вашем компьютере или мобильном устройстве и не удаляются при закрытии браузера. Постоянные Сookies могут сохранять пользовательские настройки для веб-сайта, позволяя использовать эти предпочтения в будущих сеансах использования веб-сайта.</p>
                <p className="mt-2">Такие Cookies позволяют идентифицировать Вас как уникального пользователя и при возвращении на веб-сайт помогают вспомнить информацию о Вас и ранее совершенных Вами действиях.</p>
                <p className="mt-2 text-white/50 italic">При нажатии кнопки «Согласиться» во всплывающем сообщении при открытии Сайта в браузер пользователя записывается переменная о согласии с данной Политикой.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">5.3. Аналитические/маркетинговые</h3>
                <p>Включают в себя информацию о том, как Вы используете веб-сайт, например, какие страницы Вы посещаете, по каким ссылкам переходите. На сайте используют эти Cookies, в основном для того, чтобы улучшить функционал веб-сайта и Ваш пользовательский опыт при его использовании.</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">5.4. Обязательные</h3>
                <p>Это минимальный набор Cookies, использование которых необходимо для обеспечения правильной и бесперебойной работы веб-сайта.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Как отказаться от обработки Сookies?</h2>
            <p>
              Cookies устанавливаются в браузер на Вашем устройстве — в большинстве случаев это происходит автоматически. Вы можете отказаться от сохранения и использования Cookies на своем устройстве или удалить уже сохраненные Cookies в настройках Вашего браузера.
            </p>
            <p className="mt-4">
              В том случае, если Вы откажетесь от обработки Cookies, наш веб-сайт будет использовать только обязательные Cookies.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}