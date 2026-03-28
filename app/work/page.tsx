"use client";
import { useRef, useState } from "react";
import { PageContainer, ResponsiveText } from "@/components/responsive-wrappers";

const experiences = [
  {
    period: "JAN 2026 — PRESENT",
    role: "Full Stack Web Developer",
    company: "Algorion Research and Analysis Pvt. Ltd.",
    location: "Remote",
    responsibilities: [
      "Building and maintaining full-stack web applications.",
      "Developing frontend applications using React & Next.js.",
      "Building ERP + POS + Inventory Management System.",
    ]
  }
];

const ExperienceItem = ({ exp }: { exp: typeof experiences[0] }) => {
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
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden bg-background p-0 lg:p-12 transition-colors hover:bg-secondary/10"
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
      <div className="absolute top-1/2 -left-3 w-6 h-6 bg-background rounded-full border-r border-border z-10 hidden sm:block" />
      <div className="absolute top-1/2 -right-3 w-6 h-6 bg-background rounded-full border-l border-border z-10 hidden sm:block" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-start relative z-10">
        <div className="lg:col-span-3">
          <span className="font-mono text-sm tracking-widest text-muted-foreground block">PERIOD</span>
          <span className="text-sm sm:text-lg font-bold uppercase">{exp.period}</span>
        </div>

        <div className="lg:col-span-6 space-y-2">
          <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">ROLE & COMPANY</span>
          <h3 className="text-xl sm:text-4xl font-black uppercase leading-tight">{exp.role}</h3>
          <ResponsiveText size="base" className="text-foreground/80">
            {exp.company}
          </ResponsiveText>

          <ul className="mt-8 space-y-2 list-disc list-inside text-muted-foreground marker:text-foreground">
            {exp.responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3 lg:text-right">
          <span className="font-mono text-sm tracking-widest text-muted-foreground block mb-2 uppercase">LOCATION</span>
          <span className="text-lg font-bold uppercase">{exp.location}</span>
        </div>
      </div>
    </div>
  );
};

export default function WorkPage() {
  return (
    <PageContainer className="flex flex-col divide-y divide-border">
      {experiences.map((exp, index) => (
        <ExperienceItem key={index} exp={exp} />
      ))}
    </PageContainer>
  );
}
