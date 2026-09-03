import type { Metadata } from "next";
import { DM_Sans, Signika_Negative, Chivo } from "next/font/google";
import Header from "@/components/header";
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
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-signika",
  display: "swap",
});

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-chivo",
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
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ACDKFde7zAoz6IilNdO13g"
          async
        />
      </head>
      <body
        className={`${DMSans.className} ${Signika.variable} ${chivo.variable} antialiased`}
      >
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
            <main className="min-h-[calc(100vh-5.25rem)] relative w-full max-w-3xl sm:border-x border-dashed mx-auto">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
