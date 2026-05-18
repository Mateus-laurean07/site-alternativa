-- =====================================================================
-- ATUALIZAÇÕES DOS PRODUTOS - RODAR NO NEON SQL EDITOR
-- Data: 18/05/2026
-- =====================================================================
--
-- INSTRUÇÕES:
-- 1. Acesse https://console.neon.tech/
-- 2. Selecione o projeto "site-alternativa" e database "neondb"
-- 3. Vá em SQL Editor
-- 4. Copie e cole TUDO abaixo
-- 5. Clique em "Run"
--
-- O que esse script faz:
--   1. Atualiza carrossel do Multicocho 200 com 3 fotos reais
--   2. Atualiza carrossel do Multicocho 250 com foto real
--   3. Atualiza imagens da linha Suinocultura (capa + carrossel)
--   4. Insere NOVO produto: Multicocho 200 Pé H
--
-- Obs: as imagens de CAPA do Hero, Protecocho 400/500, Multicocho 200/250
-- e Pé H já foram substituídas no servidor (mesmo path, novo conteúdo).
-- =====================================================================


-- 1) MULTICOCHO 200 - Atualiza carrossel
--    A imagem principal continua /images/produtos/multicocho-200.webp
--    Agora o array imagens recebe 3 fotos reais
UPDATE produtos
SET imagens = '["/images/produtos/multicocho-200/foto-1.webp","/images/produtos/multicocho-200/foto-2.webp","/images/produtos/multicocho-200/foto-3.webp"]'::jsonb
WHERE slug = 'multicocho-200';


-- 2) MULTICOCHO 250 - Atualiza carrossel
--    A imagem principal continua /images/produtos/multicocho-250.webp
UPDATE produtos
SET imagens = '["/images/produtos/multicocho-250/foto-1.webp"]'::jsonb
WHERE slug = 'multicocho-250';


-- 3) SUINOCULTURA - Atualiza imagens com fotos novas
UPDATE produtos
SET imagem = '/images/produtos/suinos/piso-vazado.webp',
    imagens = '[]'::jsonb
WHERE slug = 'piso-vazado';

UPDATE produtos
SET imagem = '/images/produtos/suinos/matriz-20l.webp',
    imagens = '["/images/produtos/suinos/matriz-10l.webp","/images/produtos/suinos/matriz-42l.webp"]'::jsonb
WHERE slug = 'cocho-matriz';

UPDATE produtos
SET imagem = '/images/produtos/suinos/cocho-leitao-17l.webp',
    imagens = '["/images/produtos/suinos/cocho-leitao-5l.webp"]'::jsonb
WHERE slug = 'cocho-leitao';

UPDATE produtos
SET imagem = '/images/produtos/suinos/portao.webp',
    imagens = '[]'::jsonb
WHERE slug = 'portoes';

UPDATE produtos
SET imagem = '/images/produtos/suinos/bandeja.webp',
    imagens = '[]'::jsonb
WHERE slug = 'bandejas';


-- 4) NOVO PRODUTO: Multicocho 200 Pé H
--    Insere apenas se ainda não existir (idempotente)
INSERT INTO produtos (
  slug, nome, nome_en, categoria, descricao, descricao_en,
  descricaoCompleta, descricaoCompleta_en,
  imagem, imagens, capacidade,
  especificacoes, beneficios, beneficios_en,
  disponivel, destaque
)
SELECT
  'multicocho-200-pe-h',
  'Multicocho 200 Pé H',
  'Multicocho 200 H Leg',
  'Multicocho',
  'Cocho de 200L com pé em H, ideal para terrenos irregulares e maior estabilidade.',
  'Trough of 200L with H-shaped legs, ideal for irregular terrain and greater stability.',
  'O Multicocho 200 Pé H foi desenvolvido para oferecer maior estabilidade em terrenos irregulares. O sistema de pé em H distribui melhor o peso e impede o tombamento, mantendo o cocho firme mesmo em pastagens com desnível. Capacidade de 200 litros, fabricado em polipropileno de alta resistência.',
  'The Multicocho 200 H-Leg was designed to provide greater stability on irregular terrain. The H-leg system better distributes weight and prevents tipping, keeping the trough firm even in uneven pastures. 200-liter capacity, manufactured in high-resistance polypropylene.',
  '/images/produtos/multicocho-200-pe-h.webp',
  '["/images/produtos/multicocho-200-pe-h/foto-1.webp","/images/produtos/multicocho-200-pe-h/foto-2.webp","/images/produtos/multicocho-200-pe-h/foto-3.webp"]'::jsonb,
  '200L',
  '[{"chave":"Capacidade","chave_en":"Capacity","valor":"200 litros","valor_en":"200 liters"},{"chave":"Material","chave_en":"Material","valor":"Polipropileno","valor_en":"Polypropylene"},{"chave":"Pé","chave_en":"Leg","valor":"Formato em H","valor_en":"H-shaped"},{"chave":"Uso","chave_en":"Usage","valor":"Bovinos","valor_en":"Cattle"}]'::jsonb,
  '["Maior estabilidade em terreno irregular","Distribuição de peso uniforme","Resistente a tombamento","Fácil manejo e limpeza","Alta durabilidade"]'::jsonb,
  '["Greater stability on irregular terrain","Uniform weight distribution","Tip-resistant","Easy handling and cleaning","High durability"]'::jsonb,
  true,
  false
WHERE NOT EXISTS (SELECT 1 FROM produtos WHERE slug = 'multicocho-200-pe-h');


-- 5) VERIFICAÇÃO - Confirma que tudo rodou certo
SELECT slug, nome, categoria, imagem, jsonb_array_length(imagens) AS qtd_imagens
FROM produtos
WHERE slug IN (
  'multicocho-200', 'multicocho-250', 'multicocho-200-pe-h',
  'piso-vazado', 'cocho-matriz', 'cocho-leitao', 'portoes', 'bandejas'
)
ORDER BY categoria, slug;
