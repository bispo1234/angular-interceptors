import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: 'entrar', component: LoginComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: '', pathMatch: 'full', redirectTo: 'entrar' },
  { path: '**', redirectTo: 'entrar' }
];
