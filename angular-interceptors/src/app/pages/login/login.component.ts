import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="container">
      <section class="card login-wrap">
        <span class="eyebrow">Acesso à aplicação</span>
        <h1>Bem-vindo!</h1>
        <p class="subtitle">Entre para visualizar seu perfil e consultar um CEP.</p>

        <form (ngSubmit)="entrar()">
          <label for="usuario">Usuário</label>
          <input id="usuario" name="usuario" [(ngModel)]="usuario"
                 placeholder="Digite seu usuário" autocomplete="username" required>
          <label for="senha">Senha</label>
          <input id="senha" name="senha" type="password" [(ngModel)]="senha"
                 placeholder="Digite sua senha" autocomplete="current-password" required>
          @if (erro()) { <div class="error" role="alert">{{ erro() }}</div> }
          <button class="primary full" type="submit" [disabled]="carregando()">
            {{ carregando() ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
        <p class="muted" style="margin-top:22px">Demonstração: <strong>emilys</strong> / <strong>emilyspass</strong></p>
      </section>
    </main>
  `
})
export class LoginComponent {
  usuario = 'emilys';
  senha = 'emilyspass';
  readonly erro = signal('');
  readonly carregando = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  entrar(): void {
    this.erro.set('');
    this.carregando.set(true);
    this.auth.entrar(this.usuario.trim(), this.senha).subscribe({
      next: () => {
        this.carregando.set(false);
        void this.router.navigate(['/perfil']);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Usuário ou senha inválidos. Confira os dados e tente novamente.');
      }
    });
  }
}
