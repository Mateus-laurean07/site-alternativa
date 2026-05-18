"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  LogOut,
  PlayCircle,
  Lock,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const auth = sessionStorage.getItem("admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === "naveo@gmail.com" && senha === "123456") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Login ou senha incorretos.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <style jsx>{`
          .admin-login-container {
            display: flex;
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            overflow-x: hidden;
            width: 100%;
            font-family: "Inter", sans-serif;
          }
          .login-side-decoration {
            flex: 0 0 30%;
            position: relative;
            background-color: #ffffff;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            z-index: 5;
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.02);
            border-right: 1px solid rgba(0, 0, 0, 0.05);
          }
          .login-speech-bubble {
            position: absolute;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
            color: #1a3a1f;
            padding: 18px 24px;
            border-radius: 20px;
            box-shadow:
              0 15px 35px rgba(26, 58, 31, 0.12),
              0 5px 15px rgba(0, 0, 0, 0.05);
            font-weight: 700;
            font-size: 1.15rem;
            z-index: 10;
            white-space: nowrap;
            border: 1px solid rgba(255, 255, 255, 0.8);
            animation: float 4s ease-in-out infinite;
          }
          .login-speech-bubble::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid rgba(255, 255, 255, 0.95);
          }
          @keyframes float {
            0% {
              transform: translate(-50%, 0px);
            }
            50% {
              transform: translate(-50%, -10px);
            }
            100% {
              transform: translate(-50%, 0px);
            }
          }
          .boi-image-wrapper {
            position: relative;
            width: 100%;
            height: 75vh;
            animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .login-form-container {
            flex: 0 0 35%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 10;
            padding: 24px;
          }
          .login-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            padding: 48px 40px;
            border-radius: 28px;
            box-shadow:
              0 30px 70px rgba(0, 0, 0, 0.05),
              0 1px 3px rgba(0, 0, 0, 0.01);
            width: 100%;
            max-width: 400px;
            border: 1px solid rgba(255, 255, 255, 0.7);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .login-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 40px 85px rgba(26, 58, 31, 0.08);
            border-color: rgba(201, 168, 76, 0.3);
          }
          .lock-icon-container {
            width: 68px;
            height: 68px;
            background: linear-gradient(135deg, #1a3a1f 0%, #2e5c35 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin: 0 auto 20px;
            box-shadow: 0 10px 25px rgba(26, 58, 31, 0.2);
            transition: all 0.4s ease;
          }
          .login-card:hover .lock-icon-container {
            transform: rotate(-10deg) scale(1.05);
            background: linear-gradient(135deg, #c9a84c 0%, #a78736 100%);
            box-shadow: 0 10px 25px rgba(201, 168, 76, 0.3);
          }
          .login-title {
            font-size: 1.7rem;
            color: #1a3a1f;
            margin: 0 0 6px 0;
            font-weight: 850;
            letter-spacing: -0.5px;
          }
          .login-subtitle {
            color: #6c757d;
            margin: 0;
            font-size: 0.9rem;
            font-weight: 550;
          }
          .login-error-box {
            background: #fef2f2;
            border: 1px solid #fee2e2;
            color: #dc2626;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.85rem;
            margin-bottom: 24px;
            text-align: center;
            font-weight: 600;
            animation: shake 0.4s ease-in-out;
          }
          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-4px);
            }
            75% {
              transform: translateX(4px);
            }
          }
          .login-field-group {
            margin-bottom: 20px;
          }
          .login-label {
            display: block;
            margin-bottom: 8px;
            font-size: 0.85rem;
            font-weight: 700;
            color: #1a3a1f;
            letter-spacing: 0.2px;
          }
          .login-input {
            width: 100%;
            padding: 14px 16px;
            border-radius: 12px;
            border: 2px solid #e9ecef;
            outline: none;
            font-size: 0.95rem;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            background-color: #f8f9fa;
            color: #333;
          }
          .login-input:focus {
            border-color: #c9a84c;
            background-color: #ffffff;
            box-shadow: 0 0 0 4px rgba(201, 168, 76, 0.12);
          }
          .login-submit-btn {
            width: 100%;
            padding: 16px;
            border-radius: 12px;
            background: linear-gradient(135deg, #1a3a1f 0%, #2e5c35 100%);
            color: white;
            border: none;
            font-weight: 700;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 8px 20px rgba(26, 58, 31, 0.2);
          }
          .login-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(26, 58, 31, 0.3);
            background: linear-gradient(135deg, #2e5c35 0%, #1a3a1f 100%);
          }
          .login-submit-btn:active {
            transform: translateY(0);
          }
          .login-back-link {
            color: #adb5bd;
            font-size: 0.85rem;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          .login-back-link:hover {
            color: #1a3a1f;
          }
          .login-right-side {
            flex: 1 1 35%;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 40px;
            overflow: hidden;
            border-left: 1px solid rgba(0, 0, 0, 0.05);
          }
          .login-right-bg {
            position: absolute;
            inset: 0;
            background-image: url("/images/bois_curiosos_bg.png");
            background-size: cover;
            background-position: center;
            transition: transform 10s ease;
          }
          .login-right-side:hover .login-right-bg {
            transform: scale(1.05);
          }
          .login-right-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to right,
              #f8f9fa -5%,
              transparent 25%,
              transparent 70%,
              rgba(0, 0, 0, 0.2) 100%
            );
          }
          .muuu-card {
            position: relative;
            z-index: 10;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px) saturate(180%);
            -webkit-backdrop-filter: blur(12px) saturate(180%);
            padding: 32px;
            border-radius: 24px;
            box-shadow:
              0 20px 45px rgba(0, 0, 0, 0.12),
              0 1px 3px rgba(0, 0, 0, 0.02);
            max-width: 380px;
            align-self: center;
            transform: translateY(-40px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            animation: floatSlow 6s ease-in-out infinite;
          }
          @keyframes floatSlow {
            0% {
              transform: translateY(-40px);
            }
            50% {
              transform: translateY(-28px);
            }
            100% {
              transform: translateY(-40px);
            }
          }
          .muuu-title {
            margin: 0;
            color: #1a3a1f;
            font-size: 1.45rem;
            font-weight: 850;
            display: flex;
            align-items: center;
            gap: 8px;
            letter-spacing: -0.5px;
          }
          .muuu-text {
            margin: 12px 0 0;
            color: #333;
            font-weight: 550;
            font-size: 1.05rem;
            line-height: 1.6;
          }
          .mobile-login-header {
            display: none;
            text-align: center;
            padding: 24px;
            background: #1a3a1f;
            color: white;
            width: 100%;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 1024px) {
            .admin-login-container {
              flex-direction: column;
              align-items: center;
            }
            .login-side-decoration,
            .login-right-side {
              display: none;
            }
            .login-form-container {
              flex: 1;
              width: 100%;
              padding: 20px;
              min-height: 100vh;
            }
            .mobile-login-header {
              display: block;
            }
          }
        `}</style>

        {/* Lado Esquerdo - Boi Segurança (Fundo Branco) - Escondido no Mobile */}
        <div className="login-side-decoration">
          <div className="login-speech-bubble">
            Opa chefe, Tudo bem? Qual a senha?
          </div>
          <div className="boi-image-wrapper">
            <Image
              src="/images/boi-seguranca.png"
              alt="Boi Segurança"
              fill
              sizes="30vw"
              style={{
                objectFit: "contain",
                objectPosition: "center bottom",
                pointerEvents: "none",
                zIndex: 5,
              }}
              priority
            />
          </div>
        </div>

        {/* Meio - Formulário de Login */}
        <div className="login-form-container">
          <form onSubmit={handleLogin} className="login-card">
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div className="lock-icon-container">
                <Lock size={32} />
              </div>
              <h2 className="login-title">Acesso Restrito</h2>
              <p className="login-subtitle">
                Painel Administrativo Alternativa
              </p>
            </div>

            {error && <div className="login-error-box">{error}</div>}

            <div className="login-field-group">
              <label className="login-label">Login</label>
              <input
                type="email"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="E-mail"
                className="login-input"
              />
            </div>

            <div className="login-field-group" style={{ marginBottom: 32 }}>
              <label className="login-label">Senha</label>
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="login-input"
              />
            </div>

            <button type="submit" className="login-submit-btn">
              Entrar no Painel
            </button>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Link href="/" className="login-back-link">
                &larr; Voltar ao site
              </Link>
            </div>
          </form>
        </div>

        {/* Lado Direito - Bois Curiosos - Escondido no Mobile */}
        <div className="login-right-side">
          <div className="login-right-bg" />
          <div className="login-right-overlay" />

          <div className="muuu-card">
            <h3 className="muuu-title">Muuuu? 🤨🐄</h3>
            <p className="muuu-text">
              &quot;Opa chefe, cê tá querendo mexer onde não deve? Bota a senha
              aí se for de casa, senão a gente chama o segurança ali do
              lado!&quot;
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <style jsx global>{`
        .admin-dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #f8f9fa;
          position: relative;
        }
        .admin-sidebar {
          width: 260px;
          background: var(--verde-escuro);
          color: white;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          transition: transform 0.3s ease;
          z-index: 100;
        }
        .admin-main {
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
        }
        .admin-header {
          background: white;
          padding: 16px 32px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--verde-escuro);
          cursor: pointer;
        }
        .admin-content {
          padding: 32px;
          flex: 1;
        }

        /* Missing sidebar and header styles */
        .sidebar-logo-container {
          padding: 0 32px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sidebar-logo-title {
          font-family: var(--font-display, sans-serif);
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        .sidebar-logo-subtitle {
          font-size: 0.8rem;
          opacity: 0.8;
          font-weight: 500;
        }
        .sidebar-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 32px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          border-left: 4px solid transparent;
        }
        .sidebar-nav-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
        .sidebar-nav-link.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-left-color: var(--ouro, #c9a84c);
        }
        .sidebar-footer-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .sidebar-footer-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }
        .header-account-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 12px 6px 6px;
          background: #f8f9fa;
          border-radius: 40px;
          border: 1px solid #e9ecef;
          cursor: pointer;
          transition: all 0.2s;
        }
        .header-account-btn:hover {
          background: #e9ecef;
        }
        .user-avatar-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--verde-escuro, #1a3a1f);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .user-status-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .user-name-label {
          margin: 0;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--preto, #0f1a10);
          line-height: 1.2;
        }
        .user-role-label {
          margin: 0;
          font-size: 0.75rem;
          color: var(--cinza-texto, #6b7c6d);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .status-dot-active {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            transform: ${isMenuOpen ? "translateX(0)" : "translateX(-100%)"};
            box-shadow: ${isMenuOpen ? "10px 0 30px rgba(0,0,0,0.2)" : "none"};
          }
          .mobile-menu-btn {
            display: block;
          }
          .admin-header {
            padding: 12px 20px;
          }
          .admin-content {
            padding: 20px 16px;
          }
          .sidebar-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: ${isMenuOpen ? "block" : "none"};
            z-index: 90;
          }
        }
      `}</style>

      {/* Sidebar Overlay for Mobile */}
      <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)} />

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo-container">
          <div>
            <h2 className="sidebar-logo-title">Alternativa</h2>
            <span className="sidebar-logo-subtitle">Painel de Gestão</span>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(false)}
            style={{ color: "white" }}
          >
            <X size={22} />
          </button>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={`sidebar-nav-link ${pathname === "/admin" ? "active" : ""}`}
              >
                <FileText size={20} />
                Artigos do Blog
              </Link>
            </li>
            <li>
              <Link
                href="/admin/produtos"
                onClick={() => setIsMenuOpen(false)}
                className={`sidebar-nav-link ${pathname?.startsWith("/admin/produtos") ? "active" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                Produtos
              </Link>
            </li>
            <li>
              <Link
                href="/admin/videos"
                onClick={() => setIsMenuOpen(false)}
                className={`sidebar-nav-link ${pathname?.startsWith("/admin/videos") ? "active" : ""}`}
              >
                <PlayCircle size={20} />
                Vídeos
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ padding: "8px 0" }}>
          <Link href="/" className="sidebar-footer-link">
            <ArrowLeft size={16} />
            Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Conta do Administrador */}
            <div className="header-account-btn">
              <div className="user-avatar-badge">AD</div>
              <div className="user-status-container hide-mobile">
                <p className="user-name-label">Administrador</p>
                <span className="user-role-label">
                  <span className="status-dot-active"></span> Online
                </span>
              </div>
            </div>

            <div style={{ width: 1, height: 24, background: "rgba(0,0,0,0.08)" }}></div>

            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#e63946",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: "10px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(230,57,70,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <LogOut size={16} />
              <span className="hide-mobile">Sair</span>
            </button>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </main>

      <style jsx global>{`
        @media (max-width: 640px) {
          .hide-mobile {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
