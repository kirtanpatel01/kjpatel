"use client";

import * as Icons from "@/lib/constants/icons";
import { SectionContainer, SectionHeading } from "../responsive-wrappers";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { work } from "@/lib/constants/work";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TypeScript: Icons.TS,
  JavaScript: Icons.JS,
  "React.js": Icons.React,
  "Next.js": Icons.Nextjs,
  "TanStack Start": Icons.TanstackStart,
  "Tailwind CSS": Icons.Tailwind,
  "Shadcn/ui": Icons.Shadcn,
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
};

export default function Work() {
  return (
    <SectionContainer id="work" className="scroll-pt-4">
      <SectionHeading>Work</SectionHeading>

      <div className="flex flex-col divide-y divide-dashed">
        {work.map((project, index) => (
          <div key={index} className="space-y-4 p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
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
                    {/* <Button variant={"outline"} size={"sm"}> */}
                    {project.link}
                    {/* <Link2 className="rotate-135" /> */}
                    {/* </Button> */}
                  </Link>
                )}
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
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
              <h4 className="text-lg font-semibold tracking-wide">
                {project.subtitle}
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-desc">
                {project.description}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <span className="font-medium font-heading tracking-wide">
                Key Contributions:
              </span>
              <ul className="space-y-1 list-inside list-disc text-sm sm:text-base">
                {project.keyContributions.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="leading-relaxed font-desc text-foreground/80"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 space-y-2">
              <span className="font-semibold">Tech Stack:</span>
              <div className="flex flex-wrap gap-4 mt-2">
                {project.tech.map((t) => {
                  const IconComponent = ICON_MAP[t];
                  if (!IconComponent) return null;
                  return (
                    <div
                      key={t}
                      className="w-fit flex justify-center items-center gap-2.5 px-2.5 py-1.5 rounded-full border border-border/20 bg-accent/20 hover:bg-accent/40 transition-all duration-200 hover:border-border/60 group select-none cursor-default"
                    >
                      {IconComponent ? (
                        <div className="flex items-center justify-center w-5 h-5 shrink-0 transition-transform duration-200 group-hover:rotate-4">
                          <IconComponent className="w-full h-full" />
                        </div>
                      ) : null}
                      <span className="text-xs sm:text-sm font-medium tracking-wide text-foreground/80 group-hover:text-foreground">
                        {t}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
