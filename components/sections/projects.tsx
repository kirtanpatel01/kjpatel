"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { projects } from "@/lib/constants";
import { ProjectCard } from "../projects/project-card";
import { SectionContainer } from "../responsive-wrappers";

export default function Projects() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  // Separate featured and standard projects
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <SectionContainer id="projects" className="space-y-8 scroll-mt-24">
      <div className="space-y-1">
        <h3 className="text-3xl font-black tracking-tight">Selected Work</h3>
        <p className="text-sm text-muted-foreground max-w-xl">
          A showcase of products I have designed and engineered from database
          architecture to interface polish.
        </p>
      </div>

      {/* Project Layout hierarchy */}
      <div className="space-y-6">
        {/* Featured Showcase Project */}
        {featuredProject && (
          <ProjectCard
            project={featuredProject}
            onExpand={(url) => setFullScreenImage(url)}
            featured={true}
          />
        )}

        {/* Secondary 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onExpand={(url) => setFullScreenImage(url)}
              featured={false}
            />
          ))}
        </div>
      </div>

      {/* Image Modal Lightbox */}
      <Dialog
        open={!!fullScreenImage}
        onOpenChange={() => setFullScreenImage(null)}
      >
        <DialogPortal>
          <DialogOverlay
            className="bg-black/90 z-[110]"
            onClick={() => setFullScreenImage(null)}
          />
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullScreenImage(null);
                }}
                className="absolute top-0 right-0 md:-top-10 md:-right-10 text-white/70 hover:text-white transition-colors z-[130] cursor-pointer"
              >
                <X size={32} />
              </button>
              <div
                className="relative w-full h-full cursor-zoom-out"
                onClick={() => setFullScreenImage(null)}
              >
                <Image
                  src={fullScreenImage!}
                  alt="Full screen preview"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </DialogPortal>
      </Dialog>
    </SectionContainer>
  );
}
