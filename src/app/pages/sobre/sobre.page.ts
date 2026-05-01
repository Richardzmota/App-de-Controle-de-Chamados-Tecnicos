import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  constructOutline, schoolOutline, codeSlashOutline,
  logoAngular, logoIonic, heartOutline
} from 'ionicons/icons';

/**
 * Tela Sobre o Aplicativo.
 * Apresenta informações sobre o projeto, aluno, disciplina e tecnologias.
 */
@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonIcon, IonButtons, IonBackButton
  ]
})
export class SobrePage {
  constructor() {
    addIcons({
      constructOutline, schoolOutline, codeSlashOutline,
      logoAngular, logoIonic, heartOutline
    });
  }
}
