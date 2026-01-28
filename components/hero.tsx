"use client";
import React from "react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-[100vw]">
        {/* Massive Swiss Typography */}
        <motion.div
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          <h1 className="text-[clamp(4rem,18vw,20rem)] font-black leading-[0.85] tracking-tighter text-foreground">
            KIRTAN
            <br />
            <span className="text-muted-foreground">PATEL</span>
          </h1>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:items-baseline justify-between gap-8 border-t border-border pt-8 max-w-7xl"
        >
            <p className="text-xl sm:text-2xl font-medium max-w-lg leading-relaxed">
              Full Stack Developer &<br />
              Digital Craftsman.
            </p>

            <div className="flex flex-col gap-1 text-sm font-mono uppercase tracking-widest text-muted-foreground">
               <span>Based in India</span>
               <span>Available for work</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
}