import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { CepService } from '../../core/cep.service';
import { Address, UserProfile } from '../../core/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="container">
      <section class="card">
        <div class="profile-head">
          <div>
            <span class="eyebrow">Área autenticada</span>
            <h1>Meu perfil</h1>
            <p class="subtitle" style="margin-bottom:0">Esta chamada usa o token automaticamente pelo authInterceptor.</p>
          </div>
          <span class="pill">● Sessão autenticada</span>
        </div>

        @if (carregandoPerfil()) {
          <p class="loading">Carregando perfil...</p>
        } @else if (perfil(); as p) {
          <div class="profile-grid">
            <section class="panel">
              <h2>Olá, {{ p.firstName }} {{ p.lastName }}!</h2>
              <p>Seus dados retornaram da rota protegida <code>/auth/me</code>.</p>
              <div class="info">
                <strong>Usuário</strong><span>{{ p.username }}</span>
                <strong>E-mail</strong><span>{{ p.email }}</span>
                <strong>ID</strong><span>{{ p.id }}</span>
              </div>
            </section>

            <section class="panel">
              <span class="eyebrow">ViaCEP</span>
              <h2>Buscar endereço</h2>
              <p>Consulte um CEP sem enviar o token de autenticação para outro domínio.</p>
              <form (ngSubmit)="buscarCep()">
                <label for="cep">CEP</label>
                <input id="cep" name="cep" [(ngModel)]="cep" placeholder="Ex.: 40140-110"
                       inputmode="numeric" maxlength="9" required>
                <button class="primary full" type="submit" [disabled]="buscandoCep()">
                  {{ buscandoCep() ? 'Buscando...' : 'Consultar CEP' }}
                </button>
              </form>
              @if (mensagemCep()) { <div class="error" role="alert">{{ mensagemCep() }}</div> }
              @if (endereco(); as e) {
                <div class="address">
                  <strong>{{ e.rua || 'Logradouro não informado' }}</strong><br>
                  {{ e.bairro || 'Bairro não informado' }}<br>
                  {{ e.cidade }} - {{ e.uf }}
                </div>
              }
            </section>
          </div>
        } @else {
          <div class="error">Não foi possível carregar o perfil. Faça login novamente.</div>
        }
      </section>
    </main>
  `
})
export class ProfileComponent implements OnInit {
  readonly perfil = signal<UserProfile | null>(null);
  readonly carregandoPerfil = signal(true);
  cep = '40140-110';
  readonly endereco = signal<Address | null>(null);
  readonly buscandoCep = signal(false);
  readonly mensagemCep = signal('');

  constructor(private auth: AuthService, private cepService: CepService) {}

  ngOnInit(): void {
    this.auth.perfil().subscribe({
      next: (dados) => {
        this.perfil.set(dados);
        this.carregandoPerfil.set(false);
      },
      error: () => this.carregandoPerfil.set(false)
    });
  }

  buscarCep(): void {
    this.mensagemCep.set('');
    this.endereco.set(null);
    const digitos = this.cep.replace(/\D/g, '');
    if (digitos.length !== 8) {
      this.mensagemCep.set('Digite um CEP válido com 8 números.');
      return;
    }
    this.buscandoCep.set(true);
    this.cepService.buscar(digitos).subscribe({
      next: (resultado) => {
        this.endereco.set(resultado);
        if (!resultado) this.mensagemCep.set('CEP não encontrado.');
        this.buscandoCep.set(false);
      },
      error: () => {
        this.mensagemCep.set('Não foi possível consultar o CEP. Tente novamente.');
        this.buscandoCep.set(false);
      }
    });
  }
}
