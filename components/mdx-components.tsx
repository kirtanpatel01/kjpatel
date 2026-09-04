import React from "react";
import Image from "next/image";
import Link from "next/link";
import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

interface PreProps {
  children?: React.ReactNode;
}

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
}

async function CodeBlock({ code, lang }: { code: string; lang: string }) {
  let html = "";
  try {
    html = await codeToHtml(code, {
      lang: lang || "text",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    });
  } catch {
    // Fallback if language is unknown
    html = `<pre><code>${code}</code></pre>`;
  }

  return (
    <div className="relative my-6 rounded-xl border border-border bg-muted/20 overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border/80 text-xs text-muted-foreground">
        <span className="tracking-wide font-medium text-foreground/70">
          {lang || "text"}
        </span>
        <CopyButton code={code} />
      </div>
      <div
        className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed [&>pre]:bg-transparent! [&>pre]:m-0! [&>pre]:p-0! [&_code]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-10 mb-4 border-b border-border/60 pb-2 scroll-mt-20"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    children,
    id,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={id}
      className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-8 mb-3 scroll-mt-20 group"
      {...props}
    >
      <a href={`#${id}`} className="hover:underline">
        {children}
      </a>
    </h2>
  ),
  h3: ({
    children,
    id,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={id}
      className="text-lg sm:text-xl font-semibold tracking-tight text-foreground mt-6 mb-2 scroll-mt-20"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-sm sm:text-base leading-relaxed text-foreground/90 my-4"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 ml-6 list-disc space-y-2 text-sm sm:text-base text-foreground/90"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 text-sm sm:text-base text-foreground/90"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-border pl-4 italic text-foreground/80 bg-muted/20 py-3 pr-4 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-dashed border-border" {...props} />
  ),
  table: ({
    children,
    ...props
  }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table
        className="w-full text-left text-xs sm:text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({
    children,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-border bg-muted/50 p-3 font-bold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-border/50 p-3 text-foreground/90" {...props}>
      {children}
    </td>
  ),
  code: ({ className, children }: CodeProps) => {
    // If it has a language class, pre component handles it
    if (className?.startsWith("language-")) {
      return <code className={className}>{children}</code>;
    }
    // Inline code styling: clean, integrated, Vercel/Linear developer style
    return (
      <code className="relative rounded-sm bg-secondary/80 px-1 py-px text-sm font-mono font-medium text-foreground border border-border/50">
        {children}
      </code>
    );
  },
  pre: async ({ children }: PreProps) => {
    // Extract code text and language from children
    const codeElement = React.Children.toArray(
      children,
    )[0] as React.ReactElement<CodeProps>;
    if (codeElement && codeElement.props) {
      const className = codeElement.props.className || "";
      const match = /language-(\w+)/.exec(className);
      const lang = match ? match[1] : "";
      const code = String(codeElement.props.children || "").trim();

      return <CodeBlock code={code} lang={lang} />;
    }
    return (
      <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono">
        {children}
      </pre>
    );
  },
  img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    return (
      <figure className="my-6">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
          <Image
            src={src}
            alt={alt || "Article illustration"}
            fill
            className="object-cover"
          />
        </div>
        {alt && (
          <figcaption className="mt-2 text-center text-xs text-muted-foreground italic">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
};
