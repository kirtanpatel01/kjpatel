import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://kjpatel.vercel.app"),
  title: {
    default: "Kirtan Patel",
    template: "%s | Kirtan Patel",
  },
  description:
    "Personal portfolio of Kirtan Patel, a Full Stack Developer & Digital Craftsman tailored for high-performance web experiences.",
  keywords: [
    "Full Stack Developer",
    "Web Design",
    "React",
    "Next.js",
    "Portfolio",
    "Kirtan Patel",
  ],
  authors: [{ name: "Kirtan Patel", url: "https://kjpatel.vercel.app" }],
  creator: "Kirtan Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kjpatel.vercel.app",
    title: "Kirtan Patel | Full Stack Developer",
    description:
      "Personal portfolio of Kirtan Patel, a Full Stack Developer & Digital Craftsman.",
    siteName: "Kirtan Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirtan Patel | Full Stack Developer",
    description:
      "Personal portfolio of Kirtan Patel, a Full Stack Developer & Digital Craftsman.",
    creator: "@kjpatel",
  },
  alternates: {
    canonical: "/",
  },
};
