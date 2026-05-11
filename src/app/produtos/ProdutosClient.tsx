"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AutoImageCarousel from "@/components/AutoImageCarousel";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

interface ProdutosClientProps {
  initialProdutos: any[];
  categorias: any[];
}

export default function ProdutosClient({ initialProdutos, categorias }: ProdutosClientProps) {
  const { language } = useLanguage();
  const [catAtiva, setCatAtiva] = useState("todos");
  
  // Apenas produtos disponíveis
  const produtosDisponiveis = initialProdutos.filter(p => p.disponivel !== false);
  const lista = catAtiva === "todos" ? produtosDisponiveis : produtosDisponiveis.filter((p) => p.categoria === catAtiva);

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 64, overflow: "hidden" }}>
        {/* Background Image */}
        <Image 
          src="/images/sobre/DSC_8354.JPG" 
          alt="Bovinos no pasto" 
          fill 
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 0 }} 
          priority
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(15,26,16,0.95) 0%, rgba(26,58,31,0.85) 100%)", zIndex: 1 }} />
        
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="breadcrumb" style={{ marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>{language === "PT" ? "Início" : "Home"}</Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
            <span style={{ color: "white" }}>{language === "PT" ? "Produtos" : "Products"}</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: "white" }}
          >
            {language === "PT" ? "Nossa Linha Completa" : "Our Complete Line"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.75)", marginTop: 12, maxWidth: 560 }}
          >
            {language === "PT" ? "Cochos e bebedouros de alta resistência para bovinos. Escolha o produto ideal para o seu rebanho." : "High-resistance troughs and drinkers for cattle. Choose the ideal product for your herd."}
          </motion.p>
        </div>
      </section>

      {/* FILTROS */}
      <section style={{ background: "white", boxShadow: "var(--shadow-sm)", position: "sticky", top: 72, zIndex: 100, borderBottom: "1px solid var(--cinza-medio)" }}>
        <div className="container" style={{ padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "16px 0" }}>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCatAtiva(cat.id)}
                style={{
                  padding: "10px 24px",
                  borderRadius: 999,
                  border: catAtiva === cat.id ? "none" : "2px solid var(--cinza-medio)",
                  background: catAtiva === cat.id ? "var(--gradient-verde)" : "transparent",
                  color: catAtiva === cat.id ? "white" : "var(--cinza-texto)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {cat.id === "todos" ? (language === "PT" ? "Todos" : "All") : cat.nome}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="section-padding">
        <div className="container">
          <p style={{ color: "var(--cinza-texto)", marginBottom: 32, fontSize: "0.9rem" }}>
            {lista.length} {language === "PT" ? `produto${lista.length !== 1 ? "s" : ""} encontrado${lista.length !== 1 ? "s" : ""}` : `product${lista.length !== 1 ? "s" : ""} found`}
          </p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}
          >
            {lista.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/produtos/${p.slug}`} className="produto-card" style={{ textDecoration: "none" }}>
                  <div className="produto-card-image" style={{ position: "relative", width: "100%", height: "240px", overflow: "hidden", background: "white" }}>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      style={{ width: "100%", height: "100%", position: "relative" }}
                    >
                      <AutoImageCarousel 
                        images={[p.imagem, ...(p.imagens || [])]} 
                        alt={p.nome} 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                    {p.tag && (
                      <span style={{ position: "absolute", top: 16, left: 16, background: "var(--gradient-ouro)", color: "var(--preto)", padding: "4px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700, zIndex: 2 }}>
                        {p.tag === "Mais Vendido" && language !== "PT" ? "Best Seller" : (p.tag === "Novo" && language !== "PT" ? "New" : (p.tag === "Lançamento" && language !== "PT" ? "Launch" : p.tag))}
                      </span>
                    )}
                    {!p.disponivel && (
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
                        <span style={{ color: "white", fontWeight: 700 }}>{language === "PT" ? "Indisponível" : "Unavailable"}</span>
                      </div>
                    )}
                  </div>
                  <div className="produto-card-body">
                    <div style={{ fontSize: "0.75rem", color: "var(--verde-medio)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{language === "PT" ? p.categoria : p.categoria_en || p.categoria}</div>
                    <h3 className="produto-card-title">{language === "PT" ? p.nome : p.nome_en || p.nome}</h3>
                    <p className="produto-card-desc">{language === "PT" ? p.descricao : p.descricao_en || p.descricao}</p>
                    {p.capacidade && (
                      <div style={{ display: "inline-block", padding: "4px 12px", background: "var(--verde-suave)", borderRadius: 20, fontSize: "0.8rem", color: "var(--verde-medio)", fontWeight: 600, marginBottom: 16 }}>
                        {p.capacidade}
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--verde-medio)", fontWeight: 600, fontSize: "0.9rem" }}>
                      {language === "PT" ? "Ver detalhes" : "View details"} →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--verde-suave)", padding: "64px 24px", textAlign: "center" }}>
        <div className="container">
          <h2 className="section-title">{language === "PT" ? "Não encontrou o que precisa?" : "Didn't find what you need?"}</h2>
          <p className="section-subtitle" style={{ margin: "16px auto 32px" }}>
            {language === "PT" ? "Entre em contato e nossa equipe encontrará a solução ideal para sua propriedade." : "Contact us and our team will find the ideal solution for your property."}
          </p>
          <a href="https://wa.me/5565999902024" target="_blank" rel="noreferrer" className="btn-whatsapp" style={{ display: "inline-flex" }}>
            {language === "PT" ? "Falar com Especialista" : "Talk to a Specialist"}
          </a>
        </div>
      </section>
    </>
  );
}
