import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SqlNavbar from "@/components/layout/SqlNavbar";
import FloatingMiguelBot from "@/components/chat/FloatingMiguelBot";
import { ThemeProvider } from "@/context/ThemeContext";
import MoonlightToggle from "@/components/ui/MoonlightToggle";
import { ChatProvider } from '@/context/ChatContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miguel Garcia | Portfolio",
  description: "Interactive portfolio showcasing Miguel Garcia's projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ChatProvider>
            <div className="relative z-0">
              {/* Background gradient effect for Moonlight Mode */}
              <div className="moonlight-gradient fixed inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-blue-900/20 opacity-0 transition-opacity duration-700 pointer-events-none"></div>
              
              <SqlNavbar />
              <main className="flex-1">{children}</main>
              <MoonlightToggle />
              <FloatingMiguelBot />
            </div>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
