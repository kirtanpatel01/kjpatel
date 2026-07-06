import type { Metadata } from "next";
import { DM_Sans, Signika_Negative, Chivo } from "next/font/google";
import Header from "@/components/header";
import SidebarTOC from "@/components/sidebar-toc";
import { ThemeProvider } from "@/components/them-provider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import JsonLd from "@/components/json-ld";
import { TooltipProvider } from "@/components/ui/tooltip";

const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const Signika = Signika_Negative({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-signika",
  display: "swap",
});


const chivo = Chivo({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-chivo",
  display: "swap",
})

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
      </head>
      <body className={`${DMSans.className} ${Signika.variable} ${chivo.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <TooltipProvider>
            <Header />
            <JsonLd />
            <main className="w-full max-w-4xl sm:border-x border-dashed mx-auto">
              {children}
            </main>
            <aside className="hidden xl:block fixed xl:right-4 2xl:right-8 top-24 w-44 2xl:w-48 z-40">
              <SidebarTOC />
            </aside>
            <Footer />
          </TooltipProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
