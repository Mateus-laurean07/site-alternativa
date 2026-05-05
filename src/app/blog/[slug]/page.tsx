import { notFound } from "next/navigation";
import { getPostBySlug, blogPosts } from "@/data/blog";
import BlogClient from "./BlogClient";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) notFound();

  const outros = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return <BlogClient post={post} outros={outros} />;
}
