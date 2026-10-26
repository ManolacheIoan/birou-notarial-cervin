import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { BUSINESS_NAME, site } from "@/config/site";
import "./globals.css";

// Fonturi găzduite local: Playfair Display (serif clasic, contrast mare) pentru titluri
// și Inter pentru text. Fiecare are fișierul „latin” plus un subset minuscul „ro”
// (ă, ș, ț și variantele cu sedilă, ~3 KB), preîncărcat, ca textul să apară direct
// cu diacriticele corecte. Fără `adjustFontFallback`, ca ele să nu cadă pe fontul de rezervă.
const display = localFont({
  src: "./fonts/playfair-display-latin-wght-normal.woff2",
  weight: "400 900",
  variable: "--font-display-latin",
  display: "swap",
  adjustFontFallback: false,
});
const displayExt = localFont({
  src: "./fonts/playfair-display-ro-wght-normal.woff2",
  weight: "400 900",
  variable: "--font-display-ext",
  display: "swap",
  adjustFontFallback: false,
});
const text = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-text-latin",
  display: "swap",
  adjustFontFallback: false,
});
const textExt = localFont({
  src: "./fonts/inter-ro-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-text-ext",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: { default: `${BUSINESS_NAME}: ${site.tagline}`, template: `%s | ${BUSINESS_NAME}` },
  description: `${BUSINESS_NAME}: ${site.shortDescription}`,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F6F1E7",
  colorScheme: "light",
};

const fontVars = [display, displayExt, text, textExt].map((f) => f.variable).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={fontVars} suppressHydrationWarning>
      <head>
        {/* Marcaj „js”: animațiile de apariție nu ascund nimic dacă JavaScript lipsește. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        <Header />
        <ViewTransition default="pagina">
          <main id="continut" tabIndex={-1}>
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
