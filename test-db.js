require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function test() {
  const sql = neon(process.env.DATABASE_URL);
  const res = await sql`SELECT id, nome, disponivel FROM produtos ORDER BY id ASC LIMIT 5`;
  console.log('Produtos:', res);
  
  const res2 = await sql`SELECT id, titulo, publicado FROM videos ORDER BY id ASC LIMIT 5`;
  console.log('Videos:', res2);
}
test();
