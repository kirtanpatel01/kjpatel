import CodeText from "@/components/code-text";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import GitSaturn from "@/components/git-saturn";
import Projects from "@/components/sections/projects";

import {
  PageContainer,
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import Skills from "@/components/sections/skills";
import { getGitSaturnDataAction } from "@/lib/git-saturn.actions";
import { Suspense } from "react";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = "kirtanpatel01";
const GITHUB_PROFILE_URL = "https://github.com/kirtanpatel01";

export default async function Home() {
  const githubData = await getGitSaturnDataAction({
    includeCommitCounts: true,
  });

  const contributions = getCachedContributions(GITHUB_USERNAME);
  return (
    <PageContainer>
      {/* Hero Section */}
      <SectionContainer
        id="home"
        className="space-y-8"
      >
        <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-8">
          <div>
            <SectionHeading>Hey, I&apos;m Kirtan Patel!</SectionHeading>
            <div className="mt-2 max-w-4xl leading-relaxed font-medium text-foreground/80">
              By passion, I&apos;m a <CodeText>developer</CodeText> who loves
              building things through which I can gain knowledge on a deeper
              level. Surely, in the future, I&apos;ll expand my context window
              in the <CodeText>Mobile App Dev</CodeText> and{" "}
              <CodeText>AI/ML</CodeText> fields.
            </div>
          </div>

          {/* <GitSaturn
            username={githubData.username}
            repos={githubData.repos}
            interactive
            className="w-full sm:size-72 md:size-80"
          /> */}
        </div>

        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={GITHUB_PROFILE_URL}
          />
        </Suspense>
      </SectionContainer>

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Experience Section */}
      <Experience />

      {/* Contact Section */}
      <Contact />
    </PageContainer>
  );
}
