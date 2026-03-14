"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import SectionHeading from "./section-heading";
import Container from "./container";

interface Project {
  year: string;
  title: string;
  description: string;
  tech: string;
  link: string;
}

const ProjectItem = ({ project }: { project: Project }) => {
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
  };

  return (
    <div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-8 py-12 transition-colors hover:bg-secondary/20"
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

export default function Projects() {
  const projects = [
    {
      title: "Upcurve",
      description: "Tracking platform for todos, habits, and exercises.",
      tech: "Next.js / NeonDB / DrizzleORM ",
      link: "https://upcurve-xi.vercel.app",
      year: "2026"
    },
    {
      title: "Morganize",
      description: "ERP + POS + Inventory Management System",
      tech: "Next.js / Supabase / TailwindCSS ",
      link: "#",
      year: "2026 (Present)"
    },
  ];

  return (
    <Container id="projects">
      <SectionHeading>02 / Projects</SectionHeading>
      <div className="flex flex-col divide-y divide-border">
        {projects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </div>
    </Container>
  );
}