import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/copy-button";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";

export interface ComponentPreviewProps {
  code: string;
  lang?: string;
  children?: React.ReactNode;
  preview?: React.ReactNode;
  className?: string;
  previewClassName?: string;
}

export async function ComponentPreview({
  code,
  lang = "tsx",
  children,
  preview,
  className,
  previewClassName,
}: ComponentPreviewProps) {
  let codeHtml = "";
  try {
    codeHtml = await codeToHtml(code, {
      lang,
      themes: {
        light: "ayu-light",
        dark: "ayu-dark",
      },
    });
  } catch {
    codeHtml = `<pre><code>${code}</code></pre>`;
  }

  const previewContent = children ?? preview;

  return (
    <Tabs defaultValue="preview" className={cn("w-full mt-6", className)}>
      <TabsList className="mb-2">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="mt-0">
        <div
          className={cn(
            "rounded-xl border border-border bg-card p-12 flex items-center justify-center min-h-[300px]",
            previewClassName,
          )}
        >
          {previewContent}
        </div>
      </TabsContent>

      <TabsContent value="code" className="mt-0">
        <div className="relative rounded-xl border border-border bg-muted/20 overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border/80 text-xs text-muted-foreground">
            <span className="tracking-wide font-medium text-foreground/70">
              {lang}
            </span>
            <CopyButton code={code} />
          </div>
          <div
            className="p-4 text-xs sm:text-sm leading-relaxed [&>pre]:whitespace-pre-wrap [&>pre]:break-words [&>pre]:bg-transparent! [&>pre]:m-0! [&>pre]:p-0! [&_code]:bg-transparent!"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default ComponentPreview;
