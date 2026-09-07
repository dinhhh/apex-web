import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Apex Mobile Car Detailing | On-Site Car Detailing Across Sydney",
    template: "%s | Apex Mobile Car Detailing",
  },
  description: site.description,
  keywords: [
    "mobile car detailing Sydney",
    "car detailing Sydney",
    "mobile detailing NSW",
    "pre-sale car detailing Sydney",
    "interior car cleaning Sydney",
    "on-site car detailing",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: "Apex Mobile Car Detailing | On-Site Car Detailing Across Sydney",
    description: site.description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Mobile Car Detailing — mobile detailing across Greater Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Mobile Car Detailing | On-Site Car Detailing Across Sydney",
    description: site.description,
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "automotive",
};

export const viewport: Viewport = {
  themeColor: "#0a0c10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body className="min-h-dvh bg-ink-950 font-sans">
        <StructuredData />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
