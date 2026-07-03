"use client";

import {
  Check,
  Code2,
  Copy,
  FileCode2,
  FileJson,
  FileText,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import CodeBlock from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function extractCodeText(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractCodeText).join("");
  }

  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<{
      children?: React.ReactNode;
    }>;
    return extractCodeText(element.props.children);
  }

  return "";
}

function extractLanguage(children: React.ReactNode): string {
  if (React.isValidElement(children)) {
    const childClassName = (children.props as { className?: string }).className;
    const match = childClassName?.match(/language-([a-z0-9-]+)/i);

    if (match?.[1]) {
      return match[1];
    }

    return extractLanguage(
      (children.props as { children?: React.ReactNode }).children,
    );
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      const language = extractLanguage(child);
      if (language) {
        return language;
      }
    }
  }

  return "";
}

export default function NewsCodeBlock({
  children,
  className,
  ...props
}: NewsCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => extractCodeText(children).trimEnd(), [children]);

  const rawLanguage = useMemo(
    () => extractLanguage(children) || "text",
    [children],
  );

  const syntaxLanguage = useMemo(() => {
    if (rawLanguage === "tsx") return "tsx";
    if (rawLanguage === "ts") return "ts";
    if (rawLanguage === "jsx") return "jsx";
    if (rawLanguage === "js") return "js";

    return rawLanguage;
  }, [rawLanguage]);

  const language = useMemo(() => {
    if (rawLanguage === "ts") return "typescript";
    if (rawLanguage === "tsx") return "typescript react";
    if (rawLanguage === "js") return "javascript";
    if (rawLanguage === "jsx") return "javascript react";

    return rawLanguage;
  }, [rawLanguage]);

  const languageIcon = useMemo(() => {
    if (rawLanguage === "json") return FileJson;
    if (rawLanguage === "md" || rawLanguage === "mdx" || rawLanguage === "txt")
      return FileText;
    if (
      rawLanguage === "ts" ||
      rawLanguage === "tsx" ||
      rawLanguage === "js" ||
      rawLanguage === "jsx" ||
      rawLanguage === "tsconfig"
    ) {
      return FileCode2;
    }

    return Code2;
  }, [rawLanguage]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      {...props}
      className={cn(
        "my-4 overflow-hidden rounded-2xl border border-border/80 bg-background shadow-sm ring-1 ring-black/5 dark:ring-white/5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-secondary/20 px-3 py-2">
        <div className="flex items-center gap-2">
          {React.createElement(languageIcon, {
            size: 14,
            className: "text-foreground/70",
            "aria-hidden": true,
          })}
          <span className="text-[11px] font-medium lowercase tracking-[0.22em] text-foreground/70">
            {language}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={handleCopy}
          className="shrink-0"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <Copy size={14} />
          )}
        </Button>
      </div>

      <div className="bg-background/95 dark:bg-background/95">
        <CodeBlock
          code={code}
          language={syntaxLanguage}
          showLineNumbers={false}
          themes={{
            light: "vitesse-light",
            dark: "vitesse-dark",
          }}
        />
      </div>
    </div>
  );
}
