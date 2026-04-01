"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
  onExpand?: (url: string) => void;
}

export const ProjectImageSlider = ({
  images,
  title,
  onExpand,
}: ProjectImageSliderProps) => {
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
          className="absolute top-2 right-2 z-30 p-1.5 rounded-full bg-black/50 text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          aria-label="Expand image"
        >
          <Maximize2 size={14} />
        </button>
      )}
    </div>
  );
};
