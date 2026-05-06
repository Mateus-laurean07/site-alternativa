"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { produtos } from "@/data/produtos";
import { ChevronDown } from "lucide-react";
import NavbarTicker from "@/components/NavbarTicker";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/produtos", label: t("nav.products"), hasDropdown: true },
    { href: "/sobre", label: t("nav.about") },
    { href: "/videos", label: t("nav.videos") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contato", label: t("nav.contact") },
  ];

  // Organizar produtos por categoria para o dropdown
  const categoriasDropdown = [
    "Protecocho",
    "Hidramax",
    "Multicocho",
    "Nutrisilo",
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = "rgba(255,255,255,0.95)";

  // Logo muda conforme idioma
  const logoMap: Record<string, string> = {
    PT: "/images/logo/Alternativa Comederos - Horizontal branca2.png",
    EN: "/images/logo/Alternativa Comederos - Horizontal branca1.png",
    ES: "/images/logo/Alternativa Comederos - Horizontal branca2.png",
  };
  const logoSrc = logoMap[language] || logoMap.PT;

  return (
    <nav
      className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}
      style={{ padding: 0 }}
    >
      {/* ── Faixa de Cotações (componente independente, não re-monta com idioma) ── */}
      <NavbarTicker />

      {/* ── Linha principal do menu ── */}
      <div style={{ padding: "0 24px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 88,
            transition: "height 0.3s ease",
          }}
        >
          {/* Logo — ES é quadrada, precisa de mais altura */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <img
              src={logoSrc}
              alt="Alternativa Cochos e Bebedouros"
            style={{
              height: "64px",
              width: "auto",
              objectFit: "contain",
            }}
            />
          </Link>

          {/* Desktop Nav */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {navLinks.map((link) => (
              <div
                key={link.href}
                style={{ position: "relative" }}
                onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
              >
                <Link
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    color: textColor,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    borderRadius: 8,
                    transition: "all 0.2s ease",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#f0c060";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = textColor;
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                  }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      style={{
                        transition: "transform 0.2s",
                        transform: dropdownOpen ? "rotate(180deg)" : "none",
                      }}
                    />
                  )}
                </Link>

                {/* Submenu Produtos */}
                {link.hasDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      minWidth: 720,
                      background: "#f4f4f4", // Light gray background to match image
                      borderRadius: 16,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      padding: 32,
                      display: dropdownOpen ? "block" : "none",
                      opacity: dropdownOpen ? 1 : 0,
                      transform: dropdownOpen
                        ? "translate(-50%, 0)"
                        : "translate(-50%, 10px)",
                      transition: "all 0.2s ease",
                      pointerEvents: dropdownOpen ? "auto" : "none",
                      zIndex: 100,
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "32px 24px",
                      }}
                    >
                      {[
                        { key: "Multicocho", title: "Linha Multicocho" },
                        { key: "Protecocho", title: "Linha Protecocho" },
                        { key: "Hidramax", title: "Linha Hidramax" },
                        { key: "Nutrisilo", title: "Linha Nutrisilo" },
                        { key: "Suínos", title: "Linha Suínos" },
                      ].map((categoriaObj) => {
                        const prods = produtos.filter(
                          (p) =>
                            p.categoria === categoriaObj.key ||
                            p.categoria_en === categoriaObj.key,
                        );
                        return (
                          <div key={categoriaObj.key}>
                            <div
                              style={{
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: "#118D37", // Green title exactly matching image
                                marginBottom: 20,
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {language === "ES"
                                ? categoriaObj.title.replace("Linha", "Línea")
                                : language === "EN"
                                  ? prods[0]?.categoria_en || categoriaObj.key
                                  : categoriaObj.title}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                              }}
                            >
                              {prods.map((p) => (
                                <Link
                                  key={p.id}
                                  href={`/produtos/${p.slug}`}
                                  style={{
                                    fontSize: "0.95rem",
                                    color: "#64748B", // Slate gray matching image
                                    textDecoration: "none",
                                    transition: "color 0.2s ease",
                                    fontWeight: 400,
                                    fontFamily: "'Inter', sans-serif",
                                  }}
                                  onMouseEnter={(e) => {
                                    (
                                      e.currentTarget as HTMLElement
                                    ).style.color = "#118D37";
                                  }}
                                  onMouseLeave={(e) => {
                                    (
                                      e.currentTarget as HTMLElement
                                    ).style.color = "#6b7280";
                                  }}
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  {language === "EN"
                                    ? p.nome_en || p.nome
                                    : p.nome}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div
              style={{ position: "relative", marginLeft: 8, marginRight: 8 }}
            >
              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value as "PT" | "EN" | "ES")
                }
                style={{
                  appearance: "none",
                  background: "white",
                  border: "none",
                  borderRadius: 20,
                  padding: "6px 28px 6px 12px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--verde-escuro)",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="PT">🇧🇷 PT</option>
                <option value="EN">🇺🇸 EN</option>
                <option value="ES">🇪🇸 ES</option>
              </select>
              <ChevronDown
                size={14}
                color="var(--verde-escuro)"
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
            </div>
            <Link
              href="/contato"
              className="btn-ouro"
              style={{ padding: "10px 24px", fontSize: "0.85rem" }}
            >
              {t("nav.quote")}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: "white",
          }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          <div
            style={{
              width: 24,
              height: 2,
              background: "white",
              marginBottom: 5,
              transition: "all 0.3s",
              transform: menuOpen
                ? "rotate(45deg) translate(5px, 5px)"
                : "none",
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: "white",
              marginBottom: 5,
              opacity: menuOpen ? 0 : 1,
              transition: "all 0.3s",
            }}
          />
          <div
            style={{
              width: 24,
              height: 2,
              background: "white",
              transition: "all 0.3s",
              transform: menuOpen
                ? "rotate(-45deg) translate(5px, -5px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(26,58,31,0.98)",
            padding: "20px 24px 28px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => !link.hasDropdown && setMenuOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "Inter, sans-serif",
                  textDecoration: "none",
                }}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    size={18}
                    style={{ opacity: 0.5 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(!dropdownOpen);
                    }}
                  />
                )}
              </Link>
              {link.hasDropdown && dropdownOpen && (
                <div
                  style={{
                    padding: "12px 0 12px 16px",
                    background: "rgba(0,0,0,0.15)",
                    borderRadius: 8,
                    marginTop: 8,
                  }}
                >
                  {categoriasDropdown.map((categoria) => {
                    const prods = produtos.filter(
                      (p) =>
                        p.categoria === categoria ||
                        p.categoria_en === categoria,
                    );
                    return (
                      <div key={categoria} style={{ marginBottom: 12 }}>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "var(--ouro)",
                            textTransform: "uppercase",
                            marginBottom: 6,
                          }}
                        >
                          {language === "ES"
                            ? categoria
                            : language === "EN"
                              ? prods[0]?.categoria_en || categoria
                              : categoria}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                          }}
                        >
                          {prods.map((p) => (
                            <Link
                              key={p.id}
                              href={`/produtos/${p.slug}`}
                              onClick={() => {
                                setMenuOpen(false);
                                setDropdownOpen(false);
                              }}
                              style={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "0.9rem",
                                textDecoration: "none",
                              }}
                            >
                              {language === "EN" ? p.nome_en || p.nome : p.nome}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            {(["PT", "EN", "ES"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: language === lang ? "white" : "transparent",
                  color: language === lang ? "var(--verde-escuro)" : "white",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                {lang === "PT" ? "🇧🇷 PT" : lang === "EN" ? "🇺🇸 EN" : "🇪🇸 ES"}
              </button>
            ))}
          </div>

          <Link
            href="/contato"
            className="btn-ouro"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 20,
              display: "inline-flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {t("nav.quote")}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
