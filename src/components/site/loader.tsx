import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const shown = window.localStorage.getItem("intro_loader_shown");
    if (!shown) {
      setShow(true);
      window.localStorage.setItem("intro_loader_shown", "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    setIsMobile(mq.matches);
  }, []);

  useEffect(() => {
    let raf = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    try {
      const start = performance.now();
      const duration = isMobile ? 900 : 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setCount(Math.round(p * 100));
        if (p < 1) raf = requestAnimationFrame(tick);
        else timeoutId = setTimeout(() => setShow(false), isMobile ? 150 : 300);
      };
      raf = requestAnimationFrame(tick);
    } catch {
      setShow(false);
    }
    return () => {
      cancelAnimationFrame(raf);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // Hard-lock scroll while loader is visible; always restore on hide/unmount/error.
  useEffect(() => {
    if (!show) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlOverscrollBehavior = html.style.overscrollBehavior;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;
    const prevBodyTouchAction = body.style.touchAction;
    const prevBodyOverscrollBehavior = body.style.overscrollBehavior;

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const preventScrollKeys = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "].includes(event.key)) {
        event.preventDefault();
      }
    };

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";

    window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
    window.addEventListener("keydown", preventScrollKeys, { capture: true });

    return () => {
      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("touchmove", preventScroll, { capture: true });
      window.removeEventListener("keydown", preventScrollKeys, { capture: true });

      html.style.overflow = prevHtmlOverflow;
      html.style.overscrollBehavior = prevHtmlOverscrollBehavior;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      body.style.touchAction = prevBodyTouchAction;
      body.style.overscrollBehavior = prevBodyOverscrollBehavior;
      window.scrollTo(scrollX, scrollY);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: isMobile ? 0.6 : 1.05, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#050505] px-8 md:px-14"
        >
          {/* Intense aurora background */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {isMobile ? (
              <>
                <div
                  className="absolute -left-[15%] top-[10%] h-[70vmax] w-[70vmax] rounded-full blur-2xl"
                  style={{ background: "radial-gradient(closest-side, rgba(220,150,80,0.85), transparent 70%)" }}
                />
                <div
                  className="absolute right-[-10%] top-[30%] h-[65vmax] w-[65vmax] rounded-full blur-2xl"
                  style={{ background: "radial-gradient(closest-side, rgba(90,140,230,0.8), transparent 70%)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }}
                />
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.6 }}
                  animate={{ scale: 1.15, opacity: 1 }}
                  transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute -left-[15%] top-[10%] h-[70vmax] w-[70vmax] rounded-full blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(220,150,80,0.9), transparent 70%)" }}
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1.2, opacity: 0.95 }}
                  transition={{ duration: 2, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
                  className="absolute right-[-10%] top-[30%] h-[65vmax] w-[65vmax] rounded-full blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(90,140,230,0.85), transparent 70%)" }}
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.4 }}
                  animate={{ scale: 1.1, opacity: 0.9 }}
                  transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                  className="absolute bottom-[-15%] left-[20%] h-[60vmax] w-[60vmax] rounded-full blur-3xl"
                  style={{ background: "radial-gradient(closest-side, rgba(180,80,190,0.85), transparent 70%)" }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1.4 }}
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }}
                />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "3px 3px",
                    mixBlendMode: "overlay",
                  }}
                />
              </>
            )}
          </div>

          <div className="relative">
          <div className="font-display text-center text-[14vw] leading-none text-white md:text-[8vw]">
            <motion.span
              initial={{ y: isMobile ? "40%" : "110%", opacity: isMobile ? 0 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: isMobile ? 0.5 : 1, ease: [0.19, 1, 0.22, 1] }}
              className="inline-block"
            >
              Ремонт Решения
            </motion.span>
          </div>
          </div>
          <div className="fixed bottom-8 right-8 z-10 font-mono text-sm tabular-nums text-white/80 md:bottom-12 md:right-14 md:text-base">
            {String(count).padStart(3, "0")}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}