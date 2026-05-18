import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a3a1f",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alternativamt.com.br"),
  title: {
    default: "Alternativa Cochos e Bebedouros | Soluções em Pecuária",
    template: "%s | Alternativa Cochos e Bebedouros",
  },
  description:
    "Pioneira em cochos plásticos de alta resistência para bovinos. Protecochos, Hidramax, Multicochos, Nutrisilo e Creep Feeding. Soluções completas para o agronegócio por mais de 14 anos.",
  keywords: [
    "cochos plásticos",
    "bebedouros para gado",
    "protecocho",
    "hidramax",
    "multicocho",
    "nutrisilo",
    "creep feeding",
    "pecuária",
    "agronegócio",
    "Lucas do Rio Verde",
    "Mato Grosso",
  ],
  authors: [{ name: "Alternativa Plásticos" }],
  creator: "Alternativa Plásticos",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.alternativamt.com.br",
    siteName: "Alternativa Cochos e Bebedouros",
    title: "Alternativa Cochos e Bebedouros | Soluções em Pecuária",
    description:
      "Pioneira em cochos plásticos de alta resistência. Mais de 14 anos como o parceiro ideal dos criadores.",
    images: [
      {
        url: "/images/seo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alternativa Cochos e Bebedouros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alternativa Cochos e Bebedouros",
    description: "Pioneira em cochos plásticos de alta resistência.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from "@/contexts/LanguageContext";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="dns-prefetch" href="https://economia.awesomeapi.com.br" />
        <link rel="preconnect" href="https://economia.awesomeapi.com.br" />
        <link rel="preload" href="/images/hero/hero-1.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/hero/hero-2.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/hero/hero-3.webp" as="image" type="image/webp" />
      </head>
      <body>
        <SmoothScrollProvider>
          <LanguageProvider>
            <SiteLayout>{children}</SiteLayout>
          </LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
