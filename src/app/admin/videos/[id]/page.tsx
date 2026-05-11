import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import VideoForm from "@/components/admin/VideoForm";

export const dynamic = 'force-dynamic';

async function getVideo(id: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const video = await sql`SELECT * FROM videos WHERE id = ${id}`;
    return video[0] || null;
  } catch (error) {
    console.error("Erro ao buscar vídeo:", error);
    return null;
  }
}

export default async function EditarVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const video = await getVideo(resolvedParams.id);

  if (!video) {
    notFound();
  }

  return (
    <div>
      <VideoForm initialData={video as any} isEdit={true} />
    </div>
  );
}
