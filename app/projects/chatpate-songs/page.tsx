import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Music,
  Radio,
  ListMusic,
  Volume2,
  Heart,
  Layers,
  Cpu,
  CheckCircle2,
  FileCode2,
  Flame,
} from "lucide-react";
import {
  PageContainer,
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Icons from "@/lib/constants/icons";

export const metadata = {
  title:
    "Chatpate Songs — High-Energy Bollywood & Desi Music Player | Kirtan Patel",
  description:
    "Case study of Chatpate Songs: an open-source, high-energy Bollywood music player built with Astro, Tailwind CSS, TypeScript, and the YouTube IFrame API by Kirtan Patel.",
};

const TECH_STACK_GROUPS = [
  {
    category: "Framework & Routing",
    items: [
      { name: "Astro v7", icon: Icons.Astro },
      { name: "TypeScript", icon: Icons.TS },
      { name: "Cloudflare Workers", icon: Icons.Cloudflare },
    ],
  },
  {
    category: "Styling & Visual Design",
    items: [
      { name: "Tailwind CSS v4", icon: Icons.Tailwind },
      { name: "Glassmorphism UI", icon: null },
      { name: "Comic Halftone Patterns", icon: null },
    ],
  },
  {
    category: "Audio & Media Integration",
    items: [
      { name: "YouTube IFrame API", icon: Icons.YouTube },
      { name: "Web Audio API", icon: null },
    ],
  },
  {
    category: "Data Pipeline & State",
    items: [
      { name: "Node.js Pipeline", icon: Icons.Nodejs },
      { name: "Astro ClientRouter", icon: null },
      { name: "localStorage State Engine", icon: null },
    ],
  },
];

const CORE_CAPABILITIES = [
  {
    title: "Curated 122-Track High-Voltage Catalog",
    desc: "Hand-selected party bangers, wedding dance anthems, and desi pop hits (Kamal Khan, Sanam Puri, Meet Bros, Arijit Singh, Badshah, Darshan Raval), synchronized with the official YouTube playlist.",
    icon: Music,
  },
  {
    title: "Cross-Page Persistent Audio Engine",
    desc: "Leverages Astro's View Transitions (ClientRouter) and transition:persist to keep the headless YouTube audio iframe and floating bottom mini-player active across page navigations.",
    icon: Radio,
  },
  {
    title: "Slide-Over Queue & Instant Search",
    desc: "Off-canvas drawer featuring real-time client-side text filtering across all 122 songs by track title or artist, active playing status indicators, and animated equalizer bars.",
    icon: ListMusic,
  },
  {
    title: "Dynamic Song Exclusion Engine",
    desc: "Granular per-track exclusion checkboxes allowing users to customize their listening session. Excluded songs are dimmed and automatically skipped during sequential or shuffle playback.",
    icon: Heart,
  },
  {
    title: "Tactile Web Audio Procedural SFX",
    desc: "Zero-dependency procedural audio synthesis using the Web Audio API (AudioContext) delivering quiet mechanical click feedback on button clicks and drawer toggles with zero external asset bloat.",
    icon: Volume2,
  },
  {
    title: "Static Track Directory & Schema.org SEO",
    desc: "122 pre-rendered song pages (/songs/[slug]) built at build time with automated slug generation, YouTube artwork fallbacks, breadcrumbs, and MusicRecording JSON-LD structured data.",
    icon: Layers,
  },
];

const ENGINEERING_CHALLENGES = [
  {
    number: "01",
    title: "Persistent Audio Across Multi-Page Navigations in Astro",
    context:
      "Preserving running media streams without building a heavyweight SPA",
    challenge:
      "Astro is a static site generator where route changes traditionally trigger full page reloads, which instantly destroys active YouTube iframe instances and halts music playback.",
    solution:
      "Configured Astro's <ClientRouter /> alongside transition:persist='chatpate-audio-engine' on the player container. This instructs Astro's DOM diffing engine to preserve the running node across route changes, enabling uninterrupted music while users browse /songs.",
  },
  {
    number: "02",
    title: "Resilient Local State Resumption Without Authentication",
    context: "Preserving user context with zero account overhead",
    challenge:
      "Keeping track of playback progress, excluded song lists, shuffle state, and active track across visits without a database or backend server.",
    solution:
      "Built a client-side state persistence layer using localStorage that records the playback timestamp every 500ms. On reload, the player reads chatpate_last_playback_time and passes start: Math.floor(savedTime) into YouTube's API payload, resuming playback seamlessly.",
  },
  {
    number: "03",
    title: "Terms-Compliant Headless YouTube Audio with Custom UI Controls",
    context:
      "Balancing YouTube's embedding guidelines with custom visual aesthetics",
    challenge:
      "YouTube's Terms of Service require that iframe players remain functional without scraping or altering underlying streams, but native embeds clutter the UI with promotional overlays.",
    solution:
      "Structured the player to keep the authentic YouTube player instance mounted with modest branding parameters (playsinline: 1, rel: 0), while projecting custom amber controls that communicate bidirectionally with the YouTube JavaScript API bridge.",
  },
  {
    number: "04",
    title: "Procedural UI Sound Feedback Without Network Bloat",
    context:
      "Tactile micro-interactions without network latency or asset requests",
    challenge:
      "Serving static MP3 or WAV audio clips for button clicks adds extra HTTP requests, caching complexities, and mobile audio decoding latency.",
    solution:
      "Built a native Web Audio oscillator (playSFX('click')) that procedurally synthesizes a 350Hz to 600Hz frequency ramp with exponential gain decay over 40 milliseconds, executing synchronously with zero asset requests.",
  },
];

export default function ChatpateSongsPage() {
  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Chatpate Songs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Project Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
              Chatpate Songs
            </h1>
            <Badge variant="default" className="text-xs">
              Solo Built
            </Badge>
            <Badge
              variant="outline"
              className="text-xs font-mono text-[#ff9f1c] border-[#ff9f1c]/40"
            >
              Bollywood & Desi Bangers
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-desc">
            A high-energy web audio player curating 122 handpicked Bollywood
            party anthems, Punjabi hits, and desi nostalgia for when you need an
            immediate mood boost.
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Button asChild size="sm" variant="default">
              <a
                href="https://chatpate.kjpatel.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label="Open Chatpate Live Experience"
              >
                <span>Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a
                href="https://github.com/kirtanpatel01/chatpate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label="View Chatpate Source Code on GitHub"
              >
                <Icons.Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <a
                href="https://youtube.com/playlist?list=PLNRBgd_0X_og"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                aria-label="Open Official YouTube Playlist"
              >
                <Icons.YouTube className="w-3.5 h-3.5 text-red-500" />
                <span>YouTube Playlist</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Hero Section: 2-Column Desktop Grid (Preview + Metadata) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start pt-2">
          {/* Left Column: Visual Anchor (~65% on desktop) */}
          <div className="lg:col-span-8 overflow-hidden rounded-md border border-dashed border-border/80 bg-muted/20 group">
            <div className="relative aspect-[1200/630] w-full overflow-hidden">
              <Image
                src="/images/projects/chatpate-og.jpg"
                alt="Chatpate High-Energy Bollywood Music Player Interface"
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          </div>

          {/* Right Column: Compact Project Specs (~35% on desktop) */}
          <div className="lg:col-span-4 rounded-md border border-dashed border-border/80 bg-muted/10 p-4 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-dashed border-border/60">
              <FileCode2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Project Specs
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Type
                </span>
                <span className="font-medium text-foreground">
                  Web Audio Player & Directory
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Role
                </span>
                <span className="font-medium text-foreground">
                  Sole Creator (Design & Full-Stack)
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Catalog
                </span>
                <span className="font-medium text-foreground">
                  122 Curated Bollywood Bangers
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Timeline
                </span>
                <span className="font-medium text-foreground">
                  2026 (Active)
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Runtime
                </span>
                <span className="font-medium text-foreground">
                  Astro SSG + Cloudflare Workers
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Audio Bridge
                </span>
                <span className="font-medium text-foreground">
                  Headless YouTube API + Web Audio SFX
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Section: Overview & The Energy Philosophy */}
      <SectionHeading>Overview & Energy Philosophy</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-4">
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-desc">
          Most music streaming platforms today have become cluttered with
          algorithmic recommendations, podcast promotions, social overlays, and
          subscription paywalls. When you&apos;re feeling sluggish, working
          through a mental block, or hosting friends for a spontaneous
          gathering, you don&apos;t want to browse through endless menus—you
          just want high-octane music that instantly lifts the room.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-desc">
          <strong>Chatpate</strong> was built as the energetic alter ego to{" "}
          <Link
            href="/projects/sukoon-ki-gali"
            className="text-foreground underline underline-offset-4 hover:text-[#ff9f1c] transition-colors"
          >
            Sukoon Ki Gali
          </Link>
          . Where Sukoon provides a lantern-lit, meditative haven of acoustic
          melodies, Chatpate is driven by a single directive:{" "}
          <em className="text-foreground font-medium">
            &quot;Bas Volume Badha&quot;
          </em>{" "}
          (Just turn up the volume). It is a curated collection of 122 timeless
          Bollywood party tracks, Punjabi bangers, and high-tempo road trip
          anthems.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-desc">
          The application operates with zero friction: no user accounts, no
          tracking cookies, and no advertisements. Everything is built to start
          playing within milliseconds of opening the page, with continuous
          playback persisting as users explore the catalog.
        </p>
      </SectionContainer>

      {/* Section: Core Capabilities */}
      <SectionHeading>Core Capabilities</SectionHeading>
      <SectionContainer className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CORE_CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-md border border-dashed border-border/70 bg-accent/15 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-sm bg-accent/40 text-foreground">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base tracking-tight font-heading">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-desc">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Section: Architecture & Data Ingestion */}
      <SectionHeading>Architecture & Data Ingestion</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-4">
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-desc">
          Chatpate pairs a headless YouTube player bridge with an automated
          Node.js preprocessing pipeline to guarantee clean metadata and
          reliable client performance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-md border border-dashed border-border/70 bg-muted/20 space-y-1.5">
            <span className="font-mono text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#ff9f1c]" />
              Headless Audio Bridge
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mounts a hidden YouTube iframe (#global-audio-engine) that
              communicates bidirectionally with custom seek, volume, and track
              counters, staying in sync with native YouTube state events.
            </p>
          </div>

          <div className="p-3.5 rounded-md border border-dashed border-border/70 bg-muted/20 space-y-1.5">
            <span className="font-mono text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#ff9f1c]" />
              Automated Data Pipeline
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Custom Node.js scripts normalize messy raw playlist dumps,
              stripping promotional noise and classifying tracks into curated
              mood categories (Full Power, Desi Dance, Road Trip, Nostalgia
              Banger).
            </p>
          </div>
        </div>

        {/* State Management Code Schema */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
            Client-Side State Schema (localStorage)
          </span>
          <div className="p-3 rounded-md border border-border/60 bg-muted/30 font-mono text-xs overflow-x-auto text-foreground/90 leading-relaxed">
            <pre>{`export const STORAGE_KEYS = {
  LAST_SONG_INDEX: 'chatpate_last_song_index',       // Active playlist queue position
  LAST_SONG_ID: 'chatpate_last_song_id',             // 11-char YouTube video ID
  PLAYBACK_TIME: 'chatpate_last_playback_time',       // Recorded every 500ms for exact cue resume
  EXCLUDED_SONGS: 'chatpate_excluded_songs'          // Set of bypassed track IDs
};`}</pre>
          </div>
        </div>
      </SectionContainer>

      {/* Section: Engineering Highlights & Challenges */}
      <SectionHeading>Engineering Highlights</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-5">
        <div className="space-y-4 divide-y divide-dashed divide-border/60">
          {ENGINEERING_CHALLENGES.map((item, idx) => (
            <div
              key={idx}
              className={idx > 0 ? "pt-4 space-y-2.5" : "space-y-2.5"}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-muted-foreground/80">
                  {item.number}
                </span>
                <h3 className="font-semibold text-foreground text-sm sm:text-base tracking-tight font-heading">
                  {item.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                <div className="p-3 rounded-md border border-border/50 bg-muted/15 space-y-1">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
                    Challenge
                  </span>
                  <p className="text-muted-foreground">{item.challenge}</p>
                </div>
                <div className="p-3 rounded-md border border-border/50 bg-accent/20 space-y-1">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
                    Solution
                  </span>
                  <p className="text-foreground/90">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Section: Technology Stack */}
      <SectionHeading>Tech Stack</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-5">
        <div className="space-y-4">
          {TECH_STACK_GROUPS.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((tech) => {
                  const IconComponent = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/50 bg-gradient-to-b from-accent/60 to-accent/20 shadow-xs text-xs font-medium text-foreground select-none"
                    >
                      {IconComponent && (
                        <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                          <IconComponent className="w-full h-full" />
                        </div>
                      )}
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Section: Visual Showcase */}
      <SectionHeading>Visual Showcase</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-6">
        <div className="space-y-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-dashed border-border/80 bg-muted/20">
            <Image
              src="/images/projects/chatpate-bg.png"
              alt="Chatpate High-Energy Comic Halftone Background"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            High-voltage pop art visual identity: Comic halftone dot pattern
            overlay paired with glassmorphism controls reflecting Bollywood
            energy.
          </p>
        </div>

        <div className="p-4 rounded-md border border-dashed border-border/70 bg-muted/10 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-14 h-14 shrink-0 relative rounded-md overflow-hidden border border-border/60 bg-background flex items-center justify-center p-1">
            <Image
              src="/images/projects/chatpate-icon.png"
              alt="Chatpate App Icon"
              width={48}
              height={48}
              className="object-contain rounded-sm"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-foreground">
              Instant Web Player Experience
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Designed for zero-install, zero-login instant gratification.
              Deployed to Cloudflare Workers static edge for instant global
              loading.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Sibling Navigation */}
      <SectionContainer className="p-4 sm:p-6 border-t border-dashed border-border/70">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <Link
            href="/projects/sukoon-ki-gali"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Sukoon ki Gali</span>
          </Link>

          <Link
            href="/projects"
            className="text-xs font-mono text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            All Projects
          </Link>

          <Link
            href="/projects/plot-the-chart"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Plot The Chart</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
