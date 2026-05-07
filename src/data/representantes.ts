export interface Representante {
  nome: string;
  telefone?: string;
  email?: string;
  cidade?: string;
}

export interface EstadoRepresentantes {
  id: string;
  nome: string;
  representantes: Representante[];
}

export const representantesPorEstado: EstadoRepresentantes[] = [
  {
    id: "MT",
    nome: "Mato Grosso",
    representantes: [
      { nome: "João Carlos Silva", telefone: "(65) 99988-1234", email: "joao@alternativa.com.br", cidade: "Lucas do Rio Verde" },
      { nome: "Maria Oliveira", telefone: "(65) 99877-5678", email: "maria@alternativa.com.br", cidade: "Rondonópolis" },
      { nome: "Pedro Almeida", telefone: "(65) 99766-9012", cidade: "Cuiabá" },
    ],
  },
  {
    id: "GO",
    nome: "Goiás",
    representantes: [
      { nome: "Carlos Mendes", telefone: "(62) 99955-3344", email: "carlos@alternativa.com.br", cidade: "Goiânia" },
      { nome: "Ana Paula Ferreira", telefone: "(62) 98844-5566", cidade: "Rio Verde" },
    ],
  },
  {
    id: "MS",
    nome: "Mato Grosso do Sul",
    representantes: [
      { nome: "Roberto Costa", telefone: "(67) 99933-7788", email: "roberto@alternativa.com.br", cidade: "Campo Grande" },
      { nome: "Fernanda Lima", telefone: "(67) 98822-9900", cidade: "Dourados" },
    ],
  },
  {
    id: "MG",
    nome: "Minas Gerais",
    representantes: [
      { nome: "Antônio Pereira", telefone: "(31) 99911-1122", email: "antonio@alternativa.com.br", cidade: "Belo Horizonte" },
      { nome: "Juliana Santos", telefone: "(34) 98800-3344", cidade: "Uberlândia" },
    ],
  },
  {
    id: "PR",
    nome: "Paraná",
    representantes: [
      { nome: "Lucas Rodrigues", telefone: "(41) 99899-5566", email: "lucas@alternativa.com.br", cidade: "Curitiba" },
      { nome: "Camila Souza", telefone: "(44) 98788-7788", cidade: "Maringá" },
    ],
  },
  {
    id: "SC",
    nome: "Santa Catarina",
    representantes: [
      { nome: "Marcos Ribeiro", telefone: "(48) 99877-9900", email: "marcos@alternativa.com.br", cidade: "Florianópolis" },
    ],
  },
  {
    id: "RS",
    nome: "Rio Grande do Sul",
    representantes: [
      { nome: "Paulo Nascimento", telefone: "(51) 99866-1122", email: "paulo@alternativa.com.br", cidade: "Porto Alegre" },
      { nome: "Sandra Machado", telefone: "(55) 98755-3344", cidade: "Santa Maria" },
    ],
  },
  {
    id: "RO",
    nome: "Rondônia",
    representantes: [
      { nome: "Thiago Barbosa", telefone: "(69) 99844-5566", email: "thiago@alternativa.com.br", cidade: "Porto Velho" },
    ],
  },
  {
    id: "SP",
    nome: "São Paulo",
    representantes: [
      { nome: "Rafael Carvalho", telefone: "(11) 99833-7788", email: "rafael@alternativa.com.br", cidade: "São Paulo" },
      { nome: "Bianca Correia", telefone: "(18) 98722-9900", cidade: "Presidente Prudente" },
    ],
  },
  {
    id: "TO",
    nome: "Tocantins",
    representantes: [
      { nome: "Alexandre Gomes", telefone: "(63) 99811-1122", email: "alexandre@alternativa.com.br", cidade: "Palmas" },
    ],
  },
  {
    id: "BA",
    nome: "Bahia",
    representantes: [
      { nome: "Daniela Araújo", telefone: "(71) 99800-3344", email: "daniela@alternativa.com.br", cidade: "Salvador" },
      { nome: "Eduardo Moreira", telefone: "(74) 98699-5566", cidade: "Barreiras" },
    ],
  },
  {
    id: "PA",
    nome: "Pará",
    representantes: [
      { nome: "Gustavo Teixeira", telefone: "(91) 99788-7788", email: "gustavo@alternativa.com.br", cidade: "Belém" },
    ],
  },
  {
    id: "AM",
    nome: "Amazonas",
    representantes: [
      { nome: "Isabela Rocha", telefone: "(92) 99777-9900", email: "isabela@alternativa.com.br", cidade: "Manaus" },
    ],
  },
];

export function getRepresentantesByEstado(id: string): EstadoRepresentantes | undefined {
  return representantesPorEstado.find((e) => e.id === id);
}
