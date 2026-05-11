import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import HomeContent from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: "Alternativa Cochos e Bebedouros | Soluções em Pecuária",
  description: "Pioneira em cochos plásticos de alta resistência para bovinos. Protecochos, Hidramax, Multicochos, Nutrisilo e Creep Feeding. Soluções completas para o agronegócio.",
  openGraph: {
    title: "Alternativa Cochos e Bebedouros | Soluções em Pecuária",
    description: "Pioneira em cochos plásticos de alta resistência. Desde 2011, parceiro ideal dos criadores.",
    images: [{ url: "/images/seo/og-image.jpg", width: 1200, height: 630, alt: "Alternativa Cochos e Bebedouros" }],
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeContent />
    </main>
  );
}
