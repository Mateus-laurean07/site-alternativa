"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function EditarArtigo({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
            Imagem de Capa (URL por enquanto)
          </label>
          <input 
            type="text" 
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
            placeholder="Ex: /images/blog/foto.jpg ou https://..."
            style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ced4da", fontSize: "1rem", outline: "none", marginBottom: 16 }}
          />
          <div style={{ border: "2px dashed #ced4da", borderRadius: 8, padding: 40, textAlign: "center", color: "var(--cinza-texto)", background: "#f8f9fa" }}>
            <ImageIcon size={40} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
            <p style={{ margin: "0 0 8px", fontWeight: 600 }}>Insira a URL da imagem acima</p>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>Tamanho ideal: 1200x630px.</p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16, marginBottom: 40 }}>
          <Link href="/admin" className="btn-secondary" style={{ background: "white" }}>
            Cancelar
          </Link>
          <button type="submit" disabled={loading} className="btn-verde" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Save size={20} />
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
