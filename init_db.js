const { neon } = require('@neondatabase/serverless');

const sql = neon("postgresql://neondb_owner:npg_nGA0CKhwvHP9@ep-mute-tree-aqkt5i7y-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

async function main() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        resumo TEXT NOT NULL,
        conteudo TEXT NOT NULL,
        categoria VARCHAR(100) NOT NULL,
        tags VARCHAR(255),
        imagem TEXT,
        autor VARCHAR(100) DEFAULT 'Equipe Alternativa',
        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Tabela blog_posts criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  }
}

main();
