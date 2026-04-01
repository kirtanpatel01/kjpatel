"use client";

import { projects, techMap, type Project } from "@/lib/constants";
import { Github, Globe, X, Maximize2 } from "lucide-react";

import { useEffect, useState } from "react";
import { SectionContainer } from "./responsive-wrappers";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProjectImageSlider = ({ 
  images, 
  title, 
  onExpand 
}: { 
  images: string[]; 
  title: string;
  onExpand?: (url: string) => void;
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const currentIndex = page;

  const paginate = (newIndex: number) => {
    setPage([newIndex, newIndex > currentIndex ? 1 : -1]);
  };

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      paginate(nextIndex);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length, isHovered, currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div 
      className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - image ${currentIndex + 1}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Expand Icon */}
      {onExpand && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpand(images[currentIndex]);
          }}
          className="absolute top-2 right-2 z-30 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          aria-label="Expand image"
        >
          <Maximize2 size={14} />
        </button>
      )}
    </div>
  );
};

const ProjectDialog = ({ 
  project, 
  onExpand 
}: { 
  project: Project;
  onExpand: (url: string) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState(project.images[0]);

  return (
    <DialogContent className="sm:max-w-2xl">
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
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/dialog-img:opacity-100 transition-opacity hover:bg-black/70"
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
                    selectedImage === img ? "border-primary shadow-md" : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${project.title} thumb ${idx}`} fill className="object-cover" />
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
                <h5 className="text-sm font-bold text-muted-foreground tracking-wider">Purpose</h5>
                <p className="text-sm leading-relaxed text-foreground/90 bg-primary/5 p-3 rounded-lg border border-primary/10">
                  {project.purpose}
                </p>
              </section>

              <section className="space-y-2">
                <h5 className="text-sm font-bold text-muted-foreground tracking-wider">About</h5>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {project.longDescription}
                </p>
              </section>

              <section className="space-y-3">
                <h5 className="text-sm font-bold text-muted-foreground tracking-wider">Features</h5>
                <ul className="grid grid-cols-1 gap-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex gap-2 items-start text-foreground/80">
                      <span className="text-primary mt-1 text-[10px]">■</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3 pb-4">
                <h5 className="text-sm font-bold text-muted-foreground tracking-wider">Tech Stack</h5>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => {
                    const tech = techMap[t];
                    return (
                      <Badge key={t} variant="secondary" className="px-3 py-1 flex items-center gap-2 bg-muted/50 font-normal">
                        {tech?.icon && <i className={`${tech.icon} text-sm`} style={{ color: tech.color }} />}
                        {tech?.image && <Image src={tech.image} alt={t} width={14} height={14} />}
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

export default function Projects() {
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  return (
    <SectionContainer id="projects" className="space-y-4">
      <h3 className="text-2xl font-bold">Projects</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div
                id={project.title.toLowerCase().replace(/\s+/g, '-')}
                className="group flex flex-col h-full p-4 rounded-2xl text-secondary-foreground bg-muted/10 border border-border/50 transition-all duration-300 hover:bg-muted/20 hover:border-primary/20 cursor-pointer"
              >
                <ProjectImageSlider 
                  images={project.images} 
                  title={project.title} 
                  onExpand={(url) => setFullScreenImage(url)}
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
            <ProjectDialog project={project} onExpand={(url) => setFullScreenImage(url)} />
          </Dialog>
        ))}
      </div>

      <AnimatePresence>
        {fullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullScreenImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12"
          >
            <button
              onClick={() => setFullScreenImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={fullScreenImage}
                alt="Full screen preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}

