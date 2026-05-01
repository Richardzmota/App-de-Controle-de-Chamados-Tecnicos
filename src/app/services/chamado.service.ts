import { Injectable } from '@angular/core';
import { Chamado } from '../models/chamado.model';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private chamados: Chamado[] = [];
  private proximoId: number = 1;

  constructor() {
    this.carregarExemplos();
  }

  listarTodos(): Chamado[] {
    return this.chamados;
  }

  buscarPorId(id: number): Chamado | undefined {
    return this.chamados.find(c => c.id === id);
  }

  adicionar(chamado: Omit<Chamado, 'id'>): void {
    this.chamados.push({
      ...chamado,
      id: this.proximoId++
    });
  }

  atualizar(chamadoAtualizado: Chamado): void {
    const index = this.chamados.findIndex(c => c.id === chamadoAtualizado.id);
    if (index !== -1) {
      this.chamados[index] = { ...chamadoAtualizado };
    }
  }

  excluir(id: number): void {
    this.chamados = this.chamados.filter(c => c.id !== id);
  }

  filtrarPorStatus(status: string): Chamado[] {
    if (status === 'todos') return [...this.chamados];
    return this.chamados.filter(c => c.status === status);
  }

  atualizarStatus(id: number, status: any, observacao: string): void {
    const chamado = this.buscarPorId(id);
    if (chamado) {
      chamado.status = status;
      chamado.observacao = observacao;
    }
  }

  obterEstatisticas() {
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

  private carregarExemplos(): void {
    this.chamados = [
      { id: 1, solicitante: 'Maria Silva', setor: 'Recepção', titulo: 'Computador não liga', descricao: 'O computador não está ligando.', prioridade: 'Alta', dataAbertura: '2026-04-28', tecnicoResponsavel: 'Carlos Ferreira', status: 'Aberto', observacao: '' },
      { id: 2, solicitante: 'João Santos', setor: 'Financeiro', titulo: 'Impressora com erro de papel', descricao: 'Impressora travada com papel.', prioridade: 'Média', dataAbertura: '2026-04-27', tecnicoResponsavel: 'Ana Oliveira', status: 'Em atendimento', observacao: 'Verificando roletes.' }
    ];
    this.proximoId = 3;
  }
}
