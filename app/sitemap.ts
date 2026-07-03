import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kjpate.me",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    // Add more routes here as the site grows
  ];
}
