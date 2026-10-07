import React from "react";
import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";
import { CopyLinkBox } from "./copy-link-box";
import { projects } from "@/lib/constants/projects";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Projects | Kirtan Patel",
  description:
    "Most of them are side projects curated to simplify my day-to-life.",
};



export default function ProjectsPage() {
  return (
    <PageContainer>
      <SectionContainer>
        <div className="space-y-2 border-b border-dotted border-border/80 p-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Most of them are side projects curated to simplify my day-to-life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="flex flex-col group relative"
            >

              {/* Gray Box Placeholder */}
              <div className="relative z-10 w-full aspect-[4/3] bg-muted/40 dark:bg-muted/10 rounded-sm border border-dashed border-border/80 transition-colors group-hover:bg-muted/60 dark:group-hover:bg-muted/20 flex items-center justify-center">
                {!project.link && (
                  <span className="text-sm font-medium text-muted-foreground/80">
                    Coming soon...
                  </span>
                )}
              </div>

              {/* Link Bar */}
              {project.link && <CopyLinkBox link={project.link} />}

              {/* Title & Description */}
              <div className="relative z-10 mt-3 space-y-1 ml-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground tracking-tight">
                    {project.title}
                  </h3>
                  {project.link && (
                    <Link href={`/projects/${project.slug}`} className="text-muted-foreground hover:text-foreground p-1 -ml-1 rounded-sm hover:bg-muted/50 transition-colors shrink-0" aria-label={`View ${project.title} details`}>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-snug">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
