import { neon } from "@neondatabase/serverless";
import AdminVideosList from "@/components/admin/AdminVideosList";

export const dynamic = 'force-dynamic';

async function getVideos() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const videos = await sql`SELECT * FROM videos ORDER BY ordem ASC, id DESC`;
    return videos;
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return [];
  }
}

export default async function AdminVideosPage() {
  const videos = await getVideos();

  return (
    <div>
      <AdminVideosList initialVideos={videos as any[]} />
    </div>
  );
}
