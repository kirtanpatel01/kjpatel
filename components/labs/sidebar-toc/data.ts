import type { FileNode } from "@/components/file-tree-item";

export const sidebarTocFiles: FileNode[] = [
  {
    name: "app",
    type: "folder",
    children: [
      {
        name: "layout.tsx",
        type: "file",
      },
      {
        name: "page.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "sidebar-toc.tsx",
        type: "file",
      },
    ],
  },
];

export const sidebarTocCode: Record<
  string,
  { code: string; language: string }
> = {
  "app/layout.tsx": {
    language: "tsx",
    code: `import type { Metadata } from "next";
import "./globals.css";
import SidebarTOC from "@/components/sidebar-toc";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative w-full max-w-4xl mx-auto">
          <main className="w-full">{children}</main>
          
          {/* Renders the Sidebar TOC fixed on the right of the screen */}
          <aside className="hidden xl:block fixed xl:right-14 top-12 z-40">
            <SidebarTOC />
          </aside>
        </div>
      </body>
    </html>
  );
}`,
  },
  "app/page.tsx": {
    language: "tsx",
    code: `export default function Home() {
  return (
    <div className="flex flex-col gap-24 py-12 px-6">
      {/* Root level sections matching the TOC items */}
      <section id="home" className="scroll-mt-24 min-h-[400px]">
        <h1 className="text-3xl font-bold">Home</h1>
        <p className="mt-4 text-muted-foreground">Welcome to my portfolio...</p>
      </section>
      
      <section id="skills" className="scroll-mt-24 min-h-[400px]">
        <h2 className="text-2xl font-bold">Tech</h2>
        <p className="mt-4 text-muted-foreground">My tech stack details...</p>
      </section>

      <section id="work" className="scroll-mt-24 min-h-[400px]">
        <h2 className="text-2xl font-bold">Work</h2>
        <p className="mt-4 text-muted-foreground">Projects overview...</p>
      </section>

      {/* Nested child sections (level 1) */}
      <section id="work-moreganise" className="scroll-mt-24 min-h-[300px] pl-6 border-l border-dashed border-border">
        <h3 className="text-xl font-semibold text-primary">Moreganise</h3>
        <p className="mt-2 text-muted-foreground">Smart task management system...</p>
      </section>

      <section id="work-algorion-ai" className="scroll-mt-24 min-h-[300px] pl-6 border-l border-dashed border-border">
        <h3 className="text-xl font-semibold text-primary">Algorion AI</h3>
        <p className="mt-2 text-muted-foreground">Design helper and visual agent...</p>
      </section>

      <section id="experience" className="scroll-mt-24 min-h-[400px]">
        <h2 className="text-2xl font-bold">Experience</h2>
        <p className="mt-4 text-muted-foreground">Professional experience timeline...</p>
      </section>

      <section id="contact" className="scroll-mt-24 min-h-[400px]">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-4 text-muted-foreground">Let's build something together...</p>
      </section>
    </div>
  );
}`,
  },
  "components/sidebar-toc.tsx": {
    language: "tsx",
    code: `"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, animate, MotionValue } from "motion/react";
import { AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItemData {
  id: string;
  label: string;
  href: string;
  level: number;
}

const tocItems: TOCItemData[] = [
  { id: "home", label: "Home", href: "#home", level: 0 },
  { id: "skills", label: "Tech", href: "#skills", level: 0 },
  { id: "work", label: "Work", href: "#work", level: 0 },
  { id: "work-moreganise", label: "Moreganise", href: "#work-moreganise", level: 1 },
  { id: "work-algorion-ai", label: "Algorion AI", href: "#work-algorion-ai", level: 1 },
  { id: "experience", label: "Experience", href: "#experience", level: 0 },
  { id: "contact", label: "Contact", href: "#contact", level: 0 },
];

interface TOCContextType {
  activeSection: string;
  setActiveSection: (id: string) => void;
  points: { x: number; y: number }[];
  totalPathLength: number;
  registerRef: (id: string, el: HTMLDivElement | null) => void;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, targetId: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  
  diamondX: MotionValue<number>;
  diamondY: MotionValue<number>;
  tailX: MotionValue<number>;
  tailY: MotionValue<number>;
  strokeDashoffset: MotionValue<number>;
  strokeDasharray: string;

  isHomePage: boolean;
  tailLength: number;
}

const TOCContext = createContext<TOCContextType | null>(null);

function useTOC() {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error("TOC components must be rendered inside a <TOC> wrapper");
  }
  return context;
}

const getSegmentLength = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
  if (Math.abs(p1.x - p2.x) < 1) {
    return Math.abs(p2.y - p1.y);
  } else {
    const dy = p2.y - p1.y;
    const transitionHeight = Math.min(14, dy * 0.4);
    const yMid = p1.y + dy * 0.5;
    const yStart = yMid - transitionHeight * 0.5;
    const yEnd = yMid + transitionHeight * 0.5;
    
    const v1 = yStart - p1.y;
    const diag = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(yEnd - yStart, 2));
    const v2 = p2.y - yEnd;
    return v1 + diag + v2;
  }
};

const getPointOnPath = (dist: number, pts: { x: number; y: number }[]) => {
  if (pts.length === 0) return { x: 0, y: 0 };
  if (dist <= 0) return { ...pts[0] };

  let accumulatedDist = 0;
  for (let i = 1; i < pts.length; i++) {
    const p1 = pts[i - 1];
    const p2 = pts[i];
    const segLen = getSegmentLength(p1, p2);
    
    if (accumulatedDist + segLen >= dist) {
      const localDist = dist - accumulatedDist;
      
      if (Math.abs(p1.x - p2.x) < 1) {
        const ratio = localDist / segLen;
        return { x: p1.x, y: p1.y + (p2.y - p1.y) * ratio };
      } else {
        const dy = p2.y - p1.y;
        const transitionHeight = Math.min(14, dy * 0.4);
        const yMid = p1.y + dy * 0.5;
        const yStart = yMid - transitionHeight * 0.5;
        const yEnd = yMid + transitionHeight * 0.5;
        
        const v1 = yStart - p1.y;
        const diag = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(yEnd - yStart, 2));
        
        if (localDist <= v1) {
          return { x: p1.x, y: p1.y + localDist };
        } else if (localDist <= v1 + diag) {
          const diagDist = localDist - v1;
          const ratio = diagDist / diag;
          return {
            x: p1.x + (p2.x - p1.x) * ratio,
            y: yStart + (yEnd - yStart) * ratio
          };
        } else {
          const v2Dist = localDist - v1 - diag;
          return { x: p2.x, y: yEnd + v2Dist };
        }
      }
    }
    accumulatedDist += segLen;
  }
  return { ...pts[pts.length - 1] };
};

interface TOCProps {
  children: React.ReactNode;
  items: TOCItemData[];
  headerOffset?: number;
  focusLine?: number;
  tailLength?: number;
}

function TOC({
  children,
  items,
  headerOffset = 80,
  focusLine = 50,
  tailLength = 80,
}: TOCProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [activeSection, setActiveSection] = useState("home");
  const activeSectionRef = useRef("home");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [itemDistances, setItemDistances] = useState<number[]>([]);
  const [totalPathLength, setTotalPathLength] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isManualScrollRef = useRef(false);

  const distanceMotionValue = useMotionValue(0);
  const diamondX = useMotionValue(0);
  const diamondY = useMotionValue(0);
  const tailX = useMotionValue(0);
  const tailY = useMotionValue(0);

  const strokeDashoffset = useMotionValue(tailLength);
  const strokeDasharray = \`\${tailLength} 9999\`;

  const registerRef = (id: string, el: HTMLDivElement | null) => {
    itemRefs.current[id] = el;
  };

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      let currentSection = "home";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= focusLine) {
            currentSection = item.id;
          }
        }
      }

      if (currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, items, focusLine]);

  const updatePoints = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newPoints = items.map((item) => {
      const el = itemRefs.current[item.id];
      if (!el) return { x: 0, y: 0 };
      const elRect = el.getBoundingClientRect();
      const x = item.level === 0 ? 8 : 28;
      return { x, y: elRect.top - containerRect.left + elRect.height / 2 };
    });

    const relativePoints = newPoints.map((pt, index) => {
      const el = itemRefs.current[items[index].id];
      if (!el) return pt;
      const elRect = el.getBoundingClientRect();
      return { x: pt.x, y: elRect.top - containerRect.top + elRect.height / 2 };
    });

    setPoints(relativePoints);
  }, [items]);

  useEffect(() => {
    updatePoints();
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => updatePoints());
    observer.observe(containerRef.current);
    window.addEventListener("load", updatePoints);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", updatePoints);
    };
  }, [updatePoints]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, targetId: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        isManualScrollRef.current = true;
        setActiveSection(targetId);
        activeSectionRef.current = targetId;

        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        window.history.pushState(null, "", href);

        setTimeout(() => { isManualScrollRef.current = false; }, 800);
      }
    }
  };

  useEffect(() => {
    if (points.length === 0 || points.every(p => p.x === 0 && p.y === 0)) return;

    let totalLen = 0;
    for (let i = 1; i < points.length; i++) {
      totalLen += getSegmentLength(points[i - 1], points[i]);
    }
    setTotalPathLength(totalLen);

    const dists = points.map((_, idx) => {
      if (idx === 0) return 0;
      let len = 0;
      for (let i = 1; i <= idx && i < points.length; i++) {
        len += getSegmentLength(points[i - 1], points[i]);
      }
      return len;
    });
    setItemDistances(dists);
  }, [points]);

  useEffect(() => {
    if (points.length > 0 && points[0].x !== 0 && distanceMotionValue.get() === 0) {
      diamondX.set(points[0].x);
      diamondY.set(points[0].y);
      tailX.set(points[0].x);
      tailY.set(points[0].y);
      strokeDashoffset.set(tailLength);
    }
  }, [points, diamondX, diamondY, tailX, tailY, strokeDashoffset, distanceMotionValue, tailLength]);

  const activeIndex = items.findIndex((item) => item.id === activeSection);

  useEffect(() => {
    if (activeIndex < 0 || itemDistances.length === 0 || itemDistances.length <= activeIndex) return;
    const target = itemDistances[activeIndex];
    const current = distanceMotionValue.get();
    const movingForward = target >= current;
    
    const controls = animate(distanceMotionValue, target, {
      type: "spring",
      stiffness: 90,
      damping: 16,
      onUpdate: (latest) => {
        if (points.length > 0) {
          const point = getPointOnPath(latest, points);
          diamondX.set(point.x);
          diamondY.set(point.y);

          if (movingForward) {
            const tailDist = Math.max(0, latest - tailLength);
            const tailPoint = getPointOnPath(tailDist, points);
            tailX.set(tailPoint.x);
            tailY.set(tailPoint.y);
            strokeDashoffset.set(tailLength - latest);
          } else {
            const tailDist = Math.min(totalPathLength, latest + tailLength);
            const tailPoint = getPointOnPath(tailDist, points);
            tailX.set(tailPoint.x);
            tailY.set(tailPoint.y);
            strokeDashoffset.set(-latest);
          }
        }
      }
    });
    
    return () => controls.stop();
  }, [activeIndex, itemDistances, diamondX, diamondY, tailX, tailY, strokeDashoffset, distanceMotionValue, totalPathLength, points, tailLength]);

  return (
    <TOCContext.Provider value={{
      activeSection,
      setActiveSection,
      points,
      totalPathLength,
      registerRef,
      handleClick,
      containerRef,
      diamondX,
      diamondY,
      tailX,
      tailY,
      strokeDashoffset,
      strokeDasharray,
      isHomePage,
      tailLength,
    }}>
      {children}
    </TOCContext.Provider>
  );
}

function TOCHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-semibold pl-2 text-sm", className)}>
      {children}
    </div>
  );
}

function TOCList({ children, className }: { children: React.ReactNode; className?: string }) {
  const { containerRef } = useTOC();
  return (
    <div ref={containerRef} className={cn("relative flex flex-col py-1", className)}>
      {children}
    </div>
  );
}

function TOCConnector() {
  const {
    points,
    totalPathLength,
    tailX,
    tailY,
    diamondX,
    diamondY,
    strokeDasharray,
    strokeDashoffset,
  } = useTOC();

  const generatePath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    if (pts.every(p => p.x === 0 && p.y === 0)) return "";
    
    let d = \`M \${pts[0].x} \${pts[0].y}\`;
    for (let i = 1; i < pts.length; i++) {
      const p1 = pts[i - 1];
      const p2 = pts[i];
      if (Math.abs(p1.x - p2.x) < 1) {
        d += \` L \${p2.x} \${p2.y}\`;
      } else {
        const dy = p2.y - p1.y;
        const transitionHeight = Math.min(14, dy * 0.4);
        const yMid = p1.y + dy * 0.5;
        const yStart = yMid - transitionHeight * 0.5;
        const yEnd = yMid + transitionHeight * 0.5;
        
        d += \` L \${p1.x} \${yStart}\`;
        d += \` L \${p2.x} \${yEnd}\`;
        d += \` L \${p2.x} \${p2.y}\`;
      }
    }
    return d;
  };

  const backgroundPath = generatePath(points);
  if (points.length === 0) return null;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <motion.linearGradient
          id="active-line-gradient"
          gradientUnits="userSpaceOnUse"
          x1={tailX}
          y1={tailY}
          x2={diamondX}
          y2={diamondY}
        >
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="1" />
        </motion.linearGradient>
      </defs>

      {backgroundPath && (
        <path
          d={backgroundPath}
          fill="none"
          className="stroke-zinc-200 dark:stroke-zinc-800"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
      
      {backgroundPath && (
        <motion.path
          d={backgroundPath}
          fill="none"
          stroke="url(#active-line-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ strokeDasharray, strokeDashoffset }}
        />
      )}

      {points[points.length - 1] && (
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="2"
          className="fill-zinc-300 dark:fill-zinc-700"
        />
      )}

      {totalPathLength > 0 && (
        <motion.polygon
          points="-4,0 0,-4 4,0 0,4"
          className="fill-foreground z-10"
          style={{ x: diamondX, y: diamondY }}
        />
      )}
    </svg>
  );
}

function TOCItem({ id, href, level, children }: { id: string; href: string; level: number; children: React.ReactNode }) {
  const { activeSection, registerRef, handleClick, isHomePage } = useTOC();
  const isActive = activeSection === id;

  return (
    <div className={cn("relative py-1 flex items-center transition-all duration-300", level === 0 ? "pl-6" : "pl-12")}>
      <div
        ref={(el) => registerRef(id, el)}
        className="absolute left-2 w-1.5 h-1.5 pointer-events-none opacity-0"
        style={{ left: level === 0 ? "8px" : "28px" }}
      />
      <Link
        href={isHomePage ? href : \`/\${href}\`}
        onClick={(e) => handleClick(e, href, id)}
        className={cn(
          "text-sm tracking-wide font-desc transition-colors duration-200 py-0.5",
          isActive ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {children}
      </Link>
    </div>
  );
}

export { TOC, TOCHeader, TOCList, TOCItem, TOCConnector, useTOC };`,
  },
};
