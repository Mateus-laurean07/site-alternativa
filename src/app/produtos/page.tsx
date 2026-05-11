import { Metadata } from "next";
import { neon } from "@neondatabase/serverless";
import ProdutosClient from "./ProdutosClient";
import { categorias } from "@/data/produtos";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Catálogo de Produtos",
  description: "Cochos e bebedouros de alta resistência para bovinos. Conheça as linhas Protecocho, Multicocho, Hidramax e muito mais.",
  openGraph: {
    title: "Catálogo de Produtos | Alternativa Cochos e Bebedouros",
    description: "Cochos e bebedouros de alta resistência para bovinos. Conheça as linhas Protecocho, Multicocho, Hidramax e muito mais.",
    images: [
      {
        url: "/images/sobre/DSC_8354.JPG",
        width: 1200,
        height: 630,
        alt: "Gado no pasto - Alternativa Cochos",
      },
    ],
  },
};

async function getProdutos() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const produtos = await sql`SELECT * FROM produtos WHERE disponivel = true ORDER BY id ASC`;
    return produtos;
  } catch (error) {
    console.error("Erro ao carregar produtos do banco:", error);
    return [];
  }
}

export default async function ProdutosPage() {
  const produtos = await getProdutos();
  
  return <ProdutosClient initialProdutos={produtos as any} categorias={categorias} />;
}
