import Link from "next/link";
import CodeText from "@/components/code-text";
import { Button } from "@/components/ui/button";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-5.6rem)] p-4 sm:p-24">
      {/* Heading */}
      <h2 className="font-mono font-bold text-4xl">Hey, I&apos;m Kirtan Patel!</h2>
      <p className="mt-8 text-lg max-w-4xl leading-relaxed font-medium text-foreground/80">By passion, I&apos;m a <CodeText>developer</CodeText> who loves building things through which I can gain knowledge on a deeper level. Surely, in the future, I&apos;ll expand my context window in the <CodeText>Mobile App Dev</CodeText> and <CodeText>AI/ML</CodeText> fields.</p>

      {/* <Link href="/showcase">
        <Button className="mt-16">Showcase</Button>
      </Link> */}

      {/* Skills */}
      <Skills />
    </div>
  );
}
