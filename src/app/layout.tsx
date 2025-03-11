import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import WatchProgressProvider from "@/contexts/WatchProgressContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineFlix - Your Ultimate Movie Experience",
  description: "Discover, track, and enjoy your favorite movies with CineFlix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LanguageProvider>
              <WatchProgressProvider>
                <WatchlistProvider>
                  <div className="min-h-screen bg-background">
                    <Navbar />
                    <main className="pt-16">{children}</main>
                  </div>
                  <Toaster />
                </WatchlistProvider>
              </WatchProgressProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
