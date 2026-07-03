"use client";

import React from "react";
import { type SkillCategory, skills } from "@/lib/constants";
import * as Icons from "@/lib/constants/skills-assets";
import { SectionContainer, SectionHeading } from "../responsive-wrappers";

const CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Database"];

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

export default function Skills() {
  return (
    <SectionContainer id="skills">
      <SectionHeading>Tech</SectionHeading>

      <div className="grid grid-cols-3 divide-x">
        {CATEGORIES.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);

          return (
            <div key={category} className="sm:space-y-6">
              <h4 className="text-center text-accent-foreground font-semibold border-b py-2 sm:py-4">
                {category}
              </h4>
              <div className="flex flex-col items-center gap-4 sm:px-8 sm:pb-8 p-4">
                {categorySkills.map((skill) => {
                  const IconComponent = ICON_MAP[skill.name];

                  return (
                    <div
                      key={skill.name}
                      className="h-10 w-10 sm:w-fit flex justify-center items-center gap-2.5 px-2.5 py-1.5 rounded-full border border-border/20 bg-accent/20 hover:bg-accent/40 transition-all duration-200 hover:border-border/60 group select-none cursor-default"
                    >
                      {IconComponent ? (
                        <div className="flex items-center justify-center w-6 h-6 sm:w-5 sm:h-5 shrink-0 transition-transform duration-200 group-hover:rotate-4">
                          <IconComponent className="w-full h-full" />
                        </div>
                      ) : null}
                      <span className="text-sm font-medium tracking-wide text-foreground/80 group-hover:text-foreground hidden sm:block">
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
