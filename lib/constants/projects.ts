export interface ProjectItem {
  title: string;
  slug: string;
  link: string | null;
  githubLink?: string | null;
  image?: string;
  description: string;
  badge?: string;
  tech?: string[];
  features?: string[];
}

export const projects: ProjectItem[] = [
  {
    title: "Sukoon ki Gali",
    slug: "sukoon-ki-gali",
    link: "https://sukoonkigali.kjpatel.me/",
    githubLink: "https://github.com/kirtanpatel01/sukoonkigali",
    image: "/images/projects/sukoonkigali-og.png",
    description:
      "A quiet corner of the internet with a peaceful, mood-driven collection of curated songs for when you need to slow down.",
    tech: [
      "Astro",
      "Tailwind CSS",
      "TypeScript",
      "YouTube API",
      "uisfx",
      "Cloudflare Workers",
      "PWA",
    ],
    features: [
      "Curated catalog of 100+ peaceful acoustic tracks synced with official YouTube playlist",
      "Two-way synchronization between custom audio controls and YouTube video player",
      "Expandable Theater Mode for focused video watching without losing playback controls",
      "Slide-over song drawer with instant real-time search filtering across title and artist",
      "Dynamic song exclusion checkboxes with localStorage persistence to skip specific tracks",
      "Anti-repeat Fisher-Yates shuffle engine preventing recent track loops in listening sessions",
      "Tactile procedural Web Audio sound effects on button and drawer interactions via uisfx",
      "Desktop keyboard shortcuts with smart auto-detection that suspends shortcuts in input fields",
    ],
  },
  {
    title: "Chatpate Songs",
    slug: "chatpate-songs",
    link: "https://chatpate.kjpatel.me/",
    githubLink: "https://github.com/kirtanpatel01/chatpate",
    image: "/images/projects/chatpate-og.jpg",
    description:
      "A high-energy web audio player curating 122 handpicked Bollywood party anthems, Punjabi hits, and desi nostalgia.",
    tech: [
      "Astro",
      "Tailwind CSS",
      "TypeScript",
      "YouTube API",
      "Web Audio API",
      "Cloudflare Workers",
    ],
    features: [
      "Curated 122-track high-energy catalog of Bollywood party anthems, Punjabi hits, and desi pop",
      "Persistent cross-page background audio playback powered by Astro ClientRouter",
      "Slide-over song queue with real-time text search filtering and animated equalizer indicator",
      "Granular song exclusion engine to skip selected tracks during sequential or shuffle playback",
      "Zero-dependency procedural audio click feedback synthesized via native Web Audio API",
      "Pre-rendered static song pages with automated SEO breadcrumbs and Schema.org metadata",
      "Local state persistence resuming exact playback timestamp and session queue across reloads",
    ],
  },
  {
    title: "Plot the chart",
    slug: "plot-the-chart",
    link: "https://plotthechart.kjpatel.workers.dev/",
    githubLink: "https://github.com/kirtanpatel01/plotthechart",
    image: "/images/projects/plotthechart-og.png",
    description:
      "Open-source data visualization studio & edge-deployed SVG chart generator.",
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
    features: [
      "7 visualization topologies: Bar, Line, Area, Pie/Donut, Scatter, Radar, and Treemap",
      "Schema-adaptive data editors built with TanStack Table v9 supporting CSV/TSV paste import",
      "Pure React SVG geometry engine with zero external charting library dependencies",
      "Instant SVG vector graphic export at full resolution using native XMLSerializer",
      "Cloud workspace with Better Auth authentication, search filtering, and chart duplication",
      "Edge-deployed full-stack architecture on Cloudflare Workers using Prisma ORM with Neon PostgreSQL",
    ],
  },
  {
    title: "Kiton UI",
    slug: "kiton-ui",
    link: null,
    description:
      "My other side of full stack dev which a design. Where I’m exploring my creative side.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    features: [
      "Handcrafted reusable UI components with focus on micro-interactions and tactile feel",
      "Custom CSS styling primitives including inset shadows, glassmorphism, and gradient borders",
      "Interactive component preview playground with instant one-click copyable code snippets",
      "Designed with Tailwind CSS, Lucide icons, and modern design engineering standards",
    ],
  },
  {
    title: "Kiton Fun",
    slug: "kiton-fun",
    link: null,
    description:
      "When I feel bored or want to take a small break this where you’ll find me.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    features: [
      "Collection of interactive mini-games and experiments for quick breaks and creative play",
      "Unbeatable Tic-Tac-Toe game engine powered by the Minimax algorithm",
      "Developer-themed Wordle game with programming terminology and streak tracking",
      "Classic retro Snake arcade game with smooth keyboard controls and real-time score tracking",
    ],
  },
];
