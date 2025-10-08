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
    <div className="max-w-xl mx-auto border dark:border-0 border-border/15 rounded shadow-md shadow-cyan-400/25 dark:shadow-cyan-700/20 p-4 sm:py-12 bg-white dark:bg-slate-700/25">
      <ul className="flex flex-col sm:flex-row justify-evenly gap-6">
        {skills.map((skill) => (
          <li key={skill.title} className="w-full flex flex-col items-start sm:items-center gap-2 sm:gap-6 md:px-4">
            <span className="font-medium">{skill.title}</span>
            <hr className="w-full border-border" />
            <ul className="flex flex-row sm:flex-col items-center gap-8">
              {skill.techs.map((tech) => (
                <li key={tech.name} className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <Image src={tech.src} alt={tech.name} width={40} height={40} className="size-8 sm:size-10 rounded-full"/>
                    </TooltipTrigger>
                    <TooltipContent>
                      {tech.name}
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default Skills