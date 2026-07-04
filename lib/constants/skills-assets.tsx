export type SkillCategory = "Languages" | "Frameworks" | "Backend" | "Database" | "DevOps" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  color?: string;
  isNeutral?: boolean; // For monochromatic theme-flipping icons like Next.js
}

export const skills: Skill[] = [
  // Languages
  {
    name: "TypeScript",
    category: "Languages",
  },
  {
    name: "JavaScript",
    category: "Languages",
  },

  // Frameworks
  {
    name: "React.js",
    category: "Frameworks",
  },
  {
    name: "Next.js",
    category: "Frameworks",
  },
  {
    name: "TanStack Start",
    category: "Frameworks",
  },
  {
    name: "Tailwind CSS",
    category: "Frameworks",
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
  },
  {
    name: "Express.js",
    category: "Backend",
  },
  {
    name: "DrizzleORM",
    category: "Backend",
  },
  {
    name: "Better Auth",
    category: "Backend",
  },
  {
    name: "Prisma",
    category: "Backend",
  },

  // Database
  {
    name: "PostgreSQL",
    category: "Database",
  },
  {
    name: "MongoDB",
    category: "Database",
  },
  {
    name: "Supabase",
    category: "Database",
  },
  {
    name: "NeonDB",
    category: "Database",
  },

  // DevOps
  {
    name: "Vercel",
    category: "DevOps",
  },
  {
    name: "Render",
    category: "DevOps",
  },

  // Tools
  {
    name: "Git",
    category: "Tools",
  },
  {
    name: "GitHub",
    category: "Tools",
  },
  {
    name: "Shadcn/ui",
    category: "Tools",
  },
  {
    name: "React Query",
    category: "Tools",
  },
  {
    name: "Motion",
    category: "Tools",
  },
];