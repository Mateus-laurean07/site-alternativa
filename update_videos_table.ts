import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updateVideosTable() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env.local');
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('Adicionando coluna publicado na tabela videos...');
    await sql`ALTER TABLE videos ADD COLUMN IF NOT EXISTS publicado BOOLEAN DEFAULT true`;
    console.log('Coluna adicionada com sucesso!');
  } catch (err) {
    console.error('Erro ao atualizar tabela:', err);
  }
}

updateVideosTable();
