"use client";

import { motion, useReducedMotion } from "motion/react";
import { Children, isValidElement, type ReactNode } from "react";

interface HeroMotionProps {
  children: ReactNode;
}

export function HeroMotion({ children }: HeroMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className="space-y-5">{children}</div>;
  }

  const items = Children.toArray(children);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.04,
          },
        },
      }}
      className="space-y-5"
    >
      {items.map((child, index) => {
        const key =
          isValidElement(child) && child.key != null
            ? String(child.key)
            : `hero-item-${index}`;
        return (
          <motion.div
            key={key}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
