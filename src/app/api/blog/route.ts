import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const apenasPublicados = searchParams.get('publicado') === 'true';
    
    const sql = neon(process.env.DATABASE_URL!);
    
    let posts;
    if (apenasPublicados) {
      posts = await sql`SELECT * FROM blog_posts WHERE publicado = true ORDER BY data DESC`;
    } else {
      posts = await sql`SELECT * FROM blog_posts ORDER BY data DESC`;
    }
    
    const formattedPosts = posts.map(post => ({
      ...post,
      tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      tempoLeitura: post.tempoleitura || 5
    }));
    
    return NextResponse.json(formattedPosts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
