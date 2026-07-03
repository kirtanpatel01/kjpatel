import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import CurrentlyBuilding from "@/components/sections/currently-building";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import Skills from "@/components/sections/skills";
import Terminal from "@/components/terminal";
import { Suspense } from "react";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = "kirtanpatel01";
const GITHUB_PROFILE_URL = "https://github.com/kirtanpatel01";

export default async function Home() {
  const contributions = getCachedContributions(GITHUB_USERNAME);
  
  return (
    <PageContainer>
      {/* Hero Section Grid */}
      <SectionContainer
        id="home"
        className="pt-10 pb-6 md:pt-16 md:pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-foreground animate-reveal">
            Full Stack Developer building <span className="text-primary font-black">production software</span> for startups.
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
            I&apos;m <span className="text-foreground font-bold">Kirtan Patel</span>, a Full Stack Developer focused on building production software using React, Next.js, TypeScript, and modern backend technologies. I enjoy solving real business problems through fast, scalable, and user-focused applications.
          </p>

          {/* Hero Metrics Row */}
          <div className="grid grid-cols-3 gap-4 max-w-md pt-3 border-t border-dashed border-border/60">
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black text-foreground">2</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-snug">Production Products</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black text-foreground">1</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-snug">Solo-built ERP Platform</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-black text-foreground">6+ Months</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-snug">Startup Experience</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wider shadow shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer select-none"
            >
              View Production Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-full border border-dashed border-border bg-background hover:bg-accent/40 text-foreground font-bold text-sm tracking-wider hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer select-none"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Signature Interactive Terminal Simulator */}
        <div className="lg:col-span-5 w-full">
          <Terminal />
        </div>
      </SectionContainer>

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Experience Section */}
      <Experience />

      {/* Currently Building Section */}
      <CurrentlyBuilding />

      {/* Borderless GitHub Contributions Panel - Relocated Lower */}
      <SectionContainer className="py-8 border-t border-b border-dashed border-border/40 bg-muted/3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Shipping products one commit at a time.</span>
          </div>
          <Suspense fallback={<GitHubContributionsFallback />}>
            <GitHubContributions
              contributions={contributions}
              githubProfileUrl={GITHUB_PROFILE_URL}
            />
          </Suspense>
        </div>
      </SectionContainer>

      {/* Contact Section */}
      <Contact />
    </PageContainer>
  );
}
