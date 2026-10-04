import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Tamil, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const display = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700"] });
const tamil = Noto_Sans_Tamil({ variable: "--font-tamil", subsets: ["tamil"], weight: ["400", "500", "700"] });

const description =
  "Sri Bhavani Coconut Producers Society: a farmer-owned collective in Erode district uniting coconut farmers to eliminate middlemen and raise the value of every nut.";

export const metadata: Metadata = {
  title: "Sri Bhavani Coconut Producers Society",
  description,
  icons: { icon: "/logo.svg" },
  openGraph: {
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
