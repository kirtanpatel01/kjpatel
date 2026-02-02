"use client";
import { useRef, useState } from "react";

export default function Experience() {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <section id="experience" className="py-24 border-t border-border">
      <div className="flex items-baseline justify-between mb-16">
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">01 / Full Stack Experience</h2>
      </div>

      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative border border-border p-8 sm:p-12 overflow-hidden bg-background"
      >
        {/* Spotlight Gradient */}
        <div
          className="pointer-events-none absolute -inset-px transition opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 120, 120, 0.1), transparent 40%)`
          }}
        />

        {/* Decorative "Ticket" notches */}
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-background rounded-full border-r border-border z-10" />
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-background rounded-full border-l border-border z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          <div className="lg:col-span-3">
            <span className="font-mono text-sm tracking-widest text-muted-foreground block mb-2">PERIOD</span>
            <span className="text-lg font-bold">JAN 2026 — PRESENT</span>
          </div>

          <div className="lg:col-span-6 space-y-2">
            <span className="font-mono text-sm tracking-widest text-muted-foreground">ROLE & COMPANY</span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase">Full Stack Intern</h3>
            <p className="text-xl text-foreground/80">Algorion Research and Analysis Pvt. Ltd.</p>

            <ul className="mt-8 space-y-2 list-disc list-inside text-muted-foreground marker:text-foreground">
              <li>Building and maintaining full-stack web applications.</li>
              <li>Developing frontend applications using React & Next.js.</li>
              <li>Working as a team.</li>
            </ul>
          </div>

          <div className="lg:col-span-3 lg:text-right">
            <span className="font-mono text-sm tracking-widest text-muted-foreground block mb-2">LOCATION</span>
            <span className="text-lg font-bold">Remote</span>
          </div>
        </div>
      </div>
    </section>
  );
}
