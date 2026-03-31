import CodeText from "@/components/code-text";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import {
  PageContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <PageContainer>
      <SectionHeading>Hey, I&apos;m Kirtan Patel!</SectionHeading>
      <div className="mt-2 sm:mt-4 max-w-4xl leading-relaxed font-medium text-foreground/80">
        By passion, I&apos;m a <CodeText>developer</CodeText> who loves building
        things through which I can gain knowledge on a deeper level. Surely, in
        the future, I&apos;ll expand my context window in the <CodeText>Mobile App
          Dev</CodeText> and <CodeText>AI/ML</CodeText> fields.
      </div>

      <Skills />

      <Experience />
    </PageContainer>
  );
}
