"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { AccentThemePopover } from "./accent-theme-rail";

const navItems: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full max-w-3xl sm:border-x border-dashed mx-auto sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg flex items-center justify-between px-2.5 h-11 sm:h-12">
      <Link
        href="/"
        aria-label="Home"
        className="shrink-0 flex items-center justify-center gap-2.5"
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
        {/* Desktop Navigation */}
        <nav className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors duration-150 select-none",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground font-medium",
                )}
              >
                {item.name}
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
