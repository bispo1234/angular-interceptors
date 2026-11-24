import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from './api';
import { LoginResponse, UserProfile } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenState = signal<string | null>(localStorage.getItem('token'));
  readonly token = this.tokenState.asReadonly();

  constructor(private http: HttpClient, private router: Router) {}

  entrar(usuario: string, senha: string) {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, {
      username: usuario,
      password: senha,
      expiresInMins: 60
    }).pipe(
      tap((resposta) => {
        localStorage.setItem('token', resposta.accessToken);
        this.tokenState.set(resposta.accessToken);
      })
    );
  }

  perfil() {
    return this.http.get<UserProfile>(`${API_URL}/auth/me`);
  }

  sair(): void {
    localStorage.removeItem('token');
    this.tokenState.set(null);
    void this.router.navigate(['/entrar']);
  }
}
