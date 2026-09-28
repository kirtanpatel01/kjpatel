import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import { ComponentPreview } from "@/components/component-preview";

export const metadata = {
  title: "Blue Button | Components",
};

const codeString = `<button className="rounded-lg bg-gradient-to-b from-blue-500 to-indigo-500 hover:from-blue-600 dark:from-blue-700 dark:to-indigo-600 dark:hover:from-blue-800 px-6 py-2 text-sm font-medium text-white inset-shadow-sm inset-shadow-blue-700/70 dark:inset-shadow-blue-400 cursor-pointer">
  Book a call
</button>`;

export default function BlueButtonPage() {
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
            Blue Button
          </h1>
          <p className="text-muted-foreground">
            A vibrant, gradient-based button with a subtle top edge highlight.
          </p>
        </div>

        <ComponentPreview code={codeString}>
          <button className="rounded-lg bg-gradient-to-b from-blue-500 to-indigo-500 hover:from-blue-600 dark:from-blue-700 dark:to-indigo-600 dark:hover:from-blue-800 px-6 py-2 text-sm font-medium text-white inset-shadow-sm inset-shadow-blue-700/70 dark:inset-shadow-blue-400 cursor-pointer">
            Book a call
          </button>
        </ComponentPreview>
      </SectionContainer>
    </PageContainer>
  );
}

