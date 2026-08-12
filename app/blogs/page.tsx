import React from "react";
import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";

export const metadata = {
  title: "Blog | Kirtan Patel",
  description:
    "Thoughts, notes, and engineering writing by Kirtan Patel on product, software, and web development.",
  alternates: {
    canonical: "/blogs",
  },
};

function BlogPage() {
  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Writing in progress
          </p>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            My blog is coming soon.
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            I&apos;m collecting the ideas, notes, and product thinking I want to share
            here — from engineering decisions to the small lessons that shaped my work.
          </p>
          <div className="rounded-2xl border border-dashed border-foreground/20 bg-secondary/20 p-4 sm:p-5">
            <p className="text-sm sm:text-base text-foreground/80">
              Until then, you can find my work, experiments, and software notes on the
              home page and in the labs section.
            </p>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

export default BlogPage;