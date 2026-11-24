import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // inject deve acontecer no contexto de injeção, antes do callback.
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (erro.status === 401 && !req.url.endsWith('/auth/login')) {
        auth.sair();
        void router.navigate(['/entrar']);
      }
      return throwError(() => erro);
    })
  );
};
