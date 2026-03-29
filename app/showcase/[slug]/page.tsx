"use client";

import { useParams } from "next/navigation";
import { PageContainer } from "@/components/responsive-wrappers";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ShowcaseDetailPage() {
  const { slug } = useParams();
  
  return (
    <PageContainer>
      <Breadcrumb className="mb-4 border border-border/30 bg-secondary/20 text-secondary-foreground rounded-md w-fit px-3 py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/showcase">Showcase</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{slug}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="capitalize">{slug} page</p>
    </PageContainer>
  );
}
