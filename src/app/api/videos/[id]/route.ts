import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const sql = neon(process.env.DATABASE_URL!);
    
    const video = await sql`SELECT * FROM videos WHERE id = ${resolvedParams.id}`;

    if (video.length === 0) {
      return NextResponse.json({ error: 'Vídeo não encontrado' }, { status: 404 });
    }

    return NextResponse.json(video[0]);
  } catch (error) {
    console.error('Erro ao buscar vídeo:', error);
    return NextResponse.json({ error: 'Erro ao buscar vídeo' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const sql = neon(process.env.DATABASE_URL!);

    let result;
    if ('publicado' in body && Object.keys(body).length === 1) {
      result = await sql`UPDATE videos SET publicado = ${body.publicado} WHERE id = ${resolvedParams.id} RETURNING *`;
    } else {
      result = await sql`
        UPDATE videos SET 
          titulo = ${body.titulo}, 
          video_id = ${body.video_id}, 
          descricao = ${body.descricao}, 
          ordem = ${body.ordem}, 
          publicado = ${body.publicado} 
        WHERE id = ${resolvedParams.id} 
        RETURNING *
      `;
    }

    if (result.length === 0) {
      return NextResponse.json({ error: 'Vídeo não encontrado' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Erro ao atualizar vídeo:', error);
    return NextResponse.json({ error: 'Erro ao atualizar vídeo' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const sql = neon(process.env.DATABASE_URL!);
    
    const result = await sql`DELETE FROM videos WHERE id = ${resolvedParams.id} RETURNING *`;
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Vídeo não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vídeo deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar vídeo:', error);
    return NextResponse.json({ error: 'Erro ao deletar vídeo' }, { status: 500 });
  }
}
