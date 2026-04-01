export type SkillCategory = "Frontend" | "Backend" | "Database";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  image?: string;
  color?: string;
  isNeutral?: boolean; // For monochromatic theme-flipping icons like Next.js
}

export const skills: Skill[] = [
  // Frontend
  { name: "TypeScript", category: "Frontend", icon: "devicon-typescript-plain", color: "#3178c6" },
  { name: "React.js", category: "Frontend", icon: "devicon-react-original", color: "#61dafb" },
  { 
    name: "Next.js", 
    category: "Frontend", 
    image: "/logos/nextjs.svg", 
    isNeutral: true // Only Next.js gets the theme-mask
  },
  { name: "Tailwind CSS", category: "Frontend", icon: "devicon-tailwindcss-original", color: "#06b6d4" },

  // Backend
  { name: "Node.js", category: "Backend", icon: "devicon-nodejs-plain", color: "#339933" },
  { 
    name: "Express.js", 
    category: "Backend", 
    image: "/logos/express.svg",
    isNeutral: true
  },

  { name: "DrizzleORM", category: "Backend", image: "/logos/drizzle.svg", color: "#c5f74f" },

  // Database
  { name: "Supabase", category: "Database", icon: "devicon-supabase-plain", color: "#3ecf8e" },
  { name: "NeonDB", category: "Database", image: "/logos/neon.svg", color: "#00e0d9" },
  { name: "MongoDB", category: "Database", icon: "devicon-mongodb-plain", color: "#47a248" },
];
