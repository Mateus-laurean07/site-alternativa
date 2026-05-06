"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, Gem, Users, Microscope, Handshake, Truck } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

import { useLanguage } from "@/contexts/LanguageContext";

export default function SobrePage() {
  const { language } = useLanguage();

  const mvv = [
    { icon: <Target size={32} />, titulo: language === "PT" ? "Missão" : "Mission", texto: language === "PT" ? "Fornecer soluções inovadoras e de alta resistência para o manejo pecuário, focando no bem-estar animal e na eficiência produtiva do agronegócio." : "Provide innovative and high-resistance solutions for livestock management, focusing on animal welfare and agribusiness production efficiency." },
    { icon: <Eye size={32} />, titulo: language === "PT" ? "Visão" : "Vision", texto: language === "PT" ? "Ser a marca referência em tecnologia de cochos e bebedouros em todo o território nacional, reconhecida pela durabilidade e qualidade incomparável." : "To be the benchmark brand in trough and drinker technology throughout the national territory, recognized for its durability and incomparable quality." },
    { icon: <Gem size={32} />, titulo: language === "PT" ? "Valores" : "Values", texto: language === "PT" ? "Qualidade acima de tudo, honestidade nas relações, inovação constante, respeito ao produtor, sustentabilidade ambiental e orgulho pelo agronegócio brasileiro." : "Quality above all, honesty in relationships, constant innovation, respect for the producer, environmental sustainability, and pride in Brazilian agribusiness." },
  ];

  const timeline = [
    { ano: "2011", evento: language === "PT" ? "Fundação da Alternativa Plásticos em Lucas do Rio Verde/MT" : "Foundation of Alternativa Plásticos in Lucas do Rio Verde/MT" },
    { ano: "2013", evento: language === "PT" ? "Lançamento do Protecocho, pioneiro em cochos cobertos plásticos" : "Launch of Protecocho, pioneer in plastic covered troughs" },
    { ano: "2015", evento: language === "PT" ? "Expansão da linha com Multicochos para confinamento" : "Line expansion with Multicochos for feedlot" },
    { ano: "2018", evento: language === "PT" ? "Início das exportações e cobertura nacional" : "Beginning of exports and national coverage" },
    { ano: "2021", evento: language === "PT" ? "10 anos de história — lançamento do Hidramax 1300" : "10 years of history — launch of Hidramax 1300" },
    { ano: "2023", evento: language === "PT" ? "Lançamento do Nutrisilo, solução completa de armazenamento" : "Launch of Nutrisilo, a complete storage solution" },
    { ano: "2025", evento: language === "PT" ? "Nova identidade visual e expansão para suinocultura" : "New visual identity and expansion to swine farming" },
  ];

  const equipe = [
    { nome: language === "PT" ? "Fundadores" : "Founders", cargo: language === "PT" ? "Visão e liderança" : "Vision and leadership", icon: <Users size={48} /> },
    { nome: "P&D", cargo: language === "PT" ? "Inovação e desenvolvimento" : "Innovation and development", icon: <Microscope size={48} /> },
    { nome: language === "PT" ? "Comercial" : "Commercial", cargo: language === "PT" ? "Atendimento ao produtor" : "Producer service", icon: <Handshake size={48} /> },
    { nome: language === "PT" ? "Logística" : "Logistics", cargo: language === "PT" ? "Entrega nacional" : "National delivery", icon: <Truck size={48} /> },
  ];

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", paddingTop: 120, paddingBottom: 80, overflow: "hidden" }}>
        {/* Background Image */}
        <Image 
          src="/images/sobre/DSC_8353.webp" 
          alt="Boi Curioso" 
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
            <span style={{ color: "white" }}>{language === "PT" ? "Sobre Nós" : "About Us"}</span>
          </div>
          <div style={{ maxWidth: 680 }}>
            <span className="badge badge-ouro" style={{ marginBottom: 20, display: "inline-block" }}>{language === "PT" ? "Nossa História" : "Our History"}</span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "white", marginBottom: 20 }}
            >
              {language === "PT" ? "O Parceiro Ideal do Pecuarista Brasileiro" : "The Ideal Partner for the Brazilian Breeder"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.15rem", lineHeight: 1.8 }}
            >
              {language === "PT" ? "Desde 2011 em Lucas do Rio Verde/MT, a Alternativa Plásticos acompanha a evolução do agronegócio oferecendo soluções que promovem produtividade, bem-estar animal e sustentabilidade." : "Since 2011 in Lucas do Rio Verde/MT, Alternativa Plásticos has followed the evolution of agribusiness by offering solutions that promote productivity, animal welfare, and sustainability."}
            </motion.p>
          </div>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <span className="badge">{language === "PT" ? "Fundação" : "Foundation"}</span>
              <h2 className="section-title" style={{ marginTop: 16 }}>{language === "PT" ? "Como Tudo Começou" : "How It All Started"}</h2>
              <div className="divider-verde" />
              <p className="section-subtitle" style={{ marginBottom: 20 }}>
                {language === "PT" ? "A Alternativa nasceu da necessidade real dos produtores rurais do Centro-Oeste: cochos duráveis, práticos e que realmente protegessem o investimento em suplementação." : "Alternativa was born from the real need of rural producers in the Midwest: durable, practical troughs that truly protected their supplement investment."}
              </p>
              <p style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginBottom: 20 }}>
                {language === "PT" ? "Pioneira em cochos plásticos de alta resistência no Brasil, a empresa revolucionou o mercado ao lançar o Protecocho — um cocho coberto que reduzia drasticamente o desperdício de suplemento mineral no período das chuvas." : "A pioneer in high-resistance plastic troughs in Brazil, the company revolutionized the market by launching Protecocho — a covered trough that drastically reduced mineral supplement waste during the rainy season."}
              </p>
              <p style={{ color: "var(--cinza-texto)", lineHeight: 1.8, marginBottom: 36 }}>
                {language === "PT" ? "Hoje, atendemos produtores em todos os estados brasileiros, com uma linha completa que vai do armazenamento (Nutrisilo) à hidratação (Hidramax), passando por toda a alimentação do rebanho." : "Today, we serve producers in all Brazilian states, with a complete line ranging from storage (Nutrisilo) to hydration (Hidramax), covering all aspects of herd feeding."}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { num: "14+", label: language === "PT" ? "Anos de mercado" : "Years in the market" },
                  { num: "5k+", label: language === "PT" ? "Clientes ativos" : "Active customers" },
                  { num: "100%", label: language === "PT" ? "Território nacional" : "National territory" },
                  { num: "12+", label: language === "PT" ? "Produtos na linha" : "Products in line" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "var(--verde-suave)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--verde-escuro)", fontFamily: "Playfair Display, serif" }}>{s.num}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--cinza-texto)", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Timeline */}
            <div>
              <h3 style={{ color: "var(--verde-escuro)", marginBottom: 32 }}>{language === "PT" ? "Nossa Linha do Tempo" : "Our Timeline"}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {timeline.map((t, i) => (
                  <div key={t.ano} style={{ display: "flex", gap: 20, paddingBottom: 24, position: "relative" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, background: "var(--gradient-verde)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "0.75rem", flexShrink: 0 }}>
                        {t.ano}
                      </div>
                      {i < timeline.length - 1 && <div style={{ width: 2, flex: 1, background: "var(--cinza-medio)", marginTop: 8 }} />}
                    </div>
                    <div style={{ paddingTop: 10 }}>
                      <p style={{ color: "var(--cinza-texto)", fontSize: "0.9rem", lineHeight: 1.6 }}>{t.evento}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MVV */}
      <section className="section-padding" style={{ background: "var(--cinza-claro)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="badge">{language === "PT" ? "Propósito" : "Purpose"}</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>{language === "PT" ? "Missão, Visão e Valores" : "Mission, Vision and Values"}</h2>
            <div className="divider-verde" style={{ margin: "16px auto 0" }} />
          </div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}
          >
            {mvv.map((item) => (
              <motion.div key={item.titulo} variants={fadeInUp} className="feature-card">
                <div style={{ color: "var(--verde-escuro)", marginBottom: 20 }}>{item.icon}</div>
                <h3 style={{ color: "var(--verde-escuro)", marginBottom: 16, fontSize: "1.4rem" }}>{item.titulo}</h3>
                <p style={{ color: "var(--cinza-texto)", lineHeight: 1.7 }}>{item.texto}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALERIA DE IMAGENS */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, height: 400 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ position: "relative", borderRadius: 24, overflow: "hidden" }}
            >
              <Image src="/images/sobre/DSC_8354.webp" alt="Pecuária Nacional" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ position: "relative", borderRadius: 24, overflow: "hidden" }}
            >
              <Image src="/images/sobre/DSC_8358.webp" alt="Gado no pasto" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="badge">{language === "PT" ? "Nosso Time" : "Our Team"}</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>{language === "PT" ? "Quem faz a Alternativa acontecer" : "Who makes Alternativa happen"}</h2>
            <div className="divider-verde" style={{ margin: "16px auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {equipe.map((e) => (
              <div key={e.nome} style={{ background: "var(--cinza-claro)", borderRadius: 20, padding: 32, textAlign: "center", border: "1px solid var(--cinza-medio)" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16, display: "flex", justifyContent: "center", color: "var(--verde-escuro)" }}>{e.icon}</div>
                <h4 style={{ color: "var(--verde-escuro)", marginBottom: 8 }}>{e.nome}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--cinza-texto)" }}>{e.cargo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--gradient-verde)", padding: "72px 24px", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "white", marginBottom: 16 }}>{language === "PT" ? "Faça parte da família Alternativa" : "Be part of the Alternativa family"}</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
            {language === "PT" ? "Junte-se a milhares de produtores que já transformaram sua pecuária com os produtos Alternativa." : "Join thousands of producers who have already transformed their livestock with Alternativa products."}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/produtos" className="btn-ouro">{language === "PT" ? "Ver Nossos Produtos" : "View Our Products"}</Link>
            <Link href="/contato" className="btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}>{language === "PT" ? "Fale Conosco" : "Contact Us"}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
