"use client";

import { useEffect, useState, useRef } from "react";

interface Cotacao {
  nome: string;
  valor: string;
  unidade: string;
  variacao: number;
  emoji: string;
}

export default function NavbarTicker() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [hora, setHora] = useState("");
  const cotacoesRef = useRef<Cotacao[]>([]); // persiste dados mesmo sem re-render

  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await fetch("/api/cotacoes");
        if (res.ok) {
          const d = await res.json();
          cotacoesRef.current = d.cotacoes;
          setCotacoes(d.cotacoes);
        }
      } catch { /* silencioso */ }
    };

    buscar();
    const iv = setInterval(buscar, 10 * 60 * 1000);

    const tick = setInterval(() => {
      setHora(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    setHora(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));

    return () => {
      clearInterval(iv);
      clearInterval(tick);
    };
  }, []); // sem dependências — nunca re-monta por mudança de idioma

  const items = cotacoes.length > 0 ? [...cotacoes, ...cotacoes, ...cotacoes] : [];

  if (cotacoes.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes nv-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .nv-ticker-track {
          display: flex;
          width: max-content;
          animation: nv-ticker 50s linear infinite;
        }
        .nv-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
        height: 32,
        display: "flex",
        alignItems: "center",
        background: "rgba(0,0,0,0.25)",
      }}>
        {/* Badge fixo */}
        <div style={{
          flexShrink: 0,
          padding: "0 12px",
          borderRight: "1px solid rgba(255,255,255,0.12)",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#c9a84c",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}>
          📊 Cotações
        </div>

        {/* Ticker scroll */}
        <div style={{ overflow: "hidden", flex: 1, height: "100%", display: "flex", alignItems: "center" }}>
          <div className="nv-ticker-track">
            {items.map((c, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "0 20px",
                  borderRight: "1px solid rgba(255,255,255,0.07)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: "0.8rem" }}>{c.emoji}</span>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                  {c.nome}
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "white" }}>
                  {c.valor}
                </span>
                <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)" }}>
                  /{c.unidade}
                </span>
                {c.variacao !== 0 && (
                  <span style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    color: c.variacao > 0 ? "#4ade80" : "#f87171",
                  }}>
                    {c.variacao > 0 ? "▲" : "▼"} {Math.abs(c.variacao).toFixed(2)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hora */}
        {hora && (
          <div style={{
            flexShrink: 0,
            padding: "0 12px",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.35)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
          }}>
            ⏱ {hora}
          </div>
        )}
      </div>
    </>
  );
}
