"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { produtos } from "@/data/produtos";
import { ChevronDown } from "lucide-react";

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
  const categoriasDropdown = ["Protecocho", "Hidramax", "Multicocho", "Nutrisilo"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = "rgba(255,255,255,0.95)";
  const logoSrc = "/images/logo/Alternativa Comederos - Horizontal branca2.png";

  return (
    <nav
      className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}
      style={{ padding: "0 24px" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 88,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <img 
            src={logoSrc} 
            alt="Alternativa Cochos e Bebedouros" 
            style={{ height: "64px", width: "auto", objectFit: "contain" }}
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
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = textColor;
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "none" }} />}
              </Link>

              {/* Submenu Produtos */}
              {link.hasDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    minWidth: 260,
                    background: "white",
                    borderRadius: 12,
                    boxShadow: "var(--shadow-md)",
                    padding: 16,
                    display: dropdownOpen ? "block" : "none",
                    opacity: dropdownOpen ? 1 : 0,
                    transform: dropdownOpen ? "translateY(0)" : "translateY(10px)",
                    transition: "all 0.2s ease",
                    pointerEvents: dropdownOpen ? "auto" : "none",
                    zIndex: 100,
                    border: "1px solid var(--cinza-medio)"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {categoriasDropdown.map(categoria => {
                      const prods = produtos.filter(p => p.categoria === categoria || p.categoria_en === categoria);
                      return (
                        <div key={categoria}>
                          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--verde-medio)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, borderBottom: "1px solid var(--cinza-medio)", paddingBottom: 4 }}>
                            {language === "PT" ? categoria : prods[0]?.categoria_en || categoria}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {prods.map(p => (
                              <Link
                                key={p.id}
                                href={`/produtos/${p.slug}`}
                                style={{
                                  fontSize: "0.85rem",
                                  color: "var(--preto-suave)",
                                  textDecoration: "none",
                                  padding: "6px 8px",
                                  borderRadius: 6,
                                  transition: "all 0.2s ease"
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = "var(--verde-suave)";
                                  (e.currentTarget as HTMLElement).style.color = "var(--verde-escuro)";
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.background = "transparent";
                                  (e.currentTarget as HTMLElement).style.color = "var(--preto-suave)";
                                }}
                                onClick={() => setDropdownOpen(false)}
                              >
                                {language === "PT" ? p.nome : p.nome_en || p.nome}
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
          <div style={{ position: "relative", marginLeft: 8, marginRight: 8 }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "PT" | "EN")}
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
                outline: "none"
              }}
            >
              <option value="PT">PT</option>
              <option value="EN">EN</option>
            </select>
            <ChevronDown size={14} color="var(--verde-escuro)" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          </div>
          <Link
            href="/contato"
            className="btn-ouro"
            style={{ padding: "10px 24px", fontSize: "0.85rem" }}
          >
            {t("nav.quote")}
          </Link>
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
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
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
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
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
                  textDecoration: "none"
                }}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={18} style={{ opacity: 0.5 }} onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen); }} />}
              </Link>
              {link.hasDropdown && dropdownOpen && (
                <div style={{ padding: "12px 0 12px 16px", background: "rgba(0,0,0,0.15)", borderRadius: 8, marginTop: 8 }}>
                  {categoriasDropdown.map(categoria => {
                    const prods = produtos.filter(p => p.categoria === categoria || p.categoria_en === categoria);
                    return (
                      <div key={categoria} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--ouro)", textTransform: "uppercase", marginBottom: 6 }}>
                          {language === "PT" ? categoria : prods[0]?.categoria_en || categoria}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {prods.map(p => (
                            <Link
                              key={p.id}
                              href={`/produtos/${p.slug}`}
                              onClick={() => { setMenuOpen(false); setDropdownOpen(false); }}
                              style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", textDecoration: "none" }}
                            >
                              {language === "PT" ? p.nome : p.nome_en || p.nome}
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
            <button 
              onClick={() => setLanguage("PT")} 
              style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: language === "PT" ? "white" : "transparent", color: language === "PT" ? "var(--verde-escuro)" : "white", fontWeight: 600, cursor: "pointer" }}
            >
              PT
            </button>
            <button 
              onClick={() => setLanguage("EN")} 
              style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: language === "EN" ? "white" : "transparent", color: language === "EN" ? "var(--verde-escuro)" : "white", fontWeight: 600, cursor: "pointer" }}
            >
              EN
            </button>
          </div>

          <Link
            href="/contato"
            className="btn-ouro"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: 20, display: "inline-flex", width: "100%", justifyContent: "center" }}
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
