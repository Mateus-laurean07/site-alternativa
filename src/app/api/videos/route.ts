import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const videos = await sql`SELECT * FROM videos ORDER BY ordem ASC, id DESC`;
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    return NextResponse.json({ error: 'Erro ao buscar vídeos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    const result = await sql`
      INSERT INTO videos (titulo, video_id, descricao, ordem, publicado)
      VALUES (${body.titulo}, ${body.videoId || body.video_id}, ${body.descricao || null}, ${body.ordem || 0}, ${body.publicado ?? true})
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Erro ao criar vídeo:', error);
    return NextResponse.json({ error: 'Erro ao criar vídeo' }, { status: 500 });
  }
}
