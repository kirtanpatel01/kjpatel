"use client";

import React, { useEffect, useState } from "react";
import { type Highlighter, createHighlighter } from "shiki";

import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface CodeBlockProps {
  code: string;
  language: string;
}

let highlighterInstance: Highlighter | null = null;

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function highlight() {
      if (!highlighterInstance) {
        highlighterInstance = await createHighlighter({
          themes: ["vitesse-dark", "vitesse-light"],
          langs: ["tsx", "ts", "json", "md", "css", "html", "javascript", "typescript"],
        });
      }

      const html = highlighterInstance.codeToHtml(code, {
        lang: language,
        themes: {
          light: "vitesse-light",
          dark: "vitesse-dark",
        },
      });
      setHighlightedCode(html);
      setIsLoading(false);
    }

    highlight();
  }, [code, language]);

  const lines = code.trim().split("\n");

  if (isLoading) {
    return (
      <div className="flex animate-pulse overflow-hidden">
        <div className="w-12 border-r border-border/20 pr-4" />
        <div className="flex-1 pl-6 space-y-2">
          <div className="h-4 bg-muted-foreground/10 rounded w-3/4" />
          <div className="h-4 bg-muted-foreground/10 rounded w-1/2" />
          <div className="h-4 bg-muted-foreground/10 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full [&>[data-slot=scroll-area-scrollbar][data-orientation=vertical]]:hidden">
      <div className="relative flex font-mono text-sm min-w-full">
        {/* Line Numbers */}
        <div className="sticky left-0 top-0 z-10 w-12 text-right pr-4 text-muted-foreground/20 select-none py-1 border-r border-border/5 shrink-0 bg-background/50 backdrop-blur-sm">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
        
        {/* Code Content */}
        <div className="flex-1 min-w-0">
          <div 
            className="shiki-container py-1 px-6 leading-6 [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 whitespace-pre"
            dangerouslySetInnerHTML={{ __html: highlightedCode }} 
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" className="z-20" />
    </ScrollArea>
  );
};

export default CodeBlock;
