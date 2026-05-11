"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Calendar, Folder, Tag, AlertTriangle, X } from "lucide-react";
import toast from "react-hot-toast";

interface BlogPost {
  id: number;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string;
  imagem: string;
  tags: string;
  publicado: boolean;
}

export default function AdminBlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingTitle, setDeletingTitle] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteClick = (post: BlogPost) => {
    setDeletingId(post.id);
    setDeletingTitle(post.titulo);
    setShowModal(true);
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicado: !post.publicado }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.map(p => p.id === post.id ? { ...p, publicado: !p.publicado } : p));
        toast.success(post.publicado ? "Artigo despublicado (rascunho)" : "Artigo publicado com sucesso!");
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
      const res = await fetch(`/api/blog/${deletingId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Artigo excluído com sucesso!");
        setPosts((prev) => prev.filter((p) => p.id !== deletingId));
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
      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "var(--verde-escuro)", margin: "0 0 8px 0", fontWeight: 800 }}>
            Artigos do Blog
          </h1>
          <p style={{ color: "var(--cinza-texto)", margin: 0 }}>
            {posts.length} {posts.length === 1 ? "publicação" : "publicações"} no total
          </p>
        </div>
        <Link
          href="/admin/blog/novo"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 8, fontWeight: 600,
            background: "var(--verde-escuro)", color: "white",
            textDecoration: "none", fontSize: "0.95rem",
          }}
        >
          <Plus size={20} />
          Novo Artigo
        </Link>
      </div>

      {/* Lista vazia */}
      {posts.length === 0 ? (
        <div style={{
          background: "white", borderRadius: 16, padding: 64,
          textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "#f1f3f5",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px", color: "var(--cinza-texto)"
          }}>
            <Folder size={32} />
          </div>
          <h3 style={{ color: "var(--verde-escuro)", marginBottom: 12, fontSize: "1.2rem" }}>
            Nenhum artigo ainda
          </h3>
          <p style={{ color: "var(--cinza-texto)", marginBottom: 24 }}>
            Comece a criar conteúdo para engajar seus clientes.
          </p>
          <Link
            href="/admin/blog/novo"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 8, fontWeight: 600,
              background: "var(--verde-escuro)", color: "white", textDecoration: "none"
            }}
          >
            <Plus size={20} /> Criar Primeiro Artigo
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "white", borderRadius: 16, overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f3f5",
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Imagem ou placeholder */}
              <div style={{ position: "relative", height: 180, background: "#e9ecef", flexShrink: 0 }}>
                {post.imagem ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.imagem}
                    alt={post.titulo}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{
                    width: "100%", height: "100%", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", color: "#adb5bd", gap: 8
                  }}>
                    <Folder size={32} />
                    <span style={{ fontSize: "0.8rem" }}>Sem imagem</span>
                  </div>
                )}
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)",
                  padding: "4px 10px", borderRadius: 20, fontSize: "0.75rem",
                  fontWeight: 700, color: "var(--verde-escuro)",
                  display: "flex", alignItems: "center", gap: 4
                }}>
                  <Tag size={11} /> {post.categoria || "Sem categoria"}
                </div>
              </div>

              {/* Conteúdo do card */}
              <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{
                  fontSize: "1rem", color: "var(--verde-escuro)", margin: "0 0 10px 0",
                  lineHeight: 1.4, fontWeight: 700
                }}>
                  {post.titulo}
                </h3>

                <p style={{
                  fontSize: "0.83rem", color: "var(--cinza-texto)", margin: "0 0 16px 0",
                  flex: 1, lineHeight: 1.6,
                  display: "-webkit-box", WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical", overflow: "hidden"
                } as React.CSSProperties}>
                  {post.resumo || "Sem resumo."}
                </p>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderTop: "1px solid #f1f3f5", paddingTop: 14, marginTop: "auto"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.78rem", color: "#adb5bd" }}>
                    <Calendar size={13} />
                    {new Date(post.data).toLocaleDateString("pt-BR")}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => togglePublish(post)}
                      title={post.publicado ? "Despublicar" : "Publicar"}
                      style={{
                        padding: "4px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700,
                        border: "none", cursor: "pointer",
                        background: post.publicado ? "#e8f5e9" : "#fff3cd",
                        color: post.publicado ? "var(--verde-escuro)" : "#856404",
                      }}
                    >
                      {post.publicado ? "Publicado" : "Rascunho"}
                    </button>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      title="Editar artigo"
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
                      onClick={() => handleDeleteClick(post)}
                      title="Excluir artigo"
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

      {/* Modal de Confirmação de Exclusão */}
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
            {/* Botão fechar */}
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

            {/* Ícone */}
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#fee2e2", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 24px"
            }}>
              <AlertTriangle size={32} color="#dc2626" />
            </div>

            {/* Título */}
            <h2 style={{
              textAlign: "center", margin: "0 0 12px 0",
              fontSize: "1.3rem", color: "#1a1a1a", fontWeight: 800
            }}>
              Excluir artigo?
            </h2>

            {/* Mensagem */}
            <p style={{
              textAlign: "center", color: "#6c757d",
              lineHeight: 1.6, margin: "0 0 8px 0"
            }}>
              Você está prestes a excluir o artigo:
            </p>
            <p style={{
              textAlign: "center", color: "var(--verde-escuro)",
              fontWeight: 700, fontSize: "0.95rem",
              background: "#f8f9fa", borderRadius: 8,
              padding: "10px 16px", margin: "0 0 28px 0"
            }}>
              "{deletingTitle}"
            </p>
            <p style={{
              textAlign: "center", color: "#dc2626",
              fontSize: "0.85rem", margin: "0 0 32px 0"
            }}>
              ⚠️ Esta ação não poderá ser desfeita.
            </p>

            {/* Botões */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={cancelDelete}
                style={{
                  flex: 1, padding: "12px 0", borderRadius: 10,
                  border: "1px solid #dee2e6", background: "white",
                  color: "#495057", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem"
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
                  color: "white", fontWeight: 700, cursor: loadingDelete ? "not-allowed" : "pointer",
                  fontSize: "0.95rem"
                }}
              >
                {loadingDelete ? "Excluindo..." : "Sim, excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
