import { neon } from "@neondatabase/serverless";
import AdminBlogList from "@/components/admin/AdminBlogList";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let dbPosts: any[] = [];
  try {
    const sql = neon(process.env.DATABASE_URL!);
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
