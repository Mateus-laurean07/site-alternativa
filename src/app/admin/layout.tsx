import Link from "next/link";
import { ArrowLeft, FileText, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: "var(--verde-escuro)", color: "white", padding: "24px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 24px", marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--ouro)" }}>Alternativa Admin</h2>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>Painel de Controle</span>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", color: "white", textDecoration: "none", background: "rgba(255,255,255,0.05)" }}>
                <FileText size={20} />
                Artigos do Blog
              </Link>
            </li>
            <li>
              <Link href="#" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                <Settings size={20} />
                Configurações
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ padding: "24px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem" }}>
            <ArrowLeft size={16} />
            Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: "auto" }}>
        <header style={{ background: "white", padding: "16px 32px", borderBottom: "1px solid #e9ecef", display: "flex", justifyContent: "flex-end" }}>
          <button style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 8, color: "var(--cinza-texto)", cursor: "pointer", fontSize: "0.9rem" }}>
            <LogOut size={16} />
            Sair
          </button>
        </header>
        <div style={{ padding: 32 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
