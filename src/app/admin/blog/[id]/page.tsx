"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, X, Eye } from "lucide-react";
import toast from "react-hot-toast";
import TagSelector from "@/components/admin/TagSelector";

export default function EditarArtigo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    titulo: "",
    resumo: "",
    categoria: "",
    conteudo: "",
    imagem: "",
    tags: "",
  });

  /* ---------- Carregar dados do post ---------- */
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error("Post não encontrado");
        const data = await res.json();
        setFormData({
          titulo: data.titulo ?? "",
          resumo: data.resumo ?? "",
          categoria: data.categoria ?? "",
          conteudo: data.conteudo ?? "",
          imagem: data.imagem ?? "",
        });
        // Carregar tags já salvas como selecionadas
        if (data.tags) {
          const tagsArr = data.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
          setSelectedTags(tagsArr);
        }
      } catch {
        toast.error("Erro ao carregar dados do artigo.");
      } finally {
        setFetching(false);
      }
    };
    fetchPost();
  }, [id]);

  /* ---------- Handlers ---------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData((prev) => ({ ...prev, imagem: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, tags: selectedTags.join(", ") };
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Artigo atualizado com sucesso!");
        router.push("/admin");
      } else {
        toast.error("Erro ao atualizar: " + data.error);
      }
    } catch {
      toast.error("Erro de conexão ao tentar salvar.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Loading ---------- */
  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 16 }}>
        <div style={{
          width: 40, height: 40, border: "4px solid #e9ecef",
          borderTopColor: "var(--verde-escuro)", borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
        <span style={{ color: "var(--cinza-texto)", fontSize: "1rem" }}>Carregando dados do artigo...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ---------- Render ---------- */
  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>

      {/* Cabeçalho */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <Link href="/admin" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 40, height: 40, borderRadius: "50%",
          background: "white", color: "var(--verde-escuro)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", textDecoration: "none"
        }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 style={{ fontSize: "1.7rem", color: "var(--verde-escuro)", margin: 0, fontWeight: 800 }}>
            Editar Artigo
          </h1>
          <p style={{ margin: 0, color: "var(--cinza-texto)", fontSize: "0.9rem" }}>
            Altere os dados e salve para atualizar no site
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Bloco principal */}
        <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Título */}
          <div>
            <label style={labelStyle}>Título do Artigo *</label>
            <input
              type="text" name="titulo" required
              value={formData.titulo} onChange={handleChange}
              placeholder="Ex: Como escolher o melhor cocho..."
              style={inputStyle}
            />
          </div>

          {/* Categoria */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
            <div>
              <label style={labelStyle}>Categoria *</label>
              <input
                type="text" name="categoria" required
                value={formData.categoria} onChange={handleChange}
                placeholder="Ex: Manejo, Nutrição, Saúde..."
                style={inputStyle}
              />
            </div>
          </div>

          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />

          {/* Resumo */}
          <div>
            <label style={labelStyle}>Resumo * <span style={{ fontWeight: 400, fontSize: "0.8rem", color: "#adb5bd" }}>(aparece na listagem do blog)</span></label>
            <textarea
              name="resumo" required rows={2}
              value={formData.resumo} onChange={handleChange}
              placeholder="Um breve resumo sobre o artigo..."
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Conteúdo */}
          <div>
            <label style={labelStyle}>Conteúdo Completo *</label>
            <textarea
              name="conteudo" required rows={14}
              value={formData.conteudo} onChange={handleChange}
              placeholder="Escreva o conteúdo completo do artigo aqui..."
              style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* Imagem de Capa */}
        <div style={{ background: "white", padding: 32, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <label style={{ ...labelStyle, fontSize: "1rem", marginBottom: 20 }}>Imagem de Capa</label>

          <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ ...labelStyle, fontWeight: 500, color: "#6c757d" }}>📁 Upload do computador</label>
              <input
                type="file" accept="image/*"
                onChange={handleFileChange}
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa", cursor: "pointer" }}
              />
            </div>
            <div style={{ color: "#adb5bd", fontWeight: 700, paddingBottom: 10 }}>ou</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ ...labelStyle, fontWeight: 500, color: "#6c757d" }}>🔗 URL da imagem</label>
              <input
                type="text" name="imagem"
                value={formData.imagem.startsWith("data:image") ? "" : formData.imagem}
                onChange={handleChange}
                placeholder="https://..."
                style={inputStyle}
              />
            </div>
          </div>

          {/* Preview da imagem */}
          <div style={{
            border: "2px dashed #dee2e6", borderRadius: 12,
            minHeight: 200, overflow: "hidden", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#f8f9fa"
          }}>
            {formData.imagem ? (
              <>
                <img src={formData.imagem} alt="Preview" style={{ width: "100%", maxHeight: 360, objectFit: "contain" }} />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, imagem: "" }))}
                  title="Remover imagem"
                  style={{
                    position: "absolute", top: 12, right: 12,
                    background: "rgba(220,38,38,0.9)", color: "white",
                    border: "none", borderRadius: "50%", width: 36, height: 36,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
                  }}
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", color: "#adb5bd", padding: 40 }}>
                <ImageIcon size={40} style={{ marginBottom: 12, opacity: 0.5 }} />
                <p style={{ margin: 0, fontWeight: 600 }}>Nenhuma imagem selecionada</p>
                <p style={{ margin: "4px 0 0", fontSize: "0.82rem" }}>Faça upload ou cole uma URL acima</p>
              </div>
            )}
          </div>
        </div>

        {/* Botões de ação */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 48 }}>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "12px 24px",
              borderRadius: 8, border: "1px solid #dee2e6", background: "white",
              color: "var(--verde-escuro)", fontWeight: 600, cursor: "pointer"
            }}
          >
            <Eye size={18} /> Ver Prévia
          </button>
          <Link href="/admin" style={{
            display: "flex", alignItems: "center", padding: "12px 24px",
            borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa",
            color: "#495057", fontWeight: 600, textDecoration: "none"
          }}>
            Cancelar
          </Link>
          <button type="submit" disabled={loading} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "12px 28px",
            borderRadius: 8, border: "none",
            background: loading ? "#94a3b8" : "var(--verde-escuro)",
            color: "white", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            fontSize: "0.95rem"
          }}>
            <Save size={18} />
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>

      {/* Modal de Prévia */}
      {showPreview && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
            zIndex: 9999, overflowY: "auto", padding: "40px 16px"
          }}
          onClick={() => setShowPreview(false)}
        >
          <div
            style={{ maxWidth: 860, margin: "0 auto", background: "white", borderRadius: 20, overflow: "hidden", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPreview(false)}
              style={{
                position: "absolute", top: 16, right: 16, zIndex: 10,
                background: "rgba(0,0,0,0.55)", color: "white", border: "none",
                borderRadius: "50%", width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
              }}
            >
              <X size={22} />
            </button>

            {/* Hero do artigo */}
            <div style={{ position: "relative", height: 320, background: "#0f1a10" }}>
              {formData.imagem && (
                <img src={formData.imagem} alt="Capa" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
              )}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
              }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 40px" }}>
                <span style={{
                  background: "rgba(255,255,255,0.18)", color: "white",
                  padding: "4px 14px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600
                }}>
                  {formData.categoria || "Categoria"}
                </span>
                <h1 style={{ color: "white", fontSize: "2rem", margin: "14px 0 0", fontWeight: 800, lineHeight: 1.3 }}>
                  {formData.titulo || "Título do artigo"}
                </h1>
              </div>
            </div>

            {/* Corpo do artigo */}
            <div style={{ padding: "40px 48px" }}>
              {/* Resumo destacado */}
              {formData.resumo && (
                <p style={{
                  fontSize: "1.15rem", color: "#495057", fontStyle: "italic",
                  lineHeight: 1.7, marginBottom: 32,
                  paddingLeft: 20, borderLeft: "4px solid var(--verde-escuro)"
                }}>
                  {formData.resumo}
                </p>
              )}

              {/* Conteúdo */}
              <div style={{ color: "#333", lineHeight: 1.9, fontSize: "1rem" }}>
                {(formData.conteudo || "Conteúdo aparecerá aqui...").split("\n").map((line, i) => {
                  if (line.startsWith("## ")) return <h2 key={i} style={{ color: "var(--verde-escuro)", fontSize: "1.4rem", margin: "32px 0 16px" }}>{line.slice(3)}</h2>;
                  if (line.startsWith("# ")) return <h3 key={i} style={{ color: "var(--verde-escuro)", fontSize: "1.2rem", margin: "28px 0 12px" }}>{line.slice(2)}</h3>;
                  if (line.startsWith("- ")) return <li key={i} style={{ marginBottom: 6, marginLeft: 20 }}>{line.slice(2)}</li>;
                  if (line.trim() === "") return <br key={i} />;
                  return <p key={i} style={{ marginBottom: 16 }}>{line}</p>;
                })}
              </div>

              {selectedTags.length > 0 && (
                <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #f1f3f5", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {selectedTags.map((tag) => (
                    <span key={tag} style={{
                      background: "#e8f5e9", color: "var(--verde-escuro)",
                      padding: "4px 12px", borderRadius: 16, fontSize: "0.82rem", fontWeight: 600
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Estilos reutilizáveis ---------- */
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.875rem", fontWeight: 600,
  color: "var(--verde-escuro)", marginBottom: 8
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px", borderRadius: 8,
  border: "1px solid #dee2e6", fontSize: "0.95rem",
  outline: "none", boxSizing: "border-box",
  background: "white", color: "#212529"
};
