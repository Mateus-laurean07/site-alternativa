<p align="center">
  <img src="public/images/logo/Alternativa Comederos - Horizontal branca2.png" alt="Alternativa Cochos e Bebedouros" width="400" />
</p>

<h1 align="center">Alternativa Cochos e Bebedouros</h1>

<p align="center">
  <strong>Soluções em cochos, bebedouros e equipamentos para pecuária de alto desempenho.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61dafb?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer%20Motion-12-ff69b4?logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Deploy-Cloudflare%20Pages-f38020?logo=cloudflare" alt="Cloudflare" />
</p>

---

## 📋 Sobre o Projeto

Site institucional da **Alternativa Cochos e Bebedouros**, empresa referência em soluções para pecuária desde 2011. O projeto apresenta o catálogo completo de produtos com foco em performance, SEO e experiência do usuário.

### ✨ Destaques

- 🌐 **Bilíngue** — Suporte completo PT-BR / EN com troca instantânea
- 📊 **Cotações em tempo real** — Ticker integrado ao navbar com preços de Milho, Soja, Bezerro, Boi Gordo e Dólar
- ⚡ **Performance otimizada** — Imagens em WebP, lazy loading, cache agressivo e compressão Gzip
- 🎨 **Design premium** — Animações Framer Motion, scroll suave com Lenis, UI moderna e responsiva
- 📱 **Mobile-first** — Layout totalmente adaptável para qualquer dispositivo
- 🔍 **SEO-friendly** — Meta tags, Open Graph, sitemap e semântica HTML5

---

## 🏗️ Arquitetura

```
src/
├── app/
│   ├── api/cotacoes/      # API Route — cotações de commodities
│   ├── blog/              # Seção de blog com artigos agro
│   ├── contato/           # Formulário de contato / orçamento
│   ├── produtos/          # Catálogo com páginas dinâmicas por produto
│   ├── sobre/             # Página institucional
│   ├── videos/            # Galeria de vídeos
│   ├── layout.tsx         # Layout raiz com providers
│   └── page.tsx           # Homepage com hero, stats, depoimentos
├── components/
│   ├── Navbar.tsx          # Navegação com mega-menu de produtos
│   ├── NavbarTicker.tsx    # Ticker de cotações agro (independente)
│   ├── Footer.tsx          # Rodapé com links e branding Naveo
│   └── providers/          # SmoothScrollProvider (Lenis)
├── contexts/
│   └── LanguageContext.tsx  # Provider de internacionalização PT/EN
└── data/
    ├── produtos.ts         # Catálogo de produtos (5 linhas, 17 SKUs)
    └── blog.ts             # Posts do blog
```

---

## 🛠️ Stack Tecnológica

| Tecnologia | Função |
|---|---|
| **Next.js 16** | Framework React com App Router e SSR |
| **React 19** | UI reativa com hooks modernos |
| **TypeScript 5** | Tipagem estática em todo o projeto |
| **Framer Motion** | Animações fluidas e micro-interações |
| **Lenis** | Scroll suave premium |
| **Lucide React** | Ícones minimalistas e consistentes |
| **Sharp** | Otimização de imagens no servidor |
| **AwesomeAPI** | Cotação do dólar em tempo real |

---

## 🚀 Primeiros Passos

### Pré-requisitos

- Node.js **18+**
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Mateus-laurean07/site-alternativa.git

# Entre na pasta
cd site-alternativa

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento (Turbopack) |
| `npm run build` | Gera o build de produção |
| `npm start` | Roda o build de produção localmente |
| `npm run lint` | Executa o ESLint |

---

## ☁️ Deploy (Cloudflare Pages)

### Configuração no Cloudflare

1. Acesse [Cloudflare Pages](https://pages.cloudflare.com/)
2. Conecte o repositório GitHub
3. Configure as variáveis:

| Setting | Valor |
|---|---|
| **Framework preset** | Next.js |
| **Build command** | `npm run build` |
| **Build output directory** | `.next` |
| **Node.js version** | `18` |

4. Clique em **Save and Deploy**

> **Nota:** Para usar o Next.js com Cloudflare Pages, pode ser necessário o adaptador `@cloudflare/next-on-pages`. Consulte a [documentação oficial](https://developers.cloudflare.com/pages/framework-guides/nextjs/).

---

## 📊 API de Cotações

O endpoint `/api/cotacoes` retorna preços atualizados de commodities agrícolas:

```json
{
  "cotacoes": [
    { "nome": "Milho", "nomeEn": "Corn", "valor": "R$ 68,50", "unidade": "sc 60kg", "variacao": 0.35, "emoji": "🌽" },
    { "nome": "Soja", "nomeEn": "Soybean", "valor": "R$ 138,20", "unidade": "sc 60kg", "variacao": -0.12, "emoji": "🫘" },
    { "nome": "Bezerro", "nomeEn": "Calf", "valor": "R$ 1.850,00", "unidade": "cab", "variacao": 0.45, "emoji": "🐄" },
    { "nome": "Boi Gordo", "nomeEn": "Cattle", "valor": "R$ 335,00", "unidade": "@", "variacao": -0.22, "emoji": "🐂" },
    { "nome": "Dólar", "nomeEn": "Dollar", "valor": "R$ 5.1234", "unidade": "BRL", "variacao": 0.15, "emoji": "💵" }
  ]
}
```

- **Grãos e Boi**: Preços de referência CEPEA com variação diária simulada
- **Dólar**: Cotação em tempo real via [AwesomeAPI](https://economia.awesomeapi.com.br)

---

## 📦 Linhas de Produtos

| Linha | Produtos | Segmento |
|---|---|---|
| **Multicocho** | 200L, 250L | Bovinos — alimentação |
| **Protecocho** | 200L, 250L, 400L, 500L | Bovinos — suplementação protegida |
| **Hidramax** | 1300L, Autoabastecimento | Bovinos — hidratação |
| **Nutrisilo** | Nutrisilo | Bovinos — silagem |
| **Suínos** | Cochos, Pisos, Portões, Bandejas | Suinocultura |

---

## 🎨 Design System

- **Cores**: Verde escuro `#1a3a1f`, Ouro `#c9a84c`, branco
- **Tipografia**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **Ícones**: Lucide React
- **Animações**: Framer Motion com `fadeInUp`, `staggerContainer`
- **Scroll**: Lenis para suavidade premium

---

## 📁 Estrutura de Imagens

Todas as imagens foram otimizadas para **WebP**:

| Pasta | Conteúdo | Formato |
|---|---|---|
| `public/images/hero/` | 3 slides do carrossel hero | WebP (350KB total) |
| `public/images/produtos/` | 17 fotos de produtos | WebP (~30KB cada) |
| `public/images/sobre/` | 3 fotos institucionais | WebP (~130KB cada) |
| `public/images/blog/` | 3 imagens de artigos | WebP (~190KB cada) |

---

## 👥 Equipe

Desenvolvido por [**Naveo**](https://naveo.com.br/) 🚀

---

## 📄 Licença

Este projeto é privado e de uso exclusivo da **Alternativa Cochos e Bebedouros**.