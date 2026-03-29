"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { PageContainer } from "@/components/responsive-wrappers";
import { projects, techMap, type Project } from "@/lib/constants.ts";

const ProjectItem = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLDivElement>(null);

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
  };

  return (
    <div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-6 py-4 sm:py-6 lg:py-12 px-4 transition-colors hover:bg-secondary/20 "
    >
      <div className="md:col-span-2 text-sm font-mono text-muted-foreground pt-1">
        {project.year}
      </div>

      <div className="md:col-span-5 flex flex-col gap-2 overflow-hidden">
        <h3 className="text-3xl font-bold tracking-tight group-hover:text-muted-foreground transition-colors duration-300">
          {project.title}
        </h3>

        <div className="w-fit flex items-center gap-2 mt-2">
          {project.tech.map((t) => {
            const tech = techMap[t];
            if (!tech) return <span key={t} className="text-xs text-muted-foreground">{t}</span>;

            return (
              <div
                key={t}
                className="group/icon relative flex items-center justify-center p-2 rounded-full border border-border bg-accent/50 hover:bg-accent/60 shadow-sm"
                title={t}
              >
                {tech.icon ? (
                  <i className={`${tech.icon} text-lg`} style={{ color: tech.color }} />
                ) : tech.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={tech.image} alt={t} className="w-4 h-4" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-4 text-base leading-relaxed text-secondary-foreground/80">
        {project.description}
      </div>

      <div className="absolute top-0 right-0 md:relative md:col-span-1 flex justify-end pt-1">
        <motion.div style={{ x: springX, y: springY }}>
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            className="relative p-3 rounded-full bg-background flex items-center justify-center overflow-hidden hover:bg-primary hover:text-black transition-colors"
          >
            <ArrowUpRight className="w-5 h-5 relative z-10" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  return (
    <PageContainer className="divide-y divide-border">
      {projects.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </PageContainer>
  );
}
