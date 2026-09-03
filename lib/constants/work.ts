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
    title: "Trackmark",
    subtitle: "Internal Case Management and IPR Operations Platform",
    description:
      "Internal production work management and case tracking platform built for Intellectual Property Rights consultancy operations, replacing manual spreadsheets with centralized service specific workflows across 21 specialized IPR services.",
    badge: "Internal Project",
    keyContributions: [
      "Built fullstack MERN monorepo architecture with a dynamic service form system supporting 21 specialized IPR services.",
      "Developed a configurable stage engine supporting complex case lifecycles and automatic status synchronization.",
      "Implemented document management with Backblaze B2 cloud storage, short lived presigned URLs, and document access audit logging.",
    ],
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "Backblaze B2",
    ],
    link: null,
    githubLink: null,
  },
  {
    title: "Homizo Admin",
    subtitle: "Home Services Operations Platform",
    description:
      "Internal enterprise administration platform for an on demand home services ecosystem, managing bookings, provider verification, quotations, pricing, payouts, location tracking, and operational analytics.",
    badge: "Internal Project",
    keyContributions: [
      "Built the internal administration platform and core operational workflows for provider onboarding and verification.",
      "Implemented end to end booking management with provider assignment, status tracking, and OTP based field operations.",
      "Developed financial management workflows covering itemized costs, commissions, payouts, and multitable analytics with Recharts.",
    ],
    tech: [
      "Next.js",
      "React.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "Tailwind CSS",
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
      "Official website and AI platform developed as part of my internship at Algorion Research and Analysis Pvt. Ltd.",
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


