"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  FileCode2,
  FileJson,
  FileText,
  Info,
  ChevronDown,
  ChevronRight,
  File,
  Folder,
} from "lucide-react";
import { bundledThemes, createHighlighter, type Highlighter } from "shiki";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// --- 1. Types ---

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

// --- 2. CodeBlock Component ---

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

function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  themes = {
    light: "vitesse-light",
    dark: "vitesse-dark",
  },
}: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    async function highlight() {
      if (!highlighterInstance) {
        highlighterInstance = await createHighlighter({
          themes: Object.keys(bundledThemes),
          langs: [
            "tsx",
            "ts",
            "json",
            "md",
            "css",
            "html",
            "javascript",
            "typescript",
          ],
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
      <div className="relative flex text-sm min-w-full">
        {/* Line Numbers */}
        {showLineNumbers && (
          <div className="sticky left-0 top-0 z-10 w-12 text-right pr-4 text-muted-foreground/20 select-none py-2 border-r border-border/5 shrink-0 bg-background/50 backdrop-blur-sm">
            {lines.map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Code Content */}
        <div className={cn("flex-1 min-w-0", !showLineNumbers && "px-0")}>
          <div
            className="shiki-container py-2 px-0 leading-6 [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 whitespace-pre"
            dangerouslySetInnerHTML={{
              __html: highlightedCode || `<code>${code}</code>`,
            }}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" className="z-20" />
    </ScrollArea>
  );
}

// --- 3. FileTreeItem Component ---

interface FileTreeItemProps {
  node: FileNode;
  depth?: number;
  parentPath?: string;
  selectedPath: string | null;
  onSelect: (node: FileNode, path: string) => void;
}

function FileTreeItem({
  node,
  depth = 0,
  parentPath = "",
  selectedPath,
  onSelect,
}: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === "folder";

  const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isSelected = selectedPath === currentPath;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelect(node, currentPath);
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-2 py-1.5 pr-4 cursor-default transition-colors text-sm",
          isSelected
            ? "bg-secondary/80 text-foreground border-r border-primary font-medium"
            : "hover:bg-secondary/40 text-muted-foreground hover:text-foreground",
        )}
        style={{ paddingLeft: `${depth * 1 + 1}rem` }}
        onClick={handleClick}
      >
        {isFolder ? (
          <>
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <Folder size={14} className="text-blue-400 fill-blue-400/20" />
          </>
        ) : (
          <>
            <div className="w-[14px]" />
            <File
              size={14}
              className={cn(
                isSelected
                  ? "text-primary opacity-100"
                  : "text-muted-foreground opacity-70",
              )}
            />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </div>

      {isFolder && isOpen && node.children && (
        <div className="flex flex-col">
          {node.children.map((child) => (
            <FileTreeItem
              key={child.name}
              node={child}
              depth={depth + 1}
              parentPath={currentPath}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </>
  );
}

// --- 4. Main Stage Showcase Component ---

interface StageProps {
  fileData: FileNode[];
  codeMapping: Record<string, { code: string; language: string }>;
  previewComponent: React.ReactNode;
  defaultFilePath?: string;
  defaultFileNode?: FileNode;
  isMultiFile?: boolean;
}

export function Stage({
  fileData,
  codeMapping,
  previewComponent,
  defaultFilePath,
  defaultFileNode,
  isMultiFile = true,
}: StageProps) {
  const [activeFile, setActiveFile] = useState<{
    node: FileNode;
    path: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultFilePath && defaultFileNode) {
      setActiveFile({ node: defaultFileNode, path: defaultFilePath });
    } else if (!isMultiFile && fileData && fileData.length > 0) {
      setActiveFile({ node: fileData[0], path: fileData[0].name });
    }
  }, [defaultFilePath, defaultFileNode, fileData, isMultiFile]);

  const handleCopy = () => {
    if (!activeFile) return;
    const code = codeMapping[activeFile.path]?.code;
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith(".json"))
      return <FileJson size={14} className="text-yellow-500/80" />;
    if (name.endsWith(".tsx") || name.endsWith(".ts"))
      return <FileCode2 size={14} className="text-blue-400" />;
    return <FileText size={14} className="text-muted-foreground/80" />;
  };

  const activeCodeData = activeFile ? codeMapping[activeFile.path] : null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="preview" className="h-[700px] flex flex-col">
        <TabsList className="">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent
          value="preview"
          className="flex-1 border border-border rounded-xl overflow-hidden bg-background"
        >
          {previewComponent}
        </TabsContent>
        <TabsContent
          value="code"
          className="flex-1 flex flex-col md:flex-row border border-border rounded-xl divide-y md:divide-y-0 md:divide-x divide-border overflow-hidden bg-background"
        >
          {/* Sidebar */}
          {isMultiFile && (
            <div className="w-full md:w-64 flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-border/10">
              <div className="p-3 border-b text-xs font-bold uppercase tracking-widest text-muted-foreground bg-accent/5">
                Files
              </div>

              <ScrollArea className="h-40 md:flex-1 py-1 [&>[data-slot=scroll-area-scrollbar][data-orientation=vertical]]:hidden">
                {fileData.map((node) => (
                  <FileTreeItem
                    key={node.name}
                    node={node}
                    depth={0}
                    selectedPath={activeFile?.path || null}
                    onSelect={(node, path) => setActiveFile({ node, path })}
                  />
                ))}
              </ScrollArea>
            </div>
          )}
          {/* Code Section */}
          <div className="flex-1 flex flex-col bg-accent/2 overflow-hidden min-h-0">
            <div className="p-2 border-b bg-background flex items-center justify-between text-xs text-muted-foreground ">
              {activeFile ? (
                <>
                  <div className="flex items-center gap-2.5 px-1 text-foreground/80 overflow-hidden">
                    {getFileIcon(activeFile.node.name)}
                    <span className="opacity-90 truncate">
                      {activeFile.path}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={handleCopy}
                    className="hover:text-foreground shrink-0"
                    title="Copy code"
                  >
                    {copied ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </Button>
                </>
              ) : (
                <span className="opacity-40 italic px-2 py-1">
                  Select a file
                </span>
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              {activeFile ? (
                activeCodeData ? (
                  <CodeBlock
                    code={activeCodeData.code}
                    language={activeCodeData.language}
                  />
                ) : (
                  <div className="p-6 text-muted-foreground opacity-30 text-xs italic">
                    Source for {activeFile.path} not available.
                  </div>
                )
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground opacity-30 text-xs text-center p-12">
                  Pick a file to view code.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <p className="text-muted-foreground text-sm flex items-center justify-end gap-1 mt-2">
        <Info size={12} className="text-amber-500" /> This code component is
        inspired from{" "}
        <Link
          href="https://ui.shadcn.com/blocks#dashboard-01"
          target="_blank"
          className="text-primary underline underline-offset-2"
        >
          shadcn/ui
        </Link>
      </p>
    </div>
  );
}

// Named exports and aliases for backwards compatibility
export { Stage as CodeShowcase, CodeBlock };
export default Stage;
