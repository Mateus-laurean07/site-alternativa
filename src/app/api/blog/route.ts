import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const body = await request.json();
    
    const { titulo, resumo, conteudo, categoria, tags, imagem } = body;
    
    // Gerar um slug baseado no titulo
    const slug = titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    await sql`
      INSERT INTO blog_posts (slug, titulo, resumo, conteudo, categoria, tags, imagem)
      VALUES (${slug}, ${titulo}, ${resumo}, ${conteudo}, ${categoria}, ${tags || ''}, ${imagem || '/images/blog/default.jpg'})
    `;

    return NextResponse.json({ success: true, slug });
  } catch (error: any) {
    console.error("Erro ao salvar artigo:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const posts = await sql`SELECT * FROM blog_posts ORDER BY data DESC`;
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
