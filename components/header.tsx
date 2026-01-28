"use client";
import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-theme";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-6 px-6 py-3 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg transition-transform hover:scale-105 duration-300">
          
          {/* Logo / Home */}
          <Link href="/" className="font-black tracking-tighter text-lg pr-4 border-r border-border hover:text-muted-foreground transition-colors">
            KJ
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <Link href="#experience" className="hover:text-[#ccff00] transition-colors">Exp</Link>
            <Link href="#projects" className="hover:text-[#ccff00] transition-colors">Work</Link>
            <Link href="#skills" className="hover:text-[#ccff00] transition-colors">Skills</Link>
            <Link href="#contact" className="hover:text-[#ccff00] transition-colors">Contact</Link>
          </nav>

          <div className="pl-4 border-l border-border">
             <ModeToggle />
          </div>
      </div>
    </motion.header>
  );
}