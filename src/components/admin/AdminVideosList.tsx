"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Video, AlertTriangle, X } from "lucide-react";
import toast from "react-hot-toast";

interface Video {
  id: number;
  titulo: string;
  video_id: string;
  descricao: string;
  ordem: number;
  publicado: boolean;
}

export default function AdminVideosList({ initialVideos }: { initialVideos: Video[] }) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingTitle, setDeletingTitle] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteClick = (video: Video) => {
    setDeletingId(video.id);
    setDeletingTitle(video.titulo);
    setShowModal(true);
  };

  const togglePublicado = async (video: Video) => {
    try {
      const res = await fetch(`/api/videos/${video.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicado: !video.publicado }),
      });
      const data = await res.json();
      if (!data.error) {
        setVideos((prev) => prev.map(v => v.id === video.id ? { ...v, publicado: !v.publicado } : v));
        toast.success(video.publicado ? "Vídeo despublicado!" : "Vídeo publicado!");
      } else {
        toast.error("Erro ao alterar status: " + data.error);
      }
    } catch (e) {
      toast.error("Erro de conexão.");
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setLoadingDelete(true);
    try {
      const res = await fetch(`/api/videos/${deletingId}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.error) {
        toast.success("Vídeo excluído com sucesso!");
        setVideos((prev) => prev.filter((v) => v.id !== deletingId));
        setShowModal(false);
        setDeletingId(null);
        setDeletingTitle("");
      } else {
        toast.error("Erro ao excluir: " + data.error);
      }
    } catch (e) {
      toast.error("Erro de conexão ao excluir.");
    } finally {
      setLoadingDelete(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeletingId(null);
    setDeletingTitle("");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "var(--verde-escuro)", margin: "0 0 8px 0", fontWeight: 800 }}>
            Vídeos
          </h1>
          <p style={{ color: "var(--cinza-texto)", margin: 0 }}>
            {videos.length} {videos.length === 1 ? "vídeo cadastrado" : "vídeos cadastrados"}
          </p>
        </div>
        <Link
          href="/admin/videos/novo"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 8, fontWeight: 600,
            background: "var(--verde-escuro)", color: "white",
            textDecoration: "none", fontSize: "0.95rem",
          }}
        >
          <Plus size={20} />
          Novo Vídeo
        </Link>
      </div>

      {videos.length === 0 ? (
        <div style={{
          background: "white", borderRadius: 16, padding: 64,
          textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "#f1f3f5",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px", color: "var(--cinza-texto)"
          }}>
            <Video size={32} />
          </div>
          <h3 style={{ color: "var(--verde-escuro)", marginBottom: 12, fontSize: "1.2rem" }}>
            Nenhum vídeo cadastrado
          </h3>
          <p style={{ color: "var(--cinza-texto)", marginBottom: 24 }}>
            Adicione vídeos do YouTube para exibir na galeria do site.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                background: "white", borderRadius: 16, overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f3f5",
                display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#000" }}>
                <iframe
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                  src={`https://www.youtube.com/embed/${video.video_id}?rel=0`}
                  title={video.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{
                  fontSize: "1.1rem", color: "var(--verde-escuro)", margin: "0 0 8px 0",
                  lineHeight: 1.4, fontWeight: 800
                }}>
                  {video.titulo}
                </h3>
                
                <p style={{
                  fontSize: "0.85rem", color: "var(--cinza-texto)", margin: "0 0 16px 0",
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {video.descricao}
                </p>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderTop: "1px solid #f1f3f5", paddingTop: 14, marginTop: "auto"
                }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--cinza-texto)", fontWeight: 600 }}>
                    Ordem: {video.ordem}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => togglePublicado(video)}
                      title={video.publicado ? "Despublicar" : "Publicar"}
                      style={{
                        padding: "4px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700,
                        border: "none", cursor: "pointer",
                        background: video.publicado ? "#e8f5e9" : "#fff3cd",
                        color: video.publicado ? "var(--verde-escuro)" : "#856404",
                      }}
                    >
                      {video.publicado ? "Despublicar" : "Publicar"}
                    </button>
                    <Link
                      href={`/admin/videos/${video.id}`}
                      title="Editar vídeo"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 34, height: 34, borderRadius: 8,
                        background: "#e8f5e9", color: "var(--verde-escuro)",
                        textDecoration: "none"
                      }}
                    >
                      <Edit2 size={15} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(video)}
                      title="Excluir vídeo"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 34, height: 34, borderRadius: 8,
                        background: "#fee2e2", color: "#dc2626",
                        border: "none", cursor: "pointer"
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Exclusão */}
      {showModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24
          }}
          onClick={cancelDelete}
        >
          <div
            style={{
              background: "white", borderRadius: 20, padding: "40px 36px",
              width: "100%", maxWidth: 440,
              boxShadow: "0 32px 64px rgba(0,0,0,0.25)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cancelDelete}
              style={{
                position: "absolute", top: 16, right: 16,
                background: "#f1f3f5", border: "none", borderRadius: "50%",
                width: 32, height: 32, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#6c757d"
              }}
            >
              <X size={16} />
            </button>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#fee2e2", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 24px"
            }}>
              <AlertTriangle size={32} color="#dc2626" />
            </div>
            <h2 style={{
              textAlign: "center", margin: "0 0 12px 0",
              fontSize: "1.3rem", color: "#1a1a1a", fontWeight: 800
            }}>
              Excluir vídeo?
            </h2>
            <p style={{ textAlign: "center", color: "#6c757d", margin: "0 0 8px 0" }}>
              Você está prestes a excluir o vídeo:
            </p>
            <p style={{
              textAlign: "center", color: "var(--verde-escuro)", fontWeight: 700,
              background: "#f8f9fa", borderRadius: 8, padding: "10px 16px", margin: "0 0 28px 0"
            }}>
              "{deletingTitle}"
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={cancelDelete}
                style={{
                  flex: 1, padding: "12px 0", borderRadius: 10,
                  border: "1px solid #dee2e6", background: "white",
                  color: "#495057", fontWeight: 600, cursor: "pointer"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={loadingDelete}
                style={{
                  flex: 1, padding: "12px 0", borderRadius: 10,
                  border: "none", background: loadingDelete ? "#f5c2c7" : "#dc2626",
                  color: "white", fontWeight: 700, cursor: loadingDelete ? "not-allowed" : "pointer"
                }}
              >
                {loadingDelete ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
