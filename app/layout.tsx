import Header from "@/components/header";
import { ThemeProvider } from "@/components/them-provider";
import type { Metadata } from "next";
import { Source_Code_Pro, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Cursor from "@/components/cursor";

const source = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-mono",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://kjpatel.vercel.app"),
  title: {
    default: "Kirtan Patel | Full Stack Developer",
    template: "%s | Kirtan Patel"
  },
  description: "Personal portfolio of Kirtan Patel, a Full Stack Developer & Digital Craftsman tailored for high-performance web experiences.",
  keywords: ["Full Stack Developer", "Web Design", "React", "Next.js", "Portfolio", "Kirtan Patel"],
  authors: [{ name: "Kirtan Patel", url: "https://kjpatel.vercel.app" }],
  creator: "Kirtan Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kjpatel.vercel.app",
    title: "Kirtan Patel | Full Stack Developer",
    description: "Personal portfolio of Kirtan Patel, a Full Stack Developer & Digital Craftsman.",
    siteName: "Kirtan Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirtan Patel | Full Stack Developer",
    description: "Personal portfolio of Kirtan Patel, a Full Stack Developer & Digital Craftsman.",
    creator: "@kjpatel", 
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} ${source.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <Cursor />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
