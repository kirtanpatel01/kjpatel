"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";

const ProjectItem = ({ project }: { project: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic Button Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-8 py-12 border-b border-border transition-colors hover:bg-secondary/20"
    >
      <div className="md:col-span-2 text-sm font-mono text-muted-foreground pt-1">
        {project.year}
      </div>
      
      <div className="md:col-span-5 flex flex-col gap-2 overflow-hidden">
        <h3 className="text-3xl font-bold tracking-tight group-hover:text-muted-foreground transition-colors duration-300">
             {project.title}
        </h3>

        <span className="text-sm text-muted-foreground">{project.tech}</span>
      </div>

      <div className="md:col-span-4 text-base leading-relaxed text-secondary-foreground/80">
        {project.description}
      </div>

      <div className="md:col-span-1 flex justify-end pt-1">
        <motion.div style={{ x: springX, y: springY }}>
            <Link 
              href={project.link} 
              target="_blank"
              onMouseMove={handleMouseMove}
              className="relative p-3 rounded-full border border-border bg-background flex items-center justify-center overflow-hidden hover:bg-[#ccff00] hover:text-black transition-colors"
            >
              <ArrowUpRight className="w-5 h-5 relative z-10" />
            </Link>
        </motion.div>
      </div>
    </div>
  );
};

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
        <div className="flex items-baseline justify-between">
           <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">02 / Projects</h2>
        </div>
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}