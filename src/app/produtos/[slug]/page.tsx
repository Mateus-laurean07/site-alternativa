import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProdutoBySlug, produtos } from "@/data/produtos";
import ProdutoClient from "./ProdutoClient";

export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const produto = getProdutoBySlug(resolvedParams.slug);
  
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
  const produto = getProdutoBySlug(resolvedParams.slug);
  if (!produto) notFound();

  const relacionados = produtos.filter((p) => p.categoria === produto.categoria && p.slug !== produto.slug).slice(0, 3);

  return <ProdutoClient produto={produto} relacionados={relacionados} />;
}
