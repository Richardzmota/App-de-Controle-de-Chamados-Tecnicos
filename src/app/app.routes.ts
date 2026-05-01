import { Routes } from '@angular/router';

/**
 * Definição de rotas do aplicativo.
 * Configuração de navegação entre todas as telas obrigatórias.
 */
export const routes: Routes = [
  // Tela de Login
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  // Menu Principal
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then(m => m.MenuPage),
  },
  // Cadastro de Chamado (novo)
  {
    path: 'cadastro-chamado',
    loadComponent: () => import('./pages/cadastro-chamado/cadastro-chamado.page').then(m => m.CadastroChamadoPage),
  },
  // Cadastro de Chamado (edição)
  {
    path: 'cadastro-chamado/:id',
    loadComponent: () => import('./pages/cadastro-chamado/cadastro-chamado.page').then(m => m.CadastroChamadoPage),
  },
  // Lista de Chamados
  {
    path: 'lista-chamados',
    loadComponent: () => import('./pages/lista-chamados/lista-chamados.page').then(m => m.ListaChamadosPage),
  },
  // Detalhes do Chamado
  {
    path: 'detalhe-chamado/:id',
    loadComponent: () => import('./pages/detalhe-chamado/detalhe-chamado.page').then(m => m.DetalheChamadoPage),
  },
  // Atualização de Status
  {
    path: 'atualizar-status/:id',
    loadComponent: () => import('./pages/atualizar-status/atualizar-status.page').then(m => m.AtualizarStatusPage),
  },
  // Cadastro de Técnico (novo)
  {
    path: 'cadastro-tecnico',
    loadComponent: () => import('./pages/cadastro-tecnico/cadastro-tecnico.page').then(m => m.CadastroTecnicoPage),
  },
  // Cadastro de Técnico (edição)
  {
    path: 'cadastro-tecnico/:id',
    loadComponent: () => import('./pages/cadastro-tecnico/cadastro-tecnico.page').then(m => m.CadastroTecnicoPage),
  },
  // Lista de Técnicos
  {
    path: 'lista-tecnicos',
    loadComponent: () => import('./pages/lista-tecnicos/lista-tecnicos.page').then(m => m.ListaTecnicosPage),
  },
  // Resumo dos Chamados
  {
    path: 'resumo',
    loadComponent: () => import('./pages/resumo/resumo.page').then(m => m.ResumoPage),
  },
  // Sobre o Aplicativo
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre.page').then(m => m.SobrePage),
  },
  // Rota padrão → Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
