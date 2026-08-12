import Link from "next/link";
import React from "react";
import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";
import { type LabIdea, labIdeas } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Creative experiments, UI patterns, and frontend prototypes built by Kirtan Patel.",
  alternates: {
    canonical: "/labs",
  },
};

const LabItem = ({ idea }: { idea: LabIdea }) => {
  return (
    <Link
      href={`/labs/${idea.slug}`}
      className="max-w-lg mx-auto group block overflow-hidden border border-dotted hover:border-solid rounded-xl transition-all duration-300"
    >
      <div className="space-y-1 bg-secondary/20 p-4 transition-all duration-300">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
          {idea.title}
        </h3>
        <p className="text-muted-foreground leading-snug line-clamp-3 text-sm">
          {idea.description}
        </p>
      </div>
    </Link>
  );
};

function LabsPage() {
  return (
    <PageContainer>
      <SectionContainer className="p-4">
        <div className="space-y-4">
          <p className="text-sm tracking-[0.2em] text-muted-foreground">
            Playground update
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My lab is coming soon.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            I&apos;m shaping a few practical experiments and interface ideas here — small
            systems, UI patterns, and creative prototypes that I keep refining.
          </p>
          <div className="rounded-2xl border border-dashed border-foreground/20 bg-secondary/20 p-4 sm:p-5">
            <p className="text-sm sm:text-base text-foreground/80">
              The live experiments are still being assembled, but the ideas are already
              taking shape in the work and projects I build every day.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* <SectionContainer className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
          {labIdeas.map((idea) => (
            <LabItem key={idea.slug} idea={idea} />
          ))}
        </div>
      </SectionContainer> */}
    </PageContainer>
  );
}

export default LabsPage;
