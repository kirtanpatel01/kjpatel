import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const newsDirectory = path.join(process.cwd(), "content", "news");

export interface NewsFrontmatter {
  title: string;
  description: string;
  date: string;
}

export interface NewsListItem extends NewsFrontmatter {
  slug: string;
}

export interface NewsPost extends NewsFrontmatter {
  slug: string;
  content: string;
}

function ensureNewsDirectory() {
  if (!fs.existsSync(newsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(newsDirectory)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"));
}

function fileNameToSlug(fileName: string) {
  return fileName.replace(/\.mdx?$/, "");
}

export function getAllNewsPosts(): NewsListItem[] {
  const files = ensureNewsDirectory();

  const posts = files.map((fileName) => {
    const slug = fileNameToSlug(fileName);
    const fullPath = path.join(newsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getNewsPostBySlug(slug: string): NewsPost | null {
  const files = ensureNewsDirectory();
  const matchedFile = files.find((fileName) => fileNameToSlug(fileName) === slug);

  if (!matchedFile) {
    return null;
  }

  const fullPath = path.join(newsDirectory, matchedFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    content,
  };
}
