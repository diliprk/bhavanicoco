import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Tamil, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const display = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700"] });
const tamil = Noto_Sans_Tamil({ variable: "--font-tamil", subsets: ["tamil"], weight: ["400", "500", "700"] });

const description =
  "Sri Bhavani Coconut Producers Society: a farmer-owned collective in Erode district uniting coconut farmers to eliminate middlemen and raise the value of every nut.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bhavani.cocops.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sri Bhavani Coconut Producers Society",
  description,
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Sri Bhavani Coconut Producers Society",
    description,
    url: siteUrl,
    siteName: "Sri Bhavani Coconut Producers Society",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Sri Bhavani Coconut Producers Society Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sri Bhavani Coconut Producers Society",
    description,
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = { themeColor: "#1f5d3a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${display.variable} ${tamil.variable} antialiased`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
