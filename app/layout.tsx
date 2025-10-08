import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/them-provider";
import Header from "@/components/header";
import { Toaster } from "sonner";

const source = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
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
        className={`${source.className} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
