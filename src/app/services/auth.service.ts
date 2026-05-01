import { Injectable } from '@angular/core';

/**
 * Service de autenticação simples.
 * Utiliza credenciais fixas armazenadas em array para validação.
 * Não utiliza banco de dados.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Array de usuários válidos para login, incluindo o perfil
  private usuarios = [
    { usuario: 'admin', senha: 'admin123', nome: 'Administrador', perfil: 'admin' },
    { usuario: 'tecnico', senha: 'tec123', nome: 'Carlos Técnico', perfil: 'tecnico' },
    { usuario: 'usuario', senha: 'user123', nome: 'João Silva', perfil: 'usuario' }
  ];

  // Controla se o usuário está logado
  private logado: boolean = false;

  // Armazena o nome e o perfil do usuário logado
  private nomeUsuario: string = '';
  private perfilUsuario: string = '';

  constructor() {}

  /**
   * Realiza a validação de login.
   * @param usuario - Nome de usuário
   * @param senha - Senha do usuário
   * @returns true se as credenciais são válidas, false caso contrário
   */
  login(usuario: string, senha: string): boolean {
    const encontrado = this.usuarios.find(
      u => u.usuario === usuario && u.senha === senha
    );

    if (encontrado) {
      this.logado = true;
      this.nomeUsuario = encontrado.nome;
      this.perfilUsuario = encontrado.perfil;
      return true;
    }

    return false;
  }

  /**
   * Realiza o logout do usuário.
   */
  logout(): void {
    this.logado = false;
    this.nomeUsuario = '';
    this.perfilUsuario = '';
  }

  /**
   * Verifica se o usuário está autenticado.
   */
  estaLogado(): boolean {
    return this.logado;
  }

  /**
   * Retorna o nome do usuário logado.
   */
  getNomeUsuario(): string {
    return this.nomeUsuario;
  }

  /**
   * Retorna o perfil do usuário logado ('admin', 'tecnico', 'usuario').
   */
  getPerfilUsuario(): string {
    return this.perfilUsuario;
  }
}
