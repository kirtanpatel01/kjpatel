import React from "react";
import { PageContainer, SectionHeading } from "@/components/responsive-wrappers";
import Link from "next/link";
import { showcaseIdeas, type ShowcaseIdea } from "@/lib/constants";

const ShowcaseItem = ({ idea }: { idea: ShowcaseIdea }) => {
  return (
    <Link
      href={`/showcase/${idea.slug}`}
      className="max-w-lg mx-auto group block overflow-hidden space-y-4"
    >
      {/* Video / Preview Stage */}
      <div className="aspect-video relative bg-accent/5 overflow-hidden flex items-center justify-center rounded-xl">
        {/* We'll use a placeholder video for now */}
        <video
          src={`/videos/${idea.slug}.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover dark:invert-0 invert dark:hue-rotate-0 hue-rotate-180 transition-all duration-700"
        />
      </div>

      {/* Info Section */}
      <div className="space-y-1">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
          {idea.title}
        </h3>
        <p className="text-muted-foreground leading-snug line-clamp-2">
          {idea.description}
        </p>
      </div>
    </Link>
  );
};

function ShowcasePage() {
  return (
    <PageContainer className="space-y-12">
      <div>
        <SectionHeading>Showcase</SectionHeading>
        <p className="text-muted-foreground leading-relaxed mt-2">
          An interactive collection of recurring UI/UX patterns, design layouts, and 
          experimental components. A central vault built to capture and reuse attractive 
          structures for future projects in one single place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {showcaseIdeas.map((idea) => (
          <ShowcaseItem key={idea.slug} idea={idea} />
        ))}
      </div>
    </PageContainer>
  );
}

export default ShowcasePage;
