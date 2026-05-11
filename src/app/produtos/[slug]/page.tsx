import { Metadata } from "next";
import { notFound } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import ProdutoClient from "./ProdutoClient";

export const dynamic = 'force-dynamic';

async function getProduto(slug: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT * FROM produtos WHERE slug = ${slug}`;
    if (result.length === 0) return null;
    return result[0];
  } catch (error) {
    return null;
  }
}

async function getRelacionados(categoria: string, slugOriginal: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`
      SELECT * FROM produtos 
      WHERE categoria = ${categoria} AND slug != ${slugOriginal} AND disponivel = true
      LIMIT 3
    `;
    return result;
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const produto = await getProduto(resolvedParams.slug);
  
  if (!produto) return {};

  return {
    title: `${produto.nome} - ${produto.categoria}`,
    description: produto.descricao,
    openGraph: {
      title: `${produto.nome} | Alternativa Cochos`,
      description: produto.descricao,
      images: [
        {
          url: produto.imagem,
          width: 800,
          height: 600,
          alt: produto.nome,
        },
      ],
    },
  };
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const produto = await getProduto(resolvedParams.slug);
  
  if (!produto) notFound();

  const relacionados = await getRelacionados(produto.categoria, produto.slug);

  return <ProdutoClient produto={produto as any} relacionados={relacionados as any[]} />;
}
