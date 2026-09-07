"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full max-w-3xl sm:border-x border-dashed mx-auto border-t border-border py-2 px-3 flex flex-row justify-between items-center gap-3 text-xs tracking-wide text-muted-foreground bg-background/80 backdrop-blur-md sticky bottom-0 z-50 min-h-8">
      {/* Left side: Built by & Inspired by */}
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
        <span>
          Built with ❤️ by{" "}
          <a
            href="https://x.com/kjpatel_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:underline transition-colors"
          >
            Kirtan Patel
          </a>
        </span>
        <span className="text-border">·</span>
        <span>
          Inspired by{" "}
          <a
            href="https://chanhdai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline decoration-border hover:decoration-foreground transition-colors"
          >
            chanhdai
          </a>
          ,{" "}
          <a
            href="https://www.manuarora.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline decoration-border hover:decoration-foreground transition-colors"
          >
            manuarora
          </a>{" "}
          &{" "}
          <a
            href="https://evilcharts.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline decoration-border hover:decoration-foreground transition-colors"
          >
            evilcharts
          </a>
        </span>
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        type="button"
        aria-label="Back to top"
        className="relative flex items-center gap-1.5 hover:text-foreground transition-[color,transform] active:scale-[0.96] cursor-pointer shrink-0 text-xs font-medium after:absolute after:-inset-2 after:content-['']"
      >
        <span className="hidden sm:inline">Top</span>
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
    </footer>
  );
}
