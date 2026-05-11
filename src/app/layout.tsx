import type { Metadata } from "next";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://alternativamt.com.br"),
  title: {
    default: "Alternativa Cochos e Bebedouros | Soluções em Pecuária",
    template: "%s | Alternativa Cochos e Bebedouros",
  },
  description:
    "Pioneira em cochos plásticos de alta resistência para bovinos. Protecochos, Hidramax, Multicochos, Nutrisilo e Creep Feeding. Soluções completas para o agronegócio.",
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
      "Pioneira em cochos plásticos de alta resistência. Desde 2011, parceiro ideal dos criadores.",
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
