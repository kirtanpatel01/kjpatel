import Hero from "@/components/container/hero";
import Skills from "@/components/container/skills";
import Projects from "@/components/container/projects";
import Contact from "@/components/container/contact";
import Experience from "@/components/container/experience";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
