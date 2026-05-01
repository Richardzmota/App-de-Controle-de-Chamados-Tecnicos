import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonBackButton,
  IonInput, IonTextarea, IonSelect, IonSelectOption,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';
import { TecnicoService } from '../../services/tecnico.service';

@Component({
  selector: 'app-cadastro-chamado',
  templateUrl: './cadastro-chamado.page.html',
  styleUrls: ['./cadastro-chamado.page.scss'],
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonBackButton,
    IonInput, IonTextarea, IonSelect, IonSelectOption
  ]
})
export class CadastroChamadoPage implements OnInit {
  modoEdicao: boolean = false;
  tituloTela: string = 'Cadastro de Chamado';

  chamadoId: number = 0;
  solicitante: string = '';
  setor: string = '';
  titulo: string = '';
  descricao: string = '';
  prioridade: any = 'Média';
  dataAbertura: string = '';
  tecnicoResponsavel: string = '';
  status: any = 'Aberto';
  observacao: string = '';

  erros: { [campo: string]: string } = {};
  setores: string[] = ['TI', 'Financeiro', 'Comercial', 'Administrativo', 'RH', 'Recepção', 'Produção', 'Logística', 'Diretoria'];
  tecnicosAtivos: any[] = [];

  constructor(
    private chamadoService: ChamadoService,
    private tecnicoService: TecnicoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {
    addIcons({ saveOutline, checkmarkDoneOutline });
  }

  ngOnInit(): void {
    this.dataAbertura = new Date().toISOString().split('T')[0];
    this.tecnicosAtivos = this.tecnicoService.listarTodos().filter(t => t.situacao === 'Ativo');

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.tituloTela = 'Editar Chamado';
      this.carregarChamado(Number(id));
    }
  }

  carregarChamado(id: number): void {
    const chamado = this.chamadoService.buscarPorId(id);
    if (chamado) {
      this.chamadoId = chamado.id;
      this.solicitante = chamado.solicitante;
      this.setor = chamado.setor;
      this.titulo = chamado.titulo;
      this.descricao = chamado.descricao;
      this.prioridade = chamado.prioridade;
      this.dataAbertura = chamado.dataAbertura;
      this.tecnicoResponsavel = chamado.tecnicoResponsavel;
      this.status = chamado.status;
      this.observacao = chamado.observacao;
    }
  }

  validarFormulario(): boolean {
    this.erros = {};
    if (!this.solicitante.trim()) this.erros['solicitante'] = 'Obrigatório.';
    if (!this.titulo.trim()) this.erros['titulo'] = 'Obrigatório.';
    if (!this.descricao.trim()) this.erros['descricao'] = 'Obrigatório.';
    return Object.keys(this.erros).length === 0;
  }

  async salvar(): Promise<void> {
    if (!this.validarFormulario()) return;

    if (this.modoEdicao) {
      this.chamadoService.atualizar({
        id: this.chamadoId,
        solicitante: this.solicitante,
        setor: this.setor,
        titulo: this.titulo,
        descricao: this.descricao,
        prioridade: this.prioridade,
        dataAbertura: this.dataAbertura,
        tecnicoResponsavel: this.tecnicoResponsavel,
        status: this.status,
        observacao: this.observacao
      });
    } else {
      this.chamadoService.adicionar({
        solicitante: this.solicitante,
        setor: this.setor,
        titulo: this.titulo,
        descricao: this.descricao,
        prioridade: this.prioridade,
        dataAbertura: this.dataAbertura,
        tecnicoResponsavel: this.tecnicoResponsavel,
        status: 'Aberto',
        observacao: ''
      });
    }
    this.router.navigate(['/lista-chamados']);
  }

  temErro(campo: string): boolean { return !!this.erros[campo]; }
}
