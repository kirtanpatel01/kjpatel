"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring physics for the cursor
  const springConfig = { damping: 35, stiffness: 400, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    // Track all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .cursor-pointer");
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary pointer-events-none z-[9999]"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
