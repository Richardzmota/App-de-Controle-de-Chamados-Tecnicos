import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonBadge,
  IonFab, IonFabButton, IonItemSliding,
  IonItemOptions, IonItemOption,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, trashOutline, createOutline,
  personOutline, callOutline, chevronForwardOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

/**
 * Tela de Lista de Técnicos.
 * Exibe os técnicos cadastrados usando listarTecnicos() do service unificado.
 */
@Component({
  selector: 'app-lista-tecnicos',
  templateUrl: './lista-tecnicos.page.html',
  styleUrls: ['./lista-tecnicos.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonIcon, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonBadge,
    IonFab, IonFabButton, IonItemSliding,
    IonItemOptions, IonItemOption
  ]
})
export class ListaTecnicosPage {

  // Lista de técnicos
  tecnicos: any[] = [];

  constructor(
    private chamadoService: ChamadoService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      addOutline, trashOutline, createOutline,
      personOutline, callOutline, chevronForwardOutline
    });
  }

  /**
   * Carrega a lista ao entrar na tela.
   */
  ionViewWillEnter(): void {
    this.tecnicos = this.chamadoService.listarTecnicos();
  }

  novoTecnico(): void {
    this.router.navigate(['/cadastro-tecnico']);
  }

  editarTecnico(id: number): void {
    this.router.navigate(['/cadastro-tecnico', id]);
  }

  /**
   * Exclui técnico usando o método excluirTecnico() do service unificado.
   */
  async excluirTecnico(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja realmente excluir este técnico?',
      cssClass: 'custom-alert',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.chamadoService.excluirTecnico(id);
            this.tecnicos = this.chamadoService.listarTecnicos();
          }
        }
      ]
    });
    await alert.present();
  }
}
