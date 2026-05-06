import { Injectable } from '@angular/core';

/**
 * ChamadoService - Service global para gerenciar chamados técnicos e técnicos.
 * Utiliza arrays em memória (sem banco de dados).
 * Compartilhado entre todos os componentes via injeção de dependência.
 */
@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  // Array para armazenar os chamados técnicos
  chamados: any[] = [];

  // Array para armazenar os técnicos cadastrados
  tecnicos: any[] = [];

  // Contador para gerar IDs únicos dos chamados
  private proximoIdChamado: number = 1;

  // Contador para gerar IDs únicos dos técnicos
  private proximoIdTecnico: number = 1;

  constructor() {
    // Dados de exemplo para facilitar testes iniciais
    this.tecnicos = [
      { id: this.proximoIdTecnico++, nome: 'Carlos Silva', especialidade: 'Rede', contato: '(11) 99999-0001', situacao: 'Ativo' },
      { id: this.proximoIdTecnico++, nome: 'Ana Souza', especialidade: 'Hardware', contato: '(11) 99999-0002', situacao: 'Ativo' },
      { id: this.proximoIdTecnico++, nome: 'Pedro Lima', especialidade: 'Software', contato: '(11) 99999-0003', situacao: 'Inativo' }
    ];

    this.chamados = [
      {
        id: this.proximoIdChamado++,
        titulo: 'Computador não liga',
        descricao: 'Máquina do setor financeiro não liga após queda de energia.',
        solicitante: 'João Pereira',
        setor: 'Financeiro',
        tecnico: 'Ana Souza',
        prioridade: 'Alta',
        status: 'Aberto',
        observacao: '',
        dataAbertura: new Date().toLocaleDateString('pt-BR'),
        dataCriacao: new Date().toLocaleDateString('pt-BR')
      },
      {
        id: this.proximoIdChamado++,
        titulo: 'Sem acesso à internet',
        descricao: 'Rede Wi-Fi do 3º andar está fora do ar.',
        solicitante: 'Maria Santos',
        setor: 'TI',
        tecnico: 'Carlos Silva',
        prioridade: 'Média',
        status: 'Em atendimento',
        observacao: 'Técnico já foi ao local.',
        dataAbertura: new Date().toLocaleDateString('pt-BR'),
        dataCriacao: new Date().toLocaleDateString('pt-BR')
      }
    ];
  }

  // ========================
  // MÉTODOS DE CHAMADOS
  // ========================

  /**
   * Adiciona um novo chamado ao array.
   * Gera um ID único automaticamente e registra a data de criação.
   */
  adicionarChamado(chamado: any): void {
    chamado.id = this.proximoIdChamado++;
    chamado.dataCriacao = new Date().toLocaleDateString('pt-BR');
    // Define status padrão se não informado
    if (!chamado.status) {
      chamado.status = 'Aberto';
    }
    this.chamados.push(chamado);
  }

  /**
   * Retorna a lista completa de chamados.
   */
  listarChamados(): any[] {
    return this.chamados;
  }

  /**
   * Busca um chamado pelo ID.
   * Retorna o chamado encontrado ou undefined.
   */
  buscarChamadoPorId(id: number): any {
    return this.chamados.find(c => c.id === id);
  }

  /**
   * Exclui um chamado pelo ID.
   */
  excluirChamado(id: number): void {
    this.chamados = this.chamados.filter(c => c.id !== id);
  }

  /**
   * Atualiza o status e a observação de um chamado pelo ID.
   */
  atualizarStatus(id: number, status: string, observacao: string): void {
    const chamado = this.chamados.find(c => c.id === id);
    if (chamado) {
      chamado.status = status;
      chamado.observacao = observacao;
    }
  }

  // ========================
  // MÉTODOS DE TÉCNICOS
  // ========================

  /**
   * Adiciona um novo técnico ao array.
   * Gera um ID único automaticamente.
   */
  adicionarTecnico(tecnico: any): void {
    tecnico.id = this.proximoIdTecnico++;
    this.tecnicos.push(tecnico);
  }

  /**
   * Retorna a lista completa de técnicos.
   */
  listarTecnicos(): any[] {
    return this.tecnicos;
  }

  /**
   * Exclui um técnico pelo ID.
   */
  excluirTecnico(id: number): void {
    this.tecnicos = this.tecnicos.filter(t => t.id !== id);
  }
}
