import Link from "next/link";
import React from "react";
import {
  PageContainer,
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import { type ShowcaseIdea, showcaseIdeas } from "@/lib/constants";

const ShowcaseItem = ({ idea }: { idea: ShowcaseIdea }) => {
  return (
    <Link
      href={`/showcase/${idea.slug}`}
      className="max-w-lg mx-auto group block overflow-hidden border border-dotted hover:border-solid rounded-xl transition-all duration-300"
    >
      {/* Video / Preview Stage */}
      <div className="aspect-video relative bg-accent/5 overflow-hidden flex items-center justify-center">
        {/* We'll use a placeholder video for now */}
        <video
          src={`/videos/${idea.slug}.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover dark:invert-0 invert dark:hue-rotate-0 hue-rotate-180 group-hover:scale-[1.01] transition-all duration-150"
        />
      </div>

      {/* Info Section */}
      <div className="space-y-1 border-t border-dotted group-hover:border-solid bg-secondary/20 p-4 transition-all duration-300">
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
    <PageContainer>
      <SectionContainer>
        <SectionHeading>Showcase</SectionHeading>
        <p className="text-muted-foreground leading-relaxed sm:mt-2">
          An interactive collection of recurring UI/UX patterns, design layouts,
          and experimental components. A central vault built to capture and
          reuse attractive structures for future projects in one single place.
        </p>
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {showcaseIdeas.map((idea) => (
            <ShowcaseItem key={idea.slug} idea={idea} />
          ))}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

export default ShowcasePage;
