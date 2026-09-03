export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Kirtan Patel",
        jobTitle: "Full Stack Developer",
        url: "https://kjpatel.me",
        sameAs: [
          "https://github.com/kirtanpatel01",
          "https://linkedin.com/in/kjpatel-dev",
          "https://x.com/kjpatel_dev",
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "MongoDB",
          "Supabase",
        ],
      },
      {
        "@type": "WebSite",
        name: "Kirtan Patel Portfolio",
        url: "https://kjpatel.me",
        author: {
          "@type": "Person",
          name: "Kirtan Patel",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
