import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonButtons,
  IonBackButton,
  IonText,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  listOutline,
  eyeOutline,
  trashOutline,
  alertCircleOutline,
  documentTextOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

/**
 * ListaChamadosPage - Lista todos os chamados cadastrados.
 * Permite visualizar detalhes e excluir chamados.
 */
@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.page.html',
  styleUrls: ['./lista-chamados.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonButtons,
    IonBackButton,
    IonText
  ]
})
export class ListaChamadosPage {

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public chamadoService: ChamadoService
  ) {
    addIcons({ listOutline, eyeOutline, trashOutline, alertCircleOutline, documentTextOutline });
  }

  /**
   * Retorna a cor do badge de acordo com a prioridade.
   */
  corPrioridade(prioridade: string): string {
    switch (prioridade) {
      case 'Urgente': return 'danger';
      case 'Alta': return 'warning';
      case 'Média': return 'primary';
      case 'Baixa': return 'success';
      default: return 'medium';
    }
  }

  /**
   * Retorna a cor do badge de acordo com o status.
   */
  corStatus(status: string): string {
    switch (status) {
      case 'Aberto': return 'primary';
      case 'Em atendimento': return 'warning';
      case 'Concluído': return 'success';
      case 'Cancelado': return 'danger';
      default: return 'medium';
    }
  }

  /**
   * Navega para a tela de detalhes do chamado.
   */
  verDetalhes(id: number): void {
    this.router.navigate(['/detalhes-chamado', id]);
  }

  /**
   * Exibe confirmação e exclui o chamado.
   */
  async confirmarExclusao(id: number, titulo: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Excluir Chamado',
      message: `Deseja realmente excluir o chamado "${titulo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            this.chamadoService.excluirChamado(id);
            const toast = await this.toastCtrl.create({
              message: 'Chamado excluído com sucesso!',
              duration: 2000,
              position: 'bottom',
              color: 'danger',
              icon: 'trash-outline'
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }
}
