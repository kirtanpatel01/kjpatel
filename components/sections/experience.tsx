"use client";

import { experiences } from "@/lib/constants";
import { ScrollReveal } from "../scroll-reveal";
import { SectionContainer, SectionHeading } from "../responsive-wrappers";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
  return (
    <SectionContainer id="experience">
      <SectionHeading tag="Career">Experience</SectionHeading>

      <div className="flex flex-col gap-10 sm:gap-14 pt-2">
        {experiences.map((exp, index) => (
          <ScrollReveal key={index} delay={index * 0.08} y={12}>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold flex items-center gap-2.5">
                    <span>{exp.role}</span>
                    <Badge variant="outline" className="tracking-wider">
                      {exp.type}
                    </Badge>
                  </h4>
                  {exp.website ? (
                    <Link
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-foreground/70 hover:text-foreground font-semibold tracking-wide hover:underline underline-offset-4 transition-colors group"
                    >
                      <span>{exp.company}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                    </Link>
                  ) : (
                    <span className="text-foreground/70 font-semibold tracking-wide">
                      {exp.company}
                    </span>
                  )}
                </div>
                <Badge variant="secondary">{exp.period}</Badge>
              </div>

              <ul className="space-y-2 pt-1 font-des">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex gap-2.5 leading-relaxed text-sm text-foreground/85">
                    <span className="text-muted-foreground/60 select-none">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
