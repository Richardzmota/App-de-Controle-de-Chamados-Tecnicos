import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios = [
    { usuario: 'admin', senha: 'admin123', nome: 'Administrador' },
    { usuario: 'tecnico', senha: 'tec123', nome: 'Técnico de Suporte' },
    { usuario: 'usuario', senha: 'user123', nome: 'Usuário Comum' }
  ];

  private logado: boolean = false;
  private nomeUsuario: string = '';

  constructor() {}

  login(usuario: string, senha: string): boolean {
    const encontrado = this.usuarios.find(u => u.usuario === usuario && u.senha === senha);
    if (encontrado) {
      this.logado = true;
      this.nomeUsuario = encontrado.nome;
      return true;
    }
    return false;
  }

  logout(): void {
    this.logado = false;
    this.nomeUsuario = '';
  }

  estaLogado(): boolean {
    return this.logado;
  }

  getNomeUsuario(): string {
    return this.nomeUsuario;
  }
}
