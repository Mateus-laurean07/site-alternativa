import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import HomeContent from "@/components/home/HomeContent";

import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Alternativa Cochos e Bebedouros | Soluções em Pecuária",
  description: "Pioneira em cochos plásticos de alta resistência para bovinos. Protecochos, Hidramax, Multicochos, Nutrisilo e Creep Feeding. Soluções completas para o agronegócio.",
  openGraph: {
    title: "Alternativa Cochos e Bebedouros | Soluções em Pecuária",
    description: "Pioneira em cochos plásticos de alta resistência. Desde 2011, parceiro ideal dos criadores.",
    images: [{ url: "/images/seo/og-image.jpg", width: 1200, height: 630, alt: "Alternativa Cochos e Bebedouros" }],
  },
};

async function getProdutosDestaque() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const produtos = await sql`
      SELECT * FROM produtos 
      WHERE destaque = true AND disponivel = true
      ORDER BY id ASC
      LIMIT 6
    `;
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar destaques:", error);
    return [];
  }
}

export default async function HomePage() {
  const produtosDestaque = await getProdutosDestaque();

  return (
    <main>
      <Hero />
      <HomeContent produtosDestaque={produtosDestaque as any[]} />
    </main>
  );
}
