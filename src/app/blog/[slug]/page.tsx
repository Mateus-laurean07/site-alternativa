import { notFound } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import BlogClient from "./BlogClient";

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const sql = neon(process.env.DATABASE_URL!);
  
  // Busca o artigo pelo slug (apenas se estiver publicado)
  const posts = await sql`SELECT * FROM blog_posts WHERE slug = ${resolvedParams.slug} AND publicado = true`;
  
  if (posts.length === 0) {
    notFound();
  }
  
  const post = posts[0];
  
  // Tratando a propriedade de tags que vem como string do banco para transformar num array
  const formattedPost = {
    ...post,
    tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
    tempoLeitura: post.tempoleitura || 5 // fallback
  };

  // Busca outros artigos publicados para recomendar
  const outros = await sql`SELECT * FROM blog_posts WHERE slug != ${resolvedParams.slug} AND publicado = true ORDER BY data DESC LIMIT 2`;

  return <BlogClient post={formattedPost as any} outros={outros as any} />;
}
