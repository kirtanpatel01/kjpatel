import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";

export const metadata = {
  title: "Components | Kirtan Patel",
  description: "A collection of UI components.",
};

export default function ComponentsPage() {
  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-6">
          Components
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link href="/components/blue-button" className="group block">
            <div className="border border-border shrink-0 p-4">
              <h2 className="text-base font-semibold text-center text-black dark:text-white">Blue Button</h2>
            </div>
          </Link>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
