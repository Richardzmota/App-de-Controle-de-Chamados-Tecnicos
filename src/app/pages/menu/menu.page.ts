import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonGrid, IonRow, IonCol, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline, listOutline, peopleOutline,
  personAddOutline, logOutOutline, statsChartOutline, informationCircleOutline,
  constructOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonGrid, IonRow, IonCol, IonButtons
  ]
})
export class MenuPage implements OnInit {
  constructor(private router: Router) {
    addIcons({
      addCircleOutline, listOutline, peopleOutline,
      personAddOutline, logOutOutline, statsChartOutline,
      informationCircleOutline, constructOutline
    });
  }
  ngOnInit(): void {}
  cadastrarChamado(): void { this.router.navigate(['/cadastro-chamado']); }
  listarChamados(): void { this.router.navigate(['/lista-chamados']); }
  cadastrarTecnico(): void { this.router.navigate(['/cadastro-tecnico']); }
  listarTecnicos(): void { this.router.navigate(['/lista-tecnicos']); }
  verResumo(): void { this.router.navigate(['/resumo']); }
  verSobre(): void { this.router.navigate(['/sobre']); }
  logout(): void { this.router.navigate(['/login']); }
}
