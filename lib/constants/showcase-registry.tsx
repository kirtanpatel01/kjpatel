import type React from "react";
import { ElasticNavbarContent } from "@/components/showcase/elastic-navbar/content";

export interface ShowcaseIdea {
  title: string;
  description: string;
  videoUrl?: string; // We'll assume the filenames follow a convention like /videos/{slug}.mp4
  slug: string;
  content: React.ReactNode;
}

export const showcaseIdeas: ShowcaseIdea[] = [
  {
    title: "Elastic Follower Navbar",
    description:
      "A navigation bar where the active link highlight flows toward your cursor with magnetic elasticity. Built with three different state strategies.",
    slug: "elastic-navbar",
    content: <ElasticNavbarContent />,
  },
];
