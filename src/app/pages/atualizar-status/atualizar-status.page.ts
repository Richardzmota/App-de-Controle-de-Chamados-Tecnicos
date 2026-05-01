import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonBackButton,
  IonSelect, IonSelectOption, IonTextarea,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkDoneOutline } from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

@Component({
  selector: 'app-atualizar-status',
  templateUrl: './atualizar-status.page.html',
  styleUrls: ['./atualizar-status.page.scss'],
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonBackButton,
    IonSelect, IonSelectOption, IonTextarea
  ]
})
export class AtualizarStatusPage implements OnInit {
  chamadoId: number = 0;
  chamadoTitulo: string = '';
  novoStatus: any = '';
  observacao: string = '';
  erros: { [campo: string]: string } = {};

  constructor(
    private chamadoService: ChamadoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {
    addIcons({ checkmarkDoneOutline });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const chamado = this.chamadoService.buscarPorId(Number(id));
      if (chamado) {
        this.chamadoId = chamado.id;
        this.chamadoTitulo = chamado.titulo;
        this.novoStatus = chamado.status;
        this.observacao = chamado.observacao;
      } else {
        this.router.navigate(['/lista-chamados']);
      }
    }
  }

  async salvar(): Promise<void> {
    this.erros = {};
    if (!this.novoStatus) {
      this.erros['status'] = 'Selecione o novo status.';
      return;
    }
    this.chamadoService.atualizarStatus(this.chamadoId, this.novoStatus, this.observacao.trim());
    const toast = await this.toastController.create({
      message: 'Status atualizado com sucesso!',
      duration: 2500, position: 'bottom', color: 'success', cssClass: 'custom-toast'
    });
    await toast.present();
    this.router.navigate(['/detalhe-chamado', this.chamadoId]);
  }

  temErro(campo: string): boolean {
    return !!this.erros[campo];
  }
}
