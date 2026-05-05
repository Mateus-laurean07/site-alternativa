// Tipos principais do sistema
export interface Produto {
  id: string;
  slug: string;
  nome: string;
  nome_en?: string;
  categoria: string;
  categoria_en?: string;
  subcategoria?: string;
  subcategoria_en?: string;
  descricao: string;
  descricao_en?: string;
  descricaoCompleta: string;
  descricaoCompleta_en?: string;
  imagem: string;
  imagens: string[];
  especificacoes: { chave: string; chave_en?: string; valor: string; valor_en?: string }[];
  beneficios: string[];
  beneficios_en?: string[];
  capacidade?: string;
  disponivel: boolean;
  destaque: boolean;
  tag?: string;
  tag_en?: string;
  manual?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titulo: string;
  titulo_en?: string;
  resumo: string;
  resumo_en?: string;
  conteudo: string;
  conteudo_en?: string;
  imagem: string;
  autor: string;
  data: string;
  categoria: string;
  categoria_en?: string;
  tags: string[];
  tempoLeitura: number;
}

export interface Depoimento {
  id: string;
  nome: string;
  localizacao: string;
  texto: string;
  avaliacao: number;
  foto?: string;
}
