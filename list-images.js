const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('.next')) return;
  let files = [];
  try { files = fs.readdirSync(dir); } catch(e) { return; }
  files.forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = false;
    try { isDirectory = fs.statSync(dirPath).isDirectory(); } catch(e) {}
    if (isDirectory) walkDir(dirPath, callback);
    else callback(dirPath);
  });
}

walkDir('..\\', function(filePath) {
  if (filePath.match(/\.(png|jpg|jpeg|webp)$/i)) {
    if (filePath.toLowerCase().match(/suin|porc|leitao|matriz|bandeja|piso|port|multicocho|confinamento/)) {
      console.log(filePath);
    }
  }
});
