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
  title: "KJ_Patel",
  description: "Personal portfolio.",
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
