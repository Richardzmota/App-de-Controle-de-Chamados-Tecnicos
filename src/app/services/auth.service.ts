import { Injectable } from '@angular/core';

export type UserRole = 'comum' | 'tecnico' | 'admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserRole: UserRole | null = null;
  private currentUsername: string | null = null;

  constructor() {}

  /**
   * Realiza login definindo o usuário e o tipo de perfil (simulado)
   */
  login(username: string, role: UserRole): void {
    this.currentUsername = username;
    this.currentUserRole = role;
  }

  /**
   * Remove as credenciais do usuário atual
   */
  logout(): void {
    this.currentUsername = null;
    this.currentUserRole = null;
  }

  /**
   * Verifica se há um usuário logado
   */
  isLoggedIn(): boolean {
    return this.currentUserRole !== null;
  }

  /**
   * Retorna o perfil do usuário logado
   */
  getUserRole(): UserRole | null {
    return this.currentUserRole;
  }

  /**
   * Verifica se o usuário atual possui um dos perfis informados
   */
  hasRole(roles: UserRole[]): boolean {
    if (!this.currentUserRole) return false;
    return roles.includes(this.currentUserRole);
  }
}
