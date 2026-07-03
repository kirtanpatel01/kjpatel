"use client";

import { Github, Globe, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Project, techMap } from "@/lib/constants";

interface ProjectDialogProps {
  project: Project;
  onExpand: (url: string) => void;
  isFullScreenOpen: boolean;
}

export const ProjectDialog = ({
  project,
  onExpand,
  isFullScreenOpen,
}: ProjectDialogProps) => {
  const [selectedImage, setSelectedImage] = useState(project.images[0]);

  return (
    <DialogContent
      className="sm:max-w-2xl"
      onInteractOutside={(e) => {
        if (isFullScreenOpen) e.preventDefault();
      }}
      onEscapeKeyDown={(e) => {
        if (isFullScreenOpen) e.preventDefault();
      }}
    >
      <ScrollArea className="max-h-[80vh]">
        <div className="flex flex-col gap-4 p-1 pr-4">
          {/* Main Image Container */}
          <div className="space-y-4">
            <div className="relative group/dialog-img aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border/50 shadow-sm">
              <Image
                src={selectedImage}
                alt={project.title}
                fill
                className="object-cover object-top"
                priority
              />
              <button
                onClick={() => onExpand(selectedImage)}
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/50 text-white opacity-100 md:opacity-0 group-hover/dialog-img:opacity-100 transition-opacity hover:bg-black/70"
                aria-label="Expand image"
              >
                <Maximize2 size={16} />
              </button>
            </div>
            {/* Thumbs */}
            <div className="grid grid-cols-5 gap-2 overflow-x-auto pb-2">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-video rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? "border-primary shadow-md"
                      : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} thumb ${idx}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <DialogHeader>
              <div className="flex items-center justify-between gap-4">
                <DialogTitle>{project.title}</DialogTitle>
                <div className="flex items-center gap-3">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe size={18} />
                    </a>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <section className="space-y-2">
                <h5 className="text-sm font-bold text-muted-foreground tracking-wider">
                  Purpose
                </h5>
                <p className="text-sm leading-relaxed text-foreground/90 bg-primary/5 p-3 rounded-lg border border-primary/10">
                  {project.purpose}
                </p>
              </section>

              <section className="space-y-2">
                <h5 className="text-sm font-bold text-muted-foreground tracking-wider">
                  About
                </h5>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {project.longDescription}
                </p>
              </section>

              <section className="space-y-3">
                <h5 className="text-sm font-bold text-muted-foreground tracking-wider">
                  Features
                </h5>
                <ul className="grid grid-cols-1 gap-2">
                  {project.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm flex gap-2 items-start text-foreground/80"
                    >
                      <span className="text-primary mt-1 text-[10px]">■</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3 pb-4">
                <h5 className="text-sm font-bold text-muted-foreground tracking-wider">
                  Tech Stack
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => {
                    const tech = techMap[t];
                    return (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="px-3 py-1 flex items-center gap-2 bg-muted/50 font-normal"
                      >
                        {tech?.icon && (
                          <i
                            className={`${tech.icon} text-sm`}
                            style={{ color: tech.color }}
                          />
                        )}
                        {tech?.image && (
                          <Image
                            src={tech.image}
                            alt={t}
                            width={14}
                            height={14}
                          />
                        )}
                        {t}
                      </Badge>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};
