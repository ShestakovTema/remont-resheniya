import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function Magnetic({ children, className, strength = 24, as = "div", href, onClick, onMouseEnter, onMouseLeave }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set((dx / r.width) * strength);
    y.set((dy / r.height) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
    onMouseLeave?.();
  };

  const MotionTag = as === "a" ? motion.a : as === "button" ? motion.button : motion.div;
  return (
    <MotionTag
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
