"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type SkillCategory, skills } from "@/lib/constants";
import { SectionContainer } from "./responsive-wrappers";

const CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Database"];

export default function Skills() {
  return (
    <SectionContainer id="skills" className="space-y-2">
      <h3 className="text-2xl font-bold">Tech</h3>
      <div className="flex flex-col gap-4 ml-1">
        {CATEGORIES.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);

          return (
            <div key={category} className="space-y-2">
              <h4 className="text-muted-foreground underline underline-offset-4 decoration-border">
                {category}
              </h4>
              <div className="flex flex-wrap gap-8 ml-2">
                {categorySkills.map((skill) => (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <div className="group relative">
                        {/* THEME-AWARE MASK (Next.js) */}
                        {skill.isNeutral && skill.image ? (
                          <div
                            className="w-6 h-6 sm:w-8 sm:h-8 icon-mask"
                            style={{
                              maskImage: `url(${skill.image})`,
                              WebkitMaskImage: `url(${skill.image})`,
                            }}
                          />
                        ) : skill.icon ? (
                          /* COLORED DEVICON (TS, React, etc.) */
                          <i
                            className={`${skill.icon} colored text-2xl sm:text-3xl`}
                          />
                        ) : skill.image ? (
                          /* STANDARD LOGO IMAGE (Drizzle, Neon, etc.) */
                          <img
                            src={skill.image}
                            alt={skill.name}
                            className="w-6 h-6 sm:w-8 sm:h-8"
                          />
                        ) : null}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">{skill.name}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
