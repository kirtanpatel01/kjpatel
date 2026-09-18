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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;
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

        {/* Article Body */}
        <SectionContainer className="p-4 sm:p-6">
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

      </article>
    </PageContainer>
  );
}
