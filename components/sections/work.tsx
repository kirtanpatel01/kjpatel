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
  "Motion": Icons.Motion
};

export default function Work() {
  return (
    <SectionContainer id="work" className="scroll-pt-4">
      <SectionHeading>Work</SectionHeading>

      <div className="flex flex-col divide-y divide-dashed">
        {work.map((project, index) => (
          <div
            key={index}
            id={`work-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="space-y-1 p-4 scroll-mt-20"
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
              <p className="text-sm sm:text-base leading-relaxed text-desc">
                {project.description}
              </p>
              {/* {project.role && (
                <p className="text-sm sm:text-base leading-relaxed mt-2 font-heading">
                  <span className="font-semibold text-foreground">Role: </span>
                  {project.role}
                </p>
              )} */}
            </div>

            <div className="space-y-4 pt-2">
              <span className="font-semibold">
                Key Contributions:
              </span>
              <ul className="list-inside list-disc text-sm sm:text-[15px]">
                {project.keyContributions.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="leading-relaxed font-des"
                  >
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
                      className="flex justify-center items-center gap-1.5 px-2 py-1 rounded-full group select-none cursor-default inset-shadow-xs inset-shadow-foreground/7 bg-gradient-to-b from-foreground/7 to-accent/20 shadow-xs dark:shadow-none shadow-foreground/7"
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
        ))}
      </div>
    </SectionContainer>
  );
}
