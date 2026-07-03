import * as Icons from "@/lib/constants/icons";
import type React from "react";

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  username: string;
  isNeutral?: boolean; // If true, the icon will flip between black/white based on theme
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kjpatel-dev",
    icon: Icons.LinkedIn,
    username: "kjpatel-dev",
    isNeutral: false,
  },
  {
    name: "GitHub",
    url: "https://github.com/kirtanpatel01",
    icon: Icons.Github,
    username: "kirtanpatel01",
    isNeutral: true,
  },
  {
    name: "Twitter",
    url: "https://x.com/kjpatel_dev",
    icon: Icons.X,
    username: "@kjpatel_dev",
    isNeutral: true,
  },
];
