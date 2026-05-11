import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const sql = neon(process.env.DATABASE_URL!);
    const isId = !isNaN(Number(resolvedParams.id));
    
    let produto;
    if (isId) {
      produto = await sql`SELECT * FROM produtos WHERE id = ${resolvedParams.id}`;
    } else {
      produto = await sql`SELECT * FROM produtos WHERE slug = ${resolvedParams.id}`;
    }

    if (produto.length === 0) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(produto[0]);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json({ error: 'Erro ao buscar produto' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const sql = neon(process.env.DATABASE_URL!);

    let result;
    if ('disponivel' in body && Object.keys(body).length === 1) {
      result = await sql`UPDATE produtos SET disponivel = ${body.disponivel} WHERE id = ${resolvedParams.id} RETURNING *`;
    } else {
      result = await sql`
        UPDATE produtos SET 
          slug = ${body.slug}, 
          nome = ${body.nome}, 
          nome_en = ${body.nome_en || null}, 
          categoria = ${body.categoria}, 
          subcategoria = ${body.subcategoria || null}, 
          subcategoria_en = ${body.subcategoria_en || null},
          descricao = ${body.descricao}, 
          descricao_en = ${body.descricao_en || null}, 
          "descricaoCompleta" = ${body.descricaoCompleta || body.descricaocompleta}, 
          "descricaoCompleta_en" = ${body.descricaoCompleta_en || body.descricaocompleta_en || null},
          imagem = ${body.imagem}, 
          imagens = ${JSON.stringify(body.imagens || [])}, 
          especificacoes = ${JSON.stringify(body.especificacoes || [])}, 
          beneficios = ${JSON.stringify(body.beneficios || [])}, 
          beneficios_en = ${JSON.stringify(body.beneficios_en || [])},
          capacidade = ${body.capacidade || null}, 
          disponivel = ${body.disponivel !== undefined ? body.disponivel : true}, 
          destaque = ${body.destaque || false}, 
          tag = ${body.tag || null}, 
          tag_en = ${body.tag_en || null}, 
          manual = ${body.manual || null}
        WHERE id = ${resolvedParams.id}
        RETURNING *
      `;
    }

    if (result.length === 0) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const sql = neon(process.env.DATABASE_URL!);
    
    const result = await sql`DELETE FROM produtos WHERE id = ${resolvedParams.id} RETURNING *`;
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 });
  }
}
