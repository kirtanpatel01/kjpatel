import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  cover: string;
  published: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: string;
}

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_DIRECTORY);

  const posts: BlogPost[] = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(BLOG_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const frontmatter: BlogPostFrontmatter = {
        title: data.title || "Untitled Post",
        description: data.description || "",
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
        updated: data.updated ? new Date(data.updated).toISOString().split("T")[0] : undefined,
        author: data.author || "Kirtan Patel",
        tags: Array.isArray(data.tags) ? data.tags : [],
        cover: data.cover || "/images/blog/javascript-scope.jpg",
        published: Boolean(data.published),
      };

      return {
        slug,
        frontmatter,
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    .filter((post) => post.frontmatter.published)
    .sort((a, b) => (new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()));

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const mdxPath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
    const mdPath = path.join(BLOG_DIRECTORY, `${slug}.md`);

    const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

    if (!fullPath) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter: BlogPostFrontmatter = {
      title: data.title || "Untitled Post",
      description: data.description || "",
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      updated: data.updated ? new Date(data.updated).toISOString().split("T")[0] : undefined,
      author: data.author || "Kirtan Patel",
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover || "/images/blog/javascript-scope.jpg",
      published: Boolean(data.published),
    };

    return {
      slug,
      frontmatter,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 2): BlogPost[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);

  if (allPosts.length === 0) return [];

  // Sort by matching tag count, then date
  const scoredPosts = allPosts.map((post) => {
    const matchingTags = post.frontmatter.tags.filter((tag) => tags.includes(tag)).length;
    return { post, score: matchingTags };
  });

  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.post.frontmatter.date).getTime() - new Date(a.post.frontmatter.date).getTime();
  });

  return scoredPosts.slice(0, limit).map((sp) => sp.post);
}

export function getAdjacentPosts(currentSlug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === currentSlug);

  if (index === -1) {
    return { prev: null, next: null };
  }

  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  const next = index > 0 ? posts[index - 1] : null;

  return { prev, next };
}
