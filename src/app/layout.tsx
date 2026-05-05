import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
