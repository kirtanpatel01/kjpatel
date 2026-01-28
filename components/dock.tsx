"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { Home, User, Briefcase, Mail, Code2 } from "lucide-react";
import { ModeToggle } from "./mode-theme";

const DockIcon = ({ mouseX, icon: Icon, href }: { mouseX: any; icon: any; href?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center cursor-pointer hover:bg-foreground hover:text-background transition-colors"
    >
        {href ? (
            <Link href={href} className="w-full h-full flex items-center justify-center">
                <Icon className="w-1/2 h-1/2" />
            </Link>
        ) : (
            <div className="w-full h-full flex items-center justify-center">
                 <Icon className="w-1/2 h-1/2" />
            </div>
        )}
    </motion.div>
  );
};

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-4 rounded-full bg-background/5 border border-border/20 px-4 pb-3"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
    >
        <DockIcon mouseX={mouseX} icon={Home} href="#" />
        <DockIcon mouseX={mouseX} icon={Briefcase} href="#experience" />
        <DockIcon mouseX={mouseX} icon={Code2} href="#projects" />
        <DockIcon mouseX={mouseX} icon={User} href="#skills" />
        <DockIcon mouseX={mouseX} icon={Mail} href="#contact" />
        {/* We wrap ModeToggle to fit the dock structure if possible, or just append it as a dock item */}
    </div>
  );
}
