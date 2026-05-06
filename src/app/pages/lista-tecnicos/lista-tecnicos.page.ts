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
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { peopleOutline, trashOutline, personOutline } from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

@Component({
  selector: 'app-lista-tecnicos',
  templateUrl: './lista-tecnicos.page.html',
  styleUrls: ['./lista-tecnicos.page.scss'],
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
    IonBackButton
  ]
})
export class ListaTecnicosPage {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public chamadoService: ChamadoService
  ) {
    addIcons({ peopleOutline, trashOutline, personOutline });
  }

  corSituacao(situacao: string): string {
    return situacao === 'Ativo' ? 'success' : 'medium';
  }

  async confirmarExclusao(id: number, nome: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Excluir Técnico',
      message: `Deseja realmente excluir o técnico "${nome}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            this.chamadoService.excluirTecnico(id);
            const toast = await this.toastCtrl.create({
              message: 'Técnico excluído com sucesso!',
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
