import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function Skills() {
  type Tech = {
    name: string;
    src: string;
  }
  type Skills = {
    title: string;
    techs: Tech[]
  }
  const skills: Skills[] = [
    {
      title: "Frontend",
      techs: [
        {
          name: "React.js",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
        },
        {
          name: "Next.js",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
        },
        {
          name: "Tailwind",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
        }
      ]
    },
    {
      title: "Backend",
      techs: [

        {
          name: "Node.js",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
        },
        {
          name: "Express.js",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
        }
      ]
    },
    {
      title: "Database",
      techs: [
        {
          name: "Supabase",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg"
        },
        {
          name: "Mongodb",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
        },
        {
          name: "Appwrite",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/appwrite/appwrite-original.svg"
        }
      ]
    },
  ]
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <div key={skill.title} className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-center border-b border-border pb-2">{skill.title}</h3>
          <ul className="flex flex-wrap justify-center gap-4">
            {skill.techs.map((tech) => (
              <li key={tech.name}>
                <Tooltip>
                  <TooltipTrigger>
                    <Image src={tech.src} alt={tech.name} width={40} height={40} className="size-10 hover:scale-110 transition-transform cursor-help"/>
                  </TooltipTrigger>
                  <TooltipContent>
                    {tech.name}
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

  )
}

export default Skills