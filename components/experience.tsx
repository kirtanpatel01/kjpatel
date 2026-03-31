"use client";

import { experiences } from "@/lib/constants";
import { Badge } from "./ui/badge";

export default function Experience() {
  return (
    <div className="my-16 max-w-4xl space-y-4">
      <h3 className="text-2xl font-mono font-bold">Experience</h3>

      <div className="flex flex-col gap-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="max-w-3xl space-y-4 p-4 sm:p-6 rounded-2xl text-secondary-foreground shadow shadow-primary/20 dark:shadow-primary/10 bg-muted/10 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div className="">
                <h4 className="text-lg font-semibold">
                  {exp.role} <Badge variant="outline" className="tracking-wider">{exp.type}</Badge>
                </h4>
                <span className="text-muted-foreground font-semibold tracking-wide text-sm">
                  {exp.company}
                </span>
              </div>
              <Badge variant="ghost">
                {exp.period}
              </Badge>
            </div>

            <ul className="space-y-3.5">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="flex gap-4 leading-relaxed">
                  <div className="mt-2.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                  <span>
                    {resp}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
