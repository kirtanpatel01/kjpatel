import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";

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
      {/* Featured / Latest Article */}
      {featuredPost ? (
        <SectionContainer id="featured-post" className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              Latest article
            </span>
          </div>

          <div className="group relative rounded-2xl bg-card overflow-hidden flex flex-col md:flex-row">
            {/* Cover Image */}
            <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-muted">
              <Image
                src={featuredPost.frontmatter.cover}
                alt={featuredPost.frontmatter.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 md:w-1/2 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.frontmatter.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                  {featuredPost.frontmatter.description}
                </p>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span>{featuredPost.frontmatter.date}</span>
                <span>{featuredPost.readingTime}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl bg-card overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-video overflow-hidden bg-muted">
                    <Image
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 pb-2">
                    <h3 className="text-base font-bold tracking-tight text-foreground transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
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
