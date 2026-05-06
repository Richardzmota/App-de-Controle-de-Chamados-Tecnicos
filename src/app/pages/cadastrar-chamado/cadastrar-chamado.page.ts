import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  IonText,
  IonButtons,
  IonBackButton,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  saveOutline,
  addCircleOutline,
  alertCircleOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

/**
 * CadastrarChamadoPage - Formulário para criação de novos chamados técnicos.
 * Utiliza ngModel para binding dos campos e valida campos obrigatórios.
 */
@Component({
  selector: 'app-cadastrar-chamado',
  templateUrl: './cadastrar-chamado.page.html',
  styleUrls: ['./cadastrar-chamado.page.scss'],
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
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonIcon,
    IonText,
    IonButtons,
    IonBackButton
  ]
})
export class CadastrarChamadoPage {

  // Campos do formulário (vinculados com ngModel)
  solicitante: string = '';
  setor: string = '';
  titulo: string = '';
  descricao: string = '';
  prioridade: string = '';
  dataAbertura: string = '';
  tecnico: string = '';

  // Mensagem de erro para validação
  mensagemErro: string = '';

  // Lista de prioridades disponíveis
  prioridades: string[] = ['Baixa', 'Média', 'Alta', 'Urgente'];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    public chamadoService: ChamadoService
  ) {
    addIcons({ saveOutline, addCircleOutline, alertCircleOutline });
    // Define a data de abertura como a data atual
    this.dataAbertura = new Date().toLocaleDateString('pt-BR');
  }

  /**
   * Valida os campos obrigatórios e salva o chamado via service.
   */
  async salvar(): Promise<void> {
    this.mensagemErro = '';

    // Validação dos campos obrigatórios
    if (
      !this.solicitante.trim() ||
      !this.titulo.trim() ||
      !this.descricao.trim() ||
      !this.prioridade ||
      !this.tecnico
    ) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios (*).';
      return;
    }

    // Monta o objeto chamado
    const novoChamado = {
      solicitante: this.solicitante.trim(),
      setor: this.setor.trim(),
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      prioridade: this.prioridade,
      dataAbertura: this.dataAbertura,
      tecnico: this.tecnico,
      status: 'Aberto',
      observacao: ''
    };

    // Salva via service
    this.chamadoService.adicionarChamado(novoChamado);

    // Exibe mensagem de sucesso
    const toast = await this.toastCtrl.create({
      message: 'Chamado cadastrado com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();

    // Navega para a lista de chamados
    this.router.navigate(['/lista-chamados']);
  }
}
