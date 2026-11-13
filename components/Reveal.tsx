"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className, animateOnMount = false }: { children: ReactNode; delay?: number; className?: string; animateOnMount?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 8, filter: "blur(3px)" };
  const visible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={animateOnMount ? "visible" : undefined}
      whileInView={animateOnMount ? undefined : "visible"}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      variants={{ hidden, visible }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 1.15, delay: prefersReducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
