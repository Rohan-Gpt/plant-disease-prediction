import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Plant Disease Identifier",
  keywords: [
    "plant disease identifier",
    "plant disease detection",
    "plant health",
    "plant analysis",
    "agriculture technology",
    "AI plant analysis",
    "machine learning plant disease",
    "plant care",
    "agricultural AI",
    "plant disease recognition",
    "plant health monitoring",
    "agricultural technology",
    "AI agriculture",
    "plant disease AI",
    "plant disease recognition AI",
    "plant disease detection AI",
    "plant disease analysis",
    "plant disease identification",
    "plant disease diagnosis",
    "plant disease recognition system",
    "plant disease detection system",
    "plant disease analysis system",
    "plant AI",
  ],
  description:
    "plant disease identifier is an AI-powered tool that helps you identify plant diseases and provides remedies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
