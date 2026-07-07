import Link from "next/link";
import React from "react";
import {
  PageContainer,
  SectionContainer,
  SectionTitle,
} from "@/components/responsive-wrappers";
import { type LabIdea, labIdeas } from "@/lib/constants";

const LabItem = ({ idea }: { idea: LabIdea }) => {
  return (
    <Link
      href={`/labs/${idea.slug}`}
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

function LabsPage() {
  return (
    <PageContainer>
      <SectionContainer className="p-4">
        <p className="text-lg font-medium">Labs is a home of a different types components which is used by me.</p>
        <ul className="list-disc list-inside text-foreground/80">
          <li>Some are my own creation,</li>
          <li>Some are inspired from different platforms along with my little tweak</li>
          <li>Some of them are completely copy pasted <i className="font-medium text-black">not code but the design :)</i></li>
        </ul>
      </SectionContainer>
      <SectionContainer className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labIdeas.map((idea) => (
            <LabItem key={idea.slug} idea={idea} />
          ))}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

export default LabsPage;
