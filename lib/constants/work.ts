export interface Project {
  title: string;
  subtitle: string;
  description: string;
  badge: "Solo Built" | "Team Project";
  role?: string;
  keyContributions: string[];
  tech: string[];
  link: string | null;
  githubLink: string | null;
}

export const work: Project[] = [
  // {
  //   title: "Moreganise",
  //   subtitle: "Production ERP & POS Platform",
  //   description:
  //     "Production-ready ERP and POS platform built for organizations managing multiple stores, vendors, digital wallets, inventory, orders, and customer operations through a unified system.",
  //   badge: "Solo Built",
  //   role: "Full Stack Developer — Designed and developed the platform end-to-end, including frontend architecture, backend business logic, database design, server actions, realtime synchronization, authentication, and third-party integrations.",
  //   keyContributions: [
  //     "Built the full ERP/POS platform end to end with Next.js and TypeScript.",
  //     "Designed the data model and core business workflows.",
  //     "Implemented multi-store operations, inventory, orders, wallets, and admin flows.",
  //     "Added realtime sync and secure payment handling for production use.",
  //     "Generated downloadable invoices and supporting analytics dashboards.",
  //   ],
  //   tech: [
  //     "Next.js",
  //     "React",
  //     "TypeScript",
  //     "Supabase",
  //     "PostgreSQL",
  //     "React Query",
  //     "Tailwind CSS",
  //     // "Zustand",
  //     // "Cashfree",
  //     // "jsPDF",
  //   ],
  //   link: null,
  //   githubLink: null,
  // },
  {
    title: "Algorion AI",
    subtitle: "Company Website & AI Platform",
    description:
      "Official website and AI platform developed as part of my internship at Algorion Research and Analysis Pvt. Ltd.",
    badge: "Team Project",
    role: "Frontend Developer — Worked with designers and backend developers to build responsive, production-ready interfaces and reusable frontend components.",
    keyContributions: [
      "Built responsive landing pages and reusable UI components.",
      "Improved accessibility and frontend performance.",
      "Collaborated with designers and engineers across development and deployment.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    link: null,
    githubLink: null,
  },
];
