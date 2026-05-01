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
import { addOutline, trashOutline, createOutline, personOutline, callOutline, chevronForwardOutline } from 'ionicons/icons';
import { TecnicoService } from '../../services/tecnico.service';
import { Tecnico } from '../../models/tecnico.model';

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
  tecnicos: Tecnico[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ addOutline, trashOutline, createOutline, personOutline, callOutline, chevronForwardOutline });
  }

  ionViewWillEnter(): void {
    this.tecnicos = this.tecnicoService.listarTodos();
  }

  novoTecnico(): void {
    this.router.navigate(['/cadastro-tecnico']);
  }

  editarTecnico(id: number): void {
    this.router.navigate(['/cadastro-tecnico', id]);
  }

  async excluirTecnico(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja realmente excluir este técnico?',
      cssClass: 'custom-alert',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir', role: 'destructive',
          handler: () => {
            this.tecnicoService.excluir(id);
            this.tecnicos = this.tecnicoService.listarTodos();
          }
        }
      ]
    });
    await alert.present();
  }
}
