const sharp = require('sharp');
const fs = require('fs');

const imgs = [
  ['public/images/produtos/autoabastecimento-2.png', 'public/images/produtos/autoabastecimento-2.webp'],
  ['public/images/produtos/creep-2.png', 'public/images/produtos/creep-2.webp'],
  ['public/images/produtos/multicocho-200-2.png', 'public/images/produtos/multicocho-200-2.webp'],
  ['public/images/produtos/confinamento-j-2.png', 'public/images/produtos/confinamento-j-2.webp'],
  ['public/images/produtos/protecocho-250-2.png', 'public/images/produtos/protecocho-250-2.webp']
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
