"use client";

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
  { name: "MongoDB", icon: "devicon-mongodb-plain", color: "#47a248" },
];

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Skills() {
  return (
    <div className="my-8 sm:my-16 max-w-2xl">
      <h3 className="text-xl font-bold font-mono">Tech</h3>
      <p className="mt-2 text-foreground/80">The stack I use to engineer modern, high-performance web experiences.</p>

      <div className="flex flex-wrap items-center mt-6 sm:mt-8 gap-6 sm:gap-8">
        {skills.map((skill) => (
          <Tooltip key={skill.name}>
            <TooltipTrigger asChild>
              <div className="hover:scale-105">
                {skill.icon ? (
                  <i 
                    className={`${skill.icon} text-2xl sm:text-3xl opacity-80 hover:opacity-100 transition-opacity`} 
                    style={{ color: skill.color }} 
                  />
                ) : skill.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={skill.image} 
                    alt={skill.name} 
                    className="w-6 h-6 sm:w-8 sm:h-8 opacity-60 hover:opacity-100 transition-opacity object-contain" 
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
}
