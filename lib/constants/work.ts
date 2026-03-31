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
    period: "January 2026 — March 2026",
    type: "Internship",
    role: "Full Stack Web Developer",
    company: "Algorion Research and Analysis Pvt. Ltd.",
    location: "Remote",
    responsibilities: [
      "Build and maintain full-stack web applications.",
      "Develop frontend applications using React & Next.js.",
      "Build ERP + POS + Inventory Management System.",
    ]
  }
];
