"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface ProdutoFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ProdutoForm({ initialData, isEdit = false }: ProdutoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: initialData?.nome || "",
    nome_en: initialData?.nome_en || "",
    slug: initialData?.slug || "",
    categoria: initialData?.categoria || "Protecocho",
    subcategoria: initialData?.subcategoria || "",
    subcategoria_en: initialData?.subcategoria_en || "",
    descricao: initialData?.descricao || "",
    descricao_en: initialData?.descricao_en || "",
    descricaoCompleta: initialData?.descricaoCompleta || "",
    descricaoCompleta_en: initialData?.descricaoCompleta_en || "",
    imagem: initialData?.imagem || "",
    capacidade: initialData?.capacidade || "",
    tag: initialData?.tag || "",
    tag_en: initialData?.tag_en || "",
    manual: initialData?.manual || "",
    disponivel: initialData?.disponivel !== false,
    destaque: initialData?.destaque || false,
  });

  const [imagens, setImagens] = useState<string[]>(initialData?.imagens || []);
  const [beneficios, setBeneficios] = useState<string[]>(initialData?.beneficios || []);
  const [especificacoes, setEspecificacoes] = useState<{chave: string, valor: string}[]>(initialData?.especificacoes || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSlugify = () => {
    const newSlug = formData.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setFormData(prev => ({ ...prev, slug: newSlug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        imagens,
        beneficios,
        especificacoes,
      };

      const url = isEdit ? `/api/produtos/${initialData.id}` : `/api/produtos`;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!data.error) {
        toast.success(isEdit ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!");
        router.push("/admin/produtos");
        router.refresh();
      } else {
        toast.error("Erro: " + data.error);
      }
    } catch (err) {
      toast.error("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/admin/produtos" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "white", color: "var(--cinza-texto)", border: "1px solid #e9ecef" }}>
            <ArrowLeft size={20} />
          </Link>
          <h1 style={{ fontSize: "1.8rem", color: "var(--verde-escuro)", margin: 0, fontWeight: 800 }}>
            {isEdit ? "Editar Produto" : "Novo Produto"}
          </h1>
        </div>
        <button onClick={handleSubmit} disabled={loading} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 8, background: "var(--verde-escuro)", color: "white", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
          <Save size={20} />
          {loading ? "Salvando..." : "Salvar Produto"}
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 32 }}>
        
        {/* Info Principal */}
        <div style={{ background: "white", padding: 32, borderRadius: 16, border: "1px solid #e9ecef" }}>
          <h3 style={{ margin: "0 0 24px 0", color: "var(--verde-escuro)", fontSize: "1.1rem" }}>Informações Básicas</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Nome do Produto *</label>
              <input required name="nome" value={formData.nome} onChange={handleChange} onBlur={handleSlugify} placeholder="Ex: Protecocho 200" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa", fontSize: "0.95rem" }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Slug (URL) *</label>
              <input required name="slug" value={formData.slug} onChange={handleChange} placeholder="ex: protecocho-200" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa", fontSize: "0.95rem" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Categoria *</label>
              <select required name="categoria" value={formData.categoria} onChange={handleChange} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa", fontSize: "0.95rem" }}>
                <option value="Protecocho">Protecocho</option>
                <option value="Hidramax">Hidramax</option>
                <option value="Multicocho">Multicocho</option>
                <option value="Nutrisilo">Nutrisilo</option>
                <option value="Creep Feeding">Creep Feeding</option>
                <option value="Suínos">Suínos</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Capacidade</label>
              <input name="capacidade" value={formData.capacidade} onChange={handleChange} placeholder="Ex: 200L" style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa", fontSize: "0.95rem" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Resumo (Curto) *</label>
              <textarea required name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Resumo para o card..." rows={3} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa", fontSize: "0.95rem", resize: "vertical" }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Descrição Completa *</label>
              <textarea required name="descricaoCompleta" value={formData.descricaoCompleta} onChange={handleChange} placeholder="Descrição detalhada..." rows={3} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa", fontSize: "0.95rem", resize: "vertical" }} />
            </div>
          </div>
        </div>

        {/* Imagens */}
        <div style={{ background: "white", padding: 32, borderRadius: 16, border: "1px solid #e9ecef" }}>
          <h3 style={{ margin: "0 0 24px 0", color: "var(--verde-escuro)", fontSize: "1.1rem" }}>Imagens e Mídia</h3>
          
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Imagem Principal (URL) *</label>
            <input required name="imagem" value={formData.imagem} onChange={handleChange} placeholder="/images/produtos/..." style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa", fontSize: "0.95rem" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Imagens da Galeria (URLs)</label>
            {imagens.map((img, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <input value={img} onChange={(e) => {
                  const newImgs = [...imagens];
                  newImgs[i] = e.target.value;
                  setImagens(newImgs);
                }} style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa" }} />
                <button type="button" onClick={() => setImagens(imagens.filter((_, idx) => idx !== i))} style={{ padding: "0 16px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, cursor: "pointer" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setImagens([...imagens, ""])} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, background: "#e9ecef", color: "var(--cinza-texto)", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
              <Plus size={16} /> Adicionar Imagem
            </button>
          </div>
        </div>

        {/* Arrays: Benefícios e Especificações */}
        <div style={{ background: "white", padding: 32, borderRadius: 16, border: "1px solid #e9ecef" }}>
          <h3 style={{ margin: "0 0 24px 0", color: "var(--verde-escuro)", fontSize: "1.1rem" }}>Especificações e Benefícios</h3>
          
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Benefícios (Tópicos)</label>
            {beneficios.map((ben, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <input value={ben} onChange={(e) => {
                  const newBen = [...beneficios];
                  newBen[i] = e.target.value;
                  setBeneficios(newBen);
                }} placeholder="Ex: Alta durabilidade" style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa" }} />
                <button type="button" onClick={() => setBeneficios(beneficios.filter((_, idx) => idx !== i))} style={{ padding: "0 16px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, cursor: "pointer" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setBeneficios([...beneficios, ""])} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, background: "#e9ecef", color: "var(--cinza-texto)", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
              <Plus size={16} /> Adicionar Benefício
            </button>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", fontWeight: 600, color: "var(--cinza-texto)" }}>Especificações (Chave / Valor)</label>
            {especificacoes.map((esp, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <input value={esp.chave} onChange={(e) => {
                  const newEsp = [...especificacoes];
                  newEsp[i].chave = e.target.value;
                  setEspecificacoes(newEsp);
                }} placeholder="Chave (ex: Material)" style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa" }} />
                <input value={esp.valor} onChange={(e) => {
                  const newEsp = [...especificacoes];
                  newEsp[i].valor = e.target.value;
                  setEspecificacoes(newEsp);
                }} placeholder="Valor (ex: Polietileno)" style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #dee2e6", background: "#f8f9fa" }} />
                <button type="button" onClick={() => setEspecificacoes(especificacoes.filter((_, idx) => idx !== i))} style={{ padding: "0 16px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, cursor: "pointer" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setEspecificacoes([...especificacoes, {chave: "", valor: ""}])} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, background: "#e9ecef", color: "var(--cinza-texto)", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
              <Plus size={16} /> Adicionar Especificação
            </button>
          </div>
        </div>

        {/* Visibilidade */}
        <div style={{ background: "white", padding: 32, borderRadius: 16, border: "1px solid #e9ecef", display: "flex", gap: 32 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "12px 16px", background: formData.disponivel ? "#e8f5e9" : "#fff3cd", borderRadius: 8, border: "1px solid #dee2e6" }}>
            <input type="checkbox" name="disponivel" checked={formData.disponivel} onChange={handleChange} style={{ width: 20, height: 20 }} />
            <span style={{ fontWeight: 600, color: formData.disponivel ? "var(--verde-escuro)" : "#856404" }}>
              {formData.disponivel ? "Publicado no site" : "Não Publicar"}
            </span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <input type="checkbox" name="destaque" checked={formData.destaque} onChange={handleChange} style={{ width: 20, height: 20 }} />
            <span style={{ fontWeight: 600, color: "var(--verde-escuro)" }}>Destacar na Home</span>
          </label>
        </div>

      </form>
    </div>
  );
}
