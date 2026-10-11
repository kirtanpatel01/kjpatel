export interface ProjectItem {
  title: string;
  slug: string;
  link: string | null;
  githubLink?: string | null;
  description: string;
  badge?: string;
  role?: string;
  timeline?: string;
  runtime?: string;
  persistence?: string;
  tech?: string[];
}

export const projects: ProjectItem[] = [
  {
    title: "Sukoon ki Gali",
    slug: "sukoon-ki-gali",
    link: "https://sukoonkigali.kjpatel.me/",
    githubLink: "https://github.com/kirtanpatel01/sukoonkigali",
    description:
      "A quiet corner of the internet with a peaceful, mood-driven collection of curated songs for when you need to slow down.",
    badge: "Solo Built",
    role: "Sole Creator (Design, Engineering, Audio Curation)",
    timeline: "2026 (Active)",
    runtime: "Cloudflare Workers / Static Assets",
    persistence: "Client-side localStorage State Engine",
    tech: [
      "Astro",
      "Tailwind CSS",
      "TypeScript",
      "YouTube API",
      "uisfx",
      "Cloudflare Workers",
      "PWA",
    ],
  },
  {
    title: "Chatpate Songs",
    slug: "chatpate-songs",
    link: "https://chatpate.kjpatel.me/",
    githubLink: "https://github.com/kirtanpatel01/chatpate",
    description:
      "A high-energy web audio player curating 122 handpicked Bollywood party anthems, Punjabi hits, and desi nostalgia.",
    badge: "Solo Built",
    role: "Sole Creator (Design, Full-Stack & Data Pipeline)",
    timeline: "2026 (Active)",
    runtime: "Astro SSG + Cloudflare Workers",
    persistence: "Client-side localStorage State Engine",
    tech: [
      "Astro",
      "Tailwind CSS",
      "TypeScript",
      "YouTube API",
      "Web Audio API",
      "Cloudflare Workers",
    ],
  },
  {
    title: "Plot the chart",
    slug: "plot-the-chart",
    link: "https://plotthechart.kjpatel.workers.dev/",
    githubLink: "https://github.com/kirtanpatel01/plotthechart",
    description:
      "Open-source data visualization studio & edge-deployed SVG chart generator.",
    badge: "Solo Built",
    role: "Full-Stack Design & Engineering",
    timeline: "October 2026 (Active)",
    runtime: "Cloudflare Workers (workerd)",
    persistence: "Neon PostgreSQL + Prisma v7",
    tech: [
      "TanStack Start",
      "React",
      "TanStack Table",
      "Cloudflare Workers",
      "Better Auth",
      "Prisma",
      "PostgreSQL",
      "NeonDB",
      "Tailwind CSS",
      "Shadcn UI",
      "TypeScript",
    ],
  },
  {
    title: "Kiton UI",
    slug: "kiton-ui",
    link: null,
    description:
      "My other side of full stack dev which a design. Where I’m exploring my creative side",
  },
  {
    title: "Kiton Fun",
    slug: "kiton-fun",
    link: null,
    description:
      "When I feel bored or want to take a small break this where you’ll me.",
  },
];
