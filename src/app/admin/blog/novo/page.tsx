"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, X, Eye } from "lucide-react";
import toast from "react-hot-toast";
import TagSelector from "@/components/admin/TagSelector";
import CategorySelector from "@/components/admin/CategorySelector";
import BlogPreview from "@/components/admin/BlogPreview";
import RichEditor from "@/components/admin/RichEditor";

export default function NovoArtigo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    titulo: "",
    resumo: "",
    categoria: "",
    conteudo: "",
    imagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, tags: selectedTags.join(", ") };
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Artigo salvo com sucesso!");
        router.push("/admin");
      } else {
        toast.error("Erro ao salvar: " + data.error);
      }
    } catch {
      toast.error("Erro de conexão ao tentar salvar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <Link href="/admin" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "white", color: "var(--verde-escuro)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: "1.8rem", color: "var(--verde-escuro)", margin: 0 }}>Escrever Novo Artigo</h1>
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

          <CategorySelector 
            selectedCategory={formData.categoria} 
            onChange={(val) => setFormData({ ...formData, categoria: val })} 
          />

          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />

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
            <RichEditor 
              value={formData.conteudo}
              onChange={(val) => setFormData({ ...formData, conteudo: val })}
              placeholder="Escreva o conteúdo do seu artigo aqui..."
            />
          </div>

        </div>

        {/* Imagem de Capa */}
        <div style={{ background: "white", padding: 32, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <label style={{ display: "block", fontSize: "1rem", fontWeight: 700, color: "var(--verde-escuro)", marginBottom: 16 }}>
            Imagem de Capa (Upload)
          </label>
          
          <div style={{ marginBottom: 16 }}>
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
            {loading ? "Salvando..." : "Salvar Artigo"}
          </button>
        </div>
      </form>

      {showPreview && (
        <BlogPreview
          formData={formData}
          selectedTags={selectedTags}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
