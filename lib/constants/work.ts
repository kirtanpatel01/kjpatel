export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
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
