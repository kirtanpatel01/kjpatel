"use client";

import Hero from "@/components/hero";
import Skills from "@/components/skills"; 
import Projects from "@/components/projects"; 
import Contact from "@/components/contact"; 
import Divider from "@/components/divider";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 lg:px-32 py-6 lg:py-16">
      <Hero />
      <Divider title="Projects" />
      <Projects />
      <Divider title="Skills" />
      <Skills />
      <Divider title="Contact" />
      <Contact />
    </main>
  );
}
