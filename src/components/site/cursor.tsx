import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Very snappy — near-instant follow, no perceptible lag.
  const sx = useSpring(x, { stiffness: 1500, damping: 90, mass: 0.15 });
  const sy = useSpring(y, { stiffness: 1500, damping: 90, mass: 0.15 });
  const [kind, setKind] = useState<"idle" | "link" | "view">("idle");
  const [label, setLabel] = useState<string>("");
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const [labelSize, setLabelSize] = useState({ font: 11, pad: 18 });
  const [size, setSize] = useState(16);
  const ready = useRef(false);

  // Adapt font size for the label to viewport density so "STF" always fits.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const compute = () => {
      const vmin = Math.min(window.innerWidth, window.innerHeight);
      // 11px baseline, gently scales between ~10px (small laptops) and ~14px (large monitors).
      const font = Math.round(Math.max(10, Math.min(14, vmin / 70)));
      // Padding around text inside the circle.
      const pad = Math.round(font * 1.6);
      setLabelSize({ font, pad });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Measure actual rendered label width and fit the circle around it precisely.
  useLayoutEffect(() => {
    if (kind !== "view" || !label) return;
    const el = labelRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const diameter = Math.ceil(Math.hypot(w, labelSize.font) + labelSize.pad);
    setSize(Math.max(56, diameter));
  }, [label, kind, labelSize]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    document.documentElement.classList.add("tf-cursor");
    ready.current = true;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest<HTMLElement>("[data-cursor]");
      if (interactive) {
        const k = (interactive.dataset["cursor"] || "link") as "link" | "view";
        const lbl = interactive.dataset["cursorLabel"] || "";
        setKind(k);
        setLabel(lbl);
        if (k !== "view") setSize(40);
        else if (!lbl) setSize(56);
        // else: size is set by the measurement effect above
      } else {
        setKind("idle");
        setSize(16);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("tf-cursor");
    };
  }, [x, y]);

  if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{ width: size, height: size, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        className="flex items-center justify-center overflow-hidden rounded-full bg-white"
      >
        {label ? (
          <span
            ref={labelRef}
            style={{ fontSize: `${labelSize.font}px` }}
            className="whitespace-nowrap font-semibold uppercase leading-none tracking-[0.14em] text-black"
          >
            {label}
          </span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}