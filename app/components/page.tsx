import React from "react";
import Link from "next/link";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";

export const metadata = {
  title: "Components | Kirtan Patel",
  description: "UI component specimens and micro-interactions.",
};

const specimens = [
  {
    id: "01",
    name: "Blue Button",
    slug: "blue-button",
    component: (
      <button
        type="button"
        className="rounded-lg bg-gradient-to-b from-blue-500 to-indigo-500 hover:from-blue-600 dark:from-blue-700 dark:to-indigo-600 dark:hover:from-blue-800 px-6 py-2 text-sm font-medium text-white inset-shadow-sm inset-shadow-blue-700/70 dark:inset-shadow-blue-400 cursor-pointer transition-all duration-200 active:scale-95"
      >
        Book a call
      </button>
    ),
  },
  {
    id: "02",
    name: "Inset Shadow Button",
    slug: "inset-shadow-button",
    component: (
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-linear-to-br from-blue-500 to-blue-600 px-4 py-1.5 text-base tracking-wide text-zinc-100 hover:text-blue-100 text-shadow-sm shadow-[inset_4px_4px_12px_2px_var(--color-indigo-600),inset_4px_-4px_12px_2px_var(--color-indigo-600)] backdrop-blur-sm border border-indigo-700 cursor-pointer grayscale hover:grayscale-0 transition-all duration-200 active:translate-y-px"
      >
        Welcome
      </button>
    ),
  },
];

export default function ComponentsPage() {
  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Minimal Editorial Header */}
        {/* <div className="flex items-baseline justify-between border-b border-dashed border-border/80 pb-3">
          <h1 className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
            INDEX / COMPONENTS
          </h1>
          <span className="font-mono text-xs text-muted-foreground/80">
            [02]
          </span>
        </div> */}

        {/* Minimalist Specimen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-dashed border-border/80 divide-y md:divide-y-0 md:divide-x divide-dashed divide-border/80">
          {specimens.map((item) => (
            <div
              key={item.slug}
              className="group relative flex flex-col justify-between min-h-[300px] sm:min-h-[360px] p-6 transition-colors duration-200 hover:bg-accent/30"
            >
              {/* Full-card link (behind the button) */}
              <Link
                href={`/components/${item.slug}`}
                className="absolute inset-0 z-0"
                aria-label={`View ${item.name}`}
              />

              {/* Top Bar: Minimal mono meta */}
              <div className="relative z-10 flex items-center justify-between font-mono text-xs text-muted-foreground pointer-events-none">
                <span className="text-zinc-500 dark:text-zinc-400">#{item.id}</span>
                <span className="tracking-wide uppercase group-hover:text-foreground transition-colors">
                  {item.name}
                </span>
              </div>

              {/* Center Specimen Canvas */}
              <div className="relative z-20 my-auto py-12 flex items-center justify-center">
                {item.component}
              </div>

              {/* Micro Corner Ticks */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-foreground/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          ))}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
