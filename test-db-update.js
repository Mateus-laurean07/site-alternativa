require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function test() {
  const sql = neon(process.env.DATABASE_URL);
  
  const query = `UPDATE produtos SET "disponivel" = false WHERE id = 1 RETURNING *`;
  
  try {
    const result = await sql(query);
    console.log('Result:', result);
  } catch (e) {
    console.error('Error with sql(query):', e);
  }
}
test();
