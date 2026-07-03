"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

const ASCII_ART = `
  _  ___      _                
 | |/ (_)    | |               
 | ' / _ _ __| |_ __ _ _ __    
 |  < | | '__| __/ _\` | '_ \\   
 | . \\| | |  | || (_| | | | |  
 |_|\\_\\_|_|   \\__\\__,_|_| |_|  
                               
`;

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Initializing KirtanOS v1.0.0...", type: "system" },
    { text: "Loading profile data...", type: "system" },
    { text: "Type 'help' to see list of available commands.", type: "system" },
    { text: ASCII_ART, type: "output" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const writeOutput = async (linesToPrint: TerminalLine[]) => {
    setIsTyping(true);
    for (const line of linesToPrint) {
      const delay = line.text.includes("loading") ? 300 : 70;
      await new Promise((resolve) => setTimeout(resolve, delay));
      setHistory((prev) => [...prev, line]);
    }
    setIsTyping(false);
  };

  const executeCommand = async (cmdStr: string) => {
    if (isTyping) return; // Prevent double execution while typing

    const rawCmd = cmdStr.trim().toLowerCase();
    const args = rawCmd.split(" ");
    const cmd = args[0];

    // Append user input line instantly
    setHistory((prev) => [
      ...prev,
      { text: `kirtan@portfolio:~$ ${cmdStr}`, type: "input" },
    ]);

    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const newLines: TerminalLine[] = [];

    switch (cmd) {
      case "help":
        newLines.push(
          { text: "Available commands:", type: "system" },
          {
            text: "  about        - Profile bio & engineering focus",
            type: "output",
          },
          { text: "  skills       - Tech stack dashboard", type: "output" },
          {
            text: "  projects     - Catalog of production builds",
            type: "output",
          },
          {
            text: "  building     - Active development sprint details",
            type: "output",
          },
          {
            text: "  contact      - Mail and socials networking link",
            type: "output",
          },
          { text: "  clear        - Flush the terminal view", type: "output" },
        );
        break;

      case "about":
        newLines.push(
          { text: "accessing database...", type: "system" },
          { text: "loading profile...", type: "system" },
          { text: "Name: Kirtan Patel - Full Stack Developer", type: "output" },
          {
            text: "Focus: I build production-ready SaaS platforms, ERP tools, and AI integrations.",
            type: "output",
          },
          {
            text: "Principle: High performance, clean visual interfaces, and business impact.",
            type: "output",
          },
          {
            text: "Status: Seeking Software Engineering internships and full-time roles.",
            type: "output",
          },
        );
        break;

      case "skills":
        newLines.push(
          { text: "scanning skill modules...", type: "system" },
          { text: "loading...", type: "system" },
          {
            text: "  Frontend:  React, Next.js, TypeScript, TailwindCSS",
            type: "output",
          },
          {
            text: "  Backend:   Node.js, Express.js, DrizzleORM",
            type: "output",
          },
          { text: "  Database:  Supabase, NeonDB, MongoDB", type: "output" },
        );
        break;

      case "projects":
        newLines.push(
          { text: "fetching active catalogs...", type: "system" },
          { text: "loading...", type: "system" },
          {
            text: "  ✓ Morganize  - Multi-outlet ERP & POS system (Solo Built).",
            type: "output",
          },
          {
            text: "  ✓ Algorion AI - Startup website & AI dashboard (Team Project).",
            type: "output",
          },
          {
            text: "Type 'cat projects.md' or scroll down to explore details.",
            type: "output",
          },
        );
        break;

      case "building":
        newLines.push(
          { text: "reading active workflow...", type: "system" },
          { text: "Project:   AI Email Assistant", type: "output" },
          {
            text: "Stack:     Next.js, Gmail/Google Calendar API, MCP Server",
            type: "output",
          },
          {
            text: "Status:    Structuring natural language trigger parsing.",
            type: "output",
          },
        );
        break;

      case "contact":
        newLines.push(
          { text: "loading links...", type: "system" },
          { text: "  Email:    kjptel200022@gmail.com", type: "output" },
          { text: "  GitHub:   github.com/kirtanpatel01", type: "output" },
          { text: "  LinkedIn: linkedin.com/in/kirtanpatel", type: "output" },
        );
        break;

      case "cat":
        if (args[1] === "about.md") {
          newLines.push({
            text: "Mission: Building software that delivers high business impact, not just lines of code.",
            type: "output",
          });
        } else if (args[1] === "contact.md") {
          newLines.push({
            text: "Email me: kjptel200022@gmail.com. Let's make something amazing.",
            type: "output",
          });
        } else if (args[1] === "projects.md") {
          newLines.push(
            {
              text: "Morganize ERP: Consolidates POS, inventory, digital wallets, and payouts under Next.js.",
              type: "output",
            },
            {
              text: "Algorion AI: Led frontend landing page launch and responsive component system design.",
              type: "output",
            },
          );
        } else {
          newLines.push({
            text: `cat: ${args[1] || ""}: File not found. Try 'cat about.md'`,
            type: "error",
          });
        }
        break;

      default:
        newLines.push({
          text: `Command not found: '${cmd}'. Type 'help' for options.`,
          type: "error",
        });
    }

    await writeOutput(newLines);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping) {
      executeCommand(input);
      setInput("");
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="w-full h-80 rounded-2xl border border-dashed border-border bg-black/90 font-mono text-xs text-lime-500/90 shadow-lg flex flex-col overflow-hidden select-none cursor-text group"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-border/80 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          kirtan@portfolio: ~
        </span>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Output Console Log */}
      <div className="flex-grow p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={cn(
              "whitespace-pre-wrap leading-relaxed",
              line.type === "input" && "text-foreground font-semibold",
              line.type === "error" && "text-rose-500",
              line.type === "system" && "text-blue-400 font-semibold",
              line.type === "output" && "text-zinc-300",
            )}
          >
            {line.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-zinc-500 animate-pulse text-[10px] uppercase font-bold tracking-widest pt-1">
            Running system tasks...
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900/50 border-t border-dashed border-border/40 shrink-0">
        <span className="text-foreground font-bold shrink-0">
          kirtan@portfolio:~$
        </span>
        <div className="flex-grow flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent text-lime-400 focus:outline-none placeholder:text-zinc-600 caret-transparent"
            placeholder={
              isTyping ? "system processing..." : "type a command..."
            }
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {/* Custom Blinking terminal cursor */}
          {!isTyping && (
            <span
              className="absolute pointer-events-none bg-lime-400/90 w-1.5 h-3.5 animate-blink"
              style={{
                left: `${Math.min(input.length * 7.2, inputRef.current?.clientWidth || 200)}px`,
                display: isFocused ? "inline-block" : "none",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
