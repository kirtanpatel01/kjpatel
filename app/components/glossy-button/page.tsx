import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/copy-button";
import { codeToHtml } from "shiki";

export const metadata = {
  title: "Glossy Blue Button | Components",
};

const codeString = `<button className="rounded-lg bg-[#0052FF] px-6 py-2 text-sm font-medium text-white shadow-[inset_0_4px_4px_rgba(0,229,255,0.5)] hover:bg-[#0047df] transition-colors">
  Book a call
</button>`;

export default async function GlossyButtonPage() {
  const codeHtml = await codeToHtml(codeString, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6 space-y-6">
        <Link
          href="/components"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to components
        </Link>
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Glossy Blue Button
          </h1>
          <p className="text-muted-foreground">
            A vibrant, gradient-based button with a subtle top edge highlight.
          </p>
        </div>

        <Tabs defaultValue="preview" className="w-full mt-6">
          <TabsList className="mb-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-0">
            <div className="rounded-xl border border-border bg-card p-12 flex items-center justify-center min-h-[300px]">
              <button className="rounded-lg bg-[#0052FF] px-6 py-2 text-sm font-medium text-white shadow-[inset_0_4px_4px_rgba(0,229,255,0.5)] hover:bg-[#0047df] transition-colors">
                Book a call
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="mt-0">
            <div className="relative rounded-xl border border-border bg-muted/20 overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border/80 text-xs text-muted-foreground">
                <span className="tracking-wide font-medium text-foreground/70">
                  tsx
                </span>
                <CopyButton code={codeString} />
              </div>
              <div 
                className="p-4 text-xs sm:text-sm leading-relaxed [&>pre]:whitespace-pre-wrap [&>pre]:break-words [&>pre]:bg-transparent! [&>pre]:m-0! [&>pre]:p-0! [&_code]:bg-transparent!"
                dangerouslySetInnerHTML={{ __html: codeHtml }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </PageContainer>
  );
}
