"use client";
import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { motion } from "motion/react";
import Image from "next/image";

export default function Header() {
  return (
    <motion.header 
      // Removed animation for visual consistency and LCP
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-6 px-4 py-3 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg transition-transform hover:scale-105 duration-300">
          
          {/* Logo / Home */}
          <Link href="/">
            <Image src="/logo.svg" alt="KJ_Patel" width={50} height={50} />
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <Link href="#experience" className="hover:text-[#ccff00] transition-colors text-shadow-black/10 text-shadow-lg tracking-tight">Exp</Link>
            <Link href="#projects" className="hover:text-[#ccff00] transition-colors text-shadow-black/10 text-shadow-lg tracking-tight">Work</Link>
            <Link href="#skills" className="hover:text-[#ccff00] transition-colors hidden sm:block text-shadow-black/10 text-shadow-lg tracking-tight">Skills</Link>
            <Link href="#contact" className="hover:text-[#ccff00] transition-colors text-shadow-black/10 text-shadow-lg tracking-tight">Contact</Link>
          </nav>

          <div className="pl-2 sm:pl-4 border-l border-border">
             <ModeToggle />
          </div>
      </div>
    </motion.header>
  );
}