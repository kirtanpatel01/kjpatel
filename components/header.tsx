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
  { name: "Home", id: "home", href: "#home" },
  { name: "Projects", id: "projects", href: "#projects" },
  { name: "Tech", id: "skills", href: "#skills" },
  { name: "Experience", id: "experience", href: "#experience" },
  { name: "Contact", id: "contact", href: "#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Active section tracking on scroll
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Offset adjusted for header height

      // Check if at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 15;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
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
        const headerOffset = 44;
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
    <header className="w-full max-w-4xl border-x border-dashed mx-auto sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-4">
        <Link href="/" className="shrink-0 flex items-center justify-center">
          <div
            className="w-8 h-8 icon-mask bg-foreground"
            style={{
              maskImage: "url(/logo.svg)",
              WebkitMaskImage: "url(/logo.svg)",
            }}
          />
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
                  "relative px-4 py-1.5 rounded-full tracking-widest text-[13px] font-medium transition-colors duration-200 cursor-pointer select-none",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onMouseEnter={() => setHoveredSection(item.id)}
              >
                {isHighlighted && (
                  <motion.div
                    layoutId="header-nav-pill"
                    className={cn(
                      "absolute inset-0 rounded-full border border-dashed -z-10 shadow-sm",
                      isActive
                        ? "bg-accent/80 border-primary/20"
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
          <Kbd className="hidden md:flex">d</Kbd>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
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
                    "w-fit text-[15px] px-4 py-2 rounded-full tracking-widest transition-colors font-medium",
                    isActive
                      ? "bg-accent/80 border border-dashed border-primary/20"
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
