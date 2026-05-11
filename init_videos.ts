import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function initVideos() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env.local');
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('Criando tabela de videos...');
    await sql`
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        video_id VARCHAR(100) NOT NULL,
        descricao TEXT,
        ordem INTEGER DEFAULT 0,
        criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Inserindo os vídeos atuais
    const videosIniciais = [
      {
        titulo: "Institucional Pecuária 2025",
        videoId: "xbBzBFn4mfs",
        descricao: "Conheça a Alternativa Plásticos e nosso compromisso com a qualidade no campo.",
        ordem: 1
      },
      {
        titulo: "Montagem Nutrisilo",
        videoId: "UNEwue5zkcU",
        descricao: "Passo a passo da montagem do Nutrisilo, garantindo armazenamento seguro.",
        ordem: 2
      },
      {
        titulo: "Montagem Hidramax",
        videoId: "4DezhOi46nU",
        descricao: "Veja como instalar nosso bebedouro de alta capacidade, garantindo água limpa e fresca.",
        ordem: 3
      },
      {
        titulo: "Montagem Multicocho 200 com pé H",
        videoId: "g66lC-OzSn4",
        descricao: "Instruções de montagem do Multicocho com suporte tipo H.",
        ordem: 4
      },
      {
        titulo: "Montagem Protecocho (200 e 250)",
        videoId: "xAu_CRMpq8Y",
        descricao: "Tutorial de instalação da nossa linha de cochos cobertos.",
        ordem: 5
      },
      {
        titulo: "Montagem Autoabastecimento e Creep",
        videoId: "SZDaTakxMrM",
        descricao: "Como montar os cochos de autoabastecimento e Creep Feeding.",
        ordem: 6
      },
      {
        titulo: "Depoimento: Grelhas Suínas",
        videoId: "mOoEgUjTo0w",
        descricao: "O produtor relata a experiência com nossas soluções para suinocultura.",
        ordem: 7
      },
      {
        titulo: "Institucional Suinocultura 2025",
        videoId: "AsWxgDtV844",
        descricao: "Nossas soluções de alta resistência voltadas para a suinocultura.",
        ordem: 8
      }
    ];

    // Verificar se a tabela está vazia
    const countRes = await sql`SELECT COUNT(*) FROM videos`;
    if (Number(countRes[0].count) === 0) {
      console.log('Inserindo vídeos iniciais...');
      for (const v of videosIniciais) {
        await sql`
          INSERT INTO videos (titulo, video_id, descricao, ordem)
          VALUES (${v.titulo}, ${v.videoId}, ${v.descricao}, ${v.ordem})
        `;
      }
    } else {
      console.log('A tabela de videos já possui dados.');
    }

    console.log('Tabela videos inicializada com sucesso!');
  } catch (err) {
    console.error('Erro ao inicializar videos:', err);
  }
}

initVideos();
