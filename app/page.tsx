import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";

import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";
import Skills from "@/components/sections/skills";
import { Suspense } from "react";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { cn } from "@/lib/utils";
import Work from "@/components/sections/work";
import SidebarTOC from "@/components/sidebar-toc";

const GITHUB_USERNAME = "kirtanpatel01";
const GITHUB_PROFILE_URL = "https://github.com/kirtanpatel01";

export const metadata = {
  title: "Kirtan Patel | Full Stack Developer",
  description:
    "Full Stack Engineer building production-ready web applications with Next.js, TypeScript, and modern cloud tooling.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const contributions = getCachedContributions(GITHUB_USERNAME);
  return (
    <PageContainer>
      {/* Hero Section */}
      <SectionContainer id="home" className="p-4">
        <h1 className="font-bold text-xl sm:text-2xl">
          Kirtan Patel — Full Stack Developer
        </h1>
        <div className="mt-4 max-w-3xl space-y-2 leading-relaxed font-des text-accent-foreground tracking-wide text-sm sm:text-base">
          <p>
            I&apos;m{" "}
            <span className="text-primary font-mono tracking-tight">
              Kirtan Patel
            </span>
            , a Full Stack Developer building production-ready web applications
            with Next.js, TypeScript, and modern cloud tooling.
          </p>
          <p>
            I enjoy solving practical engineering problems across the full stack,
            from product design to implementation and delivery.
          </p>
        </div>

        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={GITHUB_PROFILE_URL}
            className={cn(
              "mt-4",
              // GitHub Default Theme
              // '**:data-[level="0"]:fill-[#eff2f5] dark:**:data-[level="0"]:fill-[#151b23]',
              // '**:data-[level="1"]:fill-[#aceebb] dark:**:data-[level="1"]:fill-[#033a16]',
              // '**:data-[level="2"]:fill-[#4ac26b] dark:**:data-[level="2"]:fill-[#196c2e]',
              // '**:data-[level="3"]:fill-[#2da44e] dark:**:data-[level="3"]:fill-[#2ea043]',
              // '**:data-[level="4"]:fill-[#116329] dark:**:data-[level="4"]:fill-[#56d364]',
            )}
          />
        </Suspense>
      </SectionContainer>

      {/* Skills Section */}
      <Skills />

      {/* Work Section */}
      <Work />

      {/* Experience Section */}
      <Experience />

      {/* Contact Section */}
      <Contact />

      <aside className="hidden xl:block fixed xl:right-14 top-12 z-40">
        <SidebarTOC />
      </aside>
    </PageContainer>
  );
}
