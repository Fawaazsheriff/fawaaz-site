import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TopBanner } from "@/components/layout/TopBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fawaz",
  description: "We are a venture capital firm focused on harnessing AI and data science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <TopBanner />
        {children}
      </body>
    </html>
  );
}
