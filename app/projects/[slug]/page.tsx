import { projects } from "@/lib/constants/projects";
import { notFound } from "next/navigation";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import React from "react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <PageContainer>
      <SectionContainer className="p-4">
        <div>
          <h3 className="font-semibold text-foreground tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-snug">
            {project.description}
          </p>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
