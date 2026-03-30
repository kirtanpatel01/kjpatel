import { FileNode } from "@/components/file-tree-item";
import { elasticNavbarCode, elasticNavbarFiles } from "@/lib/constants/showcase-code/elastic-navbar";
import ElasticNavbar from "@/components/showcase/elastic-navbar";
import React from "react";

export interface ShowcaseIdea {
  title: string;
  description: string;
  videoUrl?: string; // We'll assume the filenames follow a convention like /videos/{slug}.mp4
  slug: string;
  
  // Implementation details
  fileData: FileNode[];
  codeMapping: Record<string, { code: string; language: string }>;
  previewComponent: React.ReactNode;
  defaultFilePath: string;
  defaultFileNode: { name: string; type: "file" | "folder" };
}

export const showcaseIdeas: ShowcaseIdea[] = [
  {
    title: "Elastic Follower Navbar",
    description: "A navigation bar where the active link highlight flows toward your cursor with magnetic elasticity. Built with three different state strategies.",
    slug: "elastic-navbar",
    fileData: elasticNavbarFiles,
    codeMapping: elasticNavbarCode,
    previewComponent: <ElasticNavbar />,
    defaultFilePath: "components/navbar.tsx",
    defaultFileNode: { name: "navbar.tsx", type: "file" }
  },
];