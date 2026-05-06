import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se não estiver logado, envia para login
  if (!authService.isLoggedIn()) {
    return router.parseUrl('/login');
  }

  // Verifica as permissões da rota (caso existam)
  const expectedRoles: UserRole[] = route.data['roles'];

  if (!expectedRoles || expectedRoles.length === 0) {
    return true; // Rota sem restrição específica de perfil
  }

  if (authService.hasRole(expectedRoles)) {
    return true; // Usuário tem permissão
  }

  // Usuário não tem permissão, redireciona para o menu
  return router.parseUrl('/menu');
};
