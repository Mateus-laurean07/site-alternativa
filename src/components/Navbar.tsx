"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/produtos", label: t("nav.products") },
    { href: "/sobre", label: t("nav.about") },
    { href: "/videos", label: t("nav.videos") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contato", label: t("nav.contact") },
  ];


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
          height: 88, // Aumentado para comportar uma logo maior
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
            <Link
              key={link.href}
              href={link.href}
              style={{
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
                (e.target as HTMLElement).style.color = "#f0c060";
                (e.target as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = textColor;
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
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
            <svg 
              width="10" height="6" viewBox="0 0 10 6" fill="none" 
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            >
              <path d="M1 1L5 5L9 1" stroke="var(--verde-escuro)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                fontSize: "1.05rem",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "Inter, sans-serif",
              }}
            >
            {link.label}
            </Link>
          ))}
          
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button 
              onClick={() => setLanguage("PT")} 
              style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: language === "PT" ? "white" : "transparent", color: language === "PT" ? "var(--verde-escuro)" : "white", fontWeight: 600 }}
            >
              PT
            </button>
            <button 
              onClick={() => setLanguage("EN")} 
              style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)", background: language === "EN" ? "white" : "transparent", color: language === "EN" ? "var(--verde-escuro)" : "white", fontWeight: 600 }}
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
