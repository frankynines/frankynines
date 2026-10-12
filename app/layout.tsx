import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "FrankyNines. Painter, product designer, SupDucks.",
    template: "%s | FrankyNines",
  },
  description: site.description,
  keywords: [
    "FrankyNines",
    "Franky Aguilar",
    "SupDucks",
    "NFT artist",
    "product designer",
    "muralist",
    "SuperRare artist",
    "KnownOrigin",
    "Las Vegas artist",
    "Las Vegas muralist",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: "FrankyNines",
    description: site.description,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@frankynines",
    title: "FrankyNines",
    description: site.description,
    images: ["/og.png"],
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  jobTitle: "Technical Artist and Developer",
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Las Vegas", addressRegion: "NV" },
  sameAs: [
    site.socials.instagram,
    site.socials.x,
    site.socials.tiktok,
    site.socials.youtube,
    site.markets.superrare,
    site.markets.opensea,
  ],
  knowsAbout: ["Painting", "Murals", "NFTs", "Product Design", "Branding", "iOS apps"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,100,400;0,100,500;0,100,700;0,125,800;1,100,400&family=Bungee&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 slap"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
