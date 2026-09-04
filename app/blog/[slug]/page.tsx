import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";
import { Badge } from "@/components/ui/badge";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { mdxComponents } from "@/components/mdx-components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const { title, description, cover, date, updated, author } = post.frontmatter;
  const canonicalUrl = `https://kjpatel.me/blog/${slug}`;

  return {
    title: `${title} | Kirtan Patel`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: date,
      modifiedTime: updated || date,
      authors: [author],
      images: [
        {
          url: cover.startsWith("http") ? cover : `https://kjpatel.me${cover}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@kjpatel_dev",
      images: [cover.startsWith("http") ? cover : `https://kjpatel.me${cover}`],
    },
  };
}

// Table of Contents generator from MDX content headings
function extractHeadings(content: string) {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { id: string; text: string }[] = [];
  let match: RegExpExecArray | null = null;

  while (true) {
    match = headingRegex.exec(content);
    if (match === null) break;

    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text });
  }

  return headings;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;
  const headings = extractHeadings(content);
  const relatedPosts = getRelatedPosts(slug, frontmatter.tags, 2);
  const { prev, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.cover.startsWith("http")
      ? frontmatter.cover
      : `https://kjpatel.me${frontmatter.cover}`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated || frontmatter.date,
    author: {
      "@type": "Person",
      name: frontmatter.author,
      url: "https://kjpatel.me",
    },
    publisher: {
      "@type": "Person",
      name: "Kirtan Patel",
      url: "https://kjpatel.me",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://kjpatel.me/blog/${slug}`,
    },
  };

  return (
    <PageContainer>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full">
        {/* Back Link & Header info */}
        <SectionContainer className="p-4 sm:p-6 space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to articles
          </Link>

          <div className="flex flex-wrap gap-2 items-center pt-2">
            {frontmatter.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {frontmatter.title}
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
            {frontmatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-2 border-t border-border/60">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <User className="w-4 h-4 text-foreground/70" />
              {frontmatter.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {frontmatter.date}
            </span>
            {frontmatter.updated &&
              frontmatter.updated !== frontmatter.date && (
                <>
                  <span>•</span>
                  <span className="italic">Updated {frontmatter.updated}</span>
                </>
              )}
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingTime}
            </span>
          </div>
        </SectionContainer>

        {/* Cover Image */}
        <SectionContainer className="p-4 sm:p-6">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted">
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </SectionContainer>

        {/* Article Body + TOC Grid */}
        <SectionContainer className="p-4 sm:p-6">
          {headings.length > 0 && (
            <details className="mb-8 rounded-xl border border-border/80 bg-muted/20 p-4 text-sm">
              <summary className="font-bold text-foreground cursor-pointer select-none">
                Table of contents ({headings.length} sections)
              </summary>
              <ul className="mt-3 space-y-1.5 pl-4 border-l border-border">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* MDX Content */}
          <div className="prose dark:prose-invert max-w-none">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                },
              }}
            />
          </div>
        </SectionContainer>

        {/* Prev / Next Article Navigation */}
        {(prev || next) && (
          <SectionContainer className="p-4 sm:p-6 border-t border-dashed border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group rounded-xl bg-card p-4 transition-colors flex flex-col justify-between"
                >
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />{" "}
                    Previous post
                  </span>
                  <span className="font-bold text-sm text-foreground group-hover:text-foreground/90 transition-colors line-clamp-1">
                    {prev.frontmatter.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group rounded-xl bg-card p-4 transition-colors flex flex-col justify-between text-right sm:text-right"
                >
                  <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-1">
                    Next post{" "}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="font-bold text-sm text-foreground group-hover:text-foreground/90 transition-colors line-clamp-1">
                    {next.frontmatter.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </SectionContainer>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <SectionContainer className="p-4 sm:p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground">
              Related articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.slug}
                  href={`/blog/${rPost.slug}`}
                  className="group rounded-xl bg-card p-4 transition-colors space-y-2"
                >
                  <h4 className="font-bold text-sm text-foreground group-hover:text-foreground/90 transition-colors">
                    {rPost.frontmatter.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {rPost.frontmatter.description}
                  </p>
                </Link>
              ))}
            </div>
          </SectionContainer>
        )}
      </article>
    </PageContainer>
  );
}
