import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);
sql`ALTER TABLE blog_posts ADD COLUMN publicado BOOLEAN DEFAULT true`
  .then(() => console.log('Coluna adicionada'))
  .catch(e => console.error(e));
