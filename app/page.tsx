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
import SidebarTOC from "@/components/sidebar-toc";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";

const GITHUB_USERNAME = "kirtanpatel01";
const GITHUB_PROFILE_URL = "https://github.com/kirtanpatel01";

export const metadata = {
  title: "Kirtan Patel | Senior Developer",
  description:
    "Senior Developer building production-ready web applications, scalable architecture, and modern cloud solutions.",
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
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl sm:text-2xl">
            Kirtan Patel | Senior Developer
          </h1>
          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="xs">
              <FileText className="" />
              <span>Resume</span>
              <ArrowUpRight />
            </Button>
          </Link>
        </div>
        <div className="mt-4 max-w-3xl space-y-2 leading-relaxed text-foreground/90 tracking-wide text-sm sm:text-base">
          <p>
            I&apos;m{" "}
            <span className="font-semibold text-foreground">Kirtan Patel</span>,
            a Senior Developer &amp; Full Stack Engineer building scalable web
            applications, reliable architectures, and modern cloud systems.
          </p>
          <p>
            Currently leading technology development and architectural design at{" "}
            <Link
              href="https://askdigi.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              AskDigi
            </Link>
            . I focus on high availability, client technical delivery, and
            engineering leadership.
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
