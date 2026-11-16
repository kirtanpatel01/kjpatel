export interface Experience {
  period: string;
  role: string;
  company: string;
  website?: string;
  location: string;
  type: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    period: "October 2026 – Present",
    type: "Full-time",
    role: "Senior Developer",
    company: "AskDigi",
    website: "https://askdigi.in",
    location: "Vadodara, Gujarat",
    responsibilities: [
      "Lead core technology development and architectural design across internal systems and client-facing digital platforms.",
      "Drive system reliability, security, and scalable infrastructure to guarantee high availability across platforms and codebases.",
      "Direct client technical delivery, scoping integration requirements and serving as primary technical lead for product deployments.",
    ],
  },
  {
    period: "January 2026 – October 2026",
    type: "Full-time",
    role: "Full Stack Engineer",
    company: "Algorion Research & Analysis Pvt. Ltd.",
    website: "https://algorion.in/",
    location: "Remote",
    responsibilities: [
      "Initially joined as the sole developer for Moreganise, designing and building the ERP & POS platform from the ground up.",
      "Continued leading Moreganise's frontend development, delivering major UI redesigns, workflow improvements, and production-ready features.",
      "Contributed as a Frontend Developer to Algorion AI, building responsive landing pages, reusable UI components, animations, and production-ready user experiences alongside a small engineering team.",
      "Built scalable frontend architecture using Next.js, React, TypeScript, Tailwind CSS, and modern state management patterns.",
      "Collaborated using Git workflows to prepare production releases and ship features across multiple products.",
    ],
  },
];
