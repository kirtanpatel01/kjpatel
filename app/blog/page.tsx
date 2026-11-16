import Image from "next/image";
import Link from "next/link";
import { getAllPosts, type BlogPost } from "@/lib/blog";
import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollReveal } from "@/components/scroll-reveal";

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

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-xl bg-card overflow-hidden flex flex-col justify-between">
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
            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
          </h3>
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
        <span>{post.frontmatter.date}</span>
        <span>{post.readingTime}</span>
      </div>
    </article>
  );
}

export default function BlogListingPage() {
  const posts = getAllPosts();

  const conceptsPosts = posts.filter(
    (post) =>
      post.frontmatter.category === "Concepts" || !post.frontmatter.category,
  );

  const learningsPosts = posts.filter(
    (post) => post.frontmatter.category === "Learnings",
  );

  return (
    <PageContainer className="pb-20">
      <SectionContainer id="all-posts" className="pt-16 sm:pt-20 pb-8">
        <div className="space-y-2 mb-8">
          <span className="block text-xs uppercase font-semibold tracking-widest text-muted-foreground/70">
            Writings
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Blog
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Technical articles, engineering insights, and practical web
            development guides.
          </p>
        </div>
        <Tabs defaultValue="concepts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="concepts">
              Concepts
              <span className="ml-2 rounded-full bg-muted-foreground/20 px-2 py-0.5 text-xs">
                {conceptsPosts.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="learnings">
              Learnings
              <span className="ml-2 rounded-full bg-muted-foreground/20 px-2 py-0.5 text-xs">
                {learningsPosts.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="concepts" className="mt-0">
            {conceptsPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {conceptsPosts.map((post, idx) => (
                  <ScrollReveal key={post.slug} delay={idx * 0.06} y={12}>
                    <PostCard post={post} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No articles published yet.
              </div>
            )}
          </TabsContent>

          <TabsContent value="learnings" className="mt-0">
            {learningsPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningsPosts.map((post, idx) => (
                  <ScrollReveal key={post.slug} delay={idx * 0.06} y={12}>
                    <PostCard post={post} />
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No articles published yet.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </PageContainer>
  );
}
