import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { TopBanner } from "@/components/layout/TopBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Fawaaz Sheriff",
  description: "Research and conversations on the businesses and industries defining the next decade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plexMono.variable} antialiased`}
      >
        <TopBanner />
        {children}
      </body>
    </html>
  );
}
