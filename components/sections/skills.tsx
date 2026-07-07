"use client";

import React from "react";
import { type SkillCategory, skills } from "@/lib/constants";
import * as Icons from "@/lib/constants/icons";
import { SectionContainer, SectionHeading } from "../responsive-wrappers";

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Frameworks",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
];

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
  "React Query": Icons.ReactQuery,
  "Motion": Icons.Motion,
  "Vercel": Icons.Vercel,
  "Render": Icons.Render
};

export default function Skills() {
  return (
    <SectionContainer id="skills">
      <SectionHeading>Tech</SectionHeading>

      <div className="flex flex-col border-y border-dashed border-border/70 divide-y divide-dashed divide-border/40">
        {CATEGORIES.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);

          return (
            <div
              key={category}
              id={`skills-${category.toLowerCase()}`}
              className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 px-4 scroll-mt-20"
            >
              <h4 className="w-full sm:w-28 shrink-0 text-accent-foreground font-semibold text-sm sm:text-base sm:pr-2">
                {category}:
              </h4>
              <div className="flex flex-wrap gap-2.5 items-center">
                {categorySkills.map((skill) => {
                  const IconComponent = ICON_MAP[skill.name];

                  return (
                    <div
                      key={skill.name}
                      className="flex justify-center items-center gap-1.5 px-3.5 py-2 rounded-full border-0 border-foreground/10 bg-accent/60 hover:bg-accent/40 transition-all duration-200 hover:border-border/60 group select-none cursor-default inset-shadow-sm inset-shadow-foreground/15"
                    >
                      {IconComponent ? (
                        <div className="flex items-center justify-center w-4 h-4 shrink-0 transition-transform duration-200 group-hover:rotate-4">
                          <IconComponent className="w-full h-full" />
                        </div>
                      ) : null}
                      <span className="text-xs sm:text-sm font-medium tracking-wide text-foreground/80 group-hover:text-foreground">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
