"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { socialLinks } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="w-full max-w-5xl border-x border-dashed mx-auto border-t border-border px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs tracking-widest text-muted-foreground bg-background">
      {/* Left side: Copyright & Socials */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span>
          © 2026{" "}
          <span className="text-foreground font-semibold">Kirtan Patel</span>.
          Building products. Solving real problems.
        </span>

        {/* Social Icons */}
        <div className="flex items-center gap-4 sm:border-l sm:border-border sm:pl-4">
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
                      className="w-4 h-4 icon-mask bg-muted-foreground group-hover:bg-foreground transition-all duration-300"
                      style={{
                        maskImage: `url(${link.icon})`,
                        WebkitMaskImage: `url(${link.icon})`,
                      }}
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
                <p className="text-[10px]">{link.username}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Right side: Internship availability statement */}
      <span className="text-muted-foreground/80 font-medium">
        Currently available for internships & freelance opportunities.
      </span>
    </footer>
  );
}
