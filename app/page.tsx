import CodeText from "@/components/code-text";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import {
  PageContainer,
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import GitSaturn from "@/components/git-saturn";
import { getGitSaturnDataAction } from "@/lib/git-saturn.actions";

export default async function Home() {
  const githubData = await getGitSaturnDataAction({
    includeCommitCounts: true,
  });
  return (
    <PageContainer>
      {/* Hero Section */}
      <SectionContainer className="flex flex-col items-center sm:flex-row gap-4 sm:gap-8">
        <div>
          <SectionHeading>Hey, I&apos;m Kirtan Patel!</SectionHeading>
          <div className="mt-2 max-w-4xl leading-relaxed font-medium text-foreground/80">
            By passion, I&apos;m a <CodeText>developer</CodeText> who loves building
            things through which I can gain knowledge on a deeper level. Surely, in
            the future, I&apos;ll expand my context window in the <CodeText>Mobile App
            Dev</CodeText> and <CodeText>AI/ML</CodeText> fields.
          </div>
        </div>

        <GitSaturn 
          username={githubData.username} 
          repos={githubData.repos} 
          interactive
          className="w-full sm:size-72 md:size-80"
        />
      </SectionContainer>

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Experience Section */}
      <Experience />
    </PageContainer>
  );
}

