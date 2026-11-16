"use client";

import React from "react";
import { type SkillCategory, skills } from "@/lib/constants";
import * as Icons from "@/lib/constants/icons";
import { ScrollReveal } from "../scroll-reveal";
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
  Motion: Icons.Motion,
  Vercel: Icons.Vercel,
  Render: Icons.Render,
};

export default function Skills() {
  return (
    <SectionContainer id="skills">
      <SectionHeading tag="Capabilities">Stack</SectionHeading>

      <div className="flex flex-col gap-6 sm:gap-8 pt-2">
        {CATEGORIES.map((category, index) => {
          const categorySkills = skills.filter((s) => s.category === category);

          return (
            <ScrollReveal
              key={category}
              delay={index * 0.05}
              y={10}
            >
              <div
                id={`skills-${category.toLowerCase()}`}
                className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 scroll-mt-20"
              >
                <h4 className="w-full sm:w-28 shrink-0 text-foreground/70 font-semibold text-sm sm:text-base pt-1">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {categorySkills.map((skill) => {
                    const IconComponent = ICON_MAP[skill.name];

                    return (
                      <div
                        key={skill.name}
                        className="flex justify-center items-center gap-1.5 px-3 py-1.5 rounded-full group select-none cursor-default border border-border/50 bg-gradient-to-b from-accent/60 to-accent/20 shadow-xs transition-colors"
                      >
                        {IconComponent ? (
                          <div className="flex items-center justify-center w-4.5 h-4.5 shrink-0 transition-transform duration-200 group-hover:rotate-7">
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
            </ScrollReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
