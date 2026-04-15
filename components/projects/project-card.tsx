"use client";

import { Github, Globe } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProjectImageSlider } from "./image-slider";
import { ProjectDialog } from "./project-dialog";
import { techMap, type Project } from "@/lib/constants";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onExpand: (url: string) => void;
  isFullScreenOpen: boolean;
}
// <Dialog>
//   <DialogTrigger asChild>

export const ProjectCard = ({
  project,
  onExpand,
  isFullScreenOpen,
}: ProjectCardProps) => {
  return (
    <div
      id={project.title.toLowerCase().replace(/\s+/g, "-")}
      className="group flex flex-col h-full p-4 rounded-2xl text-secondary-foreground bg-muted/10 border border-border/50 transition-all duration-300 hover:bg-muted/20 hover:border-primary/20"
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
              <Link href={project.github_link} target="_blank" rel="noopener noreferrer">
                <Button variant={"ghost"} size={"icon"} className="text-muted-foreground hover:text-green-500 transition-colors p-1 cursor-pointer">
                  <Github size={16} />
                </Button>
              </Link>
            )}
            {project.link && (
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <Button variant={"ghost"} size={"icon"} className="text-muted-foreground hover:text-pink-500 transition-colors p-1 cursor-pointer">
                  <Globe size={16} />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <p className="text-sm text-foreground/70 ">
          {project.longDescription}
        </p>

        <div className="flex bg-secondary/30 py-1 border border-dotted rounded-full w-fit ">
          {project.tech.map((t) => {
            const tech = techMap[t];
            return (
              <Badge
                key={t}
                variant="ghost"
              >
                {tech?.icon && (
                  <i
                    className={`${tech.icon} text-2xl`}
                    style={{ color: tech.color }}
                  />
                )}
                {tech?.image && (
                  <Image src={tech.image} alt={t} width={24} height={24} />
                )}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

{/* </DialogTrigger>
<ProjectDialog
  project={project}
  onExpand={onExpand}
  isFullScreenOpen={isFullScreenOpen}
/>
</Dialog> */}