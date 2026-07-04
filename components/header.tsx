"use client";

import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Kbd } from "./ui/kbd";

const navItems = [
  { name: "Home", id: "home", href: "#home" },
  { name: "Tech", id: "skills", href: "#skills" },
  { name: "Work", id: "work", href: "#work" },
  { name: "Experience", id: "experience", href: "#experience" },
  { name: "Contact", id: "contact", href: "#contact" },
];

const HEADER_OFFSET = 48;

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const isManualScrollRef = useRef(false);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      // Check if at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 0;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const headerElement = document.querySelector("header");
      const headerHeight = headerElement
        ? headerElement.offsetHeight
        : HEADER_OFFSET;

      let currentSection = "home";
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section touches or goes behind the bottom of the header (with 2px sub-pixel tolerance)
          if (rect.top <= headerHeight + 2) {
            currentSection = item.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        const headerElement = document.querySelector("header");
        const headerHeight = headerElement
          ? headerElement.offsetHeight
          : HEADER_OFFSET;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        isManualScrollRef.current = true;
        setActiveSection(targetId);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        window.history.pushState(null, "", href);

        setTimeout(() => {
          isManualScrollRef.current = false;
        }, 800);
      }
    }
  };

  return (
    <header className="w-full max-w-4xl sm:border-x border-dashed mx-auto sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          aria-label="Home"
          className="shrink-0 flex items-center justify-center"
        >
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
          className="hidden md:flex items-center gap-1.5"
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
                  "relative px-4 py-1.5 rounded-full transition-colors duration-200 cursor-pointer select-none text-sm font-medium",
                  isActive
                    ? ""
                    : "text-zinc-400 hover:text-secondary-foreground",
                )}
                onMouseEnter={() => setHoveredSection(item.id)}
              >
                {isHighlighted && (
                  <motion.div
                    layoutId="header-nav-pill"
                    className={cn(
                      "absolute inset-0 rounded-full -z-10 shadow-sm",
                      isActive ? "bg-secondary/80" : "bg-secondary/40",
                    )}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
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
        <nav className="absolute top-full left-0 right-0 border-b border-border bg-background md:hidden pb-2">
          <div className="flex flex-col gap-2">
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
                    "w-full px-4 py-2 tracking-widest text-sm font-medium",
                    isActive ? "bg-foreground text-background" : "",
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
