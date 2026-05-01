import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonInput,
  IonButton, IonIcon, IonText, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, personOutline, logInOutline, constructOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

/**
 * Página de Login do sistema de chamados técnicos.
 * Utiliza ngModel para capturar os dados do formulário.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    FormsModule, IonContent,
    IonInput, IonButton, IonIcon, IonText, IonSpinner
  ]
})
export class LoginPage {

  // Campos do formulário vinculados com ngModel
  usuario: string = '';
  senha: string = '';

  // Controla mensagem de erro
  erroLogin: boolean = false;
  mensagemErro: string = '';

  // Controla estado de carregamento
  carregando: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Registra os ícones utilizados na página
    addIcons({ lockClosedOutline, personOutline, logInOutline, constructOutline });
  }

  /**
   * Realiza a validação e tentativa de login.
   * Valida campos obrigatórios e credenciais.
   */
  fazerLogin(): void {
    // Validação simples dos campos
    if (!this.usuario.trim()) {
      this.erroLogin = true;
      this.mensagemErro = 'Informe o nome de usuário.';
      return;
    }

    if (!this.senha.trim()) {
      this.erroLogin = true;
      this.mensagemErro = 'Informe a senha.';
      return;
    }

    // Simula carregamento
    this.carregando = true;
    this.erroLogin = false;

    // Aguarda meio segundo para simular autenticação
    setTimeout(() => {
      const sucesso = this.authService.login(this.usuario, this.senha);

      if (sucesso) {
        // Login bem-sucedido, navega para o menu principal
        this.router.navigate(['/menu']);
      } else {
        // Credenciais inválidas
        this.erroLogin = true;
        this.mensagemErro = 'Usuário ou senha incorretos.';
      }

      this.carregando = false;
    }, 600);
  }
}
