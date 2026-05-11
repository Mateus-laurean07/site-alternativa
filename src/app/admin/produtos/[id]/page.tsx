import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';
import ProdutoForm from "@/components/admin/ProdutoForm";

export const dynamic = 'force-dynamic';

async function getProduto(id: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT * FROM produtos WHERE id = ${id}`;
    if (result.length === 0) return null;
    return result[0];
  } catch (error) {
    return null;
  }
}

export default async function EditarProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const produto = await getProduto(resolvedParams.id);

  if (!produto) {
    notFound();
  }

  return (
    <div>
      <ProdutoForm initialData={produto as any} isEdit={true} />
    </div>
  );
}
