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
  IonButton,
  IonIcon,
  IonText,
  IonButtons,
  IonBackButton,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, personAddOutline, alertCircleOutline } from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

@Component({
  selector: 'app-cadastrar-tecnico',
  templateUrl: './cadastrar-tecnico.page.html',
  styleUrls: ['./cadastrar-tecnico.page.scss'],
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
    IonButton,
    IonIcon,
    IonText,
    IonButtons,
    IonBackButton
  ]
})
export class CadastrarTecnicoPage {
  nome: string = '';
  especialidade: string = '';
  contato: string = '';
  situacao: string = 'Ativo'; // default

  mensagemErro: string = '';

  especialidades: string[] = ['Hardware', 'Software', 'Rede', 'Impressora', 'Sistema interno', 'Outros'];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    public chamadoService: ChamadoService
  ) {
    addIcons({ saveOutline, personAddOutline, alertCircleOutline });
  }

  async salvar(): Promise<void> {
    this.mensagemErro = '';

    if (!this.nome.trim() || !this.especialidade || !this.contato.trim()) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios (*).';
      return;
    }

    const novoTecnico = {
      nome: this.nome.trim(),
      especialidade: this.especialidade,
      contato: this.contato.trim(),
      situacao: this.situacao
    };

    this.chamadoService.adicionarTecnico(novoTecnico);

    const toast = await this.toastCtrl.create({
      message: 'Técnico cadastrado com sucesso!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline'
    });
    await toast.present();

    this.router.navigate(['/lista-tecnicos']);
  }
}
