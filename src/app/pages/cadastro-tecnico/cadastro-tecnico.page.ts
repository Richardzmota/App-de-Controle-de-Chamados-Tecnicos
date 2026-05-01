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
import { TecnicoService } from '../../services/tecnico.service';

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
  modoEdicao: boolean = false;
  tituloTela: string = 'Cadastro de Técnico';
  tecnicoId: number = 0;
  nome: string = '';
  especialidade: any = '';
  contato: string = '';
  situacao: any = 'Ativo';
  erros: { [campo: string]: string } = {};

  constructor(
    private tecnicoService: TecnicoService,
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
      const tecnico = this.tecnicoService.buscarPorId(Number(id));
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

  validarFormulario(): boolean {
    this.erros = {};
    if (!this.nome.trim()) this.erros['nome'] = 'Nome obrigatório.';
    if (!this.especialidade) this.erros['especialidade'] = 'Especialidade obrigatória.';
    if (!this.contato.trim()) this.erros['contato'] = 'Contato obrigatório.';
    if (!this.situacao) this.erros['situacao'] = 'Situação obrigatória.';
    return Object.keys(this.erros).length === 0;
  }

  async salvar(): Promise<void> {
    if (!this.validarFormulario()) return;

    if (this.modoEdicao) {
      this.tecnicoService.atualizar({
        id: this.tecnicoId, nome: this.nome, especialidade: this.especialidade, contato: this.contato, situacao: this.situacao
      });
    } else {
      this.tecnicoService.adicionar({
        nome: this.nome, especialidade: this.especialidade, contato: this.contato, situacao: this.situacao
      });
    }
    this.router.navigate(['/lista-tecnicos']);
  }

  temErro(campo: string): boolean { return !!this.erros[campo]; }
}
