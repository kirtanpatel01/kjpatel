"use client";
import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
      <div className="flex gap-4">
         <span>© {new Date().getFullYear()} KJ_Patel</span>
         <span>•</span>
         <span>Vadodara, Gujarat, IN</span>
      </div>

      <button 
        onClick={scrollToTop} 
        className="flex items-center gap-2 hover:text-foreground transition-colors group"
      >
        Back to Top
        <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
}
