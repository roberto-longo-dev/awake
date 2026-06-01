import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  title: { template: "%s — Awake", default: "Awake -Specialty Coffee" },
  description:
    "Single origin specialty coffee, traced to the source. Direct trade roastery.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://app.termly.io/resource-blocker/9148a8c2-ae42-4785-8e1b-4c7bb7f86780?autoBlock=on"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col">
          <Header />
          {children}
          <Footer />
        </body>
    </html>
  );
}
