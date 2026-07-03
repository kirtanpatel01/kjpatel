export type SkillCategory = "Frontend" | "Backend" | "Database";

export interface Skill {
  name: string;
  category: SkillCategory;
  color?: string;
  isNeutral?: boolean; // For monochromatic theme-flipping icons like Next.js
}

export const skills: Skill[] = [
  // Frontend
  {
    name: "TypeScript",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    category: "Frontend",
  },
  {
    name: "React.js",
    category: "Frontend",
  },
  {
    name: "Next.js",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
  },
  {
    name: "Shadcn/ui",
    category: "Frontend",
  },
  {
    name: "TanStack Start",
    category: "Frontend",
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
    name: "Git",
    category: "Backend",
  },
  {
    name: "GitHub",
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
];