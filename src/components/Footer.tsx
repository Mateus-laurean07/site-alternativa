/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { language, t } = useLanguage();

  // Logo muda conforme idioma — cada idioma tem sua versão
  const logoMap: Record<string, string> = {
    PT: "/images/logo/Alternativa Comederos - Horizontal branca2.png",
    EN: "/images/logo/Alternativa Comederos - Horizontal branca1.png",
    ES: "/images/logo/Alternativa Comederos - ESP.png",
  };
  const logoSrc = logoMap[language] || logoMap.PT;

  return (
    <footer style={{ background: "var(--preto)", color: "white" }}>
      {/* Main Footer */}
      <div className="container" style={{ paddingTop: 64, paddingBottom: 48 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
          }}
        >
          {/* Empresa */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <img
                src={logoSrc}
                alt={t("brand.name")}
                style={{ height: 80, objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.9rem",
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              {language === "PT"
                ? "Pioneira em produtos plásticos de alta resistência, acompanhamos a evolução do agronegócio por mais de 14 anos."
                : "Pioneer in high-resistance plastic products, we have followed the evolution of agribusiness for over 14 years."}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["instagram", "facebook", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.8rem",
                    transition: "all 0.2s",
                    textTransform: "capitalize",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--verde-medio)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.6)";
                  }}
                >
                  {social.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Produtos */}
          <div>
            <h4
              style={{
                color: "var(--ouro)",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
              }}
            >
              {language === "PT" ? "Produtos" : "Products"}
            </h4>
            {[
              "Protecocho",
              "Hidramax 1300",
              "Multicocho",
              "Nutrisilo",
              "Creep Feeding",
              language === "PT" ? "Autoabastecimento" : "Self-supplying",
            ].map((item) => (
              <Link key={item} href={`/produtos`} className="footer-link">
                <span
                  style={{ color: "var(--verde-claro)", fontSize: "0.75rem" }}
                >
                  ›
                </span>
                {item}
              </Link>
            ))}
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                color: "var(--ouro)",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
              }}
            >
              {language === "PT" ? "Empresa" : "Company"}
            </h4>
            {[
              {
                label: language === "PT" ? "Sobre Nós" : "About Us",
                href: "/sobre",
              },
              { label: "Blog", href: "/blog" },
              {
                label: language === "PT" ? "Contato" : "Contact",
                href: "/contato",
              },
              {
                label: language === "PT" ? "Orçamento" : "Quote",
                href: "/contato",
              },
              {
                label: language === "PT" ? "Manuais" : "Manuals",
                href: "/produtos",
              },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="footer-link">
                <span
                  style={{ color: "var(--verde-claro)", fontSize: "0.75rem" }}
                >
                  ›
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contato */}
          <div>
            <h4
              style={{
                color: "var(--ouro)",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
              }}
            >
              {language === "PT" ? "Contato" : "Contact"}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="tel:+556535494354" className="footer-link">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.7 18" />
                </svg>
                +55 65 3549-4354
              </a>
              <a href="tel:+556599990202" className="footer-link">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.7 18" />
                </svg>
                +55 65 9999-0202
              </a>
              <a
                href="https://wa.me/5565999902024"
                target="_blank"
                className="footer-link"
                rel="noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                (65) 99990-2024 — SAC/Pós Vendas
              </a>
              <a
                href="mailto:atendimento@alternativamt.com.br"
                className="footer-link"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                atendimento@alternativamt.com.br
              </a>
              <div className="footer-link" style={{ cursor: "default" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>BR 163, KM 660 — Lucas do Rio Verde/MT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 24px",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.8rem",
              margin: 0,
            }}
          >
            © {year} Alternativa Plásticos.{" "}
            {language === "PT"
              ? "Todos os direitos reservados."
              : "All rights reserved."}
          </p>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.75rem",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>
              {language === "PT"
                ? "Desenvolvido com ❤️ por"
                : "Developed with ❤️ by"}
            </span>
            <a
              href="https://naveo.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/images/naveo-logo.png"
                alt="Naveo"
                style={{
                  height: 24,
                  width: "auto",
                  objectFit: "contain",
                  opacity: 0.8,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.15)";
                  (e.currentTarget as HTMLImageElement).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)";
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.8";
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
