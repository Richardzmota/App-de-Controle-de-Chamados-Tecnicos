import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonBadge,
  IonSearchbar, IonSegment, IonSegmentButton,
  IonFab, IonFabButton, IonItemSliding,
  IonItemOptions, IonItemOption,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, trashOutline, createOutline,
  alertCircleOutline, timeOutline, checkmarkCircleOutline,
  closeCircleOutline, searchOutline, chevronForwardOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.page.html',
  styleUrls: ['./lista-chamados.page.scss'],
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonIcon, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonBadge,
    IonSearchbar, IonSegment, IonSegmentButton,
    IonFab, IonFabButton, IonItemSliding,
    IonItemOptions, IonItemOption
  ]
})
export class ListaChamadosPage {
  chamados: any[] = [];
  filtroStatus: string = 'todos';
  termoBusca: string = '';

  constructor(
    private chamadoService: ChamadoService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      addOutline, trashOutline, createOutline,
      alertCircleOutline, timeOutline, checkmarkCircleOutline,
      closeCircleOutline, searchOutline, chevronForwardOutline
    });
  }

  ionViewWillEnter(): void {
    this.carregarChamados();
  }

  carregarChamados(): void {
    let lista = this.chamadoService.filtrarPorStatus(this.filtroStatus);
    if (this.termoBusca.trim()) {
      const termo = this.termoBusca.toLowerCase();
      lista = lista.filter((c: any) =>
        c.titulo.toLowerCase().includes(termo) ||
        c.solicitante.toLowerCase().includes(termo) ||
        c.setor.toLowerCase().includes(termo) ||
        c.tecnicoResponsavel?.toLowerCase().includes(termo)
      );
    }
    this.chamados = lista;
  }

  onFiltroChange(evento: any): void {
    this.filtroStatus = evento.detail.value;
    this.carregarChamados();
  }

  onBuscaChange(): void {
    this.carregarChamados();
  }

  verDetalhes(id: number): void {
    this.router.navigate(['/detalhe-chamado', id]);
  }

  novoChamado(): void {
    this.router.navigate(['/cadastro-chamado']);
  }

  async excluirChamado(id: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Deseja realmente excluir este chamado?',
      cssClass: 'custom-alert',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir', role: 'destructive',
          handler: () => {
            this.chamadoService.excluir(id);
            this.carregarChamados();
          }
        }
      ]
    });
    await alert.present();
  }

  getIconeStatus(status: string): string {
    const icones: Record<string, string> = {
      'Aberto': 'alert-circle-outline',
      'Em atendimento': 'time-outline',
      'Concluído': 'checkmark-circle-outline',
      'Cancelado': 'close-circle-outline'
    };
    return icones[status] || 'alert-circle-outline';
  }
}
