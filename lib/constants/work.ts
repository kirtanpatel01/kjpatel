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
  {
    title: "Moreganise",
    subtitle: "Production ERP & POS Platform",
    description:
      "Production-ready ERP and POS platform built for organizations managing multiple stores, vendors, digital wallets, inventory, orders, and customer operations through a unified system.",
    badge: "Solo Built",
    role: "Full Stack Developer — Designed and developed the platform end-to-end, including frontend architecture, backend business logic, database design, server actions, realtime synchronization, authentication, and third-party integrations.",
    keyContributions: [
      "Architected and built the complete application using Next.js App Router and TypeScript.",
      "Designed and implemented relational database schemas, business workflows.",
      "Developed organization, admin, and customer modules with role-based access.",
      "Built multi-store POS, inventory management, wallet system, order management, and analytics dashboards.",
      "Implemented realtime synchronization using Supabase Realtime with React Query cache invalidation.",
      "Integrated Cashfree Payment Gateway for wallet top-ups and payment processing.",
      "Built server actions, authentication flows, and secure backend logic.",
      "Generated dynamic PDF invoices with automated calculations and downloadable receipts.",
      // "Optimized application performance using lazy loading, optimistic updates, and efficient data fetching patterns.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "React Query",
      "Tailwind CSS",
      // "Zustand",
      // "Cashfree",
      // "jsPDF",
    ],
    link: null,
    githubLink: null,
  },
  {
    title: "Algorion AI",
    subtitle: "Company Website & AI Platform",
    description:
      "Official website and AI platform developed as part of my internship at Algorion Research and Analysis Pvt. Ltd.",
    badge: "Team Project",
    role: "Frontend Developer — Worked with designers and backend developers to build responsive, production-ready interfaces and reusable frontend components.",
    keyContributions: [
      "Developed responsive landing pages and marketing sections.",
      "Built reusable UI components shared across multiple pages.",
      // "Implemented animations and interactive user experiences.",
      "Improved responsiveness, accessibility, and frontend performance.",
      "Collaborated with designers and engineers throughout development and deployment.",
      "Maintained consistent UI patterns and design system components.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    link: null,
    githubLink: null,
  },
];
