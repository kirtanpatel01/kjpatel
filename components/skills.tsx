"use client";

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
    <section id="skills" className="py-24 border-t border-border">
      <div className="mb-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">03 / Expertise</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-l border-t border-border">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative h-48 border-r border-b border-border p-8 flex flex-col justify-between cursor-default overflow-hidden hover:bg-[#ccff00] transition-colors duration-300"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-muted-foreground group-hover:text-black transition-colors">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div className="w-1 h-1 bg-border group-hover:bg-black transition-colors" />
            </div>

            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-black transition-colors">
                {skill.category}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-black transition-colors">
                {skill.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
