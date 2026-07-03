"use client";

import { experiences } from "@/lib/constants";
import { SectionContainer } from "./responsive-wrappers";
import { Badge } from "./ui/badge";

export default function Experience() {
  return (
    <SectionContainer id="experience" className="space-y-2">
      <h3 className="text-2xl font-bold">Experience</h3>

      <div className="flex flex-col gap-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="space-y-2 p-4 rounded-2xl text-secondary-foreground shadow shadow-primary/20 dark:shadow-transparent bg-muted/10 relative overflow-hidden dark:border border-border/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="">
                <h4 className="text-lg font-semibold space-x-2">
                  <span>{exp.role}</span>
                  <Badge variant="outline" className="tracking-wider">
                    {exp.type}
                  </Badge>
                </h4>
                <span className="text-foreground/70 font-semibold tracking-wide">
                  {exp.company}
                </span>
              </div>
              <Badge variant="secondary">{exp.period}</Badge>
            </div>

            <ul className="space-y-2 pl-2">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="text-muted-foreground">-</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
