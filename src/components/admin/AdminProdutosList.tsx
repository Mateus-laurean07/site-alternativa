"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Folder, Tag, AlertTriangle, X } from "lucide-react";
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

export default function AdminProdutosList({ initialProdutos }: { initialProdutos: Produto[] }) {
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos);
  const [catAtiva, setCatAtiva] = useState<string>("Todos");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingTitle, setDeletingTitle] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const produtosFiltrados = catAtiva === "Todos" 
    ? produtos 
    : produtos.filter(p => p.categoria === catAtiva);

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
        setProdutos((prev) => prev.map(p => p.id === produto.id ? { ...p, disponivel: !p.disponivel } : p));
        toast.success(produto.disponivel ? "Produto ocultado!" : "Produto publicado!");
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
      const res = await fetch(`/api/produtos/${deletingId}`, { method: "DELETE" });
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
    <>
      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "var(--verde-escuro)", margin: "0 0 8px 0", fontWeight: 800 }}>
            Produtos
          </h1>
          <p style={{ color: "var(--cinza-texto)", margin: 0 }}>
            {produtosFiltrados.length} {produtosFiltrados.length === 1 ? "produto cadastrado" : "produtos cadastrados"}
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 8, fontWeight: 600,
            background: "var(--verde-escuro)", color: "white",
            textDecoration: "none", fontSize: "0.95rem",
          }}
        >
          <Plus size={20} />
          Novo Produto
        </Link>
      </div>

      {/* Filtros de Categoria */}
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16, marginBottom: 16 }}>
        {["Todos", "Protecocho", "Hidramax", "Multicocho", "Nutrisilo", "Creep Feeding", "Suínos"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCatAtiva(cat)}
            style={{
              padding: "8px 20px",
              borderRadius: 999,
              border: catAtiva === cat ? "none" : "1px solid #dee2e6",
              background: catAtiva === cat ? "var(--verde-escuro)" : "white",
              color: catAtiva === cat ? "white" : "var(--cinza-texto)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista vazia */}
      {produtosFiltrados.length === 0 ? (
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
            Nenhum produto cadastrado
          </h3>
          <p style={{ color: "var(--cinza-texto)", marginBottom: 24 }}>
            Cadastre os cochos e bebedouros para exibi-los no site.
          </p>
          <Link
            href="/admin/produtos/novo"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 8, fontWeight: 600,
              background: "var(--verde-escuro)", color: "white", textDecoration: "none"
            }}
          >
            <Plus size={20} /> Cadastrar Produto
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              style={{
                background: "white", borderRadius: 16, overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)", border: "1px solid #f1f3f5",
                display: "flex", flexDirection: "column",
              }}
            >
              {/* Imagem ou placeholder */}
              <div style={{ position: "relative", height: 220, background: "#e9ecef", flexShrink: 0 }}>
                {produto.imagem ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
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
                  <Tag size={11} /> {produto.categoria}
                </div>
              </div>

              {/* Conteúdo do card */}
              <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{
                  fontSize: "1.1rem", color: "var(--verde-escuro)", margin: "0 0 8px 0",
                  lineHeight: 1.4, fontWeight: 800
                }}>
                  {produto.nome}
                </h3>

                <p style={{
                  fontSize: "0.85rem", color: "var(--cinza-texto)", margin: "0 0 16px 0",
                  flex: 1
                }}>
                  Capacidade: {produto.capacidade || "N/A"}
                </p>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderTop: "1px solid #f1f3f5", paddingTop: 14, marginTop: "auto"
                }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => toggleDisponivel(produto)}
                      title={produto.disponivel ? "Despublicar do site" : "Publicar no site"}
                      style={{
                        padding: "4px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700,
                        border: "none", cursor: "pointer",
                        background: produto.disponivel ? "#e8f5e9" : "#fff3cd",
                        color: produto.disponivel ? "var(--verde-escuro)" : "#856404",
                      }}
                    >
                      {produto.disponivel ? "Despublicar" : "Publicar"}
                    </button>
                    <Link
                      href={`/admin/produtos/${produto.id}`}
                      title="Editar produto"
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
                      onClick={() => handleDeleteClick(produto)}
                      title="Excluir produto"
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
              Excluir produto?
            </h2>

            {/* Mensagem */}
            <p style={{
              textAlign: "center", color: "#6c757d",
              lineHeight: 1.6, margin: "0 0 8px 0"
            }}>
              Você está prestes a excluir o produto:
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
