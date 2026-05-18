import { neon } from "@neondatabase/serverless";
const sql = neon("postgresql://neondb_owner:npg_nGA0CKhwvHP9@ep-mute-tree-aqkt5i7y-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

// Primeiro: vê quais produtos estão como "Creep Feeding"
const rows = await sql`SELECT id, slug, nome, categoria FROM produtos WHERE categoria = 'Creep Feeding' ORDER BY id`;
console.log("Produtos atualmente em 'Creep Feeding':");
console.log(JSON.stringify(rows, null, 2));
console.log(`\nTotal: ${rows.length}`);
