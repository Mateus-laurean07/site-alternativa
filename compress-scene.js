const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcBase = '../Linha de Produtos/Bovinos';
const destBase = 'public/images/produtos';

const imagesToProcess = [
  { src: 'Nutrisilo/Nutrisilo com Milho.png', dest: 'nutrisilo-milho.webp' },
  { src: 'Nutrisilo/Nutrisilo com sacas.png', dest: 'nutrisilo-sacas.webp' },
  { src: 'Hidramax/2 bois no hidramax.png', dest: 'hidramax-bois.webp' },
  { src: 'Hidramax/Hidramax na seca.png', dest: 'hidramax-seca.webp' },
  { src: 'Protecocho/Protecocho 200 com bois ao redor.png', dest: 'protecocho-200-bois.webp' },
  { src: 'Protecocho/Protecocho 250 com vários bois.png', dest: 'protecocho-250-bois.webp' },
  { src: 'Protecocho/Protecocho 250 no sol.png', dest: 'protecocho-250-sol.webp' },
  { src: 'Protecocho/Protecocho 400.png', dest: 'protecocho-400-campo.webp' },
  { src: 'Protecocho/Protecocho 500 com Bois.png', dest: 'protecocho-500-bois.webp' },
  { src: 'Protecocho/Linha de Autos na floresta.png', dest: 'autoabastecimento-floresta.webp' },
  { src: 'Protecocho/bezerros no creep.png', dest: 'creep-bezerros.webp' }
];

async function run() {
  for (const item of imagesToProcess) {
    const srcPath = path.join(srcBase, item.src);
    const destPath = path.join(destBase, item.dest);
    
    if (!fs.existsSync(srcPath)) {
      console.log('SKIP (not found):', srcPath);
      continue;
    }
    
    try {
      await sharp(srcPath)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(destPath);
      
      const kb = Math.round(fs.statSync(destPath).size / 1024);
      console.log('OK:', destPath, kb + 'KB');
    } catch (e) {
      console.log('ERROR:', srcPath, e.message);
    }
  }
  console.log('Done!');
}

run().catch(console.error);
