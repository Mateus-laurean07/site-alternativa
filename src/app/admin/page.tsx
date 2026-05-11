import { neon } from "@neondatabase/serverless";
import AdminBlogList from "@/components/admin/AdminBlogList";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const sql = neon(process.env.DATABASE_URL!);
  let dbPosts: any[] = [];
  try {
    dbPosts = await sql`SELECT * FROM blog_posts ORDER BY data DESC`;
  } catch (e) {
    console.error("Erro ao carregar posts:", e);
  }

  return (
    <div>
      <AdminBlogList initialPosts={dbPosts} />
    </div>
  );
}
