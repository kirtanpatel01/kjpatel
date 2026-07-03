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
    period: "April 2026 — June 2026",
    type: "Extended Internship",
    role: "Full Stack Engineer Intern",
    company: "Algorion Research & Analysis Pvt. Ltd.",
    location: "Remote",
    responsibilities: [
      "Continued development of Morganize POS/ERP system with major frontend performance and UX flow upgrades.",
      "Contributed as Frontend Developer for Algorion AI's production website, deploying high-conversion responsive views.",
      "Built reusable components, custom UI animations, and standard design systems in TailwindCSS.",
      "Collaborated with a small engineering team using Git-flow to coordinate releases and prepare both products for deployment."
    ],
  },
  {
    period: "January 2026 — March 2026",
    type: "Internship",
    role: "Full Stack Engineer Intern",
    company: "Algorion Research & Analysis Pvt. Ltd.",
    location: "Remote",
    responsibilities: [
      "Acted as the sole developer of the Morganize ERP platform from initial concept to public cloud staging launch.",
      "Built production-ready POS, multi-vendor dashboards, and inventory management models from scratch.",
      "Developed high-density visual analytics screens and shift reports calculating hourly sales logs.",
      "Integrated secure wallet APIs, Cashfree Payment Gateways, on-demand PDF invoice generation, and database sync hooks."
    ],
  },
];
