export interface Project {
  title: string;
  subtitle: string;
  description: string;
  badge: "Solo Built" | "Team Project" | "Internal Project";
  role?: string;
  keyContributions: string[];
  tech: string[];
  link: string | null;
  githubLink: string | null;
}

export const work: Project[] = [
  {
    title: "Trev",
    subtitle: "Multi-Tenant Client Workspace & Engineering Management Platform",
    description:
      "Multi-tenant client portal and engineering management platform built for digital agency Fmoxlay to centralize sprint tracking, requirements scoping, task workflows, and real-time project messaging into a single source of truth.",
    badge: "Internal Project",
    keyContributions: [
      "Architected the full-stack platform using Next.js 16 App Router and Supabase, designing a 10-table relational schema with PostgreSQL Row Level Security (RLS) policies and Security Definer functions to guarantee strict multi-tenant isolation across clients, developers, and admins.",
      "Engineered an interactive Kanban task board and two-tier requirements-to-features decomposition engine with multi-developer assignments, status lifecycles, and high-density TanStack data tables.",
      "Implemented a real-time messaging and notification system leveraging Supabase Realtime subscriptions with TanStack Query cache reconciliation, automated transactional SMTP invites, and custom micro-interactions like hold-to-confirm action guards.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "React Query",
      "Tailwind CSS",
      "Motion",
    ],
    link: null,
    githubLink: null,
  },
  {
    title: "QuickSwap Admin",
    subtitle: "Campus Marketplace Administration and Moderation Platform",
    description:
      "Internal administration and moderation platform for a campus marketplace, managing user accounts, marketplace listings, moderation reports, and administrative content operations.",
    badge: "Internal Project",
    keyContributions: [
      "Built Users, Listings, and Moderation interfaces with multifacet filtering, search, and optimistic React Context state updates.",
      "Developed serverside multinode Firebase Realtime Database aggregation services to unify users, listings, reviews, and reports.",
      "Implemented listing moderation workflows, soft delete archival services, and defensive data normalization for legacy NoSQL fields.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Firebase",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    link: null,
    githubLink: null,
  },
  {
    title: "Algorion AI",
    subtitle: "Company Website and AI Platform",
    description:
      "Official website and AI platform developed for Algorion Research and Analysis Pvt. Ltd.",
    badge: "Team Project",
    role: "Frontend Developer: Worked with designers and backend developers to build responsive, production ready interfaces and reusable frontend components.",
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
