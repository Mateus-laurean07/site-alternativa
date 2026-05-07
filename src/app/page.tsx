"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProdutosDestaque } from "@/data/produtos";
import { blogPosts } from "@/data/blog";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

import { useLanguage } from "@/contexts/LanguageContext";
import {
  Shield,
  Recycle,
  Box,
  HeartHandshake,
  Wrench,
  Truck,
  Calculator,
  Newspaper,
} from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();
  const [slide, setSlide] = useState(0);

  const heroSlides = [
    {
      bg: "linear-gradient(135deg, rgba(15,26,16,0.85) 0%, rgba(26,58,31,0.72) 100%), url('/images/hero/hero-1.webp') center/cover no-repeat",
      tag: language === "PT" ? "Desde 2011" : "Since 2011",
      titulo:
        language === "PT"
          ? "A Solução Completa para seu Rebanho"
          : "The Complete Solution for Your Herd",
      sub:
        language === "PT"
          ? "Cochos e bebedouros de alta resistência para maximizar a produtividade do seu gado."
          : "High-resistance troughs and drinkers to maximize your cattle's productivity.",
    },
    {
      bg: "linear-gradient(135deg, rgba(15,26,16,0.85) 0%, rgba(45,106,53,0.72) 100%), url('/images/hero/hero-2.webp') center/cover no-repeat",
      tag: language === "PT" ? "Alta Durabilidade" : "High Durability",
      titulo:
        language === "PT"
          ? "Proteção e Performance em um só Produto"
          : "Protection and Performance in One Product",
      sub:
        language === "PT"
          ? "Linha Protecocho: mantém o suplemento protegido da chuva e do sol por muito mais tempo."
          : "Protecocho Line: keeps the supplement protected from rain and sun for much longer.",
    },
    {
      bg: "linear-gradient(135deg, rgba(15,26,16,0.85) 0%, rgba(26,58,31,0.78) 100%), url('/images/hero/hero-3.webp') center/cover no-repeat",
      tag: "Hidramax 1300",
      titulo:
        language === "PT"
          ? "Água Limpa, Rebanho Saudável"
          : "Clean Water, Healthy Herd",
      sub:
        language === "PT"
          ? "O bebedouro mais avançado do mercado. Fluxo contínuo com boia de 1 polegada."
          : "The most advanced drinker on the market. Continuous flow with 1-inch float.",
    },
  ];

  const stats = [
    {
      num: "14+",
      label: language === "PT" ? "Anos de experiência" : "Years of experience",
    },
    {
      num: "50k+",
      label: language === "PT" ? "Produtos vendidos" : "Products sold",
    },
    {
      num: "100%",
      label: language === "PT" ? "Cobertura nacional" : "National coverage",
    },
    {
      num: "5★",
      label:
        language === "PT" ? "Satisfação dos clientes" : "Customer satisfaction",
    },
  ];

  const features = [
    {
      icon: <Shield size={32} />,
      titulo: language === "PT" ? "Alta Resistência UV" : "High UV Resistance",
      desc:
        language === "PT"
          ? "Material especialmente tratado contra raios ultravioleta, garantindo durabilidade em qualquer clima."
          : "Specially treated material against ultraviolet rays, ensuring durability in any climate.",
    },
    {
      icon: <Recycle size={32} />,
      titulo: language === "PT" ? "Material Reciclado" : "Recycled Material",
      desc:
        language === "PT"
          ? "Fabricados com plástico reciclado, contribuindo para um agronegócio mais sustentável."
          : "Manufactured with recycled plastic, contributing to a more sustainable agribusiness.",
    },
    {
      icon: <Box size={32} />,
      titulo: language === "PT" ? "Tamanhos Variados" : "Various Sizes",
      desc:
        language === "PT"
          ? "Da pequena propriedade à grande fazenda, temos o tamanho ideal para o seu rebanho."
          : "From small farms to large ranches, we have the ideal size for your herd.",
    },
    {
      icon: <HeartHandshake size={32} />,
      titulo: language === "PT" ? "Bem-Estar Animal" : "Animal Welfare",
      desc:
        language === "PT"
          ? "Design projetado para facilitar o acesso dos animais e reduzir o estresse no manejo."
          : "Designed to facilitate animal access and reduce handling stress.",
    },
    {
      icon: <Wrench size={32} />,
      titulo: language === "PT" ? "Fácil Montagem" : "Easy Assembly",
      desc:
        language === "PT"
          ? "Sistema modular e intuitivo que pode ser montado sem ferramentas especializadas."
          : "Intuitive and modular system that can be assembled without specialized tools.",
    },
    {
      icon: <Truck size={32} />,
      titulo: language === "PT" ? "Entrega Nacional" : "National Delivery",
      desc:
        language === "PT"
          ? "Enviamos para todas as regiões do Brasil com logística eficiente e segura."
          : "We ship to all regions of Brazil with efficient and safe logistics.",
    },
  ];

  const depoimentos = [
    {
      nome: "João Mendes",
      local: "Sorriso/MT",
      texto:
        language === "PT"
          ? "Os Protecochos reduziram o desperdício de suplemento em mais de 60% na minha propriedade. Investimento que se paga no primeiro mês de seca."
          : "The Protecochos reduced supplement waste by more than 60% on my property. An investment that pays off in the first month of drought.",
      stars: 5,
    },
    {
      nome: "Carlos Ribeiro",
      local: "Rondonópolis/MT",
      texto:
        language === "PT"
          ? "O Hidramax 1300 transformou o manejo de água da fazenda. Antes passávamos horas controlando o abastecimento, hoje é automático."
          : "The Hidramax 1300 transformed the farm's water management. We used to spend hours controlling the supply, today it's automatic.",
      stars: 5,
    },
    {
      nome: "Mariana Souza",
      local: "Cuiabá/MT",
      texto:
        language === "PT"
          ? "Uso os Multicochos no confinamento há 3 anos. Nunca tive problema, resistem ao impacto dos bois sem nenhuma avaria."
          : "I've been using Multicochos in the feedlot for 3 years. Never had a problem, they resist the impact of the cattle without any damage.",
      stars: 5,
    },
  ];

  const produtosDestaque = getProdutosDestaque().slice(0, 6);

  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % heroSlides.length),
      5000,
    );
    return () => clearInterval(t);
  }, [heroSlides.length]);

  const current = heroSlides[slide];

  return (
    <>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          display: "flex",
          alignItems: "center",
          background: current.bg,
          transition: "background 0.8s ease",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 720 }}>
            <span
              className="badge badge-ouro"
              style={{ marginBottom: 24, display: "inline-block" }}
            >
              {current.tag}
            </span>
            <h1
              style={{
                color: "white",
                marginBottom: 24,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              {current.titulo}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "1.2rem",
                marginBottom: 40,
                maxWidth: 560,
              }}
            >
              {current.sub}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/produtos" className="btn-ouro">
                {language === "PT" ? "Ver Produtos" : "View Products"}
              </Link>
              <Link
                href="/representantes"
                className="btn-secondary"
                style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
              >
                {language === "PT" ? "Encontrar Representante" : "Find a Representative"}
              </Link>
            </div>
          </div>
        </div>
        {/* Slide Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            zIndex: 2,
          }}
        >
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? 32 : 10,
                height: 10,
                borderRadius: 5,
                background:
                  i === slide ? "var(--ouro)" : "rgba(255,255,255,0.4)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            writingMode: "vertical-lr",
          }}
        >
          {language === "PT" ? "Role para baixo" : "Scroll down"}
        </div>
      </section>

      {/* STATS */}
      <section
        style={{ background: "var(--gradient-verde)", padding: "48px 0" }}
      >
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 24,
            }}
          >
            {stats.map((s) => (
              <motion.div key={s.num} variants={fadeInUp} className="stat-card">
                <span className="stat-number">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <style>{`@media(max-width:768px){.stat-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>

      {/* QUEM CALCULA INVESTE */}
      <section
        className="section-padding"
        style={{ background: "var(--cinza-claro)" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <span className="badge">
                {language === "PT" ? "Custo-Benefício" : "Cost-Benefit"}
              </span>
              <h2 className="section-title" style={{ marginTop: 16 }}>
                {language === "PT"
                  ? "Quem Calcula, Investe"
                  : "Who Calculates, Invests"}
              </h2>
              <div className="divider-verde" />
              <p className="section-subtitle" style={{ marginBottom: 32 }}>
                {language === "PT" ? (
                  <>
                    Um lote de 50 animais suplementados por 5 meses pode gerar{" "}
                    <strong>R$ 6.975,00</strong> em gastos com nutrição. Sem
                    cobertura no cocho, até{" "}
                    <strong style={{ color: "var(--verde-medio)" }}>
                      R$ 3.487,50
                    </strong>{" "}
                    podem ser desperdiçados pela chuva.
                  </>
                ) : (
                  <>
                    A lot of 50 animals supplemented for 5 months can generate{" "}
                    <strong>R$ 6,975.00</strong> in nutrition costs. Without
                    trough coverage, up to{" "}
                    <strong style={{ color: "var(--verde-medio)" }}>
                      R$ 3,487.50
                    </strong>{" "}
                    can be wasted by rain.
                  </>
                )}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 32,
                }}
              >
                {[
                  {
                    label:
                      language === "PT"
                        ? "Custo total com suplemento"
                        : "Total supplement cost",
                    valor: "R$ 6.975",
                    cor: "var(--verde-escuro)",
                  },
                  {
                    label:
                      language === "PT"
                        ? "Potencial perda sem cobertura"
                        : "Potential loss without coverage",
                    valor: "R$ 3.487",
                    cor: "#e53935",
                  },
                  {
                    label:
                      language === "PT"
                        ? "Economia com Protecocho"
                        : "Savings with Protecocho",
                    valor: language === "PT" ? "até 50%" : "up to 50%",
                    cor: "var(--verde-medio)",
                  },
                  {
                    label:
                      language === "PT"
                        ? "Retorno do investimento"
                        : "Return on investment",
                    valor: language === "PT" ? "1° mês" : "1st month",
                    cor: "var(--ouro)",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "white",
                      borderRadius: 12,
                      padding: "20px 16px",
                      boxShadow: "var(--shadow-sm)",
                      border: "1px solid var(--cinza-medio)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: item.cor,
                      }}
                    >
                      {item.valor}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--cinza-texto)",
                        marginTop: 4,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/produtos?categoria=Protecocho"
                className="btn-primary"
              >
                {language === "PT"
                  ? "Ver Linha Protecocho"
                  : "View Protecocho Line"}
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{
                background: "var(--verde-escuro)",
                borderRadius: 24,
                padding: 48,
                color: "white",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "var(--ouro)", marginBottom: 16 }}>
                {language === "PT"
                  ? "Faça seu Cálculo"
                  : "Calculate Your Savings"}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>
                {language === "PT"
                  ? "Calcule quanto você pode economizar com a linha Alternativa na sua propriedade."
                  : "Calculate how much you can save with the Alternativa line on your property."}
              </p>
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: 8,
                  }}
                >
                  {language === "PT"
                    ? "Com cobertura Alternativa você protege:"
                    : "With Alternativa coverage you protect:"}
                </div>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "var(--ouro)",
                  }}
                >
                  100%
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {language === "PT"
                    ? "do seu investimento em suplementação"
                    : "of your supplement investment"}
                </div>
              </div>
              <Link
                href="/contato"
                className="btn-ouro"
                style={{ display: "inline-flex" }}
              >
                {t("nav.quote")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUTOS DESTAQUE */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="badge">
              {language === "PT" ? "Linha Completa" : "Complete Line"}
            </span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              {language === "PT"
                ? "Nossos Produtos em Destaque"
                : "Our Featured Products"}
            </h2>
            <div
              className="divider-verde"
              style={{ margin: "16px auto 24px" }}
            />
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              {language === "PT"
                ? "Do armazenamento à alimentação e hidratação — soluções completas para o manejo do seu rebanho."
                : "From storage to feeding and hydration — complete solutions for managing your herd."}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 28,
            }}
          >
            {produtosDestaque.map((p) => (
              <Link
                key={p.id}
                href={`/produtos/${p.slug}`}
                className="produto-card"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="produto-card-image"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "240px",
                    overflow: "hidden",
                    background: "white",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={p.imagem}
                      alt={p.nome}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      style={{ objectFit: "contain", padding: "16px" }}
                    />
                  </motion.div>
                  {p.tag && (
                    <span
                      style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        background: "var(--gradient-ouro)",
                        color: "var(--preto)",
                        padding: "4px 12px",
                        borderRadius: 20,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        zIndex: 2,
                      }}
                    >
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="produto-card-body">
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--verde-medio)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                    }}
                  >
                    {p.categoria}
                  </div>
                  <h3 className="produto-card-title">{p.nome}</h3>
                  <p className="produto-card-desc">{p.descricao}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "var(--verde-medio)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {language === "PT" ? "Ver detalhes" : "View details"}{" "}
                    <span style={{ fontSize: "1.1rem" }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/produtos" className="btn-secondary">
              {language === "PT"
                ? "Ver Todos os Produtos"
                : "View All Products"}
            </Link>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section
        className="section-padding"
        style={{ background: "var(--verde-escuro)" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                position: "relative",
                height: "100%",
                minHeight: 400,
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/sobre/DSC_8353.JPG"
                alt="Bois no pasto"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 32,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  {(language === "PT"
                    ? ["Bovinos", "Sustentável", "Pioneira", "Nacional"]
                    : ["Cattle", "Sustainable", "Pioneer", "National"]
                  ).map((item) => (
                    <div
                      key={item}
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        borderRadius: 12,
                        padding: 16,
                        textAlign: "center",
                        color: "white",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge badge-ouro">
                {language === "PT" ? "Nossa História" : "Our History"}
              </span>
              <h2 style={{ color: "white", marginTop: 16, marginBottom: 16 }}>
                {language === "PT"
                  ? "Desde 2011, Parceiro Ideal dos Criadores"
                  : "Since 2011, the Ideal Partner for Breeders"}
              </h2>
              <div className="divider-ouro" />
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}
              >
                {language === "PT"
                  ? "A Alternativa Plásticos nasceu em Lucas do Rio Verde/MT com uma missão clara: oferecer soluções que promovam durabilidade, bem-estar animal e cuidado com o meio ambiente."
                  : "Alternativa Plásticos was born in Lucas do Rio Verde/MT with a clear mission: to offer solutions that promote durability, animal welfare, and environmental care."}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.8,
                  marginBottom: 40,
                }}
              >
                {language === "PT"
                  ? "Pioneira em cochos plásticos de alta resistência, acompanhamos a evolução do agronegócio por mais de 14 anos, atendendo produtores em todo o Brasil."
                  : "Pioneer in high-resistance plastic troughs, we have followed the evolution of agribusiness for over 14 years, serving producers throughout Brazil."}
              </p>
              <Link href="/sobre" className="btn-ouro">
                {language === "PT"
                  ? "Conheça Nossa História"
                  : "Discover Our History"}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="badge">
              {language === "PT" ? "Diferenciais" : "Differentials"}
            </span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              {language === "PT"
                ? "Por que Escolher a Alternativa?"
                : "Why Choose Alternativa?"}
            </h2>
            <div className="divider-verde" style={{ margin: "16px auto 0" }} />
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {features.map((f) => (
              <motion.div
                key={f.titulo}
                variants={fadeInUp}
                className="feature-card"
              >
                <div className="feature-icon">{f.icon}</div>
                <h4 style={{ color: "var(--verde-escuro)", marginBottom: 10 }}>
                  {f.titulo}
                </h4>
                <p style={{ fontSize: "0.9rem" }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section
        className="section-padding"
        style={{ background: "var(--cinza-claro)" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="badge">
              {language === "PT"
                ? "Clientes Satisfeitos"
                : "Satisfied Customers"}
            </span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              {language === "PT"
                ? "O que dizem nossos clientes"
                : "What our customers say"}
            </h2>
            <div className="divider-verde" style={{ margin: "16px auto 0" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {depoimentos.map((d) => (
              <div key={d.nome} className="testimonial-card">
                <div style={{ paddingTop: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                      marginBottom: 16,
                      color: "var(--ouro)",
                      fontSize: "1.1rem",
                    }}
                  >
                    {"★".repeat(d.stars)}
                  </div>
                  <p
                    style={{
                      color: "var(--cinza-texto)",
                      lineHeight: 1.7,
                      marginBottom: 24,
                      fontStyle: "italic",
                    }}
                  >
                    &quot;{d.texto}&quot;
                  </p>
                  <div
                    style={{ fontWeight: 700, color: "var(--verde-escuro)" }}
                  >
                    {d.nome}
                  </div>
                  <div
                    style={{ fontSize: "0.85rem", color: "var(--cinza-texto)" }}
                  >
                    {d.local}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 48,
            }}
          >
            <div>
              <span className="badge">
                {language === "PT" ? "Conhecimento Agro" : "Agro Knowledge"}
              </span>
              <h2 className="section-title" style={{ marginTop: 16 }}>
                {language === "PT" ? "Últimas do Blog" : "Latest from the Blog"}
              </h2>
              <div className="divider-verde" />
            </div>
            <Link href="/blog" className="btn-secondary">
              {language === "PT" ? "Ver todos os posts" : "View all posts"}
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="blog-card"
                style={{ textDecoration: "none" }}
              >
                <div className="blog-card-image" style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
                  <Image 
                    src={post.imagem} 
                    alt={language === "PT" ? post.titulo : post.titulo_en || post.titulo} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }} 
                  />
                </div>
                <div style={{ padding: 24 }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--verde-medio)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {post.categoria}
                  </span>
                  <h4
                    style={{
                      color: "var(--verde-escuro)",
                      margin: "8px 0 12px",
                      fontFamily: "Playfair Display, serif",
                    }}
                  >
                    {post.titulo}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--cinza-texto)",
                      marginBottom: 16,
                    }}
                  >
                    {post.resumo}
                  </p>
                  <div
                    style={{ fontSize: "0.8rem", color: "var(--cinza-texto)" }}
                  >
                    {post.tempoLeitura}{" "}
                    {language === "PT" ? "min de leitura" : "min read"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section
        className="section-padding-sm"
        style={{ background: "var(--cinza-claro)" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="badge">
              {language === "PT" ? "Localização" : "Location"}
            </span>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              {language === "PT" ? "Onde Estamos" : "Where We Are"}
            </h2>
            <p className="section-subtitle" style={{ margin: "16px auto 0" }}>
              BR 163, KM 660 — Comunidade São Cristóvão, Lucas do Rio Verde/MT
            </p>
          </div>
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              height: 400,
            }}
          >
            <iframe
              src="https://www.google.com/maps?q=Alternativa+Cochos+Plásticos,+Lucas+do+Rio+Verde+-+MT&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Alternativa Plásticos"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "var(--gradient-verde)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2 style={{ color: "white", marginBottom: 16 }}>
            {language === "PT"
              ? "Pronto para Transformar sua Propriedade?"
              : "Ready to Transform Your Property?"}
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.1rem",
              marginBottom: 40,
              maxWidth: 560,
              margin: "0 auto 40px",
            }}
          >
            {language === "PT"
              ? "Entre em contato e receba um orçamento personalizado para as necessidades do seu rebanho."
              : "Contact us and receive a personalized quote for your herd's needs."}
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/contato" className="btn-ouro">
              {t("nav.quote")}
            </Link>
            <a
              href="https://wa.me/5565999902024"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              {language === "PT" ? "Chamar no WhatsApp" : "Message on WhatsApp"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
