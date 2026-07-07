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
import { labIdeas } from "@/lib/constants/labs-registry";

export default function LabsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Find the experiment in our central data list
  const activeIdea = labIdeas.find((idea) => idea.slug === slug);

  return (
    <PageContainer>
      <div className="px-4 py-3">
        <Breadcrumb className="">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/labs">Labs</Link>
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
          {/* The Content component handles its own layout, including CodeShowcase */}
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
