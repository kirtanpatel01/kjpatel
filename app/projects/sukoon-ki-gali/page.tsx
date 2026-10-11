import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Music,
  Maximize2,
  ListMusic,
  Shuffle,
  Volume2,
  Keyboard,
  Cpu,
  CheckCircle2,
  FileCode2,
  Heart,
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

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata = {
  title: "Sukoon Ki Gali — Curated Peaceful Music Web App | Kirtan Patel",
  description:
    "Case study of Sukoon Ki Gali: an open-source, mood-driven music web app built with Astro, Tailwind CSS, TypeScript, and the YouTube IFrame API by Kirtan Patel.",
};

const TECH_STACK_GROUPS = [
  {
    category: "Core Framework & Runtime",
    items: [
      { name: "Astro", icon: Icons.Astro },
      { name: "TypeScript", icon: Icons.TS },
      { name: "Cloudflare Workers", icon: Icons.Cloudflare },
    ],
  },
  {
    category: "Styling & Typography",
    items: [
      { name: "Tailwind CSS v4", icon: Icons.Tailwind },
      { name: "Cormorant Garamond", icon: null },
      { name: "Plus Jakarta Sans", icon: null },
    ],
  },
  {
    category: "Media & Audio Engine",
    items: [
      { name: "YouTube IFrame API", icon: Icons.YouTube },
      { name: "uisfx (Web Audio)", icon: null },
    ],
  },
  {
    category: "PWA & Integrations",
    items: [
      { name: "Progressive Web App", icon: null },
      { name: "Service Worker (sw.js)", icon: null },
      { name: "Formspree API", icon: null },
    ],
  },
];

const CORE_CAPABILITIES = [
  {
    title: "Curated 227-Track Audio Engine",
    desc: "Hand-selected acoustic, indie, soulful Bollywood, and indie-folk tracks (Arijit Singh, Amit Trivedi, KK, Sanam, Prateek Kuhad, Darshan Raval), synced with the official YouTube playlist.",
    icon: Music,
  },
  {
    title: "Bidirectional YouTube Synchronization",
    desc: "Seamless two-way bridge between YouTube's underlying video player and custom amber-tinted controls (timeline scrubber, volume slider, play/pause states, and track index).",
    icon: Volume2,
  },
  {
    title: "Theater Mode Expansion",
    desc: "One-click toggle expanding the player from a compact max-w-lg console to an immersive max-w-4xl video canvas while keeping all custom controls immediately accessible.",
    icon: Maximize2,
  },
  {
    title: "Slide-Over Catalog & Instant Search",
    desc: "Slide-over drawer featuring real-time client-side search filtering across 227 tracks by title or artist, active track highlighting, and animated equalizer bars.",
    icon: ListMusic,
  },
  {
    title: "Dynamic Song Exclusion (Skip Lists)",
    desc: "Custom exclusion checkboxes allowing listeners to exclude specific tracks from playback sessions with instant localStorage persistence (skg_excluded_songs).",
    icon: Heart,
  },
  {
    title: "Smart Anti-Repeat Shuffle",
    desc: "Fisher-Yates queue implementation with a rolling session history window (up to 30% of catalog / 50 songs) that guarantees recently played songs do not repeat.",
    icon: Shuffle,
  },
  {
    title: "Tactile Sound Design (uisfx)",
    desc: "Synthesized Web Audio micro-interactions using the zen sound pack, providing subtle auditory feedback on clicks, drawer toggles, and modal form actions.",
    icon: Volume2,
  },
  {
    title: "Power-User Keyboard Shortcuts",
    desc: "10 desktop shortcuts (Space/K, Left/Right, N/B, S, R, M, P, F, Esc) with intelligent auto-detection that suspends shortcuts when typing in search or feedback inputs.",
    icon: Keyboard,
  },
];

const ENGINEERING_CHALLENGES = [
  {
    number: "01",
    title: "Official YouTube API Compliance vs Visual Immersion",
    context: "Terms-compliant video integration without visual clutter",
    challenge:
      "Building a serene, distraction-free player without violating YouTube's Terms of Service, which prohibit hiding, modifying, or scraping native video elements.",
    solution:
      "Designed an integrated video card that smoothly transitions between compact embedded viewing and Theater Mode (max-w-4xl), while layering custom amber-accented controls underneath that stay in bidirectional sync with YouTube events.",
  },
  {
    number: "02",
    title: "Non-Blocking Startup & Deferred API Initialization",
    context: "Preventing heavy external scripts from hurting First Paint",
    challenge:
      "The YouTube IFrame API script is heavy (~150KB+) and can significantly delay page rendering if loaded synchronously on initial mount.",
    solution:
      "Configured DNS preconnect hints for youtube.com and s.ytimg.com in the HTML head, and deferred API script injection using requestIdleCallback with a 1200ms fallback timeout.",
  },
  {
    number: "03",
    title: "Session-Aware Anti-Repeat Shuffle Algorithm",
    context: "Eliminating repetitive tracks in short listening sessions",
    challenge:
      "Standard Math.random() shuffle frequently repeats songs in small listening sessions, creating a frustrating experience in a curated catalog.",
    solution:
      "Engineered a two-pool Fisher-Yates shuffle that checks a rolling history buffer (up to 30% of valid songs). Recently played tracks are pushed to the tail end of the queue while user-excluded songs are pruned dynamically.",
  },
  {
    number: "04",
    title: "Client-Side State Persistence Without Backend Overhead",
    context: "Preserving preferences with zero account friction",
    challenge:
      "Preserving volume, mute state, shuffle, repeat, excluded song IDs, current track, and timestamp across visits without forcing user logins or database round-trips.",
    solution:
      "Built a robust localStorage synchronization layer in storage.ts with schema-versioned keys and automatic track cue restoration on player ready.",
  },
];

const MILESTONES = [
  {
    date: "Aug 2026",
    title: "Project Initialization & Core Curation",
    desc: "Astro static architecture established with an initial curated collection of 14 Hindi acoustic tracks.",
  },
  {
    date: "Aug 2026",
    title: "PWA Offline Shell & Maskable Icons",
    desc: "Integrated Service Worker (sw.js) with stale-while-revalidate caching and 100% opaque maskable adaptive icons.",
  },
  {
    date: "Aug 2026",
    title: "Song Exclusion Engine & Touch Controls",
    desc: "Built custom skip-list system with localStorage persistence and mobile-optimized touch scrubbers.",
  },
  {
    date: "Aug 2026",
    title: "Visible YouTube Integration & Theater Mode",
    desc: "Integrated YouTube IFrame video card with bidirectional timeline synchronization and expanding widescreen mode.",
  },
  {
    date: "Sep 2026",
    title: "Community Feedback Channels",
    desc: "Added Formspree-powered modal dialogs for suggesting song additions and submitting listener notes.",
  },
  {
    date: "Sep 2026",
    title: "Modular Architecture & Up Next Bar",
    desc: "Refactored player into discrete subcomponents (PlayerVideoCard, PlayerControls, PlayerProgress, UpNextBar).",
  },
  {
    date: "Oct 2026",
    title: "Expanded 227-Song Catalog & Search",
    desc: "Catalog expanded to 227 active songs with zero-latency client-side search filtering and animated EQ indicators.",
  },
  {
    date: "Oct 2026",
    title: "Cloudflare Workers Edge Deployment",
    desc: "Deployed static Worker assets via wrangler.json with multi-graph Schema.org JSON-LD structured data.",
  },
];

export default function SukoonKiGaliPage() {
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
              <BreadcrumbPage>Sukoon ki Gali</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Project Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
              Sukoon Ki Gali
            </h1>
            <Badge variant="default" className="text-xs">
              Solo Built
            </Badge>
            <Badge
              variant="outline"
              className="text-xs font-serif text-[#e2b170] border-[#e2b170]/40"
            >
              थोड़ी देर यहीं बैठो
            </Badge>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl font-desc">
            A quiet corner of the internet with a peaceful, mood-driven
            collection of curated songs for when you need to slow down.
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Button asChild size="sm" variant="default">
              <a
                href="https://sukoonkigali.kjpatel.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label="Open Sukoon Ki Gali Live Experience"
              >
                <span>Live Experience</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a
                href="https://github.com/kirtanpatel01/sukoonkigali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
                aria-label="View Sukoon Ki Gali Source Code on GitHub"
              >
                <Icons.Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <a
                href="https://youtube.com/playlist?list=PLUKBMAqy5FT0"
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
                src="/images/projects/sukoonkigali-og.png"
                alt="Sukoon Ki Gali Evening Atmospheric Interface"
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
                  Web Audio App & PWA
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
                  227 Curated Hindi & Indie Songs
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
                  Cloudflare Workers / Static Assets
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  Audio Bridge
                </span>
                <span className="font-medium text-foreground">
                  YouTube IFrame API + uisfx
                </span>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Section: Overview & The Philosophy of Calm */}
      <SectionHeading>Overview & Philosophy</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-4">
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-desc">
          Modern music streaming platforms are engineered to maximize
          algorithmic engagement, social metrics, and continuous consumption.
          For listeners experiencing cognitive fatigue, opening an app often
          presents decision paralysis: endless recommendations, visual clutter,
          and autoplay ads.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-desc">
          <strong>Sukoon Ki Gali</strong> (*&quot;A Peaceful Lane&quot;*) was
          conceived with the opposite philosophy: intentional minimalism. The
          interface does not fight for attention; it recedes into the
          background. Its guiding inscription,{" "}
          <em className="text-foreground font-medium">
            &quot;thodi der yahin baitho&quot;
          </em>{" "}
          (sit here for a while), sets the tone for an intimate, tranquil pause.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground font-desc">
          Set against a warm photographic evening scene illuminated by lantern
          light, the application offers an immediate, low-friction sanctuary.
          There are no user accounts, no tracking cookies, and no algorithmic
          feeds—just 227 thoughtfully curated Hindi, acoustic, and indie songs
          designed to help listeners decompress after a long day.
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

      {/* Section: Technical Architecture & Engineering Highlights */}
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

        {/* State Management Code Schema */}
        <div className="pt-2 space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
            Client-Side State Schema (localStorage)
          </span>
          <div className="p-3 rounded-md border border-border/60 bg-muted/30 font-mono text-xs overflow-x-auto text-foreground/90 leading-relaxed">
            <pre>{`export const STORAGE_KEYS = {
  TRACK_INDEX: 'skg_track_index',       // Resumes active song index on reload
  TRACK_TIME: 'skg_track_time',         // Cues exact second timestamp
  VOLUME: 'skg_volume',                 // Persistent audio slider level (0-100)
  IS_MUTED: 'skg_is_muted',             // Audio mute toggle
  IS_SHUFFLE: 'skg_is_shuffle',         // Shuffle queue state
  IS_REPEAT_SONG: 'skg_is_repeat_song', // Single track loop mode
  EXCLUDED_SONGS: 'skg_excluded_songs'  // Set of song IDs excluded by listener
};`}</pre>
          </div>
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
              src="/images/projects/sukoonkigali-bg.png"
              alt="Sukoon Ki Gali Lantern-Lit Evening Street Scene"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Atmospheric evening backdrop: Warm lantern lighting paired with calm
            street imagery designed to establish immediate visual tranquility.
          </p>
        </div>

        <div className="p-4 rounded-md border border-dashed border-border/70 bg-muted/10 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-14 h-14 shrink-0 relative rounded-md overflow-hidden border border-border/60 bg-background flex items-center justify-center p-1">
            <Image
              src="/images/projects/sukoonkigali-icon.png"
              alt="Sukoon Ki Gali Maskable PWA Icon"
              width={48}
              height={48}
              className="object-contain rounded-sm"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-foreground">
              Progressive Web App & Offline Shell
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Engineered with 100% opaque maskable adaptive icons, custom
              service worker shell caching (sw.js), and standalone launcher
              integration for distraction-free mobile listening.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Section: Development Log (Timeline) */}
      <SectionHeading>Development Log</SectionHeading>
      <SectionContainer className="p-4 sm:p-6 space-y-4">
        <div className="space-y-4 divide-y divide-dashed divide-border/60">
          {MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className={
                idx > 0
                  ? "pt-3.5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
                  : "flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
              }
            >
              <span className="font-mono text-xs font-semibold text-muted-foreground shrink-0 sm:w-20">
                {m.date}
              </span>
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-foreground tracking-tight font-heading">
                  {m.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-desc">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Sibling Navigation */}
      <SectionContainer className="p-4 sm:p-6 border-t border-dashed border-border/70">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <Link
            href="/projects/plot-the-chart"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Plot The Chart</span>
          </Link>

          <Link
            href="/projects"
            className="text-xs font-mono text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            All Projects
          </Link>

          <Link
            href="/projects/chatpate-songs"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Chatpate Songs</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
