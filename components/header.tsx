"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";

const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills", hiddenOnMobile: true },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <div className="max-w-4xl mx-auto fixed top-4 left-0 right-0 z-50 flex items-center justify-between gap-6 rounded-full bg-background/80 backdrop-blur-md border border-border transition-transform duration-300 px-1.5 py-1">

      <Link href="/">
        <Image src="/logo.svg" alt="KJ_Patel" width={32} height={32} />
      </Link>

      <nav className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-muted-foreground hover:text-foreground transition-colors tracking-wider px-2 py-1 ${item.hiddenOnMobile ? "hidden sm:block" : ""
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <ModeToggle />
    </div>
  );
}