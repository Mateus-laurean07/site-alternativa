import { neon } from "@neondatabase/serverless";
const sql = neon("postgresql://neondb_owner:npg_nGA0CKhwvHP9@ep-mute-tree-aqkt5i7y-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

async function run() {
  console.log("Iniciando sincronização com o banco de dados Neon Postgres...");

  // 1. Atualização dos produtos de Suinocultura
  console.log("Atualizando imagens da linha de Suinocultura...");
  await sql`
    UPDATE produtos SET 
      imagem = '/images/produtos/suinos/piso-vazado.webp',
      imagens = '["/images/produtos/suinos/piso-vazado.webp"]'::jsonb
    WHERE slug = 'piso-vazado'
  `;
  await sql`
    UPDATE produtos SET 
      imagem = '/images/produtos/suinos/matriz-20l.webp',
      imagens = '["/images/produtos/suinos/matriz-10l.webp", "/images/produtos/suinos/matriz-20l.webp", "/images/produtos/suinos/matriz-42l.webp"]'::jsonb
    WHERE slug = 'cocho-matriz'
  `;
  await sql`
    UPDATE produtos SET 
      imagem = '/images/produtos/suinos/cocho-leitao-5l.webp',
      imagens = '["/images/produtos/suinos/cocho-leitao-5l.webp", "/images/produtos/suinos/cocho-leitao-17l.webp"]'::jsonb
    WHERE slug = 'cocho-leitao'
  `;
  await sql`
    UPDATE produtos SET 
      imagem = '/images/produtos/portoes-suinos.webp',
      imagens = '["/images/produtos/portoes-suinos.webp", "/images/produtos/portoes_porcos.webp"]'::jsonb
    WHERE slug = 'portoes'
  `;
  await sql`
    UPDATE produtos SET 
      imagem = '/images/produtos/bandejas-suinos.webp',
      imagens = '["/images/produtos/bandejas-suinos.webp", "/images/produtos/bandeja_suinos_porcos.webp"]'::jsonb
    WHERE slug = 'bandejas'
  `;

  // 2. Atualização dos Multicochos 200 e 250 (fotos reais)
  console.log("Atualizando fotos reais dos Multicochos 200 e 250...");
  await sql`
    UPDATE produtos SET 
      imagem = '/images/produtos/multicocho-200/foto-1.webp',
      imagens = '["/images/produtos/multicocho-200/foto-1.webp", "/images/produtos/multicocho-200/foto-2.webp", "/images/produtos/multicocho-200/foto-3.webp"]'::jsonb
    WHERE slug = 'multicocho-200'
  `;
  await sql`
    UPDATE produtos SET 
      imagem = '/images/produtos/multicocho-250/foto-1.webp',
      imagens = '["/images/produtos/multicocho-250/foto-1.webp"]'::jsonb
    WHERE slug = 'multicocho-250'
  `;

  // 3. Unificação de categoria Creep Feeding
  console.log("Garantindo unificação da categoria Creep Feeding sob Protecocho...");
  await sql`
    UPDATE produtos SET categoria = 'Protecocho' WHERE categoria = 'Creep Feeding'
  `;

  // 4. Cadastro do novo produto Multicocho 200 Pé H
  console.log("Cadastrando novo produto Multicocho 200 Pé H...");
  const existePeH = await sql`SELECT id FROM produtos WHERE slug = 'multicocho-200-pe-h'`;
  
  if (existePeH.length === 0) {
    await sql`
      INSERT INTO produtos (
        slug, nome, nome_en, categoria,
        descricao, descricao_en, descricaoCompleta, descricaoCompleta_en,
        imagem, imagens, especificacoes, beneficios, beneficios_en,
        capacidade, disponivel, destaque
      ) VALUES (
        'multicocho-200-pe-h', 'Multicocho 200 Pé H', 'Multicocho 200 H-Leg', 'Multicocho',
        'O clássico Multicocho 200 com estrutura reforçada de Pé H para maior estabilidade e resistência.',
        'The classic Multicocho 200 with reinforced H-Leg structure for greater stability and resistance.',
        'O Multicocho 200 Pé H combina a versatilidade do modelo tradicional de 200 litros com a robustez e estabilidade incomparáveis da estrutura de suporte em H. Ideal para terrenos irregulares e manejo intensivo, garantindo que o cocho permaneça firme e seguro contra impactos dos animais.',
        'The Multicocho 200 H-Leg combines the versatility of the traditional 200-liter model with the unmatched robustness and stability of the H-frame support structure. Ideal for uneven terrain and intensive management, ensuring the trough remains firm and safe against animal impacts.',
        '/images/produtos/multicocho-200-pe-h/foto-1.webp',
        '["/images/produtos/multicocho-200-pe-h/foto-1.webp", "/images/produtos/multicocho-200-pe-h/foto-2.webp", "/images/produtos/multicocho-200-pe-h/foto-3.webp"]'::jsonb,
        '[
          {"chave": "Capacidade", "chave_en": "Capacity", "valor": "200 litros", "valor_en": "200 liters"},
          {"chave": "Comprimento", "chave_en": "Length", "valor": "2,0 metros", "valor_en": "2.0 meters"},
          {"chave": "Material", "chave_en": "Material", "valor": "Polipropileno", "valor_en": "Polypropylene"},
          {"chave": "Estrutura", "chave_en": "Structure", "valor": "Suporte Pé H reforçado", "valor_en": "Reinforced H-Leg support"},
          {"chave": "Uso", "chave_en": "Usage", "valor": "Pasto / Confinamento", "valor_en": "Pasture / Feedlot"}
        ]'::jsonb,
        '["Máxima estabilidade", "Estrutura reforçada Pé H", "Alta durabilidade", "Ideal para terrenos irregulares", "Fácil higienização"]'::jsonb,
        '["Maximum stability", "Reinforced H-Leg structure", "High durability", "Ideal for uneven terrain", "Easy cleaning"]'::jsonb,
        '200L', true, false
      )
    `;
    console.log("Multicocho 200 Pé H cadastrado com sucesso!");
  } else {
    await sql`
      UPDATE produtos SET
        nome = 'Multicocho 200 Pé H',
        nome_en = 'Multicocho 200 H-Leg',
        categoria = 'Multicocho',
        descricao = 'O clássico Multicocho 200 com estrutura reforçada de Pé H para maior estabilidade e resistência.',
        descricao_en = 'The classic Multicocho 200 with reinforced H-Leg structure for greater stability and resistance.',
        descricaoCompleta = 'O Multicocho 200 Pé H combina a versatilidade do modelo tradicional de 200 litros com a robustez e estabilidade incomparáveis da estrutura de suporte em H. Ideal para terrenos irregulares e manejo intensivo, garantindo que o cocho permaneça firme e seguro contra impactos dos animais.',
        descricaoCompleta_en = 'The Multicocho 200 H-Leg combines the versatility of the traditional 200-liter model with the unmatched robustness and stability of the H-frame support structure. Ideal for uneven terrain and intensive management, ensuring the trough remains firm and safe against animal impacts.',
        imagem = '/images/produtos/multicocho-200-pe-h/foto-1.webp',
        imagens = '["/images/produtos/multicocho-200-pe-h/foto-1.webp", "/images/produtos/multicocho-200-pe-h/foto-2.webp", "/images/produtos/multicocho-200-pe-h/foto-3.webp"]'::jsonb,
        especificacoes = '[
          {"chave": "Capacidade", "chave_en": "Capacity", "valor": "200 litros", "valor_en": "200 liters"},
          {"chave": "Comprimento", "chave_en": "Length", "valor": "2,0 metros", "valor_en": "2.0 meters"},
          {"chave": "Material", "chave_en": "Material", "valor": "Polipropileno", "valor_en": "Polypropylene"},
          {"chave": "Estrutura", "chave_en": "Structure", "valor": "Suporte Pé H reforçado", "valor_en": "Reinforced H-Leg support"},
          {"chave": "Uso", "chave_en": "Usage", "valor": "Pasto / Confinamento", "valor_en": "Pasture / Feedlot"}
        ]'::jsonb,
        beneficios = '["Máxima estabilidade", "Estrutura reforçada Pé H", "Alta durabilidade", "Ideal para terrenos irregulares", "Fácil higienização"]'::jsonb,
        beneficios_en = '["Maximum stability", "Reinforced H-Leg structure", "High durability", "Ideal for uneven terrain", "Easy cleaning"]'::jsonb,
        capacidade = '200L',
        disponivel = true,
        destaque = false
      WHERE slug = 'multicocho-200-pe-h'
    `;
    console.log("Multicocho 200 Pé H já existia, atualizado com sucesso!");
  }

  console.log("Sincronização do banco de dados concluída!");
}

run().catch(console.error);
