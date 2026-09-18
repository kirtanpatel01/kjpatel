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
          <Link href="/components/glossy-button" className="group block">
            <div className="aspect-square rounded-xl border border-border overflow-hidden transition-all hover:border-primary/20 hover:shadow-sm flex flex-col">
              <div className="flex-1 bg-white flex items-center justify-center relative overflow-hidden">
                <img
                  src="/images/components/glossy-button.svg"
                  alt="Glossy Button"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="py-4 px-4 bg-[#eef0f2] dark:bg-muted border-t border-border shrink-0">
                <h2 className="text-base font-semibold text-center text-black dark:text-white">Glossy Button</h2>
              </div>
            </div>
          </Link>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
