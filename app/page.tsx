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
        <div className="mt-4 max-w-4xl space-y-4 leading-relaxed font-desc text-accent-foreground tracking-wide text-sm sm:text-base">
          <p>
            I&apos;m{" "}
            <span className="text-primary font-mono tracking-tight">
              Kirtan Patel
            </span>
            , a Full Stack Developer specializing in modern web technologies, with a strong focus on building production-ready applications using Next.js, TypeScript, and Supabase.
          </p>
          <p>
            I enjoy solving complex engineering problems across both frontend and backend—from designing database schemas and implementing business logic to creating responsive user interfaces and optimizing application performance. My experience includes building enterprise ERP systems, realtime applications, payment integrations, analytics dashboards, and scalable architectures that support real-world business workflows.
          </p>
          <p>
            I&apos;m continuously exploring better software architecture, developer experience, and modern technologies to build reliable and maintainable products.
          </p>
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
