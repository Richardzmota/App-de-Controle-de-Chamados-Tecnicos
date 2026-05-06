import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

/**
 * Configuração de rotas do aplicativo.
 * A rota padrão redireciona para a tela de login.
 */
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'menu',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/menu/menu.page').then((m) => m.MenuPage),
  },
  {
    path: 'cadastrar-chamado',
    canActivate: [authGuard],
    data: { roles: ['comum', 'admin'] },
    loadComponent: () => import('./pages/cadastrar-chamado/cadastrar-chamado.page').then((m) => m.CadastrarChamadoPage),
  },
  {
    path: 'lista-chamados',
    canActivate: [authGuard],
    data: { roles: ['comum', 'tecnico', 'admin'] },
    loadComponent: () => import('./pages/lista-chamados/lista-chamados.page').then((m) => m.ListaChamadosPage),
  },
  {
    path: 'detalhes-chamado/:id',
    canActivate: [authGuard],
    data: { roles: ['comum', 'tecnico', 'admin'] },
    loadComponent: () => import('./pages/detalhes-chamado/detalhes-chamado.page').then((m) => m.DetalhesChamadoPage),
  },
  {
    path: 'atualizar-status/:id',
    canActivate: [authGuard],
    data: { roles: ['tecnico', 'admin'] },
    loadComponent: () => import('./pages/atualizar-status/atualizar-status.page').then((m) => m.AtualizarStatusPage),
  },
  {
    path: 'cadastrar-tecnico',
    canActivate: [authGuard],
    data: { roles: ['tecnico', 'admin'] },
    loadComponent: () => import('./pages/cadastrar-tecnico/cadastrar-tecnico.page').then((m) => m.CadastrarTecnicoPage),
  },
  {
    path: 'lista-tecnicos',
    canActivate: [authGuard],
    data: { roles: ['admin'] },
    loadComponent: () => import('./pages/lista-tecnicos/lista-tecnicos.page').then((m) => m.ListaTecnicosPage),
  },
  {
    path: 'resumo',
    canActivate: [authGuard],
    data: { roles: ['comum', 'tecnico', 'admin'] },
    loadComponent: () => import('./pages/resumo/resumo.page').then((m) => m.ResumoPage),
  },
  {
    path: 'sobre',
    canActivate: [authGuard],
    data: { roles: ['comum', 'tecnico', 'admin'] },
    loadComponent: () => import('./pages/sobre/sobre.page').then((m) => m.SobrePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
