import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/them-provider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import JsonLd from "@/components/json-ld";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccentThemeRail } from "@/components/accent-theme-rail";

const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

import { siteMetadata } from "@/lib/constants";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var a=localStorage.getItem('accent_theme');if(a&&a!=='zinc'){document.documentElement.setAttribute('data-accent',a);}}catch(e){}})();`,
          }}
        />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ACDKFde7zAoz6IilNdO13g"
          async
        />
      </head>
      <body
        className={`${DMSans.className} ${DMSans.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <TooltipProvider>
            <div className="flex flex-col min-h-screen w-full">
              <Header />
              <JsonLd />
              <AccentThemeRail />
              <main className="flex-1 relative w-full max-w-3xl sm:border-x border-dashed mx-auto">
                {children}
              </main>
              <Footer />
            </div>
          </TooltipProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
