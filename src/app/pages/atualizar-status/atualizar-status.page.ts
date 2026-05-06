import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  IonText,
  IonBadge,
  IonButtons,
  IonBackButton,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  saveOutline,
  createOutline,
  alertCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

/**
 * AtualizarStatusPage - Formulário para atualizar o status de um chamado.
 * Permite selecionar um novo status e adicionar uma observação.
 * Utiliza ngModel para binding dos campos.
 */
@Component({
  selector: 'app-atualizar-status',
  templateUrl: './atualizar-status.page.html',
  styleUrls: ['./atualizar-status.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon,
    IonText,
    IonBadge,
    IonButtons,
    IonBackButton
  ]
})
export class AtualizarStatusPage implements OnInit {

  // Dados do chamado carregado
  chamado: any = null;

  // Campos do formulário (vinculados com ngModel)
  novoStatus: string = '';
  observacao: string = '';

  // Mensagem de erro
  mensagemErro: string = '';

  // Opções de status disponíveis
  statusOptions: string[] = ['Aberto', 'Em atendimento', 'Concluído', 'Cancelado'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    public chamadoService: ChamadoService
  ) {
    addIcons({ saveOutline, createOutline, alertCircleOutline, checkmarkCircleOutline });
  }

  /**
   * Carrega o chamado pelo ID da rota e preenche os campos atuais.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chamado = this.chamadoService.buscarChamadoPorId(id);

    if (this.chamado) {
      // Preenche com os valores atuais do chamado
      this.novoStatus = this.chamado.status;
      this.observacao = this.chamado.observacao || '';
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
   * Valida e salva a atualização do status via service.
   */
  async salvar(): Promise<void> {
    this.mensagemErro = '';

    // Validação: status deve ser selecionado
    if (!this.novoStatus) {
      this.mensagemErro = 'Selecione um status.';
      return;
    }

    // Atualiza via service
    this.chamadoService.atualizarStatus(this.chamado.id, this.novoStatus, this.observacao.trim());

    // Exibe mensagem de sucesso
    const toast = await this.toastCtrl.create({
      message: 'Status atualizado com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();

    // Volta para os detalhes do chamado
    this.router.navigate(['/detalhes-chamado', this.chamado.id]);
  }
}
