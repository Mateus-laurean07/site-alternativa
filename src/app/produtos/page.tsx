import { Metadata } from "next";
import ProdutosClient from "./ProdutosClient";

export const metadata: Metadata = {
  title: "Catálogo de Produtos",
  description: "Cochos e bebedouros de alta resistência para bovinos. Conheça as linhas Protecocho, Multicocho, Hidramax e muito mais.",
  openGraph: {
    title: "Catálogo de Produtos | Alternativa Cochos e Bebedouros",
    description: "Cochos e bebedouros de alta resistência para bovinos. Conheça as linhas Protecocho, Multicocho, Hidramax e muito mais.",
    images: [
      {
        url: "/images/sobre/DSC_8354.JPG",
        width: 1200,
        height: 630,
        alt: "Gado no pasto - Alternativa Cochos",
      },
    ],
  },
};

export default function ProdutosPage() {
  return <ProdutosClient />;
}
