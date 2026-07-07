"use client";

import { AlignLeft, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import CodeShowcase from "@/components/code-showcase";
import CodeText from "@/components/code-text";
import { SectionContainer } from "@/components/responsive-wrappers";
import { TOC, TOCHeader, TOCList, TOCItem, TOCConnector } from "@/components/sidebar-toc";
import { sidebarTocFiles, sidebarTocCode } from "./data";

const labTOCItems = [
  { id: "overview", label: "Overview", href: "#overview", level: 0 },
  { id: "features", label: "Features", href: "#features", level: 0 },
  { id: "components", label: "Compound Components", href: "#components", level: 0 },
  { id: "svg-math", label: "SVG Math Engine", href: "#svg-math", level: 1 },
  { id: "context-api", label: "Context API", href: "#context-api", level: 1 },
  { id: "usage", label: "Usage", href: "#usage", level: 0 },
];

export function SidebarTOCContent() {
  return (
    <div className="flex flex-col relative w-full">
      {/* Live Sidebar TOC on the right of the screen for larger viewports */}
      <aside className="hidden xl:block fixed xl:right-14 top-24 w-44 2xl:w-48 z-40">
        <TOC items={labTOCItems} headerOffset={80} focusLine={50} tailLength={80}>
          <TOCHeader>
            <AlignLeft className="w-3.5 h-3.5" />
            <span>Lab Navigation</span>
          </TOCHeader>
          <TOCList>
            <TOCConnector />
            {labTOCItems.map((item) => (
              <TOCItem key={item.id} id={item.id} href={item.href} level={item.level}>
                {item.label}
              </TOCItem>
            ))}
          </TOCList>
        </TOC>
      </aside>

      {/* Main Documentation Sections */}
      <div className="w-full max-w-2xl">
        <SectionContainer id="overview" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Stepped Sidebar TOC is an interactive on-page navigation assistant built
            to trace complex heading hierarchies. Instead of drawing a basic vertical line,
            it uses an SVG canvas to draw a contoured baseline that bends dynamically to 
            follow indented subheadings.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A spring-animated diamond marker (<span className="text-foreground font-semibold">◆</span>)
            and a fading trailing line slide smoothly along the contoured layout in real-time,
            mirroring your viewport scroll position.
          </p>
        </SectionContainer>

        <SectionContainer id="features" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2 leading-relaxed">
            <li>
              <strong className="text-foreground">Contoured Navigation Lines</strong>: Automatically creates sharp
              diagonal steps that align next to level-1 indented list links.
            </li>
            <li>
              <strong className="text-foreground">Directional Fading Trail</strong>: The active highlighted trace segment (80px long)
              sits above the diamond when scrolling down, and below it when scrolling up.
            </li>
            <li>
              <strong className="text-foreground">Pure JS Mathematical Tracking</strong>: Coordinates are computed mathematically,
              meaning the diamond tracker matches the SVG coordinates instantly without DOM lagging.
            </li>
            <li>
              <strong className="text-foreground">Zero Layout Shift Mismatch</strong>: Static X-coordinates are locked to levels
              (8px for level 0, 28px for level 1) preventing sub-pixel rounding errors.
            </li>
          </ul>
        </SectionContainer>

        <SectionContainer id="components" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Compound Component Architecture</h2>
          <p className="text-muted-foreground leading-relaxed">
            To ensure maximum reusability, this component was split into clean subcomponents
            under a single parent Context Provider. You can compose and style the list, header,
            connector, and links separately.
          </p>
        </SectionContainer>

        <SectionContainer id="svg-math" className="scroll-mt-24 pl-6 border-l border-dashed border-border/60 space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-primary">SVG Math Engine</h3>
          <p className="text-muted-foreground leading-relaxed">
            Standard SVGs don't easily allow checking coordinates at a specific length unless the element is fully mounted in the DOM. 
            To bypass DOM querying inside our spring loop, a custom interpolator <CodeText>getPointOnPath(dist, points)</CodeText> was written. 
            It calculates exact path positions using high school geometry logic, dividing the line segment by segment.
          </p>
        </SectionContainer>

        <SectionContainer id="context-api" className="scroll-mt-24 pl-6 border-l border-dashed border-border/60 space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-primary">Context API</h3>
          <p className="text-muted-foreground leading-relaxed">
            A React context (<CodeText>TOCContext</CodeText>) exposes shared coordinates, register callbacks, 
            motion values, and configuration variables. This enables the separate components (<CodeText>TOCItem</CodeText>, 
            <CodeText>TOCConnector</CodeText>) to communicate layout specs dynamically.
          </p>
        </SectionContainer>

        <SectionContainer id="usage" className="scroll-mt-24 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Usage and Setup</h2>
          <p className="text-muted-foreground leading-relaxed">
            Import the subcomponents and compose them in your layout. The sections on your page should have matching IDs 
            matching the <CodeText>items</CodeText> array definition.
          </p>
        </SectionContainer>

        <SectionContainer className="w-full">
          <CodeShowcase
            fileData={sidebarTocFiles}
            codeMapping={sidebarTocCode}
            previewComponent={
              <div className="p-8 border border-dashed rounded-xl bg-secondary/10 flex flex-col justify-center gap-2 items-center text-center">
                <Settings className="w-8 h-8 text-primary animate-spin-slow" />
                <p className="text-sm font-semibold mt-2">Stepped TOC Component Demo</p>
                <p className="text-xs text-muted-foreground max-w-xs mt-1">
                  Look to the right of your screen (desktop view) to interact with this component live!
                </p>
              </div>
            }
            defaultFilePath="components/sidebar-toc.tsx"
            defaultFileNode={{ name: "sidebar-toc.tsx", type: "file" }}
          />
        </SectionContainer>
      </div>
    </div>
  );
}
