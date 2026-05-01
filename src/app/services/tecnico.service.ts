import { Injectable } from '@angular/core';
import { Tecnico } from '../models/tecnico.model';

/**
 * Service para gerenciamento de técnicos em memória.
 */
@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  private tecnicos: Tecnico[] = [];
  private proximoId: number = 1;

  constructor() {
    this.carregarExemplos();
  }

  listarTodos(): Tecnico[] {
    return this.tecnicos;
  }

  buscarPorId(id: number): Tecnico | undefined {
    return this.tecnicos.find(t => t.id === id);
  }

  adicionar(tecnico: Omit<Tecnico, 'id'>): void {
    this.tecnicos.push({
      ...tecnico,
      id: this.proximoId++
    });
  }

  atualizar(tecnicoAtualizado: Tecnico): void {
    const index = this.tecnicos.findIndex(t => t.id === tecnicoAtualizado.id);
    if (index !== -1) {
      this.tecnicos[index] = { ...tecnicoAtualizado };
    }
  }

  excluir(id: number): void {
    this.tecnicos = this.tecnicos.filter(t => t.id !== id);
  }

  private carregarExemplos(): void {
    this.tecnicos = [
      { id: 1, nome: 'Carlos Ferreira', especialidade: 'Hardware', contato: 'carlos@email.com', situacao: 'Ativo' },
      { id: 2, nome: 'Ana Oliveira', especialidade: 'Software', contato: 'ana@email.com', situacao: 'Ativo' },
      { id: 3, nome: 'Pedro Lima', especialidade: 'Rede', contato: 'pedro@email.com', situacao: 'Inativo' }
    ];
    this.proximoId = 4;
  }
}
