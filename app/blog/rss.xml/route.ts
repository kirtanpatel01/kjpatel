import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = "https://kjpatel.me";

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <author><![CDATA[${post.frontmatter.author}]]></author>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kirtan Patel | Engineering Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical articles, engineering insights, and practical web development guides by Kirtan Patel.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
