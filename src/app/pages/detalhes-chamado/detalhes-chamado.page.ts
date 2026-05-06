import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonButton,
  IonIcon,
  IonBadge,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  createOutline,
  personOutline,
  businessOutline,
  calendarOutline,
  flagOutline,
  checkmarkCircleOutline,
  chatbubbleOutline,
  constructOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';
import { AuthService } from '../../services/auth.service';

/**
 * DetalhesChamadoPage - Exibe todos os dados de um chamado específico.
 * Recebe o ID via parâmetro de rota.
 * Permite navegar para a tela de atualização de status.
 */
@Component({
  selector: 'app-detalhes-chamado',
  templateUrl: './detalhes-chamado.page.html',
  styleUrls: ['./detalhes-chamado.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonButton,
    IonIcon,
    IonBadge,
    IonButtons,
    IonBackButton
  ]
})
export class DetalhesChamadoPage implements OnInit {

  // Objeto do chamado carregado pelo ID
  chamado: any = null;

  // Flag que indica se o usuário pode atualizar o chamado
  podeAtualizar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public chamadoService: ChamadoService,
    private authService: AuthService
  ) {
    addIcons({
      documentTextOutline,
      createOutline,
      personOutline,
      businessOutline,
      calendarOutline,
      flagOutline,
      checkmarkCircleOutline,
      chatbubbleOutline,
      constructOutline
    });
  }

  /**
   * Carrega o chamado a partir do ID na URL.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chamado = this.chamadoService.buscarChamadoPorId(id);

    // O usuário comum não pode atualizar, apenas técnico e admin
    const role = this.authService.getUserRole();
    this.podeAtualizar = role === 'tecnico' || role === 'admin';
  }

  /**
   * Retorna a cor do badge de prioridade.
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
   * Retorna a cor do badge de status.
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
   * Navega para a tela de atualização de status.
   */
  atualizarStatus(): void {
    if (this.chamado) {
      this.router.navigate(['/atualizar-status', this.chamado.id]);
    }
  }
}
