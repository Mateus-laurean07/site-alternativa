import Link from "next/link";
import { ArrowLeft, FileText, LogOut, PlayCircle } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: "var(--verde-escuro)", color: "white", padding: "24px 0", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
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
              <Link href="/admin/produtos" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", color: "white", textDecoration: "none", background: "rgba(255,255,255,0.05)", marginTop: 4 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/admin/videos" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                <PlayCircle size={20} />
                Vídeos
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
