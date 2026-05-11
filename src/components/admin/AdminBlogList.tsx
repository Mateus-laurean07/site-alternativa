"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Calendar, Folder, Tag, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface BlogPost {
  id: number;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string;
  imagem: string;
  tags: string;
}

export default function AdminBlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = (id: number) => {
    setIsDeleting(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!isDeleting) return;
    try {
      const res = await fetch(`/api/blog/${isDeleting}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Blog excluído com sucesso!");
        setPosts(posts.filter((p) => p.id !== isDeleting));
      } else {
        toast.error("Erro ao excluir: " + data.error);
      }
    } catch (e) {
      toast.error("Erro de conexão ao excluir.");
    } finally {
      setShowModal(false);
      setIsDeleting(null);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "var(--verde-escuro)", margin: "0 0 8px 0", fontWeight: 800 }}>Artigos do Blog</h1>
          <p style={{ color: "var(--cinza-texto)", margin: 0 }}>Gerencie as publicações do seu site</p>
        </div>
        <Link href="/admin/blog/novo" className="btn-ouro" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 8, fontWeight: 600 }}>
          <Plus size={20} />
          Novo Artigo
        </Link>
      </div>

      {posts.length === 0 ? (
        <div style={{ background: "white", borderRadius: 16, padding: 64, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f1f3f5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--cinza-texto)" }}>
            <Folder size={32} />
          </div>
          <h3 style={{ color: "var(--verde-escuro)", marginBottom: 12, fontSize: "1.2rem" }}>Nenhum artigo ainda</h3>
          <p style={{ color: "var(--cinza-texto)", marginBottom: 24 }}>Comece a criar conteúdo para engajar seus clientes.</p>
          <Link href="/admin/blog/novo" className="btn-verde" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Plus size={20} /> Criar Primeiro Artigo
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {posts.map((post) => (
            <div key={post.id} style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid #f1f3f5", display: "flex", flexDirection: "column", transition: "transform 0.2s", ":hover": { transform: "translateY(-4px)" } } as React.CSSProperties}>
              <div style={{ position: "relative", height: 180, width: "100%", background: "#e9ecef" }}>
                {post.imagem && post.imagem !== '/images/blog/default.jpg' ? (
                  <Image src={post.imagem} alt={post.titulo} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cinza-texto)" }}>
                    Sem Imagem
                  </div>
                )}
                <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700, color: "var(--verde-escuro)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Tag size={12} /> {post.categoria}
                </div>
              </div>
              
              <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--verde-escuro)", margin: "0 0 12px 0", lineHeight: 1.4, fontWeight: 700 }}>
                  {post.titulo}
                </h3>
                
                <p style={{ fontSize: "0.85rem", color: "var(--cinza-texto)", margin: "0 0 20px 0", flex: 1, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {post.resumo}
                </p>
                
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f3f5", paddingTop: 16, marginTop: "auto" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "var(--cinza-texto)" }}>
                    <Calendar size={14} />
                    {new Date(post.data).toLocaleDateString("pt-BR")}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link href={`/admin/blog/${post.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: "#f8f9fa", color: "var(--verde-escuro)", transition: "background 0.2s" }} title="Editar">
                      <Edit2 size={16} />
                    </Link>
                    <button onClick={() => handleDeleteClick(post.id)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: "#fee2e2", color: "#dc2626", border: "none", cursor: "pointer", transition: "background 0.2s" }} title="Excluir">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Confirmação */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 32, width: "100%", maxWidth: 400, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, color: "#dc2626" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertTriangle size={24} />
              </div>
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Atenção</h3>
            </div>
            <p style={{ margin: "0 0 32px 0", color: "var(--cinza-texto)", lineHeight: 1.6 }}>
              Tem certeza que deseja excluir este blog? Esta ação não poderá ser desfeita e o artigo será removido do site.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ background: "#f8f9fa", border: "none" }}>
                Cancelar
              </button>
              <button onClick={confirmDelete} className="btn-verde" style={{ background: "#dc2626", color: "white" }}>
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
