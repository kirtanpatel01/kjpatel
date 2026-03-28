"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-10">
        <Link href="/" className="shrink-0 flex items-center justify-center">
          <Image src="/logo.svg" alt="KJ_Patel" width={32} height={32} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[15px] px-3 py-1.5 rounded-full tracking-widest transition-colors ${isActive
                  ? "bg-accent/50 shadow-sm"
                  : "hover:bg-accent/30"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        
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
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-fit text-[15px] px-3 py-2 rounded-full tracking-widest transition-colors ${isActive
                    ? "bg-accent/50 shadow-sm"
                    : "hover:bg-accent/30"
                    }`}
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