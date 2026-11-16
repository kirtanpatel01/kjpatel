import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://kjpatel.me"),
  title: {
    default: "Kirtan Patel",
    template: "%s | Kirtan Patel",
  },
  description:
    "Personal portfolio of Kirtan Patel, a Senior Developer & Full Stack Engineer specializing in scalable web architecture and modern cloud systems.",
  keywords: [
    "Senior Developer",
    "Full Stack Developer",
    "Software Architect",
    "Technical Lead",
    "Web Design",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Kirtan Patel",
  ],
  authors: [{ name: "Kirtan Patel", url: "https://kjpatel.me" }],
  creator: "Kirtan Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kjpatel.me",
    title: "Kirtan Patel | Senior Developer",
    description:
      "Personal portfolio of Kirtan Patel, a Senior Developer & Full Stack Engineer.",
    siteName: "Kirtan Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirtan Patel | Senior Developer",
    description:
      "Personal portfolio of Kirtan Patel, a Senior Developer & Full Stack Engineer.",
    creator: "@kjpatel_dev",
  },
  alternates: {
    canonical: "/",
  },
};
