export interface Project {
  year: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export const techMap: Record<string, { icon?: string; image?: string; color: string }> = {
  "Next.js": { icon: "devicon-nextjs-plain", color: "#000000" },
  "NeonDB": { image: "/logos/neon.svg", color: "#00e0d9" },
  "DrizzleORM": { image: "/logos/drizzle.svg", color: "#c5f74f" },
  "Supabase": { icon: "devicon-supabase-plain", color: "#3ecf8e" },
  "TailwindCSS": { icon: "devicon-tailwindcss-original", color: "#06b6d4" },
  "TypeScript": { icon: "devicon-typescript-plain", color: "#3178c6" },
  "React.js": { icon: "devicon-react-original", color: "#61dafb" },
  "Node.js": { icon: "devicon-nodejs-plain", color: "#339933" },
  "Express.js": { icon: "devicon-express-original", color: "#999999" },
  "MongoDB": { icon: "devicon-mongodb-plain", color: "#47a248" },
  "Tanstack Start": { image: "/logos/tanstack.svg", color: "#ffb000" },
};

export const projects: Project[] = [
  {
    title: "Upcurve",
    description: "Tracking platform for todos, habits, and exercises.",
    tech: ["Next.js", "NeonDB", "DrizzleORM"],
    link: "https://upcurve-xi.vercel.app",
    year: "2026"
  },
  {
    title: "Morganize",
    description: "ERP + POS + Inventory Management System",
    tech: ["Next.js", "Supabase", "TailwindCSS"],
    link: "#",
    year: "2026 (Present)"
  },
  {
    title: "Kivio",
    description: "Youtube alternative for distraction free watching experience",
    tech: ["Tanstack Start", "TailwindCSS", "DrizzleORM", "NeonDB"],
    link: "#",
    year: "2026 (Present)"
  },
];
