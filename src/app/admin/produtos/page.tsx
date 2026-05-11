import { neon } from '@neondatabase/serverless';
import AdminProdutosList from '@/components/admin/AdminProdutosList';

export const dynamic = 'force-dynamic';

async function getProdutos() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const produtos = await sql`
      SELECT id, slug, nome, categoria, imagem, disponivel, capacidade 
      FROM produtos 
      ORDER BY id ASC
    `;
    return produtos;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

export default async function AdminProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div>
      <AdminProdutosList initialProdutos={produtos as any} />
    </div>
  );
}
