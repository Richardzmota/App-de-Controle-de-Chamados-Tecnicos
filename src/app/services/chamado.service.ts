import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamado.model';
import { Tecnico } from '../models/tecnico.model';

/**
 * Service obrigatório para armazenar e compartilhar os dados entre as telas.
 * Armazena chamados e técnicos em arrays (sem banco de dados).
 * Os dados são mantidos apenas enquanto o aplicativo estiver em execução.
 */
@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  // Arrays para armazenamento dos dados em memória
  chamados: any[] = [];
  tecnicos: any[] = [];

  // Contadores para gerar IDs únicos
  private proximoIdChamado: number = 1;
  private proximoIdTecnico: number = 1;

  constructor() {
    // Carrega dados de exemplo para demonstração
    this.carregarExemplos();
  }

  // ========================
  // MÉTODOS DE CHAMADOS
  // ========================

  /**
   * Adiciona um novo chamado ao array.
   * @param chamado - Objeto do chamado a ser adicionado
   */
  adicionarChamado(chamado: any) {
    chamado.id = this.proximoIdChamado++;
    this.chamados.push(chamado);
  }

  /**
   * Retorna todos os chamados cadastrados.
   */
  listarChamados() {
    return this.chamados;
  }

  /**
   * Busca um chamado pelo ID.
   * @param id - ID do chamado
   */
  buscarChamadoPorId(id: number) {
    return this.chamados.find(c => c.id === id);
  }

  /**
   * Exclui um chamado pelo ID.
   * @param id - ID do chamado a ser excluído
   */
  excluirChamado(id: number) {
    this.chamados = this.chamados.filter(c => c.id !== id);
  }

  /**
   * Atualiza o status e a observação de um chamado.
   * @param id - ID do chamado
   * @param status - Novo status
   * @param observacao - Observação do atendimento
   */
  atualizarStatus(id: number, status: string, observacao: string) {
    const chamado = this.chamados.find(c => c.id === id);
    if (chamado) {
      chamado.status = status;
      chamado.observacao = observacao;
    }
  }

  /**
   * Atualiza todos os dados de um chamado existente.
   * @param chamadoAtualizado - Chamado com dados atualizados
   */
  atualizarChamado(chamadoAtualizado: any) {
    const index = this.chamados.findIndex(c => c.id === chamadoAtualizado.id);
    if (index !== -1) {
      this.chamados[index] = { ...chamadoAtualizado };
    }
  }

  /**
   * Filtra chamados por status.
   * @param status - Status para filtrar ('todos' retorna todos)
   */
  filtrarPorStatus(status: string) {
    if (status === 'todos') {
      return [...this.chamados];
    }
    return this.chamados.filter(c => c.status === status);
  }

  /**
   * Retorna totais por status e por prioridade.
   */
  obterResumo() {
    return {
      total: this.chamados.length,
      abertos: this.chamados.filter(c => c.status === 'Aberto').length,
      emAtendimento: this.chamados.filter(c => c.status === 'Em atendimento').length,
      concluidos: this.chamados.filter(c => c.status === 'Concluído').length,
      cancelados: this.chamados.filter(c => c.status === 'Cancelado').length,
      baixa: this.chamados.filter(c => c.prioridade === 'Baixa').length,
      media: this.chamados.filter(c => c.prioridade === 'Média').length,
      alta: this.chamados.filter(c => c.prioridade === 'Alta').length,
      urgente: this.chamados.filter(c => c.prioridade === 'Urgente').length
    };
  }

  // ========================
  // MÉTODOS DE TÉCNICOS
  // ========================

  /**
   * Adiciona um novo técnico ao array.
   * @param tecnico - Objeto do técnico a ser adicionado
   */
  adicionarTecnico(tecnico: any) {
    tecnico.id = this.proximoIdTecnico++;
    this.tecnicos.push(tecnico);
  }

  /**
   * Retorna todos os técnicos cadastrados.
   */
  listarTecnicos() {
    return this.tecnicos;
  }

  /**
   * Retorna apenas os técnicos ativos (para seleção em chamados).
   */
  listarTecnicosAtivos() {
    return this.tecnicos.filter(t => t.situacao === 'Ativo');
  }

  /**
   * Busca um técnico pelo ID.
   * @param id - ID do técnico
   */
  buscarTecnicoPorId(id: number) {
    return this.tecnicos.find(t => t.id === id);
  }

  /**
   * Atualiza os dados de um técnico existente.
   * @param tecnicoAtualizado - Técnico com dados atualizados
   */
  atualizarTecnico(tecnicoAtualizado: any) {
    const index = this.tecnicos.findIndex(t => t.id === tecnicoAtualizado.id);
    if (index !== -1) {
      this.tecnicos[index] = { ...tecnicoAtualizado };
    }
  }

  /**
   * Exclui um técnico pelo ID.
   * @param id - ID do técnico a ser excluído
   */
  excluirTecnico(id: number) {
    this.tecnicos = this.tecnicos.filter(t => t.id !== id);
  }

  // ========================
  // DADOS DE EXEMPLO
  // ========================

  /**
   * Carrega dados iniciais de exemplo para demonstração.
   */
  private carregarExemplos() {
    // Técnicos de exemplo
    this.tecnicos = [
      { id: 1, nome: 'Carlos Técnico', especialidade: 'Hardware', contato: 'carlos@email.com', situacao: 'Ativo' },
      { id: 2, nome: 'Ana Oliveira', especialidade: 'Impressora', contato: 'ana@email.com', situacao: 'Ativo' },
      { id: 3, nome: 'Pedro Lima', especialidade: 'Software', contato: 'pedro@email.com', situacao: 'Ativo' },
      { id: 4, nome: 'Juliana Costa', especialidade: 'Rede', contato: 'juliana@email.com', situacao: 'Inativo' }
    ];
    this.proximoIdTecnico = 5;

    // Chamados de exemplo
    this.chamados = [
      {
        id: 1,
        solicitante: 'João Silva',
        setor: 'Financeiro',
        titulo: 'Computador não liga',
        descricao: 'O computador do setor financeiro não está ligando.',
        prioridade: 'Alta',
        dataAbertura: '2026-04-30',
        tecnico: 'Carlos Técnico',
        status: 'Aberto',
        observacao: ''
      },
      {
        id: 2,
        solicitante: 'Maria Santos',
        setor: 'RH',
        titulo: 'Impressora com erro de papel',
        descricao: 'A impressora do RH apresenta erro de papel atolado constantemente.',
        prioridade: 'Média',
        dataAbertura: '2026-04-29',
        tecnico: 'Ana Oliveira',
        status: 'Em atendimento',
        observacao: 'Técnico agendado para amanhã.'
      },
      {
        id: 3,
        solicitante: 'Ana Oliveira',
        setor: 'Administrativo',
        titulo: 'Instalar software ERP',
        descricao: 'Necessário instalar o novo sistema ERP em 3 máquinas.',
        prioridade: 'Baixa',
        dataAbertura: '2026-04-28',
        tecnico: 'Pedro Lima',
        status: 'Aberto',
        observacao: ''
      },
      {
        id: 4,
        solicitante: 'Carlos Ferreira',
        setor: 'TI',
        titulo: 'Servidor fora do ar',
        descricao: 'O servidor principal está inacessível. Sistemas parados.',
        prioridade: 'Urgente',
        dataAbertura: '2026-04-30',
        tecnico: 'Carlos Técnico',
        status: 'Em atendimento',
        observacao: 'Equipe acionada com urgência.'
      },
      {
        id: 5,
        solicitante: 'Pedro Lima',
        setor: 'Comercial',
        titulo: 'Troca de teclado',
        descricao: 'Teclado da estação 12 com teclas falhando.',
        prioridade: 'Baixa',
        dataAbertura: '2026-04-25',
        tecnico: 'Ana Oliveira',
        status: 'Concluído',
        observacao: 'Teclado substituído com sucesso.'
      },
      {
        id: 6,
        solicitante: 'Lucia Mendes',
        setor: 'Recepção',
        titulo: 'Rede WiFi intermitente',
        descricao: 'A rede WiFi do segundo andar cai frequentemente.',
        prioridade: 'Alta',
        dataAbertura: '2026-04-27',
        tecnico: 'Pedro Lima',
        status: 'Cancelado',
        observacao: 'Resolvido pelo próprio usuário após reinício do roteador.'
      }
    ];
    this.proximoIdChamado = 7;
  }
}
