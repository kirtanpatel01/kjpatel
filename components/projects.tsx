"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Gali Gali Info",
      category: "Commerce",
      description: "Hyper-local traffic analysis and product promotion platform.",
      tech: "React / Node / MongoDB",
      link: "https://galigaliinfo.vercel.app/",
      year: "2024"
    },
    {
      title: "Fit Care",
      category: "Health",
      description: "AI-powered diet and workout planner with metabolic tracking.",
      tech: "Next.js / Supabase / AI",
      link: "https://fitcare-alpha.vercel.app/",
      year: "2023"
    },
  ];

  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex items-baseline justify-between">
           <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">01 / Selected Works</h2>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-8 py-12 border-b border-border transition-colors hover:bg-secondary/30"
            >
              <div className="md:col-span-2 text-sm font-mono text-muted-foreground pt-1">
                {project.year}
              </div>
              
              <div className="md:col-span-5 flex flex-col gap-2">
                <h3 className="text-3xl font-bold tracking-tight group-hover:underline decoration-1 underline-offset-4">
                  {project.title}
                </h3>
                <span className="text-sm text-muted-foreground">{project.tech}</span>
              </div>

              <div className="md:col-span-4 text-base leading-relaxed text-secondary-foreground/80">
                {project.description}
              </div>

              <div className="md:col-span-1 flex justify-end pt-1">
                <Link 
                  href={project.link} 
                  target="_blank"
                  className="p-2 rounded-full border border-border bg-background hover:bg-foreground hover:text-background transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}