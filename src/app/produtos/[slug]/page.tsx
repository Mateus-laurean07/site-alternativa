import { notFound } from "next/navigation";
import { getProdutoBySlug, produtos } from "@/data/produtos";
import ProdutoClient from "./ProdutoClient";

export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export default async function ProdutoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const produto = getProdutoBySlug(resolvedParams.slug);
  if (!produto) notFound();

  const relacionados = produtos.filter((p) => p.categoria === produto.categoria && p.slug !== produto.slug).slice(0, 3);

  return <ProdutoClient produto={produto} relacionados={relacionados} />;
}
