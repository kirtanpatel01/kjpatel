"use client";

import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Kbd } from "./ui/kbd";

const navItems = [
  { name: "Work", id: "projects", href: "#projects" },
  { name: "Experience", id: "experience", href: "#experience" },
  { name: "Contact", id: "contact", href: "#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Active section tracking on scroll
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset adjusted for header height

      // Check if at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      let currentSection = "";
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = item.id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Smooth scroll handler
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <header className="w-full max-w-5xl border-x border-dashed mx-auto sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="shrink-0 flex items-center justify-center font-bold tracking-tight text-xl text-foreground hover:text-primary transition-colors"
        >
          Kirtan.
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1.5 text-sm"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id && isHomePage;
            const isHighlighted =
              hoveredSection === item.id ||
              (hoveredSection === null && isActive);

            return (
              <Link
                key={item.id}
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "relative px-4 py-1.5 rounded-full tracking-widest text-[13px] font-semibold transition-colors duration-200 cursor-pointer select-none",
                  isActive
                    ? "text-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onMouseEnter={() => setHoveredSection(item.id)}
              >
                {isHighlighted && (
                  <motion.div
                    layoutId="header-nav-pill"
                    className={cn(
                      "absolute inset-0 rounded-full border border-dashed -z-10 shadow-sm transition-colors",
                      isActive
                        ? "bg-accent/70 border-border"
                        : "bg-accent/40 border-transparent",
                    )}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 35,
                      mass: 2,
                    }}
                  />
                )}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 border border-dashed rounded-full text-xs font-semibold tracking-wider hover:bg-primary/10 hover:border-primary text-foreground hover:text-primary transition-all duration-300 cursor-pointer"
          >
            Download Resume
          </a>
          <Kbd className="hidden md:flex">d</Kbd>
          <ModeToggle />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-accent/30 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="absolute top-full left-0 right-0 border-b border-border bg-background md:hidden">
          <div className="flex flex-col gap-2 px-3 py-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id && isHomePage;

              return (
                <Link
                  key={item.id}
                  href={isHomePage ? item.href : `/${item.href}`}
                  onClick={(e) => {
                    handleClick(e, item.href);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-fit text-[15px] px-4 py-2 rounded-full tracking-widest transition-colors font-semibold",
                    isActive
                      ? "bg-accent/70 border border-dashed border-border text-foreground"
                      : "hover:bg-accent/30 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
