"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Folder,
  Tag,
  AlertTriangle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

interface Produto {
  id: number;
  slug: string;
  nome: string;
  categoria: string;
  imagem: string;
  disponivel: boolean;
  capacidade?: string;
}

export default function AdminProdutosList({
  initialProdutos,
}: {
  initialProdutos: Produto[];
}) {
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos);
  const [catAtiva, setCatAtiva] = useState<string>("Todos");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingTitle, setDeletingTitle] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const produtosFiltrados =
    catAtiva === "Todos"
      ? produtos
      : produtos.filter((p) => p.categoria === catAtiva);

  const handleDeleteClick = (produto: Produto) => {
    setDeletingId(produto.id);
    setDeletingTitle(produto.nome);
    setShowModal(true);
  };

  const toggleDisponivel = async (produto: Produto) => {
    try {
      const res = await fetch(`/api/produtos/${produto.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disponivel: !produto.disponivel }),
      });
      const data = await res.json();
      if (!data.error) {
        setProdutos((prev) =>
          prev.map((p) =>
            p.id === produto.id ? { ...p, disponivel: !p.disponivel } : p,
          ),
        );
        toast.success(
          produto.disponivel ? "Produto ocultado!" : "Produto publicado!",
        );
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
      const res = await fetch(`/api/produtos/${deletingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.error) {
        toast.success("Produto excluído com sucesso!");
        setProdutos((prev) => prev.filter((p) => p.id !== deletingId));
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
          margin-bottom: 24px;
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

        .category-filters {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 32px;
          scrollbar-width: none;
        }
        .category-filters::-webkit-scrollbar {
          display: none;
        }
        .filter-btn {
          padding: 10px 24px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(0,0,0,0.06);
          background: white;
          color: #64748b;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
          color: #1a3a1f;
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #1a3a1f 0%, #2e5c35 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(26,58,31,0.2);
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
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
        }
        .product-card {
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
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: rgba(26,58,31,0.1);
        }
        .product-card-image-container {
          position: relative;
          height: 240px;
          background: #f8fafc;
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-card-image-container img {
          transform: scale(1.05);
        }
        .product-card-no-image {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          gap: 12px;
        }
        .product-card-category-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          color: #1a3a1f;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .product-card-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .product-card-title {
          font-size: 1.2rem;
          color: #1a3a1f;
          margin: 0 0 8px 0;
          line-height: 1.3;
          font-weight: 850;
        }
        .product-card-summary {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0 0 20px 0;
          flex: 1;
          font-weight: 500;
        }
        .product-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
          margin-top: auto;
        }
        .product-card-actions {
          display: flex;
          gap: 8px;
          width: 100%;
          justify-content: flex-end;
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
          flex: 1;
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
          <h1>Produtos</h1>
          <p>
            {produtosFiltrados.length}{" "}
            {produtosFiltrados.length === 1 ? "produto cadastrado" : "produtos cadastrados"}
          </p>
        </div>
        <Link href="/admin/produtos/novo" className="btn-new-item">
          <Plus size={20} />
          Novo Produto
        </Link>
      </div>

      {/* Filtros de Categoria */}
      <div className="category-filters">
        {["Todos", "Protecocho", "Hidramax", "Multicocho", "Nutrisilo", "Suínos"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCatAtiva(cat)}
            className={`filter-btn ${catAtiva === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista vazia */}
      {produtosFiltrados.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <Folder size={36} />
          </div>
          <h3 className="empty-state-title">Nenhum produto cadastrado</h3>
          <p className="empty-state-desc">
            Cadastre os cochos e bebedouros para exibi-los no site.
          </p>
          <Link href="/admin/produtos/novo" className="btn-new-item" style={{ display: 'inline-flex', width: 'auto' }}>
            <Plus size={20} /> Cadastrar Produto
          </Link>
        </div>
      ) : (
        <div className="grid-container">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="product-card">
              {/* Imagem ou placeholder */}
              <div className="product-card-image-container">
                {produto.imagem ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={produto.imagem} alt={produto.nome} />
                ) : (
                  <div className="product-card-no-image">
                    <Folder size={36} />
                    <span>Sem imagem</span>
                  </div>
                )}
                <div className="product-card-category-badge">
                  <Tag size={12} /> {produto.categoria}
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="product-card-content">
                <h3 className="product-card-title">{produto.nome}</h3>
                <p className="product-card-summary">Capacidade: {produto.capacidade || "N/A"}</p>

                <div className="product-card-footer">
                  <div className="product-card-actions">
                    <button
                      onClick={() => toggleDisponivel(produto)}
                      title={produto.disponivel ? "Despublicar do site" : "Publicar no site"}
                      className={`btn-action btn-publish ${produto.disponivel ? 'published' : 'draft'}`}
                    >
                      {produto.disponivel ? "Despublicar" : "Publicar"}
                    </button>
                    <Link
                      href={`/admin/produtos/${produto.id}`}
                      title="Editar produto"
                      className="btn-action btn-icon btn-edit"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(produto)}
                      title="Excluir produto"
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

            <h2 className="modal-title">Excluir produto?</h2>
            
            <p className="modal-desc">Você está prestes a excluir permanentemente o produto:</p>
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
