const fs = require('fs');

// Atualiza produtos.ts
let content = fs.readFileSync('src/data/produtos.ts', 'utf8');
// Substitui referencias de .png por .webp nos campos de imagem dos produtos
content = content.replace(/(imagem:\s*"[^"]*?)\.png"/g, '$1.webp"');
fs.writeFileSync('src/data/produtos.ts', content);
console.log('produtos.ts atualizado!');

// Atualiza blog.ts se existir
if (fs.existsSync('src/data/blog.ts')) {
  let blog = fs.readFileSync('src/data/blog.ts', 'utf8');
  blog = blog.replace(/(imagem:\s*"[^"]*?)\.png"/g, '$1.webp"');
  blog = blog.replace(/(image:\s*"[^"]*?)\.png"/g, '$1.webp"');
  fs.writeFileSync('src/data/blog.ts', blog);
  console.log('blog.ts atualizado!');
}

// Atualiza page.tsx - sobre section
if (fs.existsSync('src/app/sobre/page.tsx')) {
  let sobre = fs.readFileSync('src/app/sobre/page.tsx', 'utf8');
  sobre = sobre.replace(/(\/images\/sobre\/[^"]*?)\.JPG"/g, '$1.webp"');
  sobre = sobre.replace(/(\/images\/sobre\/[^"]*?)\.jpg"/g, '$1.webp"');
  fs.writeFileSync('src/app/sobre/page.tsx', sobre);
  console.log('sobre/page.tsx atualizado!');
}

console.log('Concluido!');
