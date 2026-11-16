import Work from "@/components/sections/work";
import { PageContainer } from "@/components/responsive-wrappers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Kirtan Patel",
  description:
    "Engineering projects, client platforms, and architectural work built by Kirtan Patel.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work | Kirtan Patel",
    description:
      "Engineering projects, client platforms, and architectural work built by Kirtan Patel.",
    url: "https://kjpatel.me/work",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <PageContainer>
      <Work />
    </PageContainer>
  );
}
