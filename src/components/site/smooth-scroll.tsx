import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const getOffset = () => (window.innerWidth >= 768 ? 80 : 64);
    let raf = 0;
    const animateScrollTo = (target: number, duration = 900) => {
      cancelAnimationFrame(raf);
      const start = window.scrollY;
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const end = Math.max(0, Math.min(max, target));
      const distance = end - start;
      if (Math.abs(distance) < 2) {
        window.scrollTo(0, end);
        return;
      }
      const t0 = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, start + distance * ease(p));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const smoothTo = (top: number) => {
      if (lenisInstance) {
        lenisInstance.scrollTo(top, { duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        const dist = Math.abs(top - window.scrollY);
        const duration = Math.min(1200, Math.max(500, dist * 0.6));
        animateScrollTo(top, duration);
      }
    };
    const cancelOnUser = () => cancelAnimationFrame(raf);
    window.addEventListener("touchstart", cancelOnUser, { passive: true });
    window.addEventListener("wheel", cancelOnUser, { passive: true });
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.length < 2) return;
      const id = href.slice(1);
      if (id === "top") {
        e.preventDefault();
        smoothTo(0);
        history.pushState(null, "", "#top");
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - getOffset();
      smoothTo(y);
      history.pushState(null, "", href);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("touchstart", cancelOnUser);
      window.removeEventListener("wheel", cancelOnUser);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Skip smooth-scroll on touch / coarse-pointer devices — native mobile
    // scrolling is already GPU-accelerated, and Lenis's RAF loop plus wheel
    // interception adds visible jank on phones.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
  return null;
}