"use client";

import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experiences } from "@/lib/constants";
import { SectionContainer } from "../responsive-wrappers";

export default function Experience() {
  return (
    <SectionContainer id="experience" className="space-y-8 scroll-mt-24">
      <div className="space-y-2">
        <h3 className="text-3xl font-black tracking-tight">
          Professional Experience
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl">
          My journey in software engineering and professional roles.
        </p>
      </div>

      <div className="space-y-10">
        {experiences.map((exp, index) => {
          // Extract year from period (e.g., "January 2026 — March 2026" -> "2026")
          const year = exp.period.split(" ").pop() || "2026";

          return (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start group"
            >
              {/* Year Column - Left */}
              <div className="md:col-span-2 text-left md:text-right pr-4 font-black text-3xl md:text-4xl text-primary/80 select-none pt-1">
                {year}
              </div>

              {/* Timeline dot & line Column - Middle */}
              <div className="hidden md:flex md:col-span-1 flex-col items-center justify-start h-full pt-3 relative">
                <div className="w-3.5 h-3.5 rounded-full bg-primary border-4 border-background shadow z-10 group-hover:scale-125 transition-transform" />
                <div className="absolute top-4 w-[1px] h-full border-l border-dashed border-border/80" />
              </div>

              {/* Details Column - Right */}
              <div className="md:col-span-9 space-y-3 pb-2">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h4 className="text-xl font-extrabold text-foreground tracking-tight leading-none">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-bold text-muted-foreground">
                      ({exp.type})
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Briefcase size={12} />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Scannable Contributions */}
                <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed max-w-2xl border-t border-dashed border-border/50 pt-3">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <span className="text-muted-foreground select-none">
                        •
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
