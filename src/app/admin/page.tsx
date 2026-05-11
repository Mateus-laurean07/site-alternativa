import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: "1.8rem", color: "var(--verde-escuro)", margin: 0 }}>Artigos do Blog</h1>
        <Link href="/admin/blog/novo" className="btn-ouro" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Plus size={20} />
          Novo Artigo
        </Link>
      </div>

      <div style={{ background: "white", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f1f3f5", color: "var(--cinza-texto)", fontSize: "0.9rem" }}>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Título</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Categoria</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Data</th>
              <th style={{ padding: "16px 24px", fontWeight: 600, textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id} style={{ borderTop: "1px solid #e9ecef" }}>
                <td style={{ padding: "16px 24px", color: "var(--verde-escuro)", fontWeight: 500 }}>{post.titulo}</td>
                <td style={{ padding: "16px 24px", color: "var(--cinza-texto)" }}>{post.categoria}</td>
                <td style={{ padding: "16px 24px", color: "var(--cinza-texto)" }}>{post.data}</td>
                <td style={{ padding: "16px 24px", textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button style={{ background: "#f1f3f5", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--verde-escuro)" }}>
                    <Edit2 size={16} />
                  </button>
                  <button style={{ background: "#fee2e2", border: "none", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#dc2626" }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {blogPosts.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "32px", textAlign: "center", color: "var(--cinza-texto)" }}>
                  Nenhum artigo encontrado. Clique em "Novo Artigo" para começar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
