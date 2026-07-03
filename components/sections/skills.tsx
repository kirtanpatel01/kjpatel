"use client";

import { type SkillCategory, skills } from "@/lib/constants";
import { SectionContainer } from "../responsive-wrappers";

const CATEGORIES: { name: SkillCategory; desc: string; stats: string }[] = [
  { 
    name: "Frontend", 
    desc: "Building fast, accessible interfaces focused on usability and responsiveness.", 
    stats: "Production UI" 
  },
  { 
    name: "Backend", 
    desc: "Developing scalable server-side applications with secure data access and efficient architecture.", 
    stats: "Modern APIs" 
  },
  { 
    name: "Database", 
    desc: "Designing reliable data layers optimized for performance and maintainability.", 
    stats: "Production Data" 
  }
];

export default function Skills() {
  return (
    <SectionContainer id="skills" className="space-y-6 scroll-mt-24">
      <div className="space-y-2">
        <h3 className="text-3xl font-black tracking-tight">Technical Expertise</h3>
        <p className="text-sm text-muted-foreground max-w-xl">
          Technologies I rely on to build performant, scalable production software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const categorySkills = skills.filter((s) => s.category === cat.name);

          return (
            <div 
              key={cat.name} 
              className="flex flex-col p-6 rounded-2xl bg-muted/5 relative overflow-hidden"
            >
              {/* Category Info & Stats */}
              <div className="space-y-2 pb-4 mb-4 border-b border-dashed border-border/60">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-black text-foreground">{cat.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                    {cat.stats}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
              </div>

              <div className="flex flex-col gap-2">
                {categorySkills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="flex items-center gap-3 p-1.5 rounded-xl border border-transparent hover:bg-accent/20 transition-all duration-200 group"
                  >
                    {/* Grayscale to natural color on hover */}
                    <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-accent/30 group-hover:bg-background transition-colors">
                      {skill.isNeutral && skill.image ? (
                        <div
                          className="w-4.5 h-4.5 icon-mask bg-muted-foreground group-hover:bg-foreground transition-colors"
                          style={{
                            maskImage: `url(${skill.image})`,
                            WebkitMaskImage: `url(${skill.image})`,
                          }}
                        />
                      ) : skill.icon ? (
                        <i
                          className={`${skill.icon} text-base text-muted-foreground group-hover:text-foreground grayscale group-hover:grayscale-0 transition-all duration-300`}
                          style={{ color: skill.color }}
                        />
                      ) : skill.image ? (
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="w-4.5 h-4.5 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      ) : null}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors">
                        {skill.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
