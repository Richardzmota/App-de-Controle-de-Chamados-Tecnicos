import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
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
  IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logInOutline, personOutline, lockClosedOutline, buildOutline, alertCircleOutline } from 'ionicons/icons';

/**
 * LoginPage - Tela de autenticação do aplicativo.
 * Valida se os campos usuário e senha estão preenchidos antes de navegar ao menu.
 * Utiliza ngModel para binding dos campos do formulário.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
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
    IonText
  ]
})
export class LoginPage {

  // Campos do formulário de login (usados com ngModel)
  usuario: string = '';
  senha: string = '';

  // Mensagem de erro exibida quando a validação falha
  mensagemErro: string = '';

  // Tipo de perfil do usuário (simulado)
  tipoUsuario: UserRole = 'comum';

  constructor(private router: Router, private authService: AuthService) {
    // Registra os ícones do Ionicons utilizados no template
    addIcons({ logInOutline, personOutline, lockClosedOutline, buildOutline, alertCircleOutline });
  }

  /**
   * Valida os campos do formulário e navega para o menu se estiverem preenchidos.
   * Caso contrário, exibe uma mensagem de erro.
   */
  entrar(): void {
    // Limpa a mensagem de erro anterior
    this.mensagemErro = '';

    // Validação: ambos os campos devem estar preenchidos
    if (!this.usuario.trim() || !this.senha.trim() || !this.tipoUsuario) {
      this.mensagemErro = 'Preencha todos os campos para continuar.';
      return;
    }

    // Realiza o login armazenando o perfil no AuthService
    this.authService.login(this.usuario.trim(), this.tipoUsuario);

    // Campos válidos → navega para o menu principal
    this.router.navigate(['/menu']);
  }
}
