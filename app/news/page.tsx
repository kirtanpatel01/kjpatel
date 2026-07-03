import Link from "next/link";
import {
  PageContainer,
  SectionContainer,
  SectionTitle,
} from "@/components/responsive-wrappers";
import { getAllNewsPosts } from "@/lib/news";

export default function NewsPage() {
  const newsItems = getAllNewsPosts();

  return (
    <PageContainer>
      <SectionContainer>
        <SectionTitle>News</SectionTitle>
        <p className="text-muted-foreground leading-relaxed sm:mt-2">
          Market updates, product shifts, and important changes people should be
          aware of.
        </p>
      </SectionContainer>

      <SectionContainer>
        <div className="space-y-3">
          {newsItems.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="block border border-dotted hover:border-solid rounded-xl p-4 transition-all duration-300 bg-secondary/10 hover:bg-secondary/20"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <span className="shrink-0 text-xs text-muted-foreground tracking-wide">
                  {item.date}
                </span>
              </div>

              <p className="text-muted-foreground mt-1 leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
