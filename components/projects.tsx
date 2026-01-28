import Image from "next/image";
import Link from "next/link";

function Projects() {
  type Project = {
    type: string;
    src: string;
    title: string;
    desc: string;
    tech: string[];
    git: string;
    live: string;
  }

  const projects: Project[] = [
    {
      type: "Team Project",
      src: "/galigaliinfo.png",
      title: "Gali Gali Info",
      desc: "Web application specially desgined for shop owners who wants promot their products and analyze the traffic and trends in their local area.",
      tech: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
      ],
      git: "https://github.com/kirtanpatel01/galigaliinfo",
      live: "https://galigaliinfo.vercel.app/",
    },
    {
      type: "Team Project",
      src: "/fitcare.png",
      title: "Fit Care",
      desc: "A fitness web application which hepls to weight gain/loss/maintain by providing you insights and diet recommendation according to your needs.",
      tech: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
      ],
      git: "https://github.com/kirtanpatel01/fitcare",
      live: "https://fitcare-alpha.vercel.app/",
    },
  ]
  return (
    <div>
      <ul className="flex flex-col gap-12">
        {projects.map((project) => (
          <li key={project.title} className="flex flex-col lg:flex-row lg:gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs opacity-75">{project.type}</span>
              <Image src={project.src} alt={project.title} width={800} height={600} className="max-w-96 w-full rounded-lg" />
            </div>
            <div className="space-y-6 mt-5">
              <div className="space-y-1">
                <h1 className="text-lg font-bold">{project.title}</h1>
                <p className="text-sm max-w-3xl text-justify">{project.desc}</p>
              </div>
              <div className="flex items-center gap-6">
                {project.tech.map((t) => (
                  <Image key={t} src={t} alt={t} width={25} height={25} className="rounded-full" />
                ))}
              </div>
              <div className="space-x-4 text-black dark:text-white">
                <Link href={project.live} target="_blank">
                  <button className="relative bg-green-500 dark:bg-green-400/50 px-2 py-1 rounded border border-green-600 cursor-pointer">
                  <div className="absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full bg-green-400 animate-ping"></div>
                    Live
                  </button>
                </Link>
                <Link href={project.git} target="_blank">
                  <button className="bg-orange-400 dark:bg-orange-500/50 px-2 py-1 rounded border border-orange-600 cursor-pointer">Github</button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Projects