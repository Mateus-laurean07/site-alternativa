"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts } from "@/data/blog";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogPage() {
  const { language } = useLanguage();
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) return <h4 key={i} style={{ color: "var(--verde-escuro)", fontFamily: "Playfair Display, serif", fontSize: "1.2rem", marginTop: 24, marginBottom: 12 }}>{line.slice(3)}</h4>;
      if (line.startsWith("- ")) return <li key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginLeft: 20, marginBottom: 6 }}>{line.slice(2)}</li>;
      if (line.match(/^\d+\./)) return <li key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginLeft: 20, marginBottom: 8 }}>{line.replace(/^\d+\. /, "")}</li>;
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginBottom: 16 }}>{line}</p>;
    });
  };

  const categoriesMap: { [key: string]: string } = {
    "Saúde Animal": "Animal Health",
    "Nutrição": "Nutrition",
    "Manejo": "Handling",
    "Tecnologia": "Technology",
    "Mercado": "Market"
  };

  return (
    <>
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 72, overflow: "hidden" }}>
        {/* Background Image */}
        <Image 
          src="/images/blog/boi_encarando.png" 
          alt="Boi encarando" 
          fill 
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 0 }} 
          priority
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(15,26,16,0.95) 0%, rgba(26,58,31,0.85) 100%)", zIndex: 1 }} />
        
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="breadcrumb" style={{ marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>{language === "PT" ? "Início" : "Home"}</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ color: "white" }}>Blog</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: "white", marginBottom: 16 }}
          >
            {language === "PT" ? "Blog Agro" : "Agro Blog"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.8)", maxWidth: 520 }}
          >
            {language === "PT" ? "Conteúdo especializado sobre pecuária, nutrição animal, manejo e tecnologia no campo." : "Specialized content on livestock, animal nutrition, handling, and technology in the field."}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48 }}>
            {/* Posts */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {blogPosts.map((post, i) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="blog-card" style={{ display: "flex", gap: 0, flexDirection: "column", overflow: "hidden", background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--cinza-medio)" }}>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                      <div className="blog-card-image" style={{ height: 240, position: "relative" }}>
                        <Image 
                          src={i % 3 === 0 ? "/images/blog/boi_encarando.png" : i % 3 === 1 ? "/images/blog/boi_comendo.png" : "/images/blog/boi_olhando.png"} 
                          alt="Boi" 
                          fill 
                          sizes="(max-width: 768px) 100vw, 66vw"
                          style={{ objectFit: "cover" }} 
                        />
                      </div>
                    </Link>
                    <div style={{ padding: 32 }}>
                      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                        <span style={{ background: "var(--verde-suave)", color: "var(--verde-medio)", padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>{language === "PT" ? post.categoria : post.categoria_en || post.categoria}</span>
                        <span style={{ color: "var(--cinza-texto)", fontSize: "0.8rem" }}>{post.tempoLeitura} {language === "PT" ? "min de leitura" : "min read"}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                        <h2 style={{ color: "var(--verde-escuro)", fontFamily: "Playfair Display, serif", fontSize: "1.5rem", marginBottom: 12 }}>{language === "PT" ? post.titulo : post.titulo_en || post.titulo}</h2>
                      </Link>
                      <p style={{ color: "var(--cinza-texto)", lineHeight: 1.7, marginBottom: 20 }}>{language === "PT" ? post.resumo : post.resumo_en || post.resumo}</p>
                      
                      <AnimatePresence>
                        {expandedPosts[post.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: "hidden", marginBottom: 20, borderTop: "1px solid var(--cinza-medio)", paddingTop: 20 }}
                          >
                            {renderMarkdown(language === "PT" ? post.conteudo : post.conteudo_en || post.conteudo)}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: expandedPosts[post.id] ? "none" : "1px solid var(--cinza-medio)", paddingTop: expandedPosts[post.id] ? 0 : 20, marginTop: expandedPosts[post.id] ? 0 : 20 }}>
                        <div style={{ fontSize: "0.85rem", color: "var(--cinza-texto)" }}>
                          {language === "PT" ? "por" : "by"} <strong>{post.autor}</strong> • {new Date(post.data).toLocaleDateString(language === "PT" ? "pt-BR" : "en-US", { day: "2-digit", month: "long", year: "numeric" })}
                        </div>
                        <button 
                          onClick={(e) => toggleExpand(post.id, e)}
                          style={{ background: "none", border: "none", color: "var(--verde-medio)", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                        >
                          {expandedPosts[post.id] ? (language === "PT" ? "Ver menos ↑" : "See less ↑") : (language === "PT" ? "Ler mais ↓" : "Read more ↓")}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: "flex", flexDirection: "column", gap: 24 }}
            >
              <div style={{ background: "var(--verde-suave)", borderRadius: 20, padding: 28 }}>
                <h4 style={{ color: "var(--verde-escuro)", marginBottom: 20 }}>🏷️ {language === "PT" ? "Categorias" : "Categories"}</h4>
                {["Saúde Animal", "Nutrição", "Manejo", "Tecnologia", "Mercado"].map((cat) => (
                  <div key={cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.06)", color: "var(--verde-escuro)", fontSize: "0.9rem" }}>
                    {language === "PT" ? cat : categoriesMap[cat] || cat}
                    <span style={{ background: "var(--verde-medio)", color: "white", padding: "2px 8px", borderRadius: 10, fontSize: "0.7rem", fontWeight: 700 }}>
                      {Math.floor(Math.random() * 5) + 1}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--gradient-verde)", borderRadius: 20, padding: 28, textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>💬</div>
                <h4 style={{ color: "white", marginBottom: 12 }}>{language === "PT" ? "Precisa de Ajuda?" : "Need Help?"}</h4>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", marginBottom: 20 }}>{language === "PT" ? "Fale com nosso especialista via WhatsApp." : "Talk to our specialist via WhatsApp."}</p>
                <a href="https://wa.me/5565999902024" target="_blank" rel="noreferrer" className="btn-whatsapp" style={{ fontSize: "0.85rem", padding: "12px 20px", justifyContent: "center", display: "inline-flex" }}>
                  {language === "PT" ? "Chamar Agora" : "Call Now"}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.section-padding .container > div {grid-template-columns:1fr!important;}}`}</style>
      </section>
    </>
  );
}
