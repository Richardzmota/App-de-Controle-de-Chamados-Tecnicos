import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonBackButton,
  IonBadge, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  createOutline, refreshOutline, trashOutline,
  alertCircleOutline, timeOutline, checkmarkCircleOutline,
  closeCircleOutline, personOutline, businessOutline,
  calendarOutline, constructOutline, documentTextOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';
import { AuthService } from '../../services/auth.service';

/**
 * Tela de Detalhes do Chamado.
 * Controla visualização de botões de acordo com o perfil.
 */
@Component({
  selector: 'app-detalhe-chamado',
  templateUrl: './detalhe-chamado.page.html',
  styleUrls: ['./detalhe-chamado.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonBackButton, IonBadge
  ]
})
export class DetalheChamadoPage implements OnInit {

  chamado: any;
  perfilUsuario: string = '';

  constructor(
    private chamadoService: ChamadoService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    addIcons({
      createOutline, refreshOutline, trashOutline,
      alertCircleOutline, timeOutline, checkmarkCircleOutline,
      closeCircleOutline, personOutline, businessOutline,
      calendarOutline, constructOutline, documentTextOutline
    });
  }

  ngOnInit(): void {
    if (!this.authService.estaLogado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.perfilUsuario = this.authService.getPerfilUsuario();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chamado = this.chamadoService.buscarChamadoPorId(Number(id));
    }
    if (!this.chamado) {
      this.router.navigate(['/lista-chamados']);
    }
  }

  ionViewWillEnter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chamado = this.chamadoService.buscarChamadoPorId(Number(id));
    }
  }

  editarChamado(): void {
    if (this.chamado) {
      this.router.navigate(['/cadastro-chamado', this.chamado.id]);
    }
  }

  atualizarStatus(): void {
    if (this.chamado) {
      this.router.navigate(['/atualizar-status', this.chamado.id]);
    }
  }

  async excluirChamado(): Promise<void> {
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
            this.chamadoService.excluirChamado(this.chamado.id);
            this.router.navigate(['/lista-chamados']);
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
