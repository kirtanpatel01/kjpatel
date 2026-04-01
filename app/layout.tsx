import Header from "@/components/header";
import { ThemeProvider } from "@/components/them-provider";
import type { Metadata } from "next";
import { Source_Code_Pro, Outfit, Inter, Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/components/json-ld";
import Footer from "@/components/footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body
        className={`${DMSans.className} antialiased`}
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
            <main className="w-full max-w-4xl border-x border-dashed mx-auto">
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
