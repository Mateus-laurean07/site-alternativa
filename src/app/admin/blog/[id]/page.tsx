"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, X } from "lucide-react";
import toast from "react-hot-toast";

export default function EditarArtigo({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    resumo: "",
    categoria: "",
    conteudo: "",
    imagem: "",
    tags: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${resolvedParams.id}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
        } else {
          setFormData({
            titulo: data.titulo || "",
            resumo: data.resumo || "",
            categoria: data.categoria || "",
            conteudo: data.conteudo || "",
            imagem: data.imagem || "",
            tags: data.tags || "",
          });
        }
      } catch (e) {
        toast.error("Erro ao carregar dados do artigo.");
      } finally {
        setFetching(false);
      }
    };
    fetchPost();
  }, [resolvedParams.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success("Artigo atualizado com sucesso!");
        router.push("/admin");
      } else {
        toast.error("Erro ao atualizar: " + data.error);
      }
    } catch (error) {
      toast.error("Erro de conexão ao tentar atualizar.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div style={{ textAlign: "center", padding: 64, color: "var(--verde-escuro)" }}>Carregando dados...</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <Link href="/admin" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "white", color: "var(--verde-escuro)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: "1.8rem", color: "var(--verde-escuro)", margin: 0 }}>Editar Artigo</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* Painel Principal */}
        <div style={{ background: "white", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 20 }}>
          
          <div>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--verde-escuro)", marginBottom: 8 }}>
              Título do Artigo *
            </label>
            <input 
              type="text" 
              name="titulo"
              required
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ex: Como escolher o melhor cocho..."
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ced4da", fontSize: "1rem", outline: "none" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--verde-escuro)", marginBottom: 8 }}>
                Categoria *
              </label>
              <input 
                type="text" 
                name="categoria"
                required
                value={formData.categoria}
                onChange={handleChange}
                placeholder="Ex: Manejo, Nutrição, Saúde..."
                style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ced4da", fontSize: "1rem", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--verde-escuro)", marginBottom: 8 }}>
                Tags (separadas por vírgula)
              </label>
              <input 
                type="text" 
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Ex: bovinos, seca, suplementação..."
                style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ced4da", fontSize: "1rem", outline: "none" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--verde-escuro)", marginBottom: 8 }}>
              Resumo (Aparece na listagem do blog) *
            </label>
            <textarea 
              name="resumo"
              required
              value={formData.resumo}
              onChange={handleChange}
              rows={2}
              placeholder="Um breve resumo sobre o artigo..."
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ced4da", fontSize: "1rem", outline: "none", resize: "vertical" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--verde-escuro)", marginBottom: 8 }}>
              Conteúdo Completo *
            </label>
            <textarea 
              name="conteudo"
              required
              value={formData.conteudo}
              onChange={handleChange}
              rows={12}
              placeholder="Escreva o conteúdo do seu artigo aqui..."
              style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ced4da", fontSize: "1rem", outline: "none", resize: "vertical" }}
            />
          </div>

        </div>

        {/* Imagem de Capa */}
        <div style={{ background: "white", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <label style={{ display: "block", fontSize: "1rem", fontWeight: 700, color: "var(--verde-escuro)", marginBottom: 16 }}>
            Imagem de Capa (Upload ou URL)
          </label>
          
          <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--cinza-texto)", marginBottom: 8 }}>
                Fazer upload do seu computador:
              </label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, imagem: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #ced4da", background: "#f8f9fa", cursor: "pointer" }}
              />
            </div>
            
            <div style={{ color: "var(--cinza-texto)", fontWeight: 600 }}>OU</div>
            
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--cinza-texto)", marginBottom: 8 }}>
                Colar uma URL de imagem:
              </label>
              <input 
                type="text" 
                name="imagem"
                value={formData.imagem.startsWith("data:image") ? "" : formData.imagem}
                onChange={handleChange}
                placeholder="https://..."
                style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ced4da", fontSize: "1rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ border: "2px dashed #ced4da", borderRadius: 8, padding: formData.imagem ? "0" : "40px", textAlign: "center", color: "var(--cinza-texto)", background: "#f8f9fa", overflow: "hidden", position: "relative", minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {formData.imagem ? (
              <>
                <img src={formData.imagem} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 400 }} />
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, imagem: "" })}
                  style={{ position: "absolute", top: 16, right: 16, background: "rgba(220, 38, 38, 0.9)", color: "white", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
                  title="Remover Imagem"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <div>
                <ImageIcon size={40} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
                <p style={{ margin: "0 0 8px", fontWeight: 600 }}>Nenhuma imagem selecionada</p>
                <p style={{ margin: 0, fontSize: "0.85rem" }}>Faça upload ou insira uma URL acima.</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16, marginBottom: 40 }}>
          <button type="button" onClick={() => setShowPreview(true)} className="btn-secondary" style={{ background: "#f8f9fa", color: "var(--verde-escuro)", border: "1px solid #ced4da" }}>
            Ver Prévia
          </button>
          <Link href="/admin" className="btn-secondary" style={{ background: "white" }}>
            Cancelar
          </Link>
          <button type="submit" disabled={loading} className="btn-verde" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Save size={20} />
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>

      {/* Modal de Prévia */}
      {showPreview && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 9999, overflowY: "auto", padding: "40px 20px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", background: "white", borderRadius: 16, overflow: "hidden", position: "relative" }}>
            <button 
              onClick={() => setShowPreview(false)}
              style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.5)", color: "white", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}
            >
              <X size={24} />
            </button>
            
            <div style={{ position: "relative", height: 300, background: "#1a3a1f" }}>
              {formData.imagem && <img src={formData.imagem} alt="Capa" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 40, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                <span style={{ background: "var(--ouro)", color: "var(--verde-escuro)", padding: "4px 12px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 700 }}>
                  {formData.categoria || "Categoria"}
                </span>
                <h1 style={{ color: "white", fontSize: "2.2rem", margin: "16px 0 0 0", fontWeight: 800 }}>
                  {formData.titulo || "Título do Artigo"}
                </h1>
              </div>
            </div>
            
            <div style={{ padding: 40 }}>
              <p style={{ fontSize: "1.2rem", color: "var(--verde-medio)", fontStyle: "italic", marginBottom: 32, paddingLeft: 16, borderLeft: "4px solid var(--ouro)" }}>
                {formData.resumo || "Resumo do artigo..."}
              </p>
              
              <div style={{ color: "var(--cinza-texto)", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                {formData.conteudo || "Conteúdo completo aparecerá aqui..."}
              </div>
              
              {formData.tags && (
                <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #eee", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean).map((tag: string) => (
                    <span key={tag} style={{ background: "#f1f3f5", color: "var(--cinza-texto)", padding: "4px 12px", borderRadius: 16, fontSize: "0.85rem" }}>
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
