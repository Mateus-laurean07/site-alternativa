"use client";

import { useEffect, useState } from "react";

interface Cotacao {
  nome: string;
  valor: string;
  unidade: string;
  variacao: number;
  emoji: string;
}

// Cache em módulo — persiste entre re-renders e trocas de idioma
let _cotacoesCache: Cotacao[] = [];

export default function NavbarTicker() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>(_cotacoesCache);
  const [hora, setHora] = useState("");

  useEffect(() => {
    // Se já temos dados em cache, não precisa esperar a API
    if (_cotacoesCache.length > 0) {
      setCotacoes(_cotacoesCache);
    }

    const buscar = async () => {
      try {
        const res = await fetch("/api/cotacoes");
        if (res.ok) {
          const d: { cotacoes: Cotacao[] } = await res.json();
          _cotacoesCache = d.cotacoes;
          setCotacoes(d.cotacoes);
        }
      } catch (_e) {
        // mantém dados anteriores em caso de falha
        if (_cotacoesCache.length > 0) setCotacoes(_cotacoesCache);
      }
    };

    buscar();
    const iv = setInterval(buscar, 10 * 60 * 1000);

    const atualizarHora = () =>
      setHora(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    atualizarHora();
    const tick = setInterval(atualizarHora, 60 * 1000); // a cada minuto é suficiente

    return () => {
      clearInterval(iv);
      clearInterval(tick);
    };
  }, []); // [] = monta 1x, nunca sofre com troca de idioma

  if (cotacoes.length === 0) return null;

  const items = [...cotacoes, ...cotacoes, ...cotacoes];

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
          animation: nv-ticker 55s linear infinite;
        }
        .nv-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          height: 32,
          display: "flex",
          alignItems: "center",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        {/* Badge fixo */}
        <div
          style={{
            flexShrink: 0,
            padding: "0 12px",
            borderRight: "1px solid rgba(255,255,255,0.12)",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#c9a84c",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          📊 Cotações
        </div>

        {/* Ticker em loop */}
        <div
          style={{
            overflow: "hidden",
            flex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
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
                  whiteSpace: "nowrap" as const,
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
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: c.variacao > 0 ? "#4ade80" : "#f87171",
                    }}
                  >
                    {c.variacao > 0 ? "▲" : "▼"} {Math.abs(c.variacao).toFixed(2)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hora */}
        {hora && (
          <div
            style={{
              flexShrink: 0,
              padding: "0 12px",
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.35)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            ⏱ {hora}
          </div>
        )}
      </div>
    </>
  );
}
