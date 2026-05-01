import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonButtons, IonBackButton,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  statsChartOutline, alertCircleOutline, timeOutline,
  checkmarkCircleOutline, closeCircleOutline,
  arrowDownOutline, removeOutline, arrowUpOutline, flashOutline
} from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonIcon, IonButtons, IonBackButton,
    IonGrid, IonRow, IonCol
  ]
})
export class ResumoPage {
  stats: any = {
    abertos: 0, emAtendimento: 0, concluidos: 0, cancelados: 0,
    total: 0, baixa: 0, media: 0, alta: 0, urgente: 0
  };

  constructor(private chamadoService: ChamadoService) {
    addIcons({
      statsChartOutline, alertCircleOutline, timeOutline,
      checkmarkCircleOutline, closeCircleOutline,
      arrowDownOutline, removeOutline, arrowUpOutline, flashOutline
    });
  }

  ionViewWillEnter(): void {
    this.stats = this.chamadoService.obterEstatisticas();
  }
}
