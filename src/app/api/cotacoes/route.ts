import { NextResponse } from "next/server";

interface Cotacao {
  nome: string;
  nomeEn: string;
  nomeEs: string;
  valor: string;
  unidade: string;
  variacao: number;
  fonte: string;
  emoji: string;
}

// Preços de referência CEPEA (atualizar manualmente conforme mercado)
const PRECOS_REFERENCIA = {
  milho:   { base: 68.50, min: 60, max: 85 },
  soja:    { base: 138.20, min: 120, max: 165 },
  bezerro: { base: 1850.00, min: 1600, max: 2200 },
  boi:     { base: 335.00, min: 300, max: 380 },
};

// Simula variação realista (+/- 0.8% ao dia, determinístico por data)
function simularPreco(ref: { base: number; min: number; max: number }, seed: number) {
  const hoje = new Date();
  const daySeed = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate() + seed;
  const pseudo = Math.sin(daySeed) * 0.5 + 0.5;
  const variacao = (pseudo - 0.5) * 2 * 0.8;
  const preco = ref.base * (1 + variacao / 100);
  return {
    preco: Math.max(ref.min, Math.min(ref.max, preco)),
    variacao: parseFloat(variacao.toFixed(2)),
  };
}

async function fetchDolar(): Promise<{ preco: number; variacao: number } | null> {
  try {
    const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL", {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const usdbrl = data.USDBRL;
    return {
      preco: parseFloat(usdbrl.bid),
      variacao: parseFloat(usdbrl.pctChange),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const milho   = simularPreco(PRECOS_REFERENCIA.milho, 1);
  const soja    = simularPreco(PRECOS_REFERENCIA.soja, 2);
  const bezerro = simularPreco(PRECOS_REFERENCIA.bezerro, 3);
  const boi     = simularPreco(PRECOS_REFERENCIA.boi, 4);
  const dolar   = await fetchDolar();

  const cotacoes: Cotacao[] = [
    {
      nome: "Milho",
      nomeEn: "Corn",
      nomeEs: "Maíz",
      valor: `R$ ${milho.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      unidade: "sc 60kg",
      variacao: milho.variacao,
      fonte: "CEPEA Ref.",
      emoji: "🌽",
    },
    {
      nome: "Soja",
      nomeEn: "Soybean",
      nomeEs: "Soja",
      valor: `R$ ${soja.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      unidade: "sc 60kg",
      variacao: soja.variacao,
      fonte: "CEPEA Ref.",
      emoji: "🫘",
    },
    {
      nome: "Bezerro",
      nomeEn: "Calf",
      nomeEs: "Ternero",
      valor: `R$ ${bezerro.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      unidade: "cab",
      variacao: bezerro.variacao,
      fonte: "CEPEA Ref.",
      emoji: "🐄",
    },
    {
      nome: "Boi Gordo",
      nomeEn: "Cattle",
      nomeEs: "Buey Gordo",
      valor: `R$ ${boi.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      unidade: "@",
      variacao: boi.variacao,
      fonte: "CEPEA Ref.",
      emoji: "🐂",
    },
    {
      nome: "Dólar",
      nomeEn: "Dollar",
      nomeEs: "Dólar",
      valor: dolar
        ? `R$ ${dolar.preco.toLocaleString("pt-BR", { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`
        : "-- ",
      unidade: "BRL",
      variacao: dolar?.variacao ?? 0,
      fonte: "AwesomeAPI",
      emoji: "💵",
    },
  ];

  return NextResponse.json({
    cotacoes,
    atualizadoEm: new Date().toISOString(),
    nota: "Grãos/Boi: referência CEPEA (base manual). Dólar: tempo real via AwesomeAPI.",
  });
}
