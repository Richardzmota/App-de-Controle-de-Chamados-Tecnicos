/**
 * Interface que define a estrutura de um Chamado Técnico.
 * Campos conforme especificação do projeto.
 */
export interface Chamado {
  id: number;                  // Identificador único do chamado
  solicitante: string;         // Nome do solicitante
  setor: string;               // Setor que abriu o chamado
  titulo: string;              // Título do chamado
  descricao: string;           // Descrição do problema
  prioridade: 'Baixa' | 'Média' | 'Alta' | 'Urgente';  // Nível de prioridade
  dataAbertura: string;        // Data de abertura
  tecnico: string;             // Técnico responsável
  status: 'Aberto' | 'Em atendimento' | 'Concluído' | 'Cancelado'; // Status atual
  observacao: string;          // Observação do atendimento
}
