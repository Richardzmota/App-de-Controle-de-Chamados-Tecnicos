import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonBackButton,
  IonInput, IonTextarea,
  IonSelect, IonSelectOption,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { ChamadoService } from '../../services/chamado.service';

/**
 * Tela de Cadastro de Chamado.
 * Formulário para registrar novo chamado técnico.
 * Campos: solicitante, setor, título, descrição, prioridade, data, técnico e status.
 */
@Component({
  selector: 'app-cadastro-chamado',
  templateUrl: './cadastro-chamado.page.html',
  styleUrls: ['./cadastro-chamado.page.scss'],
  imports: [
    FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonButtons, IonBackButton,
    IonInput, IonTextarea,
    IonSelect, IonSelectOption
  ]
})
export class CadastroChamadoPage implements OnInit {

  // Controla se é edição ou novo cadastro
  modoEdicao: boolean = false;
  tituloTela: string = 'Cadastro de Chamado';

  // Campos do formulário vinculados com ngModel
  chamadoId: number = 0;
  solicitante: string = '';
  setor: string = '';
  titulo: string = '';
  descricao: string = '';
  prioridade: string = 'Média';
  dataAbertura: string = '';
  tecnico: string = '';
  status: string = 'Aberto';
  observacao: string = '';

  // Controle de erros de validação
  erros: { [campo: string]: string } = {};

  // Lista de setores disponíveis
  setores: string[] = [
    'TI', 'Financeiro', 'Comercial', 'Administrativo',
    'RH', 'Recepção', 'Produção', 'Logística', 'Diretoria'
  ];

  // Lista de técnicos ativos (carregada do service)
  tecnicosAtivos: any[] = [];

  constructor(
    private chamadoService: ChamadoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {
    addIcons({ saveOutline, checkmarkDoneOutline });
  }

  /**
   * Inicializa o formulário. Define data de hoje e carrega técnicos ativos.
   * Verifica se há ID na rota para modo de edição.
   */
  ngOnInit(): void {
    // Define a data de hoje como padrão
    this.dataAbertura = new Date().toISOString().split('T')[0];

    // Carrega lista de técnicos ativos do service
    this.tecnicosAtivos = this.chamadoService.listarTecnicosAtivos();

    // Verifica se é modo edição
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modoEdicao = true;
      this.tituloTela = 'Editar Chamado';
      this.carregarChamado(Number(id));
    }
  }

  /**
   * Carrega os dados de um chamado existente para edição.
   */
  carregarChamado(id: number): void {
    const chamado = this.chamadoService.buscarChamadoPorId(id);
    if (chamado) {
      this.chamadoId = chamado.id;
      this.solicitante = chamado.solicitante;
      this.setor = chamado.setor;
      this.titulo = chamado.titulo;
      this.descricao = chamado.descricao;
      this.prioridade = chamado.prioridade;
      this.dataAbertura = chamado.dataAbertura;
      this.tecnico = chamado.tecnico;
      this.status = chamado.status;
      this.observacao = chamado.observacao;
    } else {
      this.mostrarToast('Chamado não encontrado.', 'warning');
      this.router.navigate(['/lista-chamados']);
    }
  }

  /**
   * Validações obrigatórias:
   * - Solicitante obrigatório
   * - Título obrigatório
   * - Descrição obrigatória
   * - Prioridade obrigatória
   * - Técnico obrigatório
   */
  validarFormulario(): boolean {
    this.erros = {};

    if (!this.solicitante.trim()) {
      this.erros['solicitante'] = 'Solicitante obrigatório.';
    }
    if (!this.titulo.trim()) {
      this.erros['titulo'] = 'Título obrigatório.';
    }
    if (!this.descricao.trim()) {
      this.erros['descricao'] = 'Descrição obrigatória.';
    }
    if (!this.prioridade) {
      this.erros['prioridade'] = 'Prioridade obrigatória.';
    }
    if (!this.tecnico) {
      this.erros['tecnico'] = 'Técnico obrigatório.';
    }

    return Object.keys(this.erros).length === 0;
  }

  /**
   * Salva o chamado (novo ou atualização).
   */
  async salvar(): Promise<void> {
    if (!this.validarFormulario()) {
      this.mostrarToast('Preencha todos os campos obrigatórios.', 'danger');
      return;
    }

    if (this.modoEdicao) {
      // Atualiza chamado existente
      this.chamadoService.atualizarChamado({
        id: this.chamadoId,
        solicitante: this.solicitante.trim(),
        setor: this.setor,
        titulo: this.titulo.trim(),
        descricao: this.descricao.trim(),
        prioridade: this.prioridade,
        dataAbertura: this.dataAbertura,
        tecnico: this.tecnico,
        status: this.status,
        observacao: this.observacao.trim()
      });
      this.mostrarToast('Chamado atualizado com sucesso!', 'success');
    } else {
      // Adiciona novo chamado usando adicionarChamado do service
      this.chamadoService.adicionarChamado({
        solicitante: this.solicitante.trim(),
        setor: this.setor,
        titulo: this.titulo.trim(),
        descricao: this.descricao.trim(),
        prioridade: this.prioridade,
        dataAbertura: this.dataAbertura,
        tecnico: this.tecnico,
        status: 'Aberto',
        observacao: ''
      });
      this.mostrarToast('Chamado cadastrado com sucesso!', 'success');
    }

    this.router.navigate(['/lista-chamados']);
  }

  /**
   * Exibe um toast de notificação.
   */
  async mostrarToast(mensagem: string, cor: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensagem, duration: 2500, position: 'bottom', color: cor, cssClass: 'custom-toast'
    });
    await toast.present();
  }

  /**
   * Verifica se um campo tem erro.
   */
  temErro(campo: string): boolean {
    return !!this.erros[campo];
  }
}
