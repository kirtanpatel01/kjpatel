export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string | null;
  github_link: string | null;
  images: string[];
  purpose: string;
  longDescription: string;
  problem: string;
  solution: string;
  impact: string;
}

export const techMap: Record<
  string,
  { icon?: string; image?: string; color: string }
> = {
  "Next.js": { icon: "devicon-nextjs-plain", color: "#000000" },
  React: { icon: "devicon-react-original", color: "#61dafb" },
  TypeScript: { icon: "devicon-typescript-plain", color: "#3178c6" },
  Supabase: { icon: "devicon-supabase-plain", color: "#3ecf8e" },
  "React Query": { icon: "devicon-react-original", color: "#ff4154" },
  Zustand: { icon: "devicon-react-original", color: "#453423" },
  TailwindCSS: { icon: "devicon-tailwindcss-original", color: "#06b6d4" },
  "Framer Motion": { icon: "devicon-react-original", color: "#e11d48" },
};

export const projects: Project[] = [
  {
    title: "Morganize",
    description: "Production ERP and POS platform designed for organizations managing multiple stores, vendors, inventory, digital wallets, and customer operations through a unified interface.",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "React Query", "Zustand"],
    github_link: null,
    link: null,
    images: [
      "/sites/morganize/admin-dashboard.png",
      "/sites/morganize/customer-dashboard.png",
      "/sites/morganize/org-dashboard.png",
      "/sites/morganize/products.png",
      "/sites/morganize/customer-orders.png",
    ],
    purpose:
      "Consolidates POS, inventory, digital wallets, and payouts under a unified interface.",
    longDescription:
      "A multi-outlet ERP & POS platform built to eliminate administrative friction in campus and food-court style operations.",
    problem: "Organizations managed inventory, vendors, and POS systems across multiple stores with fragmented tools.",
    solution: "Built a unified ERP platform integrating inventory, POS, digital wallets, analytics, and real-time operations.",
    impact: "Reduced workflow complexity through a centralized interface and production-ready dashboard.",
  },
  {
    title: "Algorion AI",
    description: "Built the production frontend for the company's public website, developing reusable UI components, responsive layouts, animations, and performance-focused user experiences alongside a small engineering team.",
    tech: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    github_link: null,
    link: "https://algorion.com",
    images: [
      "/sites/algorion-home.png",
    ],
    purpose:
      "Led client UI/UX implementation and frontend landing-page deployment to support Algorion's AI solutions catalog.",
    longDescription:
      "Developed high-conversion product landing pages, fluid framer-motion micro-interactions, and a standardized reusable component system.",
    problem: "The startup needed high-performance, visually striking landing views to launch product offerings without hurting page load.",
    solution: "Developed a lightweight frontend landing page utilizing reusable React components and performance-optimized animations.",
    impact: "Secured responsive experience consistency across all viewports alongside a small engineering team.",
  },
];
