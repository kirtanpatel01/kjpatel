"use client";
import React from "react";
import { ArrowUp } from "lucide-react";
import Container from "./container";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <footer className="border-t border-border pt-2 flex flex-col md:flex-row justify-between items-start gap-4 text-xs font-mono tracking-widest text-muted-foreground bg-background">
        <span>Built with ❤️ by Kirtan Patel</span>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer"
        >
          Back to Top
          <ArrowUp className="w-3 h-3" />
        </button>
      </footer>
    </Container>
  );
}
