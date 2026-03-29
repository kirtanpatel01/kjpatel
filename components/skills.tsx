"use client";

import { skills, type SkillCategory } from "@/lib/constants.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Database"];

export default function Skills() {
  return (
    <div className="my-12 max-w-4xl space-y-10">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold tracking-tight">Technical Arsenal</h3>
        <p className="max-w-xl text-muted-foreground leading-relaxed">
          The stack I use to engineer modern, high-performance web experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {CATEGORIES.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);
          
          return (
            <div key={category} className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-2">
                {category}
              </h4>
              <div className="flex flex-wrap gap-5">
                {categorySkills.map((skill) => (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <div className="group relative cursor-help">
                        {/* THEME-AWARE MASK (Next.js) */}
                        {skill.isNeutral && skill.image ? (
                          <div 
                            className="w-6 h-6 sm:w-8 sm:h-8 icon-mask transition-transform duration-300 group-hover:scale-110" 
                            style={{ 
                              maskImage: `url(${skill.image})`, 
                              WebkitMaskImage: `url(${skill.image})` 
                            }}
                          />
                        ) : skill.icon ? (
                          /* COLORED DEVICON (TS, React, etc.) */
                          <i 
                            className={`${skill.icon} colored text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110`} 
                          />
                        ) : skill.image ? (
                          /* STANDARD LOGO IMAGE (Drizzle, Neon, etc.) */
                          <img 
                            src={skill.image} 
                            alt={skill.name} 
                            className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110 object-contain" 
                          />
                        ) : null}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {skill.name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
