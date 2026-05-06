import { Component } from '@angular/core';
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
  IonIcon,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { statsChartOutline, alertCircleOutline, checkmarkCircleOutline, closeCircleOutline, warningOutline } from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
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
    IonIcon,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class ResumoPage {
  constructor(public chamadoService: ChamadoService) {
    addIcons({ statsChartOutline, alertCircleOutline, checkmarkCircleOutline, closeCircleOutline, warningOutline });
  }

  get quantidadePorStatus() {
    const chamados = this.chamadoService.listarChamados();
    return {
      aberto: chamados.filter(c => c.status === 'Aberto').length,
      emAtendimento: chamados.filter(c => c.status === 'Em atendimento').length,
      concluido: chamados.filter(c => c.status === 'Concluído').length,
      cancelado: chamados.filter(c => c.status === 'Cancelado').length
    };
  }

  get quantidadePorPrioridade() {
    const chamados = this.chamadoService.listarChamados();
    return {
      baixa: chamados.filter(c => c.prioridade === 'Baixa').length,
      media: chamados.filter(c => c.prioridade === 'Média').length,
      alta: chamados.filter(c => c.prioridade === 'Alta').length,
      urgente: chamados.filter(c => c.prioridade === 'Urgente').length
    };
  }
}
