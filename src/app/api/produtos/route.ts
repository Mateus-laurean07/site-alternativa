import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const produtos = await sql`
      SELECT * FROM produtos 
      ORDER BY id ASC
    `;
    return NextResponse.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sql = neon(process.env.DATABASE_URL!);

    const produto = await sql`
      INSERT INTO produtos (
        slug, nome, nome_en, categoria, subcategoria, subcategoria_en,
        descricao, descricao_en, descricaoCompleta, descricaoCompleta_en,
        imagem, imagens, especificacoes, beneficios, beneficios_en,
        capacidade, disponivel, destaque, tag, tag_en, manual
      ) VALUES (
        ${body.slug}, ${body.nome}, ${body.nome_en || null}, ${body.categoria}, ${body.subcategoria || null}, ${body.subcategoria_en || null},
        ${body.descricao}, ${body.descricao_en || null}, ${body.descricaoCompleta}, ${body.descricaoCompleta_en || null},
        ${body.imagem}, ${JSON.stringify(body.imagens || [])}, ${JSON.stringify(body.especificacoes || [])}, 
        ${JSON.stringify(body.beneficios || [])}, ${JSON.stringify(body.beneficios_en || [])},
        ${body.capacidade || null}, ${body.disponivel !== undefined ? body.disponivel : true}, 
        ${body.destaque || false}, ${body.tag || null}, ${body.tag_en || null}, ${body.manual || null}
      )
      RETURNING *
    `;

    return NextResponse.json(produto[0]);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}
