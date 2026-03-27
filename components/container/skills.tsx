"use client";

import Container from "../container";
import SectionHeading from "../section-heading";

const skills = [
  { name: "TypeScript", category: "Language" },
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js", category: "Runtime" },
  { name: "Express.js", category: "Backend" },
  { name: "Supabase", category: "BaaS" },
  { name: "DrizzleORM", category: "Tooling" },
  { name: "NeonDB", category: "Database" },
  { name: "MongoDB", category: "Database" },
];

export default function Skills() {
  return (
    <Container id="skills">
      <SectionHeading>03 / Skills</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-l border-t border-border">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative h-32 sm:h-48 border-r border-b border-border p-4 sm:p-8 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-muted-foreground transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div className="w-1 h-1 bg-border transition-colors" />
              </div>

              <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
    </Container>
  );
}
