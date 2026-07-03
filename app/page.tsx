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

const GITHUB_USERNAME = "kirtanpatel01";
const GITHUB_PROFILE_URL = "https://github.com/kirtanpatel01";

export default async function Home() {
  const contributions = getCachedContributions(GITHUB_USERNAME);
  return (
    <PageContainer>
      {/* Hero Section */}
      <SectionContainer id="home" className="p-4 sm:p-8">
        <h3 className="font-bold text-xl sm:text-3xl">
          Full Stack Engineer building production software
        </h3>
        <div className="mt-1 max-w-4xl leading-relaxed font-desc text-accent-foreground tracking-wide">
          I&apos;m{" "}
          <span className="text-primary font-mono tracking-tight">
            Kirtan Patel
          </span>
          , a Full Stack Developer focused on building scalable web
          applications, modern frontend experiences, and production software.
          Recently, I&apos;ve contributed to two production products at an
          early-stage startup, delivering performant interfaces and maintainable
          systems.
        </div>

        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={GITHUB_PROFILE_URL}
            className={cn(
              "mt-8",
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
    </PageContainer>
  );
}
