const sharp = require('sharp');
const fs = require('fs');

const imgs = [
  ['public/images/produtos/cocho-matriz.png', 'public/images/produtos/cocho-matriz.webp'],
  ['public/images/produtos/cocho-leitao.png', 'public/images/produtos/cocho-leitao.webp'],
  ['public/images/produtos/bandejas-suinos.png', 'public/images/produtos/bandejas-suinos.webp'],
  ['public/images/produtos/piso-vazado.png', 'public/images/produtos/piso-vazado.webp'],
  ['public/images/produtos/portoes-suinos.png', 'public/images/produtos/portoes-suinos.webp'],
];

async function run() {
  for (const [src, dst] of imgs) {
    if (!fs.existsSync(src)) { console.log('SKIP (not found):', src); continue; }
    await sharp(src).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toFile(dst);
    const kb = Math.round(fs.statSync(dst).size / 1024);
    console.log('OK:', dst, kb + 'KB');
  }
  console.log('Done!');
}
run().catch(console.error);
