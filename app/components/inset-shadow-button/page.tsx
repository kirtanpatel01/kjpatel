import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import { ComponentPreview } from "@/components/component-preview";

export const metadata = {
  title: "Inset Shadow Button | Components",
};

const codeString = `<button className="inline-flex items-center rounded-md bg-linear-to-br from-blue-500 to-blue-600 px-3 py-1.5 text-base tracking-wide text-zinc-100 hover:text-blue-100 text-shadow-sm shadow-[inset_4px_4px_12px_2px_var(--color-indigo-600),inset_4px_-4px_12px_2px_var(--color-indigo-600)] backdrop-blur-sm border border-indigo-700 cursor-pointer grayscale hover:grayscale-0 transform-all duration-250 active:translate-y-px">
  Welcome
</button>`;

export default function InsetShadowButtonPage() {
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
            Inset Shadow Button
          </h1>
          <p className="text-muted-foreground">
            A beautiful standard button with inset shadows and hover effects.
          </p>
        </div>

        <ComponentPreview code={codeString}>
          <button className="inline-flex items-center rounded-md bg-linear-to-br from-blue-500 to-blue-600 px-3 py-1.5 text-base tracking-wide text-zinc-100 hover:text-blue-100 text-shadow-sm shadow-[inset_4px_4px_12px_2px_var(--color-indigo-600),inset_4px_-4px_12px_2px_var(--color-indigo-600)] backdrop-blur-sm border border-indigo-700 cursor-pointer grayscale hover:grayscale-0 transform-all duration-250 active:translate-y-px">
            Welcome
          </button>
        </ComponentPreview>
      </SectionContainer>
    </PageContainer>
  );
}
