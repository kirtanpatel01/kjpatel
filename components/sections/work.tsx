"use client";

import * as Icons from "@/lib/constants/icons";
import { SectionContainer, SectionHeading } from "../responsive-wrappers";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { work } from "@/lib/constants/work";
import { ScrollReveal } from "../scroll-reveal";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TypeScript: Icons.TS,
  JavaScript: Icons.JS,
  React: Icons.React,
  "React.js": Icons.React,
  "Next.js": Icons.Nextjs,
  "TanStack Start": Icons.TanstackStart,
  Tailwind: Icons.Tailwind,
  "Tailwind CSS": Icons.Tailwind,
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
};

export default function Work() {
  return (
    <SectionContainer id="work" className="scroll-pt-4">
      <SectionHeading tag="Featured Systems">Work</SectionHeading>

      <div className="flex flex-col gap-10 sm:gap-14 pt-2 pb-16">
        {work.map((project, index) => (
          <ScrollReveal key={project.title} delay={index * 0.08} y={16}>
            <div
              id={`work-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="space-y-3 scroll-mt-20 p-5 -mx-5 rounded-2xl transition-colors duration-200 hover:bg-muted/35 dark:hover:bg-muted/15"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <Badge
                    variant={
                      project.badge === "Solo Built" ? "default" : "secondary"
                    }
                  >
                    {project.badge}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary font-heading font-medium"
                    >
                      {project.link}
                    </Link>
                  )}
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="active:scale-[0.96] transition-transform inline-flex"
                    >
                      <Button variant={"outline"} size={"sm"}>
                        GitHub
                        <Icons.Github />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm sm:text-base leading-relaxed text-desc">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <span className="font-semibold">Key Contributions:</span>
                <ul className="list-inside list-disc text-sm sm:text-[15px]">
                  {project.keyContributions.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed font-des">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 space-y-2">
                <span className="font-semibold">Tech Stack:</span>
                <div className="flex flex-wrap gap-3 mt-2">
                  {project.tech.map((t) => {
                    const IconComponent = ICON_MAP[t];
                    return (
                      <div
                        key={t}
                        className="flex justify-center items-center gap-1.5 px-2.5 py-1 rounded-full group select-none cursor-default border border-border/50 bg-gradient-to-b from-accent/60 to-accent/20 shadow-xs transition-colors"
                      >
                        {IconComponent ? (
                          <div className="flex items-center justify-center w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:rotate-7">
                            <IconComponent className="w-full h-full" />
                          </div>
                        ) : null}
                        <span className="text-xs font-medium tracking-wide text-foreground/80 group-hover:text-foreground">
                          {t}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
