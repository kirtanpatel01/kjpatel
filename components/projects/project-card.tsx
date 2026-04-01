"use client";

import { Github, Globe } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProjectImageSlider } from "./image-slider";
import { ProjectDialog } from "./project-dialog";
import type { Project } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  onExpand: (url: string) => void;
  isFullScreenOpen: boolean;
}

export const ProjectCard = ({
  project,
  onExpand,
  isFullScreenOpen,
}: ProjectCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          id={project.title.toLowerCase().replace(/\s+/g, "-")}
          className="group flex flex-col h-full p-4 rounded-2xl text-secondary-foreground bg-muted/10 border border-border/50 transition-all duration-300 hover:bg-muted/20 hover:border-primary/20 cursor-pointer"
        >
          <ProjectImageSlider
            images={project.images}
            title={project.title}
            onExpand={onExpand}
          />

          <div className="mt-4 flex flex-col flex-grow gap-2">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-xl font-bold tracking-tight">{project.title}</h4>
              <div className="flex items-center gap-3">
                {project.github_link && (
                  <div className="text-muted-foreground hover:text-primary transition-colors p-1">
                    <Github size={16} />
                  </div>
                )}
                {project.link && (
                  <div className="text-muted-foreground hover:text-primary transition-colors p-1">
                    <Globe size={16} />
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <ProjectDialog
        project={project}
        onExpand={onExpand}
        isFullScreenOpen={isFullScreenOpen}
      />
    </Dialog>
  );
};
