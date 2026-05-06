const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dirs = [
  'public/images/produtos',
  'public/images/sobre',
  'public/images/blog',
];

async function compressDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fp = path.join(dir, f);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) { await compressDir(fp); continue; }
    if (!/\.(png|jpe?g)$/i.test(f)) continue;
    const sizeMB = stat.size / 1024 / 1024;
    if (sizeMB < 0.5) continue; // pula menores que 500KB
    const out = fp.replace(/\.(png|jpe?g)$/i, '.webp');
    if (fs.existsSync(out)) continue; // já convertido
    try {
      await sharp(fp)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(out);
      const afterKB = Math.round(fs.statSync(out).size / 1024);
      console.log(`✓ ${fp}: ${sizeMB.toFixed(1)}MB -> ${afterKB}KB`);
    } catch (e) {
      console.error(`✗ ${fp}: ${e.message}`);
    }
  }
}

async function main() {
  for (const dir of dirs) {
    await compressDir(dir);
  }
  console.log('\nConcluido!');
}

main().catch(console.error);
