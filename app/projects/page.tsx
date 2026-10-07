import { HugeiconsIcon } from "@hugeicons/react";
import { LinkSquare01Icon } from "@hugeicons/core-free-icons";
import React from "react";
import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";
import { CopyLinkBox } from "./copy-link-box";
import { projects } from "@/lib/constants/projects";
import Link from "next/link";

export const metadata = {
  title: "Projects | Kirtan Patel",
  description:
    "Most of them are side projects curated to simplify my day to life.",
};

async function fetchOgImage(url: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const html = await res.text();
    const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) || 
                  html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    
    let imageUrl = match ? match[1] : null;
    
    // Resolve relative URLs
    if (imageUrl && imageUrl.startsWith('/')) {
      const urlObj = new URL(url);
      imageUrl = `${urlObj.origin}${imageUrl}`;
    }
    
    return imageUrl;
  } catch (error) {
    console.error("Failed to fetch OG image for", url, error);
    return null;
  }
}

export default async function ProjectsPage() {
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      const ogImage = await fetchOgImage(project.link);
      return { ...project, ogImage };
    })
  );
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
          {projectsWithImages.map((project, idx) => (
            <div
              key={idx}
              className="flex flex-col group relative"
            >

              {/* Gray Box Placeholder */}
              <div className="relative z-10 w-full aspect-[1200/630] bg-muted/40 dark:bg-muted/10 rounded-sm border border-dashed border-border/80 transition-colors group-hover:bg-muted/60 dark:group-hover:bg-muted/20 flex items-center justify-center overflow-hidden">
                {project.ogImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={project.ogImage} alt={`${project.title} Preview`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : !project.link && (
                  <span className="text-sm font-medium text-muted-foreground/80">
                    Coming soon...
                  </span>
                )}
              </div>

              {/* Link Bar */}
              {project.link && <CopyLinkBox link={project.link} />}

              {/* Title & Description */}
              {project.link ? (
                <Link href={`/projects/${project.slug}`} className="relative z-10 mt-3 space-y-1 ml-0.5 block group/link outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground tracking-tight group-hover/link:underline">
                      {project.title}
                    </h3>
                    <div className="text-muted-foreground group-hover/link:text-foreground p-1 -ml-1 rounded-sm transition-colors shrink-0" aria-hidden="true">
                      <HugeiconsIcon icon={LinkSquare01Icon} className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {project.description}
                  </p>
                </Link>
              ) : (
                <div className="relative z-10 mt-3 space-y-1 ml-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
