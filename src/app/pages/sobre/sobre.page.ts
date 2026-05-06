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
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { informationCircleOutline, codeWorkingOutline, schoolOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
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
    IonBackButton
  ]
})
export class SobrePage {
  constructor() {
    addIcons({ informationCircleOutline, codeWorkingOutline, schoolOutline });
  }
}
