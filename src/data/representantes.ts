export interface Representante {
  nome: string;
  telefone?: string;
  email?: string;
  cidade?: string;
  detalhe?: string;
}

export interface EstadoRepresentantes {
  id: string;
  nome: string;
  representantes: Representante[];
}

const direcionamentoGeral: Representante = {
  nome: "Matriz (Direcionamentos)",
  telefone: "(65) 99990-2024",
  detalhe: "Demais regiões e direcionamentos"
};

export const representantesPorEstado: EstadoRepresentantes[] = [
  { id: "AC", nome: "Acre", representantes: [direcionamentoGeral] },
  { id: "AL", nome: "Alagoas", representantes: [direcionamentoGeral] },
  { id: "AM", nome: "Amazonas", representantes: [direcionamentoGeral] },
  { id: "AP", nome: "Amapá", representantes: [direcionamentoGeral] },
  {
    id: "BA",
    nome: "Bahia",
    representantes: [
      { nome: "Palmares Representações", telefone: "(63) 99106-0804", detalhe: "Bahia" },
      { nome: "Manzoli Representações", telefone: "(27) 99706-9965", detalhe: "Sul da Bahia" },
    ],
  },
  { id: "CE", nome: "Ceará", representantes: [direcionamentoGeral] },
  { id: "DF", nome: "Distrito Federal", representantes: [{ nome: "Garcia Rural (Cleomys)", telefone: "(62) 98650-9940", detalhe: "Distrito Federal" }] },
  {
    id: "ES",
    nome: "Espírito Santo",
    representantes: [
      { nome: "Manzoli Representações", telefone: "(27) 99706-9965", detalhe: "Espírito Santo" },
    ],
  },
  {
    id: "GO",
    nome: "Goiás",
    representantes: [
      { nome: "Garcia Rural (Cleomys)", telefone: "(62) 98650-9940", detalhe: "Centro Norte de Goiás" },
      { nome: "Isaac Lucas", telefone: "(64) 99300-6207", detalhe: "Sul de Goiás" },
    ],
  },
  {
    id: "MA",
    nome: "Maranhão",
    representantes: [
      { nome: "Isaac Lucas", telefone: "(64) 99300-6207", detalhe: "Maranhão" },
      { nome: "Palmares Representações", telefone: "(63) 99106-0804", detalhe: "Norte do Maranhão" },
    ],
  },
  {
    id: "MT",
    nome: "Mato Grosso",
    representantes: [
      { nome: "GF Representação", telefone: "(65) 98113-0823", detalhe: "Mato Grosso" },
    ],
  },
  {
    id: "MS",
    nome: "Mato Grosso do Sul",
    representantes: [
      { nome: "Lino Rauber", telefone: "(65) 99962-3030", cidade: "Campo Grande/MS", detalhe: "Filial: Rua Bento Gonçalves, nº 328" },
    ],
  },
  {
    id: "MG",
    nome: "Minas Gerais",
    representantes: [
      { nome: "Isaac Lucas", telefone: "(64) 99300-6207", detalhe: "Sul de Minas Gerais" },
      { nome: "Manzoli Representações", telefone: "(27) 99706-9965", detalhe: "Norte de Minas Gerais" },
    ],
  },
  {
    id: "PA",
    nome: "Pará",
    representantes: [
      { nome: "Garcia Rural", telefone: "(62) 98650-9940", detalhe: "Pará" },
    ],
  },
  { id: "PB", nome: "Paraíba", representantes: [direcionamentoGeral] },
  {
    id: "PR",
    nome: "Paraná",
    representantes: [
      { nome: "Ziquita Agro Paraná", telefone: "(41) 99904-4730", detalhe: "Paraná" },
    ],
  },
  { id: "PE", nome: "Pernambuco", representantes: [direcionamentoGeral] },
  {
    id: "PI",
    nome: "Piauí",
    representantes: [
      { nome: "Palmares Representações", telefone: "(63) 99106-0804", detalhe: "Piauí" },
    ],
  },
  { id: "RJ", nome: "Rio de Janeiro", representantes: [direcionamentoGeral] },
  { id: "RN", nome: "Rio Grande do Norte", representantes: [direcionamentoGeral] },
  { id: "RS", nome: "Rio Grande do Sul", representantes: [direcionamentoGeral] },
  { id: "RO", nome: "Rondônia", representantes: [direcionamentoGeral] },
  { id: "RR", nome: "Roraima", representantes: [direcionamentoGeral] },
  {
    id: "SC",
    nome: "Santa Catarina",
    representantes: [
      { nome: "Ziquita Agro Paraná", telefone: "(41) 99904-4730", detalhe: "Santa Catarina" },
    ],
  },
  {
    id: "SP",
    nome: "São Paulo",
    representantes: [
      { nome: "Isaac Lucas", telefone: "(64) 99300-6207", detalhe: "São Paulo" },
      { nome: "Lino Rauber", telefone: "(65) 99962-3030", detalhe: "Extremo Oeste de São Paulo" },
      { nome: "Ziquita Agro Paraná", telefone: "(41) 99904-4730", detalhe: "Extremo Sul de São Paulo" },
    ],
  },
  { id: "SE", nome: "Sergipe", representantes: [direcionamentoGeral] },
  {
    id: "TO",
    nome: "Tocantins",
    representantes: [
      { nome: "Garcia Rural", telefone: "(62) 98650-9940", detalhe: "Tocantins" },
    ],
  },
  {
    id: "BO",
    nome: "Bolívia",
    representantes: [direcionamentoGeral],
  },
  {
    id: "PY",
    nome: "Paraguai",
    representantes: [direcionamentoGeral],
  },
];

export function getRepresentantesByEstado(id: string): EstadoRepresentantes | undefined {
  return representantesPorEstado.find((e) => e.id === id);
}
