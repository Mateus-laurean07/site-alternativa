"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, PenTool, BookOpen, ShoppingBag } from "lucide-react";

interface BlogClientProps {
  post: BlogPost;
  outros: BlogPost[];
}

export default function BlogClient({ post, outros }: BlogClientProps) {
  const { language } = useLanguage();

  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ color: "var(--verde-escuro)", fontSize: "1.6rem", marginTop: 40, marginBottom: 16 }}>{line.slice(3)}</h2>;
      if (line.startsWith("- ")) return <li key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginLeft: 20, marginBottom: 6 }}>{line.slice(2)}</li>;
      if (line.match(/^\d+\./)) return <li key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginLeft: 20, marginBottom: 8 }}>{line.replace(/^\d+\. /, "")}</li>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginBottom: 16 }}>{line}</p>;
    });
  };

  return (
    <>
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 80, overflow: "hidden" }}>
        {/* Background Image */}
        <Image 
          src="/images/blog/boi_encarando.png" 
          alt="Boi no pasto" 
          fill 
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 0 }} 
          priority
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(15,26,16,0.95) 0%, rgba(26,58,31,0.85) 100%)", zIndex: 1 }} />
        
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="breadcrumb" style={{ marginBottom: 20 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>{language === "PT" ? "Início" : "Home"}</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.6)" }}>Blog</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ color: "white" }}>{language === "PT" ? post.titulo : post.titulo_en || post.titulo}</span>
          </div>
          <div style={{ maxWidth: 760 }}>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "4px 14px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>{language === "PT" ? post.categoria : post.categoria_en || post.categoria}</span>
            <h1 style={{ color: "white", marginTop: 20, marginBottom: 20 }}>{language === "PT" ? post.titulo : post.titulo_en || post.titulo}</h1>
            <div style={{ display: "flex", gap: 20, color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><PenTool size={16} /> {post.autor}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={16} /> {new Date(post.data).toLocaleDateString(language === "PT" ? "pt-BR" : "en-US", { day: "2-digit", month: "long", year: "numeric" })}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={16} /> {post.tempoLeitura} {language === "PT" ? "min de leitura" : "min read"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 64 }}>
            <article style={{ background: "white", borderRadius: 20, padding: 48, boxShadow: "var(--shadow-md)", border: "1px solid var(--cinza-medio)" }}>
              <div style={{ position: "relative", borderRadius: 16, height: 360, overflow: "hidden", marginBottom: 40 }}>
                <Image 
                  src={post.categoria === "Saúde Animal" ? "/images/blog/boi_olhando.png" : post.categoria === "Nutrição" ? "/images/blog/boi_comendo.png" : "/images/blog/boi_encarando.png"} 
                  alt="Gado" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 66vw"
                  style={{ objectFit: "cover" }} 
                  priority
                />
              </div>
              <div>{renderMarkdown(language === "PT" ? post.conteudo : post.conteudo_en || post.conteudo)}</div>
              <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--cinza-medio)" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--cinza-texto)", fontWeight: 600 }}>Tags:</span>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{ background: "var(--verde-suave)", color: "var(--verde-medio)", padding: "4px 12px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>#{tag}</span>
                  ))}
                </div>
              </div>
            </article>

            <aside style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ background: "var(--verde-suave)", borderRadius: 20, padding: 28 }}>
                <h4 style={{ color: "var(--verde-escuro)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><BookOpen size={20} /> {language === "PT" ? "Outros Artigos" : "Other Articles"}</h4>
                {outros.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} style={{ display: "block", padding: "14px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", textDecoration: "none" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--verde-medio)", fontWeight: 600, marginBottom: 4 }}>{language === "PT" ? p.categoria : p.categoria_en || p.categoria}</div>
                    <div style={{ color: "var(--verde-escuro)", fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.4 }}>{language === "PT" ? p.titulo : p.titulo_en || p.titulo}</div>
                  </Link>
                ))}
              </div>
              <div style={{ background: "var(--gradient-verde)", borderRadius: 20, padding: 28, textAlign: "center" }}>
                <div style={{ color: "white", marginBottom: 12 }}><ShoppingBag size={40} /></div>
                <h4 style={{ color: "white", marginBottom: 12 }}>{language === "PT" ? "Conheça Nossos Produtos" : "Discover Our Products"}</h4>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", marginBottom: 20 }}>{language === "PT" ? "Soluções completas para o manejo do seu rebanho." : "Complete solutions for herd handling."}</p>
                <Link href="/produtos" className="btn-ouro" style={{ display: "inline-flex", fontSize: "0.85rem", padding: "10px 20px" }}>{language === "PT" ? "Ver Produtos" : "View Products"}</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
