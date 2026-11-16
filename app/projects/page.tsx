import {
  PageContainer,
  SectionContainer,
} from "@/components/responsive-wrappers";
import { CopyLinkBox } from "./copy-link-box";
import { projects } from "@/lib/constants/projects";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = {
  title: "Projects | Kirtan Patel",
  description:
    "Most of them are side projects curated to simplify my day to life.",
};

async function fetchOgImage(url: string | null): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const html = await res.text();
    const match =
      html.match(
        /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
      ) ||
      html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
      );

    let imageUrl = match ? match[1] : null;

    // Resolve relative URLs
    if (imageUrl && imageUrl.startsWith("/")) {
      const urlObj = new URL(url);
      imageUrl = `${urlObj.origin}${imageUrl}`;
    }

    return imageUrl;
  } catch (error) {
    console.error("Failed to fetch OG image for", url, error);
    return null;
  }
}

export default async function ProjectsPage() {
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      const ogImage = project.image || (await fetchOgImage(project.link));
      return { ...project, ogImage };
    }),
  );
  return (
    <PageContainer className="pb-20">
      <SectionContainer>
        <div className="space-y-2 pt-16 sm:pt-20 pb-8">
          <span className="block text-xs uppercase font-semibold tracking-widest text-muted-foreground/70">
            Archive
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Side projects, practical tools, and experiments built over time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {projectsWithImages.map((project, idx) => (
            <ScrollReveal key={project.slug || idx} delay={idx * 0.05} y={14}>
              <div className="flex flex-col group relative transition-transform duration-200 ease-out hover:-translate-y-1 will-change-transform">
                {/* Preview Box */}
                <div className="relative z-10 w-full aspect-[1200/630] bg-muted/40 dark:bg-muted/10 rounded-xl border border-border/40 transition-colors group-hover:bg-muted/60 dark:group-hover:bg-muted/20 flex items-center justify-center overflow-hidden">
                  {project.ogImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.ogImage}
                      alt={`${project.title} Preview`}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  ) : (
                    !project.link && (
                      <span className="text-sm font-medium text-muted-foreground/80">
                        Coming soon...
                      </span>
                    )
                  )}
                </div>

                {/* Link Bar */}
                {project.link && <CopyLinkBox link={project.link} />}

                {/* Title & Description */}
                {project.link ? (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="relative z-10 mt-3 space-y-1 ml-0.5 block group/link outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground tracking-tight group-hover/link:underline">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {project.description}
                    </p>
                  </Link>
                ) : (
                  <div className="relative z-10 mt-3 space-y-1 ml-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
