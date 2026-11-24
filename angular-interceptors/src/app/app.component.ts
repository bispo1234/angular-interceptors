import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="shell">
      <header class="topbar">
        <a routerLink="/perfil" class="brand" style="color:white;text-decoration:none">ANGULAR <span>·</span> INTERCEPTORS</a>
        <nav class="top-actions">
          @if (auth.token()) {
            <a routerLink="/perfil">Meu perfil</a>
            <button class="logout" (click)="auth.sair()">Sair</button>
          } @else {
            <a routerLink="/entrar">Entrar</a>
          }
        </nav>
      </header>
      <router-outlet />
      <footer class="footer">Projeto de estudo · Desenvolvimento Dinâmico · Angular CLI</footer>
    </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
