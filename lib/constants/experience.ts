export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    period: "January 2026 – Current",
    type: "Internship",
    role: "Full Stack Engineer Intern",
    company: "Algorion Research & Analysis Pvt. Ltd.",
    location: "Remote",
    responsibilities: [
      "Initially joined as the sole developer for Moreganise, designing and building the ERP & POS platform from the ground up.",
      "During the extended internship, continued leading Moreganise's frontend development, delivering major UI redesigns, workflow improvements, and production-ready features.",
      "Contributed as a Frontend Developer to Algorion AI, building responsive landing pages, reusable UI components, animations, and production-ready user experiences alongside a small engineering team.",
      "Built scalable frontend architecture using Next.js, React, TypeScript, Tailwind CSS, and modern state management patterns.",
      "Collaborated using Git workflows to prepare production releases and ship features across multiple products.",
    ],
  },
];
