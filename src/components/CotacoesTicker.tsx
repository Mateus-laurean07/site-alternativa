"use client";

import { useEffect, useState } from "react";

interface Cotacao {
  nome: string;
  valor: string;
  unidade: string;
  variacao: number;
  fonte: string;
  emoji: string;
}

export default function CotacoesTicker() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [atualizadoEm, setAtualizadoEm] = useState<string>("");

  const buscarCotacoes = async () => {
    try {
      const res = await fetch("/api/cotacoes");
      if (res.ok) {
        const data = await res.json();
        setCotacoes(data.cotacoes);
        const d = new Date(data.atualizadoEm);
        setAtualizadoEm(d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarCotacoes();
    // Atualiza a cada 10 minutos
    const interval = setInterval(buscarCotacoes, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{
        background: "linear-gradient(90deg, #0a3d0a, #1a5c1a)",
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.72rem",
        color: "rgba(255,255,255,0.5)",
        letterSpacing: "0.05em",
      }}>
        Carregando cotações...
      </div>
    );
  }

  if (cotacoes.length === 0) return null;

  // Duplicamos para loop infinito
  const items = [...cotacoes, ...cotacoes, ...cotacoes];

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker-scroll 40s linear infinite;
          width: max-content;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 32px;
          border-right: 1px solid rgba(255,255,255,0.1);
          white-space: nowrap;
          transition: background 0.2s;
        }
        .ticker-item:hover {
          background: rgba(255,255,255,0.05);
        }
        .ticker-variacao-pos { color: #4ade80; }
        .ticker-variacao-neg { color: #f87171; }
        .ticker-variacao-neu { color: rgba(255,255,255,0.5); }
      `}</style>
      <div style={{
        background: "linear-gradient(90deg, #072b07, #0f3f0f)",
        overflow: "hidden",
        height: 38,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
      }}>
        {/* Label fixo */}
        <div style={{
          flexShrink: 0,
          padding: "0 16px",
          borderRight: "1px solid rgba(255,255,255,0.15)",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ouro, #c9a84c)",
          whiteSpace: "nowrap",
          background: "rgba(0,0,0,0.2)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          zIndex: 2,
        }}>
          📊 Cotações
        </div>

        {/* Ticker scrollável */}
        <div style={{ overflow: "hidden", flex: 1, height: "100%", display: "flex", alignItems: "center" }}>
          <div className="ticker-track">
            {items.map((c, idx) => (
              <div key={idx} className="ticker-item">
                <span style={{ fontSize: "1rem" }}>{c.emoji}</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "white" }}>
                  {c.nome}
                </span>
                <span style={{ fontSize: "0.82rem", color: "white", fontWeight: 700 }}>
                  {c.valor}
                </span>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>
                  /{c.unidade}
                </span>
                {c.variacao !== 0 && c.valor !== "--" && (
                  <span
                    className={
                      c.variacao > 0
                        ? "ticker-variacao-pos"
                        : c.variacao < 0
                        ? "ticker-variacao-neg"
                        : "ticker-variacao-neu"
                    }
                    style={{ fontSize: "0.72rem", fontWeight: 600 }}
                  >
                    {c.variacao > 0 ? "▲" : "▼"} {Math.abs(c.variacao).toFixed(2)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hora de atualização */}
        {atualizadoEm && (
          <div style={{
            flexShrink: 0,
            padding: "0 12px",
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.35)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            whiteSpace: "nowrap",
          }}>
            ⏱ {atualizadoEm}
          </div>
        )}

        {/* Fade nas bordas */}
        <div style={{
          position: "absolute",
          left: 120,
          top: 0,
          width: 40,
          height: "100%",
          background: "linear-gradient(to right, #0f3f0f, transparent)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
        <div style={{
          position: "absolute",
          right: 80,
          top: 0,
          width: 60,
          height: "100%",
          background: "linear-gradient(to left, #072b07, transparent)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
      </div>
    </>
  );
}
