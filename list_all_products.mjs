import { neon } from "@neondatabase/serverless";
const sql = neon("postgresql://neondb_owner:npg_nGA0CKhwvHP9@ep-mute-tree-aqkt5i7y-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

const rows = await sql`SELECT id, slug, nome, categoria FROM produtos ORDER BY categoria, nome`;
console.log("Todos os produtos cadastrados:");
console.log(JSON.stringify(rows, null, 2));
