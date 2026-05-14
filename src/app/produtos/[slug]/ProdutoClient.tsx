"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Produto } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import AutoImageCarousel from "@/components/AutoImageCarousel";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";

interface ProdutoClientProps {
  produto: Produto;
  relacionados: Produto[];
}

export default function ProdutoClient({
  produto,
  relacionados,
}: ProdutoClientProps) {
  const { language } = useLanguage();
  const galeria = [produto.imagem, ...(produto.imagens || [])];
  const [imagemIdx, setImagemIdx] = useState(0);

  const prevImage = () =>
    setImagemIdx((i) => (i === 0 ? galeria.length - 1 : i - 1));
  const nextImage = () =>
    setImagemIdx((i) => (i === galeria.length - 1 ? 0 : i + 1));

  const whatsappMsg = encodeURIComponent(
    language === "PT"
      ? `Olá! Tenho interesse no produto ${produto.nome}. Gostaria de um orçamento.`
      : `Hello! I'm interested in the product ${produto.nome_en || produto.nome}. I would like a quote.`
  );

  return (
    <>
      {/* BREADCRUMB HEADER */}
      <section
        style={{
          background: "var(--gradient-verde)",
          paddingTop: 100,
          paddingBottom: 40,
        }}
      >
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: 12 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>
              {language === "PT" ? "Início" : "Home"}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <Link href="/produtos" style={{ color: "rgba(255,255,255,0.6)" }}>
              {language === "PT" ? "Produtos" : "Products"}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ color: "white" }}>
              {language === "PT"
                ? produto.nome
                : produto.nome_en || produto.nome}
            </span>
          </div>
          <span
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              padding: "4px 14px",
              borderRadius: 20,
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {language === "PT"
              ? produto.categoria
              : produto.categoria_en || produto.categoria}
          </span>
        </div>
      </section>

      {/* PRODUTO DETALHE */}
      <section className="section-padding-sm">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 7fr",
              gap: 48,
              alignItems: "start",
            }}
          >
            {/* GALERIA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Imagem principal */}
              <div
                style={{
                  background: "white",
                  borderRadius: 16,
                  border: "1px solid #eaeaea",
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "4 / 3",
                }}
              >
                <Image
                  src={galeria[imagemIdx]}
                  alt={produto.nome}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                  priority
                />

                {produto.tag && (
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "#f0c14b",
                      color: "var(--preto)",
                      padding: "4px 12px",
                      borderRadius: 12,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      zIndex: 10,
                    }}
                  >
                    {language === "PT"
                      ? produto.tag
                      : produto.tag_en || produto.tag}
                  </div>
                )}

                {galeria.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Imagem anterior"
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(255,255,255,0.88)",
                        border: "none",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 10,
                      }}
                    >
                      <ChevronLeft size={18} color="#333" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Próxima imagem"
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(255,255,255,0.88)",
                        border: "none",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 10,
                      }}
                    >
                      <ChevronRight size={18} color="#333" />
                    </button>
                  </>
                )}
              </div>

            </div>

            {/* INFO */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <h1
                style={{
                  color: "var(--verde-escuro)",
                  fontSize: "2.4rem",
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {language === "PT"
                  ? produto.nome
                  : produto.nome_en || produto.nome}
              </h1>

              <p style={{ color: "#555", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
                {language === "PT"
                  ? produto.descricao
                  : produto.descricao_en || produto.descricao}
              </p>

              {/* Benefícios */}
              <div
                style={{
                  background: "#eef7ee",
                  borderRadius: 12,
                  padding: "20px 24px",
                }}
              >
                <h4
                  style={{
                    color: "var(--verde-escuro)",
                    marginBottom: 14,
                    fontSize: "1rem",
                    fontWeight: 700,
                  }}
                >
                  {language === "PT" ? "Benefícios" : "Benefits"}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {(language === "PT"
                    ? produto.beneficios
                    : produto.beneficios_en || produto.beneficios
                  ).map((b) => (
                    <li
                      key={b}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        color: "var(--verde-escuro)",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <a
                  href={`https://wa.me/5565999902024?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "14px",
                    background: "#25D366",
                    color: "white",
                    borderRadius: 999,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  {language === "PT"
                    ? "Solicitar Orçamento via WhatsApp"
                    : "Request Quote via WhatsApp"}
                </a>

                <Link
                  href="/contato"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px",
                    border: "1px solid var(--verde-escuro)",
                    color: "var(--verde-escuro)",
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                    background: "white",
                  }}
                >
                  {language === "PT" ? "Formulário de Contato" : "Contact Form"}
                </Link>

                {produto.manual && (
                  <a
                    href={produto.manual}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "13px",
                      border: "1px solid #e0e0e0",
                      color: "var(--cinza-texto)",
                      borderRadius: 999,
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      background: "white",
                    }}
                  >
                    <FileText size={16} />
                    {language === "PT"
                      ? "Baixar Manual em PDF"
                      : "Download PDF Manual"}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ESPECIFICAÇÕES */}
          {produto.especificacoes?.length > 0 && (
            <div
              style={{
                marginTop: 56,
                background: "#f5f7f5",
                borderRadius: 16,
                padding: "36px 40px",
              }}
            >
              <h3
                style={{
                  color: "var(--verde-escuro)",
                  marginBottom: 24,
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                {language === "PT"
                  ? "Especificações Técnicas"
                  : "Technical Specifications"}
              </h3>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
              >
                {produto.especificacoes.map((e) => (
                  <div
                    key={e.chave}
                    style={{
                      background: "white",
                      borderRadius: 10,
                      padding: "16px 20px",
                      border: "1px solid #e4e4e4",
                      flex: "1 1 calc(20% - 14px)",
                      minWidth: 150,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.68rem",
                        color: "var(--cinza-texto)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 6,
                      }}
                    >
                      {language === "PT" ? e.chave : e.chave_en || e.chave}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--verde-escuro)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {language === "PT" ? e.valor : e.valor_en || e.valor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RELACIONADOS */}
      {relacionados.length > 0 && (
        <section
          className="section-padding-sm"
          style={{ background: "#f8f9fa", marginTop: 40 }}
        >
          <div className="container">
            <h3
              style={{
                color: "var(--verde-escuro)",
                marginBottom: 32,
                fontSize: "1.4rem",
                fontWeight: 700,
              }}
            >
              {language === "PT" ? "Produtos Relacionados" : "Related Products"}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {relacionados.map((p) => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.slug}`}
                  style={{
                    textDecoration: "none",
                    background: "white",
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "1px solid #eaeaea",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.2s",
                  }}
                >
                  <div
                    style={{
                      height: 220,
                      position: "relative",
                      overflow: "hidden",
                      background: "white",
                    }}
                  >
                    <AutoImageCarousel
                      images={[p.imagem, ...(p.imagens || [])]}
                      alt={p.nome}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div
                    style={{
                      padding: "20px 24px 24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      flex: 1,
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--verde-escuro)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {language === "PT" ? p.nome : p.nome_en || p.nome}
                    </h4>
                    <p
                      style={{
                        color: "var(--cinza-texto)",
                        fontSize: "0.85rem",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {language === "PT"
                        ? p.descricao
                        : p.descricao_en || p.descricao}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
