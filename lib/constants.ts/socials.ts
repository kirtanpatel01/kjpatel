export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
  isNeutral?: boolean; // If true, the icon will flip between black/white based on theme
}

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kjpatel-dev",
    icon: "/logos/linkedin.svg",
    username: "kjpatel-dev",
    isNeutral: false,
  },
  {
    name: "GitHub",
    url: "https://github.com/kirtanpatel01",
    icon: "/logos/github.svg",
    username: "kirtanpatel01",
    isNeutral: true,
  },
  {
    name: "Twitter",
    url: "https://x.com/kjpatel_dev",
    icon: "/logos/x.svg",
    username: "@kjpatel_dev",
    isNeutral: true,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/kjpatel.dev",
    icon: "/logos/instagram.svg",
    username: "kjpatel.dev",
    isNeutral: false,
  },
];
