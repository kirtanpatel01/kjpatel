export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string | null;
  github_link: string | null;
  images: string[];
  longDescription: string;
  purpose: string;
  features: string[];
}

export const techMap: Record<
  string,
  { icon?: string; image?: string; color: string }
> = {
  "Next.js": { icon: "devicon-nextjs-plain", color: "#000000" },
  NeonDB: { image: "/logos/neon.svg", color: "#00e0d9" },
  DrizzleORM: { image: "/logos/drizzle.svg", color: "#c5f74f" },
  Supabase: { icon: "devicon-supabase-plain", color: "#3ecf8e" },
  TailwindCSS: { icon: "devicon-tailwindcss-original", color: "#06b6d4" },
  TypeScript: { icon: "devicon-typescript-plain", color: "#3178c6" },
  "React.js": { icon: "devicon-react-original", color: "#61dafb" },
  "Node.js": { icon: "devicon-nodejs-plain", color: "#339933" },
  "Express.js": { icon: "devicon-express-original", color: "#999999" },
  MongoDB: { icon: "devicon-mongodb-plain", color: "#47a248" },
  "Tanstack Start": { image: "/logos/tanstack.svg", color: "#ffb000" },
};

export const projects: Project[] = [
  {
    title: "Morganize",
    description: "ERP + POS + Inventory Management System",
    tech: ["Next.js", "Supabase", "TailwindCSS"],
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
      "Morganize was built to revolutionize how multi-outlet organizations—such as food courts, malls, and campus markets—manage their retail ecosystem. It bridges the gap between complex hardware and fragmented POS systems.",
    longDescription:
      "A modern, high-performance POS (Point of Sale) & Multi-Store Management System designed for speed, scalability, and an exceptional user experience.",
    features: [
      "Multi-Area Management for grouping stores logically",
      "Store Vendor Dashboard for products, categories, and stock",
      "Real-time Order Tracking and automated status updates",
      "PDF Invoicing generation on-the-fly using jsPDF",
      "Native Wallet System for frictionless one-click payments",
      "Integrated Cashfree PG for UPI and Card transactions",
    ],
  },
  {
    title: "Upcurve",
    description: "Tracking platform for todos, habits, and exercises.",
    tech: ["Next.js", "NeonDB", "DrizzleORM"],
    link: "https://upcurve-xi.vercel.app",
    github_link: "https://github.com/kirtanpatel01/upcurve",
    images: [
      "/sites/upcurve/dashboard.png",
      "/sites/upcurve/exercise.png",
      "/sites/upcurve/habits.png",
      "/sites/upcurve/landing-page.png",
      "/sites/upcurve/todos.png",
    ],
    purpose:
      "Designed to help users track habits, manage tasks, and monitor physical activity. Built with a focus on speed, aesthetics, and user experience for total life management.",
    longDescription:
      "Upcurve is a modern, personal growth and productivity platform that provides a unified interface for tracking daily rituals and task progress.",
    features: [
      "Personal Dashboard with unified task and habit progress",
      "Efficient Task Management with priority levels",
      "Habit Tracking with consistency history monitoring",
      "Exercise Logging for tracking workouts and progress over time",
    ],
  },
  {
    title: "Kivio",
    description: "Youtube alternative for distraction free watching experience",
    tech: ["Tanstack Start", "TailwindCSS", "DrizzleORM", "NeonDB"],
    github_link: "https://github.com/kirtanpatel01/kivio",
    link: "https://kivio.vercel.app",
    images: [
      "/sites/kivio/kivio-home.png",
      "/sites/kivio/kivio-channel.png",
      "/sites/kivio/kivio-history.png",
    ],
    purpose:
      "Kivio filters the noise of traditional social platforms, removing distracting sidebars and comments to provide a pure, chronological feed of content you choose.",
    longDescription:
      "A high-performance, distraction-free YouTube feed aggregator designed for power users who want to take back control of their viewing experience.",
    features: [
      "Personalized Video Feed from followed channels",
      "Channel Management using simple handles",
      "Private Watch History manager for recently viewed videos",
      "Smart Metadata Caching for optimized performance",
      "Better Auth integration with Google OAuth support",
    ],
  },
];
