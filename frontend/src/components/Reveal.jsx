import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Subtle fade + rise on scroll into view.
export const Reveal = ({ children, delay = 0, y = 16, className = "", as = "div" }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
};
