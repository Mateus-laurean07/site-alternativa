import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    const posts = await sql`SELECT * FROM blog_posts WHERE id = ${id}`;

    if (posts.length === 0) {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }

    return NextResponse.json(posts[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    const body = await request.json();
    const { titulo, resumo, conteudo, categoria, tags, imagem } = body;

    await sql`
      UPDATE blog_posts
      SET
        titulo     = ${titulo},
        resumo     = ${resumo},
        conteudo   = ${conteudo},
        categoria  = ${categoria},
        tags       = ${tags || ''},
        imagem     = ${imagem || ''}
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
