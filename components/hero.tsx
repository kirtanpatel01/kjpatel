"use client";
import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Word Component
const Word = ({ text, solidIndices }: { text: string; solidIndices: number[] }) => {
  return (
    <span className="inline-flex group items-baseline">
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className={`transition-all duration-700 ${
             solidIndices.includes(i) 
             ? "text-foreground" // Solid key char
             : "text-foreground/15 hover:text-[#ccff00]" // Hover turns Neon Lime
          }`}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]); 
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section 
        style={{ y, opacity }}
        className="fixed top-0 left-0 w-full h-[100vh] flex flex-col justify-center items-center z-0 pointer-events-none"
    >
      <div className="w-full max-w-[90vw] lg:max-w-7xl px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative pointer-events-auto"
        >
           {/* 
              Creative Concept: "Key Characters"
              "K" and "P" are solid. Others are outlines.
              Grid layout for creative positioning.
           */}
           <div className="flex flex-col w-full text-[clamp(4rem,14vw,13rem)] font-black leading-[0.85] tracking-tighter select-none mix-blend-difference text-foreground">
              <div className="flex self-start">
                  <Word text="KIRTAN" solidIndices={[0]} />
              </div>
              <div className="flex self-end">
                  <Word text="PATEL" solidIndices={[0]} />
              </div>
           </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 sm:mt-24 flex flex-col sm:flex-row justify-between items-end border-t border-border pt-6 pointer-events-auto"
        >
            <div className="text-lg sm:text-xl font-medium leading-relaxed max-w-sm">
               <span className="block text-muted-foreground mb-1 text-xs uppercase tracking-widest font-mono">Role</span>
               Full Stack Developer &<br />
               Digital Craftsman.
            </div>

            <div className="text-right mt-8 sm:mt-0">
               <span className="block text-muted-foreground mb-1 text-xs uppercase tracking-widest font-mono">Based In</span>
               India, Earth
            </div>
        </motion.div>
      </div>
    </motion.section>
  );
}