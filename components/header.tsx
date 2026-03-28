"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Work", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-10">
        <Link href="/" className="shrink-0 flex items-center justify-center">
          <Image src="/logo.svg" alt="KJ_Patel" width={32} height={32} />
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[15px] px-3 py-1.5 rounded-full tracking-widest ${isActive
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
      <ModeToggle />
    </header>
  );
}