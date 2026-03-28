import CodeText from "@/components/code-text";
import Skills from "@/components/skills";
import {
  PageContainer,
  ResponsiveText,
  SectionHeading,
  SectionSpacing,
} from "@/components/responsive-wrappers";

export default function Home() {
  return (
    <PageContainer>
      {/* Heading */}
      <SectionHeading>Hey, I&apos;m Kirtan Patel!</SectionHeading>
      <ResponsiveText
        className="mt-2 sm:mt-4 lg:mt-8 max-w-4xl leading-relaxed font-medium text-foreground/80"
      >
        By passion, I&apos;m a <CodeText>developer</CodeText> who loves building
        things through which I can gain knowledge on a deeper level. Surely, in
        the future, I&apos;ll expand my context window in the <CodeText>Mobile App
        Dev</CodeText> and <CodeText>AI/ML</CodeText> fields.
      </ResponsiveText>

      {/* <Link href="/showcase">
        <Button className="mt-16">Showcase</Button>
      </Link> */}

      {/* Skills */}
      <SectionSpacing>
        <Skills />
      </SectionSpacing>
    </PageContainer>
  );
}
