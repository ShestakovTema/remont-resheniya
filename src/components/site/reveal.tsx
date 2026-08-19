import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  style,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "span" | "li" | "p";
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -80px 0px" });
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1], delay }}
      className={className}
      style={style as any}
    >
      {children}
    </Tag>
  );
}

/** Word-by-word text reveal. */
export function TextReveal({
  text,
  className,
  stagger = 0.05,
  delay = 0,
  as: As = "span",
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const words = text.split(" ");

  return (
    <As ref={ref as never} className={className}>
      {words.map((w, i) => {
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.15em]">
            <motion.span
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{
                duration: 0.9,
                ease: [0.19, 1, 0.22, 1],
                delay: delay + i * stagger,
              }}
              className="inline-block"
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </As>
  );
}
