import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "esCode — Code Evaluation Platform",
  description:
    "Solve coding problems, submit solutions, and discuss approaches with the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <header className="border-b">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <Link className="text-lg font-semibold" href="/">
                  esCode
                </Link>
                <div className="flex items-center gap-4">
                  <nav className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link
                      className="transition-colors hover:text-foreground"
                      href="/problems"
                    >
                      Problems
                    </Link>
                    <Link
                      className="transition-colors hover:text-foreground"
                      href="/discuss"
                    >
                      Discuss
                    </Link>
                    <Link
                      className="transition-colors hover:text-foreground"
                      href="/submissions"
                    >
                      Submissions
                    </Link>
                  </nav>
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
            <footer className="border-t">
              <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 text-sm text-muted-foreground">
                <span>© 2025 esCode</span>
                <span>Built for focused practice.</span>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
