import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KasStand - Aplikasi Kasir UMKM Super Ringan",
  description: "Aplikasi kasir super ringan untuk stand, booth, dan kaki lima.",
  manifest: "/manifest.json",
  themeColor: "#10b981",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased max-w-md mx-auto min-h-screen relative shadow-2xl pb-20`}>
        <PWAHandler />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
