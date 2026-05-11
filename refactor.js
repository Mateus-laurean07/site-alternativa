const fs = require('fs');

const content = fs.readFileSync('src/app/page.tsx', 'utf-8');

const statsStart = content.indexOf('{/* STATS */}');
if (statsStart === -1) throw new Error("Could not find {/* STATS */} marker");

const endMarker = content.lastIndexOf('</>');
if (endMarker === -1) throw new Error("Could not find end marker");

const restOfContent = content.substring(statsStart, endMarker);

const homeContentTsx = `"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getProdutosDestaque } from "@/data/produtos";
import AutoImageCarousel from "@/components/AutoImageCarousel";
import { blogPosts } from "@/data/blog";
import { useLanguage } from "@/contexts/LanguageContext";
import { CowIcon } from "@/components/CustomIcons";
import { Recycle, Sun, Ruler, Puzzle } from "lucide-react";
import { GiBrazil } from "react-icons/gi";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function HomeContent() {
  const { language, t } = useLanguage();

  const stats = [
    { num: "14+", label: language === "PT" ? "Anos de experiência" : "Years of experience" },
    { num: "50k+", label: language === "PT" ? "Produtos vendidos" : "Products sold" },
    { num: "100%", label: language === "PT" ? "Cobertura nacional" : "National coverage" },
    { num: "5★", label: language === "PT" ? "Satisfação dos clientes" : "Customer satisfaction" },
  ];

  const features = [
    { icon: <Sun size={32} />, titulo: language === "PT" ? "Alta Resistência UV" : "High UV Resistance", desc: language === "PT" ? "Material especialmente tratado contra raios ultravioleta, garantindo durabilidade em qualquer clima." : "Specially treated material against ultraviolet rays, ensuring durability in any climate." },
    { icon: <Recycle size={32} />, titulo: language === "PT" ? "Material Reciclado" : "Recycled Material", desc: language === "PT" ? "Fabricados com plástico reciclado, contribuindo para um agronegócio mais sustentável." : "Manufactured with recycled plastic, contributing to a more sustainable agribusiness." },
    { icon: <Ruler size={32} />, titulo: language === "PT" ? "Tamanhos Variados" : "Various Sizes", desc: language === "PT" ? "Da pequena propriedade à grande fazenda, temos o tamanho ideal para o seu rebanho." : "From small farms to large ranches, we have the ideal size for your herd." },
    { icon: <CowIcon size={32} />, titulo: language === "PT" ? "Bem-Estar Animal" : "Animal Welfare", desc: language === "PT" ? "Design projetado para facilitar o acesso dos animais e reduzir o estresse no manejo." : "Designed to facilitate animal access and reduce handling stress." },
    { icon: <Puzzle size={32} />, titulo: language === "PT" ? "Fácil Montagem" : "Easy Assembly", desc: language === "PT" ? "Sistema modular e intuitivo que pode ser montado sem ferramentas especializadas." : "Intuitive and modular system that can be assembled without specialized tools." },
    { icon: <GiBrazil size={32} />, titulo: language === "PT" ? "Entrega Nacional" : "National Delivery", desc: language === "PT" ? "Enviamos para todas as regiões do Brasil com logística eficiente e segura." : "We ship to all regions of Brazil with efficient and safe logistics." },
  ];

  const depoimentos = [
    { nome: "João Mendes", local: "Sorriso/MT", texto: language === "PT" ? "Os Protecochos reduziram o desperdício de suplemento em mais de 60% na minha propriedade. Investimento que se paga no primeiro mês de seca." : "The Protecochos reduced supplement waste by more than 60% on my property. An investment that pays off in the first month of drought.", stars: 5 },
    { nome: "Carlos Ribeiro", local: "Rondonópolis/MT", texto: language === "PT" ? "O Hidramax 1300 transformou o manejo de água da fazenda. Antes passávamos horas controlando o abastecimento, hoje é automático." : "The Hidramax 1300 transformed the farm's water management. We used to spend hours controlling the supply, today it's automatic.", stars: 5 },
    { nome: "Mariana Souza", local: "Cuiabá/MT", texto: language === "PT" ? "Uso os Multicochos no confinamento há 3 anos. Nunca tive problema, resistem ao impacto dos bois sem nenhuma avaria." : "I've been using Multicochos in the feedlot for 3 years. Never had a problem, they resist the impact of the cattle without any damage.", stars: 5 },
  ];

  const produtosDestaque = getProdutosDestaque().slice(0, 6);

  return (
    <>
      ${restOfContent}
    </>
  );
}
`;

fs.writeFileSync('src/components/home/HomeContent.tsx', homeContentTsx);

const newPageTsx = `import Hero from "@/components/home/Hero";
import HomeContent from "@/components/home/HomeContent";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeContent />
    </main>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', newPageTsx);
console.log("Refactoring complete.");
