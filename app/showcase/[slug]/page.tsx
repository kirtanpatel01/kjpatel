"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageContainer } from "@/components/responsive-wrappers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { showcaseIdeas } from "@/lib/constants/showcase-registry";

export default function ShowcaseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Find the experiment in our central data list
  const activeIdea = showcaseIdeas.find((idea) => idea.slug === slug);

  return (
    <PageContainer>
      <div className="p-4">
        <Breadcrumb className="border border-border/30 bg-secondary/20 text-secondary-foreground rounded-full w-fit px-3 py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/showcase">Showcase</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {slug.split("-").join(" ")}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {activeIdea ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* The Content component now handles its own internal layout, including where CodeShowcase goes */}
          {activeIdea.content}
        </div>
      ) : (
        <div className="h-[600px] flex items-center justify-center border border-dashed rounded-xl text-muted-foreground italic">
          Coming soon: {slug}
        </div>
      )}
    </PageContainer>
  );
}
