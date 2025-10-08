// app/page.tsx
"use client";

import Hero from "@/components/hero";
import Skills from "@/components/skills"; // later you'll create this
import Projects from "@/components/projects"; // later
import Contact from "@/components/contact"; // later
import Divider from "@/components/divider";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto bg-slate-100 dark:bg-black px-6 lg:px-32 py-6 lg:py-16">
      <Hero />
      <Divider title="Skills" />
      <Skills />
      <Divider title="Projects" />
      <Projects />
      <Divider title="Contact" />
      <Contact />
    </main>
  );
}
