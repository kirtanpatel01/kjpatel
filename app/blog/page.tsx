import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import {
  PageContainer,
  SectionContainer,
  SectionHeading,
} from "@/components/responsive-wrappers";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Blog | Kirtan Patel",
  description:
    "Technical articles, engineering insights, and practical web development guides by Kirtan Patel.",
  alternates: {
    canonical: "https://kjpatel.me/blog",
  },
  openGraph: {
    title: "Blog | Kirtan Patel",
    description:
      "Technical articles, engineering insights, and practical web development guides by Kirtan Patel.",
    url: "https://kjpatel.me/blog",
    type: "website",
  },
};

export default function BlogListingPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <PageContainer>
      <SectionContainer id="blog-header" className="p-4 sm:p-6 space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
          Engineering &amp; Articles
        </h1>
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground font-des">
          Thoughts, technical deep dives, and practical guides on full stack
          engineering, TypeScript, Next.js, and modern web architecture.
        </p>
      </SectionContainer>

      {/* Featured / Latest Article */}
      {featuredPost ? (
        <SectionContainer id="featured-post" className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Latest Article
            </span>
          </div>

          <div className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 shadow-xs flex flex-col md:flex-row">
            {/* Cover Image */}
            <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto min-h-[220px] overflow-hidden bg-muted">
              <Image
                src={featuredPost.frontmatter.cover}
                alt={featuredPost.frontmatter.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 md:w-1/2 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  {featuredPost.frontmatter.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-mono"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading group-hover:text-primary transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.frontmatter.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground font-des line-clamp-3 leading-relaxed">
                  {featuredPost.frontmatter.description}
                </p>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.frontmatter.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readingTime}
                  </span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-primary group-hover:translate-x-1 transition-transform"
                >
                  Read Post <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>
      ) : (
        <SectionContainer className="p-4 sm:p-6 text-center text-muted-foreground">
          No articles published yet.
        </SectionContainer>
      )}

      {/* Other Posts Grid */}
      {otherPosts.length > 0 && (
        <SectionContainer id="all-posts" className="p-4 sm:p-6 space-y-4">
          <SectionHeading>All Articles</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-video overflow-hidden bg-muted">
                    <Image
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {post.frontmatter.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] font-mono px-2 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-foreground font-heading group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-des line-clamp-2">
                      {post.frontmatter.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>{post.frontmatter.date}</span>
                  <span>{post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionContainer>
      )}
    </PageContainer>
  );
}
