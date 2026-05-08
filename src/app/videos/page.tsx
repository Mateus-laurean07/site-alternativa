"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

const videos = [
  {
    id: "v1",
    titulo: "Institucional Pecuária 2025",
    videoId: "xbBzBFn4mfs",
    descricao: "Conheça a Alternativa Plásticos e nosso compromisso com a qualidade no campo."
  },
  {
    id: "v2",
    titulo: "Montagem Nutrisilo",
    videoId: "UNEwue5zkcU",
    descricao: "Passo a passo da montagem do Nutrisilo, garantindo armazenamento seguro."
  },
  {
    id: "v3",
    titulo: "Montagem Hidramax",
    videoId: "4DezhOi46nU",
    descricao: "Veja como instalar nosso bebedouro de alta capacidade, garantindo água limpa e fresca."
  },
  {
    id: "v4",
    titulo: "Montagem Multicocho 200 com pé H",
    videoId: "g66lC-OzSn4",
    descricao: "Instruções de montagem do Multicocho com suporte tipo H."
  },
  {
    id: "v5",
    titulo: "Montagem Protecocho (200 e 250)",
    videoId: "xAu_CRMpq8Y",
    descricao: "Tutorial de instalação da nossa linha de cochos cobertos."
  },
  {
    id: "v6",
    titulo: "Montagem Autoabastecimento e Creep",
    videoId: "SZDaTakxMrM",
    descricao: "Como montar os cochos de autoabastecimento e Creep Feeding."
  },
  {
    id: "v7",
    titulo: "Depoimento: Grelhas Suínas",
    videoId: "mOoEgUjTo0w",
    descricao: "O produtor relata a experiência com nossas soluções para suinocultura."
  },
  {
    id: "v8",
    titulo: "Institucional Suinocultura 2025",
    videoId: "AsWxgDtV844",
    descricao: "Nossas soluções de alta resistência voltadas para a suinocultura."
  }
];

export default function VideosPage() {
  return (
    <>
      {/* Header */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 64, overflow: "hidden" }}>
        {/* Background Image */}
        <Image 
          src="/images/sobre/DSC_8358.JPG" 
          alt="Gado no pasto" 
          fill 
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 0 }} 
          priority
        />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(15,26,16,0.95) 0%, rgba(26,58,31,0.85) 100%)", zIndex: 1 }} />
        
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="breadcrumb" style={{ marginBottom: 16, justifyContent: "center" }}>
              <Link href="/" style={{ color: "rgba(255,255,255,0.6)" }}>Início</Link>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
              <span style={{ color: "white" }}>Vídeos</span>
            </div>
            <span className="badge badge-ouro" style={{ marginBottom: 16, display: "inline-block" }}>Na Prática</span>
            <h1 style={{ fontSize: "2.5rem", marginBottom: 16, color: "white" }}>Vídeos Alternativa</h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
              Acompanhe nossos produtos no campo, manuais de montagem e depoimentos de quem já transformou a propriedade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Galeria de Vídeos */}
      <section className="section-padding" style={{ background: "var(--cinza-claro)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
            {videos.map((video, index) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  background: "white", 
                  borderRadius: 16, 
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--cinza-medio)",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#000" }}>
                  <iframe
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                    src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
                    title={video.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--verde-escuro)", marginBottom: 12 }}>{video.titulo}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--cinza-texto)", lineHeight: 1.6, flex: 1 }}>
                    {video.descricao}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginTop: 64 }}
          >
            <p style={{ color: "var(--cinza-texto)", marginBottom: 24 }}>
              Quer ver mais conteúdos? Acesse nosso canal oficial no YouTube.
            </p>
            <a 
              href="https://www.youtube.com/channel/UCZp2amnWqefSu2LKuiydwPg" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <PlayCircle size={20} />
              Acessar Canal do YouTube
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--gradient-verde)", padding: "80px 24px", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "white", marginBottom: 16 }}>Viu como funciona na prática?</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
            Garanta essa qualidade e durabilidade no seu rebanho.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contato" className="btn-ouro">Solicitar Orçamento</Link>
            <Link href="/produtos" className="btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
