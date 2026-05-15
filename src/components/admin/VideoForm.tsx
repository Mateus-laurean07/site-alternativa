"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";

interface VideoData {
  id?: number;
  titulo: string;
  video_id: string;
  descricao: string;
  ordem: number;
  publicado: boolean;
}

export default function VideoForm({ initialData, isEdit = false }: { initialData?: VideoData; isEdit?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<VideoData>({
    titulo: initialData?.titulo || "",
    video_id: initialData?.video_id || "",
    descricao: initialData?.descricao || "",
    ordem: initialData?.ordem || 0,
    publicado: initialData?.publicado ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "ordem" ? Number(value) : value,
      }));
    }
  };

  const extrairVideoId = (urlOuId: string) => {
    // Tenta extrair ID se for uma URL completa do youtube
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = urlOuId.match(regExp);
    return (match && match[7].length === 11) ? match[7] : urlOuId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        video_id: extrairVideoId(formData.video_id)
      };

      const url = isEdit ? `/api/videos/${initialData?.id}` : `/api/videos`;
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && !data.error) {
        toast.success(isEdit ? "Vídeo atualizado com sucesso!" : "Vídeo criado com sucesso!");
        router.push("/admin/videos");
        router.refresh();
      } else {
        toast.error(data.error || "Erro ao salvar o vídeo.");
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <style jsx>{`
        .admin-form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .form-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .form-header h1 {
          font-size: 1.8rem;
          color: var(--verde-escuro);
          margin: 0 0 4px 0;
          font-weight: 800;
        }
        .form-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          border: 1px solid #f1f3f5;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .form-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .form-header h1 {
            font-size: 1.5rem;
          }
          .form-card {
            padding: 24px;
          }
          .form-actions {
            flex-direction: column;
            gap: 12px;
          }
          .form-actions button, .form-actions a {
            width: 100%;
            justify-content: center;
            padding: 16px;
            font-size: 1.1rem;
          }
          .btn-cancel {
            order: 2;
          }
          .btn-save {
            order: 1;
          }
          .responsive-row {
            flex-direction: column;
            gap: 20px !important;
          }
          .responsive-row > div {
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="form-header">
        <Link
          href="/admin/videos"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 40, height: 40, borderRadius: "50%", background: "white",
            color: "var(--cinza-texto)", border: "1px solid #dee2e6",
          }}
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1>
            {isEdit ? "Editar Vídeo" : "Novo Vídeo"}
          </h1>
          <p style={{ color: "var(--cinza-texto)", margin: 0, fontSize: "0.9rem" }}>
            Preencha os dados do vídeo do YouTube.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="form-card">
          <h2 style={{ fontSize: "1.2rem", color: "var(--verde-escuro)", marginBottom: 24, borderBottom: "1px solid #f1f3f5", paddingBottom: 12, fontWeight: 700 }}>
            Informações do Vídeo
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontWeight: 600, color: "#495057", fontSize: "0.95rem" }}>
                Título <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                required
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ex: Montagem Nutrisilo"
                style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #dee2e6", fontSize: "1rem" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontWeight: 600, color: "#495057", fontSize: "0.95rem" }}>
                URL ou ID do Vídeo (YouTube) <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                required
                type="text"
                name="video_id"
                value={formData.video_id}
                onChange={handleChange}
                placeholder="Ex: https://www.youtube.com/watch?v=UNEwue5zkcU ou apenas UNEwue5zkcU"
                style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #dee2e6", fontSize: "1rem" }}
              />
              <span style={{ fontSize: "0.8rem", color: "var(--cinza-texto)" }}>O sistema extrairá o ID automaticamente se você colar a URL.</span>
            </div>

            {formData.video_id && (
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 8, color: "var(--verde-escuro)" }}>Pré-visualização:</p>
                <div style={{ position: "relative", width: "100%", maxWidth: 400, paddingTop: "56.25%", background: "#000", borderRadius: 8, overflow: "hidden" }}>
                  <iframe
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                    src={`https://www.youtube.com/embed/${extrairVideoId(formData.video_id)}?rel=0`}
                    title="Pré-visualização"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontWeight: 600, color: "#495057", fontSize: "0.95rem" }}>
                Descrição curta
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Uma breve descrição sobre o vídeo..."
                rows={3}
                style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #dee2e6", fontSize: "1rem", fontFamily: "inherit" }}
              />
            </div>

            <div style={{ display: "flex", gap: 16 }} className="responsive-row">
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 200, width: '100%' }}>
                <label style={{ fontWeight: 600, color: "#495057", fontSize: "0.95rem" }}>
                  Ordem de exibição
                </label>
                <input
                  type="number"
                  name="ordem"
                  value={formData.ordem}
                  onChange={handleChange}
                  style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #dee2e6", fontSize: "1rem" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: '100%' }}>
                <label style={{ fontWeight: 600, color: "#495057", fontSize: "0.95rem" }}>
                  Status
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "12px 16px", background: formData.publicado ? "#e8f5e9" : "#fff3cd", borderRadius: 8, border: "1px solid #dee2e6", justifyContent: 'center' }}>
                  <input
                    type="checkbox"
                    name="publicado"
                    checked={formData.publicado}
                    onChange={handleChange}
                    style={{ width: 18, height: 18, cursor: "pointer" }}
                  />
                  <span style={{ fontWeight: 600, color: formData.publicado ? "var(--verde-escuro)" : "#856404" }}>
                    {formData.publicado ? "Publicado no site" : "Não Publicar"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <Link
            href="/admin/videos"
            className="btn-cancel"
            style={{
              padding: "14px 24px", borderRadius: 8, fontWeight: 600, color: "#495057",
              background: "white", border: "1px solid #dee2e6", textDecoration: "none",
              display: 'flex', alignItems: 'center'
            }}
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-save"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 8, fontWeight: 600, color: "white",
              background: "var(--verde-escuro)", border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            <Save size={20} />
            {loading ? "Salvando..." : "Salvar Vídeo"}
          </button>
        </div>
      </form>
    </div>
  );
}
