"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, animate } from "motion/react";
import { AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  label: string;
  href: string;
  level: number;
}

const tocItems: TOCItem[] = [
  { id: "home", label: "Home", href: "#home", level: 0 },
  { id: "skills", label: "Tech", href: "#skills", level: 0 },
  { id: "work", label: "Work", href: "#work", level: 0 },
  { id: "work-moreganise", label: "Moreganise", href: "#work-moreganise", level: 1 },
  { id: "work-algorion-ai", label: "Algorion AI", href: "#work-algorion-ai", level: 1 },
  { id: "experience", label: "Experience", href: "#experience", level: 0 },
  { id: "contact", label: "Contact", href: "#contact", level: 0 },
];

const HEADER_OFFSET = 80; // offset to account for sticky header
const TAIL_LENGTH = 80; // trailing tail length (approx 2cm)

export default function SidebarTOC() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [activeSection, setActiveSection] = useState("home");
  const activeSectionRef = useRef("home");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [itemDistances, setItemDistances] = useState<number[]>([]);
  const [totalPathLength, setTotalPathLength] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isManualScrollRef = useRef(false);

  // Motion values for path animation and diamond tracking
  const distanceMotionValue = useMotionValue(0);
  const diamondX = useMotionValue(0);
  const diamondY = useMotionValue(0);

  // Trailing gradient coordinates
  const tailX = useMotionValue(0);
  const tailY = useMotionValue(0);

  // Dashoffset to keep a trailing segment behind the diamond (controlled dynamically)
  const strokeDashoffset = useMotionValue(TAIL_LENGTH);
  
  // Using a very large gap (9999) to completely prevent the browser from repeating the dash
  const strokeDasharray = `${TAIL_LENGTH} 9999`;

  // Scroll spy logic
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      // Check if at the bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Find the active section by scanning all TOC items and selecting the last one that has scrolled past the focus line
      let currentSection = "home";
      const focusLine = 50; // 50px from the top of the viewport (just below sticky header)
      
      for (const item of tocItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= focusLine) {
            currentSection = item.id;
          }
        }
      }

      if (currentSection !== activeSectionRef.current) {
        console.log(`[Scroll Spy] Section Change: ${activeSectionRef.current} -> ${currentSection}`);
        console.log("TOC Items Positions relative to Y=85px Focus Line:");
        for (const item of tocItems) {
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            console.log(`  - ${item.label} (${item.id}): top = ${rect.top.toFixed(1)}px, active = ${rect.top <= focusLine}`);
          }
        }
        activeSectionRef.current = currentSection;
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Measure dot coordinates relative to the container
  const updatePoints = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newPoints = tocItems.map((item, index) => {
      const el = itemRefs.current[index];
      if (!el) return { x: 0, y: 0 };
      const elRect = el.getBoundingClientRect();
      // Statically determine X coordinate based on level to prevent layout shifts/mismatches
      const x = item.level === 0 ? 8 : 28;
      return {
        x,
        y: elRect.top - containerRect.left + elRect.height / 2, // relative Y center (ignoring horizontal offset)
      };
    });

    // Make Y coordinate relative to the container's top
    const relativePoints = newPoints.map((pt, index) => {
      const el = itemRefs.current[index];
      if (!el) return pt;
      const elRect = el.getBoundingClientRect();
      return {
        x: pt.x,
        y: elRect.top - containerRect.top + elRect.height / 2,
      };
    });

    setPoints(relativePoints);
  };

  useEffect(() => {
    updatePoints();
    
    // Set up a resize observer on the container
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      updatePoints();
    });
    observer.observe(containerRef.current);

    // Also update after web fonts load
    window.addEventListener("load", updatePoints);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", updatePoints);
    };
  }, []);

  // Smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, targetId: string) => {
    if (isHomePage && href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        isManualScrollRef.current = true;
        setActiveSection(targetId);
        activeSectionRef.current = targetId;

        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - HEADER_OFFSET;

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

  // Generate SVG Path
  const generatePath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    if (pts.every(p => p.x === 0 && p.y === 0)) return "";
    
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const p1 = pts[i - 1];
      const p2 = pts[i];
      if (Math.abs(p1.x - p2.x) < 1) {
        d += ` L ${p2.x} ${p2.y}`;
      } else {
        const dy = p2.y - p1.y;
        const transitionHeight = Math.min(14, dy * 0.4);
        const yMid = p1.y + dy * 0.5;
        const yStart = yMid - transitionHeight * 0.5;
        const yEnd = yMid + transitionHeight * 0.5;
        
        d += ` L ${p1.x} ${yStart}`;
        d += ` L ${p2.x} ${yEnd}`;
        d += ` L ${p2.x} ${p2.y}`;
      }
    }
    return d;
  };

  // Segment length helper
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

  // Pre-calculate path lengths and sub-item distances using pure JS math for stability
  useEffect(() => {
    if (points.length === 0 || points.every(p => p.x === 0 && p.y === 0)) return;

    // Calculate total path length
    let totalLen = 0;
    for (let i = 1; i < points.length; i++) {
      totalLen += getSegmentLength(points[i - 1], points[i]);
    }
    setTotalPathLength(totalLen);

    // Calculate distances to each item
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

  // Set diamond and tail positions immediately when points are first measured
  useEffect(() => {
    if (points.length > 0 && points[0].x !== 0 && distanceMotionValue.get() === 0) {
      diamondX.set(points[0].x);
      diamondY.set(points[0].y);
      tailX.set(points[0].x);
      tailY.set(points[0].y);
      strokeDashoffset.set(TAIL_LENGTH);
    }
  }, [points, diamondX, diamondY, tailX, tailY, strokeDashoffset, distanceMotionValue]);

  // Pure JS geometry interpolator to calculate (x, y) coordinates at any distance along the path
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
          // Vertical segment
          const ratio = localDist / segLen;
          return {
            x: p1.x,
            y: p1.y + (p2.y - p1.y) * ratio
          };
        } else {
          // Stepped diagonal transition
          const dy = p2.y - p1.y;
          const transitionHeight = Math.min(14, dy * 0.4);
          const yMid = p1.y + dy * 0.5;
          const yStart = yMid - transitionHeight * 0.5;
          const yEnd = yMid + transitionHeight * 0.5;
          
          const v1 = yStart - p1.y;
          const diag = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(yEnd - yStart, 2));
          
          if (localDist <= v1) {
            // First vertical segment
            return { x: p1.x, y: p1.y + localDist };
          } else if (localDist <= v1 + diag) {
            // Diagonal segment
            const diagDist = localDist - v1;
            const ratio = diagDist / diag;
            return {
              x: p1.x + (p2.x - p1.x) * ratio,
              y: yStart + (yEnd - yStart) * ratio
            };
          } else {
            // Second vertical segment
            const v2Dist = localDist - v1 - diag;
            return { x: p2.x, y: yEnd + v2Dist };
          }
        }
      }
      accumulatedDist += segLen;
    }
    return { ...pts[pts.length - 1] };
  };

  // Animate the active distance value and update diamond & tail positions along path geometry
  const activeIndex = tocItems.findIndex((item) => item.id === activeSection);

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
          // Calculate positions purely in JS, completely avoiding stale DOM query issues
          const point = getPointOnPath(latest, points);
          diamondX.set(point.x);
          diamondY.set(point.y);

          if (movingForward) {
            const tailDist = Math.max(0, latest - TAIL_LENGTH);
            const tailPoint = getPointOnPath(tailDist, points);
            tailX.set(tailPoint.x);
            tailY.set(tailPoint.y);
            strokeDashoffset.set(TAIL_LENGTH - latest);
          } else {
            const tailDist = Math.min(totalPathLength, latest + TAIL_LENGTH);
            const tailPoint = getPointOnPath(tailDist, points);
            tailX.set(tailPoint.x);
            tailY.set(tailPoint.y);
            strokeDashoffset.set(-latest);
          }
        }
      }
    });
    
    return () => controls.stop();
  }, [activeIndex, itemDistances, diamondX, diamondY, tailX, tailY, strokeDashoffset, distanceMotionValue, totalPathLength, points]);

  // SVG Path Strings
  const backgroundPath = generatePath(points);

  return (
    <div className="flex flex-col gap-4 sticky top-24 select-none">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-2">
        <AlignLeft className="w-3.5 h-3.5" />
        <span>On This Page</span>
      </div>

      <div ref={containerRef} className="relative flex flex-col py-1">
        {/* SVG Connector Lines */}
        {points.length > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <defs>
              {/* Dynamic linear gradient tracking the active trail */}
              <motion.linearGradient
                id="active-line-gradient"
                gradientUnits="userSpaceOnUse"
                style={{
                  x1: tailX,
                  y1: tailY,
                  x2: diamondX,
                  y2: diamondY,
                }}
              >
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0" />
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity="1" />
              </motion.linearGradient>
            </defs>

            {/* Background tree line */}
            {backgroundPath && (
              <path
                d={backgroundPath}
                fill="none"
                className="stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
            
            {/* Active trailing line */}
            {backgroundPath && (
              <motion.path
                d={backgroundPath}
                fill="none"
                stroke="url(#active-line-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  strokeDasharray,
                  strokeDashoffset,
                }}
              />
            )}

            {/* Ending decorative dot */}
            {points[points.length - 1] && (
              <circle
                cx={points[points.length - 1].x}
                cy={points[points.length - 1].y}
                r="2"
                className="fill-zinc-300 dark:fill-zinc-700"
              />
            )}

            {/* Floating Diamond Marker */}
            {totalPathLength > 0 && (
              <motion.polygon
                points="-4,0 0,-4 4,0 0,4"
                className="fill-foreground z-10"
                style={{
                  x: diamondX,
                  y: diamondY,
                }}
              />
            )}
          </svg>
        )}

        {/* Navigation Items */}
        {tocItems.map((item, index) => {
          const isActive = activeSection === item.id;
          
          return (
            <div
              key={item.id}
              className={cn(
                "relative py-1 flex items-center transition-all duration-300",
                item.level === 0 ? "pl-6" : "pl-12"
              )}
            >
              {/* Measurement point */}
              <div
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="absolute left-2 w-1.5 h-1.5 pointer-events-none opacity-0"
                style={{
                  left: item.level === 0 ? "8px" : "28px"
                }}
              />

              <Link
                href={isHomePage ? item.href : `/${item.href}`}
                onClick={(e) => handleClick(e, item.href, item.id)}
                className={cn(
                  "text-sm tracking-wide font-desc transition-colors duration-200 py-0.5",
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
