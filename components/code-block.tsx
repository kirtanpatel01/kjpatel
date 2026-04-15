"use client";

import React, { useEffect, useState } from "react";
import { bundledThemes, type Highlighter, createHighlighter } from "shiki";

import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  themes?: {
    light: string;
    dark: string;
  };
}

let highlighterInstance: Highlighter | null = null;

const CodeBlock = ({
  code,
  language,
  showLineNumbers = true,
  themes = {
    light: "vitesse-light",
    dark: "vitesse-dark",
  },
}: CodeBlockProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    async function highlight() {
      if (!highlighterInstance) {
        highlighterInstance = await createHighlighter({
          themes: Object.keys(bundledThemes),
          langs: ["tsx", "ts", "json", "md", "css", "html", "javascript", "typescript"],
        });
      }

      const html = highlighterInstance.codeToHtml(code, {
        lang: language,
        themes: {
          light: themes.light,
          dark: themes.dark,
        },
      });
      setHighlightedCode(html);
    }

    highlight();
  }, [code, language, themes]);

  const lines = code.trim().split("\n");

  return (
    <ScrollArea className="h-full w-full [&>[data-slot=scroll-area-scrollbar][data-orientation=vertical]]:hidden">
      <div className="relative flex  text-sm min-w-full">
        {/* Line Numbers */}
        {showLineNumbers && (
          <div className="sticky left-0 top-0 z-10 w-12 text-right pr-4 text-muted-foreground/20 select-none py-2 border-r border-border/5 shrink-0 bg-background/50 backdrop-blur-sm">
            {lines.map((_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>
        )}
        
        {/* Code Content */}
        <div className={cn("flex-1 min-w-0", !showLineNumbers && "px-0")}>
          <div 
            className="shiki-container py-2 px-0 leading-6 [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 whitespace-pre"
            dangerouslySetInnerHTML={{ __html: highlightedCode || `<code>${code}</code>` }} 
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" className="z-20" />
    </ScrollArea>
  );
};

export default CodeBlock;
