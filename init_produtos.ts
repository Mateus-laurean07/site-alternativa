import { neon } from '@neondatabase/serverless';
import { produtos } from './src/data/produtos';

const sql = neon("postgresql://neondb_owner:npg_nGA0CKhwvHP9@ep-mute-tree-aqkt5i7y-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

async function main() {
  try {
    console.log("Criando tabela produtos...");
    await sql`
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        nome VARCHAR(255) NOT NULL,
        nome_en VARCHAR(255),
        categoria VARCHAR(100) NOT NULL,
        subcategoria VARCHAR(100),
        subcategoria_en VARCHAR(100),
        descricao TEXT NOT NULL,
        descricao_en TEXT,
        descricaoCompleta TEXT NOT NULL,
        descricaoCompleta_en TEXT,
        imagem TEXT NOT NULL,
        imagens JSONB,
        especificacoes JSONB,
        beneficios JSONB,
        beneficios_en JSONB,
        capacidade VARCHAR(50),
        disponivel BOOLEAN DEFAULT true,
        destaque BOOLEAN DEFAULT false,
        tag VARCHAR(50),
        tag_en VARCHAR(50),
        manual TEXT
      );
    `;
    console.log("Tabela produtos criada com sucesso!");

    console.log("Migrando produtos existentes...");
    
    for (const p of produtos) {
      // Verifica se o produto já existe
      const existe = await sql`SELECT slug FROM produtos WHERE slug = ${p.slug}`;
      if (existe.length === 0) {
        await sql`
          INSERT INTO produtos (
            slug, nome, nome_en, categoria, subcategoria, subcategoria_en,
            descricao, descricao_en, descricaoCompleta, descricaoCompleta_en,
            imagem, imagens, especificacoes, beneficios, beneficios_en,
            capacidade, disponivel, destaque, tag, tag_en, manual
          ) VALUES (
            ${p.slug}, ${p.nome}, ${p.nome_en || null}, ${p.categoria}, ${p.subcategoria || null}, ${p.subcategoria_en || null},
            ${p.descricao}, ${p.descricao_en || null}, ${p.descricaoCompleta}, ${p.descricaoCompleta_en || null},
            ${p.imagem}, ${JSON.stringify(p.imagens || [])}, ${JSON.stringify(p.especificacoes || [])}, 
            ${JSON.stringify(p.beneficios || [])}, ${JSON.stringify(p.beneficios_en || [])},
            ${p.capacidade || null}, ${p.disponivel !== undefined ? p.disponivel : true}, 
            ${p.destaque || false}, ${p.tag || null}, ${p.tag_en || null}, ${p.manual || null}
          )
        `;
        console.log(`Produto ${p.nome} inserido.`);
      } else {
        console.log(`Produto ${p.nome} já existe, pulando.`);
      }
    }
    
    console.log("Migração concluída com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela ou migrar dados:", error);
  }
}

main();
