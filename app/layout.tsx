import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://executives-motos.example"),
  title: {
    default: "Executives Motos | Premium cars, considered.",
    template: "%s | Executives Motos",
  },
  description: "Explore a considered selection of premium cars from Executives Motos. Browse sample listings and contact the team about a vehicle.",
  icons: { icon: "data:," },
  openGraph: {
    title: "Executives Motos | Premium cars, considered.",
    description: "Explore a considered selection of premium cars from Executives Motos.",
    type: "website",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <MotionConfig reducedMotion="user">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </MotionConfig>
      </body>
    </html>
  );
}
