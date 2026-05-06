import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  listOutline,
  personAddOutline,
  peopleOutline,
  statsChartOutline,
  informationCircleOutline,
  logOutOutline,
  buildOutline,
  chevronForwardOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

/**
 * MenuPage - Menu principal do aplicativo.
 * Exibe botões de navegação para todas as funcionalidades do sistema.
 * Inclui opção de sair que retorna à tela de login.
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon
  ]
})
export class MenuPage implements OnInit {

  // Itens do menu gerados dinamicamente
  menuItems: any[] = [];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    public chamadoService: ChamadoService,
    private authService: AuthService
  ) {
    // Registra os ícones utilizados no template
    addIcons({
      addCircleOutline,
      listOutline,
      personAddOutline,
      peopleOutline,
      statsChartOutline,
      informationCircleOutline,
      logOutOutline,
      buildOutline,
      chevronForwardOutline
    });
  }

  ngOnInit() {
    this.carregarMenu();
  }

  /**
   * Constrói o menu baseado no perfil do usuário
   */
  carregarMenu() {
    const role = this.authService.getUserRole();
    
    // Todos podem ver: Lista de Chamados, Resumo, Sobre
    const items = [
      {
        icon: 'list-outline',
        label: 'Lista de Chamados',
        route: '/lista-chamados',
        color: '#0f3460',
        description: 'Ver todos os chamados'
      },
      {
        icon: 'stats-chart-outline',
        label: 'Resumo',
        route: '/resumo',
        color: '#e07c24',
        description: 'Painel de estatísticas'
      },
      {
        icon: 'information-circle-outline',
        label: 'Sobre',
        route: '/sobre',
        color: '#2b6777',
        description: 'Informações do sistema'
      }
    ];

    // Admin e Comum podem cadastrar chamados
    if (role === 'comum' || role === 'admin') {
      items.unshift({
        icon: 'add-circle-outline',
        label: 'Cadastrar Chamado',
        route: '/cadastrar-chamado',
        color: '#e94560',
        description: 'Abrir novo chamado técnico'
      });
    }

    // Técnico e admin podem cadastrar técnicos
    if (role === 'tecnico' || role === 'admin') {
      items.push({
        icon: 'person-add-outline',
        label: 'Cadastrar Técnico',
        route: '/cadastrar-tecnico',
        color: '#533483',
        description: 'Adicionar novo técnico'
      });
    }

    // Apenas admin pode ver a lista de técnicos
    if (role === 'admin') {
      items.push({
        icon: 'people-outline',
        label: 'Lista de Técnicos',
        route: '/lista-tecnicos',
        color: '#1a936f',
        description: 'Ver técnicos cadastrados'
      });
    }

    this.menuItems = items;
  }

  /**
   * Navega para a rota especificada pelo item do menu.
   */
  navegarPara(rota: string): void {
    this.router.navigate([rota]);
  }

  /**
   * Confirma e realiza o logout, voltando para a tela de login.
   */
  async sair(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Sair',
      message: 'Deseja realmente sair do sistema?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          role: 'confirm',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
