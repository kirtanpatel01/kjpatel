import Link from "next/link";
import CodeText from "../code-text";
import Container from "../container";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <Container id="hero" className="">
      <h2 className="font-mono font-bold text-2xl">Heyyy, I&apos;m Kirtan Patel!</h2>
      <p className="mt-4">By passion, I&apos;m a <CodeText>developer</CodeText> who loves building things through which I can gain knowledge on a deeper level. Surely, in the future, I&apos;ll expand my context window in the <CodeText>Mobile App Dev</CodeText> and <CodeText>AI/ML</CodeText> fields.</p>
      <Link href="/showcase">
        <Button className="mt-8">Showcase</Button>
      </Link>
    </Container>
  );
}