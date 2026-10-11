import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Table,
  CheckCircle2,
  FileCode2,
} from "lucide-react";
import {
  PageContainer,
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Icons from "@/lib/constants/icons";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata = {
  title: "PlotTheChart — Data Visualization Studio | Kirtan Patel",
  description:
    "Case study of PlotTheChart: an open-source, edge-deployed SVG chart generator built with TanStack Start, TanStack Table v9, and Cloudflare Workers.",
};

const TECH_STACK_GROUPS = [
  {
    category: "Framework & Runtime",
    items: [
      { name: "TanStack Start", icon: Icons.TanstackStart },
      { name: "React", icon: Icons.React },
      { name: "Cloudflare Workers", icon: Icons.Cloudflare },
      { name: "TypeScript", icon: Icons.TS },
    ],
  },
  {
    category: "Table & Data Fetching",
    items: [
      { name: "TanStack Table v9", icon: Icons.TanstackStart },
      { name: "TanStack Query v5", icon: Icons.ReactQuery },
    ],
  },
  {
    category: "Styling & UI Primitives",
    items: [
      { name: "Tailwind CSS", icon: Icons.Tailwind },
      { name: "Shadcn UI", icon: Icons.Shadcn },
    ],
  },
  {
    category: "Auth & Persistence",
    items: [
      { name: "Better Auth", icon: Icons.BetterAuth },
      { name: "Prisma ORM v7", icon: Icons.Prisma },
      { name: "PostgreSQL (Neon)", icon: Icons.NeonDB },
    ],
  },
];

const CORE_CAPABILITIES = [
  {
    title: "7 Visualization Topologies",
    desc: "Bar (grouped/stacked/horizontal), Line (smooth Bézier/linear/step), Area (cumulative/overlapping), Pie & Donut (adjustable cutout radius), Scatter & Bubble (continuous XY with cluster cohorts), Radar (multi-axis polygon/circular), and Hierarchical Treemap.",
    icon: Layers,
  },
  {
    title: "4 Schema-Adaptive Editors",
    desc: "Tailored input tables powered by TanStack Table v9 with CSV/TSV clipboard import, part-to-whole slice tables with 100% normalization, continuous coordinate tables, and nested tree structures. Includes a live raw JSON inspector.",
    icon: Table,
  },
  {
    title: "Pure SVG Geometry Engine",
    desc: "Over 1,300 lines of custom React SVG geometry with zero charting library bloat. Computes Bézier curves, polar trigonometry arcs, least-squares regression trendlines, and squarified treemaps directly in responsive SVG.",
    icon: Sparkles,
  },
  {
    title: "Cloud Workspace & Live Thumbnails",
    desc: "Email/password authentication via Better Auth. Authenticated users access a dashboard with search, chart filtering, project duplication, and real-time SVG thumbnail previews generated directly from saved vector payloads.",
    icon: Database,
  },
];

const ENGINEERING_CHALLENGES = [
  {
    number: "01",
    title: "Cloudflare Workers Edge Compatibility",
    context: "Runtime constraints on the V8 workerd platform",
    challenge:
      "Cloudflare Workers cannot execute Node.js crypto binaries or native C++ Prisma query engines, which traditionally breaks standard full-stack ORM and authentication setups.",
    solution:
      "Configured Prisma ORM v7 with runtime = 'cloudflare' paired with @prisma/adapter-neon via WebSockets. Adapted Better Auth to run WebCrypto PBKDF2 password hashing routines natively within the edge runtime.",
  },
  {
    number: "02",
    title: "Pure SVG Math Engine vs Library Bloat",
    context: "Eliminating heavy chart dependencies",
    challenge:
      "Common charting libraries (Recharts, Chart.js) add substantial JavaScript bundle weight and rely on canvas rasterization or DOM wrappers that complicate clean, standalone .svg file export.",
    solution:
      "Engineered a pure React SVG engine (ChartCanvas.tsx) calculating Bézier cubic control points, arc paths, and squarified bounds directly. SVGs are exportable instantly via XMLSerializer and Blob URLs at full vector fidelity.",
  },
  {
    number: "03",
    title: "TanStack Table v9 Feature Architecture",
    context: "Dynamic clipboard ingestion and series columns",
    challenge:
      "Integrating the new v9 architecture (tableFeatures, createColumnHelper) while providing seamless tabular inline editing, dynamic series addition, and instant multi-row CSV/TSV parsing from clipboard.",
    solution:
      "Implemented TabularSeriesInput with custom cell renderers, row pagination, and robust clipboard regex parsers that normalize spreadsheet pastes directly into typed Zod schema records.",
  },
];

export default function PlotTheChartPage() {
  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Plot the chart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Project Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
              PlotTheChart
            </h1>
            <Badge variant="default" className="text-xs">
              Solo Built
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-desc">
            Open-source data visualization studio & edge-deployed SVG chart
            generator.
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Button asChild size="sm" variant="default">
              <a
                href="https://plotthechart.kjpatel.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label="Open PlotTheChart Live Studio"
              >
                <span>Live Studio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a
                href="https://github.com/kirtanpatel01/plotthechart"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label="View PlotTheChart Source Code on GitHub"
              >
                <Icons.Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Hero Section: 2-Column Desktop Grid (Preview + Metadata) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start pt-2">
          {/* Left Column: Visual Anchor (~65% on desktop) */}
          <div className="lg:col-span-8 overflow-hidden rounded-md border border-dashed border-border/80 bg-muted/20 group">
            <div className="relative aspect-[1200/630] w-full overflow-hidden">
              <Image
                src="/images/projects/plotthechart-og.png"
                alt="PlotTheChart Studio Interface Preview"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          </div>

          {/* Right Column: Compact Project Specs (~35% on desktop) */}
          <div className="lg:col-span-4 rounded-md border border-dashed border-border/80 bg-muted/10 p-4 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border/60">
              <FileCode2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Project Specs
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Type
                </span>
                <span className="font-medium text-foreground">
                  Open-Source Web Studio
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Role
                </span>
                <span className="font-medium text-foreground">
                  Full-Stack Design & Engineering
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Timeline
                </span>
                <span className="font-medium text-foreground">
                  October 2026 (Active)
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Runtime
                </span>
                <span className="font-medium text-foreground">
                  Cloudflare Workers (workerd)
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Persistence
                </span>
                <span className="font-medium text-foreground">
                  Neon PostgreSQL + Prisma v7
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Export
                </span>
                <span className="font-medium text-foreground">
                  Standalone Vector .svg
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Section: Overview & The Problem */}
      <SectionHeading>Overview & Problem</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-4">
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-desc">
          Creating clean, publication-ready vector charts usually requires heavy
          enterprise BI software, complex Python/D3 scripting, or subscription
          paywalls that force every dataset into a rigid spreadsheet format.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-desc">
          PlotTheChart was built to solve this with a zero-friction,
          browser-native studio. Anyone can enter or paste data, choose from 7
          distinct visualization topologies, customize geometry and curated
          palettes, and download crisp `.svg` vector files immediately without
          creating an account.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-desc">
          For ongoing work, users can register to save, duplicate, and organize
          projects in a personal dashboard featuring real-time SVG thumbnail
          previews rendered directly by the core geometry canvas.
        </p>
      </SectionContainer>

      {/* Section: Core Capabilities */}
      <SectionHeading>Core Capabilities</SectionHeading>
      <SectionContainer className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CORE_CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-md border border-dashed border-border/70 bg-accent/15 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-sm bg-accent/40 text-foreground">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base tracking-tight font-heading">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-desc">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Section: Architecture & Polymorphic Schemas */}
      <SectionHeading>Architecture & Schemas</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-4">
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-desc">
          PlotTheChart follows an open-closed architectural design: adding a new
          visualization type requires <strong>zero database migrations</strong>{" "}
          and zero refactors to the layout shell.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-desc">
          Data models are declared as a Zod discriminated union (
          <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">
            AnyChartDataSchema
          </code>
          ) keyed by{" "}
          <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">
            schemaKind
          </code>
          :
        </p>

        {/* Schema Breakdown List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-md border border-dashed border-border/70 bg-muted/20 space-y-1">
            <span className="font-mono text-xs font-semibold text-foreground">
              &apos;tabular-series&apos;
            </span>
            <p className="text-xs text-muted-foreground">
              Categorical multi-series tables powering Bar, Line, Area, and
              Radar charts.
            </p>
          </div>

          <div className="p-3 rounded-md border border-dashed border-border/70 bg-muted/20 space-y-1">
            <span className="font-mono text-xs font-semibold text-foreground">
              &apos;proportional-slices&apos;
            </span>
            <p className="text-xs text-muted-foreground">
              Part-to-whole slices with 100% normalization powering Pie and
              Donut charts.
            </p>
          </div>

          <div className="p-3 rounded-md border border-dashed border-border/70 bg-muted/20 space-y-1">
            <span className="font-mono text-xs font-semibold text-foreground">
              &apos;coordinate-points&apos;
            </span>
            <p className="text-xs text-muted-foreground">
              Continuous (x, y, size) tuples grouped by cluster cohorts for
              Scatter & Bubble plots.
            </p>
          </div>

          <div className="p-3 rounded-md border border-dashed border-border/70 bg-muted/20 space-y-1">
            <span className="font-mono text-xs font-semibold text-foreground">
              &apos;hierarchical-tree&apos;
            </span>
            <p className="text-xs text-muted-foreground">
              Nested branch-and-leaf node structures for Hierarchical Treemaps.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground pt-1 leading-relaxed font-desc">
          In PostgreSQL, projects store validated{" "}
          <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">
            dataPayload
          </code>{" "}
          and{" "}
          <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">
            configPayload
          </code>{" "}
          JSONB documents, indexed by{" "}
          <code className="px-1 py-0.5 rounded bg-muted font-mono text-xs">
            [userId, updatedAt(sort: Desc)]
          </code>{" "}
          for fast query retrieval and duplication.
        </p>
      </SectionContainer>

      {/* Section: Engineering Highlights & Edge Challenges */}
      <SectionHeading>Engineering Highlights</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-5">
        <div className="space-y-4 divide-y divide-dashed divide-border/60">
          {ENGINEERING_CHALLENGES.map((item, idx) => (
            <div
              key={idx}
              className={idx > 0 ? "pt-4 space-y-2.5" : "space-y-2.5"}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-muted-foreground/80">
                  {item.number}
                </span>
                <h3 className="font-semibold text-foreground text-sm sm:text-base tracking-tight font-heading">
                  {item.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                <div className="p-3 rounded-md border border-border/50 bg-muted/15 space-y-1">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
                    Challenge
                  </span>
                  <p className="text-muted-foreground">{item.challenge}</p>
                </div>
                <div className="p-3 rounded-md border border-border/50 bg-accent/20 space-y-1">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
                    Solution
                  </span>
                  <p className="text-foreground/90">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Section: Technology Stack */}
      <SectionHeading>Tech Stack</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-5">
        <div className="space-y-4">
          {TECH_STACK_GROUPS.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((tech) => {
                  const IconComponent = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/50 bg-gradient-to-b from-accent/60 to-accent/20 shadow-xs text-xs font-medium text-foreground select-none"
                    >
                      {IconComponent && (
                        <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                          <IconComponent className="w-full h-full" />
                        </div>
                      )}
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Section: Interface Showcase */}
      <SectionHeading>Interface Showcase</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-6">
        <div className="space-y-2">
          <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-md border border-dashed border-border/80 bg-muted/20">
            <Image
              src="/images/projects/plotthechart-og.png"
              alt="PlotTheChart Studio Interface"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Main studio workspace: Data input grid alongside the real-time SVG
            canvas, geometry controls, and palette swatches.
          </p>
        </div>

        <div className="p-4 rounded-md border border-dashed border-border/70 bg-muted/10 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-14 h-14 shrink-0 relative rounded-md overflow-hidden border border-border/60 bg-background flex items-center justify-center p-1.5">
            <Image
              src="/images/projects/plotthechart-logo.png"
              alt="PlotTheChart Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-foreground">
              Vector Performance & Standalone Exports
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Charts export directly as standards-compliant `.svg` vector markup
              with embedded styles, preserving crisp typography and infinite
              scalability for documents, blogs, and presentations.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Sibling Navigation */}
      <SectionContainer className="p-4 sm:p-6 border-t border-dashed border-border/70">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <Link
            href="/projects/chatpate-songs"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Chatpate Songs</span>
          </Link>

          <Link
            href="/projects"
            className="text-xs font-mono text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            All Projects
          </Link>

          <Link
            href="/projects/sukoon-ki-gali"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Sukoon ki Gali</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
