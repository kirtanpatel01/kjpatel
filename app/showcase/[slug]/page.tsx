"use client";

import { useParams } from "next/navigation";
import { PageContainer } from "@/components/responsive-wrappers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import CodeShowcase from "@/components/code-showcase";
import { showcaseIdeas } from "@/lib/constants/showcase-registry";

export default function ShowcaseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Find the experiment in our central data list
  const activeIdea = showcaseIdeas.find((idea) => idea.slug === slug);

  return (
    <PageContainer>
      <Breadcrumb className="mb-4 border border-border/30 bg-secondary/20 text-secondary-foreground rounded-full w-fit px-3 py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/showcase">Showcase</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{slug.split("-").join(" ")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {activeIdea ? (
        <CodeShowcase
          fileData={activeIdea.fileData}
          codeMapping={activeIdea.codeMapping}
          previewComponent={activeIdea.previewComponent}
          defaultFilePath={activeIdea.defaultFilePath}
          defaultFileNode={activeIdea.defaultFileNode}
        />
      ) : (
        <div className="h-[600px] flex items-center justify-center border border-dashed rounded-xl text-muted-foreground italic">
          Coming soon: {slug}
        </div>
      )}
    </PageContainer>
  );
}
