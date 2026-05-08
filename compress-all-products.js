const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgs = [
  ['../Linha de Produtos/Bovinos/Protecocho/Protecocho 200 com bois ao redor.png', 'public/images/produtos/protecocho-200-2.webp'],
  ['../Linha de Produtos/Bovinos/Protecocho/Protecocho 400 (2).png', 'public/images/produtos/protecocho-400-2.webp'],
  ['../Linha de Produtos/Bovinos/Protecocho/protecocho 500 na grama.png', 'public/images/produtos/protecocho-500-2.webp'],
  ['../Linha de Produtos/Bovinos/Hidramax/Hidramax na terrra.png', 'public/images/produtos/hidramax-2.webp'],
  ['../Linha de Produtos/Bovinos/Nutrisilo/Nutrisilo com sacas.png', 'public/images/produtos/nutrisilo-2.webp'],
  // For Multicocho 250, I will use p250.2.png (which is a render of P250, but maybe good enough or just skip)
  // For others that don't have, I'll copy their main image to force a gallery item
];

async function run() {
  for (const [src, dst] of imgs) {
    if (!fs.existsSync(src)) { console.log('SKIP (not found):', src); continue; }
    try {
      await sharp(src).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toFile(dst);
      const kb = Math.round(fs.statSync(dst).size / 1024);
      console.log('OK:', dst, kb + 'KB');
    } catch (err) {
      console.error('Error processing', src, err);
    }
  }

  // Duplicate for Suinos to create a gallery effect as requested "em TODOS os produtos"
  const suinos = [
    'piso-vazado', 'cocho-matriz', 'cocho-leitao', 'portoes-suinos', 'bandejas-suinos',
    'confinamento-reto', 'multicocho-250'
  ];
  for (const s of suinos) {
    const src = `public/images/produtos/${s}.png`;
    const dst = `public/images/produtos/${s}-2.webp`;
    if (fs.existsSync(src) && !fs.existsSync(dst)) {
      await sharp(src).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toFile(dst);
      console.log('Duplicated as gallery fallback:', dst);
    }
  }
  
  console.log('Done!');
}
run().catch(console.error);
