import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import NewsCodeBlock from "@/components/news-code-block";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllNewsPosts, getNewsPostBySlug } from "@/lib/news";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllNewsPosts().map((post) => ({ slug: post.slug }));
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const newsPost = getNewsPostBySlug(slug);

  if (!newsPost) {
    notFound();
  }

  return (
    <PageContainer>
      <SectionContainer className="flex justify-between">
        <Breadcrumb className="border border-border/30 bg-secondary/20 text-secondary-foreground rounded-full w-fit px-3 py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/news">News</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{newsPost.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="mt-2 text-sm text-muted-foreground tracking-wide">
          {newsPost.date}
        </p>
      </SectionContainer>

      <SectionContainer className="space-y-4">
        <h1 className="font-bold text-xl sm:text-3xl lg:text-4xl tracking-tight">
          {newsPost.title}
        </h1>

        <article className="space-y-4 leading-relaxed text-foreground/90 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_p]:text-base [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:underline [&_a]:underline-offset-4">
          <MDXRemote source={newsPost.content} components={{ pre: NewsCodeBlock }} />
        </article>
      </SectionContainer>
    </PageContainer>
  );
}
