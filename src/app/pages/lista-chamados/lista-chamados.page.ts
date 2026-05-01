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
import { AuthService } from '../../services/auth.service';

/**
 * Tela de Lista de Chamados.
 * Exibe título, solicitante, prioridade, status e técnico responsável.
 * Filtra com base no perfil do usuário logado.
 */
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

  // Lista de chamados exibidos na tela
  chamados: any[] = [];

  // Filtro de status selecionado
  filtroStatus: string = 'todos';

  // Texto de pesquisa
  termoBusca: string = '';

  perfilUsuario: string = '';
  nomeUsuario: string = '';

  constructor(
    private chamadoService: ChamadoService,
    private authService: AuthService,
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
    if (!this.authService.estaLogado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.perfilUsuario = this.authService.getPerfilUsuario();
    this.nomeUsuario = this.authService.getNomeUsuario();
    this.carregarChamados();
  }

  carregarChamados(): void {
    let lista = this.chamadoService.filtrarPorStatus(this.filtroStatus);

    // Regra de perfil: Usuário só vê os chamados criados por ele
    if (this.perfilUsuario === 'usuario') {
      lista = lista.filter((c: any) => c.solicitante === this.nomeUsuario);
    }
    // Técnico vê todos, então não filtramos mais aqui.

    // Aplica filtro de busca
    if (this.termoBusca.trim()) {
      const termo = this.termoBusca.toLowerCase();
      lista = lista.filter((c: any) =>
        c.titulo.toLowerCase().includes(termo) ||
        c.solicitante.toLowerCase().includes(termo) ||
        c.setor.toLowerCase().includes(termo) ||
        c.tecnico.toLowerCase().includes(termo)
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
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.chamadoService.excluirChamado(id);
            this.carregarChamados();
          }
        }
      ]
    });
    await alert.present();
  }

  getCorPrioridade(prioridade: string): string {
    const cores: Record<string, string> = {
      'Baixa': 'success', 'Média': 'warning', 'Alta': 'tertiary', 'Urgente': 'danger'
    };
    return cores[prioridade] || 'medium';
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
