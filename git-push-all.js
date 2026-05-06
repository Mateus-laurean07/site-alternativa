const { execSync } = require('child_process');

try {
  execSync('git add -A', { stdio: 'inherit' });
  execSync('git commit -m "perf: otimizacao de performance, cotacoes e melhorias de UI"', { stdio: 'inherit' });
  console.log('Commit realizado!');

  console.log('\nEnviando para origin (Mateus-laurean07)...');
  execSync('git push origin master', { stdio: 'inherit' });
  console.log('origin OK!');

  console.log('\nEnviando para tebaldi (tebaldi-code)...');
  execSync('git push tebaldi master', { stdio: 'inherit' });
  console.log('tebaldi OK!');

  console.log('\nTudo enviado com sucesso!');
} catch (e) {
  console.error('Erro:', e.message);
}
