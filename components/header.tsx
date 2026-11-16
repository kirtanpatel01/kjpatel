"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { AccentThemePopover } from "./accent-theme-rail";

const navItems: { name: string; href: string }[] = [
  { name: "Work", href: "/work" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full max-w-3xl mx-auto sticky top-0 z-50 bg-background/80 backdrop-blur-lg flex items-center justify-between px-4 sm:px-6 md:px-8 h-12 sm:h-14">
      <Link
        href="/"
        aria-label="Home"
        className="shrink-0 flex items-center justify-center gap-2.5 active:scale-[0.96] transition-transform"
      >
        <div
          className="w-7 h-7 icon-mask bg-foreground"
          style={{
            maskImage: "url(/logo.svg)",
            WebkitMaskImage: "url(/logo.svg)",
          }}
        />
        <h3 className="text-lg font-semibold tracking-wider">kjpatel</h3>
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Desktop Navigation with animated pill */}
        <nav className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-2.5 py-1 transition-colors duration-150 select-none rounded-full",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground font-medium",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-muted/80 dark:bg-muted/40 rounded-full -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      bounce: 0,
                    }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="h-4 w-px bg-border shrink-0" />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ModeToggle />
          <AccentThemePopover className="flex xl:hidden" />
        </div>
      </div>
    </header>
  );
}
