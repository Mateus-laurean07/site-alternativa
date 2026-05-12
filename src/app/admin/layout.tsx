"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, LogOut, PlayCircle, Lock } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Avoid synchronous setState within effect to prevent cascading renders warning
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
  };

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        {/* Lado Esquerdo - Boi Segurança (Fundo Branco) */}
        <div
          style={{
            flex: "0 0 30%",
            position: "relative",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 5,
            overflow: "visible",
          }}
        >
            {/* Caixa de fala estilo balão de quadrinhos */}
            <div style={{
              position: "absolute",
              top: "18%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(255,255,255,0.9)",
              color: "#333",
              padding: "16px 20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              fontWeight: 600,
              fontSize: "1.2rem",
              zIndex: 10,
            }}>
              Opa chefe, Tudo bem? Qual a senha?
              <div style={{
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "10px solid rgba(255,255,255,0.9)",
              }} />
            </div>
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

        {/* Meio - Formulário de Login */}
        <div
          style={{
            flex: "0 0 35%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            position: "relative",
            zIndex: 10,
            padding: 24,
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              background: "white",
              padding: "40px",
              borderRadius: 20,
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              width: "100%",
              maxWidth: 380,
              border: "1px solid #f1f3f5",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--verde-escuro)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  margin: "0 auto 16px",
                  boxShadow: "0 10px 20px rgba(10, 60, 30, 0.2)",
                }}
              >
                <Lock size={32} />
              </div>
              <h2
                style={{
                  fontSize: "1.6rem",
                  color: "var(--verde-escuro)",
                  margin: "0 0 8px 0",
                  fontWeight: 800,
                }}
              >
                Acesso Restrito
              </h2>
              <p
                style={{
                  color: "#6c757d",
                  margin: 0,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Painel Administrativo Alternativa
              </p>
            </div>

            {error && (
              <div
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: "0.85rem",
                  marginBottom: 24,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--verde-escuro)",
                }}
              >
                Login
              </label>
              <input
                type="email"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="E-mail"
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 10,
                  border: "2px solid #e9ecef",
                  outline: "none",
                  fontSize: "0.95rem",
                  transition: "border-color 0.2s",
                  backgroundColor: "#f8f9fa",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--verde-escuro)")
                }
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--verde-escuro)",
                }}
              >
                Senha
              </label>
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 10,
                  border: "2px solid #e9ecef",
                  outline: "none",
                  fontSize: "0.95rem",
                  transition: "border-color 0.2s",
                  backgroundColor: "#f8f9fa",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--verde-escuro)")
                }
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 10,
                background: "var(--verde-escuro)",
                color: "white",
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.2s ease",
                boxShadow: "0 8px 15px rgba(10, 60, 30, 0.2)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Entrar no Painel
            </button>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Link
                href="/"
                style={{
                  color: "#adb5bd",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--verde-escuro)")
                }
                onMouseOut={(e) => (e.currentTarget.style.color = "#adb5bd")}
              >
                &larr; Voltar ao site
              </Link>
            </div>
          </form>
        </div>

        {/* Lado Direito - Bois Curiosos */}
        <div
          style={{
            flex: "1 1 35%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 40,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/bois_curiosos_bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #ffffff -5%, transparent 25%, transparent 70%, rgba(0,0,0,0.2) 100%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              padding: "24px 32px",
              borderRadius: "30px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              maxWidth: 380,
              alignSelf: "center",
              transform: "translateY(-40px)",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "var(--verde-escuro)",
                fontSize: "1.4rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Muuuu? 🤨🐄
            </h3>
            <p
              style={{
                margin: "12px 0 0",
                color: "#495057",
                fontWeight: 500,
                fontSize: "1.05rem",
                lineHeight: 1.6,
              }}
            >
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
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "var(--verde-escuro)",
          color: "white",
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div style={{ padding: "0 24px", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              margin: 0,
              color: "var(--ouro)",
            }}
          >
            Alternativa Admin
          </h2>
          <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
            Painel de Controle
          </span>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                href="/admin"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 24px",
                  color: "white",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                <FileText size={20} />
                Artigos do Blog
              </Link>
            </li>
            <li>
              <Link
                href="/admin/produtos"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 24px",
                  color: "white",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.05)",
                  marginTop: 4,
                }}
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 24px",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                }}
              >
                <PlayCircle size={20} />
                Vídeos
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ padding: "24px" }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            <ArrowLeft size={16} />
            Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: "auto" }}>
        <header
          style={{
            background: "white",
            padding: "16px 32px",
            borderBottom: "1px solid #e9ecef",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--cinza-texto)",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            <LogOut size={16} />
            Sair
          </button>
        </header>
        <div style={{ padding: 32 }}>{children}</div>
      </main>
    </div>
  );
}
