"use client";
import { X, PenTool, Calendar, BookOpen, ShoppingBag } from "lucide-react";

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

const renderMarkdown = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## "))
      return <h2 key={i} style={{ color: "var(--verde-escuro)", fontSize: "1.5rem", marginTop: 36, marginBottom: 14, fontWeight: 800 }}>{line.slice(3)}</h2>;
    if (line.startsWith("# "))
      return <h3 key={i} style={{ color: "var(--verde-escuro)", fontSize: "1.2rem", marginTop: 28, marginBottom: 10, fontWeight: 700 }}>{line.slice(2)}</h3>;
    if (line.startsWith("- "))
      return <li key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginLeft: 20, marginBottom: 6 }}>{line.slice(2)}</li>;
    if (line.match(/^\d+\./))
      return <li key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginLeft: 20, marginBottom: 8 }}>{line.replace(/^\d+\. /, "")}</li>;
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginBottom: 16 }}>{line}</p>;
  });
};

export default function BlogPreview({ formData, selectedTags, onClose }: BlogPreviewProps) {
  const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.75)", overflowY: "auto",
        padding: "0",
      }}
      onClick={onClose}
    >
      {/* Barra de aviso de prévia */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#1e293b", color: "white",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px", fontSize: "0.875rem"
      }}>
        <span>👁️ <strong>Modo Prévia</strong> — Veja exatamente como o artigo vai aparecer no blog</span>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.15)", border: "none", color: "white",
            borderRadius: 8, padding: "6px 16px", cursor: "pointer",
            fontWeight: 600, display: "flex", alignItems: "center", gap: 8
          }}
        >
          <X size={16} /> Fechar Prévia
        </button>
      </div>

      <div onClick={(e) => e.stopPropagation()}>

        {/* ===== HERO — igual ao do blog ===== */}
        <section style={{ position: "relative", paddingTop: 100, paddingBottom: 80, overflow: "hidden", background: "#0f1a10" }}>
          {/* Fundo: imagem de capa OU imagem padrão do blog */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: formData.imagem ? `url(${formData.imagem})` : "url(/images/blog/boi_encarando.png)",
            backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(15,26,16,0.95) 0%, rgba(26,58,31,0.85) 100%)"
          }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20, fontSize: "0.85rem" }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Início</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Blog</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
              <span style={{ color: "white" }}>{formData.titulo || "Título do artigo"}</span>
            </div>

            <div style={{ maxWidth: 760 }}>
              <span style={{
                background: "rgba(255,255,255,0.15)", color: "white",
                padding: "4px 14px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600
              }}>
                {formData.categoria || "Categoria"}
              </span>
              <h1 style={{ color: "white", marginTop: 20, marginBottom: 20, fontSize: "2.4rem", fontWeight: 800, lineHeight: 1.2 }}>
                {formData.titulo || "Título do Artigo"}
              </h1>
              <div style={{ display: "flex", gap: 24, color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <PenTool size={15} /> Equipe Alternativa
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Calendar size={15} /> {hoje}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTEÚDO — igual ao do blog ===== */}
        <section style={{ padding: "64px 0", background: "#f9fafb" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, alignItems: "start" }}>

              {/* Artigo principal */}
              <article style={{
                background: "white", borderRadius: 20, padding: 48,
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #e9ecef"
              }}>
                {/* Imagem de capa dentro do artigo */}
                {formData.imagem && (
                  <div style={{ borderRadius: 16, overflow: "hidden", height: 340, marginBottom: 40 }}>
                    <img
                      src={formData.imagem}
                      alt="Capa"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}

                {/* Resumo em destaque */}
                {formData.resumo && (
                  <p style={{
                    fontSize: "1.1rem", color: "var(--cinza-texto)", fontStyle: "italic",
                    lineHeight: 1.7, marginBottom: 32,
                    paddingLeft: 16, borderLeft: "4px solid var(--verde-escuro)"
                  }}>
                    {formData.resumo}
                  </p>
                )}

                {/* Conteúdo renderizado */}
                <div>{renderMarkdown(formData.conteudo || "O conteúdo do artigo aparecerá aqui...")}</div>

                {/* Tags */}
                {selectedTags.length > 0 && (
                  <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #e9ecef" }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "var(--cinza-texto)", fontWeight: 600 }}>Tags:</span>
                      {selectedTags.map((tag) => (
                        <span key={tag} style={{
                          background: "var(--verde-suave, #e8f5e9)", color: "var(--verde-medio, #388e3c)",
                          padding: "4px 12px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Sidebar */}
              <aside style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Outros artigos (simulado) */}
                <div style={{ background: "#f0f7f0", borderRadius: 20, padding: 28 }}>
                  <h4 style={{
                    color: "var(--verde-escuro)", marginBottom: 20,
                    display: "flex", alignItems: "center", gap: 8, fontSize: "1rem", fontWeight: 700
                  }}>
                    <BookOpen size={18} /> Outros Artigos
                  </h4>
                  {["Cuidados com bebedouros no verão", "Como melhorar a produtividade do rebanho"].map((titulo) => (
                    <div key={titulo} style={{ padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      <div style={{ fontSize: "0.72rem", color: "#4caf50", fontWeight: 600, marginBottom: 4 }}>Manejo</div>
                      <div style={{ color: "var(--verde-escuro)", fontWeight: 600, fontSize: "0.88rem", lineHeight: 1.4 }}>{titulo}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Produtos */}
                <div style={{
                  background: "linear-gradient(135deg, #1a3a1f 0%, #2d6a35 100%)",
                  borderRadius: 20, padding: 28, textAlign: "center"
                }}>
                  <div style={{ color: "white", marginBottom: 12 }}><ShoppingBag size={36} /></div>
                  <h4 style={{ color: "white", marginBottom: 10, fontWeight: 700 }}>Conheça Nossos Produtos</h4>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.83rem", marginBottom: 20 }}>
                    Soluções completas para o manejo do seu rebanho.
                  </p>
                  <div style={{
                    display: "inline-block", background: "#d4a017", color: "#1a3a1f",
                    padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: "0.85rem"
                  }}>
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
