import { projects } from "@/lib/constants/projects";
import { notFound } from "next/navigation";
import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "@/lib/constants/icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const TECH_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TypeScript: Icons.TS,
  JavaScript: Icons.JS,
  React: Icons.React,
  "React.js": Icons.React,
  "Next.js": Icons.Nextjs,
  "TanStack Start": Icons.TanstackStart,
  "TanStack Table": Icons.TanstackStart,
  Tailwind: Icons.Tailwind,
  "Tailwind CSS": Icons.Tailwind,
  "Tailwind CSS v4": Icons.Tailwind,
  "Shadcn/ui": Icons.Shadcn,
  "Shadcn UI": Icons.Shadcn,
  "Node.js": Icons.Nodejs,
  "Express.js": Icons.Express,
  DrizzleORM: Icons.Drizzle,
  Git: Icons.Git,
  GitHub: Icons.Github,
  "Better Auth": Icons.BetterAuth,
  PostgreSQL: Icons.PostgreSQL,
  MongoDB: Icons.MongoDB,
  Supabase: Icons.Supabase,
  Prisma: Icons.Prisma,
  NeonDB: Icons.NeonDB,
  "React Query": Icons.ReactQuery,
  Firebase: Icons.Firebase,
  "Backblaze B2": Icons.Backblaze,
  Motion: Icons.Motion,
  Astro: Icons.Astro,
  "Cloudflare Workers": Icons.Cloudflare,
  Cloudflare: Icons.Cloudflare,
  "YouTube API": Icons.YouTube,
};

async function fetchOgImage(url: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const html = await res.text();
    const match =
      html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);

    let imageUrl = match ? match[1] : null;

    if (imageUrl && imageUrl.startsWith("/")) {
      const urlObj = new URL(url);
      imageUrl = `${urlObj.origin}${imageUrl}`;
    }

    return imageUrl;
  } catch (error) {
    console.error("Failed to fetch OG image for", url, error);
    return null;
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Projects - Kirtan Patel`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const previewImage = project.image || (await fetchOgImage(project.link));

  return (
    <PageContainer>
      {/* Hero Section */}
      <SectionContainer className="p-4 sm:p-6 space-y-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Project Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
              {project.title}
            </h1>

            {/* Action Links */}
            {(project.link || project.githubLink) && (
              <div className="flex flex-wrap items-center gap-2">
                {project.link && (
                  <Button asChild size="sm" variant="default" className="group/live">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                      aria-label={`Open ${project.title} Live Application`}
                    >
                      <span>Live App</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                    </a>
                  </Button>
                )}
                {project.githubLink && (
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                      aria-label={`View ${project.title} Source Code on GitHub`}
                    >
                      <Icons.Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-desc">
            {project.description}
          </p>
        </div>

        {/* Full-Width Visual Preview */}
        <div className="w-full overflow-hidden rounded-md border border-dashed border-border/80 bg-muted/20 group">
          <div className="relative aspect-[1200/630] w-full overflow-hidden flex items-center justify-center">
            {previewImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={previewImage}
                alt={`${project.title} Preview`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <span className="text-sm font-medium text-muted-foreground/80">
                Coming soon...
              </span>
            )}
          </div>
        </div>
      </SectionContainer>

      {/* Features Section */}
      {project.features && project.features.length > 0 && (
        <SectionContainer className="p-4 sm:p-6 space-y-4 border-t border-dashed border-border/70">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
            Key Features
          </h2>
          <ul className="space-y-2.5 text-sm">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span
                  className="mt-2 size-1.5 rounded-full bg-foreground/60 shrink-0"
                  aria-hidden="true"
                />
                <span className="leading-relaxed text-foreground/90">{feature}</span>
              </li>
            ))}
          </ul>
        </SectionContainer>
      )}

      {/* Tech Stack Section */}
      {project.tech && project.tech.length > 0 && (
        <SectionContainer className="p-4 sm:p-6 space-y-4 border-t border-dashed border-border/70">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-heading">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.tech.map((techName) => {
              const IconComponent = TECH_ICON_MAP[techName];
              return (
                <div
                  key={techName}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/50 bg-gradient-to-b from-accent/60 to-accent/20 shadow-xs text-xs font-medium text-foreground select-none"
                >
                  {IconComponent && (
                    <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                      <IconComponent className="w-full h-full" />
                    </div>
                  )}
                  <span>{techName}</span>
                </div>
              );
            })}
          </div>
        </SectionContainer>
      )}
    </PageContainer>
  );
}
