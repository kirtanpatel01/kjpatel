"use client";

import { experiences } from "@/lib/constants";
import { SectionContainer, SectionHeading } from "../responsive-wrappers";
import { Badge } from "../ui/badge";

export default function Experience() {
  return (
    <SectionContainer id="experience" className="space-y-2">
      <SectionHeading>Experience</SectionHeading>

      <div className="flex flex-col gap-4 p-4">
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-2">
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

            <ul className="pl-2 font-des">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="flex gap-2 leading-relaxed text-sm">
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
