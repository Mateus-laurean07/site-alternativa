"use client";
import { X, PenTool, Calendar, BookOpen, ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface BlogPreviewProps {
  formData: {
    titulo: string;
    resumo: string;
    categoria: string;
    conteudo: string;
    imagem: string;
  };
  selectedTags: string[];
  onClose: () => void;
}

// Markdown rendering foi removido pois agora usamos Rich Text Editor (HTML)

function PreviewContent({ formData, selectedTags, onClose }: BlogPreviewProps) {
  const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    /* Um único div: é o overlay E o scroll */
    <div
      data-lenis-prevent="true"
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(0,0,0,0.75)",
        overflowY: "auto",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Barra sticky "Modo Prévia" */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#1e293b", color: "white",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px", fontSize: "0.875rem",
      }}>
        <span>👁️ <strong>Modo Prévia</strong> — Veja como o artigo vai aparecer no blog</span>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.15)", border: "none", color: "white",
            borderRadius: 8, padding: "6px 16px", cursor: "pointer",
            fontWeight: 600, display: "flex", alignItems: "center", gap: 8,
          }}
        >
          <X size={16} /> Fechar Prévia
        </button>
      </div>

      {/* Conteúdo do artigo */}
      <div>
        {/* HERO */}
        <section style={{ position: "relative", paddingTop: 100, paddingBottom: 80, background: "#0f1a10" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: formData.imagem ? `url(${formData.imagem})` : "url(/images/blog/boi_encarando.png)",
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(15,26,16,0.95) 0%, rgba(26,58,31,0.85) 100%)",
          }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20, fontSize: "0.85rem" }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Início</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Blog</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
              <span style={{ color: "white" }}>{formData.titulo || "Título do artigo"}</span>
            </div>
            <div style={{ maxWidth: 760 }}>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "4px 14px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>
                {formData.categoria || "Categoria"}
              </span>
              <h1 style={{ color: "white", marginTop: 20, marginBottom: 20, fontSize: "2.4rem", fontWeight: 800, lineHeight: 1.2 }}>
                {formData.titulo || "Título do Artigo"}
              </h1>
              <div style={{ display: "flex", gap: 24, color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><PenTool size={15} /> Equipe Alternativa</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={15} /> {hoje}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO */}
        <section style={{ padding: "64px 0", background: "#f9fafb" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, alignItems: "start" }}>
              <article style={{ background: "white", borderRadius: 20, padding: 48, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #e9ecef" }}>
                {formData.imagem && (
                  <div style={{ borderRadius: 16, overflow: "hidden", height: 340, marginBottom: 40 }}>
                    <img src={formData.imagem} alt="Capa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                {formData.resumo && (
                  <p style={{ fontSize: "1.1rem", color: "var(--cinza-texto)", fontStyle: "italic", lineHeight: 1.7, marginBottom: 32, paddingLeft: 16, borderLeft: "4px solid var(--verde-escuro)" }}>
                    {formData.resumo}
                  </p>
                )}
                <div 
                  className="rich-content"
                  dangerouslySetInnerHTML={{ __html: formData.conteudo || "O conteúdo do artigo aparecerá aqui..." }}
                />
                <style jsx global>{`
                  .rich-content h1, .rich-content h2, .rich-content h3 {
                    color: var(--verde-escuro);
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                  }
                  .rich-content p {
                    color: var(--cinza-texto);
                    line-height: 1.8;
                    margin-bottom: 1rem;
                  }
                  .rich-content ul, .rich-content ol {
                    color: var(--cinza-texto);
                    line-height: 1.8;
                    margin-bottom: 1rem;
                    padding-left: 2rem;
                  }
                  .rich-content a {
                    color: var(--verde-medio);
                    text-decoration: underline;
                  }
                `}</style>
                {selectedTags.length > 0 && (
                  <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #e9ecef" }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "var(--cinza-texto)", fontWeight: 600 }}>Tags:</span>
                      {selectedTags.map((tag) => (
                        <span key={tag} style={{ background: "#e8f5e9", color: "#388e3c", padding: "4px 12px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              <aside style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ background: "#f0f7f0", borderRadius: 20, padding: 28 }}>
                  <h4 style={{ color: "var(--verde-escuro)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontSize: "1rem", fontWeight: 700 }}>
                    <BookOpen size={18} /> Outros Artigos
                  </h4>
                  {["Cuidados com bebedouros no verão", "Como melhorar a produtividade do rebanho"].map((titulo) => (
                    <div key={titulo} style={{ padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      <div style={{ fontSize: "0.72rem", color: "#4caf50", fontWeight: 600, marginBottom: 4 }}>Manejo</div>
                      <div style={{ color: "var(--verde-escuro)", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.4 }}>{titulo}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "linear-gradient(135deg, #1a3a1f 0%, #2d6a35 100%)", borderRadius: 20, padding: 28, textAlign: "center" }}>
                  <div style={{ color: "white", marginBottom: 12 }}><ShoppingBag size={36} /></div>
                  <h4 style={{ color: "white", marginBottom: 10, fontWeight: 700 }}>Conheça Nossos Produtos</h4>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.83rem", marginBottom: 20 }}>
                    Soluções completas para o manejo do seu rebanho.
                  </p>
                  <div style={{ display: "inline-block", background: "#d4a017", color: "#1a3a1f", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: "0.85rem" }}>
                    Ver Produtos
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function BlogPreview(props: BlogPreviewProps) {
  const mounted = useRef(false);
  // Garante que o portal só roda no browser
  if (typeof window === "undefined") return null;
  return createPortal(<PreviewContent {...props} />, document.body);
}
