import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonGrid, IonRow, IonCol, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline, listOutline, peopleOutline,
  personAddOutline, logOutOutline, statsChartOutline, informationCircleOutline,
  constructOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

/**
 * Menu Principal.
 * Exibe os cards de navegação com base nas permissões do usuário logado.
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonGrid, IonRow, IonCol, IonButtons,
    UpperCasePipe
  ]
})
export class MenuPage implements OnInit {

  nomeUsuario: string = '';
  perfilUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({
      addCircleOutline, listOutline, peopleOutline,
      personAddOutline, logOutOutline, statsChartOutline,
      informationCircleOutline, constructOutline
    });
  }

  ngOnInit(): void {
    // Verifica se está logado
    if (!this.authService.estaLogado()) {
      this.router.navigate(['/login']);
      return;
    }

    this.nomeUsuario = this.authService.getNomeUsuario();
    this.perfilUsuario = this.authService.getPerfilUsuario();
  }

  // Navegação para Usuário e Técnico
  cadastrarChamado(): void {
    this.router.navigate(['/cadastro-chamado']);
  }

  listarChamados(): void {
    this.router.navigate(['/lista-chamados']);
  }

  // Navegação para Administrador
  cadastrarTecnico(): void {
    this.router.navigate(['/cadastro-tecnico']);
  }

  listarTecnicos(): void {
    this.router.navigate(['/lista-tecnicos']);
  }

  verResumo(): void {
    this.router.navigate(['/resumo']);
  }

  // Comum para Usuário e Administrador (conforme especificação)
  verSobre(): void {
    this.router.navigate(['/sobre']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
