import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
    // Here you would normally initialize your tracking scripts
    console.log('Cookies accepted');
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
    console.log('Cookies declined');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-[100] md:left-auto md:right-6 md:max-w-sm"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#141414]/90 p-4 backdrop-blur-xl shadow-2xl">
            <button 
              onClick={() => setShow(false)}
              className="absolute right-3 top-3 text-white/40 hover:text-white transition-colors"
              aria-label="Закрыть уведомление"
            >
              <X size={16} />
            </button>
            
            <h3 className="text-base font-semibold text-white mb-1 pr-6">Мы используем файлы cookie</h3>
            <p className="text-xs text-white/60 mb-4 leading-relaxed">
              Используем файлы Cookies для улучшения работы сайта.
              Подробнее в <a href="/cookies" className="underline hover:text-white transition-colors">Политике использования Cookies</a>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Согласиться
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                Отказаться
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
