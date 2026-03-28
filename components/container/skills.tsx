"use client";
import Container from "../container";
import SectionHeading from "../section-heading";

interface Skill {
  name: string;
  color: string;
  icon?: string;
  image?: string;
}

const skills: Skill[] = [
  { name: "TypeScript", icon: "devicon-typescript-plain", color: "#3178c6" },
  { name: "React.js", icon: "devicon-react-original", color: "#61dafb" },
  { name: "Next.js", icon: "devicon-nextjs-plain", color: "#000000" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-original", color: "#06b6d4" },
  { name: "Node.js", icon: "devicon-nodejs-plain", color: "#339933" },
  { name: "Express.js", icon: "devicon-express-original", color: "#999999" },
  { name: "Supabase", icon: "devicon-supabase-plain", color: "#3ecf8e" },
  { name: "DrizzleORM", image: "/logos/drizzle.svg", color: "#c5f74f" },
  { name: "NeonDB", image: "/logos/neon.svg", color: "#00e0d9" },
  // { name: "TanStack Start", image: "/logos/tanstack.svg", color: "#ffb000" },
  { name: "MongoDB", icon: "devicon-mongodb-plain", color: "#47a248" },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <div
      className="group relative h-40 sm:h-52 border-r border-b border-border p-6 flex flex-col items-center justify-center gap-4 hover:bg-secondary/10"
    >
      <span className="absolute top-4 left-4 text-[10px] font-mono text-muted-foreground/30">
        {(index + 1).toString().padStart(2, '0')}
      </span>

      <div className="relative flex items-center justify-center pointer-events-none">
        {skill.icon ? (
          <i className={`${skill.icon} text-4xl`} style={{ color: skill.color }} />
        ) : skill.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={skill.image} alt={skill.name} className="w-9 h-9" />
        ) : null}
      </div>

      <h3 className="text-sm font-bold tracking-wider text-foreground/70 text-center mt-2 cursor-default">
        {skill.name}
      </h3>
    </div>
  );
};

export default function Skills() {
  return (
    <Container id="skills">
      <SectionHeading>01 / Skills</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-border mt-8">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </Container>
  );
}
