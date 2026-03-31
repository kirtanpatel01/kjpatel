"use client";

import React, { useState } from "react";
import { ModeToggle as ThemeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Browser from "../../browser";

function PageWrapper({ children, className, center = true }: { children: React.ReactNode; className?: string; center?: boolean }) {
  return (
    <div className="h-full flex flex-col flex-1 items-center justify-center">
      <main className={cn(
        "flex flex-1 w-full max-w-4xl flex-col items-center py-10 px-16 border-x border-dashed h-full",
        center && "text-center",
        className
      )}>
        {children}
      </main>
    </div>
  );
}

function HomePage() {
  const cards = [
    { title: "Over-engineered", desc: "Why use 5 lines of CSS when you can use a 50MB library?" },
    { title: "Blazing Fast", desc: "It loads so fast you won't even have time to reconsider your life choices." },
  ];

  return (
    <PageWrapper>
      <div className="p-2 px-4 border border-dashed rounded text-base text-muted-foreground mb-4 font-normal">
        Status: Currently Procrastinating
      </div>
      <h1 className="text-2xl font-normal underline decoration-dashed underline-offset-8 decoration-lime-500/50">This is the Home Page</h1>
      <p className="mt-6 text-muted-foreground text-lg font-normal max-w-lg leading-relaxed">
        I spent hours on this site just for you to look at a single sentence. I hope you&apos;re happy.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        {cards.map((card, i) => (
          <div key={i} className="p-4 border border-dashed rounded text-left bg-accent/10">
            <p className="text-base font-normal underline decoration-dashed underline-offset-2 decoration-lime-500/30">{card.title}</p>
            <p className="text-base text-muted-foreground mt-2 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

function AboutPage() {
  const facts = [
    "Once tried to explain a bug as a 'limited time feature'.",
    "My primary coding environment is a dark room and a bag of chips."
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-normal italic opacity-80">A Little About Me</h1>
      <p className="mt-6 text-muted-foreground text-lg font-normal max-w-lg leading-relaxed">
        I enjoy taking credit for things I found on Stack Overflow and talking about my passion for learning while actually just binging Netflix.
      </p>
      <div className="mt-10 flex flex-col gap-4 w-full max-w-lg">
         {facts.map((fact, i) => (
           <div key={i} className="p-4 border border-dashed rounded bg-accent/20 text-base text-muted-foreground font-normal">
             &ldquo;{fact}&rdquo;
           </div>
         ))}
      </div>
    </PageWrapper>
  );
}

function ProjectsPage() {
  const projects = [
    { name: "Button that does nothing", status: "Finished" },
    { name: "To-do list (Never checked)", status: "Abandoned" },
    { name: "This website", status: "Ongoing Failure" }
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-normal tracking-tight">My Many Projects</h1>
      <p className="mt-4 text-muted-foreground text-lg font-normal max-w-lg leading-relaxed">
        Here is a list of all the things I started and immediately forgot about. The list is empty because I haven&apos;t even finished the list itself.
      </p>
      <div className="mt-12 space-y-4 w-full max-w-xl text-left">
         {projects.map((p, i) => (
           <div key={i} className="flex justify-between items-baseline p-4 border-b border-dashed border-border/50">
              <span className="text-base font-normal">{p.name}</span>
              <span className="text-base text-muted-foreground italic font-mono opacity-60 underline decoration-dashed decoration-1 underline-offset-4">{p.status}</span>
           </div>
         ))}
      </div>
    </PageWrapper>
  );
}

function BlogPage() {
  return (
    <PageWrapper className="py-32" center={false}>
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-4 text-muted-foreground text-lg text-center">
        Thoughts on design, development, and the future of web interfaces.
      </p>
    </PageWrapper>
  );
}

function SkillsPage() {
  const skills = [
     "Center a div (theoretically)",
     "Use ChatGPT for every line of code",
     "Expert at renaming files until they work"
  ];

  return (
    <PageWrapper>
      <h1 className="text-2xl font-normal italic">My Skills</h1>
      <p className="mt-6 text-muted-foreground text-lg font-normal max-w-lg leading-relaxed">
         I&apos;m very good at typing things into search bars and nodding my head pretending to know what a recursive function is.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4 max-w-xl">
         {skills.map((s, i) => (
           <div key={i} className="px-5 py-2 border border-dashed rounded text-base text-muted-foreground font-normal bg-accent/10">
             {s}
           </div>
         ))}
      </div>
    </PageWrapper>
  );
}

function ContactPage() {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-normal">Get In Touch</h1>
      <p className="mt-6 text-muted-foreground text-lg font-normal max-w-lg leading-relaxed">
        Go ahead and send me an email. I&apos;ll archive it as soon as it lands so my inbox stays clean.
      </p>
      <div className="mt-12 w-full max-w-sm space-y-6">
         <input className="w-full p-4 border-b border-dashed bg-transparent text-base outline-none focus:border-lime-500 transition-colors" placeholder="Your name (or whatever)" />
         <button className="w-full py-4 border border-dashed rounded text-base hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors font-medium">
            Toss into the Void
         </button>
      </div>
    </PageWrapper>
  );
}

// --- Combined Simulator ---

export default function ElasticNavbar({
  stiffness = 250,
  damping = 35,
  mass = 2,
}: {
  stiffness?: number;
  damping?: number;
  mass?: number;
}) {
  const [currentPath, setCurrentPath] = useState("/");
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Skills", href: "/skills" },
    { label: "Contact", href: "/contact" },
  ];

  const renderContent = () => {
    switch (currentPath) {
      case "/about": return <AboutPage />;
      case "/projects": return <ProjectsPage />;
      case "/blog": return <BlogPage />;
      case "/skills": return <SkillsPage />;
      case "/contact": return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <Browser url={`http://localhost:3000${currentPath}`}>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Simulator Navbar - Exactly like user's design */}
        <div className='w-full px-4 py-2 max-w-4xl mx-auto flex items-center justify-between gap-4 border-b border-x border-dashed sticky top-0 z-50 bg-background'>
          <button 
            onClick={() => setCurrentPath("/")} 
            className='font-bold text-lg'
          >
            Something
          </button>
          <div className='flex items-center gap-4'>
            <nav
              className='flex items-center justify-center gap-8'
              onMouseLeave={() => setHighlighted(null)}
            >
              {links.map((link) => {
                const isActive = currentPath === link.href;
                const isHighlighted = (highlighted === link.href) || (highlighted === null && isActive);

                return (
                  <button
                    key={link.href}
                    onClick={() => setCurrentPath(link.href)}
                    className={cn(
                      'relative px-3 py-1 rounded-md transition-colors duration-200 cursor-pointer',
                      isActive ? "" : "text-muted-foreground hover:text-foreground"
                    )}
                    onMouseEnter={() => setHighlighted(link.href)}
                  >
                    {isHighlighted && (
                      <motion.div
                        layoutId="nav-pill"
                        className={cn(
                          'absolute inset-0 rounded-md shadow border border-dashed bg-accent -z-10',
                          isActive ? 'bg-accent/80' : 'bg-accent/40'
                        )}
                        transition={{
                          type: "spring",
                          stiffness,
                          damping,
                          mass
                        }}
                      />
                    )}
                    <span className='text-sm font-medium'>
                      {link.label}
                    </span>
                  </button>
                )
              })}
            </nav>
            <ThemeToggle />
          </div>
        </div>

        {/* Simulator Content Rendering - Fill remaining space */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </Browser>
  );
}