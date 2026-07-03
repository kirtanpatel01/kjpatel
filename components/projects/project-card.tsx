"use client";

import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type Project } from "@/lib/constants";
import { Badge } from "../ui/badge";
import { ProjectImageSlider } from "./image-slider";

interface ProjectCardProps {
  project: Project;
  onExpand: (url: string) => void;
  featured?: boolean;
}

// Map custom outcome highlights for each project
const projectOutcomes: Record<string, string> = {
  Morganize: "Built as sole developer, supporting multi-store POS transactions.",
  "Algorion AI": "Collaborated with team to deploy high-conversion UI layouts.",
};

const projectBadges: Record<string, string> = {
  Morganize: "SOLO BUILT • MULTI-STORE ERP",
  "Algorion AI": "TEAM PROJECT • PRODUCTION FRONTEND",
};

export const ProjectCard = ({
  project,
  onExpand,
  featured = false,
}: ProjectCardProps) => {
  const outcome = projectOutcomes[project.title] || project.impact;
  const badgeText = projectBadges[project.title] || "PRODUCTION WORK";
  const slug = project.title.toLowerCase().replace(/\s+/g, "-");

  if (featured) {
    return (
      <div
        id={slug}
        className="group flex flex-col md:grid md:grid-cols-12 gap-6 items-stretch rounded-2xl bg-muted/5 hover:bg-muted/10 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 p-6"
      >
        {/* Visual Slider - Left Column */}
        <div className="md:col-span-7 relative flex items-center overflow-hidden">
          <ProjectImageSlider
            images={project.images}
            title={project.title}
            onExpand={onExpand}
          />
        </div>

        {/* Content Details - Right Column */}
        <div className="md:col-span-5 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 font-bold uppercase tracking-wider text-[9px] px-2.5 py-0.5 rounded-md">
                {badgeText}
              </Badge>
              <h4 className="text-3xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h4>
            </div>

            {/* Narrative Storytelling Blocks */}
            <div className="space-y-3.5 text-xs text-foreground/80 leading-relaxed border-t border-dashed border-border/50 pt-3.5">
              <div className="space-y-0.5">
                <span className="font-extrabold text-muted-foreground uppercase text-[9px] tracking-wider">Problem</span>
                <p>{project.problem}</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-extrabold text-muted-foreground uppercase text-[9px] tracking-wider">Solution</span>
                <p>{project.solution}</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-extrabold text-primary uppercase text-[9px] tracking-wider">Outcome</span>
                <p className="font-semibold text-foreground">{outcome}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Minimal Monochrome Tech String */}
            <div className="text-[11px] text-muted-foreground font-semibold border-t border-dashed border-border/50 pt-3">
              Stack: <span className="text-foreground/80">{project.tech.join(" • ")}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <Link href={`/projects/${slug}`} className="flex-grow">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-bold text-xs tracking-wider rounded-lg hover:opacity-95 cursor-pointer transition-opacity">
                  <span>View Case Study</span>
                  <ArrowRight size={13} />
                </button>
              </Link>
              
              {project.github_link && (
                <Link href={project.github_link} target="_blank" rel="noopener noreferrer" className="w-12">
                  <button className="w-full h-[38px] flex items-center justify-center border border-dashed border-border hover:border-foreground/30 hover:bg-accent/40 text-foreground rounded-lg cursor-pointer transition-colors">
                    <Github size={15} />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Card
  return (
    <div
      id={slug}
      className="group flex flex-col h-full rounded-2xl bg-muted/5 hover:bg-muted/10 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1"
    >
      {/* Visual Slider */}
      <div className="relative aspect-video w-full overflow-hidden">
        <ProjectImageSlider
          images={project.images}
          title={project.title}
          onExpand={onExpand}
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-6 justify-between gap-5">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Badge variant="outline" className="border-border bg-accent/25 text-foreground/80 font-bold uppercase tracking-wider text-[8px] px-2 py-0.5 rounded-md">
              {badgeText}
            </Badge>
            <h4 className="text-xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
              {project.title}
            </h4>
          </div>

          {/* Narrative Storytelling Blocks */}
          <div className="space-y-3 text-xs text-foreground/80 leading-relaxed border-t border-dashed border-border/50 pt-3">
            <div className="space-y-0.5">
              <span className="font-extrabold text-muted-foreground uppercase text-[9px] tracking-wider">Problem</span>
              <p>{project.problem}</p>
            </div>
            <div className="space-y-0.5">
              <span className="font-extrabold text-muted-foreground uppercase text-[9px] tracking-wider">Solution</span>
              <p>{project.solution}</p>
            </div>
            <div className="space-y-0.5">
              <span className="font-extrabold text-primary uppercase text-[9px] tracking-wider">Outcome</span>
              <p className="font-semibold text-foreground">{outcome}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Tech String */}
          <div className="text-[10px] text-muted-foreground font-semibold border-t border-dashed border-border/50 pt-3">
            {project.tech.join(" • ")}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link href={`/projects/${slug}`} className="flex-grow">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-bold text-xs tracking-wider rounded-lg hover:opacity-95 cursor-pointer transition-opacity">
                <span>View Case Study</span>
                <ArrowRight size={13} />
              </button>
            </Link>

            {project.link && (
              <Link href={project.link} target="_blank" rel="noopener noreferrer" className="w-11">
                <button className="w-full h-[38px] flex items-center justify-center border border-dashed border-border hover:border-foreground/30 hover:bg-accent/40 text-foreground rounded-lg cursor-pointer transition-colors" title="Live Demo">
                  <ExternalLink size={13} />
                </button>
              </Link>
            )}
            
            {project.github_link && !project.link && (
              <Link href={project.github_link} target="_blank" rel="noopener noreferrer" className="w-11">
                <button className="w-full h-[38px] flex items-center justify-center border border-dashed border-border hover:border-foreground/30 hover:bg-accent/40 text-foreground rounded-lg cursor-pointer transition-colors" title="Source Code">
                  <Github size={13} />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
