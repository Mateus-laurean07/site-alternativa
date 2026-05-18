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
        toast.success(post.publicado ? "Artigo ocultado do blog!" : "Artigo publicado com sucesso!");
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
    <div className="admin-list-container">
      <style jsx>{`
        .admin-list-container {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .admin-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          gap: 16px;
        }
        .admin-list-title h1 {
          font-size: 2.2rem;
          color: #1a3a1f;
          margin: 0 0 8px 0;
          font-weight: 850;
          letter-spacing: -0.5px;
        }
        .admin-list-title p {
          color: #64748b;
          margin: 0;
          font-weight: 500;
          font-size: 0.95rem;
        }
        .btn-new-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 700;
          background: linear-gradient(135deg, #1a3a1f 0%, #2e5c35 100%);
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          white-space: nowrap;
          box-shadow: 0 10px 25px rgba(26,58,31,0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-new-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(26,58,31,0.3);
          background: linear-gradient(135deg, #2e5c35 0%, #1a3a1f 100%);
        }

        .empty-state-card {
          background: white;
          border-radius: 24px;
          padding: 80px 40px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.04);
        }
        .empty-state-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: #94a3b8;
        }
        .empty-state-title {
          color: #1a3a1f;
          margin-bottom: 12px;
          font-size: 1.4rem;
          font-weight: 800;
        }
        .empty-state-desc {
          color: #64748b;
          margin-bottom: 32px;
          font-size: 1rem;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }
        .blog-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: rgba(26,58,31,0.1);
        }
        .blog-card-image-container {
          position: relative;
          height: 200px;
          background: #f8fafc;
          flex-shrink: 0;
          overflow: hidden;
        }
        .blog-card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .blog-card:hover .blog-card-image-container img {
          transform: scale(1.05);
        }
        .blog-card-no-image {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          gap: 12px;
        }
        .blog-card-category-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 750;
          color: #1a3a1f;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .blog-card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .blog-card-title {
          font-size: 1.15rem;
          color: #1a3a1f;
          margin: 0 0 12px 0;
          line-height: 1.4;
          font-weight: 800;
        }
        .blog-card-summary {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0 0 20px 0;
          flex: 1;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
          margin-top: auto;
        }
        .blog-card-date {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 600;
        }
        .blog-card-actions {
          display: flex;
          gap: 8px;
        }
        .btn-action {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.8rem;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .btn-publish {
          padding: 0 16px;
        }
        .btn-publish.published {
          background: #ecfdf5;
          color: #059669;
        }
        .btn-publish.published:hover {
          background: #d1fae5;
        }
        .btn-publish.draft {
          background: #fef3c7;
          color: #d97706;
        }
        .btn-publish.draft:hover {
          background: #fde68a;
        }
        .btn-icon {
          width: 36px;
          padding: 0;
        }
        .btn-edit {
          background: #f1f5f9;
          color: #475569;
        }
        .btn-edit:hover {
          background: #e2e8f0;
          color: #1e293b;
        }
        .btn-delete {
          background: #fef2f2;
          color: #ef4444;
        }
        .btn-delete:hover {
          background: #fee2e2;
          color: #b91c1c;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease-out;
        }
        .modal-content {
          background: white;
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          maxWidth: 440px;
          box-shadow: 0 32px 64px rgba(0,0,0,0.2);
          position: relative;
          transform: scale(0.95);
          animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes scaleIn {
          to { transform: scale(1); }
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #f8fafc;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: background 0.2s;
        }
        .modal-close:hover {
          background: #f1f5f9;
        }
        .modal-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #fef2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: #ef4444;
        }
        .modal-title {
          text-align: center;
          margin: 0 0 12px 0;
          font-size: 1.5rem;
          color: #0f172a;
          font-weight: 800;
        }
        .modal-desc {
          text-align: center;
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 12px 0;
        }
        .modal-target {
          text-align: center;
          color: #1a3a1f;
          font-weight: 700;
          font-size: 1rem;
          background: #f8fafc;
          border-radius: 12px;
          padding: 12px 16px;
          margin: 0 0 24px 0;
        }
        .modal-warning {
          text-align: center;
          color: #ef4444;
          font-size: 0.85rem;
          margin: 0 0 32px 0;
          font-weight: 600;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
        }
        .btn-modal {
          flex: 1;
          padding: 14px 0;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.95rem;
          border: none;
          transition: all 0.2s;
        }
        .btn-modal-cancel {
          background: #f1f5f9;
          color: #475569;
        }
        .btn-modal-cancel:hover {
          background: #e2e8f0;
        }
        .btn-modal-confirm {
          background: #ef4444;
          color: white;
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }
        .btn-modal-confirm:hover {
          background: #dc2626;
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.4);
        }
        .btn-modal-confirm:disabled {
          background: #fca5a5;
          cursor: not-allowed;
          box-shadow: none;
        }

        @media (max-width: 640px) {
          .admin-list-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .admin-list-title h1 {
            font-size: 1.8rem;
          }
          .btn-new-item {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Cabeçalho */}
      <div className="admin-list-header">
        <div className="admin-list-title">
          <h1>Artigos do Blog</h1>
          <p>
            {posts.length} {posts.length === 1 ? "publicação" : "publicações"} no total
          </p>
        </div>
        <Link href="/admin/blog/novo" className="btn-new-item">
          <Plus size={20} />
          Novo Artigo
        </Link>
      </div>

      {/* Lista vazia */}
      {posts.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <Folder size={36} />
          </div>
          <h3 className="empty-state-title">Nenhum artigo ainda</h3>
          <p className="empty-state-desc">
            Comece a criar conteúdo para engajar seus clientes e impulsionar suas vendas.
          </p>
          <Link href="/admin/blog/novo" className="btn-new-item" style={{ display: 'inline-flex', width: 'auto' }}>
            <Plus size={20} /> Criar Primeiro Artigo
          </Link>
        </div>
      ) : (
        <div className="grid-container">
          {posts.map((post) => (
            <div key={post.id} className="blog-card">
              {/* Imagem ou placeholder */}
              <div className="blog-card-image-container">
                {post.imagem ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.imagem} alt={post.titulo} />
                ) : (
                  <div className="blog-card-no-image">
                    <Folder size={36} />
                    <span>Sem imagem</span>
                  </div>
                )}
                <div className="blog-card-category-badge">
                  <Tag size={12} /> {post.categoria || "Geral"}
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="blog-card-content">
                <h3 className="blog-card-title">{post.titulo}</h3>
                <p className="blog-card-summary">{post.resumo || "Sem resumo."}</p>

                <div className="blog-card-footer">
                  <div className="blog-card-date">
                    <Calendar size={14} />
                    {new Date(post.data).toLocaleDateString("pt-BR")}
                  </div>
                  <div className="blog-card-actions">
                    <button
                      onClick={() => togglePublish(post)}
                      title={post.publicado ? "Despublicar/Ocultar" : "Publicar"}
                      className={`btn-action btn-publish ${post.publicado ? 'published' : 'draft'}`}
                    >
                      {post.publicado ? "Despublicar" : "Publicar"}
                    </button>
                    <Link
                      href={`/admin/blog/${post.id}`}
                      title="Editar artigo"
                      className="btn-action btn-icon btn-edit"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(post)}
                      title="Excluir artigo"
                      className="btn-action btn-icon btn-delete"
                    >
                      <Trash2 size={16} />
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
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cancelDelete}>
              <X size={18} />
            </button>

            <div className="modal-icon">
              <AlertTriangle size={36} />
            </div>

            <h2 className="modal-title">Excluir artigo?</h2>
            
            <p className="modal-desc">Você está prestes a excluir permanentemente o artigo:</p>
            <p className="modal-target">"{deletingTitle}"</p>
            <p className="modal-warning">⚠️ Esta ação não poderá ser desfeita.</p>

            <div className="modal-actions">
              <button onClick={cancelDelete} className="btn-modal btn-modal-cancel">
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={loadingDelete}
                className="btn-modal btn-modal-confirm"
              >
                {loadingDelete ? "Excluindo..." : "Sim, excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
