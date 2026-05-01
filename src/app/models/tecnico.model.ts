/**
 * Interface que define a estrutura de um Técnico.
 * Campos conforme especificação do projeto.
 */
export interface Tecnico {
  id: number;                  // Identificador único do técnico
  nome: string;                // Nome do técnico
  especialidade: 'Hardware' | 'Software' | 'Rede' | 'Impressora' | 'Sistema interno' | 'Outros'; // Especialidade
  contato: string;             // Telefone ou e-mail
  situacao: 'Ativo' | 'Inativo'; // Situação
}
