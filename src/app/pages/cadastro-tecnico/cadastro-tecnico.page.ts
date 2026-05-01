import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonBackButton,
  IonInput, IonSelect, IonSelectOption,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

/**
 * Tela de Cadastro de Técnico.
 * Permite cadastrar técnicos com nome, especialidade, contato e situação.
 */
@Component({
  selector: 'app-cadastro-tecnico',
  templateUrl: './cadastro-tecnico.page.html',
  styleUrls: ['./cadastro-tecnico.page.scss'],
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonBackButton,
    IonInput, IonSelect, IonSelectOption
  ]
})
export class CadastroTecnicoPage implements OnInit {

  // Controle de modo
  modoEdicao: boolean = false;
  tituloTela: string = 'Cadastro de Técnico';

  // Campos do formulário vinculados com ngModel
  tecnicoId: number = 0;
  nome: string = '';
  especialidade: string = '';
  contato: string = '';
  situacao: string = 'Ativo';

  // Controle de erros de validação
  erros: { [campo: string]: string } = {};

  constructor(
    private chamadoService: ChamadoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {
    addIcons({ saveOutline, checkmarkDoneOutline });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.tituloTela = 'Editar Técnico';
      const tecnico = this.chamadoService.buscarTecnicoPorId(Number(id));
      if (tecnico) {
        this.tecnicoId = tecnico.id;
        this.nome = tecnico.nome;
        this.especialidade = tecnico.especialidade;
        this.contato = tecnico.contato;
        this.situacao = tecnico.situacao;
      } else {
        this.router.navigate(['/lista-tecnicos']);
      }
    }
  }

  /**
   * Validações obrigatórias:
   * - Nome obrigatório
   * - Especialidade obrigatória
   * - Contato obrigatório
   */
  validarFormulario(): boolean {
    this.erros = {};

    if (!this.nome.trim()) {
      this.erros['nome'] = 'Nome obrigatório.';
    }
    if (!this.especialidade) {
      this.erros['especialidade'] = 'Especialidade obrigatória.';
    }
    if (!this.contato.trim()) {
      this.erros['contato'] = 'Contato obrigatório.';
    }
    if (!this.situacao) {
      this.erros['situacao'] = 'Situação obrigatória.';
    }

    return Object.keys(this.erros).length === 0;
  }

  /**
   * Salva o técnico usando adicionarTecnico() do service unificado.
   */
  async salvar(): Promise<void> {
    if (!this.validarFormulario()) {
      const toast = await this.toastController.create({
        message: 'Preencha todos os campos obrigatórios.',
        duration: 2500, position: 'bottom', color: 'danger', cssClass: 'custom-toast'
      });
      await toast.present();
      return;
    }

    if (this.modoEdicao) {
      this.chamadoService.atualizarTecnico({
        id: this.tecnicoId,
        nome: this.nome.trim(),
        especialidade: this.especialidade,
        contato: this.contato.trim(),
        situacao: this.situacao
      });
    } else {
      this.chamadoService.adicionarTecnico({
        nome: this.nome.trim(),
        especialidade: this.especialidade,
        contato: this.contato.trim(),
        situacao: this.situacao
      });
    }

    const toast = await this.toastController.create({
      message: this.modoEdicao ? 'Técnico atualizado!' : 'Técnico cadastrado!',
      duration: 2500, position: 'bottom', color: 'success', cssClass: 'custom-toast'
    });
    await toast.present();

    this.router.navigate(['/lista-tecnicos']);
  }

  temErro(campo: string): boolean {
    return !!this.erros[campo];
  }
}
