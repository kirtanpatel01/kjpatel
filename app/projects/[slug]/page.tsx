"use client";

import {
  ArrowLeft,
  Award,
  Cpu,
  Github,
  Globe,
  Layers,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { PageContainer } from "@/components/responsive-wrappers";
import { Badge } from "@/components/ui/badge";

interface CaseStudyData {
  title: string;
  tagline: string;
  role: string;
  duration: string;
  stack: string[];
  liveLink: string | null;
  githubLink: string | null;
  problem: string;
  solution: string;
  architecture: {
    description: string;
    flow: string[];
    dbHighlight?: string;
  };
  challenges: {
    title: string;
    description: string;
    tradeoff: string;
  }[];
  impact: string[];
}

const CASE_STUDIES: Record<string, CaseStudyData> = {
  morganize: {
    title: "Morganize",
    tagline:
      "Solo-built ERP and POS platform designed for organizations managing multiple stores, vendors, inventory, digital wallets, and customer operations through a unified interface.",
    role: "Full Stack Developer",
    duration: "Jan 2026 - Mar 2026",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "React Query",
      "Zustand",
    ],
    liveLink: null,
    githubLink: null,
    problem:
      "Food courts, university campuses, and multi-vendor markets face severe operational bottlenecks. Independent vendors use disparate POS terminals, causing fragmented inventory logs, accounting delay cycles, and high transaction failure rates during peak hours.",
    solution:
      "We built Morganize to consolidate vendor POS, inventory logging, and financial payouts under one Next.js interface. By designing a secure native wallet system alongside Cashfree payment gateway triggers, we bypassed checkout latencies and allowed immediate offline-capable updates.",
    architecture: {
      description:
        "Distributed Multi-Tenant model where an Organization sits at the root, managing multiple physical Areas (food courts/malls), which contain individual Vendor Stores.",
      flow: [
        "Customer scans QR code & accesses Vendor Menu",
        "Order triggers real-time updates via Supabase Webhooks",
        "Payment routes to Native Wallet or Cashfree API checkout",
        "Inventory logs sync across area outlets instantly",
        "Receipt is printed on-the-fly via jsPDF server actions",
      ],
      dbHighlight:
        "Organization ➔ Area ➔ Vendor ➔ Product ➔ Order ➔ Wallet Ledger Transaction",
    },
    challenges: [
      {
        title: "Race Conditions in Wallet Balance Checkouts",
        description:
          "During peak traffic, concurrent checkout requests could lead to double-spending vulnerabilities in the client wallet ledger.",
        tradeoff:
          "Implemented strict pessimistic locking on PostgreSQL transaction queries, trading minor sub-millisecond delays for absolute financial accuracy.",
      },
      {
        title: "Large-Scale Menu PDF Invoice Generation",
        description:
          "Generating layout invoices client-side caused lag and degraded mobile performance during active orders.",
        tradeoff:
          "Shifted PDF generation tasks to Next.js Server Actions, returning a pre-compiled stream that is downloaded instantly.",
      },
    ],
    impact: [
      "Secured zero-delay real-time POS order updates via webhooks.",
      "Cut customer check-out waiting loops significantly using the native wallet system.",
      "Synchronized database structures across multiple remote vendors successfully.",
    ],
  },
  "algorion-ai": {
    title: "Algorion AI",
    tagline:
      "Startup website and AI platform where I led frontend development, building responsive interfaces, reusable UI components, animations, and production-ready user experiences.",
    role: "Lead Frontend Developer",
    duration: "Apr 2026 - Jun 2026",
    stack: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    liveLink: "https://algorion.com",
    githubLink: null,
    problem:
      "Startups need high-performance, visually striking websites to present technical services (AI, database indexing) clearly. Heavy graphic animations often compromise loading performance, causing page bounce rates to spike.",
    solution:
      "We designed a lightweight Tailwind and Framer Motion layout that achieves premium scroll-driven transitions while retaining a sub-second initial load. I developed a reusable component library, enabling fast page iteration across startup product modules.",
    architecture: {
      description:
        "Modular layout design utilizing React 19 functional elements, styled-variants, and framer-motion loops for dynamic state renders.",
      flow: [
        "Customer lands on home page, loading lightweight static assets server-side",
        "Framer motion hooks coordinate scroll position entries",
        "Custom components adjust padding and scaling according to device viewport width",
        "Dynamic lazy loading renders heavy dashboard illustrations only when visible",
        "Client state controls theme toggles and sound indicators instantly",
      ],
      dbHighlight:
        "Next.js Static Pages ➔ Reusable Radix UI Primitives ➔ Framer Motion Layouts",
    },
    challenges: [
      {
        title: "FPS drops during heavy page scroll animations",
        description:
          "Complex layout scroll triggers caused browser layout shifts and stuttering on lower-end mobile devices.",
        tradeoff:
          "Used CSS hardware-accelerated properties (translate3d) and restricted Framer Motion triggers to transform/opacity paths, ensuring a smooth 60fps scrolling flow.",
      },
      {
        title: "Designing a Unified Theme Component Library",
        description:
          "Supporting custom dark/light modes while maintaining accessibility contrast checks across multiple custom components.",
        tradeoff:
          "Tailored Tailwind CSS variables to OKLCH color palettes, ensuring contrast constraints dynamically scale.",
      },
    ],
    impact: [
      "Maintained responsive visual consistency across 10+ landing and product pages.",
      "Developed 15+ highly reusable UI dashboard components, speeding up landing page launch times.",
      "Secured sub-second initial page hydration scores, maintaining premium UX standards.",
    ],
  },
};

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) {
    return (
      <PageContainer className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h2 className="text-3xl font-black">Case Study Not Found</h2>
        <p className="text-muted-foreground">
          The project study you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-bold hover:underline"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8 md:py-16 space-y-12">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        <span>Back to Home</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-foreground">
          {caseStudy.title}
        </h1>
        <p className="text-lg text-muted-foreground font-medium max-w-3xl leading-relaxed">
          {caseStudy.tagline}
        </p>

        {/* Project Meta Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-dashed border-border/80">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Role
            </span>
            <p className="text-sm font-semibold text-foreground/90">
              {caseStudy.role}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Duration
            </span>
            <p className="text-sm font-semibold text-foreground/90">
              {caseStudy.duration}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Main Tech
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {caseStudy.stack.slice(0, 3).map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="px-2 py-0 border border-border bg-accent/20 text-[10px] font-semibold text-foreground/80"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Links
            </span>
            <div className="flex items-center gap-3 pt-0.5">
              {caseStudy.githubLink && (
                <a
                  href={caseStudy.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={18} />
                </a>
              )}
              {caseStudy.liveLink && (
                <a
                  href={caseStudy.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe size={18} />
                </a>
              )}
              {!caseStudy.githubLink && !caseStudy.liveLink && (
                <span className="text-xs text-muted-foreground italic font-medium">
                  Internal System
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Problem & Solution */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground flex items-center gap-2">
              <ShieldAlert size={18} className="text-rose-500" />
              <span>The Problem</span>
            </h2>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-black uppercase tracking-wider text-foreground flex items-center gap-2">
              <Award size={18} className="text-primary" />
              <span>The Solution</span>
            </h2>
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Right Column: Architecture & Database */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-muted/5 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground flex items-center gap-2 border-b border-dashed border-border/80 pb-2">
            <Layers size={14} className="text-muted-foreground" />
            <span>Architecture & Data Flow</span>
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {caseStudy.architecture.description}
          </p>

          {caseStudy.architecture.dbHighlight && (
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                Entity Schema Map
              </span>
              <div className="p-2.5 rounded-lg bg-background border border-dashed border-border text-[10px] font-mono text-primary font-bold">
                {caseStudy.architecture.dbHighlight}
              </div>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              Execution Flow
            </span>
            <div className="space-y-2">
              {caseStudy.architecture.flow.map((step, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground font-bold shrink-0">
                    {idx + 1}.
                  </span>
                  <p className="text-xs text-foreground/80 leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Width section: Challenges & Trade-offs */}
      <div className="space-y-6 pt-6 border-t border-dashed border-border/80">
        <div className="space-y-1">
          <h2 className="text-xl font-black uppercase tracking-wider text-foreground flex items-center gap-2">
            <Cpu size={18} className="text-primary" />
            <span>Engineering Challenges & Trade-offs</span>
          </h2>
          <p className="text-xs text-muted-foreground max-w-xl">
            Real software design consists of choosing the right compromises.
            Here is how I evaluated constraints:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudy.challenges.map((challenge, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-muted/5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-foreground">
                  {challenge.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {challenge.description}
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-dashed border-border bg-background flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                  Implemented Trade-off
                </span>
                <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                  {challenge.tradeoff}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="p-6 rounded-2xl border border-dashed border-border bg-muted/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="text-lg font-bold text-foreground">
            Project Achievements & Impact
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Key indicators that this implementation solved its operational goals
            and maintained developer performance.
          </p>
        </div>
        <ul className="space-y-2 text-sm text-foreground/85 shrink-0 md:w-1/2">
          {caseStudy.impact.map((point, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-primary font-bold select-none">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
}
