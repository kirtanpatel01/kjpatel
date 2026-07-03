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

  return (
    <SectionContainer id="projects" className="space-y-4 scroll-pt-4">
      <h3 className="text-2xl font-bold">Projects</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onExpand={(url) => setFullScreenImage(url)}
          />
        ))}
      </div>

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
                className="absolute top-0 right-0 md:-top-10 md:-right-10 text-white/70 hover:text-white transition-colors z-[130]"
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
