export interface Project {
  title: string;
  subtitle: string;
  description: string;
  badge: "Solo Built" | "Team Project";
  keyContributions: string[];
  tech: string[];
  link: string | null;
  githubLink: string | null;
}

export const work: Project[] = [
  {
    title: "Morganize",
    subtitle: "Production ERP & POS Platform",
    description:
      "Production ERP and POS platform for organizations managing multiple stores, vendors, digital wallets, and customer operations through a unified interface.",
    badge: "Solo Built",
    keyContributions: [
      "Built the entire frontend architecture as the sole developer from concept to production.",
      "Developed multi-store POS, inventory, organization dashboards, and customer interfaces.",
      "Implemented real-time synchronization using Supabase Realtime and React Query.",
      "Built wallet management, Cashfree payment integration, and PDF invoice generation.",
      "Designed high-density analytics dashboards with optimized rendering and reusable components.",
    ],
    tech: ["Next.js", "React.js", "TypeScript", "Supabase", "Tailwind CSS"],
    link: "https://moreganise.in",
    githubLink: null,
  },
  {
    title: "Algorion AI",
    subtitle: "Company Website & AI Platform",
    description:
      "Official company website and AI platform where I contributed as a Frontend Developer.",
    badge: "Team Project",
    keyContributions: [
      "Developed responsive landing pages and production-ready UI sections.",
      "Built reusable components used across multiple pages.",
      "Implemented animations and interactive user experiences.",
      "Optimized responsiveness and frontend performance.",
      "Collaborated with designers and engineers to prepare production deployments.",
    ],
    tech: ["Next.js", "React.js", "Tailwind CSS", "TypeScript"],
    link: "https://algorion.in",
    githubLink: null,
  },
];
