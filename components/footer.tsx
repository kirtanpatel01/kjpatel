"use client";
import React from "react";
import { ArrowUp } from "lucide-react";
import { socialLinks } from "@/lib/constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full max-w-4xl border-x border-dashed mx-auto border-t border-border px-3 py-2 flex flex-row justify-between items-end sm:items-center gap-4 text-xs  tracking-widest text-muted-foreground bg-background">
      {/* Left side on desktop: Text and Links grouped together */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-2 sm:gap-4">
        <span>
          Built with ❤️ by <span className="text-foreground">Kirtan Patel</span>
        </span>

        {/* Social Icons - Left-aligned on Desktop, Above text on Mobile */}
        <div className="flex items-center gap-5 sm:gap-4 sm:border-l sm:border-border sm:pl-4">
          {socialLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
                >
                  {link.isNeutral ? (
                    <div 
                      className="w-4 h-4 icon-mask" 
                      style={{ maskImage: `url(${link.icon})`, WebkitMaskImage: `url(${link.icon})` }}
                    />
                  ) : (
                    <img 
                      src={link.icon} 
                      alt={link.name} 
                      className="w-4 h-4 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" 
                    />
                  )}
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className=" text-[10px]">{link.username}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Back to Top - Far right side */}
      {/* <button
        onClick={scrollToTop}
        className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer shrink-0"
      >
        <span className="hidden md:block">Back to Top</span>
        <ArrowUp className="w-4 h-4" />
      </button> */}
    </footer>
  );
}
