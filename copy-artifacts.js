const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artifactsDir = 'C:\\Users\\mateu\\.gemini\\antigravity\\brain\\5cce7a68-7524-4d34-b36d-e8576cb3ab53';
const destBase = 'public/images/produtos';

const files = fs.readdirSync(artifactsDir).filter(f => f.endsWith('.png') && !f.includes('screenshot'));

async function run() {
  for (const f of files) {
    const srcPath = path.join(artifactsDir, f);
    // remove the timestamp _1778240273255
    const cleanName = f.replace(/_\d+\.png$/, '') + '.webp';
    const destPath = path.join(destBase, cleanName);
    
    await sharp(srcPath)
      .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destPath);
      
    console.log('Processed:', destPath);
  }
}

run().catch(console.error);
