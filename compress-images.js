const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dir = 'public/images/hero';
const imgs = ['hero-1.png', 'hero-2.png', 'hero-3.png'];

async function compress() {
  for (const f of imgs) {
    const fp = path.join(dir, f);
    const out = path.join(dir, f.replace('.png', '.webp'));
    const before = fs.statSync(fp).size;
    await sharp(fp)
      .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    const after = fs.statSync(out).size;
    console.log(`${f}: ${(before/1024/1024).toFixed(1)}MB -> ${Math.round(after/1024)} KB (WebP)`);
  }
  console.log('Concluido!');
}

compress().catch(console.error);
