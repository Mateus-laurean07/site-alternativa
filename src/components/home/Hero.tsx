"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { language } = useLanguage();
  const [slide, setSlide] = useState(0);

  const heroSlides = [
    {
      bg: "linear-gradient(135deg, rgba(15,26,16,0.85) 0%, rgba(26,58,31,0.72) 100%), url('/images/hero/hero-1.webp') center/cover no-repeat",
      tag: language === "PT" ? "Desde 2011" : "Since 2011",
      titulo: language === "PT" ? "A Solução Completa para seu Rebanho" : "The Complete Solution for Your Herd",
      sub: language === "PT" ? "Cochos e bebedouros de alta resistência para maximizar a produtividade do seu gado." : "High-resistance troughs and drinkers to maximize your cattle's productivity.",
    },
    {
      bg: "linear-gradient(135deg, rgba(15,26,16,0.85) 0%, rgba(45,106,53,0.72) 100%), url('/images/hero/hero-2.webp') center/cover no-repeat",
      tag: language === "PT" ? "Alta Durabilidade" : "High Durability",
      titulo: language === "PT" ? "Proteção e Performance em um só Produto" : "Protection and Performance in One Product",
      sub: language === "PT" ? "Linha Protecocho: mantém o suplemento protegido da chuva e do sol por muito mais tempo." : "Protecocho Line: keeps the supplement protected from rain and sun for much longer.",
    },
    {
      bg: "linear-gradient(135deg, rgba(15,26,16,0.85) 0%, rgba(26,58,31,0.78) 100%), url('/images/hero/hero-3.webp') center/cover no-repeat",
      tag: "Hidramax 1300",
      titulo: language === "PT" ? "Água Limpa, Rebanho Saudável" : "Clean Water, Healthy Herd",
      sub: language === "PT" ? "O bebedouro mais avançado do mercado. Fluxo contínuo com boia de 1 polegada." : "The most advanced drinker on the market. Continuous flow with 1-inch float.",
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  const current = heroSlides[slide];

  return (
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
          <span className="badge badge-ouro" style={{ marginBottom: 24, display: "inline-block" }}>
            {current.tag}
          </span>
          <h1 style={{ color: "white", marginBottom: 24, textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
            {current.titulo}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.2rem", marginBottom: 40, maxWidth: 560 }}>
            {current.sub}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/produtos" className="btn-ouro">
              {language === "PT" ? "Ver Produtos" : "View Products"}
            </Link>
            <Link href="/representantes" className="btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>
              {language === "PT" ? "Encontrar Representante" : "Find a Representative"}
            </Link>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, zIndex: 2 }}>
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            style={{
              width: i === slide ? 32 : 10,
              height: 10,
              borderRadius: 5,
              background: i === slide ? "var(--ouro)" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 40, right: 40, color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", writingMode: "vertical-lr" }}>
        {language === "PT" ? "Role para baixo" : "Scroll down"}
      </div>
    </section>
  );
}
