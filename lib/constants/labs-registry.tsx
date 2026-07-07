import type React from "react";
import { ElasticNavbarContent } from "@/components/labs/elastic-navbar/content";
import { SidebarTOCContent } from "@/components/labs/sidebar-toc/content";

export interface LabIdea {
  title: string;
  description: string;
  videoUrl?: string; // We'll assume the filenames follow a convention like /videos/{slug}.mp4
  slug: string;
  content: React.ReactNode;
}

export const labIdeas: LabIdea[] = [
  {
    title: "Elastic Follower Navbar",
    description:
      "A navigation bar where the active link highlight flows toward your cursor with magnetic elasticity. Built with three different state strategies.",
    slug: "elastic-navbar",
    content: <ElasticNavbarContent />,
  },
  {
    title: "Stepped Sidebar TOC",
    description:
      "A dynamic Table of Contents that handles nested layout navigation, featuring sharp 45-degree SVG steps, a scroll-direction aware active trace gradient, and a spring-animated diamond tracker.",
    slug: "sidebar-toc",
    content: <SidebarTOCContent />,
  },
];
