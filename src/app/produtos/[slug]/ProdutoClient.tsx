"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Produto } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, ClipboardList } from "lucide-react";

interface ProdutoClientProps {
  produto: Produto;
  relacionados: Produto[];
}

export default function ProdutoClient({ produto, relacionados }: ProdutoClientProps) {
  const { language } = useLanguage();
  const [imagemAtual, setImagemAtual] = useState(produto.imagem);
  const galeria = [produto.imagem, ...(produto.imagens || [])];

  return (
    <>
      {/* BREADCRUMB HEADER */}
      <section style={{ background: "var(--gradient-verde)", paddingTop: 100, paddingBottom: 40 }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: 12 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>{language === "PT" ? "Início" : "Home"}</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <Link href="/produtos" style={{ color: "rgba(255,255,255,0.6)" }}>{language === "PT" ? "Produtos" : "Products"}</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ color: "white" }}>{language === "PT" ? produto.nome : produto.nome_en || produto.nome}</span>
          </div>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "4px 14px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600 }}>
            {language === "PT" ? produto.categoria : produto.categoria_en || produto.categoria}
          </span>
        </div>
      </section>

      {/* PRODUTO DETALHE */}
      <section className="section-padding-sm">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 48, alignItems: "start" }}>
            {/* GALERIA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "white", borderRadius: 20, height: 420, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--cinza-medio)", position: "relative", overflow: "hidden" }}>
                <Image 
                  src={imagemAtual} 
                  alt={produto.nome} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: "contain", padding: "16px" }} 
                  priority
                />
                {produto.tag && (
                  <div style={{ position: "absolute", top: 16, left: 16, background: "var(--gradient-ouro)", color: "var(--preto)", padding: "6px 16px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 700, zIndex: 10 }}>
                    ⭐ {language === "PT" ? produto.tag : produto.tag_en || produto.tag}
                  </div>
                )}
              </div>
              
              {/* THUMBNAILS */}
              {galeria.length > 1 && (
                <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                  {galeria.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setImagemAtual(img)}
                      style={{ 
                        width: 80, height: 80, flexShrink: 0, position: "relative", 
                        borderRadius: 12, overflow: "hidden", 
                        border: imagemAtual === img ? "2px solid #c9a84c" : "1px solid var(--cinza-medio)",
                        background: "white", cursor: "pointer", transition: "all 0.2s" 
                      }}
                    >
                      <Image src={img} alt={`Thumbnail ${idx}`} fill style={{ objectFit: "contain", padding: 8 }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* INFO */}
            <div>
              <h1 style={{ color: "var(--verde-escuro)", marginBottom: 16 }}>{language === "PT" ? produto.nome : produto.nome_en || produto.nome}</h1>
              <p style={{ fontSize: "1.1rem", color: "var(--cinza-texto)", lineHeight: 1.8, marginBottom: 32 }}>
                {language === "PT" ? produto.descricaoCompleta : produto.descricaoCompleta_en || produto.descricaoCompleta}
              </p>

              {/* Benefícios */}
              <div style={{ background: "var(--verde-suave)", borderRadius: 16, padding: 24, marginBottom: 32 }}>
                <h4 style={{ color: "var(--verde-escuro)", marginBottom: 16 }}>✅ {language === "PT" ? "Benefícios" : "Benefits"}</h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {(language === "PT" ? produto.beneficios : produto.beneficios_en || produto.beneficios).map((b) => (
                    <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--verde-escuro)", fontWeight: 500 }}>
                      <span style={{ color: "var(--verde-medio)", fontSize: "1.1rem" }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                <a
                  href={`https://wa.me/5565999902024?text=${language === "PT" ? `Olá! Tenho interesse no produto ${produto.nome}. Gostaria de um orçamento.` : `Hello! I'm interested in the product ${produto.nome_en || produto.nome}. I would like a quote.`}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp"
                  style={{ justifyContent: "center" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  {language === "PT" ? "Solicitar Orçamento via WhatsApp" : "Request Quote via WhatsApp"}
                </a>
                <Link href="/contato" className="btn-secondary" style={{ justifyContent: "center", textAlign: "center" }}>
                  {language === "PT" ? "Formulário de Contato" : "Contact Form"}
                </Link>
                {produto.manual && (
                  <a href={produto.manual} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", border: "2px solid var(--cinza-medio)", borderRadius: 999, color: "var(--cinza-texto)", fontWeight: 600, fontSize: "0.875rem", transition: "all 0.2s" }}>
                    <FileText size={18} /> {language === "PT" ? "Baixar Manual em PDF" : "Download PDF Manual"}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ESPECIFICAÇÕES */}
          <div style={{ marginTop: 64, background: "var(--cinza-claro)", borderRadius: 20, padding: 40 }}>
            <h3 style={{ color: "var(--verde-escuro)", marginBottom: 32, display: "flex", alignItems: "center", gap: 8 }}><ClipboardList size={24} /> {language === "PT" ? "Especificações Técnicas" : "Technical Specifications"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {produto.especificacoes.map((e) => (
                <div key={e.chave} style={{ background: "white", borderRadius: 12, padding: 20, border: "1px solid var(--cinza-medio)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--cinza-texto)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{language === "PT" ? e.chave : e.chave_en || e.chave}</div>
                  <div style={{ fontWeight: 700, color: "var(--verde-escuro)", fontSize: "1rem" }}>{language === "PT" ? e.valor : e.valor_en || e.valor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELACIONADOS */}
      {relacionados.length > 0 && (
        <section className="section-padding-sm" style={{ background: "var(--cinza-claro)", borderTop: "1px solid var(--cinza-medio)" }}>
          <div className="container">
            <h3 style={{ color: "var(--verde-escuro)", marginBottom: 32 }}>{language === "PT" ? "Produtos Relacionados" : "Related Products"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {relacionados.map((p) => (
                <Link key={p.id} href={`/produtos/${p.slug}`} className="produto-card" style={{ textDecoration: "none" }}>
                  <div className="produto-card-image" style={{ height: 180, position: "relative", overflow: "hidden", background: "white" }}>
                    <Image 
                      src={p.imagem} 
                      alt={p.nome} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "contain", padding: "16px" }} 
                    />
                  </div>
                  <div className="produto-card-body">
                    <h4 className="produto-card-title" style={{ fontSize: "1.1rem" }}>{language === "PT" ? p.nome : p.nome_en || p.nome}</h4>
                    <p className="produto-card-desc" style={{ fontSize: "0.85rem" }}>{language === "PT" ? p.descricao : p.descricao_en || p.descricao}</p>
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
