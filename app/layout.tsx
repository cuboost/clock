import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClockSettingsProvider } from "@/context/clock-settings-context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";
import { FullscreenProvider } from "@/context/fullscreen-context";
import { ContextMenuHome } from "@/components/home/context-menu-home";
import ProgressBarProvider from "@/components/progress-bar/progress-bar-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clock",
  description: "Cuboost Clock, a simple customizable clock...",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClockSettingsProvider>
            <FullscreenProvider>
              <ProgressBarProvider>
                <ContextMenuHome>{children}</ContextMenuHome>
              </ProgressBarProvider>
            </FullscreenProvider>
          </ClockSettingsProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
