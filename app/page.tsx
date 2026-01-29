"use client";

import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="h-[100vh]" />
      <div className="relative z-10 bg-background/95 backdrop-blur-3xl border-t border-border shadow-2xl rounded-t-[3rem] -mt-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-32 py-24 flex flex-col gap-8">
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}
