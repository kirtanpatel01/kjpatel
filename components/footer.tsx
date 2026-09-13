"use client";

import React from "react";
import { ArrowUp, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full max-w-3xl sm:border-x border-dashed mx-auto border-t border-border py-4 px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide text-muted-foreground bg-background/80 backdrop-blur-md">
      {/* Left side: Built by & Inspired by */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-1.5 gap-y-1.5 w-full md:w-auto text-center md:text-left leading-relaxed">
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
        <span className="text-border hidden sm:inline">·</span>
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

      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-none border-border/50 pt-3 md:pt-0">
        {/* Arcade Link */}
        <Link
          href="/games"
          aria-label="Arcade Games"
          className="group relative flex items-center justify-center hover:text-foreground transition-colors duration-300 active:scale-95 cursor-pointer"
        >
          <Gamepad2 className="w-4 h-4" />
        </Link>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Back to top"
          className="relative flex items-center gap-1.5 hover:text-foreground transition-[color,transform] active:scale-[0.96] cursor-pointer shrink-0 text-xs font-medium after:absolute after:-inset-2 after:content-['']"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
