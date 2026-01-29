export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Kirtan Patel",
        "jobTitle": "Full Stack Developer",
        "url": "https://kjpatel.vercel.app",
        "sameAs": [
          "https://github.com/kirtanpatel01",
          "https://linkedin.com/in/kjpatel" 
        ],
        "knowsAbout": ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Supabase"]
      },
      {
        "@type": "WebSite",
        "name": "Kirtan Patel Portfolio",
        "url": "https://kjpatel.vercel.app",
        "author": {
          "@type": "Person",
          "name": "Kirtan Patel"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
