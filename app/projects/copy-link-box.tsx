"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";

interface CopyLinkBoxProps {
  link: string;
}

export function CopyLinkBox({ link }: CopyLinkBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center mt-3 border border-border/60 rounded bg-background w-fit max-w-full overflow-hidden">
      <Link 
        href={link} 
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 text-[10px] sm:text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors border-r border-border/60 flex-1 min-w-0 truncate"
      >
        {link}
      </Link>
      <button 
        onClick={handleCopy}
        aria-label="Copy link"
        className="shrink-0 px-2 py-1.5 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center"
      >
        {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}
